import type { Express } from "express";
import { createServer, type Server } from "http";
import OpenAI from "openai";
import { socialHandlesSchema, journalEntries, users } from "@shared/schema";
import { z } from "zod";
import { eq, desc } from "drizzle-orm";
import { db } from "./db";
import { setupAuth, registerAuthRoutes, isAuthenticated } from "./replit_integrations/auth";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

async function searchWithPerplexity(query: string, systemPrompt: string): Promise<any> {
  const apiKey = process.env.PERPLEXITY_API_KEY;
  
  if (!apiKey) {
    console.log("Perplexity API key not configured, using OpenAI fallback");
    return null;
  }

  try {
    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-sonar-small-128k-online",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: query }
        ],
        temperature: 0.2,
        search_recency_filter: "week",
        return_images: false,
        return_related_questions: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Perplexity API error ${response.status}: ${errorText}`);
      return null;
    }

    const data = await response.json();
    return {
      content: data.choices[0]?.message?.content || "",
      citations: data.citations || [],
    };
  } catch (error) {
    console.error("Perplexity search failed:", error);
    return null;
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Setup authentication (must be before other routes)
  await setupAuth(app);
  registerAuthRoutes(app);
  
  app.post("/api/media-kit/generate", async (req, res) => {
    try {
      const handles = socialHandlesSchema.parse(req.body);

      if (!handles.instagram && !handles.tiktok && !handles.youtube) {
        return res.status(400).json({ error: "At least one social handle is required" });
      }

      const systemPrompt = `You are an expert in influencer marketing and media kit creation. Generate a professional media kit and suggested rate card for a cat content creator based on their social media presence.

You must respond with valid JSON in this exact format:
{
  "socialStats": {
    "instagram": {
      "handle": "@username",
      "followers": 245000,
      "engagementRate": 4.8,
      "avgLikes": 12000,
      "avgComments": 580
    },
    "tiktok": {
      "handle": "@username",
      "followers": 180000,
      "engagementRate": 6.2,
      "avgViews": 450000,
      "avgLikes": 28000
    },
    "youtube": {
      "handle": "channel name",
      "subscribers": 95000,
      "avgViews": 75000,
      "engagementRate": 5.1
    }
  },
  "mediaKit": {
    "creatorName": "Creator Name",
    "bio": "A compelling bio about the creator and their content style...",
    "contentCategories": ["Pet Care", "Lifestyle", "Comedy", "Product Reviews"],
    "audienceDemographics": {
      "primaryAgeGroup": "25-34",
      "genderSplit": "68% Female, 32% Male",
      "topLocations": ["USA", "Canada", "UK"]
    },
    "recentPartnerships": [
      {"brand": "Purina", "campaignType": "Sponsored Posts"},
      {"brand": "Chewy", "campaignType": "Product Reviews"}
    ]
  },
  "rateCard": {
    "individualPosts": {
      "instagramPost": 1200,
      "instagramStory": 400,
      "instagramReel": 1500,
      "tiktokVideo": 1800,
      "youtubeIntegration": 3500
    },
    "packages": {
      "basic": 2500,
      "standard": 5000,
      "premium": 10000
    }
  }
}

Only include platforms that were provided. Generate realistic stats based on a successful cat content creator. Make the rate card proportional to follower counts and engagement rates.`;

      const userPrompt = `Generate a media kit for a cat content creator with the following social handles:
${handles.instagram ? `- Instagram: ${handles.instagram}` : ""}
${handles.tiktok ? `- TikTok: ${handles.tiktok}` : ""}
${handles.youtube ? `- YouTube: ${handles.youtube}` : ""}

Please generate realistic social media statistics, a professional bio, and appropriate rate suggestions based on these platforms.`;

      console.log("Starting media kit generation for handles:", handles);
      
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        response_format: { type: "json_object" },
      });

      console.log("OpenAI response received:", response.choices?.length, "choices");
      
      const content = response.choices[0]?.message?.content;
      if (!content) {
        console.error("No content in response:", JSON.stringify(response.choices[0]));
        throw new Error("No response from AI");
      }
      
      console.log("Content received, length:", content.length);

      let generatedData;
      try {
        generatedData = JSON.parse(content);
      } catch (parseError) {
        console.error("Failed to parse AI response:", parseError);
        throw new Error("Invalid AI response format");
      }

      if (!generatedData.mediaKit || !generatedData.rateCard) {
        console.error("Missing required fields in AI response");
        throw new Error("Incomplete AI response");
      }

      const filteredSocialStats: Record<string, unknown> = {};
      if (handles.instagram && generatedData.socialStats?.instagram) {
        filteredSocialStats.instagram = generatedData.socialStats.instagram;
      }
      if (handles.tiktok && generatedData.socialStats?.tiktok) {
        filteredSocialStats.tiktok = generatedData.socialStats.tiktok;
      }
      if (handles.youtube && generatedData.socialStats?.youtube) {
        filteredSocialStats.youtube = generatedData.socialStats.youtube;
      }

      res.json({
        socialStats: filteredSocialStats,
        mediaKit: generatedData.mediaKit,
        rateCard: generatedData.rateCard,
      });
    } catch (error) {
      console.error("Media kit generation error:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid request data" });
      }
      res.status(500).json({ error: "Failed to generate media kit" });
    }
  });

  // AI Trend Discovery - Uses real web search via Perplexity with OpenAI fallback
  app.post("/api/trends/discover", async (req, res) => {
    try {
      const perplexitySystemPrompt = `You are a social media trend analyst. Search for REAL, CURRENT viral trends on TikTok and Instagram that are suitable for cat/pet content creators.`;

      const perplexityResult = await searchWithPerplexity(
        "What are the current viral TikTok and Instagram trends in January 2026 that would work well for cat content creators and pet influencers? Include trending sounds, challenges, and hashtags.",
        perplexitySystemPrompt
      );

      let dataSource = "AI-generated trend recommendations";
      let citations: string[] = [];
      let promptContent = "";

      if (perplexityResult) {
        dataSource = "Real-time web search via Perplexity AI";
        citations = perplexityResult.citations || [];
        promptContent = `Based on these real search results, extract current trends:\n${perplexityResult.content}\n\nCitations: ${JSON.stringify(citations)}`;
      } else {
        promptContent = "Generate 5 currently popular and realistic social media trends for cat content creators. Focus on trends that are typical for TikTok and Instagram pet content. Make them specific and actionable.";
      }

      const openaiResponse = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a social media trend expert for pet influencers. Return ONLY valid JSON with this structure:
{
  "trends": [
    {
      "id": "unique-id-string",
      "title": "Trend title",
      "description": "How to use this trend for cat content",
      "hashtags": ["hashtag1", "hashtag2"],
      "platform": "TikTok or Instagram",
      "trend_type": "Sound|Challenge|Format|Hashtag",
      "engagement_potential": "High or Medium"
    }
  ]
}`
          },
          {
            role: "user",
            content: promptContent
          }
        ],
        response_format: { type: "json_object" },
      });

      const content = openaiResponse.choices[0]?.message?.content;
      if (!content) throw new Error("No response from AI");

      const data = JSON.parse(content);
      data.citations = citations;
      data.dataSource = dataSource;
      res.json(data);
    } catch (error) {
      console.error("Trend discovery error:", error);
      res.status(500).json({ error: "Failed to discover trends" });
    }
  });

  // AI Content Ideas Generator
  app.post("/api/content-ideas/generate", async (req, res) => {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a creative content strategist for pet influencers. Generate fresh, actionable content ideas for cat creators.

Respond with JSON:
{
  "ideas": [
    {
      "id": "unique-id",
      "title": "Content idea title",
      "description": "Detailed description with execution tips",
      "platform": "TikTok|Instagram|YouTube",
      "content_type": "Reel|Photo|Carousel|Video",
      "hashtags": ["hashtag1", "hashtag2"],
      "estimated_engagement": "High|Medium"
    }
  ]
}`
          },
          {
            role: "user",
            content: "Generate 5 creative and unique content ideas for a cat influencer. Make them specific, actionable, and based on what performs well for pet content creators."
          }
        ],
        response_format: { type: "json_object" },
      });

      const content = response.choices[0]?.message?.content;
      if (!content) throw new Error("No response from AI");

      const data = JSON.parse(content);
      res.json(data);
    } catch (error) {
      console.error("Content ideas error:", error);
      res.status(500).json({ error: "Failed to generate content ideas" });
    }
  });

  // Casting Call Scanner - Uses real web search via Perplexity with OpenAI fallback
  app.post("/api/casting-calls/scan", async (req, res) => {
    try {
      const perplexitySystemPrompt = `You are a brand partnership researcher. Search for REAL, CURRENT UGC casting calls and brand collaboration opportunities for pet/cat influencers.`;

      const perplexityResult = await searchWithPerplexity(
        "Current pet influencer casting calls and UGC opportunities January 2026. Cat content creator brand deals. Pet brand ambassador programs accepting applications.",
        perplexitySystemPrompt
      );

      let dataSource = "AI-generated opportunity recommendations";
      let citations: string[] = [];
      let promptContent = "";

      if (perplexityResult) {
        dataSource = "Real-time web search via Perplexity AI";
        citations = perplexityResult.citations || [];
        promptContent = `Based on these real search results, extract casting calls and opportunities:\n${perplexityResult.content}\n\nCitations: ${JSON.stringify(citations)}`;
      } else {
        promptContent = "Generate 5 realistic UGC casting calls and brand collaboration opportunities for cat influencers. Include well-known pet brands like Chewy, Purina, Blue Buffalo, PetSmart, and similar companies that commonly work with pet influencers. Make them specific and actionable with realistic requirements.";
      }

      const openaiResponse = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a brand partnership expert. Return ONLY valid JSON with this structure:
{
  "opportunities": [
    {
      "id": "unique-id-string",
      "title": "Opportunity title",
      "brand_name": "Brand Name",
      "description": "Description of the collaboration",
      "requirements": "Follower requirements, content type needed",
      "compensation_type": "Paid or Product or Affiliate",
      "deadline": "Date or Rolling",
      "platforms": ["Instagram", "TikTok"],
      "source_url": "URL if available"
    }
  ]
}`
          },
          {
            role: "user",
            content: promptContent
          }
        ],
        response_format: { type: "json_object" },
      });

      const content = openaiResponse.choices[0]?.message?.content;
      if (!content) throw new Error("No response from AI");

      const data = JSON.parse(content);
      data.citations = citations;
      data.dataSource = dataSource;
      data.lastUpdated = new Date().toISOString();
      res.json(data);
    } catch (error) {
      console.error("Casting calls scan error:", error);
      res.status(500).json({ error: "Failed to scan for opportunities" });
    }
  });

  // AI Opportunity Extraction from Email/DM
  app.post("/api/opportunities/extract", async (req, res) => {
    try {
      const { content: rawContent } = req.body;
      
      if (!rawContent || typeof rawContent !== "string") {
        return res.status(400).json({ error: "Content is required" });
      }

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are an expert at extracting structured data from brand outreach messages. Parse the provided email or DM and extract key opportunity details.

Respond with JSON:
{
  "opportunity": {
    "id": "unique-id-based-on-content",
    "title": "Inferred opportunity title",
    "brand_name": "Brand name if mentioned",
    "raw_content": "original content",
    "extracted_deliverables": ["deliverable 1", "deliverable 2"],
    "extracted_compensation": "$500 or Product value",
    "deadline": "Extracted deadline if any",
    "platforms": ["Instagram", "TikTok"],
    "contact_info": "Email or contact info",
    "status": "new",
    "created_at": "current date"
  }
}`
          },
          {
            role: "user",
            content: `Extract structured data from this brand outreach message:\n\n"${rawContent}"`
          }
        ],
        response_format: { type: "json_object" },
      });

      const aiContent = response.choices[0]?.message?.content;
      if (!aiContent) throw new Error("No response from AI");

      const data = JSON.parse(aiContent);
      data.opportunity.raw_content = rawContent;
      data.opportunity.created_at = new Date().toISOString();
      
      res.json(data);
    } catch (error) {
      console.error("Opportunity extraction error:", error);
      res.status(500).json({ error: "Failed to extract opportunity" });
    }
  });

  // Journal Entries API
  app.get("/api/journal/entries", async (req, res) => {
    try {
      const entries = await db.select().from(journalEntries).orderBy(desc(journalEntries.createdAt));
      res.json(entries);
    } catch (error) {
      console.error("Journal entries error:", error);
      res.status(500).json({ error: "Failed to fetch entries" });
    }
  });

  app.post("/api/journal/entries", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const [dbUser] = await db.select().from(users).where(eq(users.id, userId));
      
      if (!dbUser) {
        return res.status(401).json({ error: "User not found" });
      }

      const { title, content, isShared } = req.body;
      if (!title || !content) {
        return res.status(400).json({ error: "Title and content are required" });
      }

      const authorName = `${dbUser.firstName || ""} ${dbUser.lastName || ""}`.trim() || dbUser.email || "Anonymous";

      const [entry] = await db.insert(journalEntries).values({
        userId: dbUser.id,
        authorName,
        title,
        content,
        isShared: isShared ? "true" : "false",
      }).returning();

      res.json(entry);
    } catch (error) {
      console.error("Journal entry creation error:", error);
      res.status(500).json({ error: "Failed to create entry" });
    }
  });

  return httpServer;
}
