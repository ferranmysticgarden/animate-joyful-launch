import { Button } from "./ui/button";

interface GarageButtonProps {
  onClick: () => void;
  text?: string;
}

export const GarageButton = ({ onClick, text = "Start" }: GarageButtonProps) => {
  return (
    <div className="py-10 flex justify-center">
      <Button
        onClick={onClick}
        className="px-16 py-10 md:px-20 md:py-12 bg-black hover:bg-black/90 hover:scale-105 transition-all duration-300 rounded-[50%] border-2 border-primary/50 relative overflow-visible"
        style={{
          boxShadow:
            "0 0 40px hsl(var(--primary) / 0.4), 0 0 80px hsl(var(--primary) / 0.2), inset 0 0 40px rgba(0,0,0,0.8)",
          aspectRatio: "1.6 / 1",
        }}
      >
        {/* Inner glow ring */}
        <div 
          className="absolute inset-2 rounded-[50%] border border-primary/30"
          style={{
            boxShadow: "inset 0 0 25px hsl(var(--primary) / 0.15)",
          }}
        />
        
        {/* Golden 3D metallic text */}
        <span 
          className="relative z-10 flex items-center justify-center gap-3"
        >
          <span className="text-2xl md:text-3xl drop-shadow-lg">💎</span>
          <span 
            style={{ 
              fontFamily: "'Pinyon Script', cursive",
              fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
              fontWeight: 400,
              background: "linear-gradient(180deg, #f7e7a0 0%, #d4a528 25%, #a67c00 50%, #d4a528 75%, #f7e7a0 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              textShadow: "0 2px 4px rgba(0,0,0,0.5), 0 4px 8px rgba(0,0,0,0.3)",
              filter: "drop-shadow(0 0 10px rgba(212, 165, 40, 0.6)) drop-shadow(0 0 20px rgba(212, 165, 40, 0.3))",
              letterSpacing: "0.02em",
            }}
          >
            {text}
          </span>
          <span className="text-2xl md:text-3xl drop-shadow-lg">💎</span>
        </span>
      </Button>
    </div>
  );
};
