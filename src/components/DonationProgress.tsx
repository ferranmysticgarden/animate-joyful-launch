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
    <div className="py-4 px-4 bg-gradient-to-r from-primary/10 to-amber-900/20 border-y border-primary/20">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Target size={18} className="text-primary animate-pulse" />
            <span className="text-white text-sm font-semibold">Community Milestone</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-primary text-sm font-bold">€{goal.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="relative h-4 bg-black/50 rounded-full overflow-hidden border border-primary/30">
          <div 
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-amber-500 rounded-full transition-all duration-1000"
            style={{ width: `${percentage}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[10px] text-white font-bold drop-shadow-lg">
              €{current.toLocaleString()} unlocked ({percentage.toFixed(1)}%)
            </span>
          </div>
        </div>
        
        <p className="text-center text-xs text-muted-foreground mt-2">
          Join the elite. Unlock your status. 👑
        </p>
      </div>
    </div>
  );
};
