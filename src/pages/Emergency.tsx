import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  AlertTriangle, 
  Phone, 
  MessageSquare, 
  MapPin, 
  Clock,
  Heart,
  Ambulance,
  Shield,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Emergency = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const emergencyContacts = [
    { service: "Ambulance", number: "108", icon: Ambulance, color: "bg-emergency" },
    { service: "Police", number: "100", icon: Shield, color: "bg-destructive" },
    { service: "Fire", number: "101", icon: Zap, color: "bg-warning" },
    { service: "Helpline", number: "1075", icon: Phone, color: "bg-primary" }
  ];

  const nearbyHospitals = [
    { name: "Nabha Civil Hospital", distance: "2.1 km", time: "8 min", available: true },
    { name: "Max Super Specialty", distance: "5.7 km", time: "15 min", available: true },
    { name: "Apollo Clinic", distance: "3.2 km", time: "12 min", available: false }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (emergencyActive && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0 && emergencyActive) {
      handleEmergencyCall();
    }
    return () => clearInterval(interval);
  }, [emergencyActive, countdown]);

  const activateEmergency = () => {
    setEmergencyActive(true);
    setCountdown(10);
    toast({
      title: "Emergency SOS Activated",
      description: "Emergency services will be contacted in 10 seconds...",
      variant: "destructive"
    });
  };

  const cancelEmergency = () => {
    setEmergencyActive(false);
    setCountdown(0);
    toast({
      title: "Emergency Cancelled",
      description: "SOS has been cancelled successfully",
    });
  };

  const handleEmergencyCall = () => {
    setEmergencyActive(false);
    toast({
      title: "Emergency Services Contacted",
      description: "Help is on the way! SMS sent to emergency contacts.",
      variant: "destructive"
    });
  };

  const callEmergencyService = (number: string, service: string) => {
    toast({
      title: `Calling ${service}`,
      description: `Dialing ${number}...`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emergency/10 via-background to-destructive/5">
      <header className="bg-card/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/user-dashboard')}
                disabled={emergencyActive}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-6 w-6 text-emergency" />
                <h1 className="text-xl font-bold text-emergency">Emergency Services</h1>
              </div>
            </div>
            
            {emergencyActive && (
              <Badge variant="destructive" className="animate-pulse">
                <AlertTriangle className="h-3 w-3 mr-1" />
                SOS ACTIVE
              </Badge>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Emergency SOS Button */}
          <Card className={`mb-8 border-4 ${emergencyActive ? 'border-emergency animate-pulse' : 'border-emergency/30'} bg-gradient-to-r from-emergency/10 to-transparent`}>
            <CardContent className="p-8 text-center">
              {!emergencyActive ? (
                <>
                  <div className="mb-6">
                    <div className="w-24 h-24 bg-emergency-gradient rounded-full mx-auto mb-4 flex items-center justify-center shadow-emergency">
                      <AlertTriangle className="h-12 w-12 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground mb-2">Emergency SOS</h2>
                    <p className="text-muted-foreground text-lg">
                      Press and hold to activate emergency services
                    </p>
                  </div>
                  <Button 
                    variant="emergency" 
                    size="xl"
                    className="w-full max-w-md mx-auto h-16 text-xl font-bold"
                    onClick={activateEmergency}
                  >
                    <AlertTriangle className="h-6 w-6 mr-3" />
                    ACTIVATE SOS
                  </Button>
                </>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="w-32 h-32 bg-emergency-gradient rounded-full mx-auto mb-4 flex items-center justify-center shadow-emergency animate-pulse">
                      <span className="text-4xl font-bold text-white">{countdown}</span>
                    </div>
                    <h2 className="text-3xl font-bold text-emergency mb-2">SOS ACTIVATED</h2>
                    <p className="text-muted-foreground text-lg">
                      Emergency services will be contacted in {countdown} seconds
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="xl"
                    className="w-full max-w-md mx-auto h-16 text-xl font-bold border-2 border-destructive text-destructive hover:bg-destructive hover:text-white"
                    onClick={cancelEmergency}
                  >
                    CANCEL SOS
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Emergency Contacts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {emergencyContacts.map((contact) => {
                    const IconComponent = contact.icon;
                    return (
                      <div key={contact.service} className="flex items-center justify-between p-4 border rounded-lg hover:bg-card/50 transition-smooth">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 ${contact.color} rounded-lg`}>
                            <IconComponent className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">{contact.service}</h4>
                            <p className="text-sm text-muted-foreground">24/7 Available</p>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => callEmergencyService(contact.number, contact.service)}
                          disabled={emergencyActive}
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          {contact.number}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Nearby Hospitals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Nearby Hospitals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {nearbyHospitals.map((hospital, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-medical-gradient rounded-lg">
                          <Heart className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{hospital.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {hospital.distance}
                            <span>•</span>
                            <Clock className="h-3 w-3" />
                            {hospital.time}
                          </div>
                        </div>
                      </div>
                      <Badge variant={hospital.available ? "default" : "secondary"}>
                        {hospital.available ? "Available" : "Busy"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Emergency Tips */}
          <Card className="mt-8 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                Emergency Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-medium mb-2">During Medical Emergency:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Stay calm and assess the situation</li>
                    <li>• Call emergency services immediately</li>
                    <li>• Provide clear location information</li>
                    <li>• Follow dispatcher instructions</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Information to Provide:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Your exact location</li>
                    <li>• Nature of the emergency</li>
                    <li>• Number of people involved</li>
                    <li>• Your contact information</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SMS Emergency Feature */}
          <Card className="mt-6 border-warning/20 bg-warning/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-warning" />
                <div>
                  <p className="font-medium text-warning mb-1">SMS Emergency Feature</p>
                  <p className="text-xs text-muted-foreground">
                    When internet is unavailable, emergency SOS will automatically send SMS to pre-configured contacts and emergency services.
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

export default Emergency;