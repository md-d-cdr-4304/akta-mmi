import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Store, MapPin, User, Mail, Eye, Pencil, Plus } from "lucide-react";

const kiosks = [
  {
    name: "Downtown Fresh Market",
    address: "123 Main Street, Downtown, City 12345",
    manager: "John Doe",
    email: "kiosk001@akta.com",
    totalItems: 632,
    skus: 10,
    lastActivity: "6/8/2025",
    status: "Active",
  },
  {
    name: "Mall Central Kiosk",
    address: "456 Shopping Ave, Mall Central, City 12346",
    manager: "Jane Smith",
    email: "kiosk002@akta.com",
    totalItems: 456,
    skus: 9,
    lastActivity: "6/8/2025",
    status: "Active",
  },
  {
    name: "University Corner Store",
    address: "789 Airport Rd, Terminal B, City 12347",
    manager: "Mike Johnson",
    email: "kiosk003@akta.com",
    totalItems: 457,
    skus: 9,
    lastActivity: "6/6/2025",
    status: "Inactive",
  },
];

export default function KioskManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Kiosk Management</h1>
          <p className="text-muted-foreground">Register and manage your network of kiosks</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Register New Kiosk
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {kiosks.map((kiosk) => (
          <Card key={kiosk.name} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Store className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{kiosk.name}</h3>
                      <Badge
                        variant={kiosk.status === "Active" ? "default" : "secondary"}
                        className={kiosk.status === "Active" ? "bg-success" : "bg-muted"}
                      >
                        {kiosk.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{kiosk.address}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="w-4 h-4 flex-shrink-0" />
                    <span>{kiosk.manager}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <span>{kiosk.email}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Items:</span>
                    <span className="font-semibold">{kiosk.totalItems}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">SKUs:</span>
                    <span className="font-semibold">{kiosk.skus}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Last Activity:</span>
                    <span className="font-semibold">{kiosk.lastActivity}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" className="flex-1" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" className="flex-1" size="sm">
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
