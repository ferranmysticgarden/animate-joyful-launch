import { Button } from "@/components/ui/button";
import { Confetti } from "@/components/Confetti";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import applauseSound from "@/assets/purchase-applause.mp3";
import luxuryIslandImage from "@/assets/luxury-island.webp";
import { Crown, Diamond } from "lucide-react";

const BonusVehicleDisplay = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    audioRef.current = new Audio(applauseSound);
    audioRef.current.loop = true;
    audioRef.current.play().catch(() => {});

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleBack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    navigate("/garage");
  };

  return (
    <div className="min-h-screen bg-gradient-dark flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <Confetti show={showConfetti} />
      
      {/* Ultra spectacular background */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0" 
          style={{
            background: 'radial-gradient(ellipse 100% 80% at 50% 40%, rgba(255, 215, 0, 0.3) 0%, transparent 50%), radial-gradient(ellipse 80% 100% at 50% 50%, rgba(168, 85, 247, 0.2) 0%, transparent 60%)',
          }}
        />
      </div>
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Crown header */}
        <div className="flex items-center gap-4 mb-6">
          <Crown className="w-12 h-12 text-gold animate-bounce" />
          <h1 
            className="text-4xl md:text-6xl font-bold"
            style={{
              fontFamily: "'Brush Script MT', 'Segoe Script', cursive",
              background: 'linear-gradient(135deg, #FFD700, #FFA500, #FFD700)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 40px rgba(255, 215, 0, 0.6)',
            }}
          >
            ¡NIVEL MÁXIMO!
          </h1>
          <Crown className="w-12 h-12 text-gold animate-bounce" />
        </div>

        {/* Diamond indicators */}
        <div className="flex items-center gap-2 mb-6">
          {[...Array(6)].map((_, i) => (
            <Diamond key={i} className="w-8 h-8 text-gold fill-gold animate-pulse" />
          ))}
        </div>

        <div 
          className="rounded-3xl p-8" 
          style={{
            background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.15) 0%, rgba(0, 0, 0, 0.5) 70%), linear-gradient(135deg, rgba(26, 26, 26, 0.9) 0%, rgba(10, 10, 10, 0.95) 100%)',
            boxShadow: 'inset 0 0 100px rgba(255, 215, 0, 0.3), 0 10px 80px rgba(0, 0, 0, 0.9), 0 0 150px rgba(255, 215, 0, 0.4)',
          }}
        >
          <img
            src={luxuryIslandImage}
            alt="Luxury Island"
            className="w-[70vw] h-[55vh] object-contain drop-shadow-mega"
          />
        </div>

        <h2 
          className="mt-6 text-3xl md:text-5xl font-bold"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            background: 'linear-gradient(135deg, #FFD700, #FFFFFF, #FFD700)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          LUXURY ISLAND
        </h2>

        <Button
          onClick={handleBack}
          size="lg"
          className="mt-8 px-12 py-6 text-2xl font-bold bg-gradient-gold text-primary-foreground shadow-gold"
        >
          Volver al Garage
        </Button>
      </div>
    </div>
  );
};

export default BonusVehicleDisplay;
