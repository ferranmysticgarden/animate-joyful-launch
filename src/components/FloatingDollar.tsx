import { DollarSign, Gem, Crown, Star, Zap, Sparkles } from "lucide-react";

interface FloatingDollarProps {
  delay?: number;
  duration?: number;
  size?: number;
}

const icons = [DollarSign, Gem, Crown, Star, Zap, Sparkles];

export const FloatingDollar = ({ delay = 0, duration = 3, size = 48 }: FloatingDollarProps) => {
  const Icon = icons[Math.floor(Math.random() * icons.length)];
  const colors = ['text-primary', 'text-secondary', 'text-accent'];
  const colorClass = colors[Math.floor(Math.random() * colors.length)];
  
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
      <Icon 
        size={size} 
        className={`${colorClass} drop-shadow-[0_0_20px_currentColor] animate-pulse-gold`}
        style={{ animationDelay: `${delay * 0.5}s` }}
      />
    </div>
  );
};
