import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, User, Target, Handshake } from "lucide-react";
import type { MediaKit } from "@shared/schema";

interface MediaKitPreviewProps {
  mediaKit: MediaKit;
  onDownload?: () => void;
}

export function MediaKitPreview({ mediaKit, onDownload }: MediaKitPreviewProps) {
  return (
    <Card data-testid="media-kit-preview">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <CardTitle className="text-xl font-semibold">Media Kit</CardTitle>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-purple-300 text-purple-600 dark:border-purple-700 dark:text-purple-400"
          onClick={onDownload}
          data-testid="button-download-pdf"
        >
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-purple-500" />
            <h3 className="font-semibold">{mediaKit.creatorName}</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {mediaKit.bio}
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">
            Content Categories
          </h4>
          <div className="flex flex-wrap gap-2">
            {mediaKit.contentCategories.map((category) => (
              <Badge
                key={category}
                className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-500" />
            <h4 className="font-medium">Audience Demographics</h4>
          </div>
          <div className="grid gap-3 text-sm">
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Primary Age Group</span>
              <span className="font-medium">
                {mediaKit.audienceDemographics.primaryAgeGroup}
              </span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Gender Split</span>
              <span className="font-medium">
                {mediaKit.audienceDemographics.genderSplit}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Top Locations</span>
              <span className="font-medium">
                {mediaKit.audienceDemographics.topLocations.join(", ")}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Handshake className="h-5 w-5 text-purple-500" />
            <h4 className="font-medium">Recent Brand Partnerships</h4>
          </div>
          <div className="space-y-2">
            {mediaKit.recentPartnerships.map((partnership, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2 text-sm"
              >
                <span className="font-medium">{partnership.brand}</span>
                <span className="text-muted-foreground">
                  {partnership.campaignType}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
