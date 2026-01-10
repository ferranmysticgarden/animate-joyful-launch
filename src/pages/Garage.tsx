import { useState } from "react";
import { VehicleCard } from "@/components/VehicleCard";
import { PurchaseModal } from "@/components/PurchaseModal";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePurchases } from "@/hooks/usePurchases";
import level1Image from "@/assets/level1-sports-car.png";
import level2Image from "@/assets/level2-yacht.jpeg";
import level3Image from "@/assets/level3-helicopter.webp";
import level4Image from "@/assets/level4-jet.webp";
import level5Image from "@/assets/level5-mansion.png";
import dollarGold from "@/assets/dollar-gold.png";

const vehicles = [
  { id: 1, name: "Sports Car", price: "€100", image: level1Image, level: 1 },
  { id: 2, name: "Yacht", price: "€200", image: level2Image, level: 2 },
  { id: 3, name: "Helicopter", price: "€300", image: level3Image, level: 3 },
  { id: 4, name: "Private Jet", price: "€400", image: level4Image, level: 4 },
  { id: 5, name: "Luxury Mansion", price: "€500", image: level5Image, level: 5 },
];

const Garage = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<typeof vehicles[0] | null>(null);
  const navigate = useNavigate();
  const { isPurchased, purchaseLevel } = usePurchases();

  const handlePurchase = () => {
    if (selectedVehicle) {
      purchaseLevel(selectedVehicle.level);
      navigate(`/vehicle/${selectedVehicle.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark p-8 relative overflow-hidden">
      {/* Floating dollar pattern background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <img
            key={i}
            src={dollarGold}
            alt=""
            className="absolute opacity-10 animate-pulse"
            style={{
              width: `${60 + (i % 3) * 30}px`,
              left: `${(i % 4) * 25 + 5}%`,
              top: `${Math.floor(i / 4) * 35 + 10}%`,
              transform: `rotate(${(i * 15) - 20}deg)`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${3 + (i % 2)}s`,
            }}
          />
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
              onClick={() => setSelectedVehicle(vehicle)}
              isPurchased={isPurchased(vehicle.level)}
            />
          ))}
        </div>
      </div>

      {selectedVehicle && (
        <PurchaseModal
          open={!!selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
          onPurchase={handlePurchase}
          vehicleName={selectedVehicle.name}
          price={selectedVehicle.price}
          purchaseText="Do you want to purchase this vehicle"
          forText="for"
          acquireText="Yes, Buy"
          cancelText="No, Go Back"
        />
      )}
    </div>
  );
};

export default Garage;
