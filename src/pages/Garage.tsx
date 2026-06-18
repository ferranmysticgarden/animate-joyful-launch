import { useEffect, useState } from "react";
import { VehicleCard } from "@/components/VehicleCard";
import { EliteVehicleCard } from "@/components/EliteVehicleCard";
import { PurchaseModal } from "@/components/PurchaseModal";
import { LevelUnlockedOverlay } from "@/components/LevelUnlockedOverlay";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { usePurchases } from "@/hooks/usePurchases";
import { usePurchaseHandler } from "@/hooks/usePurchaseHandler";
import { useGooglePlayBilling } from "@/hooks/useGooglePlayBilling";
import { toast } from "sonner";
import level1Image from "@/assets/level1-sports-car.png";
import level2Image from "@/assets/level2-yacht.jpeg";
import level3Image from "@/assets/level3-helicopter.webp";
import level4Image from "@/assets/level4-jet.webp";
import level5Image from "@/assets/level5-mansion.png";
import luxuryIslandImage from "@/assets/luxury-island.webp";
import level7Image from "@/assets/level7-paradise-island.jpg";
import level8Image from "@/assets/level8-space-station.jpg";
import level9Image from "@/assets/level9-planet.jpg";
import { FloatingDollar } from "@/components/FloatingDollar";

type Vehicle = {
  id: number;
  name: string;
  price: string;
  priceValue: number;
  image: string;
  level: number;
  description?: string;
  isElite?: boolean;
};

const allVehicles: Vehicle[] = [
  { id: 1, name: "Sports Car", price: "€100", priceValue: 100, image: level1Image, level: 1 },
  { id: 2, name: "Yacht", price: "€500", priceValue: 500, image: level2Image, level: 2 },
  { id: 3, name: "Helicopter", price: "€1,000", priceValue: 1000, image: level3Image, level: 3 },
  { id: 4, name: "Private Jet", price: "€2,500", priceValue: 2500, image: level4Image, level: 4 },
  { id: 5, name: "Luxury Mansion", price: "€5,000", priceValue: 5000, image: level5Image, level: 5 },
  { id: 6, name: "Luxury Island", price: "€10,000", priceValue: 10000, image: luxuryIslandImage, level: 6 },
  {
    id: 7,
    name: "Private Paradise Island",
    price: "€50,000",
    priceValue: 50000,
    image: level7Image,
    level: 7,
    description: "Un lugar que no existe en los mapas. Solo para ti.",
    isElite: true
  },
  {
    id: 8,
    name: "Orbital Space Station",
    price: "€250,000",
    priceValue: 250000,
    image: level8Image,
    level: 8,
    description: "El lujo definitivo ya no está en la Tierra.",
    isElite: true
  },
  {
    id: 9,
    name: "Own a Planet",
    price: "€1,000,000",
    priceValue: 1000000,
    image: level9Image,
    level: 9,
    description: "No posees cosas. Posees mundos.",
    isElite: true
  },
];

const Garage = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [unlockedVehicle, setUnlockedVehicle] = useState<Vehicle | null>(null);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isPurchased } = usePurchases();
  const { email, setEmail, isLoading, isNative, handlePurchase } = usePurchaseHandler();
  const { restorePurchases } = useGooglePlayBilling();

  // SIEMPRE MOSTRAR TODOS LOS 9 NIVELES
  const vehicles = allVehicles;

  // Separar vehículos normales y elite
  const regularVehicles = vehicles.filter(v => !v.isElite);
  const eliteVehicles = vehicles.filter(v => v.isElite);

  useEffect(() => {
    const buyParam = searchParams.get("buy");
    if (!buyParam) return;

    const numeric = Number(buyParam);
    const target = vehicles.find((v) => v.level === numeric);

    if (target) {
      setSelectedVehicle(target);
    }

    setSearchParams({}, { replace: true });
  }, [searchParams, setSearchParams, vehicles]);

  const onPurchaseClick = async () => {
    if (!selectedVehicle) return;

    const purchased = selectedVehicle;
    const success = await handlePurchase(purchased);
    if (success) {
      setSelectedVehicle(null);
      // On native (Google Play), purchase completes in-app — show celebration here.
      // On web, Stripe redirects to /payment-success which shows its own overlay.
      if (isNative) {
        setUnlockedVehicle(purchased);
      }
    }
  };

  const handleRestore = async () => {
    await restorePurchases();
    toast.success("Purchases restored!");
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
              transform: `rotate(${i * 15 - 20}deg)`,
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
        <div className="flex justify-between items-center mb-8">
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="border-primary/30 hover:border-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>

          {/* Restore Purchases button - only on Android */}
          {isNative && (
            <Button
              onClick={handleRestore}
              variant="ghost"
              className="text-primary hover:text-primary/80"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Restore
            </Button>
          )}
        </div>

        <h1
          className="text-6xl font-bold text-center text-primary mb-12 tracking-wide"
          style={{
            fontFamily: "'Brush Script MT', 'Segoe Script', cursive",
            textShadow: "0 0 30px rgba(255, 215, 0, 0.5)",
          }}
        >
          Luxury Level
        </h1>

        {/* Vehículos Normales (Niveles 1-6) */}
        <div className="space-y-6">
          {regularVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              name={vehicle.name}
              image={vehicle.image}
              level={vehicle.level}
              price={vehicle.price}
              onView={() => navigate(`/vehicle/${vehicle.level}`)}
              onBuy={() => setSelectedVehicle(vehicle)}
              isPurchased={isPurchased(vehicle.level)}
              isNew={vehicle.level === 6 && !isPurchased(6)}
            />
          ))}
        </div>

        {/* Separador ELITE TIER */}
        {eliteVehicles.length > 0 && (
          <div className="my-16 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-primary/40" 
                style={{
                  boxShadow: "0 0 20px rgba(255, 215, 0, 0.5)"
                }}
              />
            </div>
            <div className="relative flex justify-center">
              <span 
                className="bg-background px-8 py-3 text-2xl font-black text-primary uppercase tracking-[0.3em]"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  textShadow: "0 0 30px rgba(255, 215, 0, 0.8)",
                  animation: "pulse-gold 2s ease-in-out infinite"
                }}
              >
                ⚜️ ELITE TIER ⚜️
              </span>
            </div>
          </div>
        )}

        {/* Vehículos Elite (Niveles 7-9) */}
        <div className="space-y-8">
          {eliteVehicles.map((vehicle) => (
            <EliteVehicleCard
              key={vehicle.id}
              name={vehicle.name}
              image={vehicle.image}
              level={vehicle.level}
              price={vehicle.price}
              description={vehicle.description || ""}
              onView={() => navigate(`/vehicle/${vehicle.level}`)}
              onBuy={() => setSelectedVehicle(vehicle)}
              isPurchased={isPurchased(vehicle.level)}
              isNew={vehicle.level >= 7}
            />
          ))}
        </div>

        {/* Charity Disclaimer - Subtle */}
        <div className="mt-16 pt-8 border-t border-primary/10">
          <p className="text-xs text-muted-foreground/50 text-center max-w-lg mx-auto">
            Luxury Life es un proyecto benéfico legal. Las compras representan productos de lujo simbólicos que contribuyen a causas reales.
          </p>
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
          onPurchase={onPurchaseClick}
          isLoading={isLoading}
          showEmailInput={!isNative && !email}
        />
      )}
    </div>
  );
};

export default Garage;
