import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Heart, Users, Building2, Stethoscope, Phone, AlertTriangle, Pill, FileHeart } from "lucide-react";
import heroImage from "@/assets/healthcare-hero.jpg";

const Index = () => {
  const navigate = useNavigate();

  const userTypes = [
    {
      id: "user",
      title: "Patient",
      description: "Access healthcare services, consult doctors, and manage your health records",
      icon: Heart,
      features: ["AI Symptom Checker", "Telemedicine Consultation", "Emergency SOS", "Health Records"],
      route: "/login?type=user"
    },
    {
      id: "doctor",
      title: "Doctor",
      description: "Provide telemedicine consultations and manage patient care remotely",
      icon: Stethoscope,
      features: ["Virtual Consultations", "Patient Management", "Real-time Updates", "Multi-language Support"],
      route: "/login?type=doctor"
    },
    {
      id: "hospital",
      title: "Hospital Authority",
      description: "Manage hospital resources, medicine inventory, and healthcare administration",
      icon: Building2,
      features: ["Resource Management", "Medicine Tracking", "Analytics Dashboard", "Staff Coordination"],
      route: "/login?type=hospital"
    }
  ];

  const features = [
    {
      icon: Phone,
      title: "Multi-Level Telemedicine",
      description: "Video, voice, or text consultation based on your internet connectivity",
    },
    {
      icon: AlertTriangle,
      title: "Emergency SOS",
      description: "One-tap emergency services with SMS fallback for critical situations",
    },
    {
      icon: Pill,
      title: "Real-time Medicine Tracking",
      description: "Live updates on medicine availability at local pharmacies and clinics",
    },
    {
      icon: FileHeart,
      title: "Offline Health Records",
      description: "Secure, immutable health records accessible via Aadhaar integration",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-medical-light to-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-primary">Code4Care</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#features" className="text-muted-foreground hover:text-primary transition-smooth">Features</a>
              <a href="#about" className="text-muted-foreground hover:text-primary transition-smooth">About</a>
              <a href="#contact" className="text-muted-foreground hover:text-primary transition-smooth">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-bold text-foreground mb-6 leading-tight">
                Bridging Healthcare Gaps with 
                <span className="text-primary"> Smart Technology</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Multilingual telemedicine platform bringing quality healthcare to rural areas. 
                Access doctors, manage health records, and get emergency care - all in your local language.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="xl" onClick={() => navigate('/login')}>
                  Get Started Today
                </Button>
                <Button variant="outline" size="xl">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Healthcare professionals providing telemedicine services" 
                className="rounded-2xl shadow-medical w-full h-auto"
              />
              <div className="absolute inset-0 bg-medical-gradient opacity-10 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* User Type Selection */}
      <section id="features" className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-foreground mb-4">Choose Your Role</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Access specialized features designed for your healthcare needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {userTypes.map((type) => {
              const IconComponent = type.icon;
              return (
                <Card key={type.id} className="hover:shadow-elegant transition-smooth border-2 hover:border-primary/20">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 p-4 bg-medical-gradient rounded-full w-16 h-16 flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-foreground">{type.title}</CardTitle>
                    <CardDescription className="text-muted-foreground text-base">
                      {type.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {type.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-muted-foreground">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      variant="medical" 
                      className="w-full" 
                      onClick={() => navigate(type.route)}
                    >
                      Access {type.title} Portal
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-foreground mb-4">Core Features</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive healthcare solutions designed for rural accessibility
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl w-16 h-16 flex items-center justify-center group-hover:shadow-medical transition-smooth">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h4>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Heart className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary">Code4Care</span>
            </div>
            <p className="text-muted-foreground mb-4">Smart India Hackathon 2025 - SIH25018</p>
            <p className="text-sm text-muted-foreground">
              Bringing healthcare to the last mile with technology and compassion
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;