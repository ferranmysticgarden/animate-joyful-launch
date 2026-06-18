import { useEffect, useRef, useState } from "react";
import { Card } from "./ui/card";
import { Diamond, Check, Crown, Sparkles } from "lucide-react";

interface EliteVehicleCardProps {
  name: string;
  image: string;
  level: number;
  price: string;
  description: string;
  onView?: () => void;
  onBuy?: () => void;
  isPurchased?: boolean;
  isNew?: boolean;
}

export const EliteVehicleCard = ({
  name,
  image,
  level,
  price,
  description,
  onView,
  onBuy,
  isPurchased = false,
  isNew = false,
}: EliteVehicleCardProps) => {
  const isClickable = typeof onView === "function";
  const prevPurchased = useRef(isPurchased);
  const [justUnlocked, setJustUnlocked] = useState(false);

  useEffect(() => {
    if (!prevPurchased.current && isPurchased) {
      setJustUnlocked(true);
      const t = setTimeout(() => setJustUnlocked(false), 1000);
      return () => clearTimeout(t);
    }
    prevPurchased.current = isPurchased;
  }, [isPurchased]);

  return (
    <Card
      onClick={onView}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={(e) => {
        if (!isClickable) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onView?.();
        }
      }}
      className={`group relative p-8 backdrop-blur-sm transition-all duration-500 overflow-hidden ${
        isPurchased
          ? "border-2 border-green-500/50 cursor-pointer"
          : "cursor-pointer border-2 border-primary/40 hover:border-primary hover:scale-[1.01]"
      }`}
      style={{
        background: "linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(30,20,0,0.9) 50%, rgba(0,0,0,0.95) 100%)",
        boxShadow: isPurchased 
          ? "0 0 40px rgba(34, 197, 94, 0.4), inset 0 0 60px rgba(34, 197, 94, 0.1)"
          : "0 0 60px rgba(255, 215, 0, 0.4), 0 0 120px rgba(255, 215, 0, 0.2), inset 0 0 60px rgba(255, 215, 0, 0.05)",
      }}
    >
      {/* Animated glow border effect */}
      <div 
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,215,0,0.3), transparent)",
          animation: "shimmer 3s ease-in-out infinite",
        }}
      />

      {/* Crown badge - above content, in flow */}
      <div className="relative z-30 flex items-center gap-2 mb-4">
        <div 
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/50"
          style={{
            background: "linear-gradient(135deg, rgba(255,215,0,0.3), rgba(255,140,0,0.3))",
            boxShadow: "0 0 15px rgba(255, 215, 0, 0.4)",
          }}
        >
          <Crown className="w-4 h-4 text-primary" />
          <span 
            className="text-xs font-black text-primary uppercase tracking-wider"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            ELITE
          </span>
        </div>
        {isNew && !isPurchased && (
          <div 
            className="flex items-center gap-1 px-2 py-1.5 rounded-full border border-red-500/50 animate-pulse"
            style={{
              background: "linear-gradient(135deg, rgba(239,68,68,0.3), rgba(220,38,38,0.3))",
              boxShadow: "0 0 10px rgba(239, 68, 68, 0.5)",
            }}
          >
            <Sparkles className="w-3 h-3 text-red-400" />
            <span 
              className="text-xs font-black text-red-400 uppercase tracking-wider"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              NEW!
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-8 relative z-10">
        {/* Image container with special glow */}
        <div
          className={`relative w-44 h-44 rounded-2xl overflow-hidden flex-shrink-0 ${justUnlocked ? "animate-unlock-color" : ""}`}
          style={{
            boxShadow: "0 0 40px rgba(255, 215, 0, 0.5), inset 0 0 40px rgba(255, 215, 0, 0.1)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
          
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover relative z-10 transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />

          {isPurchased && (
            <div className="absolute inset-0 bg-green-500/30 flex items-center justify-center z-20">
              <Check className="w-20 h-20 text-green-400" strokeWidth={3} />
            </div>
          )}

          {/* Sparkle effects */}
          <Sparkles className="absolute top-2 left-2 w-6 h-6 text-primary animate-pulse z-20" />
          <Sparkles className="absolute bottom-2 right-2 w-4 h-4 text-primary animate-pulse z-20" style={{ animationDelay: "0.5s" }} />
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <h3
            className="text-3xl md:text-4xl font-black text-primary tracking-wider uppercase mb-2"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              textShadow: "0 0 30px rgba(255, 215, 0, 0.6)",
            }}
          >
            {name}
          </h3>
          
          <p 
            className="text-lg text-muted-foreground/80 italic mb-4"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            "{description}"
          </p>

          <div className="flex gap-1 mb-2">
            {Array.from({ length: Math.min(level, 9) }).map((_, i) => (
              <Diamond 
                key={i} 
                className="w-5 h-5 text-primary fill-primary animate-pulse" 
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span
              className="text-3xl font-black text-primary"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                textShadow: "0 0 20px rgba(255, 215, 0, 0.5)",
              }}
            >
              {price}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          {isPurchased ? (
            <div
              className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-green-700 text-white font-bold text-sm shadow-lg flex items-center justify-center border-4 border-green-400/50"
              style={{ 
                fontFamily: "'Orbitron', sans-serif",
                boxShadow: "0 0 30px rgba(34, 197, 94, 0.5)"
              }}
              aria-label="Owned"
            >
              OWNED
            </div>
          ) : (
            <button
              className="w-24 h-24 rounded-full text-white font-black text-lg shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center border-4 border-primary/50"
              style={{ 
                fontFamily: "'Orbitron', sans-serif",
                background: "linear-gradient(135deg, #FFD700, #FFA500, #FF6B6B)",
                boxShadow: "0 0 40px rgba(255, 215, 0, 0.6), 0 0 80px rgba(255, 140, 0, 0.4)",
                animation: "pulse-gold 1.5s ease-in-out infinite",
              }}
              onClick={(e) => {
                e.stopPropagation();
                onBuy?.();
              }}
            >
              BUY
            </button>
          )}
        </div>
      </div>
    </Card>
  );
};
