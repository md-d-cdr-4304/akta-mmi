import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, TrendingDown, TrendingUp, IndianRupee, AlertTriangle, ArrowUpCircle } from "lucide-react";

export default function KioskDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Downtown Fresh Market</h1>
        <p className="text-muted-foreground">Monitor your inventory levels and manage redistribution requests</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Items</p>
                <p className="text-2xl font-bold text-foreground">10</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Low Stock</p>
                <p className="text-2xl font-bold text-foreground">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Surplus Items</p>
                <p className="text-2xl font-bold text-foreground">5</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                <IndianRupee className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Inventory Value</p>
                <p className="text-2xl font-bold text-foreground">₹32,135</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-destructive/30 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2 text-destructive">
                <AlertTriangle className="w-5 h-5" />
                Low Stock Alert
              </CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">3 items are below threshold</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground">• Organic Apples: 45 kg</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground">• Pasta Sauce: 15 jars</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground">• Quinoa: 12 kg</span>
              </div>
            </div>
            <Button className="w-full mt-4 bg-destructive hover:bg-destructive/90">
              Request Restocking
            </Button>
          </CardContent>
        </Card>

        <Card className="border-warning/30 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-warning">
              <ArrowUpCircle className="w-5 h-5" />
              Surplus Available
            </CardTitle>
            <p className="text-sm text-muted-foreground">5 items have excess inventory</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground">• Baby Spinach: 200 bags</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground">• Greek Yogurt: 120 containers</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground">• Milk Bread: 12 loaves</span>
              </div>
              <div className="text-sm text-muted-foreground">+2 more items</div>
            </div>
            <Button className="w-full mt-4 bg-warning hover:bg-warning/90 text-warning-foreground">
              Send Surplus
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Pending Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Pending Redistribution Requests</CardTitle>
          <p className="text-sm text-muted-foreground">Track your requests waiting for admin approval</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                <div className="flex items-center gap-4">
                  <Package className="w-10 h-10 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">Request: Almond Milk</p>
                    <p className="text-sm text-muted-foreground">
                      Quantity: 20 liters • 2025-10-11T09:35:45.780046+00:00
                    </p>
                    <p className="text-xs text-muted-foreground">Request ID: 49452324-7930-4341-bdf1-0f1a19925976</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="bg-warning/20 text-warning">Medium</Badge>
                  <Badge variant="secondary" className="bg-warning/30 text-warning">Pending Approval</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
