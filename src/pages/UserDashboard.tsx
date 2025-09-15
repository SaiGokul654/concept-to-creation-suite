import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Heart, 
  Phone, 
  AlertTriangle, 
  Pill, 
  FileHeart, 
  Bot, 
  Video, 
  MessageCircle,
  LogOut,
  Bell,
  Globe,
  Shield,
  Activity
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const quickActions = [
    {
      title: "AI Symptom Checker",
      description: "Get instant health guidance and recommendations",
      icon: Bot,
      color: "bg-primary",
      route: "/symptom-checker",
      urgent: false
    },
    {
      title: "Emergency SOS",
      description: "Immediate emergency assistance",
      icon: AlertTriangle,
      color: "bg-emergency-gradient",
      route: "/emergency",
      urgent: true
    },
    {
      title: "Telemedicine",
      description: "Connect with doctors via video/voice",
      icon: Video,
      color: "bg-success",
      route: "/telemedicine",
      urgent: false
    },
    {
      title: "Medicine Tracker",
      description: "Check real-time medicine availability",
      icon: Pill,
      color: "bg-warning",
      route: "/medicine-tracker", 
      urgent: false
    },
    {
      title: "Health Records",
      description: "Access your digital health history",
      icon: FileHeart,
      color: "bg-medical-gradient",
      route: "/health-records",
      urgent: false
    }
  ];

  const recentActivity = [
    {
      type: "consultation",
      title: "Video consultation with Dr. Priya Sharma",
      time: "2 hours ago",
      status: "completed"
    },
    {
      type: "medication",
      title: "Paracetamol prescription filled",
      time: "1 day ago", 
      status: "success"
    },
    {
      type: "symptom",
      title: "Symptom check: Fever, headache",
      time: "3 days ago",
      status: "reviewed"
    }
  ];

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "Stay healthy and see you soon!",
    });
    navigate('/');
  };

  const handleEmergency = () => {
    toast({
      title: "Emergency Mode Activated",
      description: "Connecting to nearest emergency services...",
      variant: "destructive"
    });
    navigate('/emergency');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-background to-primary/5">
      {/* Header */}
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
                Online
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Globe className="h-4 w-4 mr-2" />
                English
              </Button>
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome back, Priya!</h2>
          <p className="text-muted-foreground text-lg">
            Your health companion is ready to assist you today
          </p>
        </div>

        {/* Emergency Quick Access */}
        <Card className="mb-8 border-2 border-emergency/20 bg-gradient-to-r from-emergency/5 to-transparent">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-emergency-gradient rounded-full">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Emergency Services</h3>
                  <p className="text-muted-foreground">Get immediate help in critical situations</p>
                </div>
              </div>
              <Button 
                variant="emergency" 
                size="lg"
                onClick={handleEmergency}
                className="animate-pulse"
              >
                <AlertTriangle className="h-5 w-5 mr-2" />
                SOS Emergency
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-semibold text-foreground mb-6">Quick Actions</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {quickActions.filter(action => !action.urgent).map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <Card 
                    key={index} 
                    className="hover:shadow-elegant transition-smooth cursor-pointer border-2 hover:border-primary/20"
                    onClick={() => navigate(action.route)}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 ${action.color} rounded-lg`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{action.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base mb-4">
                        {action.description}
                      </CardDescription>
                      <Button variant="outline" className="w-full">
                        Access Now
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Health Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-success" />
                  Health Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Overall Health</span>
                    <Badge className="bg-success/10 text-success">Good</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Last Checkup</span>
                    <span className="text-sm text-muted-foreground">15 days ago</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Medications</span>
                    <span className="text-sm text-muted-foreground">2 active</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Quick Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat Support
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Phone className="h-4 w-4 mr-2" />
                  Helpline: 108
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;