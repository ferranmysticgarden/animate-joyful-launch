import dollarGold from "@/assets/dollar-gold.png";

export const DollarSymbol = () => {
  return (
    <div className="relative inline-block">
      {/* Glow effect background */}
      <div 
        className="absolute inset-0 blur-3xl opacity-60 bg-gradient-radial animate-pulse-gold" 
        style={{ filter: 'blur(80px)', transform: 'scale(1.5)' }} 
      />
      
      {/* Dollar symbol - using CSS text for cleaner look without background issues */}
      <div className="relative z-10 text-[16rem] md:text-[20rem] font-black leading-none">
        <span 
          className="inline-block"
          style={{
            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 25%, #FFD700 50%, #DAA520 75%, #FFD700 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            textShadow: '0 0 60px rgba(255, 215, 0, 0.8), 0 0 120px rgba(255, 215, 0, 0.5)',
            WebkitTextStroke: '2px rgba(218, 165, 32, 0.5)',
            filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.5))',
          }}
        >
          $
        </span>
      </div>
    </div>
  );
};