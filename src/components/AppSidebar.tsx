import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Store,
  TrendingUp,
  Receipt,
  Bell,
  Settings,
  LogOut,
  Package2,
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

const navigationItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Inventory", url: "/inventory", icon: Package },
  { title: "Kiosk Management", url: "/kiosk-management", icon: Store },
  { title: "Redistribution Management", url: "/redistribution", icon: TrendingUp },
  { title: "Transactions", url: "/transactions", icon: Receipt },
  { title: "Alerts", url: "/alerts", icon: Bell },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold shadow-sm"
      : "hover:bg-sidebar-accent/50 text-sidebar-foreground/90 hover:text-sidebar-foreground";

  return (
    <Sidebar className="border-r border-sidebar-border/50">
      <SidebarHeader className="p-6 border-b border-sidebar-border/50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center shadow-md">
            <Package2 className="w-7 h-7 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-sidebar-foreground tracking-tight">ÄKTA</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 text-xs font-bold px-4 mb-3 tracking-wider">
            MAIN NAVIGATION
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 font-medium">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
