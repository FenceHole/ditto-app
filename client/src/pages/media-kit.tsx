import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { SocialHandlesForm } from "@/components/social-handles-form";
import { SocialStatsDisplay } from "@/components/social-stats-display";
import { MediaKitPreview } from "@/components/media-kit-preview";
import { RateCardDisplay } from "@/components/rate-card-display";
import { useToast } from "@/hooks/use-toast";
import type { SocialHandles, SocialStats, MediaKit, RateCard } from "@shared/schema";

interface GenerateMediaKitResponse {
  socialStats: SocialStats;
  mediaKit: MediaKit;
  rateCard: RateCard;
}

export default function MediaKitPage() {
  const { toast } = useToast();
  const [handles, setHandles] = useState<SocialHandles>({
    instagram: "",
    tiktok: "",
    youtube: "",
  });
  const [generatedData, setGeneratedData] = useState<GenerateMediaKitResponse | null>(null);

  const generateMutation = useMutation({
    mutationFn: async (socialHandles: SocialHandles) => {
      const response = await apiRequest("POST", "/api/media-kit/generate", socialHandles);
      return response.json() as Promise<GenerateMediaKitResponse>;
    },
    onSuccess: (data) => {
      setGeneratedData(data);
      toast({
        title: "Media Kit Generated!",
        description: "Your professional media kit and rate card are ready.",
      });
    },
    onError: (error) => {
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate media kit",
        variant: "destructive",
      });
    },
  });

  const handleGenerate = () => {
    generateMutation.mutate(handles);
  };

  const handleDownload = () => {
    toast({
      title: "Coming Soon",
      description: "PDF download feature will be available soon!",
    });
  };

  return (
    <div className="flex flex-col gap-8 p-6 md:p-8" data-testid="media-kit-page">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Media Kit Generator</h1>
        <p className="text-muted-foreground">
          Connect your social accounts to automatically generate a professional media
          kit and rate card.
        </p>
      </div>

      <SocialHandlesForm
        handles={handles}
        onHandlesChange={setHandles}
        onGenerate={handleGenerate}
        isGenerating={generateMutation.isPending}
      />

      {generatedData && (
        <>
          <SocialStatsDisplay stats={generatedData.socialStats} />

          <div className="grid gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <MediaKitPreview
                mediaKit={generatedData.mediaKit}
                onDownload={handleDownload}
              />
            </div>
            <div className="lg:col-span-2">
              <RateCardDisplay 
                rateCard={generatedData.rateCard} 
                socialStats={generatedData.socialStats}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
