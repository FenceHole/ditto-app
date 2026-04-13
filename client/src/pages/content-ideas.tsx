import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Sparkles, Hash, Video, Camera, RefreshCw } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { ContentIdea } from "@shared/schema";

export default function ContentIdeasPage() {
  const [ideas, setIdeas] = useState<ContentIdea[]>([]);
  const { toast } = useToast();

  const generateMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/content-ideas/generate");
      return response.json();
    },
    onSuccess: (data) => {
      setIdeas(data.ideas);
      toast({
        title: "Ideas generated!",
        description: `Created ${data.ideas.length} fresh content ideas`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Generation failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const getContentTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "video":
      case "reel":
        return <Video className="h-4 w-4" />;
      case "photo":
      case "carousel":
        return <Camera className="h-4 w-4" />;
      default:
        return <Lightbulb className="h-4 w-4" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "tiktok":
        return "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20";
      case "instagram":
        return "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20";
      case "youtube":
        return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
      default:
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
    }
  };

  return (
    <div className="flex flex-col gap-8 p-6 md:p-8" data-testid="content-ideas-page">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">AI Content Ideas</h1>
          <p className="text-muted-foreground">
            Fresh, creative content suggestions for your cat audience
          </p>
        </div>
        <Button
          onClick={() => generateMutation.mutate()}
          disabled={generateMutation.isPending}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          data-testid="button-generate-ideas"
        >
          {generateMutation.isPending ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Ideas
            </>
          )}
        </Button>
      </div>

      {ideas.length === 0 && !generateMutation.isPending && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-4 py-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
              <Lightbulb className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-center">
              <h2 className="text-lg font-semibold">Get Creative Content Ideas</h2>
              <p className="text-sm text-muted-foreground max-w-md">
                Click "Generate Ideas" to get AI-powered content suggestions tailored for cat creators
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {generateMutation.isPending && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-5 w-3/4 rounded bg-muted" />
                <div className="h-4 w-1/2 rounded bg-muted" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 rounded bg-muted" />
                  <div className="h-4 w-5/6 rounded bg-muted" />
                  <div className="h-4 w-4/6 rounded bg-muted" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {ideas.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" data-testid="ideas-grid">
          {ideas.map((idea) => (
            <Card key={idea.id} className="hover-elevate transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base leading-tight">{idea.title}</CardTitle>
                  <Badge variant="outline" className={getPlatformColor(idea.platform)}>
                    {idea.platform}
                  </Badge>
                </div>
                <CardDescription className="flex items-center gap-2">
                  {getContentTypeIcon(idea.content_type)}
                  {idea.content_type}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{idea.description}</p>
                
                <div className="flex flex-wrap gap-1">
                  {idea.hashtags.slice(0, 5).map((tag, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      <Hash className="mr-1 h-3 w-3" />
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-muted-foreground">Est. Engagement</span>
                  <Badge variant="secondary">{idea.estimated_engagement}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
