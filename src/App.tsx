import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Index from "./pages/Index";
import Garage from "./pages/Garage";
import VehicleDisplay from "./pages/VehicleDisplay";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import level1Image from "@/assets/level1-sports-car.png";
import level2Image from "@/assets/level2-yacht.jpeg";
import level3Image from "@/assets/level3-helicopter.webp";
import level4Image from "@/assets/level4-jet.webp";
import level5Image from "@/assets/level5-mansion.png";

const queryClient = new QueryClient();

const vehicleImages: Record<string, string> = {
  "1": level1Image,
  "2": level2Image,
  "3": level3Image,
  "4": level4Image,
  "5": level5Image,
};

const VehicleRoute = () => {
  const { id } = useParams();
  const image = (id && vehicleImages[id]) ?? vehicleImages["1"];

  return (
    <VehicleDisplay
      image={image}
      onBack={() => window.history.back()}
      backText="Back to Garage"
    />
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/garage" element={<Garage />} />
            <Route path="/vehicle/:id" element={<VehicleRoute />} />
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
