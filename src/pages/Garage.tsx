import { useEffect, useState } from "react";
import { VehicleCard } from "@/components/VehicleCard";
import { EliteVehicleCard } from "@/components/EliteVehicleCard";
import { PurchaseModal } from "@/components/PurchaseModal";
import { EpicCelebration, playCelebrationSound } from "@/components/EpicCelebration";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw, PartyPopper } from "lucide-react";
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
import { BonusUnlockBanner } from "@/components/BonusUnlockBanner";
import { StatusChallenge } from "@/components/StatusChallenge";

type Vehicle = {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  priceValue: number;
  image: string;
  level: number;
  description?: string;
  isElite?: boolean;
};

const allVehicles: Vehicle[] = [
  { id: 1, name: "Sports Car", price: "€100", originalPrice: "€150", priceValue: 100, image: level1Image, level: 1 },
  { id: 2, name: "Yacht", price: "€200", originalPrice: "€280", priceValue: 200, image: level2Image, level: 2 },
  { id: 3, name: "Helicopter", price: "€300", originalPrice: "€400", priceValue: 300, image: level3Image, level: 3 },
  { id: 4, name: "Private Jet", price: "€400", originalPrice: "€550", priceValue: 400, image: level4Image, level: 4 },
  { id: 5, name: "Luxury Mansion", price: "€500", originalPrice: "€700", priceValue: 500, image: level5Image, level: 5 },
  { id: 6, name: "Luxury Island", price: "€1,000", originalPrice: "€1,500", priceValue: 1000, image: luxuryIslandImage, level: 6 },
  { 
    id: 7, name: "Private Archipelago", price: "€5,000", originalPrice: "€7,500", priceValue: 5000,
    image: level7Image, level: 7,
    description: "Not one island. A private archipelago. Multiple exclusive islands under your absolute control.",
    isElite: true
  },
  { 
    id: 8, name: "Orbital Space Station", price: "€10,000", originalPrice: "€15,000", priceValue: 10000,
    image: level8Image, level: 8,
    description: "El lujo definitivo ya no está en la Tierra.",
    isElite: true
  },
  { 
    id: 9, name: "Own a Planet", price: "€50,000", originalPrice: "€75,000", priceValue: 50000,
    image: level9Image, level: 9,
    description: "No posees cosas. Posees mundos.",
    isElite: true
  },
];

const Garage = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isPurchased, purchaseLevel } = usePurchases();
  const { isLoading, isNative, isLoggedIn, handlePurchase } = usePurchaseHandler();
  const { restorePurchases } = useGooglePlayBilling();

  const vehicles = allVehicles;
  const regularVehicles = vehicles.filter(v => !v.isElite);
  const eliteVehicles = vehicles.filter(v => v.isElite);
  const regularPurchasedCount = regularVehicles.filter(v => isPurchased(v.level)).length;
  const allRegularPurchased = regularPurchasedCount >= 6;

  useEffect(() => {
    const buyParam = searchParams.get("buy");
    if (!buyParam) return;
    const numeric = Number(buyParam);
    const target = vehicles.find((v) => v.level === numeric);
    if (target) setSelectedVehicle(target);
    setSearchParams({}, { replace: true });
  }, [searchParams, setSearchParams, vehicles]);

  const onPurchaseClick = async () => {
    if (!selectedVehicle) return;
    
    const success = await handlePurchase(selectedVehicle);
    if (success) {
      purchaseLevel(selectedVehicle.level);
      setSelectedVehicle(null);
      playCelebrationSound();
      setShowCelebration(true);
    }
  };

  const handleBuyClick = (vehicle: Vehicle) => {
    if (!isLoggedIn && !isNative) {
      toast.error("Sign in first to purchase!", {
        action: {
          label: "Sign In",
          onClick: () => navigate("/auth"),
        },
      });
      return;
    }
    setSelectedVehicle(vehicle);
  };

  const handleRestore = async () => {
    await restorePurchases();
    toast.success("Purchases restored!");
  };

  return (
    <div className="min-h-screen bg-gradient-dark p-8 relative overflow-hidden">
      {/* Celebration overlay */}
      <EpicCelebration show={showCelebration} onComplete={() => setShowCelebration(false)} />

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
            <FloatingDollar delay={i * 0.3} duration={3 + (i % 2)} size={60 + (i % 3) * 30} />
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

          <div className="flex gap-2">
            {/* Preview celebration button */}
            <Button
              onClick={() => {
                playCelebrationSound();
                setShowCelebration(true);
              }}
              variant="ghost"
              className="text-primary hover:text-primary/80"
              title="Preview celebration"
            >
              <PartyPopper className="mr-2 h-4 w-4" />
              🎉 Preview
            </Button>

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
        </div>

        <h1
          className="text-6xl font-bold text-center text-primary mb-6 tracking-wide"
          style={{
            fontFamily: "'Brush Script MT', 'Segoe Script', cursive",
            textShadow: "0 0 30px rgba(255, 215, 0, 0.5)",
          }}
        >
          Luxury Level
        </h1>

        <StatusChallenge purchasedCount={regularPurchasedCount} />

        {/* Regular Vehicles (Levels 1-6) */}
        <div className="space-y-6">
          {regularVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              name={vehicle.name}
              image={vehicle.image}
              level={vehicle.level}
              price={vehicle.price}
              originalPrice={vehicle.originalPrice}
              onView={() => navigate(`/vehicle/${vehicle.level}`)}
              onBuy={() => handleBuyClick(vehicle)}
              isPurchased={isPurchased(vehicle.level)}
              isNew={vehicle.level === 6 && !isPurchased(6)}
            />
          ))}
        </div>

        {/* BONUS UNLOCK BANNER */}
        <BonusUnlockBanner purchasedCount={regularPurchasedCount} totalRequired={6} />

        {/* ELITE TIER separator */}
        {allRegularPurchased && eliteVehicles.length > 0 && (
          <div className="my-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-primary/40" 
                style={{ boxShadow: "0 0 20px rgba(255, 215, 0, 0.5)" }}
              />
            </div>
            <div className="relative flex justify-center">
              <span 
                className="bg-background px-8 py-3 text-2xl font-black text-primary uppercase tracking-[0.3em]"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  textShadow: "0 0 30px rgba(255, 215, 0, 0.8)",
                }}
              >
                ⚜️ ELITE TIER ⚜️
              </span>
            </div>
          </div>
        )}

        {/* Elite Vehicles (Levels 7-9) */}
        {allRegularPurchased && (
          <div className="space-y-8">
            {eliteVehicles.map((vehicle) => (
              <EliteVehicleCard
                key={vehicle.id}
                name={vehicle.name}
                image={vehicle.image}
                level={vehicle.level}
                price={vehicle.price}
                originalPrice={vehicle.originalPrice}
                description={vehicle.description || ""}
                onView={() => navigate(`/vehicle/${vehicle.level}`)}
                onBuy={() => handleBuyClick(vehicle)}
                isPurchased={isPurchased(vehicle.level)}
                isNew={vehicle.level >= 7}
              />
            ))}
          </div>
        )}

        {/* Charity Disclaimer */}
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
          email=""
          onEmailChange={() => {}}
          onPurchase={onPurchaseClick}
          isLoading={isLoading}
          showEmailInput={false}
        />
      )}
    </div>
  );
};

export default Garage;
