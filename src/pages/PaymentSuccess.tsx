import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EpicCelebration } from "@/components/EpicCelebration";
import { supabase } from "@/integrations/supabase/client";

const UNLOCKS_KEY = "luxury_unlocked_levels";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showCelebration, setShowCelebration] = useState(false);
  const [verified, setVerified] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const level = searchParams.get("level");

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 10;
    const interval = 3000;

    const verifyPurchase = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user?.email || !level) {
          setVerifying(false);
          return;
        }

        const numericLevel = parseInt(level);
        if (!Number.isFinite(numericLevel) || numericLevel < 1 || numericLevel > 9) {
          setVerifying(false);
          return;
        }

        const { data: purchase } = await supabase
          .from("purchases")
          .select("level, status")
          .eq("user_email", user.email)
          .eq("level", numericLevel)
          .eq("status", "completed")
          .maybeSingle();

        if (purchase) {
          setVerified(true);
          setShowCelebration(true);
          setVerifying(false);

          // Write to localStorage only after server verification
          const parsedPurchases = JSON.parse(localStorage.getItem("luxury_purchases") || "[]");
          const existingPurchases: number[] = Array.isArray(parsedPurchases) ? parsedPurchases : [];
          const updatedPurchases = Array.from(new Set([...existingPurchases, numericLevel]));
          localStorage.setItem("luxury_purchases", JSON.stringify(updatedPurchases));

          if (numericLevel === 5) {
            const parsedUnlocks = JSON.parse(localStorage.getItem(UNLOCKS_KEY) || "[]");
            const existingUnlocks: number[] = Array.isArray(parsedUnlocks) ? parsedUnlocks : [];
            const updatedUnlocks = Array.from(new Set([...existingUnlocks, 6]));
            localStorage.setItem(UNLOCKS_KEY, JSON.stringify(updatedUnlocks));
          }
          return;
        }

        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(verifyPurchase, interval);
        } else {
          setVerifying(false);
        }
      } catch {
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(verifyPurchase, interval);
        } else {
          setVerifying(false);
        }
      }
    };

    verifyPurchase();
  }, [level]);

  const getLevelName = () => {
    const names: Record<string, string> = {
      "1": "Sports Car", "2": "Yacht", "3": "Helicopter",
      "4": "Private Jet", "5": "Mansion", "6": "Luxury Island",
      "7": "Private Archipelago", "8": "Orbital Space Station", "9": "Own a Planet",
    };
    return names[level || ""] || "Luxury Item";
  };

  if (verifying) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center p-4">
        <div className="text-center space-y-6">
          <Loader2 className="w-16 h-16 text-primary mx-auto animate-spin" />
          <h2 className="text-2xl font-bold text-primary">Verifying your payment...</h2>
          <p className="text-muted-foreground">This may take a few seconds.</p>
        </div>
      </div>
    );
  }

  if (!verified) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-md">
          <h2 className="text-2xl font-bold text-destructive">Payment Not Verified</h2>
          <p className="text-muted-foreground">
            We couldn't verify your payment yet. If you completed the payment, please wait a moment and try again.
          </p>
          <div className="flex flex-col gap-4">
            <Button onClick={() => window.location.reload()} className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
              Retry Verification
            </Button>
            <Button variant="outline" onClick={() => navigate("/garage")} className="border-primary/50 text-primary hover:bg-primary/10">
              Back to Garage
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center p-4">
      <EpicCelebration show={showCelebration} onComplete={() => setShowCelebration(false)} />
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
          <Button onClick={() => setShowCelebration(true)} className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg py-6">
            🎉 Replay Celebration
          </Button>
          <Button onClick={() => (level ? navigate(`/vehicle/${level}`) : navigate("/garage"))} className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-6">
            View Your Purchase
          </Button>
          <Button variant="outline" onClick={() => navigate("/garage")} className="border-primary/50 text-primary hover:bg-primary/10">
            Back to Garage
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
