import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Heart, ArrowLeft, Globe, Smartphone, Lock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userType = searchParams.get('type') || 'user';
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '',
    aadhaar: '',
    language: 'english'
  });

  const languages = [
    { value: 'english', label: 'English', flag: '🇺🇸' },
    { value: 'hindi', label: 'हिंदी', flag: '🇮🇳' },
    { value: 'punjabi', label: 'ਪੰਜਾਬੀ', flag: '🇮🇳' }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate authentication
    toast({
      title: "Login Successful!",
      description: `Welcome to Code4Care ${userType} dashboard`,
    });

    // Navigate based on user type
    const dashboardRoutes = {
      user: '/user-dashboard',
      doctor: '/doctor-dashboard',
      hospital: '/hospital-dashboard'
    };
    
    navigate(dashboardRoutes[userType as keyof typeof dashboardRoutes] || '/user-dashboard');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getUserTypeInfo = () => {
    const info = {
      user: {
        title: "Patient Login",
        description: "Access your health records and connect with healthcare providers",
        icon: Heart,
        color: "text-primary"
      },
      doctor: {
        title: "Doctor Login", 
        description: "Manage consultations and provide telemedicine services",
        icon: User,
        color: "text-success"
      },
      hospital: {
        title: "Hospital Authority Login",
        description: "Manage hospital resources and administrative functions",
        icon: Lock,
        color: "text-warning"
      }
    };
    return info[userType as keyof typeof info] || info.user;
  };

  const typeInfo = getUserTypeInfo();
  const IconComponent = typeInfo.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/')}
            className="absolute top-4 left-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">Code4Care</h1>
          </div>
        </div>

        <Card className="shadow-elegant border-2 border-primary/10">
          <CardHeader className="text-center">
            <div className={`mx-auto mb-4 p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full w-14 h-14 flex items-center justify-center`}>
              <IconComponent className={`h-7 w-7 ${typeInfo.color}`} />
            </div>
            <CardTitle className="text-2xl">{typeInfo.title}</CardTitle>
            <CardDescription className="text-base">
              {typeInfo.description}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {/* Language Selection */}
            <div className="mb-6">
              <Label htmlFor="language" className="flex items-center gap-2 mb-2">
                <Globe className="h-4 w-4" />
                Preferred Language
              </Label>
              <Select value={formData.language} onValueChange={(value) => handleInputChange('language', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        {lang.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email or Phone</Label>
                    <Input
                      id="email"
                      type="text"
                      placeholder="Enter your email or phone number"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      required
                    />
                  </div>

                  {userType === 'user' && (
                    <div>
                      <Label htmlFor="aadhaar">Aadhaar Number (Optional)</Label>
                      <Input
                        id="aadhaar"
                        type="text"
                        placeholder="Enter your Aadhaar number"
                        value={formData.aadhaar}
                        onChange={(e) => handleInputChange('aadhaar', e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        For secure health record access
                      </p>
                    </div>
                  )}
                  
                  <Button type="submit" variant="medical" className="w-full" size="lg">
                    Sign In Securely
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="reg-email">Email Address</Label>
                    <Input
                      id="reg-email"
                      type="email"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="reg-phone" className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4" />
                      Phone Number
                    </Label>
                    <Input
                      id="reg-phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>

                  {userType === 'user' && (
                    <div>
                      <Label htmlFor="reg-aadhaar">Aadhaar Number</Label>
                      <Input
                        id="reg-aadhaar"
                        type="text"
                        placeholder="1234 5678 9012"
                        required
                      />
                    </div>
                  )}
                  
                  <div>
                    <Label htmlFor="reg-password">Create Password</Label>
                    <Input
                      id="reg-password"
                      type="password"
                      placeholder="Minimum 8 characters"
                      required
                    />
                  </div>
                  
                  <Button type="submit" variant="medical" className="w-full" size="lg">
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Secure authentication with end-to-end encryption
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;