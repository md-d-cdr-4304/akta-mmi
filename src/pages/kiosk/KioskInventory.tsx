import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, TrendingDown, TrendingUp, RefreshCw, Plus, Settings } from "lucide-react";

export default function KioskInventory() {
  const inventoryItems = [
    { name: 'Almond Milk', category: 'Dairy', stock: 28, unit: 'liters', threshold: 20, status: 'Normal', autoRequest: 'Disabled' },
    { name: 'Baby Spinach', category: 'Vegetables', stock: 200, unit: 'bags', threshold: 20, status: 'Surplus', autoRequest: 'Enabled' },
    { name: 'Free-Range Eggs', category: 'Dairy', stock: 55, unit: 'dozen', threshold: 40, status: 'Normal', autoRequest: 'Enabled' },
    { name: 'Greek Yogurt', category: 'Dairy', stock: 120, unit: 'containers', threshold: 25, status: 'Surplus', autoRequest: 'Disabled' },
    { name: 'Milk Bread', category: 'Bakery', stock: 12, unit: 'loaves', threshold: 8, status: 'Surplus', autoRequest: 'Disabled' },
    { name: 'Organic Apples', category: 'Fruits', stock: 45, unit: 'kg', threshold: 50, status: 'Low Stock', autoRequest: 'Enabled' },
    { name: 'Organic Bananas', category: 'Fruits', stock: 60, unit: 'kg', threshold: 40, status: 'Surplus', autoRequest: 'Enabled' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Inventory Management</h1>
          <p className="text-muted-foreground">Manage your kiosk's inventory levels and threshold settings</p>
        </div>
        <Button className="shadow-md">
          <Plus className="w-4 h-4 mr-2" />
          Add Items
        </Button>
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
                <RefreshCw className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Auto-Request On</p>
                <p className="text-2xl font-bold text-foreground">6</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Current Inventory</CardTitle>
            <Tabs defaultValue="inventory" className="w-auto">
              <TabsList>
                <TabsTrigger value="inventory">Inventory View</TabsTrigger>
                <TabsTrigger value="threshold">Threshold Settings</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <p className="text-sm text-muted-foreground">Real-time view of your inventory with quick action buttons</p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Details</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Threshold</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Auto-Request</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div>
                      <p className="font-semibold text-foreground">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-foreground">{item.stock} {item.unit}</p>
                    <p className="text-xs text-muted-foreground">2025-09-26T16:12:14:201746+00:00</p>
                  </TableCell>
                  <TableCell className="text-foreground">{item.threshold} {item.unit}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        item.status === 'Low Stock' ? 'destructive' :
                        item.status === 'Surplus' ? 'secondary' :
                        'default'
                      }
                      className={
                        item.status === 'Surplus' ? 'bg-warning/20 text-warning' :
                        item.status === 'Normal' ? 'bg-success/20 text-success' : ''
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={item.autoRequest === 'Enabled' ? 'default' : 'secondary'}>
                      {item.autoRequest}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        <RefreshCw className="w-3.5 h-3.5 mr-1" />
                        Redistribute
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="w-3.5 h-3.5 mr-1" />
                        Settings
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
