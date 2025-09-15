import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import HospitalDashboard from "./pages/HospitalDashboard";
import SymptomChecker from "./pages/SymptomChecker";
import Telemedicine from "./pages/Telemedicine";
import Emergency from "./pages/Emergency";
import MedicineTracker from "./pages/MedicineTracker";
import HealthRecords from "./pages/HealthRecords";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/hospital-dashboard" element={<HospitalDashboard />} />
          <Route path="/symptom-checker" element={<SymptomChecker />} />
          <Route path="/telemedicine" element={<Telemedicine />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/medicine-tracker" element={<MedicineTracker />} />
          <Route path="/health-records" element={<HealthRecords />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
