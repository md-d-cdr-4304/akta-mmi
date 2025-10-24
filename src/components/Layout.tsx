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
          <header className="h-20 border-b border-border/30 bg-card/60 flex items-center justify-between px-8 sticky top-0 z-10 backdrop-blur-xl shadow-sm">
            <div className="flex items-center gap-6 flex-1">
              <SidebarTrigger className="text-foreground hover:text-primary transition-colors" />
              <img src={logo} alt="ÄKTA Logo" className="h-10 w-10 object-contain" />
              <div className="max-w-xl flex-1">
                <Input
                  type="search"
                  placeholder="Search inventory, SKUs, locations..."
                  className="w-full shadow-sm"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <ThemeToggle />
              
              <button className="relative p-2.5 hover:bg-accent/30 rounded-xl transition-all duration-200 hover:scale-105">
                <Bell className="w-5 h-5 text-foreground/80" />
                <Badge className="absolute -top-0.5 -right-0.5 w-5 h-5 flex items-center justify-center p-0 bg-destructive text-destructive-foreground text-xs shadow-sm">
                  4
                </Badge>
              </button>
              
              <button className="p-2.5 hover:bg-accent/30 rounded-xl transition-all duration-200 hover:scale-105">
                <User className="w-5 h-5 text-foreground/80" />
              </button>
            </div>
          </header>
          
          <main className="flex-1 p-8 animate-fade-in">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
