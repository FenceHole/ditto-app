import { z } from "zod";

// Re-export auth models (users and sessions tables)
export * from "./models/auth";

// Social media stats for creators
export const socialStatsSchema = z.object({
  instagram: z.object({
    handle: z.string(),
    followers: z.number(),
    engagementRate: z.number(),
    avgLikes: z.number(),
    avgComments: z.number(),
  }).optional(),
  tiktok: z.object({
    handle: z.string(),
    followers: z.number(),
    engagementRate: z.number(),
    avgViews: z.number(),
    avgLikes: z.number(),
  }).optional(),
  youtube: z.object({
    handle: z.string(),
    subscribers: z.number(),
    avgViews: z.number(),
    engagementRate: z.number(),
  }).optional(),
});

export type SocialStats = z.infer<typeof socialStatsSchema>;

// Media kit types
export const mediaKitSchema = z.object({
  creatorName: z.string(),
  bio: z.string(),
  contentCategories: z.array(z.string()),
  audienceDemographics: z.object({
    primaryAgeGroup: z.string(),
    genderSplit: z.string(),
    topLocations: z.array(z.string()),
  }),
  recentPartnerships: z.array(z.object({
    brand: z.string(),
    campaignType: z.string(),
  })),
});

export type MediaKit = z.infer<typeof mediaKitSchema>;

// Rate card types
export const rateCardSchema = z.object({
  individualPosts: z.object({
    instagramPost: z.number(),
    instagramStory: z.number(),
    instagramReel: z.number(),
    tiktokVideo: z.number(),
    youtubeIntegration: z.number(),
  }),
  packages: z.object({
    basic: z.number(),
    standard: z.number(),
    premium: z.number(),
  }),
});

export type RateCard = z.infer<typeof rateCardSchema>;

// Social handles input schema
export const socialHandlesSchema = z.object({
  instagram: z.string().optional(),
  tiktok: z.string().optional(),
  youtube: z.string().optional(),
});

export type SocialHandles = z.infer<typeof socialHandlesSchema>;

// Activity types for dashboard
export const activitySchema = z.object({
  id: z.number(),
  type: z.enum(["casting_call", "collaboration", "payment", "campaign"]),
  title: z.string(),
  description: z.string(),
  timestamp: z.string(),
});

export type Activity = z.infer<typeof activitySchema>;

// Dashboard stats
export const dashboardStatsSchema = z.object({
  totalFollowers: z.number(),
  followerGrowth: z.string(),
  engagementRate: z.number(),
  monthlyEarnings: z.number(),
  earningsGrowth: z.string(),
  activeCampaigns: z.number(),
  pendingApplications: z.number(),
});

export type DashboardStats = z.infer<typeof dashboardStatsSchema>;

// Creator profile for rate calculation
export const creatorProfileSchema = z.object({
  instagram_followers: z.number().default(0),
  tiktok_followers: z.number().default(0),
  youtube_subscribers: z.number().default(0),
  niche: z.string().default("cat content"),
  location: z.string().optional(),
});

export type CreatorProfile = z.infer<typeof creatorProfileSchema>;

// Calculated rates (algorithmic, not AI)
export const calculatedRatesSchema = z.object({
  ratePhoto: z.number(),
  rateVideo: z.number(),
  rateStory: z.number(),
  rateTikTok: z.number(),
  rateYouTube: z.number(),
  rateBundle: z.number(),
});

export type CalculatedRates = z.infer<typeof calculatedRatesSchema>;

// Casting call opportunity
export const castingCallSchema = z.object({
  id: z.string(),
  title: z.string(),
  brand_name: z.string(),
  description: z.string(),
  requirements: z.string(),
  compensation_type: z.string(),
  deadline: z.string().optional(),
  platforms: z.array(z.string()),
  contact_email: z.string().optional(),
  source_url: z.string().optional(),
  created_at: z.string(),
});

export type CastingCall = z.infer<typeof castingCallSchema>;

// Saved opportunity (extracted from emails/DMs)
export const savedOpportunitySchema = z.object({
  id: z.string(),
  title: z.string(),
  brand_name: z.string(),
  raw_content: z.string(),
  extracted_deliverables: z.array(z.string()),
  extracted_compensation: z.string().optional(),
  deadline: z.string().optional(),
  platforms: z.array(z.string()),
  contact_info: z.string().optional(),
  status: z.enum(["new", "reviewing", "applied", "accepted", "declined"]),
  created_at: z.string(),
});

export type SavedOpportunity = z.infer<typeof savedOpportunitySchema>;

// Trend for cat content
export const trendSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  hashtags: z.array(z.string()),
  platform: z.string(),
  trend_type: z.string(),
  engagement_potential: z.string(),
  created_at: z.string(),
});

export type Trend = z.infer<typeof trendSchema>;

// AI-generated content idea
export const contentIdeaSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  platform: z.string(),
  content_type: z.string(),
  hashtags: z.array(z.string()),
  estimated_engagement: z.string(),
});

export type ContentIdea = z.infer<typeof contentIdeaSchema>;
