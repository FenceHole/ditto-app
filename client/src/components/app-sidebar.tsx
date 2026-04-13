import { useLocation, Link } from "wouter";
import {
  Home,
  Heart,
  MessageCircle,
  BookOpen,
  Shield,
  User,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Questions", url: "/questions", icon: MessageCircle },
  { title: "Love Journal", url: "/love-journal", icon: BookOpen },
  { title: "Profile", url: "/profile", icon: User },
];

export function AppSidebar() {
  const [location] = useLocation();
  const { user } = useAuth();

  const userInitials = user
    ? `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase() || user.email?.[0]?.toUpperCase() || "U"
    : "U";

  const userName = user
    ? `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email || "User"
    : "User";

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-pink-500">
            <Heart className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-semibold text-sidebar-foreground">
            Chris & Annie
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Our Space</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const isActive = location === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      data-testid={`nav-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      <Link href={item.url}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user?.profileImageUrl || undefined} alt={userName} />
            <AvatarFallback className="bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate" data-testid="text-username">
              {userName}
            </p>
            {user?.email && (
              <p className="text-xs text-muted-foreground truncate" data-testid="text-email">
                {user.email}
              </p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            asChild
            data-testid="button-logout"
          >
            <a href="/api/logout" title="Log out">
              <LogOut className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
