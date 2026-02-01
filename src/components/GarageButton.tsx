import { Button } from "./ui/button";

interface GarageButtonProps {
  onClick: () => void;
  text?: string;
}

export const GarageButton = ({ onClick, text = "START" }: GarageButtonProps) => {
  return (
    <div className="py-10 flex justify-center">
      <Button
        onClick={onClick}
        className="w-40 h-40 md:w-48 md:h-48 bg-black hover:bg-black/90 hover:scale-105 transition-all duration-300 rounded-full border-4 border-primary relative overflow-visible"
        style={{
          boxShadow:
            "0 0 40px hsl(var(--primary) / 0.5), 0 0 80px hsl(var(--primary) / 0.3), inset 0 0 30px hsl(var(--primary) / 0.2)",
        }}
      >
        {/* Inner gold circle */}
        <div 
          className="absolute inset-3 rounded-full border-2 border-primary/60"
          style={{
            boxShadow: "inset 0 0 20px hsl(var(--primary) / 0.3)",
          }}
        />
        
        {/* Text with diamonds */}
        <span 
          className="relative z-10 flex items-center justify-center gap-2 text-primary drop-shadow-[0_0_15px_hsl(var(--primary))]"
          style={{ 
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "1.8rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
          }}
        >
          <span className="text-xl">💎</span>
          <span>start</span>
          <span className="text-xl">💎</span>
        </span>
      </Button>
    </div>
  );
};
