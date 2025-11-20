export const DollarSymbol = () => {
  return (
    <div className="relative inline-block">
      {/* Glow effect background */}
      <div className="absolute inset-0 blur-3xl opacity-60 bg-gradient-radial animate-pulse-gold" style={{ filter: 'blur(80px)', transform: 'scale(1.5)' }} />
      
      {/* Dollar symbol */}
      <div className="relative z-10 text-[20rem] md:text-[25rem] font-black leading-none">
        <span 
          className="inline-block bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text text-transparent"
          style={{
            textShadow: '0 0 40px rgba(255, 215, 0, 0.9), 0 0 80px rgba(255, 215, 0, 0.6), 0 10px 40px rgba(0, 0, 0, 0.5)',
            WebkitTextStroke: '4px rgba(255, 215, 0, 0.3)',
          }}
        >
          $
        </span>
      </div>
    </div>
  );
};
