import dollarClean from "@/assets/dollar-clean.png";

export const DollarSymbol = () => {
  return (
    <div className="relative inline-block">
      {/* Glow effect background */}
      <div 
        className="absolute inset-0 blur-3xl opacity-60 bg-gradient-radial animate-pulse-gold" 
        style={{ filter: 'blur(80px)', transform: 'scale(1.5)' }} 
      />
      
      {/* Dollar symbol image */}
      <img 
        src={dollarClean}
        alt="Dollar"
        className="relative z-10 w-48 h-auto md:w-72 lg:w-80 drop-shadow-[0_0_60px_rgba(255,215,0,0.8)]"
        style={{
          filter: 'drop-shadow(0 0 40px rgba(255, 215, 0, 0.6)) drop-shadow(0 8px 16px rgba(0, 0, 0, 0.5))',
        }}
      />
    </div>
  );
};
