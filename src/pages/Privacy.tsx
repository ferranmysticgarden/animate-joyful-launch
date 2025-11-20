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
              "¡SOY RICO!!!" only collects your Google email address to allow login. We do not store personal data, 
              we do not share information with third parties, we do not use cookies or advertising tracking. 
              10% of the net revenue from this app is donated to global charitable organizations. 
              Your data is only used for authentication and is never sold. 
              The app contains no advertising or recurring purchases.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
