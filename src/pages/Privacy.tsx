import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Language, getTranslation } from "@/lib/i18n";

interface PrivacyProps {
  lang: Language;
}

const Privacy = ({ lang }: PrivacyProps) => {
  const t = getTranslation(lang);

  return (
    <div className="min-h-screen bg-gradient-dark p-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/">
          <Button variant="outline" className="mb-8 border-primary/30 hover:border-primary">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {lang === 'es' ? 'Volver' : 'Back'}
          </Button>
        </Link>
        <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl p-8 shadow-gold">
          <h1 className="text-4xl font-bold text-primary mb-6">{t.legal.privacy}</h1>
          <div className="prose prose-invert prose-gold max-w-none">
            <div className="whitespace-pre-wrap text-foreground/80">
              {t.legal.privacyContent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
