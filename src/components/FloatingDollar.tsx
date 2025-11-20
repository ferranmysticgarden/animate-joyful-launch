import { DollarSign } from "lucide-react";

interface FloatingDollarProps {
  delay?: number;
  duration?: number;
  size?: number;
}

export const FloatingDollar = ({ delay = 0, duration = 3, size = 48 }: FloatingDollarProps) => {
  return (
    <div
      className="absolute animate-float-slow opacity-20"
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
    >
      <DollarSign size={size} className="text-primary drop-shadow-glow" />
    </div>
  );
};
