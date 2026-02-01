import { useState, useEffect } from "react";
import { Clock, Flame } from "lucide-react";

export const UrgencyTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 34,
    seconds: 56
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          // Reset to random time between 1-4 hours
          hours = Math.floor(Math.random() * 3) + 1;
          minutes = Math.floor(Math.random() * 60);
          seconds = Math.floor(Math.random() * 60);
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-red-900/90 to-orange-900/90 border-y border-red-500/40">
      <div className="flex items-center gap-2">
        <Flame size={20} className="text-orange-400 animate-pulse" />
        <span className="text-white text-sm font-bold uppercase tracking-wide">
          🔥 33% OFF - LIMITED TIME 🔥
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-orange-300 text-xs">Ends in:</span>
        <div className="flex items-center gap-1 font-mono">
          <span className="bg-black/60 px-2 py-1 rounded text-orange-400 font-bold text-lg">
            {pad(timeLeft.hours)}
          </span>
          <span className="text-orange-400 text-lg">:</span>
          <span className="bg-black/60 px-2 py-1 rounded text-orange-400 font-bold text-lg">
            {pad(timeLeft.minutes)}
          </span>
          <span className="text-orange-400 text-lg">:</span>
          <span className="bg-black/60 px-2 py-1 rounded text-orange-400 font-bold text-lg">
            {pad(timeLeft.seconds)}
          </span>
        </div>
        <Clock size={18} className="text-orange-400" />
      </div>
    </div>
  );
};
