import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Send, BookOpen, PenLine, Calendar, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface JournalEntry {
  id: string;
  userId: string;
  authorName: string;
  title: string;
  content: string;
  isShared: string | boolean;
  createdAt: string;
}

export default function LoveJournalPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isShared, setIsShared] = useState(true);

  const { data: entries, isLoading } = useQuery<JournalEntry[]>({
    queryKey: ["/api/journal/entries"],
  });

  const createEntry = useMutation({
    mutationFn: async (data: { title: string; content: string; isShared: boolean }) => {
      const res = await apiRequest("POST", "/api/journal/entries", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/journal/entries"] });
      setTitle("");
      setContent("");
      toast({
        title: "Love letter sent",
        description: isShared ? "Your partner can now read it!" : "Saved to your private journal.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save your entry. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Missing fields",
        description: "Please add a title and message.",
        variant: "destructive",
      });
      return;
    }
    createEntry.mutate({ title, content, isShared });
  };

  const myEntries = entries?.filter(e => e.userId === user?.id) || [];
  const sharedEntries = entries?.filter(e => e.isShared === "true" || e.isShared === true) || [];
  const partnerEntries = sharedEntries.filter(e => e.userId !== user?.id);

  const authorName = user ? `${user.firstName || ""} ${user.lastName || ""}`.trim() || "You" : "You";

  return (
    <div className="p-6 space-y-6" data-testid="love-journal-page">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Love Journal</h1>
          <p className="text-muted-foreground">Share love letters and heartfelt messages</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-2 border-rose-200 dark:border-rose-800">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-100 dark:bg-rose-900/30">
                <PenLine className="h-5 w-5 text-rose-500" />
              </div>
              <div>
                <CardTitle>Write a Love Letter</CardTitle>
                <CardDescription>Express your heart to Annie</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder="Title (e.g., 'Why I Love You Today')"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  data-testid="journal-title"
                />
              </div>
              <div className="space-y-2">
                <Textarea
                  placeholder="Write from your heart..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={8}
                  data-testid="journal-content"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={isShared}
                    onChange={(e) => setIsShared(e.target.checked)}
                    className="rounded border-gray-300"
                    data-testid="share-checkbox"
                  />
                  Share with Annie
                </label>
                <Button type="submit" disabled={createEntry.isPending} data-testid="send-letter">
                  {createEntry.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="mr-2 h-4 w-4" />
                  )}
                  Send Love
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                <BookOpen className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <CardTitle>Our Love Letters</CardTitle>
                <CardDescription>Messages from the heart</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="received" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="received" data-testid="tab-received">
                  From Annie ({partnerEntries.length})
                </TabsTrigger>
                <TabsTrigger value="sent" data-testid="tab-sent">
                  My Letters ({myEntries.length})
                </TabsTrigger>
              </TabsList>
              <TabsContent value="received" className="space-y-4 mt-4">
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : partnerEntries.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Heart className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p>No letters from Annie yet</p>
                    <p className="text-sm">They'll appear here when shared</p>
                  </div>
                ) : (
                  partnerEntries.map((entry) => (
                    <Card key={entry.id} className="hover-elevate" data-testid={`entry-${entry.id}`}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{entry.title}</CardTitle>
                          <Badge variant="outline" className="text-xs">
                            <Calendar className="mr-1 h-3 w-3" />
                            {format(new Date(entry.createdAt), "MMM d, yyyy")}
                          </Badge>
                        </div>
                        <CardDescription>From {entry.authorName}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm whitespace-pre-wrap">{entry.content}</p>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>
              <TabsContent value="sent" className="space-y-4 mt-4">
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : myEntries.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <PenLine className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p>You haven't written any letters yet</p>
                    <p className="text-sm">Start expressing your love!</p>
                  </div>
                ) : (
                  myEntries.map((entry) => (
                    <Card key={entry.id} className="hover-elevate" data-testid={`my-entry-${entry.id}`}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{entry.title}</CardTitle>
                          <div className="flex items-center gap-2">
                            {(entry.isShared === "true" || entry.isShared === true) && (
                              <Badge variant="secondary" className="text-xs">
                                <Heart className="mr-1 h-3 w-3" />
                                Shared
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-xs">
                              <Calendar className="mr-1 h-3 w-3" />
                              {format(new Date(entry.createdAt), "MMM d, yyyy")}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm whitespace-pre-wrap">{entry.content}</p>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
