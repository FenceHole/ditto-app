import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Sparkles, Loader2 } from "lucide-react";
import { SiInstagram, SiTiktok, SiYoutube } from "react-icons/si";
import type { SocialHandles } from "@shared/schema";

interface SocialHandlesFormProps {
  handles: SocialHandles;
  onHandlesChange: (handles: SocialHandles) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export function SocialHandlesForm({
  handles,
  onHandlesChange,
  onGenerate,
  isGenerating,
}: SocialHandlesFormProps) {
  return (
    <Card data-testid="social-handles-form">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Connect Your Social Accounts
        </CardTitle>
        <CardDescription>
          Enter your social media handles to automatically generate a professional
          media kit and rate card.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="instagram" className="flex items-center gap-2">
              <SiInstagram className="h-4 w-4 text-pink-500" />
              Instagram Handle
            </Label>
            <Input
              id="instagram"
              placeholder="@username"
              value={handles.instagram || ""}
              onChange={(e) =>
                onHandlesChange({ ...handles, instagram: e.target.value })
              }
              data-testid="input-instagram"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tiktok" className="flex items-center gap-2">
              <SiTiktok className="h-4 w-4" />
              TikTok Handle
            </Label>
            <Input
              id="tiktok"
              placeholder="@username"
              value={handles.tiktok || ""}
              onChange={(e) =>
                onHandlesChange({ ...handles, tiktok: e.target.value })
              }
              data-testid="input-tiktok"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="youtube" className="flex items-center gap-2">
              <SiYoutube className="h-4 w-4 text-red-500" />
              YouTube Channel
            </Label>
            <Input
              id="youtube"
              placeholder="Channel name"
              value={handles.youtube || ""}
              onChange={(e) =>
                onHandlesChange({ ...handles, youtube: e.target.value })
              }
              data-testid="input-youtube"
            />
          </div>
        </div>
        <Button
          onClick={onGenerate}
          disabled={isGenerating || (!handles.instagram && !handles.tiktok && !handles.youtube)}
          className="w-full gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none"
          data-testid="button-generate"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              Generate Media Kit
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
