import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";

export default function KioskRequests() {
  const requests = [
    {
      id: '#49452324-7930-4341-bdf1-0f1a19925976',
      product: 'Almond Milk',
      quantity: '20 liters',
      created: '10/11/2025, 3:05:45 PM',
      status: 'Pending',
      reason: '—'
    },
    {
      id: '#7e80ea0-3e53-4371-8404-a39276161a0',
      product: 'Almond Milk',
      quantity: '20 liters',
      created: '10/11/2025, 2:16:10 PM',
      status: 'Pending',
      reason: '—'
    },
    {
      id: '#35867b85-05e3-444c-81f5-6b0a202846ea',
      product: 'Almond Milk',
      quantity: '20 liters',
      created: '10/11/2025, 1:44:29 PM',
      status: 'Pending',
      reason: '—'
    },
    {
      id: '#25eed30-23df-49b1-80ba-39b524448b0d',
      product: 'Almond Milk',
      quantity: '20 liters',
      created: '10/11/2025, 12:32:42 PM',
      status: 'Pending',
      reason: '—'
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">My Requests</h1>
        <p className="text-muted-foreground">Track your redistribution requests and their status</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Request History</CardTitle>
          <p className="text-sm text-muted-foreground">All redistribution requests submitted by your kiosk</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request.id} className="border border-border/40 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Package className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Requesting Items</p>
                      <p className="text-sm text-muted-foreground">{request.id}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-warning/30 text-warning">
                    {request.status}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-foreground">{request.product}</span>
                    <span className="text-muted-foreground">Created</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Quantity: {request.quantity}</span>
                    <span className="text-muted-foreground">{request.created}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border/40">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Reason:</span> {request.reason}
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
