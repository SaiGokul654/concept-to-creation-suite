import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Video, 
  Phone, 
  MessageSquare, 
  Wifi, 
  WifiOff,
  User,
  Calendar,
  Clock,
  Signal
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Telemedicine = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [connectionType, setConnectionType] = useState<"video" | "voice" | "text" | null>(null);

  const availableDoctors = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      specialty: "General Medicine",
      rating: 4.8,
      experience: "8 years",
      languages: ["English", "Hindi", "Punjabi"],
      available: true,
      nextSlot: "10:30 AM"
    },
    {
      id: 2,
      name: "Dr. Rajesh Kumar",
      specialty: "Pediatrics",
      rating: 4.9,
      experience: "12 years",
      languages: ["Hindi", "Punjabi"],
      available: true,
      nextSlot: "11:15 AM"
    },
    {
      id: 3,
      name: "Dr. Sunita Patel",
      specialty: "Cardiology",
      rating: 4.7,
      experience: "15 years",
      languages: ["English", "Hindi"],
      available: false,
      nextSlot: "2:00 PM"
    }
  ];

  const connectionOptions = [
    {
      type: "video" as const,
      title: "Video Consultation",
      description: "Best quality with face-to-face interaction",
      icon: Video,
      requirement: "Good internet connection",
      color: "bg-success",
      available: true
    },
    {
      type: "voice" as const,
      title: "Voice Call",
      description: "Clear audio consultation",
      icon: Phone,
      requirement: "Moderate internet or phone network",
      color: "bg-primary",
      available: true
    },
    {
      type: "text" as const,
      title: "Text Chat",
      description: "Messaging with doctor",
      icon: MessageSquare,
      requirement: "Basic internet connection",
      color: "bg-warning",
      available: true
    }
  ];

  const startConsultation = (doctorId: number, type: string) => {
    toast({
      title: "Consultation Starting",
      description: `Connecting via ${type} with doctor...`,
    });
    
    // Simulate connection
    setTimeout(() => {
      toast({
        title: "Connected Successfully",
        description: "You are now connected with the doctor",
      });
    }, 2000);
  };

  const checkConnection = () => {
    // Simulate connection check
    const quality = Math.random();
    if (quality > 0.7) {
      return { type: "good", icon: Wifi, color: "text-success", text: "Good Connection" };
    } else if (quality > 0.4) {
      return { type: "moderate", icon: Signal, color: "text-warning", text: "Moderate Connection" };
    } else {
      return { type: "poor", icon: WifiOff, color: "text-destructive", text: "Poor Connection" };
    }
  };

  const connection = checkConnection();
  const ConnectionIcon = connection.icon;

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
                <Video className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold text-primary">Telemedicine</h1>
              </div>
            </div>
            
            <Badge variant="outline" className={`${connection.color} border-current`}>
              <ConnectionIcon className="h-3 w-3 mr-1" />
              {connection.text}
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Connect with Healthcare Professionals</h2>
            <p className="text-muted-foreground text-lg">
              Choose your preferred consultation method based on your connectivity
            </p>
          </div>

          {/* Connection Options */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Select Consultation Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {connectionOptions.map((option) => {
                  const IconComponent = option.icon;
                  const isRecommended = 
                    (connection.type === "good" && option.type === "video") ||
                    (connection.type === "moderate" && option.type === "voice") ||
                    (connection.type === "poor" && option.type === "text");

                  return (
                    <Card 
                      key={option.type}
                      className={`cursor-pointer transition-smooth hover:shadow-elegant border-2 ${
                        connectionType === option.type ? 'border-primary' : 'border-border'
                      } ${isRecommended ? 'ring-2 ring-primary/20' : ''}`}
                      onClick={() => setConnectionType(option.type)}
                    >
                      <CardContent className="p-4 text-center">
                        <div className={`mx-auto mb-3 p-3 ${option.color} rounded-full w-12 h-12 flex items-center justify-center`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">{option.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{option.description}</p>
                        <p className="text-xs text-muted-foreground">{option.requirement}</p>
                        {isRecommended && (
                          <Badge className="mt-2 bg-primary/10 text-primary">Recommended</Badge>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Available Doctors */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Available Doctors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableDoctors.map((doctor) => (
                  <Card key={doctor.id} className="border-2 hover:border-primary/20 transition-smooth">
                    <CardContent className="p-4">
                      <div className="text-center mb-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-3 flex items-center justify-center">
                          <User className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="font-semibold text-foreground">{doctor.name}</h3>
                        <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span>Experience:</span>
                          <span className="font-medium">{doctor.experience}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Rating:</span>
                          <span className="font-medium">⭐ {doctor.rating}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Next Slot:</span>
                          <span className="font-medium flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {doctor.nextSlot}
                          </span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-xs text-muted-foreground mb-2">Languages:</p>
                        <div className="flex flex-wrap gap-1">
                          {doctor.languages.map((lang) => (
                            <Badge key={lang} variant="secondary" className="text-xs">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button 
                        variant={doctor.available ? "medical" : "outline"} 
                        className="w-full"
                        disabled={!doctor.available || !connectionType}
                        onClick={() => startConsultation(doctor.id, connectionType!)}
                      >
                        {doctor.available ? (
                          <>
                            <Calendar className="h-4 w-4 mr-2" />
                            Book Now
                          </>
                        ) : (
                          <>
                            <Clock className="h-4 w-4 mr-2" />
                            Schedule Later
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Connection Guide */}
          <Card className="mt-8 border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <h4 className="font-medium text-primary mb-2">Connection Guide</h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Wifi className="h-4 w-4 text-success" />
                  <span>Good: Video calls available</span>
                </div>
                <div className="flex items-center gap-2">
                  <Signal className="h-4 w-4 text-warning" />
                  <span>Moderate: Voice calls recommended</span>
                </div>
                <div className="flex items-center gap-2">
                  <WifiOff className="h-4 w-4 text-destructive" />
                  <span>Poor: Text chat or SOS SMS</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Telemedicine;