import { useEffect, useState, useCallback } from "react";

interface CelebrationPiece {
  id: number;
  left: number;
  color: string;
  delay: number;
  size: number;
  shape: "circle" | "square" | "star" | "streamer";
  rotation: number;
}

// Procedural celebration sound using Web Audio API
export const playCelebrationSound = () => {
  try {
    const ctx = new AudioContext();

    // Applause-like noise burst
    const applauseDuration = 3;
    const noiseBuffer = ctx.createBuffer(2, ctx.sampleRate * applauseDuration, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const data = noiseBuffer.getChannelData(ch);
      for (let i = 0; i < data.length; i++) {
        const t = i / ctx.sampleRate;
        const envelope = Math.exp(-t * 0.8) * (1 + 0.3 * Math.sin(t * 6));
        data[i] = (Math.random() * 2 - 1) * envelope * 0.15;
      }
    }
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.value = 3000;
    noiseFilter.Q.value = 0.5;
    noiseSource.connect(noiseFilter).connect(ctx.destination);
    noiseSource.start();

    // Champagne pop
    const popOsc = ctx.createOscillator();
    const popGain = ctx.createGain();
    popOsc.frequency.setValueAtTime(800, ctx.currentTime);
    popOsc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.15);
    popGain.gain.setValueAtTime(0.3, ctx.currentTime);
    popGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    popOsc.connect(popGain).connect(ctx.destination);
    popOsc.start();
    popOsc.stop(ctx.currentTime + 0.2);

    // Celebration chime melody
    const notes = [523, 659, 784, 1047, 784, 1047]; // C5-E5-G5-C6
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.15);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + i * 0.15 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.15 + 0.4);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.15);
      osc.stop(ctx.currentTime + i * 0.15 + 0.5);
    });

    // Whistle effect
    const whistleOsc = ctx.createOscillator();
    const whistleGain = ctx.createGain();
    whistleOsc.type = "sine";
    whistleOsc.frequency.setValueAtTime(1200, ctx.currentTime + 0.8);
    whistleOsc.frequency.linearRampToValueAtTime(2400, ctx.currentTime + 1.2);
    whistleOsc.frequency.linearRampToValueAtTime(1800, ctx.currentTime + 1.5);
    whistleGain.gain.setValueAtTime(0, ctx.currentTime + 0.8);
    whistleGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.9);
    whistleGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 1.3);
    whistleGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.6);
    whistleOsc.connect(whistleGain).connect(ctx.destination);
    whistleOsc.start(ctx.currentTime + 0.8);
    whistleOsc.stop(ctx.currentTime + 1.7);

  } catch (e) {
    console.warn("Audio not available", e);
  }
};

export const EpicCelebration = ({ show, onComplete }: { show: boolean; onComplete?: () => void }) => {
  const [pieces, setPieces] = useState<CelebrationPiece[]>([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [champagnePhase, setChampagnePhase] = useState(false);
  const [soundPlayed, setSoundPlayed] = useState(false);

  // Play sound on first render when show becomes true
  // We need a separate mechanism since useEffect loses user gesture context
  const triggerSound = useCallback(() => {
    if (!soundPlayed) {
      playCelebrationSound();
      setSoundPlayed(true);
    }
  }, [soundPlayed]);

  useEffect(() => {
    if (show) {
      const colors = [
        "#FFD700", "#FFA500", "#FF6B6B", "#A855F7",
        "#06B6D4", "#10B981", "#F59E0B", "#EC4899",
        "#FF1493", "#00FF7F", "#FFD700", "#FF4500",
      ];
      const shapes: CelebrationPiece["shape"][] = ["circle", "square", "star", "streamer"];

      const newPieces = Array.from({ length: 150 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 1.5,
        size: 4 + Math.random() * 12,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        rotation: Math.random() * 360,
      }));
      setPieces(newPieces);
      setShowOverlay(true);
      setChampagnePhase(true);

      const champTimer = setTimeout(() => setChampagnePhase(false), 2000);
      const endTimer = setTimeout(() => {
        setPieces([]);
        setShowOverlay(false);
        onComplete?.();
      }, 5000);

      return () => {
        clearTimeout(champTimer);
        clearTimeout(endTimer);
      };
    }
  }, [show, onComplete]);

  if (!show && !showOverlay) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[60]">
      {/* Golden flash */}
      {champagnePhase && (
        <div className="absolute inset-0 animate-celebration-flash" />
      )}

      {/* Champagne bottles */}
      {champagnePhase && (
        <>
          <div className="absolute bottom-0 left-[20%] animate-champagne-left text-6xl">
            🍾
          </div>
          <div className="absolute bottom-0 right-[20%] animate-champagne-right text-6xl">
            🍾
          </div>
          <div className="absolute top-[30%] left-1/2 -translate-x-1/2 animate-champagne-burst text-5xl">
            🥂
          </div>
        </>
      )}

      {/* Main confetti */}
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className={`absolute animate-celebration-fall ${
            piece.shape === "circle" ? "rounded-full" :
            piece.shape === "square" ? "rounded-sm" :
            piece.shape === "streamer" ? "rounded-full" : ""
          }`}
          style={{
            left: `${piece.left}%`,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            width: piece.shape === "streamer" ? `${piece.size * 0.3}px` : `${piece.size}px`,
            height: piece.shape === "streamer" ? `${piece.size * 3}px` : `${piece.size}px`,
            boxShadow: `0 0 ${piece.size}px ${piece.color}`,
            transform: `rotate(${piece.rotation}deg)`,
            clipPath: piece.shape === "star"
              ? "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
              : undefined,
          }}
        />
      ))}

      {/* Center celebration text */}
      {showOverlay && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-celebration-text text-center">
            <div
              className="text-5xl md:text-7xl font-black text-primary mb-2"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                textShadow: "0 0 40px rgba(255,215,0,0.8), 0 0 80px rgba(255,215,0,0.4)",
              }}
            >
              🎉 CONGRATULATIONS! 🎉
            </div>
            <div
              className="text-2xl md:text-3xl text-primary/80 font-bold"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                textShadow: "0 0 20px rgba(255,215,0,0.5)",
              }}
            >
              Welcome to the elite
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
