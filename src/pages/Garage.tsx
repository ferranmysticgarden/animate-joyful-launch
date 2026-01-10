import { useState } from "react";
import { VehicleCard } from "@/components/VehicleCard";
import { PurchaseModal } from "@/components/PurchaseModal";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import level1Image from "@/assets/level1-sports-car.png";
import level2Image from "@/assets/level2-yacht.jpeg";
import level3Image from "@/assets/level3-helicopter.webp";
import level4Image from "@/assets/level4-jet.webp";
import level5Image from "@/assets/level5-mansion.png";

const vehicles = [
  { id: 1, name: "Sports Car", price: "€100", image: level1Image },
  { id: 2, name: "Yacht", price: "€200", image: level2Image },
  { id: 3, name: "Helicopter", price: "€300", image: level3Image },
  { id: 4, name: "Private Jet", price: "€400", image: level4Image },
  { id: 5, name: "Luxury Mansion", price: "€500", image: level5Image },
];

const Garage = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<typeof vehicles[0] | null>(null);
  const navigate = useNavigate();

  const handlePurchase = () => {
    if (selectedVehicle) {
      navigate(`/vehicle/${selectedVehicle.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark p-8">
      <div className="max-w-4xl mx-auto">
        <Button
          onClick={() => navigate("/")}
          variant="outline"
          className="mb-8 border-primary/30 hover:border-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <h1 className="text-5xl font-bold text-center text-primary mb-12 animate-shimmer tracking-wide" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          GARAGE
        </h1>

        <div className="space-y-6">
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              name={vehicle.name}
              price={vehicle.price}
              image={vehicle.image}
              onClick={() => setSelectedVehicle(vehicle)}
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
