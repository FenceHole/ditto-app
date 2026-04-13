import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  MessageCircle, 
  BookOpen, 
  Sparkles,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background" data-testid="landing-page">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-pink-500">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Chris & Annie
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="/api/login" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-login"
            >
              Log in
            </a>
            <Button asChild data-testid="button-get-started">
              <a href="/api/login">
                Enter Our Space
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-background to-pink-50 dark:from-rose-950/20 dark:via-background dark:to-pink-950/20" />
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <Badge variant="outline" className="mb-4 bg-rose-50 dark:bg-rose-900/30">
                <Heart className="mr-1 h-3 w-3" />
                Our Private Space
              </Badge>
              <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                Growing{" "}
                <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  Together
                </span>{" "}
                Every Day
              </h1>
              <p className="mb-8 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
                A private space for us to connect deeper, share our hearts, 
                and build a love that grows stronger every day.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" asChild data-testid="button-hero-cta">
                  <a href="/api/login">
                    Enter Our Space
                    <Heart className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 border-t" id="features">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Ways to Connect</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Tools to help us learn about each other, share our hearts, and grow closer together.
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
              <Card className="hover-elevate">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-rose-100 dark:bg-rose-900/30 mb-2">
                    <MessageCircle className="h-6 w-6 text-rose-600 dark:text-rose-400" />
                  </div>
                  <CardTitle>Question Games</CardTitle>
                  <CardDescription>
                    Fun and deep questions to discover more about each other
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Soul-bearing conversations
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Fun & playful questions
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Dreams & future planning
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover-elevate">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-pink-100 dark:bg-pink-900/30 mb-2">
                    <BookOpen className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                  </div>
                  <CardTitle>Love Journal</CardTitle>
                  <CardDescription>
                    Share love letters and heartfelt messages
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Write love letters
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Share with each other
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Keep our memories safe
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover-elevate">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30 mb-2">
                    <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle>Growing Together</CardTitle>
                  <CardDescription>
                    Building a stronger relationship every day
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Learn about each other
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Deepen our connection
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Build lasting love
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 border-t bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Connect?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Our private space for building a love that grows stronger every day.
            </p>
            <Button size="lg" asChild data-testid="button-footer-cta">
              <a href="/api/login">
                Enter Our Space
                <Heart className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </section>

        <footer className="border-t py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-pink-500">
                  <Heart className="h-4 w-4 text-white" />
                </div>
                <span className="font-semibold">Chris & Annie</span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
