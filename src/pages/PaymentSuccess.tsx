import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Confetti } from "@/components/Confetti";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);
  const level = searchParams.get("level");

  useEffect(() => {
    // Mark level as purchased in localStorage (same format as usePurchases)
    if (level) {
      const parsed = JSON.parse(localStorage.getItem("luxury_purchases") || "[]");
      const existing: number[] = Array.isArray(parsed) ? parsed : [];
      const numericLevel = Number(level);

      if (Number.isFinite(numericLevel)) {
        const updated = Array.from(new Set([...existing, numericLevel]));
        localStorage.setItem("luxury_purchases", JSON.stringify(updated));
      }
    }

    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, [level]);

  const getLevelName = () => {
    switch (level) {
      case "1": return "Sports Car";
      case "2": return "Yacht";
      case "3": return "Helicopter";
      case "4": return "Private Jet";
      case "5": return "Mansion";
      case "6": return "Luxury Island";
      default: return "Luxury Item";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center p-4">
      <Confetti show={showConfetti} />
      
      <div className="text-center space-y-8 max-w-md">
        <div className="animate-bounce">
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary animate-pulse-gold">
            Payment Successful!
          </h1>
          
          <div className="flex items-center justify-center gap-2 text-xl text-white/80">
            <Sparkles className="w-6 h-6 text-primary" />
            <span>You now own the {getLevelName()}!</span>
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          
          <p className="text-muted-foreground">
            Thank you for your purchase. A portion of your payment goes to charity.
          </p>
        </div>
        
        <div className="flex flex-col gap-4">
          <Button 
            onClick={() => navigate(level === "6" ? "/vehicle/bonus" : `/vehicle/${level}`)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-6"
          >
            View Your Purchase
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => navigate("/garage")}
            className="border-primary/50 text-primary hover:bg-primary/10"
          >
            Back to Garage
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
