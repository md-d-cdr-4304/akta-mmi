import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertTriangle, CheckCircle2, Package, TrendingUp, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

export default function Redistribution() {
  const queryClient = useQueryClient();

  const { data: redistributions, isLoading } = useQuery({
    queryKey: ["admin-redistributions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("redistributions")
        .select(`
          *,
          products (name, sku),
          from_kiosk:from_kiosk_id (name, kiosk_code),
          to_kiosk:to_kiosk_id (name, kiosk_code)
        `)
        .eq("status", "pending")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const { data: stats } = useQuery({
    queryKey: ["redistribution-stats"],
    queryFn: async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const [pending, highPriority, approved, inTransit] = await Promise.all([
        supabase.from("redistributions").select("id", { count: "exact" }).eq("status", "pending"),
        supabase.from("redistributions").select("id", { count: "exact" }).eq("status", "pending").eq("priority", "High Priority"),
        supabase.from("redistributions").select("id", { count: "exact" }).eq("status", "approved").gte("completed_at", today.toISOString()),
        supabase.from("transactions").select("id", { count: "exact" }).eq("status", "pending"),
      ]);

      return {
        pending: pending.count || 0,
        highPriority: highPriority.count || 0,
        approved: approved.count || 0,
        inTransit: inTransit.count || 0,
      };
    },
  });

  const approveRequestMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("redistributions")
        .update({ status: "approved", completed_at: new Date().toISOString() })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Request approved successfully" });
      queryClient.invalidateQueries({ queryKey: ["admin-redistributions"] });
      queryClient.invalidateQueries({ queryKey: ["redistribution-stats"] });
      queryClient.invalidateQueries({ queryKey: ["kiosk-requests-notifications"] });
      queryClient.invalidateQueries({ queryKey: ["kiosk-redistributions"] });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to approve request", variant: "destructive" });
    },
  });

  const rejectRequestMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("redistributions")
        .update({ status: "rejected" })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Request declined" });
      queryClient.invalidateQueries({ queryKey: ["admin-redistributions"] });
      queryClient.invalidateQueries({ queryKey: ["redistribution-stats"] });
      queryClient.invalidateQueries({ queryKey: ["kiosk-requests-notifications"] });
      queryClient.invalidateQueries({ queryKey: ["kiosk-redistributions"] });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to decline request", variant: "destructive" });
    },
  });

  const statsCards = [
    {
      title: "Pending Requests",
      value: stats?.pending?.toString() || "0",
      icon: Clock,
      color: "bg-primary/10 text-primary",
    },
    {
      title: "High Priority",
      value: stats?.highPriority?.toString() || "0",
      icon: AlertTriangle,
      color: "bg-destructive/10 text-destructive",
    },
    {
      title: "Today's Approved",
      value: stats?.approved?.toString() || "0",
      icon: CheckCircle2,
      color: "bg-success/10 text-success",
    },
    {
      title: "Items in Transit",
      value: stats?.inTransit?.toString() || "0",
      icon: Package,
      color: "bg-warning/10 text-warning",
    },
  ];

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
          {isLoading ? (
            <div className="text-center text-muted-foreground py-8">Loading requests...</div>
          ) : !redistributions || redistributions.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">No pending requests</div>
          ) : (
            <div className="space-y-4">
              {redistributions.map((request: any) => (
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
                              <Badge variant="secondary" className={`${
                                request.priority === "High Priority" 
                                  ? "bg-destructive/10 text-destructive border-destructive/20" 
                                  : "bg-warning/10 text-warning border-warning/20"
                              }`}>
                                {request.priority}
                              </Badge>
                              <span className="text-sm text-muted-foreground">#{request.id.slice(0, 8)}</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <p className="font-semibold text-sm mb-1">{request.to_kiosk?.name || "Unknown Kiosk"}</p>
                                <p className="text-sm text-muted-foreground">{request.to_kiosk?.kiosk_code || "N/A"}</p>
                              </div>
                              
                              <div>
                                <p className="font-semibold text-sm mb-1">{request.products?.name || "Unknown Product"}</p>
                                <p className="text-sm text-muted-foreground">Quantity: {request.quantity} {request.unit}</p>
                              </div>
                              
                              <div>
                                <p className="text-sm text-muted-foreground mb-1">Created</p>
                                <p className="text-sm font-medium">{new Date(request.created_at).toLocaleString()}</p>
                              </div>
                            </div>

                            <div>
                              <p className="text-sm font-semibold mb-2">Reason:</p>
                              <div className="bg-muted/50 rounded-lg p-3 min-h-[60px]">
                                {request.reason ? (
                                  <p className="text-sm text-muted-foreground">{request.reason}</p>
                                ) : (
                                  <p className="text-sm text-muted-foreground italic">No reason provided</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 ml-4">
                          <Button 
                            className="bg-success hover:bg-success/90 whitespace-nowrap"
                            onClick={() => approveRequestMutation.mutate(request.id)}
                            disabled={approveRequestMutation.isPending}
                          >
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Review & Approve
                          </Button>
                          <Button 
                            variant="outline" 
                            className="text-destructive hover:text-destructive whitespace-nowrap"
                            onClick={() => rejectRequestMutation.mutate(request.id)}
                            disabled={rejectRequestMutation.isPending}
                          >
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
          )}
        </CardContent>
      </Card>
    </div>
  );
}
