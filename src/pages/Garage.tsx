import { useState } from "react";
import { VehicleCard } from "@/components/VehicleCard";
import { PurchaseModal } from "@/components/PurchaseModal";
import { Language } from "@/lib/i18n";
import { translations } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import carLevel1 from "@/assets/car-level1.png";
import carLevel2 from "@/assets/car-level2.png";
import carLevel3 from "@/assets/car-level3.png";
import carLevel4 from "@/assets/car-level4.png";
import carLevel5 from "@/assets/car-level5.png";

interface GarageProps {
  lang: Language;
}

const vehicles = [
  { id: 1, level: "level1", price: "100€", image: carLevel1 },
  { id: 2, level: "level2", price: "200€", image: carLevel2 },
  { id: 3, level: "level3", price: "300€", image: carLevel3 },
  { id: 4, level: "level4", price: "400€", image: carLevel4 },
  { id: 5, level: "level5", price: "500€", image: carLevel5 },
];

const Garage = ({ lang }: GarageProps) => {
  const [selectedVehicle, setSelectedVehicle] = useState<typeof vehicles[0] | null>(null);
  const navigate = useNavigate();
  const t = translations[lang];

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
          {t.backToGarage}
        </Button>

        <h1 className="text-5xl font-bold text-center text-primary mb-12 animate-shimmer">
          {t.garage}
        </h1>

        <div className="space-y-6">
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              name={t[vehicle.level as keyof typeof t] as string}
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
          vehicleName={t[selectedVehicle.level as keyof typeof t] as string}
          price={selectedVehicle.price}
          purchaseText={t.purchaseQuestion}
          forText={t.for}
          acquireText={t.acquire}
          cancelText={t.cancel}
        />
      )}
    </div>
  );
};

export default Garage;
