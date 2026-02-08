import { useEffect, useState, useCallback } from "react";
import applauseSound from "@/assets/purchase-applause.mp3";

interface CelebrationPiece {
  id: number;
  left: number;
  color: string;
  delay: number;
  size: number;
  shape: "circle" | "square" | "star" | "streamer";
  rotation: number;
}

// Play real applause audio file
const playApplause = () => {
  try {
    const audio = new Audio(applauseSound);
    audio.volume = 0.7;
    audio.play().catch(() => {});
  } catch (e) {
    console.warn("Applause audio failed", e);
  }
};

// Firework/cracker pop sounds — short, punchy bursts
const playFireworks = (ctx: AudioContext) => {
  const popTimes = [0, 0.3, 0.5, 0.9, 1.2, 1.6, 2.0, 2.5, 3.0, 3.4];
  popTimes.forEach((t) => {
    // Each pop = short noise burst + resonant click
    const bufLen = Math.floor(ctx.sampleRate * 0.12);
    const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) {
      const env = Math.exp(-(i / ctx.sampleRate) * 40);
      data[i] = (Math.random() * 2 - 1) * env;
    }
    const src = ctx.createBufferSource();
    src.buffer = buf;

    const filter = ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 1000 + Math.random() * 3000;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.4 + Math.random() * 0.3, ctx.currentTime + t);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.12);

    src.connect(filter).connect(gain).connect(ctx.destination);
    src.start(ctx.currentTime + t);
  });
};

// Party whistle sounds — ascending pitch sweeps
const playWhistles = (ctx: AudioContext) => {
  const whistleTimes = [0.6, 1.8, 2.8];
  whistleTimes.forEach((t) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    
    const startFreq = 800 + Math.random() * 400;
    const endFreq = startFreq + 800 + Math.random() * 600;
    
    osc.frequency.setValueAtTime(startFreq, ctx.currentTime + t);
    osc.frequency.linearRampToValueAtTime(endFreq, ctx.currentTime + t + 0.4);
    osc.frequency.linearRampToValueAtTime(startFreq + 200, ctx.currentTime + t + 0.7);
    
    // Add vibrato for realism
    const vibrato = ctx.createOscillator();
    const vibratoGain = ctx.createGain();
    vibrato.frequency.value = 15;
    vibratoGain.gain.value = 30;
    vibrato.connect(vibratoGain).connect(osc.frequency);
    vibrato.start(ctx.currentTime + t);
    vibrato.stop(ctx.currentTime + t + 0.8);
    
    gain.gain.setValueAtTime(0, ctx.currentTime + t);
    gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + t + 0.05);
    gain.gain.setValueAtTime(0.15, ctx.currentTime + t + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.8);
    
    osc.connect(gain).connect(ctx.destination);
    osc.start(ctx.currentTime + t);
    osc.stop(ctx.currentTime + t + 0.9);
  });
};

// Champagne cork pop — deep thump + high fizz
const playChampagnePop = (ctx: AudioContext) => {
  // Deep thump
  const thump = ctx.createOscillator();
  const thumpGain = ctx.createGain();
  thump.frequency.setValueAtTime(150, ctx.currentTime);
  thump.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.15);
  thumpGain.gain.setValueAtTime(0.5, ctx.currentTime);
  thumpGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
  thump.connect(thumpGain).connect(ctx.destination);
  thump.start();
  thump.stop(ctx.currentTime + 0.25);

  // Fizz noise
  const fizzLen = Math.floor(ctx.sampleRate * 2);
  const fizzBuf = ctx.createBuffer(1, fizzLen, ctx.sampleRate);
  const fizzData = fizzBuf.getChannelData(0);
  for (let i = 0; i < fizzLen; i++) {
    const env = Math.exp(-(i / ctx.sampleRate) * 2);
    fizzData[i] = (Math.random() * 2 - 1) * env * 0.08;
  }
  const fizzSrc = ctx.createBufferSource();
  fizzSrc.buffer = fizzBuf;
  const hpf = ctx.createBiquadFilter();
  hpf.type = "highpass";
  hpf.frequency.value = 6000;
  fizzSrc.connect(hpf).connect(ctx.destination);
  fizzSrc.start(ctx.currentTime + 0.05);
};

// Main celebration sound — combines all effects
export const playCelebrationSound = () => {
  try {
    // 1. Real applause audio
    playApplause();

    // 2. Procedural effects layered on top
    const ctx = new AudioContext();
    playChampagnePop(ctx);
    playFireworks(ctx);
    playWhistles(ctx);
  } catch (e) {
    console.warn("Celebration audio error", e);
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
