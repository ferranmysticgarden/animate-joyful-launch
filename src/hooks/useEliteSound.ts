import { useCallback, useRef } from "react";

/**
 * Generates elite-tier purchase sounds using Web Audio API.
 * No external audio files needed.
 * - Level 7: metallic premium chime
 * - Level 8: synthetic futuristic sweep
 * - Level 9: deep cosmic impact
 */
export const useEliteSound = () => {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = () => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    return ctxRef.current;
  };

  const playLevel7 = useCallback(() => {
    const ctx = getCtx();
    const now = ctx.currentTime;

    // Metallic chime – two detuned oscillators + short decay
    [0, 5].forEach((detune) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.3);
      osc.detune.value = detune;
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.6);
    });
  }, []);

  const playLevel8 = useCallback(() => {
    const ctx = getCtx();
    const now = ctx.currentTime;

    // Futuristic sweep – rising frequency with filter
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(2000, now + 0.4);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.7);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.linearRampToValueAtTime(4000, now + 0.4);
    filter.frequency.linearRampToValueAtTime(1000, now + 0.7);

    osc.connect(filter).connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.8);
  }, []);

  const playLevel9 = useCallback(() => {
    const ctx = getCtx();
    const now = ctx.currentTime;

    // Deep cosmic impact – sub bass + harmonic overtone
    const sub = ctx.createOscillator();
    const subGain = ctx.createGain();
    sub.type = "sine";
    sub.frequency.setValueAtTime(60, now);
    sub.frequency.exponentialRampToValueAtTime(30, now + 1.2);
    subGain.gain.setValueAtTime(0.35, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    sub.connect(subGain).connect(ctx.destination);
    sub.start(now);
    sub.stop(now + 1.2);

    // Harmonic overtone
    const harm = ctx.createOscillator();
    const harmGain = ctx.createGain();
    harm.type = "triangle";
    harm.frequency.setValueAtTime(180, now);
    harm.frequency.exponentialRampToValueAtTime(80, now + 0.8);
    harmGain.gain.setValueAtTime(0.12, now);
    harmGain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
    harm.connect(harmGain).connect(ctx.destination);
    harm.start(now);
    harm.stop(now + 0.9);
  }, []);

  const playEliteSound = useCallback(
    (level: number) => {
      try {
        if (level === 7) playLevel7();
        else if (level === 8) playLevel8();
        else if (level === 9) playLevel9();
      } catch {
        // Silently fail – audio is enhancement only
      }
    },
    [playLevel7, playLevel8, playLevel9]
  );

  return { playEliteSound };
};
