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
              This application is a playful luxury simulation product. It does not imply real possession of vehicles, 
              brands or properties. All vehicles shown are artistic representations without trademarks. 
              The purpose of the app is to entertain and support charitable causes. 
              10% of net revenue is donated to non-profit organizations. 
              It is not permitted to use it for commercial, illegal or fraudulent purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
