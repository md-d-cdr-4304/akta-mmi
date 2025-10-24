import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bell, User, LogOut, LayoutDashboard, Package, TrendingUp, Receipt, Settings } from "lucide-react";
import logo from "@/assets/akta-logo.jpeg";

interface KioskLayoutProps {
  children: ReactNode;
}

export function KioskLayout({ children }: KioskLayoutProps) {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate('/kiosk-login');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/kiosk' },
    { icon: Package, label: 'Inventory', path: '/kiosk/inventory' },
    { icon: TrendingUp, label: 'Requests', path: '/kiosk/requests' },
    { icon: Receipt, label: 'Transactions', path: '/kiosk/transactions' },
    { icon: Settings, label: 'Settings', path: '/kiosk/settings' },
  ];

  const isActive = (path: string) => {
    return window.location.pathname === path;
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-[hsl(168,35%,25%)] to-[hsl(168,40%,30%)] text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img src={logo} alt="ÄKTA" className="w-10 h-10 rounded-lg object-contain bg-white/10 p-1" />
            <div>
              <h1 className="font-bold text-lg">ÄKTA</h1>
              <p className="text-xs text-white/70">Downtown Fresh Market</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3 px-3">Main Navigation</p>
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                    active
                      ? 'bg-white/15 text-white font-semibold'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-white/10">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-20 border-b border-border/30 bg-card/60 flex items-center justify-between px-8 backdrop-blur-xl shadow-sm">
          <div className="flex-1 max-w-xl">
            <Input
              type="search"
              placeholder="Search inventory, SKUs, locations..."
              className="w-full shadow-sm"
            />
          </div>

          <div className="flex items-center gap-3 ml-6">
            <button className="relative p-2.5 hover:bg-accent/30 rounded-xl transition-all duration-200 hover:scale-105">
              <Bell className="w-5 h-5 text-foreground/80" />
              <Badge className="absolute -top-0.5 -right-0.5 w-5 h-5 flex items-center justify-center p-0 bg-destructive text-destructive-foreground text-xs shadow-sm">
                2
              </Badge>
            </button>

            <button className="p-2.5 hover:bg-accent/30 rounded-xl transition-all duration-200 hover:scale-105">
              <User className="w-5 h-5 text-foreground/80" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
