import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Briefcase, Users } from "lucide-react";
import { Link } from "wouter";

export function QuickActions() {
  return (
    <Card data-testid="quick-actions">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Link href="/media-kit" className="block">
          <Button
            className="w-full justify-start gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none"
            data-testid="button-generate-media-kit"
          >
            <Sparkles className="h-5 w-5" />
            Generate Media Kit
          </Button>
        </Link>
        <Link href="/casting-calls" className="block">
          <Button
            variant="outline"
            className="w-full justify-start gap-3 border-purple-300 text-purple-600 dark:border-purple-700 dark:text-purple-400"
            data-testid="button-browse-casting-calls"
          >
            <Briefcase className="h-5 w-5" />
            Browse Casting Calls
          </Button>
        </Link>
        <Link href="/marketplace" className="block">
          <Button
            variant="outline"
            className="w-full justify-start gap-3 border-purple-300 text-purple-600 dark:border-purple-700 dark:text-purple-400"
            data-testid="button-find-collaborators"
          >
            <Users className="h-5 w-5" />
            Find Collaborators
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
