import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Briefcase, Users, DollarSign, Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Activity } from "@shared/schema";

interface ActivityFeedProps {
  activities: Activity[];
}

const activityIcons = {
  casting_call: Briefcase,
  collaboration: Users,
  payment: DollarSign,
  campaign: Megaphone,
};

const activityColors = {
  casting_call: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  collaboration: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
  payment: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
  campaign: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
};

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <Card data-testid="activity-feed">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[280px] pr-4">
          <div className="space-y-4">
            {activities.map((activity) => {
              const Icon = activityIcons[activity.type];
              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-3"
                  data-testid={`activity-item-${activity.id}`}
                >
                  <div
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                      activityColors[activity.type]
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <p className="text-sm font-medium leading-tight truncate">
                      {activity.title}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
