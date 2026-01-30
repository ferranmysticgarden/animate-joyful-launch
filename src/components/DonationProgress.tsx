import { useState, useEffect } from "react";
import { Target, Heart } from "lucide-react";

export const DonationProgress = () => {
  const goal = 500000;
  const [current, setCurrent] = useState(127450);
  const percentage = Math.min((current / goal) * 100, 100);

  useEffect(() => {
    // Slowly increment
    const interval = setInterval(() => {
      setCurrent(prev => prev + Math.floor(Math.random() * 50) + 10);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-4 px-4 bg-gradient-to-r from-pink-900/30 to-purple-900/30 border-y border-pink-500/20">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Heart size={18} className="text-pink-400 fill-pink-400 animate-pulse" />
            <span className="text-white text-sm font-semibold">UNICEF Donation Goal</span>
          </div>
          <div className="flex items-center gap-1">
            <Target size={14} className="text-pink-400" />
            <span className="text-pink-400 text-sm font-bold">€{goal.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="relative h-4 bg-black/50 rounded-full overflow-hidden border border-pink-500/30">
          <div 
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-1000"
            style={{ width: `${percentage}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[10px] text-white font-bold drop-shadow-lg">
              €{current.toLocaleString()} raised ({percentage.toFixed(1)}%)
            </span>
          </div>
        </div>
        
        <p className="text-center text-xs text-muted-foreground mt-2">
          Help us reach our goal! Every purchase counts 💖
        </p>
      </div>
    </div>
  );
};
