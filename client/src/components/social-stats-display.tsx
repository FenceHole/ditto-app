import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SiInstagram, SiTiktok, SiYoutube } from "react-icons/si";
import type { SocialStats } from "@shared/schema";

interface SocialStatsDisplayProps {
  stats: SocialStats;
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + "K";
  }
  return num.toLocaleString();
}

interface StatItemProps {
  label: string;
  value: string | number;
  isPercentage?: boolean;
}

function StatItem({ label, value, isPercentage }: StatItemProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span
        className={`text-lg font-semibold ${
          isPercentage ? "text-emerald-600 dark:text-emerald-400" : ""
        }`}
      >
        {typeof value === "number" ? formatNumber(value) : value}
        {isPercentage && "%"}
      </span>
    </div>
  );
}

export function SocialStatsDisplay({ stats }: SocialStatsDisplayProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3" data-testid="social-stats-display">
      {stats.instagram && (
        <Card data-testid="instagram-stats">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400">
                <SiInstagram className="h-4 w-4 text-white" />
              </div>
              Instagram
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <StatItem label="Followers" value={stats.instagram.followers} />
              <StatItem
                label="Engagement"
                value={stats.instagram.engagementRate}
                isPercentage
              />
              <StatItem label="Avg Likes" value={stats.instagram.avgLikes} />
              <StatItem label="Avg Comments" value={stats.instagram.avgComments} />
            </div>
          </CardContent>
        </Card>
      )}

      {stats.tiktok && (
        <Card data-testid="tiktok-stats">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black dark:bg-white">
                <SiTiktok className="h-4 w-4 text-white dark:text-black" />
              </div>
              TikTok
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <StatItem label="Followers" value={stats.tiktok.followers} />
              <StatItem
                label="Engagement"
                value={stats.tiktok.engagementRate}
                isPercentage
              />
              <StatItem label="Avg Views" value={stats.tiktok.avgViews} />
              <StatItem label="Avg Likes" value={stats.tiktok.avgLikes} />
            </div>
          </CardContent>
        </Card>
      )}

      {stats.youtube && (
        <Card data-testid="youtube-stats">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600">
                <SiYoutube className="h-4 w-4 text-white" />
              </div>
              YouTube
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <StatItem label="Subscribers" value={stats.youtube.subscribers} />
              <StatItem
                label="Engagement"
                value={stats.youtube.engagementRate}
                isPercentage
              />
              <StatItem label="Avg Views" value={stats.youtube.avgViews} />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
