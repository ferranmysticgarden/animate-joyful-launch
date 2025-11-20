import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";

interface LuxuryButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const LuxuryButton = ({ onClick, children }: LuxuryButtonProps) => {
  return (
    <Button
      onClick={onClick}
      size="lg"
      className="group relative overflow-hidden bg-gradient-gold text-primary-foreground font-bold text-xl px-12 py-8 rounded-xl shadow-gold hover:shadow-glow transition-all duration-300 hover:scale-105"
    >
      <span className="relative z-10 flex items-center gap-3">
        <Sparkles className="animate-pulse-gold" />
        {children}
        <Sparkles className="animate-pulse-gold" />
      </span>
      <div className="absolute inset-0 bg-gradient-gold-radial animate-pulse-gold" />
    </Button>
  );
};
