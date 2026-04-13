import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Heart, User, Mail, Calendar } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { ThemeToggle } from "@/components/theme-toggle";

export default function ProfilePage() {
  const { user } = useAuth();

  const userName = user
    ? `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email || "User"
    : "User";

  const userInitials = user
    ? `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase() || user.email?.[0]?.toUpperCase() || "U"
    : "U";

  return (
    <div className="flex flex-col gap-8 p-6 md:p-8" data-testid="profile-page">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
          <User className="h-6 w-6 text-rose-500" />
          Profile
        </h1>
        <p className="text-muted-foreground">
          Your account information and app preferences
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card data-testid="card-account-info">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-rose-500" />
              Account
            </CardTitle>
            <CardDescription>Your D!TTO account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16" data-testid="avatar-profile">
                <AvatarImage src={user?.profileImageUrl || undefined} alt={userName} />
                <AvatarFallback className="bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300 text-xl">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-semibold" data-testid="text-profile-name">
                  {userName}
                </p>
                <Badge variant="secondary" className="mt-1">
                  D!TTO Member
                </Badge>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              {user?.email && (
                <div className="flex items-center gap-3 text-sm" data-testid="text-profile-email">
                  <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-medium ml-auto">{user.email}</span>
                </div>
              )}
              {(user?.firstName || user?.lastName) && (
                <div className="flex items-center gap-3 text-sm" data-testid="text-profile-fullname">
                  <User className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-medium ml-auto">{userName}</span>
                </div>
              )}
              <div className="flex items-center gap-3 text-sm" data-testid="text-profile-joined">
                <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-muted-foreground">Member since</span>
                <span className="font-medium ml-auto">2026</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-preferences">
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Customize your app experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Appearance</p>
                <p className="text-xs text-muted-foreground">Switch between light and dark mode</p>
              </div>
              <ThemeToggle />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
