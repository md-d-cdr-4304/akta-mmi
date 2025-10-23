import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertTriangle, CheckCircle2, Package, TrendingUp, X } from "lucide-react";

const statsCards = [
  {
    title: "Pending Requests",
    value: "21",
    icon: Clock,
    color: "bg-primary/10 text-primary",
  },
  {
    title: "High Priority",
    value: "2",
    icon: AlertTriangle,
    color: "bg-destructive/10 text-destructive",
  },
  {
    title: "Today's Approved",
    value: "12",
    icon: CheckCircle2,
    color: "bg-success/10 text-success",
  },
  {
    title: "Items in Transit",
    value: "8",
    icon: Package,
    color: "bg-warning/10 text-warning",
  },
];

const pendingRequests = [
  {
    id: "#49452324-7930-4341-bdff-0f1a19925976",
    priority: "Medium Priority",
    kiosk: "Downtown Fresh Market",
    kioskId: "KIOSK001",
    item: "Almond Milk",
    quantity: "20 liters",
    created: "10/11/2025, 3:05:45 PM",
    reason: "",
  },
  {
    id: "#7fe80ea0-3ec5-4371-8404-a392761611a0",
    priority: "Medium Priority",
    kiosk: "Downtown Fresh Market",
    kioskId: "KIOSK001",
    item: "Almond Milk",
    quantity: "15 liters",
    created: "10/10/2025, 2:15:30 PM",
    reason: "",
  },
];

export default function Redistribution() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Redistribution Management</h1>
        <p className="text-muted-foreground">Review and approve kiosk redistribution requests</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Redistribution Requests</CardTitle>
          <p className="text-sm text-muted-foreground">
            Review kiosk requests and approve with optimal fulfillment strategies
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingRequests.map((request) => (
              <Card key={request.id} className="border-2">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <TrendingUp className="w-5 h-5 text-accent" />
                        </div>
                        
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="font-semibold">Requesting Items</span>
                            <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">
                              {request.priority}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{request.id}</span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <p className="font-semibold text-sm mb-1">{request.kiosk}</p>
                              <p className="text-sm text-muted-foreground">{request.kioskId}</p>
                            </div>
                            
                            <div>
                              <p className="font-semibold text-sm mb-1">{request.item}</p>
                              <p className="text-sm text-muted-foreground">Quantity: {request.quantity}</p>
                            </div>
                            
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Created</p>
                              <p className="text-sm font-medium">{request.created}</p>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm font-semibold mb-2">Reason:</p>
                            <div className="bg-muted/50 rounded-lg p-3 min-h-[60px]">
                              {request.reason && (
                                <p className="text-sm text-muted-foreground">{request.reason}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 ml-4">
                        <Button className="bg-success hover:bg-success/90 whitespace-nowrap">
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Review & Approve
                        </Button>
                        <Button variant="outline" className="text-destructive hover:text-destructive whitespace-nowrap">
                          <X className="w-4 h-4 mr-2" />
                          Decline
                        </Button>
                      </div>
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
