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
    <div className="min-h-screen bg-gradient-dark flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <Confetti show={showConfetti} />
      
      {/* Spotlight background effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0" 
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 45%, rgba(255, 215, 0, 0.15) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 50% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
          }}
        />
      </div>
      
      <div className="relative z-10 flex flex-col items-center">
        <div 
          className="animate-spin-slow rounded-3xl p-8" 
          style={{
            background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.4) 70%), linear-gradient(135deg, rgba(26, 26, 26, 0.8) 0%, rgba(10, 10, 10, 0.9) 100%)',
            boxShadow: 'inset 0 0 80px rgba(255, 215, 0, 0.2), 0 10px 60px rgba(0, 0, 0, 0.8), 0 0 100px rgba(255, 215, 0, 0.3)',
          }}
        >
          <img
            src={image}
            alt="Vehicle"
            className="w-[70vw] h-[60vh] object-contain drop-shadow-mega"
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
    </div>
  );
};

export default VehicleDisplay;
