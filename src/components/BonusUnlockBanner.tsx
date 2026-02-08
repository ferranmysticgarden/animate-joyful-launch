import { Crown, Lock, Unlock, Sparkles, Trophy } from "lucide-react";

interface BonusUnlockBannerProps {
  purchasedCount: number;
  totalRequired: number;
}

export const BonusUnlockBanner = ({
  purchasedCount,
  totalRequired,
}: BonusUnlockBannerProps) => {
  const isUnlocked = purchasedCount >= totalRequired;
  const progress = Math.min((purchasedCount / totalRequired) * 100, 100);

  return (
    <div className="my-16 relative">
      {/* Container with animated border */}
      <div
        className="relative rounded-2xl overflow-hidden p-[2px]"
        style={{
          background: isUnlocked
            ? "linear-gradient(135deg, hsl(45 100% 50%), hsl(30 100% 50%), hsl(45 100% 50%))"
            : "linear-gradient(135deg, hsl(45 100% 50% / 0.6), hsl(280 80% 50% / 0.4), hsl(45 100% 50% / 0.6))",
          animation: "bonus-border-rotate 4s linear infinite",
          backgroundSize: "200% 200%",
        }}
      >
        <div
          className="rounded-2xl p-8 md:p-10"
          style={{
            background:
              "linear-gradient(135deg, hsl(0 0% 4%) 0%, hsl(280 30% 8%) 50%, hsl(0 0% 4%) 100%)",
          }}
        >
          {/* Top badge */}
          <div className="flex justify-center mb-6">
            <div
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full border"
              style={{
                borderColor: "hsl(45 100% 50% / 0.5)",
                background:
                  "linear-gradient(135deg, hsl(45 100% 50% / 0.15), hsl(280 80% 50% / 0.1))",
                boxShadow: "0 0 30px hsl(45 100% 50% / 0.3)",
              }}
            >
              <Trophy className="w-5 h-5 text-primary animate-pulse" />
              <span
                className="text-sm font-black text-primary uppercase tracking-[0.3em]"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                BONUS EXCLUSIVO
              </span>
              <Trophy className="w-5 h-5 text-primary animate-pulse" />
            </div>
          </div>

          {/* Main content */}
          <div className="text-center space-y-4">
            <h3
              className="text-2xl md:text-3xl font-black text-primary uppercase tracking-wider"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                textShadow: "0 0 30px hsl(45 100% 50% / 0.6)",
              }}
            >
              {isUnlocked ? "🔓 ELITE TIER DESBLOQUEADO" : "🔒 DESBLOQUEA EL ELITE TIER"}
            </h3>

            <p
              className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              {isUnlocked
                ? "Has demostrado tu nivel. El acceso Elite es tuyo."
                : "Completa los 6 primeros niveles y desbloquea 3 activos ELITE que pocos pueden permitirse."}
            </p>

            {/* Progress bar */}
            <div className="max-w-md mx-auto mt-6">
              <div className="flex justify-between text-xs text-muted-foreground mb-2"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                <span>{purchasedCount} / {totalRequired} completados</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div
                className="h-3 rounded-full overflow-hidden"
                style={{
                  background: "hsl(0 0% 15%)",
                  boxShadow: "inset 0 2px 4px hsl(0 0% 0% / 0.5)",
                }}
              >
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${progress}%`,
                    background: isUnlocked
                      ? "linear-gradient(90deg, hsl(120 70% 45%), hsl(120 80% 55%))"
                      : "linear-gradient(90deg, hsl(45 100% 50%), hsl(30 100% 50%), hsl(0 70% 60%))",
                    boxShadow: isUnlocked
                      ? "0 0 15px hsl(120 70% 50% / 0.6)"
                      : "0 0 15px hsl(45 100% 50% / 0.6)",
                  }}
                />
              </div>
            </div>

            {/* Elite items preview */}
            <div className="flex justify-center gap-4 mt-6">
              {[
                { name: "Archipelago", icon: "🏝️", price: "€5,000" },
                { name: "Space Station", icon: "🛸", price: "€10,000" },
                { name: "Planet", icon: "🪐", price: "€50,000" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="relative flex flex-col items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-300"
                  style={{
                    borderColor: isUnlocked
                      ? "hsl(45 100% 50% / 0.4)"
                      : "hsl(0 0% 25%)",
                    background: isUnlocked
                      ? "hsl(45 100% 50% / 0.05)"
                      : "hsl(0 0% 8%)",
                    opacity: isUnlocked ? 1 : 0.6,
                  }}
                >
                  {!isUnlocked && (
                    <Lock className="absolute top-1 right-1 w-3 h-3 text-muted-foreground/50" />
                  )}
                  <span className="text-2xl">{item.icon}</span>
                  <span
                    className="text-xs font-bold text-primary/80 uppercase"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    {item.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA message */}
            {!isUnlocked && (
              <div className="mt-6 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <p
                  className="text-sm text-primary/80 font-bold tracking-wide"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  {purchasedCount === 0
                    ? "Empieza tu camino al nivel más alto"
                    : purchasedCount < 3
                      ? "Vas por buen camino. Sigue subiendo."
                      : purchasedCount < 5
                        ? "Más de la mitad. Pocos llegan aquí."
                        : "Casi lo tienes. Un nivel más."}
                </p>
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
