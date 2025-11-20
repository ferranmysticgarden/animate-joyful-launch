import { Button } from "@/components/ui/button";
import { Confetti } from "@/components/Confetti";
import { useState, useEffect } from "react";

interface VehicleDisplayProps {
  image: string;
  onBack: () => void;
  backText: string;
}

const VehicleDisplay = ({ image, onBack, backText }: VehicleDisplayProps) => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-dark flex flex-col items-center justify-center p-8 relative">
      <Confetti show={showConfetti} />
      
      <div className="animate-spin-slow">
        <img
          src={image}
          alt="Vehicle"
          className="w-[80vw] h-[80vh] object-contain drop-shadow-mega"
        />
      </div>

      <Button
        onClick={onBack}
        size="lg"
        className="mt-12 px-12 py-6 text-2xl font-bold bg-gradient-gold text-primary-foreground shadow-gold"
      >
        {backText}
      </Button>
    </div>
  );
};

export default VehicleDisplay;
