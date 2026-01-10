import dollar3d from "@/assets/dollar-3d.png";

export const DollarSymbol = () => {
  return (
    <div className="relative inline-block">
      {/* Glow effect background */}
      <div 
        className="absolute inset-0 blur-3xl opacity-60 animate-pulse-gold" 
        style={{ 
          background: 'radial-gradient(circle, rgba(255,215,0,0.6) 0%, transparent 70%)',
          filter: 'blur(80px)', 
          transform: 'scale(2)' 
        }} 
      />
      
      {/* Dollar symbol 3D image */}
      <img 
        src={dollar3d}
        alt="Dollar"
        className="relative z-10 w-48 h-auto md:w-64 lg:w-72"
        style={{
          filter: 'drop-shadow(0 0 40px rgba(255, 215, 0, 0.8)) drop-shadow(0 0 80px rgba(255, 215, 0, 0.5))',
        }}
      />
    </div>
  );
};
