import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User, Settings, LogOut } from "lucide-react";

export function AppHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-card px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger data-testid="button-sidebar-toggle" />
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative flex items-center gap-2 px-2"
              data-testid="button-profile-menu"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt="User avatar" />
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-sm">
                  FC
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium sm:inline-block">
                Fluffy's Creator
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem data-testid="menu-item-profile">
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem data-testid="menu-item-settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem data-testid="menu-item-logout">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
