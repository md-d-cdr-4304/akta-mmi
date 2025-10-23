import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Package, Wallet, DollarSign, MapPin, Clock, CheckCircle2, PackageOpen, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your inventory and redistribution metrics</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Inventory</p>
                <p className="text-3xl font-bold">28 SKUs</p>
                <p className="text-sm text-success flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4" />
                  +1
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Value</p>
                <p className="text-3xl font-bold">₹2.9L</p>
                <p className="text-sm text-success flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4" />
                  5%
                </p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Wallet className="w-6 h-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">This Month</p>
                <p className="text-3xl font-bold">₹45.7K</p>
                <p className="text-sm text-success flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4" />
                  ₹8.2K
                </p>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue and Redistribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-success/5 border-success/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-success">
              <DollarSign className="w-5 h-5" />
              Revenue Generated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-success mb-2">₹45.7K</p>
            <p className="text-sm text-muted-foreground mb-6">This month from redistribution</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Cost Savings</p>
                <p className="text-2xl font-semibold text-success">₹12,400</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Efficiency Gain</p>
                <p className="text-2xl font-semibold text-success">+18%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PackageOpen className="w-5 h-5 text-success" />
              This Month's Redistribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-success mb-2">120kg Saved from Waste</p>
            <p className="text-sm text-muted-foreground mb-4">₹3,240 Value Recovered • 89% Success Rate</p>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Monthly Goal Progress</span>
                <span className="font-semibold">75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Kiosks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Active Kiosks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                name: "Downtown Fresh Market",
                address: "123 Main Street, Downtown, City 12345",
                items: "10 Items",
                status: "active",
              },
              {
                name: "Mall Central Kiosk",
                address: "456 Shopping Ave, Mall Central, City 12346",
                items: "9 Items",
                status: "warning",
              },
              {
                name: "University Corner Store",
                address: "789 Airport Rd, Terminal B, City 12347",
                items: "9 Items",
                status: "active",
              },
            ].map((kiosk, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-4">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-semibold">{kiosk.name}</p>
                    <p className="text-sm text-muted-foreground">{kiosk.address} • {kiosk.items}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`flex items-center gap-1 ${kiosk.status === 'active' ? 'text-success' : 'text-warning'}`}>
                    <div className={`w-2 h-2 rounded-full ${kiosk.status === 'active' ? 'bg-success' : 'bg-warning'}`} />
                    <span className="text-sm font-medium capitalize">{kiosk.status}</span>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Redistributions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Recent Redistributions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                item: "Almond Milk",
                from: "Downtown Fresh Market",
                amount: "8 liters",
                time: "38 days ago",
              },
              {
                item: "Almond Milk",
                from: "Downtown Fresh Market",
                amount: "10 liters",
                time: "49 days ago",
              },
              {
                item: "Free-Range Eggs",
                from: "Mall Central Kiosk",
                amount: "20 dozen",
                time: "137 days ago",
              },
            ].map((redistribution, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <div className="flex-1">
                  <p className="font-semibold">{redistribution.item}</p>
                  <p className="text-sm text-muted-foreground">
                    {redistribution.from} • {redistribution.amount} • {redistribution.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
