import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Bell, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "./ThemeToggle";
import logo from "@/assets/akta-logo.jpeg";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border/50 bg-card/80 flex items-center justify-between px-6 sticky top-0 z-10 backdrop-blur-md shadow-sm">
            <div className="flex items-center gap-4 flex-1">
              <SidebarTrigger className="text-foreground" />
              <img src={logo} alt="ÄKTA Logo" className="h-8 w-8 object-contain" />
              <div className="max-w-md flex-1">
                <Input
                  type="search"
                  placeholder="Search inventory, SKUs, locations..."
                  className="w-full"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <ThemeToggle />
              
              <button className="relative p-2 hover:bg-muted rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-foreground" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-destructive text-destructive-foreground text-xs">
                  4
                </Badge>
              </button>
              
              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <User className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </header>
          
          <main className="flex-1 p-6 animate-fade-in">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
