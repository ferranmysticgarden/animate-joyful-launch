import { useEffect } from "react";
import { Confetti } from "./Confetti";
import { Heart, Sparkles } from "lucide-react";

interface LevelUnlockedOverlayProps {
  level: number;
  vehicleName: string;
  priceValue: number;
  onComplete: () => void;
  durationMs?: number;
}

const playFanfare = () => {
  try {
    const AudioCtx =
      (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx: AudioContext = new AudioCtx();
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5 E5 G5 C6
    const now = ctx.currentTime;
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = freq;
      const start = now + i * 0.18;
      const end = start + 0.35;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.25, start + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, end);
      osc.connect(gain).connect(ctx.destination);
      osc.start(start);
      osc.stop(end + 0.05);
    });
    setTimeout(() => ctx.close().catch(() => {}), 2000);
  } catch {
    // ignore
  }
};

export const LevelUnlockedOverlay = ({
  level,
  vehicleName,
  priceValue,
  onComplete,
  durationMs = 3000,
}: LevelUnlockedOverlayProps) => {
  useEffect(() => {
    playFanfare();
    const t = setTimeout(onComplete, durationMs);
    return () => clearTimeout(t);
  }, [onComplete, durationMs]);

  // Donation per €100 — keeps message simple regardless of price tier
  const donationLine = "€70 de cada €100 van a UNICEF";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-live="assertive"
    >
      <Confetti show={true} />

      {/* radial gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,215,0,0.35) 0%, transparent 70%)",
          animation: "pulse-gold 1.5s ease-in-out infinite",
        }}
      />

      <div className="relative z-10 text-center px-6 animate-scale-in">
        <Sparkles
          className="w-16 h-16 mx-auto mb-4 text-primary animate-pulse"
          style={{ filter: "drop-shadow(0 0 20px rgba(255,215,0,0.8))" }}
        />
        <p
          className="text-2xl md:text-3xl font-black tracking-[0.3em] text-primary/80 uppercase mb-3"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          Level {level} Unlocked
        </p>
        <h1
          className="text-5xl md:text-7xl font-black text-primary uppercase tracking-wide mb-6"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            textShadow:
              "0 0 30px rgba(255,215,0,0.9), 0 0 60px rgba(255,165,0,0.6)",
          }}
        >
          {vehicleName}
        </h1>

        <div
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-primary/60"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,140,0,0.15))",
            boxShadow: "0 0 25px rgba(255,215,0,0.4)",
          }}
        >
          <Heart className="w-5 h-5 text-red-500 fill-red-500" />
          <span
            className="text-sm md:text-base font-bold text-primary"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            {donationLine}
          </span>
        </div>
      </div>
    </div>
  );
};
