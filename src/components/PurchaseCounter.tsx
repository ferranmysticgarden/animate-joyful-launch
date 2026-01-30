import { useState, useEffect } from "react";
import { Users, TrendingUp } from "lucide-react";

export const PurchaseCounter = () => {
  const [count, setCount] = useState(847);
  const [donated, setDonated] = useState(127450);

  useEffect(() => {
    // Increment counter randomly every 30-60 seconds
    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * 3) + 1;
      setCount(prev => prev + increment);
      setDonated(prev => prev + (increment * 150)); // Average €150 per purchase
    }, 30000 + Math.random() * 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 py-3 px-4 bg-black/60 backdrop-blur-sm border-y border-primary/20">
      <div className="flex items-center gap-2 text-sm">
        <Users size={18} className="text-primary" />
        <span className="text-white">
          <span className="text-primary font-bold text-lg">{count.toLocaleString()}</span> people joined
        </span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <TrendingUp size={18} className="text-green-400" />
        <span className="text-white">
          <span className="text-green-400 font-bold text-lg">€{donated.toLocaleString()}</span> donated to UNICEF
        </span>
      </div>
    </div>
  );
};
