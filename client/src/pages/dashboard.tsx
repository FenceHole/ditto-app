import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, BookOpen, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";

export default function Dashboard() {
  const { user } = useAuth();
  const firstName = user?.firstName || "Love";

  return (
    <div className="p-6 space-y-6" data-testid="dashboard-page">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">
          Welcome back, {firstName}
          <Heart className="inline-block ml-2 h-8 w-8 text-rose-500" />
        </h1>
        <p className="text-muted-foreground">
          Your space to connect, grow, and love together
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover-elevate border-2 border-rose-100 dark:border-rose-900">
          <CardHeader>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-rose-100 dark:bg-rose-900/30 mb-2">
              <MessageCircle className="h-6 w-6 text-rose-600 dark:text-rose-400" />
            </div>
            <CardTitle>Question Games</CardTitle>
            <CardDescription>
              Deep conversations and fun questions to learn about each other
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full" data-testid="go-to-questions">
              <Link href="/questions">
                Start Exploring
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover-elevate border-2 border-pink-100 dark:border-pink-900">
          <CardHeader>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-pink-100 dark:bg-pink-900/30 mb-2">
              <BookOpen className="h-6 w-6 text-pink-600 dark:text-pink-400" />
            </div>
            <CardTitle>Love Journal</CardTitle>
            <CardDescription>
              Share love letters and heartfelt messages with each other
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full" data-testid="go-to-journal">
              <Link href="/love-journal">
                Write a Letter
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover-elevate border-2 border-purple-100 dark:border-purple-900">
          <CardHeader>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30 mb-2">
              <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <CardTitle>Growing Together</CardTitle>
            <CardDescription>
              Every conversation brings us closer. Every letter is a treasure.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <p className="text-2xl font-bold text-rose-500">
                Chris & Annie
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Building love, one moment at a time
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20 border-rose-200 dark:border-rose-800">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold mb-2">Daily Connection Tip</h3>
              <p className="text-muted-foreground">
                Take 5 minutes today to share one thing you appreciate about each other. 
                Small moments of gratitude build lasting love.
              </p>
            </div>
            <Heart className="h-16 w-16 text-rose-300 dark:text-rose-700 flex-shrink-0" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
