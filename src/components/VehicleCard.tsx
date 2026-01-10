import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Diamond, Check } from "lucide-react";

interface VehicleCardProps {
  name: string;
  image: string;
  level: number;
  onView?: () => void;
  onBuy?: () => void;
  isPurchased?: boolean;
}

export const VehicleCard = ({
  name,
  image,
  level,
  onView,
  onBuy,
  isPurchased = false,
}: VehicleCardProps) => {
  const isClickable = typeof onView === "function";

  return (
    <Card
      onClick={onView}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={(e) => {
        if (!isClickable) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onView?.();
        }
      }}
      className={`group p-6 bg-card/80 backdrop-blur-sm transition-all duration-300 ${
        isPurchased
          ? "border-green-500/50 opacity-80 cursor-pointer hover:opacity-100"
          : "cursor-pointer border-primary/20 hover:border-primary/60 hover:shadow-gold hover:scale-[1.02]"
      }`}
    >
      <div className="flex items-center gap-6">
        <div
          className="relative w-36 h-36 rounded-xl overflow-hidden flex-shrink-0"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)",
            boxShadow:
              "inset 0 0 40px rgba(255, 215, 0, 0.1), 0 4px 20px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <img src={image} alt={name} className="w-full h-full object-cover relative z-10" />
          {isPurchased && (
            <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center z-20">
              <Check className="w-16 h-16 text-green-400" strokeWidth={3} />
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <h3
            className="text-3xl font-extrabold text-primary tracking-wide uppercase"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              textShadow: "0 0 20px rgba(255, 215, 0, 0.3)",
            }}
          >
            {name}
          </h3>
          <div className="flex gap-1 mt-2">
            {Array.from({ length: level }).map((_, i) => (
              <Diamond key={i} className="w-5 h-5 text-level fill-level" />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          {onView && (
            <Button
              variant="outline"
              size="sm"
              className="border-primary/30 hover:border-primary"
              onClick={(e) => {
                e.stopPropagation();
                onView?.();
              }}
            >
              VER
            </Button>
          )}

          {isPurchased ? (
            <div
              className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-700 text-white font-bold text-xs shadow-lg flex items-center justify-center border-4 border-green-400/50"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
              aria-label="Owned"
            >
              OWNED
            </div>
          ) : (
            <button
              className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-red-700 hover:from-red-400 hover:to-red-600 text-white font-bold text-lg shadow-lg hover:shadow-red-500/50 transition-all duration-300 hover:scale-110 flex items-center justify-center border-4 border-red-400/50"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
              onClick={(e) => {
                e.stopPropagation();
                (onBuy ?? onView)?.();
              }}
            >
              BUY
            </button>
          )}
        </div>
      </div>
    </Card>
  );
};

