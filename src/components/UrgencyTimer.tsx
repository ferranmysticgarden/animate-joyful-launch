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
    <div className="flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-red-900/80 to-orange-900/80 border-y border-red-500/30">
      <Flame size={18} className="text-orange-400 animate-pulse" />
      <span className="text-white text-sm font-semibold">SPECIAL OFFER ENDS IN:</span>
      <div className="flex items-center gap-1 font-mono">
        <span className="bg-black/50 px-2 py-1 rounded text-orange-400 font-bold">
          {pad(timeLeft.hours)}
        </span>
        <span className="text-orange-400">:</span>
        <span className="bg-black/50 px-2 py-1 rounded text-orange-400 font-bold">
          {pad(timeLeft.minutes)}
        </span>
        <span className="text-orange-400">:</span>
        <span className="bg-black/50 px-2 py-1 rounded text-orange-400 font-bold">
          {pad(timeLeft.seconds)}
        </span>
      </div>
      <Clock size={16} className="text-orange-400" />
    </div>
  );
};
