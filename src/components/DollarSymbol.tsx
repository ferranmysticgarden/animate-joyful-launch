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
      
      {/* Dollar symbol - pure CSS */}
      <span 
        className="relative z-10 text-[12rem] md:text-[16rem] lg:text-[18rem] font-black leading-none"
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
  );
};
