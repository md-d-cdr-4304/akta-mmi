import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  ChevronDown, 
  ChevronUp, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Minus,
  Radio,
  Search,
  Filter
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Product {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  status: string | null;
  supply_level: number | null;
  depletion_rate: string | null;
  eligible_for_redistribution: boolean | null;
  forecasted_daily_requirement: number;
  acquired_price: number;
  mrp: number;
  suggested_selling_price: number;
  over_supply_limit: number;
  under_supply_limit: number;
  normal_supply_level: number;
  estimated_market_demand: string | null;
  redistribution_revenue: number;
  redistribution_cost: number;
  redistributable_quantity: number;
  updated_at: string;
}

interface KioskInventory {
  kiosk_id: string;
  kiosk_name: string;
  kiosk_code: string;
  quantity: number;
  last_updated: string;
}

export default function Inventory() {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("name");
      if (error) throw error;
      return data as Product[];
    },
  });

  const { data: kioskInventoryMap } = useQuery({
    queryKey: ["kiosk-inventory"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("kiosk_inventory")
        .select(`
          product_id,
          quantity,
          last_updated,
          kiosks (
            id,
            name,
            kiosk_code
          )
        `);
      if (error) throw error;
      
      const inventoryMap: Record<string, KioskInventory[]> = {};
      data?.forEach((item: any) => {
        if (!inventoryMap[item.product_id]) {
          inventoryMap[item.product_id] = [];
        }
        inventoryMap[item.product_id].push({
          kiosk_id: item.kiosks.id,
          kiosk_name: item.kiosks.name,
          kiosk_code: item.kiosks.kiosk_code,
          quantity: item.quantity,
          last_updated: item.last_updated,
        });
      });
      return inventoryMap;
    },
  });

  const toggleItem = (itemName: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemName)
        ? prev.filter((item) => item !== itemName)
        : [...prev, itemName]
    );
  };

  const getSupplyStatus = (product: Product) => {
    if (!product.supply_level) return { text: "Apt supply", color: "bg-success" };
    
    if (product.supply_level > 100) {
      return { text: "Over supply", color: "bg-destructive" };
    } else if (product.supply_level < 67) {
      return { text: "Under supply", color: "bg-warning" };
    }
    return { text: "Apt supply", color: "bg-success" };
  };

  const getDepletionColor = (depletion: string | null) => {
    switch (depletion?.toLowerCase()) {
      case "high":
        return "text-destructive";
      case "medium":
        return "text-warning";
      case "low":
        return "text-success";
      default:
        return "text-muted-foreground";
    }
  };

  const getDepletionIcon = (depletion: string | null) => {
    switch (depletion?.toLowerCase()) {
      case "high":
        return <TrendingUp className="w-4 h-4" />;
      case "medium":
        return <Minus className="w-4 h-4" />;
      case "low":
        return <TrendingDown className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const calculateFinancialStatus = (product: Product) => {
    const netProfit = product.redistribution_revenue - product.redistribution_cost;
    const isProf = netProfit >= 0;
    return {
      redistributableQty: product.redistributable_quantity,
      expectedRevenue: product.redistribution_revenue,
      originalCost: product.acquired_price * product.redistributable_quantity,
      netProfit,
      isProfitable: isProf,
      breakEven: Math.abs(netProfit) < 100,
    };
  };

  const toggleEligibility = async (productId: string, currentStatus: boolean | null) => {
    await supabase
      .from("products")
      .update({ eligible_for_redistribution: !currentStatus })
      .eq("id", productId);
  };

  const filteredProducts = products?.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = 
      filterStatus === "all" || 
      (filterStatus === "eligible" && product.eligible_for_redistribution) ||
      (filterStatus === "oversupply" && (product.supply_level || 0) > 100) ||
      (filterStatus === "undersupply" && (product.supply_level || 0) < 67);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Inventory Management</h1>
        <p className="text-muted-foreground">
          Monitor stock levels and identify surplus items for redistribution
        </p>
      </div>

      <Tabs defaultValue="cards" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="cards">Summary Cards</TabsTrigger>
            <TabsTrigger value="table">Table View</TabsTrigger>
          </TabsList>

          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search inventory, SKUs, locations..."
                className="pl-10 w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Items</SelectItem>
                <SelectItem value="eligible">Eligible</SelectItem>
                <SelectItem value="oversupply">Oversupply</SelectItem>
                <SelectItem value="undersupply">Undersupply</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="cards" className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Combined Inventory Summary
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Aggregated view across all kiosks. Click on any item to view detailed analytics and redistribution options
            </p>

            {isLoading ? (
              <div className="text-center py-12 text-muted-foreground">Loading inventory...</div>
            ) : (
              <div className="space-y-4">
                {filteredProducts?.map((product) => {
                  const isExpanded = expandedItems.includes(product.id);
                  const supplyStatus = getSupplyStatus(product);
                  const financialStatus = calculateFinancialStatus(product);
                  const kioskData = kioskInventoryMap?.[product.id] || [];
                  const isOverThreshold = (product.quantity || 0) > (product.over_supply_limit || 0);

                  return (
                    <Card
                      key={product.id}
                      className="bg-success/5 border-success/20 hover:border-success/40 transition-colors"
                    >
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div
                            className="flex items-start justify-between cursor-pointer"
                            onClick={() => toggleItem(product.id)}
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-bold text-foreground">{product.name}</h3>
                                {isExpanded ? (
                                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                                ) : (
                                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                                )}
                              </div>
                              <div className="flex items-center gap-6">
                                <div>
                                  <p className="text-3xl font-bold text-foreground">
                                    {product.quantity} <span className="text-lg font-normal text-muted-foreground">{product.unit}</span>
                                  </p>
                                </div>
                                <Badge
                                  variant="outline"
                                  className="border-success text-success bg-success/10"
                                >
                                  {supplyStatus.text}
                                </Badge>
                              </div>
                            </div>

                            <div className="flex items-center gap-4">
                              <div
                                className="flex items-center gap-2 cursor-pointer hover:opacity-80"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleEligibility(product.id, product.eligible_for_redistribution);
                                }}
                              >
                                <Radio
                                  className={`w-5 h-5 ${
                                    product.eligible_for_redistribution
                                      ? "text-success fill-success"
                                      : "text-destructive"
                                  }`}
                                />
                                <span className="text-sm font-medium">
                                  {product.eligible_for_redistribution
                                    ? "Eligible for Redistribution"
                                    : "In Redistribution"}
                                </span>
                              </div>

                              <div
                                className={`flex items-center gap-1 ${getDepletionColor(
                                  product.depletion_rate
                                )}`}
                              >
                                {getDepletionIcon(product.depletion_rate)}
                                <span className="text-sm font-medium">
                                  {product.depletion_rate} depletion
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Supply Level</span>
                              <span className="font-semibold">{product.supply_level}%</span>
                            </div>
                            <Progress value={product.supply_level || 0} className="h-2" />
                          </div>

                          {isExpanded && (
                            <div className="space-y-6 pt-4 border-t border-border">
                              <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-4">
                                  <div>
                                    <p className="text-sm text-muted-foreground mb-1">Acquired Price</p>
                                    <p className="text-lg font-semibold">₹{product.acquired_price}/{product.unit}</p>
                                  </div>

                                  <div>
                                    <p className="text-sm text-muted-foreground mb-1">
                                      Forecasted Daily Requirement
                                    </p>
                                    <p className="text-lg font-semibold">
                                      {product.forecasted_daily_requirement} {product.unit}
                                    </p>
                                  </div>

                                  <div>
                                    <p className="text-sm text-muted-foreground mb-1">Over Supply Limit</p>
                                    <p className="text-lg font-semibold">
                                      {product.over_supply_limit} {product.unit}
                                    </p>
                                  </div>

                                  <div className="pt-2">
                                    <div className="flex items-start gap-2">
                                      <p className="text-sm text-muted-foreground">
                                        Estimated Market Demand Nearby
                                      </p>
                                      <Badge variant="secondary" className="text-xs">
                                        Blockchain Data
                                      </Badge>
                                    </div>
                                    <p className="text-lg font-semibold mt-1">
                                      {product.estimated_market_demand}
                                    </p>
                                  </div>
                                </div>

                                <div className="space-y-4">
                                  <div>
                                    <p className="text-sm text-muted-foreground mb-1">MRP</p>
                                    <p className="text-lg font-semibold">₹{product.mrp}/{product.unit}</p>
                                  </div>

                                  <div>
                                    <p className="text-sm text-muted-foreground mb-1">Depletion Rate</p>
                                    <p className={`text-lg font-semibold ${getDepletionColor(product.depletion_rate)}`}>
                                      {product.depletion_rate}
                                    </p>
                                  </div>

                                  <div>
                                    <p className="text-sm text-muted-foreground mb-1">Under Supply Limit</p>
                                    <p className="text-lg font-semibold">
                                      {product.under_supply_limit} {product.unit}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                                <p className="font-semibold text-foreground">
                                  Net Financial Status (Post-Redistribution)
                                </p>
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                  <div>
                                    <p className="text-muted-foreground mb-1">Redistributable Quantity:</p>
                                    <p className="font-semibold">
                                      {financialStatus.redistributableQty} {product.unit}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground mb-1">Expected Revenue:</p>
                                    <p className="font-semibold text-success">
                                      ₹{financialStatus.expectedRevenue.toFixed(2)}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground mb-1">Original Cost:</p>
                                    <p className="font-semibold">₹{financialStatus.originalCost.toFixed(2)}</p>
                                  </div>
                                </div>
                                <div className="pt-2 border-t border-border">
                                  <p className="font-semibold">
                                    {financialStatus.breakEven ? "Break-even" : financialStatus.isProfitable ? "Profitable" : "Loss"}
                                  </p>
                                </div>
                              </div>

                              {isOverThreshold && (
                                <Alert className="border-warning bg-warning/10">
                                  <AlertTriangle className="w-4 h-4 text-warning" />
                                  <AlertDescription className="text-sm text-foreground">
                                    You're {Math.round((product.quantity || 0) - product.over_supply_limit)}
                                    {product.unit} over your set threshold. You can prevent spoilage, but may
                                    incur a ₹{Math.abs(financialStatus.netProfit).toFixed(0)}{" "}
                                    {financialStatus.isProfitable ? "gain" : "loss"}. Proceed?
                                  </AlertDescription>
                                </Alert>
                              )}

                              <Button className="w-full" size="lg">
                                <TrendingUp className="w-4 h-4 mr-2" />
                                Redistribute Now
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="table" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Combined Inventory (All Kiosks)</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Total Quantity</TableHead>
                    <TableHead>Kiosk Distribution</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts?.map((product) => {
                    const supplyStatus = getSupplyStatus(product);
                    const kioskData = kioskInventoryMap?.[product.id] || [];
                    const isOverstock = (product.supply_level || 0) > 100;
                    const lastUpdate = new Date(product.updated_at).toLocaleDateString("en-US", {
                      month: "numeric",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    });

                    return (
                      <TableRow key={product.id}>
                        <TableCell className="font-semibold">{product.name}</TableCell>
                        <TableCell>
                          {product.quantity} {product.unit}
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1 text-sm">
                            {kioskData.map((kiosk, idx) => (
                              <div key={idx}>
                                <span className="font-medium">{kiosk.kiosk_code}:</span> {kiosk.quantity} {product.unit}
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {isOverstock ? (
                              <TrendingUp className="w-4 h-4 text-destructive" />
                            ) : (
                              <Minus className="w-4 h-4 text-warning" />
                            )}
                            <Badge
                              variant={isOverstock ? "destructive" : "secondary"}
                              className={!isOverstock ? "border-warning text-warning bg-warning/10" : ""}
                            >
                              {isOverstock ? "High Depletion" : "Medium Depletion"}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{lastUpdate}</TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant={isOverstock ? "default" : "outline"}
                            disabled={!isOverstock}
                          >
                            {isOverstock ? "Redistribute" : "No Action"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
