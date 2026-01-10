interface FloatingDollarProps {
  delay?: number;
  duration?: number;
  size?: number;
}

export const FloatingDollar = ({ delay = 0, duration = 3, size = 48 }: FloatingDollarProps) => {
  return (
    <div
      className="absolute animate-float-slow opacity-40"
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
    >
      <span 
        className="font-black animate-pulse-gold drop-shadow-[0_0_15px_rgba(255,215,0,0.6)]"
        style={{ 
          fontSize: `${size}px`,
          background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          animationDelay: `${delay * 0.5}s`,
        }}
      >
        $
      </span>
    </div>
  );
};