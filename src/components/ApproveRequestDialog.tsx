import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

interface ApproveRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  request: any;
}

export default function ApproveRequestDialog({
  open,
  onOpenChange,
  request,
}: ApproveRequestDialogProps) {
  const queryClient = useQueryClient();
  const [selectedKiosk, setSelectedKiosk] = useState<string>("");

  const { data: kiosks } = useQuery({
    queryKey: ["kiosks"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("kiosks")
        .select("*")
        .eq("status", "Active")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  const approveRequestMutation = useMutation({
    mutationFn: async () => {
      const updates: any = {
        status: "approved",
        completed_at: new Date().toISOString(),
      };

      // If request is from a kiosk (surplus), assign the destination kiosk
      if (request.from_kiosk_id && !request.to_kiosk_id) {
        if (!selectedKiosk) {
          throw new Error("Please select a destination kiosk");
        }
        updates.to_kiosk_id = selectedKiosk;
      }

      // If request is to a kiosk (requesting), assign the source kiosk
      if (request.to_kiosk_id && !request.from_kiosk_id) {
        if (!selectedKiosk) {
          throw new Error("Please select a source kiosk");
        }
        updates.from_kiosk_id = selectedKiosk;
      }

      const { error } = await supabase
        .from("redistributions")
        .update(updates)
        .eq("id", request.id);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Request approved successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-redistributions"] });
      queryClient.invalidateQueries({ queryKey: ["redistribution-stats"] });
      queryClient.invalidateQueries({ queryKey: ["kiosk-requests-notifications"] });
      queryClient.invalidateQueries({ queryKey: ["kiosk-redistributions"] });
      onOpenChange(false);
      setSelectedKiosk("");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to approve request");
    },
  });

  const needsKioskSelection = 
    (request?.from_kiosk_id && !request?.to_kiosk_id) || 
    (request?.to_kiosk_id && !request?.from_kiosk_id);

  const availableKiosks = kiosks?.filter(k => 
    k.id !== request?.from_kiosk_id && k.id !== request?.to_kiosk_id
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-success" />
            Approve Redistribution Request
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-semibold">Product:</span> {request?.products?.name}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Quantity:</span> {request?.quantity} {request?.unit}
            </p>
            {request?.from_kiosk && (
              <p className="text-sm">
                <span className="font-semibold">From:</span> {request.from_kiosk.name}
              </p>
            )}
            {request?.to_kiosk && (
              <p className="text-sm">
                <span className="font-semibold">To:</span> {request.to_kiosk.name}
              </p>
            )}
            {request?.reason && (
              <p className="text-sm">
                <span className="font-semibold">Reason:</span> {request.reason}
              </p>
            )}
          </div>

          {needsKioskSelection && (
            <div className="space-y-2">
              <Label>
                {request?.from_kiosk_id 
                  ? "Select Destination Kiosk" 
                  : "Select Source Kiosk"}
              </Label>
              <Select value={selectedKiosk} onValueChange={setSelectedKiosk}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a kiosk" />
                </SelectTrigger>
                <SelectContent>
                  {availableKiosks?.map((kiosk) => (
                    <SelectItem key={kiosk.id} value={kiosk.id}>
                      {kiosk.name} ({kiosk.kiosk_code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {request?.from_kiosk_id
                  ? "Select which kiosk should receive these items"
                  : "Select which kiosk should send these items"}
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false);
              setSelectedKiosk("");
            }}
          >
            Cancel
          </Button>
          <Button
            className="bg-success hover:bg-success/90"
            onClick={() => approveRequestMutation.mutate()}
            disabled={approveRequestMutation.isPending || (needsKioskSelection && !selectedKiosk)}
          >
            {approveRequestMutation.isPending ? "Approving..." : "Approve Request"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
