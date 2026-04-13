import { Card, CardContent } from "@/components/ui/card";
import { Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="flex flex-col gap-8 p-6 md:p-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <Card>
        <CardContent className="flex flex-col items-center justify-center gap-4 py-16">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
            <Construction className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-center">
            <h2 className="text-lg font-semibold">Coming Soon</h2>
            <p className="text-sm text-muted-foreground max-w-md">
              This feature is currently under development. Check back soon for updates!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
