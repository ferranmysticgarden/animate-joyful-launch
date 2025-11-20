import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Language } from "@/lib/i18n";
import Index from "./pages/Index";
import Garage from "./pages/Garage";
import VehicleDisplay from "./pages/VehicleDisplay";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import carLevel1 from "@/assets/car-level1.png";
import carLevel2 from "@/assets/car-level2.png";
import carLevel3 from "@/assets/car-level3.png";
import carLevel4 from "@/assets/car-level4.png";
import carLevel5 from "@/assets/car-level5.png";

const queryClient = new QueryClient();

const vehicleImages: Record<string, string> = {
  "1": carLevel1,
  "2": carLevel2,
  "3": carLevel3,
  "4": carLevel4,
  "5": carLevel5,
};

const App = () => {
  const [lang, setLang] = useState<Language>('es');

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/garage" element={<Garage lang={lang} />} />
            <Route 
              path="/vehicle/:id" 
              element={
                <VehicleDisplay 
                  image={vehicleImages[window.location.pathname.split('/')[2]]} 
                  onBack={() => window.history.back()} 
                  backText="Back to Garage"
                />
              } 
            />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
