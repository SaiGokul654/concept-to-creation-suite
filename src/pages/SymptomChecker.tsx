import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Bot, 
  AlertCircle, 
  CheckCircle, 
  Stethoscope,
  Heart,
  MessageSquare,
  Thermometer
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SymptomChecker = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [customSymptom, setCustomSymptom] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);

  const commonSymptoms = [
    { id: "fever", label: "Fever", icon: Thermometer },
    { id: "headache", label: "Headache", icon: AlertCircle },
    { id: "cough", label: "Cough", icon: MessageSquare },
    { id: "fatigue", label: "Fatigue", icon: Heart },
    { id: "bodyache", label: "Body Ache", icon: Stethoscope },
    { id: "nausea", label: "Nausea", icon: AlertCircle }
  ];

  const handleSymptomChange = (symptomId: string, checked: boolean) => {
    if (checked) {
      setSymptoms([...symptoms, symptomId]);
    } else {
      setSymptoms(symptoms.filter(s => s !== symptomId));
    }
  };

  const analyzeSymptoms = () => {
    // Simulate AI analysis
    const mockAnalysis = {
      severity: symptoms.length > 3 ? "moderate" : "mild",
      recommendation: symptoms.includes("fever") && symptoms.includes("cough") ? 
        "Your symptoms suggest a possible viral infection. Rest, stay hydrated, and monitor your temperature." :
        "Your symptoms appear mild. Rest and stay hydrated. Monitor for any changes.",
      shouldConsultDoctor: symptoms.length > 3 || symptoms.includes("fever"),
      tips: [
        "Drink plenty of fluids",
        "Get adequate rest",
        "Monitor your temperature",
        "Avoid contact with others if feeling unwell"
      ]
    };

    setAnalysis(mockAnalysis);
    
    toast({
      title: "Analysis Complete",
      description: "AI has analyzed your symptoms",
    });
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
                <Bot className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold text-primary">AI Symptom Checker</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">How are you feeling today?</h2>
            <p className="text-muted-foreground text-lg">
              Select your symptoms and get AI-powered health guidance
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Symptom Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Your Symptoms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {commonSymptoms.map((symptom) => {
                    const IconComponent = symptom.icon;
                    return (
                      <div key={symptom.id} className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-card/50">
                        <Checkbox
                          id={symptom.id}
                          checked={symptoms.includes(symptom.id)}
                          onCheckedChange={(checked) => handleSymptomChange(symptom.id, checked as boolean)}
                        />
                        <div className="flex items-center space-x-2">
                          <IconComponent className="h-4 w-4 text-primary" />
                          <Label htmlFor={symptom.id} className="cursor-pointer">
                            {symptom.label}
                          </Label>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6">
                  <Label htmlFor="custom-symptom">Describe other symptoms</Label>
                  <Input
                    id="custom-symptom"
                    placeholder="Describe any other symptoms you're experiencing..."
                    value={customSymptom}
                    onChange={(e) => setCustomSymptom(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <Button 
                  variant="medical" 
                  className="w-full mt-6" 
                  onClick={analyzeSymptoms}
                  disabled={symptoms.length === 0 && !customSymptom}
                >
                  <Bot className="h-4 w-4 mr-2" />
                  Analyze Symptoms
                </Button>
              </CardContent>
            </Card>

            {/* Analysis Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  AI Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!analysis ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Select your symptoms to get AI-powered health guidance</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Severity */}
                    <div className="flex items-center gap-3">
                      {analysis.severity === "mild" ? (
                        <CheckCircle className="h-5 w-5 text-success" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-warning" />
                      )}
                      <div>
                        <p className="font-medium">Severity: {analysis.severity}</p>
                      </div>
                    </div>

                    {/* Recommendation */}
                    <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                      <h4 className="font-medium mb-2">AI Recommendation</h4>
                      <p className="text-sm text-muted-foreground">{analysis.recommendation}</p>
                    </div>

                    {/* Health Tips */}
                    <div>
                      <h4 className="font-medium mb-3">Health Tips</h4>
                      <ul className="space-y-2">
                        {analysis.tips.map((tip: string, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Doctor Consultation */}
                    {analysis.shouldConsultDoctor && (
                      <div className="p-4 bg-warning/5 rounded-lg border border-warning/20">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle className="h-4 w-4 text-warning" />
                          <p className="font-medium text-warning">Doctor Consultation Recommended</p>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Based on your symptoms, we recommend consulting with a healthcare professional.
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => navigate('/telemedicine')}
                        >
                          <Stethoscope className="h-4 w-4 mr-2" />
                          Consult Doctor Now
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Disclaimer */}
          <Card className="mt-8 border-warning/20 bg-warning/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-warning mb-1">Medical Disclaimer</p>
                  <p className="text-xs text-muted-foreground">
                    This AI symptom checker is for informational purposes only and should not replace professional medical advice. 
                    Always consult with a qualified healthcare provider for proper diagnosis and treatment.
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

export default SymptomChecker;