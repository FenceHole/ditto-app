import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  subtitleColor?: "green" | "red" | "muted";
  icon: LucideIcon;
  iconColor: "purple" | "pink" | "green" | "blue";
  testId?: string;
}

const iconColorClasses = {
  purple: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
  pink: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400",
  green: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
  blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
};

const subtitleColorClasses = {
  green: "text-emerald-600 dark:text-emerald-400",
  red: "text-red-600 dark:text-red-400",
  muted: "text-muted-foreground",
};

export function StatCard({
  title,
  value,
  subtitle,
  subtitleColor = "muted",
  icon: Icon,
  iconColor,
  testId,
}: StatCardProps) {
  return (
    <Card className="hover-elevate" data-testid={testId}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-muted-foreground">
              {title}
            </span>
            <span className="text-3xl font-bold tracking-tight">{value}</span>
            {subtitle && (
              <span
                className={cn("text-sm", subtitleColorClasses[subtitleColor])}
              >
                {subtitle}
              </span>
            )}
          </div>
          <div
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
              iconColorClasses[iconColor]
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
