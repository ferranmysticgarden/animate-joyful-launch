import { Button } from "@/components/ui/button";
import { Confetti } from "@/components/Confetti";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import applauseSound from "@/assets/purchase-applause.mp3";
import luxuryIslandImage from "@/assets/luxury-island.webp";
import { Diamond, Crown } from "lucide-react";

const BonusScreen = () => {
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

  const handleBuy = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    navigate("/garage?buy=6");
  };

  return (
    <div className="min-h-screen bg-gradient-dark flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      <Confetti show={showConfetti} />
      
      {/* Spectacular background effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0" 
          style={{
            background: 'radial-gradient(ellipse 100% 80% at 50% 30%, rgba(255, 215, 0, 0.25) 0%, transparent 50%), radial-gradient(ellipse 80% 100% at 50% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 60%)',
          }}
        />
      </div>
      
      <div className="relative z-10 flex flex-col items-center max-w-4xl w-full">
        {/* Title */}
        <div className="flex items-center gap-3 mb-4">
          <Crown className="w-10 h-10 text-gold animate-pulse" />
          <h1 
            className="text-3xl md:text-5xl font-bold text-center"
            style={{
              fontFamily: "'Brush Script MT', 'Segoe Script', cursive",
              background: 'linear-gradient(135deg, #FFD700, #FFA500, #FFD700)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 30px rgba(255, 215, 0, 0.5)',
            }}
          >
            ¡BONUS SECRETO!
          </h1>
          <Crown className="w-10 h-10 text-gold animate-pulse" />
        </div>

        <h2 className="text-xl md:text-3xl text-gold font-bold mb-6 text-center font-orbitron">
          🎉 ¡Todos los niveles completados! 🎉
        </h2>

        {/* Luxury Island Image */}
        <div 
          className="rounded-3xl p-4 md:p-6 mb-6" 
          style={{
            background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.4) 70%), linear-gradient(135deg, rgba(26, 26, 26, 0.8) 0%, rgba(10, 10, 10, 0.9) 100%)',
            boxShadow: 'inset 0 0 80px rgba(255, 215, 0, 0.2), 0 10px 60px rgba(0, 0, 0, 0.8), 0 0 100px rgba(255, 215, 0, 0.3)',
          }}
        >
          <img
            src={luxuryIslandImage}
            alt="Luxury Island"
            className="w-full max-w-2xl h-auto object-contain rounded-2xl drop-shadow-mega"
          />
        </div>

        {/* Level indicator */}
        <div className="flex items-center gap-2 mb-4">
          {[...Array(6)].map((_, i) => (
            <Diamond key={i} className="w-6 h-6 text-gold fill-gold" />
          ))}
        </div>

        <h3 
          className="text-2xl md:text-4xl font-bold text-center mb-4"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            background: 'linear-gradient(135deg, #FFD700, #FFFFFF, #FFD700)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          LUXURY ISLAND
        </h3>

        <p className="text-lg md:text-xl text-center text-foreground/80 mb-6 px-4">
          ¿Quieres adquirir el nivel máximo con la compra de la <span className="text-gold font-bold">"Luxury Island"</span>?
        </p>

        {/* Price */}
        <div 
          className="text-3xl md:text-5xl font-bold mb-8"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            background: 'linear-gradient(135deg, #00FF00, #32CD32, #00FF00)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 20px rgba(0, 255, 0, 0.5)',
          }}
        >
          1.000 €
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <Button
            onClick={handleBuy}
            size="lg"
            className="px-12 py-6 text-xl md:text-2xl font-bold bg-gradient-gold text-primary-foreground shadow-gold animate-pulse"
          >
            ¡COMPRAR!
          </Button>

          <Button
            onClick={handleBack}
            size="lg"
            variant="outline"
            className="px-12 py-6 text-xl md:text-2xl font-bold border-gold/50 text-gold hover:bg-gold/10"
          >
            Volver al Garage
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BonusScreen;
