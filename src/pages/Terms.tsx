import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Terms = () => {
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
          <h1 className="text-4xl font-bold text-primary mb-6">Terms of Service</h1>
          <div className="prose prose-invert prose-gold max-w-none text-foreground/80 space-y-4">
            <p>
              <strong>Luxury Life</strong> is a charitable entertainment application. Purchasing items in this app 
              does NOT grant real ownership of any vehicles, properties, or assets. All items shown are 
              artistic representations created for entertainment purposes only.
            </p>
            <p>
              <strong>Charitable Purpose:</strong> A substantial portion of all proceeds from this application 
              is donated to registered non-profit charitable organizations. By making a purchase, you are 
              contributing to charitable causes while enjoying the entertainment experience.
            </p>
            <p>
              <strong>No Real Value:</strong> Digital items purchased have no monetary value outside this app 
              and cannot be resold, transferred, or exchanged for real goods or currency.
            </p>
            <p>
              <strong>Payment Processing:</strong> All payments are processed securely through Stripe. 
              Refunds may be requested within 14 days of purchase by contacting support.
            </p>
            <p>
              Use of this app for fraudulent, illegal, or commercial purposes is strictly prohibited.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
