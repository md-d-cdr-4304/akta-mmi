import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Receipt, Search, Copy, ExternalLink } from "lucide-react";

const transactions = [
  {
    txId: "a9f3e17b-4b39-4780-a881-cfdce1231df6",
    from: "KIOSK002",
    to: "KIOSK001",
    item: "Almond Milk",
    quantity: "20 liters",
    status: "pending",
    timestamp: "9/15/2025, 5:16:25 PM",
    value: "-",
    blockchainRef: "0xDummyHash",
  },
  {
    txId: "718cb165-3f53-48ff-bfd7-a0e6fbd65e77",
    from: "KIOSK002",
    to: "KIOSK001",
    item: "Almond Milk",
    quantity: "8 liters",
    status: "completed",
    timestamp: "9/15/2025, 3:15:48 PM",
    value: "-",
    blockchainRef: "0xDummyHash",
  },
  {
    txId: "c5f8da69-34ce-4aa1-8d02-6f28b5028730",
    from: "KIOSK002",
    to: "KIOSK001",
    item: "Free-Range Eggs",
    quantity: "30 dozen",
    status: "pending",
    timestamp: "9/6/2025, 3:42:10 PM",
    value: "-",
    blockchainRef: "0xDummyHash",
  },
  {
    txId: "545f6fbf-1ca0-4170-8b8d-e64ea39eea23",
    from: "KIOSK001",
    to: "KIOSK002",
    item: "Almond Milk",
    quantity: "10 liters",
    status: "pending",
    timestamp: "9/3/2025, 9:13:55 PM",
    value: "-",
    blockchainRef: "0xDummyHash",
  },
];

export default function Transactions() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Transaction History</h1>
        <p className="text-muted-foreground">Complete audit trail of all redistribution activities</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="w-5 h-5" />
            Transaction History
          </CardTitle>
          <div className="flex gap-4 mt-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                className="pl-9"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">TX ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">From → To</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Item & Quantity</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Timestamp</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Value</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Blockchain Ref</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.txId} className="border-b border-border hover:bg-muted/50">
                    <td className="py-4 px-4">
                      <code className="text-xs font-mono bg-muted px-2 py-1 rounded">
                        {tx.txId.substring(0, 30)}...
                      </code>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm">
                        <div className="font-medium">{tx.from}</div>
                        <div className="text-muted-foreground">↓</div>
                        <div className="font-medium">{tx.to}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm">
                        <div className="font-medium">{tx.item}</div>
                        <div className="text-muted-foreground">{tx.quantity}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge
                        variant={tx.status === "completed" ? "default" : "secondary"}
                        className={
                          tx.status === "completed"
                            ? "bg-success"
                            : "bg-warning text-warning-foreground"
                        }
                      >
                        {tx.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-sm">{tx.timestamp}</td>
                    <td className="py-4 px-4 text-sm">{tx.value}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <code className="text-xs font-mono bg-muted px-2 py-1 rounded">
                          {tx.blockchainRef}
                        </code>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
