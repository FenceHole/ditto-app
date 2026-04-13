import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Sparkles, Hash, Zap, RefreshCw, ExternalLink, Globe } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Trend } from "@shared/schema";

interface TrendWithSource extends Trend {
  source?: string;
}

interface TrendsResponse {
  trends: TrendWithSource[];
  citations?: string[];
  dataSource?: string;
}

export default function TrendsPage() {
  const [trends, setTrends] = useState<TrendWithSource[]>([]);
  const [citations, setCitations] = useState<string[]>([]);
  const [dataSource, setDataSource] = useState<string>("");
  const { toast } = useToast();

  const discoverMutation = useMutation({
    mutationFn: async (): Promise<TrendsResponse> => {
      const response = await apiRequest("POST", "/api/trends/discover");
      return response.json();
    },
    onSuccess: (data) => {
      setTrends(data.trends || []);
      setCitations(data.citations || []);
      setDataSource(data.dataSource || "");
      toast({
        title: "Trends discovered!",
        description: `Found ${data.trends?.length || 0} trending topics from real sources`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Discovery failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

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

  const getEngagementColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "high":
        return "bg-green-500/10 text-green-600 dark:text-green-400";
      case "medium":
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400";
      default:
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <div className="flex flex-col gap-8 p-6 md:p-8" data-testid="trends-page">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Trend Discovery</h1>
          <p className="text-muted-foreground">
            AI-powered viral trends for cat content creators
          </p>
        </div>
        <Button
          onClick={() => discoverMutation.mutate()}
          disabled={discoverMutation.isPending}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          data-testid="button-discover-trends"
        >
          {discoverMutation.isPending ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Discovering...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Discover Trends
            </>
          )}
        </Button>
      </div>

      {trends.length === 0 && !discoverMutation.isPending && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-4 py-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
              <TrendingUp className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-center">
              <h2 className="text-lg font-semibold">Discover What's Trending</h2>
              <p className="text-sm text-muted-foreground max-w-md">
                Click "Discover Trends" to find viral content trends perfect for cat creators
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {discoverMutation.isPending && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-5 w-3/4 rounded bg-muted" />
                <div className="h-4 w-1/2 rounded bg-muted" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 rounded bg-muted" />
                  <div className="h-4 w-5/6 rounded bg-muted" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {trends.length > 0 && (
        <>
          {dataSource && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg px-4 py-2" data-testid="data-source-banner">
              <Globe className="h-4 w-4" />
              <span>{dataSource}</span>
            </div>
          )}
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" data-testid="trends-grid">
            {trends.map((trend) => (
              <Card key={trend.id} className="hover-elevate transition-all">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base leading-tight">{trend.title}</CardTitle>
                    <Badge variant="outline" className={getPlatformColor(trend.platform)}>
                      {trend.platform}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    <Zap className="h-3 w-3" />
                    {trend.trend_type}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{trend.description}</p>
                  
                  <div className="flex flex-wrap gap-1">
                    {trend.hashtags?.slice(0, 4).map((tag, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        <Hash className="mr-1 h-3 w-3" />
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-muted-foreground">Engagement Potential</span>
                    <Badge className={getEngagementColor(trend.engagement_potential)}>
                      {trend.engagement_potential}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {citations.length > 0 && (
            <Card className="mt-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Sources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {citations.slice(0, 5).map((url, i) => (
                    <li key={i}>
                      <a 
                        href={url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground hover:text-foreground hover:underline truncate block"
                      >
                        {url}
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
