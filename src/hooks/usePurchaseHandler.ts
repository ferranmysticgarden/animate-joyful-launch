import { useState, useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { useGooglePlayBilling } from "./useGooglePlayBilling";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Vehicle {
  id: number;
  name: string;
  price: string;
  priceValue: number;
  level: number;
}

export const usePurchaseHandler = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const { isNative, purchaseLevel: purchaseViaGooglePlay } = useGooglePlayBilling();

  // Get logged-in user's email automatically
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserEmail(session?.user?.email ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUserEmail(session?.user?.email ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handlePurchase = async (vehicle: Vehicle): Promise<boolean> => {
    if (!vehicle) return false;

    // On Android (native), use Google Play Billing
    if (isNative) {
      setIsLoading(true);
      try {
        const success = await purchaseViaGooglePlay(vehicle.level);
        if (success) {
          toast.success("Purchase completed! 🎉");
          return true;
        } else {
          toast.error("Purchase was cancelled or failed");
          return false;
        }
      } catch (error) {
        console.error("Google Play purchase error:", error);
        toast.error("Purchase failed. Please try again.");
        return false;
      } finally {
        setIsLoading(false);
      }
    }

    // On Web, use Stripe — use logged-in email or prompt
    const emailToUse = userEmail;
    if (!emailToUse) {
      toast.error("Please sign in to make a purchase");
      return false;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-payment", {
        body: { level: vehicle.level },
      });

      if (error) throw error;
      if (!data?.url) throw new Error("No checkout URL received");

      window.open(data.url, "_blank");
      toast.success("Redirecting to payment...");
      return true;
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Failed to start payment. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isNative,
    isLoggedIn: !!userEmail,
    handlePurchase,
  };
};
