import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const inventoryItems = [
  {
    name: "Almond Milk",
    quantity: 88,
    unit: "liters",
    supplyLevel: 100,
    status: "Apt supply",
    eligible: true,
    depletion: "Medium depletion",
  },
  {
    name: "Baby Spinach",
    quantity: 358,
    unit: "bags",
    supplyLevel: 100,
    status: "Apt supply",
    eligible: true,
    depletion: "High depletion",
  },
  {
    name: "Free-Range Eggs",
    quantity: 245,
    unit: "dozen",
    supplyLevel: 85,
    status: "Good supply",
    eligible: true,
    depletion: "Low depletion",
  },
  {
    name: "Organic Tomatoes",
    quantity: 156,
    unit: "kg",
    supplyLevel: 65,
    status: "Low supply",
    eligible: true,
    depletion: "Medium depletion",
  },
];

export default function Inventory() {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleItem = (itemName: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemName)
        ? prev.filter((name) => name !== itemName)
        : [...prev, itemName]
    );
  };

  const getDepletionColor = (depletion: string) => {
    if (depletion.includes("High")) return "text-destructive";
    if (depletion.includes("Medium")) return "text-warning";
    return "text-muted-foreground";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Inventory Management</h1>
        <p className="text-muted-foreground">Monitor stock levels and identify surplus items for redistribution</p>
      </div>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList>
          <TabsTrigger value="summary">Summary Cards</TabsTrigger>
          <TabsTrigger value="table">Table View</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Combined Inventory Summary</CardTitle>
              <p className="text-sm text-muted-foreground">
                Aggregated view across all kiosks. Click on any item to view detailed analytics and redistribution options
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inventoryItems.map((item) => (
                  <Card
                    key={item.name}
                    className="bg-muted/30 border-border hover:bg-muted/50 transition-colors"
                  >
                    <CardContent className="pt-6">
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleItem(item.name)}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-xl font-bold">{item.name}</h3>
                            <Badge variant="secondary" className="bg-primary/10 text-primary">
                              {item.status}
                            </Badge>
                          </div>
                          
                          <p className="text-3xl font-bold mb-4">
                            {item.quantity} <span className="text-base font-normal text-muted-foreground">{item.unit}</span>
                          </p>

                          <div className="space-y-3">
                            {item.eligible && (
                              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                                Eligible for Redistribution
                              </Badge>
                            )}
                            
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Supply Level</span>
                                <span className={`font-semibold ${getDepletionColor(item.depletion)}`}>
                                  {item.depletion}
                                </span>
                              </div>
                              <div className="flex items-center gap-3">
                                <Progress value={item.supplyLevel} className="flex-1 h-2" />
                                <span className="text-sm font-semibold w-12 text-right">{item.supplyLevel}%</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Button variant="ghost" size="icon" className="ml-4">
                          {expandedItems.includes(item.name) ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </Button>
                      </div>

                      {expandedItems.includes(item.name) && (
                        <div className="mt-6 pt-6 border-t border-border">
                          <div className="grid grid-cols-3 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Downtown Fresh</p>
                              <p className="text-lg font-semibold">28 {item.unit}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Mall Central</p>
                              <p className="text-lg font-semibold">32 {item.unit}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">University Corner</p>
                              <p className="text-lg font-semibold">28 {item.unit}</p>
                            </div>
                          </div>
                          <Button className="w-full bg-accent hover:bg-accent/90">
                            Request Redistribution
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="table" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Table</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Item</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Quantity</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Supply Level</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventoryItems.map((item) => (
                      <tr key={item.name} className="border-b border-border hover:bg-muted/50">
                        <td className="py-4 px-4 font-medium">{item.name}</td>
                        <td className="py-4 px-4">
                          {item.quantity} {item.unit}
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="secondary">{item.status}</Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Progress value={item.supplyLevel} className="w-24 h-2" />
                            <span className="text-sm">{item.supplyLevel}%</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Button variant="outline" size="sm">View Details</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
