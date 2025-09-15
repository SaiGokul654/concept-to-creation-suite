import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Heart, 
  Building2, 
  Users, 
  Pill, 
  TrendingUp, 
  LogOut,
  Bell,
  Activity,
  BarChart3,
  UserCheck
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const HospitalDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const hospitalStats = [
    { label: "Active Doctors", value: "24", change: "+2", icon: UserCheck },
    { label: "Medicine Stock", value: "89%", change: "+5%", icon: Pill },
    { label: "Daily Patients", value: "156", change: "+12", icon: Users },
    { label: "Efficiency", value: "94%", change: "+3%", icon: TrendingUp }
  ];

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "Hospital system secured.",
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-background to-warning/5">
      <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Heart className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold text-primary">Code4Care</h1>
              </div>
              <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                <Building2 className="h-3 w-3 mr-1" />
                Hospital Authority
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
          <h2 className="text-3xl font-bold text-foreground mb-2">Nabha Regional Hospital</h2>
          <p className="text-muted-foreground text-lg">
            Hospital management and resource coordination
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {hospitalStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <IconComponent className="h-5 w-5 text-primary mb-1" />
                      <div className="flex items-center text-success text-sm">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {stat.change}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Resource Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Pill className="h-4 w-4 mr-2" />
                Medicine Inventory
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Staff Management
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Activity className="h-4 w-4 mr-2" />
                Analytics Dashboard
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-card/50 rounded-lg">
                  <span className="text-sm">Medicine Shortage Alert</span>
                  <Badge variant="destructive">3 items</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-card/50 rounded-lg">
                  <span className="text-sm">Doctor Availability</span>
                  <Badge className="bg-success/10 text-success">24/7</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-card/50 rounded-lg">
                  <span className="text-sm">Emergency Cases</span>
                  <Badge className="bg-warning/10 text-warning">2 active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;