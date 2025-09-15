import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Pill, 
  Search, 
  MapPin, 
  CheckCircle, 
  XCircle,
  Clock,
  AlertCircle,
  Truck
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MedicineTracker = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const pharmacies = [
    {
      id: 1,
      name: "City Medical Store",
      distance: "0.8 km",
      status: "open",
      contact: "+91 98765 43210",
      address: "Main Market, Nabha",
      medicines: {
        "Paracetamol 500mg": { available: true, stock: 25, price: "₹12" },
        "Amoxicillin 250mg": { available: true, stock: 8, price: "₹45" },
        "Crocin Advance": { available: false, stock: 0, price: "₹15" },
        "Dolo 650": { available: true, stock: 15, price: "₹18" }
      }
    },
    {
      id: 2,
      name: "Apollo Pharmacy",
      distance: "1.2 km", 
      status: "open",
      contact: "+91 87654 32109",
      address: "Civil Lines, Nabha",
      medicines: {
        "Paracetamol 500mg": { available: true, stock: 40, price: "₹14" },
        "Amoxicillin 250mg": { available: false, stock: 0, price: "₹48" },
        "Crocin Advance": { available: true, stock: 20, price: "₹16" },
        "Dolo 650": { available: true, stock: 30, price: "₹20" }
      }
    },
    {
      id: 3,
      name: "Jan Aushadhi Store",
      distance: "2.1 km",
      status: "closed",
      contact: "+91 76543 21098", 
      address: "Government Hospital, Nabha",
      medicines: {
        "Paracetamol 500mg": { available: true, stock: 50, price: "₹8" },
        "Amoxicillin 250mg": { available: true, stock: 12, price: "₹30" },
        "Crocin Advance": { available: true, stock: 35, price: "₹10" },
        "Dolo 650": { available: true, stock: 25, price: "₹12" }
      }
    }
  ];

  const commonMedicines = [
    "Paracetamol 500mg",
    "Amoxicillin 250mg", 
    "Crocin Advance",
    "Dolo 650",
    "Azithromycin 500mg",
    "Omeprazole 20mg"
  ];

  const searchMedicine = (medicine: string) => {
    setSearchTerm(medicine);
    toast({
      title: "Searching...",
      description: `Looking for ${medicine} in nearby pharmacies`,
    });
  };

  const getFilteredPharmacies = () => {
    if (!searchTerm) return pharmacies;
    
    return pharmacies.filter(pharmacy => 
      Object.keys(pharmacy.medicines).some(medicine => 
        medicine.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const getMedicineInfo = (pharmacy: any, medicineName: string) => {
    const medicine = pharmacy.medicines[medicineName];
    if (!medicine) return null;
    return medicine;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-background to-warning/5">
      <header className="bg-card/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/user-dashboard')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center space-x-2">
                <Pill className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold text-primary">Medicine Tracker</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Find Medicines Near You</h2>
            <p className="text-muted-foreground text-lg">
              Real-time medicine availability and pricing from local pharmacies
            </p>
          </div>

          {/* Search Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search Medicine
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for medicine (e.g., Paracetamol, Crocin...)"
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Common Medicines */}
              <div>
                <p className="text-sm text-muted-foreground mb-3">Common medicines:</p>
                <div className="flex flex-wrap gap-2">
                  {commonMedicines.map((medicine) => (
                    <Button
                      key={medicine}
                      variant="outline"
                      size="sm"
                      onClick={() => searchMedicine(medicine)}
                      className="text-xs"
                    >
                      {medicine}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pharmacy Results */}
          <div className="space-y-6">
            {getFilteredPharmacies().map((pharmacy) => (
              <Card key={pharmacy.id} className="border-2 hover:border-primary/20 transition-smooth">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Pill className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{pharmacy.name}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {pharmacy.address}
                          <span>•</span>
                          {pharmacy.distance}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={pharmacy.status === "open" ? "default" : "secondary"}>
                        <Clock className="h-3 w-3 mr-1" />
                        {pharmacy.status === "open" ? "Open" : "Closed"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  {/* Medicine Availability */}
                  <div className="space-y-3">
                    {Object.entries(pharmacy.medicines)
                      .filter(([medicineName]) => 
                        !searchTerm || medicineName.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map(([medicineName, medicine]) => (
                        <div key={medicineName} className="flex items-center justify-between p-3 bg-card/50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            {medicine.available ? (
                              <CheckCircle className="h-4 w-4 text-success" />
                            ) : (
                              <XCircle className="h-4 w-4 text-destructive" />
                            )}
                            <span className="font-medium">{medicineName}</span>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm font-medium">{medicine.price}</p>
                              <p className="text-xs text-muted-foreground">
                                Stock: {medicine.stock}
                              </p>
                            </div>
                            
                            {medicine.available ? (
                              <Badge className="bg-success/10 text-success">
                                Available
                              </Badge>
                            ) : (
                              <Badge variant="destructive">
                                Out of Stock
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Contact Info */}
                  <div className="mt-4 pt-4 border-t flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Contact: {pharmacy.contact}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <MapPin className="h-4 w-4 mr-2" />
                        Directions
                      </Button>
                      {pharmacy.status === "open" && (
                        <Button variant="medical" size="sm">
                          <Truck className="h-4 w-4 mr-2" />
                          Order Now
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* ASHA Worker Integration */}
          <Card className="mt-8 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                ASHA Worker Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-medium mb-2">Medicine Distribution Tracking:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Real-time stock updates from ASHA workers</li>
                    <li>• Distribution accountability system</li>
                    <li>• Automatic low-stock alerts</li>
                    <li>• Medicine wastage prevention</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Contact ASHA Worker:</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <MapPin className="h-4 w-4 mr-2" />
                      Find Nearest ASHA Worker
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Pill className="h-4 w-4 mr-2" />
                      Report Medicine Shortage
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* No Results */}
          {getFilteredPharmacies().length === 0 && searchTerm && (
            <Card className="mt-8 border-warning/20 bg-warning/5">
              <CardContent className="p-8 text-center">
                <AlertCircle className="h-12 w-12 text-warning mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-warning mb-2">Medicine Not Found</h3>
                <p className="text-muted-foreground mb-4">
                  "{searchTerm}" is not available in nearby pharmacies.
                </p>
                <div className="flex justify-center gap-4">
                  <Button variant="outline" onClick={() => setSearchTerm("")}>
                    Clear Search
                  </Button>
                  <Button variant="medical">
                    Request from ASHA Worker
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicineTracker;