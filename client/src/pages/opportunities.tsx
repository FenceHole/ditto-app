import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Bookmark, Sparkles, Building2, Calendar, CheckCircle2, Clock, RefreshCw } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { SavedOpportunity } from "@shared/schema";

export default function OpportunitiesPage() {
  const [rawContent, setRawContent] = useState("");
  const [opportunities, setOpportunities] = useState<SavedOpportunity[]>([]);
  const { toast } = useToast();

  const extractMutation = useMutation({
    mutationFn: async (content: string) => {
      const response = await apiRequest("POST", "/api/opportunities/extract", { content });
      return response.json();
    },
    onSuccess: (data) => {
      setOpportunities((prev) => [data.opportunity, ...prev]);
      setRawContent("");
      toast({
        title: "Opportunity extracted!",
        description: `Saved "${data.opportunity.title}" from ${data.opportunity.brand_name}`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Extraction failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
      case "reviewing":
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400";
      case "applied":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400";
      case "accepted":
        return "bg-green-500/10 text-green-600 dark:text-green-400";
      case "declined":
        return "bg-red-500/10 text-red-600 dark:text-red-400";
      default:
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
        return <CheckCircle2 className="h-3 w-3" />;
      default:
        return <Clock className="h-3 w-3" />;
    }
  };

  return (
    <div className="flex flex-col gap-8 p-6 md:p-8" data-testid="opportunities-page">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Saved Opportunities</h1>
        <p className="text-muted-foreground">
          Paste brand emails or DMs and let AI extract the details
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            AI Extraction
          </CardTitle>
          <CardDescription>
            Paste a brand outreach email or DM to automatically extract opportunity details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste brand email or DM content here...

Example:
Hi! We're from PurrfectPets and love your cat content! We'd like to collaborate on a sponsored post featuring our new organic cat treats. We're offering $500 for an Instagram reel + story. Deadline is next Friday. Let us know if interested!"
            value={rawContent}
            onChange={(e) => setRawContent(e.target.value)}
            className="min-h-[150px]"
            data-testid="input-raw-content"
          />
          <Button
            onClick={() => extractMutation.mutate(rawContent)}
            disabled={extractMutation.isPending || !rawContent.trim()}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            data-testid="button-extract"
          >
            {extractMutation.isPending ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Extracting...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Extract with AI
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {opportunities.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-4 py-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
              <Bookmark className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-center">
              <h2 className="text-lg font-semibold">No Saved Opportunities Yet</h2>
              <p className="text-sm text-muted-foreground max-w-md">
                Paste a brand email or DM above to automatically extract and save opportunity details
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {opportunities.length > 0 && (
        <div className="space-y-4" data-testid="opportunities-list">
          <h2 className="text-lg font-semibold">Your Opportunities ({opportunities.length})</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {opportunities.map((opp) => (
              <Card key={opp.id} className="hover-elevate transition-all">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle className="text-base leading-tight">{opp.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <Building2 className="h-3 w-3" />
                        {opp.brand_name}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(opp.status)}>
                      {getStatusIcon(opp.status)}
                      <span className="ml-1 capitalize">{opp.status}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {opp.extracted_deliverables.length > 0 && (
                    <div>
                      <span className="text-sm font-medium">Deliverables:</span>
                      <ul className="mt-1 text-sm text-muted-foreground list-disc list-inside">
                        {opp.extracted_deliverables.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {opp.extracted_compensation && (
                    <div className="text-sm">
                      <span className="font-medium">Compensation:</span>
                      <span className="ml-2 text-green-600 dark:text-green-400 font-semibold">
                        {opp.extracted_compensation}
                      </span>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1">
                    {opp.platforms.map((platform, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {platform}
                      </Badge>
                    ))}
                  </div>

                  {opp.deadline && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground pt-2">
                      <Calendar className="h-3 w-3" />
                      Deadline: {opp.deadline}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
