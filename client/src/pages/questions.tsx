import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Shuffle, MessageCircle, Sparkles, Users, ArrowRight, Check } from "lucide-react";

interface Question {
  id: string;
  text: string;
  category: "deep" | "fun" | "dreams" | "memories" | "growth";
}

const questionSets: Record<string, Question[]> = {
  deep: [
    { id: "d1", text: "What's something you've never told anyone else?", category: "deep" },
    { id: "d2", text: "What's your biggest fear about our relationship?", category: "deep" },
    { id: "d3", text: "When do you feel most loved by me?", category: "deep" },
    { id: "d4", text: "What's something you wish I understood better about you?", category: "deep" },
    { id: "d5", text: "What does unconditional love mean to you?", category: "deep" },
    { id: "d6", text: "What's a wound from your past that still affects you today?", category: "deep" },
    { id: "d7", text: "What are you most grateful for in our relationship?", category: "deep" },
    { id: "d8", text: "What's something you've forgiven me for that I might not know about?", category: "deep" },
  ],
  fun: [
    { id: "f1", text: "If we could teleport anywhere right now, where would you want to go?", category: "fun" },
    { id: "f2", text: "What's the silliest thing you love about me?", category: "fun" },
    { id: "f3", text: "If we had a couples superhero name, what would it be?", category: "fun" },
    { id: "f4", text: "What song reminds you most of us?", category: "fun" },
    { id: "f5", text: "If we could switch lives for a day, what would you do as me?", category: "fun" },
    { id: "f6", text: "What's your favorite memory of us being goofy together?", category: "fun" },
    { id: "f7", text: "If we were in a movie, what genre would it be?", category: "fun" },
    { id: "f8", text: "What's something new you'd like us to try together?", category: "fun" },
  ],
  dreams: [
    { id: "dr1", text: "Where do you see us in 5 years?", category: "dreams" },
    { id: "dr2", text: "What's your dream home for us?", category: "dreams" },
    { id: "dr3", text: "What adventure do you want us to go on together?", category: "dreams" },
    { id: "dr4", text: "What tradition would you like us to start?", category: "dreams" },
    { id: "dr5", text: "What's a goal you want us to achieve together?", category: "dreams" },
    { id: "dr6", text: "How do you imagine our ideal weekend together?", category: "dreams" },
    { id: "dr7", text: "What legacy do you want us to build together?", category: "dreams" },
    { id: "dr8", text: "What's on your bucket list that you want to share with me?", category: "dreams" },
  ],
  memories: [
    { id: "m1", text: "What's your favorite memory of when we first met?", category: "memories" },
    { id: "m2", text: "When did you first know you loved me?", category: "memories" },
    { id: "m3", text: "What's a moment where I made you feel incredibly special?", category: "memories" },
    { id: "m4", text: "What's the funniest thing that's happened to us?", category: "memories" },
    { id: "m5", text: "What challenge did we overcome that made us stronger?", category: "memories" },
    { id: "m6", text: "What's your favorite date we've been on?", category: "memories" },
    { id: "m7", text: "What's a small moment between us that meant a lot to you?", category: "memories" },
    { id: "m8", text: "What's something I did that surprised you in the best way?", category: "memories" },
  ],
  growth: [
    { id: "g1", text: "How have I helped you grow as a person?", category: "growth" },
    { id: "g2", text: "What's something we could communicate better about?", category: "growth" },
    { id: "g3", text: "What's one thing you'd like us to work on together?", category: "growth" },
    { id: "g4", text: "How can I support you better in your personal goals?", category: "growth" },
    { id: "g5", text: "What's something you've learned about yourself through our relationship?", category: "growth" },
    { id: "g6", text: "What's a habit you'd like us to develop together?", category: "growth" },
    { id: "g7", text: "How do you feel we've grown together since we met?", category: "growth" },
    { id: "g8", text: "What's one way we can be better partners to each other?", category: "growth" },
  ],
};

const categoryInfo = {
  deep: { label: "Soul Bearing", icon: Heart, color: "text-rose-500", bg: "bg-rose-100 dark:bg-rose-900/30" },
  fun: { label: "Fun & Playful", icon: Sparkles, color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-900/30" },
  dreams: { label: "Dreams & Future", icon: ArrowRight, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30" },
  memories: { label: "Our Memories", icon: MessageCircle, color: "text-purple-500", bg: "bg-purple-100 dark:bg-purple-900/30" },
  growth: { label: "Growing Together", icon: Users, color: "text-green-500", bg: "bg-green-100 dark:bg-green-900/30" },
};

export default function QuestionsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [chrisAnswer, setChrisAnswer] = useState("");
  const [annieAnswer, setAnnieAnswer] = useState("");
  const [showAnswers, setShowAnswers] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<string[]>([]);

  const getRandomQuestion = (category: string) => {
    const questions = questionSets[category];
    const unanswered = questions.filter(q => !answeredQuestions.includes(q.id));
    if (unanswered.length === 0) {
      setAnsweredQuestions([]);
      return questions[Math.floor(Math.random() * questions.length)];
    }
    return unanswered[Math.floor(Math.random() * unanswered.length)];
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setCurrentQuestion(getRandomQuestion(category));
    setChrisAnswer("");
    setAnnieAnswer("");
    setShowAnswers(false);
  };

  const handleNextQuestion = () => {
    if (currentQuestion) {
      setAnsweredQuestions([...answeredQuestions, currentQuestion.id]);
    }
    if (selectedCategory) {
      setCurrentQuestion(getRandomQuestion(selectedCategory));
      setChrisAnswer("");
      setAnnieAnswer("");
      setShowAnswers(false);
    }
  };

  const handleRevealAnswers = () => {
    setShowAnswers(true);
  };

  return (
    <div className="p-6 space-y-6" data-testid="questions-page">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Question Games</h1>
          <p className="text-muted-foreground">Learn about each other and grow together</p>
        </div>
      </div>

      {!selectedCategory ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(categoryInfo).map(([key, info]) => {
            const Icon = info.icon;
            const questionCount = questionSets[key].length;
            return (
              <Card 
                key={key} 
                className="hover-elevate cursor-pointer"
                onClick={() => handleSelectCategory(key)}
                data-testid={`category-${key}`}
              >
                <CardHeader>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${info.bg} mb-2`}>
                    <Icon className={`h-6 w-6 ${info.color}`} />
                  </div>
                  <CardTitle>{info.label}</CardTitle>
                  <CardDescription>{questionCount} questions to explore together</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" data-testid={`start-${key}`}>
                    Start Questions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => setSelectedCategory(null)} data-testid="back-to-categories">
              Back to Categories
            </Button>
            <Badge variant="outline" className={categoryInfo[selectedCategory as keyof typeof categoryInfo].bg}>
              {categoryInfo[selectedCategory as keyof typeof categoryInfo].label}
            </Badge>
          </div>

          {currentQuestion && (
            <Card className="border-2 border-purple-200 dark:border-purple-800">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl leading-relaxed">{currentQuestion.text}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Heart className="h-4 w-4 text-rose-500" />
                      Chris's Answer
                    </label>
                    <Textarea
                      placeholder="Type your answer..."
                      value={chrisAnswer}
                      onChange={(e) => setChrisAnswer(e.target.value)}
                      className={showAnswers ? "" : "blur-sm focus:blur-none"}
                      rows={4}
                      data-testid="chris-answer"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Heart className="h-4 w-4 text-pink-500" />
                      Annie's Answer
                    </label>
                    <Textarea
                      placeholder="Type your answer..."
                      value={annieAnswer}
                      onChange={(e) => setAnnieAnswer(e.target.value)}
                      className={showAnswers ? "" : "blur-sm focus:blur-none"}
                      rows={4}
                      data-testid="annie-answer"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {!showAnswers && (chrisAnswer || annieAnswer) && (
                    <Button onClick={handleRevealAnswers} variant="secondary" data-testid="reveal-answers">
                      <Check className="mr-2 h-4 w-4" />
                      Reveal Answers
                    </Button>
                  )}
                  <Button onClick={handleNextQuestion} data-testid="next-question">
                    <Shuffle className="mr-2 h-4 w-4" />
                    Next Question
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
