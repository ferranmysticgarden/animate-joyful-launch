import { Shield, Lock, CreditCard, Heart } from "lucide-react";

export const TrustBadges = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-4 px-4">
      <div className="flex items-center gap-1 text-xs text-muted-foreground bg-black/40 px-3 py-2 rounded-full border border-primary/20">
        <Lock size={14} className="text-green-400" />
        <span>SSL Secure</span>
      </div>
      <div className="flex items-center gap-1 text-xs text-muted-foreground bg-black/40 px-3 py-2 rounded-full border border-primary/20">
        <Shield size={14} className="text-blue-400" />
        <span>Stripe Protected</span>
      </div>
      <div className="flex items-center gap-1 text-xs text-muted-foreground bg-black/40 px-3 py-2 rounded-full border border-primary/20">
        <CreditCard size={14} className="text-primary" />
        <span>Secure Payment</span>
      </div>
      <div className="flex items-center gap-1 text-xs text-muted-foreground bg-black/40 px-3 py-2 rounded-full border border-primary/20">
        <Heart size={14} className="text-red-400" />
        <span>UNICEF Partner</span>
      </div>
    </div>
  );
};
