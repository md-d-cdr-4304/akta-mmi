import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, AlertTriangle, Package, CheckCircle2, Trash2, Check } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "Surplus Alert",
    priority: "high",
    message: "You have 10kg surplus of tomatoes",
    timestamp: "2024-01-15 14:30:22",
    icon: AlertTriangle,
    iconColor: "text-destructive",
    bgColor: "bg-destructive/5",
    borderColor: "border-l-destructive",
    read: false,
  },
  {
    id: 2,
    type: "Redistribution Confirmed",
    priority: "medium",
    message: "Redistribution request confirmed",
    timestamp: "2024-01-15 13:15:10",
    icon: Package,
    iconColor: "text-primary",
    bgColor: "bg-primary/5",
    borderColor: "border-l-primary",
    read: false,
  },
  {
    id: 3,
    type: "Storage Updated",
    priority: "low",
    message: "Box storage updated successfully",
    timestamp: "2024-01-15 11:45:33",
    icon: CheckCircle2,
    iconColor: "text-success",
    bgColor: "bg-success/5",
    borderColor: "border-l-success",
    read: true,
  },
  {
    id: 4,
    type: "Surplus Alert",
    priority: "high",
    message: "You have 5kg surplus of bananas",
    timestamp: "2024-01-15 10:20:45",
    icon: AlertTriangle,
    iconColor: "text-destructive",
    bgColor: "bg-destructive/5",
    borderColor: "border-l-destructive",
    read: false,
  },
];

export default function Alerts() {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Alerts & Notifications</h1>
        <p className="text-muted-foreground">Stay updated on surplus items, redistributions, and system updates</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
              {unreadCount > 0 && (
                <Badge className="bg-destructive">{unreadCount}</Badge>
              )}
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-primary">
              <Check className="w-4 h-4 mr-2" />
              Mark all as read
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`${notification.bgColor} border-l-4 ${notification.borderColor} ${
                  notification.read ? 'opacity-60' : ''
                }`}
              >
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`w-10 h-10 rounded-lg ${notification.bgColor} flex items-center justify-center flex-shrink-0`}>
                        <notification.icon className={`w-5 h-5 ${notification.iconColor}`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <h3 className="font-semibold">{notification.type}</h3>
                          <Badge
                            variant="secondary"
                            className={
                              notification.priority === "high"
                                ? "bg-destructive/10 text-destructive"
                                : notification.priority === "medium"
                                ? "bg-primary/10 text-primary"
                                : "bg-muted"
                            }
                          >
                            {notification.priority}
                          </Badge>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-primary rounded-full" />
                          )}
                        </div>
                        <p className="text-sm mb-2">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {!notification.read && (
                        <Button variant="ghost" size="sm" className="text-primary">
                          Mark as read
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
