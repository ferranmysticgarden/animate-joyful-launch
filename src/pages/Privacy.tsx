import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-dark p-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/">
          <Button variant="outline" className="mb-8 border-primary/30 hover:border-primary">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
        <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl p-8 shadow-gold">
          <h1 className="text-4xl font-bold text-primary mb-6">Privacy Policy</h1>
          <div className="prose prose-invert prose-gold max-w-none text-foreground/80 space-y-4">
            <p>
              <strong>Luxury Life</strong> collects your email address solely to process payments through Stripe. 
              We do not store personal data beyond what is necessary for transactions. 
              We do not share information with third parties for marketing purposes. 
              We do not use cookies for advertising tracking.
            </p>
            <p>
              <strong>Charitable Donations:</strong> A significant portion of net revenue from this app is donated 
              to registered charitable organizations. The exact percentage is determined by the app operator 
              in compliance with applicable regulations and platform policies.
            </p>
            <p>
              Your payment data is securely processed by Stripe and is never stored on our servers. 
              The app contains no recurring subscriptions - all purchases are one-time payments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
