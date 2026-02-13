import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Loader2 } from "lucide-react";

interface PurchaseModalProps {
  open: boolean;
  onClose: () => void;
  onPurchase: () => void;
  vehicleName: string;
  price: string;
  email: string;
  onEmailChange: (email: string) => void;
  isLoading?: boolean;
  showEmailInput?: boolean;
}

export const PurchaseModal = ({
  open,
  onClose,
  onPurchase,
  vehicleName,
  price,
  email,
  onEmailChange,
  isLoading = false,
  showEmailInput = true,
}: PurchaseModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card/95 backdrop-blur-sm border-primary/30">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center text-foreground font-bold mb-4">
            Purchase {vehicleName} for {price}?
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Status quote */}
          <p 
            className="text-xl text-center text-primary font-bold tracking-wide"
            style={{ 
              fontFamily: "'Orbitron', sans-serif",
              textShadow: "0 0 20px rgba(255, 215, 0, 0.5)"
            }}
          >
            "Your status speaks for itself."
          </p>
          
          {showEmailInput && (
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Enter your email to proceed with payment:
              </label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                className="bg-background/50 border-primary/30"
                disabled={isLoading}
              />
            </div>
          )}
          
          <p className="text-xs text-muted-foreground/60 text-center">
            {showEmailInput ? "Secure Stripe checkout" : "Secure Google Play purchase"}
          </p>
          
          <div className="flex gap-4 justify-center pt-2">
            <Button
              onClick={onPurchase}
              size="lg"
              className="px-8 py-6 text-xl font-bold bg-green-500 hover:bg-green-600 text-white shadow-glow"
              disabled={isLoading || (showEmailInput && !email)}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                "Buy Now"
              )}
            </Button>
            <Button
              onClick={onClose}
              size="lg"
              variant="destructive"
              className="px-8 py-6 text-xl font-bold shadow-md"
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
