import { useState } from "react";
import { VehicleCard } from "@/components/VehicleCard";
import { PurchaseModal } from "@/components/PurchaseModal";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePurchases } from "@/hooks/usePurchases";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import level1Image from "@/assets/level1-sports-car.png";
import level2Image from "@/assets/level2-yacht.jpeg";
import level3Image from "@/assets/level3-helicopter.webp";
import level4Image from "@/assets/level4-jet.webp";
import level5Image from "@/assets/level5-mansion.png";
import { FloatingDollar } from "@/components/FloatingDollar";

const vehicles = [
  { id: 1, name: "Sports Car", price: "€100", image: level1Image, level: 1 },
  { id: 2, name: "Yacht", price: "€200", image: level2Image, level: 2 },
  { id: 3, name: "Helicopter", price: "€300", image: level3Image, level: 3 },
  { id: 4, name: "Private Jet", price: "€400", image: level4Image, level: 4 },
  { id: 5, name: "Luxury Mansion", price: "€500", image: level5Image, level: 5 },
];

const Garage = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<typeof vehicles[0] | null>(null);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { isPurchased } = usePurchases();

  const handlePurchase = async () => {
    if (!selectedVehicle) return;
    
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-payment", {
        body: { level: selectedVehicle.level, email },
      });

      if (error) throw error;
      if (!data?.url) throw new Error("No checkout URL received");

      // Open Stripe checkout in new tab
      window.open(data.url, "_blank");
      setSelectedVehicle(null);
      toast.success("Redirecting to payment...");
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Failed to start payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark p-8 relative overflow-hidden">
      {/* Floating dollar pattern background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${(i % 4) * 25 + 5}%`,
              top: `${Math.floor(i / 4) * 35 + 10}%`,
              transform: `rotate(${(i * 15) - 20}deg)`,
            }}
          >
            <FloatingDollar 
              delay={i * 0.3} 
              duration={3 + (i % 2)} 
              size={60 + (i % 3) * 30} 
            />
          </div>
        ))}
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <Button
          onClick={() => navigate("/")}
          variant="outline"
          className="mb-8 border-primary/30 hover:border-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <h1 className="text-6xl font-bold text-center text-primary mb-12 tracking-wide" style={{ fontFamily: "'Brush Script MT', 'Segoe Script', cursive", textShadow: '0 0 30px rgba(255, 215, 0, 0.5)' }}>
          Luxury Level
        </h1>

        <div className="space-y-6">
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              name={vehicle.name}
              image={vehicle.image}
              level={vehicle.level}
              onClick={() => {
                if (isPurchased(vehicle.level)) {
                  navigate(`/vehicle/${vehicle.level}`);
                  return;
                }
                setSelectedVehicle(vehicle);
              }}
              isPurchased={isPurchased(vehicle.level)}
            />
          ))}
        </div>
      </div>

      {selectedVehicle && !isPurchased(selectedVehicle.level) && (
        <PurchaseModal
          open={!!selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
          vehicleName={selectedVehicle.name}
          price={selectedVehicle.price}
          email={email}
          onEmailChange={setEmail}
          onPurchase={handlePurchase}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default Garage;
