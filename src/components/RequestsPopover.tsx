import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Bell, Send, TrendingDown, ExternalLink, CheckCircle2, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

export function RequestsPopover() {
  const { kioskId } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: requests } = useQuery({
    queryKey: ["kiosk-requests-notifications", kioskId],
    enabled: !!kioskId,
    refetchInterval: 30000, // Refetch every 30 seconds
    queryFn: async () => {
      const { data, error } = await supabase
        .from("redistributions")
        .select(`
          *,
          products (name),
          from_kiosk:from_kiosk_id (name),
          to_kiosk:to_kiosk_id (name)
        `)
        .or(`from_kiosk_id.eq.${kioskId},to_kiosk_id.eq.${kioskId}`)
        .eq("status", "pending")
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) throw error;
      return data;
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
      queryClient.invalidateQueries({ queryKey: ["kiosk-requests-notifications", kioskId] });
      queryClient.invalidateQueries({ queryKey: ["kiosk-redistributions", kioskId] });
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
      toast({ title: "Success", description: "Request rejected" });
      queryClient.invalidateQueries({ queryKey: ["kiosk-requests-notifications", kioskId] });
      queryClient.invalidateQueries({ queryKey: ["kiosk-redistributions", kioskId] });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to reject request", variant: "destructive" });
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-success/30 text-success";
      case "rejected": return "bg-destructive/30 text-destructive";
      default: return "bg-warning/30 text-warning";
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative p-2.5 hover:bg-accent/40 rounded-xl transition-all duration-300 hover:scale-110 group">
          <Bell className="w-5 h-5 text-foreground/80 group-hover:text-primary transition-colors" />
          {requests && requests.length > 0 && (
            <Badge className="absolute -top-0.5 -right-0.5 w-5 h-5 flex items-center justify-center p-0 bg-destructive text-destructive-foreground text-xs shadow-md">
              {requests.length}
            </Badge>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold text-foreground">Pending Requests</h3>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-xs"
            onClick={() => navigate("/kiosk/requests")}
          >
            View All
            <ExternalLink className="w-3 h-3 ml-1" />
          </Button>
        </div>

        <ScrollArea className="h-[400px]">
          {!requests || requests.length === 0 ? (
            <div className="text-center text-muted-foreground py-8 px-4">
              <Bell className="w-12 h-12 mx-auto mb-2 opacity-30" />
              <p className="text-sm">No pending requests</p>
            </div>
          ) : (
            <div className="p-2">
              {requests.map((request: any) => {
                const isReceiving = request.to_kiosk_id === kioskId;
                return (
                  <div
                    key={request.id}
                    className="p-3 mb-2 rounded-lg border hover:bg-accent/20 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isReceiving ? "bg-success/10" : "bg-warning/10"
                      }`}>
                        {isReceiving ? (
                          <TrendingDown className="w-4 h-4 text-success" />
                        ) : (
                          <Send className="w-4 h-4 text-warning" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="font-medium text-sm text-foreground truncate">
                            {request.products?.name}
                          </p>
                          <Badge variant="secondary" className={`${getStatusColor(request.status)} text-xs flex-shrink-0`}>
                            {request.status}
                          </Badge>
                        </div>
                        
                        <p className="text-xs text-muted-foreground mb-1">
                          {isReceiving ? "Requesting" : "Sending"} {request.quantity} {request.unit}
                        </p>
                        
                        <div className="flex items-center justify-between gap-2">
                          <Badge variant="outline" className="text-xs">
                            {request.priority}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(request.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {request.reason && (
                      <p className="text-xs text-muted-foreground mt-2 pl-11 line-clamp-2">
                        {request.reason}
                      </p>
                    )}

                    <div className="flex gap-2 mt-3 pl-11">
                      <Button
                        size="sm"
                        className="h-7 text-xs bg-success hover:bg-success/90 flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          approveRequestMutation.mutate(request.id);
                        }}
                        disabled={approveRequestMutation.isPending}
                      >
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-7 text-xs flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          rejectRequestMutation.mutate(request.id);
                        }}
                        disabled={rejectRequestMutation.isPending}
                      >
                        <XCircle className="w-3 h-3 mr-1" />
                        Reject
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs"
                        onClick={() => navigate("/kiosk/requests")}
                      >
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
