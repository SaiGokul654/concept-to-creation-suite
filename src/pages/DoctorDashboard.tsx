import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Heart, 
  Users, 
  Video, 
  Calendar, 
  FileText, 
  Bell,
  LogOut,
  Activity,
  Clock,
  TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const upcomingConsultations = [
    { patient: "Priya Sharma", time: "10:30 AM", type: "Video Call", urgent: false },
    { patient: "Raj Kumar", time: "11:15 AM", type: "Voice Call", urgent: true },
    { patient: "Maya Patel", time: "2:00 PM", type: "Text Chat", urgent: false },
  ];

  const todayStats = [
    { label: "Consultations", value: "12", change: "+3" },
    { label: "Patients", value: "8", change: "+2" },
    { label: "Emergency Cases", value: "2", change: "0" },
    { label: "Prescriptions", value: "15", change: "+5" }
  ];

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "Thank you for your service, Doctor!",
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-background to-success/5">
      <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Heart className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold text-primary">Code4Care</h1>
              </div>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                <Activity className="h-3 w-3 mr-1" />
                Doctor Portal
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-muted-foreground hover:text-destructive"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome, Dr. Vikram Singh</h2>
          <p className="text-muted-foreground text-lg">
            Ready to provide quality healthcare to your patients
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {todayStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className="flex items-center text-success text-sm">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    {stat.change}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upcoming Consultations */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Today's Consultations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingConsultations.map((consultation, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-card/50 rounded-lg border">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-full">
                          <Users className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{consultation.patient}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {consultation.time}
                            <span>•</span>
                            {consultation.type}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {consultation.urgent && (
                          <Badge variant="destructive" className="text-xs">Urgent</Badge>
                        )}
                        <Button variant="medical" size="sm">
                          <Video className="h-4 w-4 mr-1" />
                          Join
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Patient Records
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Video className="h-4 w-4 mr-2" />
                  Start Consultation
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="h-4 w-4 mr-2" />
                  Emergency Alerts
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;