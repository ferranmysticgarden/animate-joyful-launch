import dollar3d from "@/assets/dollar-3d.png";

interface FloatingDollarProps {
  delay?: number;
  duration?: number;
  size?: number;
}

export const FloatingDollar = ({ delay = 0, duration = 3, size = 48 }: FloatingDollarProps) => {
  return (
    <div
      className="absolute animate-float-slow opacity-50"
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
    >
      <img 
        src={dollar3d}
        alt=""
        className="animate-pulse-gold"
        style={{ 
          width: `${size}px`,
          height: 'auto',
          filter: 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.6))',
          animationDelay: `${delay * 0.5}s`,
        }}
      />
    </div>
  );
};
