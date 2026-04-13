import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  DollarSign, 
  Info, 
  TrendingUp, 
  Instagram, 
  Youtube, 
  Music2,
  Package,
  ExternalLink
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { RateCard, SocialStats } from "@shared/schema";

interface RateCardDisplayProps {
  rateCard: RateCard;
  socialStats?: SocialStats;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function getTierFromFollowers(followers: number): { name: string; premium: string } {
  if (followers < 10000) return { name: "Nano", premium: "+20% Pet Niche" };
  if (followers < 50000) return { name: "Micro", premium: "+20% Pet Niche" };
  if (followers < 100000) return { name: "Mid-Micro", premium: "+25% Pet Niche" };
  if (followers < 500000) return { name: "Mid-Tier", premium: "+25% Pet Niche" };
  return { name: "Macro", premium: "+30% Pet Niche" };
}

function calculateRateRange(baseRate: number): { low: number; high: number } {
  const low = Math.round(baseRate * 0.7);
  const high = Math.round(baseRate * 1.3);
  return { low, high };
}

interface RateItemProps {
  label: string;
  amount: number;
  icon?: React.ReactNode;
  note?: string;
}

function RateItem({ label, amount, icon, note }: RateItemProps) {
  const range = calculateRateRange(amount);
  
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-2">
        {icon}
        <div>
          <span className="text-sm font-medium">{label}</span>
          {note && <p className="text-xs text-muted-foreground">{note}</p>}
        </div>
      </div>
      <div className="text-right">
        <div className="flex items-center gap-1">
          <span className="font-bold text-purple-600 dark:text-purple-400">
            {formatCurrency(range.low)}
          </span>
          <span className="text-muted-foreground">-</span>
          <span className="font-bold text-purple-600 dark:text-purple-400">
            {formatCurrency(range.high)}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">suggested range</p>
      </div>
    </div>
  );
}

export function RateCardDisplay({ rateCard, socialStats }: RateCardDisplayProps) {
  const totalFollowers = 
    (socialStats?.instagram?.followers || 0) + 
    (socialStats?.tiktok?.followers || 0) + 
    (socialStats?.youtube?.subscribers || 0);
  
  const tier = getTierFromFollowers(totalFollowers);
  
  const sources = [
    "Afluencer 2026 Influencer Rates",
    "Shopify Influencer Pricing Guide 2026",
    "Collabstr Pet Influencer Data ($170 avg)",
    "RecurPost Cat Creator Guide",
  ];

  return (
    <Card data-testid="rate-card-display">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              Rate Card
            </CardTitle>
            <CardDescription>
              Industry-standard rates for 2026
            </CardDescription>
          </div>
          <div className="flex flex-col gap-1 items-end">
            <Badge variant="outline" className="bg-purple-50 dark:bg-purple-900/30">
              {tier.name} Creator
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-xs">
              {tier.premium}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Instagram className="h-4 w-4 text-pink-500" />
            <h4 className="text-sm font-semibold">Instagram</h4>
          </div>
          <div className="rounded-lg border bg-card px-4">
            <RateItem
              label="Feed Post"
              amount={rateCard.individualPosts.instagramPost}
              note="Static image or carousel"
            />
            <Separator />
            <RateItem
              label="Reel"
              amount={rateCard.individualPosts.instagramReel}
              note="1.5x post rate (video premium)"
            />
            <Separator />
            <RateItem
              label="Story Bundle"
              amount={rateCard.individualPosts.instagramStory}
              note="3-5 frames, 50% of post rate"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Music2 className="h-4 w-4 text-cyan-500" />
            <h4 className="text-sm font-semibold">TikTok</h4>
          </div>
          <div className="rounded-lg border bg-card px-4">
            <RateItem
              label="Sponsored Video"
              amount={rateCard.individualPosts.tiktokVideo}
              note="Views often matter more than followers"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Youtube className="h-4 w-4 text-red-500" />
            <h4 className="text-sm font-semibold">YouTube</h4>
          </div>
          <div className="rounded-lg border bg-card px-4">
            <RateItem
              label="Video Integration"
              amount={rateCard.individualPosts.youtubeIntegration}
              note="Highest rates due to production"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-purple-500" />
            <h4 className="text-sm font-semibold">Package Deals</h4>
            <Badge variant="secondary" className="text-xs">15-30% savings</Badge>
          </div>
          <div className="rounded-lg border bg-card px-4">
            <RateItem
              label="Basic"
              amount={rateCard.packages.basic}
              note="1 post + 3 stories"
            />
            <Separator />
            <RateItem
              label="Standard"
              amount={rateCard.packages.standard}
              note="2 posts + 1 reel + stories"
            />
            <Separator />
            <RateItem
              label="Premium"
              amount={rateCard.packages.premium}
              note="Full campaign (multi-platform)"
            />
          </div>
        </div>

        <div className="rounded-lg bg-muted/50 p-4 space-y-3">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div className="space-y-2 text-xs text-muted-foreground">
              <p className="font-medium text-foreground">Rate Adjustments to Consider:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li><strong>Usage Rights:</strong> +50-100% for paid ad usage</li>
                <li><strong>Whitelisting:</strong> +100-200% for running as brand ads</li>
                <li><strong>Exclusivity:</strong> +20-50% for category exclusivity</li>
                <li><strong>Rush Delivery:</strong> +25-50% for tight deadlines</li>
                <li><strong>Multi-post Deals:</strong> -15-30% discount</li>
              </ul>
            </div>
          </div>
          
          <Separator />
          
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                <ExternalLink className="h-3 w-3" />
                View data sources
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
              <p className="font-medium mb-1">Industry Sources (2026):</p>
              <ul className="text-xs space-y-0.5">
                {sources.map((source, i) => (
                  <li key={i}>• {source}</li>
                ))}
              </ul>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs">
            <TrendingUp className="mr-1 h-3 w-3" />
            Engagement &gt;3% = Higher rates
          </Badge>
          <Badge variant="outline" className="text-xs">
            US/UK audience = Premium
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
