import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  FileHeart, 
  Download, 
  Upload, 
  Shield, 
  Calendar,
  User,
  Activity,
  Pill,
  Stethoscope,
  FileText,
  Eye,
  Lock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const HealthRecords = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  const healthRecords = [
    {
      id: 1,
      date: "2024-01-15",
      type: "Consultation",
      doctor: "Dr. Priya Sharma",
      diagnosis: "Viral Fever",
      prescription: ["Paracetamol 500mg", "Rest", "Fluids"],
      status: "completed",
      category: "consultation"
    },
    {
      id: 2,
      date: "2024-01-10", 
      type: "Lab Report",
      doctor: "Dr. Rajesh Kumar",
      diagnosis: "Blood Test - Normal",
      prescription: ["CBC Report", "Lipid Profile"],
      status: "completed",
      category: "lab"
    },
    {
      id: 3,
      date: "2024-01-05",
      type: "Prescription",
      doctor: "Dr. Sunita Patel",
      diagnosis: "Hypertension Management",
      prescription: ["Amlodipine 5mg", "Low salt diet"],
      status: "active",
      category: "prescription"
    },
    {
      id: 4,
      date: "2024-01-01",
      type: "Vaccination",
      doctor: "Nabha Health Center",
      diagnosis: "Annual Flu Shot",
      prescription: ["Influenza Vaccine"],
      status: "completed",
      category: "vaccination"
    }
  ];

  const vitalSigns = [
    { parameter: "Blood Pressure", value: "120/80 mmHg", status: "normal", date: "2024-01-15" },
    { parameter: "Heart Rate", value: "72 bpm", status: "normal", date: "2024-01-15" },
    { parameter: "Temperature", value: "98.6°F", status: "normal", date: "2024-01-15" },
    { parameter: "Weight", value: "65 kg", status: "normal", date: "2024-01-10" },
    { parameter: "Blood Sugar", value: "95 mg/dL", status: "normal", date: "2024-01-08" }
  ];

  const emergencyInfo = {
    bloodType: "O+",
    allergies: ["Penicillin", "Shellfish"],
    chronicConditions: ["Hypertension"],
    emergencyContact: {
      name: "Raj Sharma",
      relation: "Husband", 
      phone: "+91 98765 43210"
    }
  };

  const downloadRecord = (recordId: number) => {
    toast({
      title: "Downloading Record",
      description: "Health record is being downloaded...",
    });
  };

  const syncWithAadhaar = () => {
    toast({
      title: "Syncing with Aadhaar",
      description: "Connecting to Aadhaar health records...",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success/10 text-success">Active</Badge>;
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "consultation":
        return <Stethoscope className="h-4 w-4" />;
      case "lab":
        return <Activity className="h-4 w-4" />;
      case "prescription":
        return <Pill className="h-4 w-4" />;
      case "vaccination":
        return <Shield className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-background to-primary/5">
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
                <FileHeart className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold text-primary">Health Records</h1>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                <Shield className="h-3 w-3 mr-1" />
                Secure
              </Badge>
              <Button variant="outline" size="sm" onClick={syncWithAadhaar}>
                <Lock className="h-4 w-4 mr-2" />
                Sync Aadhaar
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Your Digital Health Records</h2>
            <p className="text-muted-foreground text-lg">
              Secure, immutable health records accessible offline via Aadhaar integration
            </p>
          </div>

          <Tabs defaultValue="records" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="records">Medical Records</TabsTrigger>
              <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
              <TabsTrigger value="emergency">Emergency Info</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="records" className="mt-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Records List */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Medical Records
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {healthRecords.map((record) => (
                          <div 
                            key={record.id} 
                            className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-card/50 transition-smooth"
                            onClick={() => setSelectedRecord(record)}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-primary/10 rounded-lg">
                                {getCategoryIcon(record.category)}
                              </div>
                              <div>
                                <h4 className="font-medium text-foreground">{record.type}</h4>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Calendar className="h-3 w-3" />
                                  {record.date}
                                  <span>•</span>
                                  <User className="h-3 w-3" />
                                  {record.doctor}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              {getStatusBadge(record.status)}
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Record Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Record Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedRecord ? (
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-foreground mb-2">{selectedRecord.type}</h4>
                          <p className="text-sm text-muted-foreground">{selectedRecord.date}</p>
                        </div>
                        
                        <div>
                          <h5 className="font-medium mb-1">Doctor:</h5>
                          <p className="text-sm text-muted-foreground">{selectedRecord.doctor}</p>
                        </div>
                        
                        <div>
                          <h5 className="font-medium mb-1">Diagnosis:</h5>
                          <p className="text-sm text-muted-foreground">{selectedRecord.diagnosis}</p>
                        </div>
                        
                        <div>
                          <h5 className="font-medium mb-1">Prescription:</h5>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {selectedRecord.prescription.map((item: string, index: number) => (
                              <li key={index}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => downloadRecord(selectedRecord.id)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download Record
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Select a record to view details</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="vitals" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Vital Signs History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {vitalSigns.map((vital, index) => (
                      <Card key={index} className="border-2">
                        <CardContent className="p-4">
                          <div className="text-center">
                            <h4 className="font-medium text-foreground mb-1">{vital.parameter}</h4>
                            <p className="text-2xl font-bold text-primary mb-2">{vital.value}</p>
                            <div className="flex items-center justify-center gap-2">
                              <Badge className="bg-success/10 text-success">Normal</Badge>
                              <span className="text-xs text-muted-foreground">{vital.date}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="emergency" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Emergency Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium text-foreground mb-3">Medical Information</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Blood Type:</span>
                            <Badge variant="outline">{emergencyInfo.bloodType}</Badge>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Allergies:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {emergencyInfo.allergies.map((allergy) => (
                                <Badge key={allergy} variant="destructive" className="text-xs">
                                  {allergy}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Chronic Conditions:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {emergencyInfo.chronicConditions.map((condition) => (
                                <Badge key={condition} className="bg-warning/10 text-warning text-xs">
                                  {condition}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-foreground mb-3">Emergency Contact</h4>
                      <Card className="border-2">
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <h5 className="font-medium">{emergencyInfo.emergencyContact.name}</h5>
                            <p className="text-sm text-muted-foreground">{emergencyInfo.emergencyContact.relation}</p>
                            <p className="text-sm font-medium">{emergencyInfo.emergencyContact.phone}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Document Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Upload className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <h3 className="text-lg font-medium text-foreground mb-2">Upload Health Documents</h3>
                    <p className="text-muted-foreground mb-6">
                      Store lab reports, prescriptions, and medical certificates securely
                    </p>
                    <Button variant="medical">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Documents
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Offline Access Notice */}
          <Card className="mt-8 border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-primary mb-1">Offline Access & Security</p>
                  <p className="text-xs text-muted-foreground">
                    Your health records are encrypted and accessible offline via Aadhaar integration. 
                    Data is synchronized securely when connection is available.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HealthRecords;