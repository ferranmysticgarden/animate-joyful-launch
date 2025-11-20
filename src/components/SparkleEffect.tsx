import { Sparkles, Star, Gem, Zap } from "lucide-react";
import { useEffect, useState } from "react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  icon: React.ElementType;
  size: number;
  duration: number;
  delay: number;
}

export const SparkleEffect = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const icons = [Sparkles, Star, Gem, Zap];
    const newSparkles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      icon: icons[Math.floor(Math.random() * icons.length)],
      size: 16 + Math.random() * 24,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 2,
    }));
    setSparkles(newSparkles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {sparkles.map((sparkle) => {
        const Icon = sparkle.icon;
        return (
          <div
            key={sparkle.id}
            className="absolute animate-pulse-gold"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              animationDuration: `${sparkle.duration}s`,
              animationDelay: `${sparkle.delay}s`,
            }}
          >
            <Icon
              size={sparkle.size}
              className="text-primary drop-shadow-[0_0_10px_hsl(45,100%,55%)] animate-spin-slow"
              style={{ animationDuration: `${sparkle.duration * 2}s` }}
            />
          </div>
        );
      })}
    </div>
  );
};
