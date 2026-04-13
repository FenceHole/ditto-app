import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Search, Building2, Calendar, DollarSign, ExternalLink, RefreshCw, Globe } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { CastingCall } from "@shared/schema";

interface CastingCallsResponse {
  opportunities: CastingCall[];
  citations?: string[];
  dataSource?: string;
  lastUpdated?: string;
}

export default function CastingCallsPage() {
  const [castingCalls, setCastingCalls] = useState<CastingCall[]>([]);
  const [citations, setCitations] = useState<string[]>([]);
  const [dataSource, setDataSource] = useState<string>("");
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const { toast } = useToast();

  const scanMutation = useMutation({
    mutationFn: async (): Promise<CastingCallsResponse> => {
      const response = await apiRequest("POST", "/api/casting-calls/scan");
      return response.json();
    },
    onSuccess: (data) => {
      setCastingCalls(data.opportunities || []);
      setCitations(data.citations || []);
      setDataSource(data.dataSource || "");
      setLastUpdated(data.lastUpdated || "");
      toast({
        title: "Opportunities found!",
        description: `Discovered ${data.opportunities?.length || 0} real casting calls`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Scan failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const getCompensationColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "paid":
        return "bg-green-500/10 text-green-600 dark:text-green-400";
      case "product":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
      case "affiliate":
        return "bg-orange-500/10 text-orange-600 dark:text-orange-400";
      default:
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <div className="flex flex-col gap-8 p-6 md:p-8" data-testid="casting-calls-page">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Casting Calls</h1>
          <p className="text-muted-foreground">
            AI-powered discovery of brand opportunities for cat creators
          </p>
        </div>
        <Button
          onClick={() => scanMutation.mutate()}
          disabled={scanMutation.isPending}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          data-testid="button-scan-opportunities"
        >
          {scanMutation.isPending ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Scanning...
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Scan for Opportunities
            </>
          )}
        </Button>
      </div>

      {castingCalls.length === 0 && !scanMutation.isPending && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-4 py-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
              <Briefcase className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-center">
              <h2 className="text-lg font-semibold">Find Brand Opportunities</h2>
              <p className="text-sm text-muted-foreground max-w-md">
                Click "Scan for Opportunities" to discover UGC casting calls and brand collaborations for cat influencers
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {scanMutation.isPending && (
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
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

      {castingCalls.length > 0 && (
        <>
          {dataSource && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg px-4 py-2" data-testid="data-source-banner">
              <Globe className="h-4 w-4" />
              <span>{dataSource}</span>
              {lastUpdated && (
                <span className="ml-auto text-xs">
                  Updated: {new Date(lastUpdated).toLocaleString()}
                </span>
              )}
            </div>
          )}
          
          <div className="grid gap-4 md:grid-cols-2" data-testid="casting-calls-grid">
            {castingCalls.map((call) => (
              <Card key={call.id} className="hover-elevate transition-all">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle className="text-base leading-tight">{call.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <Building2 className="h-3 w-3" />
                        {call.brand_name}
                      </CardDescription>
                    </div>
                    <Badge className={getCompensationColor(call.compensation_type)}>
                      <DollarSign className="mr-1 h-3 w-3" />
                      {call.compensation_type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{call.description}</p>
                  
                  <div className="text-sm">
                    <span className="font-medium">Requirements:</span>
                    <p className="text-muted-foreground">{call.requirements}</p>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {call.platforms?.map((platform, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {platform}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {call.deadline && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {call.deadline}
                      </div>
                    )}
                    {call.source_url && (
                      <Button variant="ghost" size="sm" className="text-xs" asChild>
                        <a href={call.source_url} target="_blank" rel="noopener noreferrer">
                          View Details
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    )}
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
