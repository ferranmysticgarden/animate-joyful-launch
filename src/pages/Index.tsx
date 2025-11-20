import { useState } from "react";
import { Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { Language, getTranslation } from "@/lib/i18n";
import { FloatingDollar } from "@/components/FloatingDollar";
import { Confetti } from "@/components/Confetti";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { toast } from "sonner";

const Index = () => {
  const [lang, setLang] = useState<Language>('es');
  const [showConfetti, setShowConfetti] = useState(false);
  const t = getTranslation(lang);

  const handleButtonClick = () => {
    setShowConfetti(true);
    toast.success(lang === 'es' ? '¡Eres increíblemente rico!' : 'You are incredibly rich!', {
      duration: 3000,
    });
    setTimeout(() => setShowConfetti(false), 100);
  };

  return (
    <div className="min-h-screen bg-gradient-dark relative overflow-hidden">
      {/* Floating dollars background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <FloatingDollar key={i} delay={i * 0.5} duration={3 + (i % 3)} size={32 + (i % 20)} />
        ))}
      </div>

      <Confetti show={showConfetti} />
      <LanguageSwitch currentLang={lang} onLanguageChange={setLang} />

      {/* Main Section */}
      <section className="relative z-10 container mx-auto px-4 min-h-screen flex flex-col items-center justify-center">
        <div className="text-center space-y-12 animate-slide-up">
          <div className="inline-block">
            <Crown className="w-32 h-32 text-primary mx-auto mb-8 animate-pulse-gold drop-shadow-glow" />
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black text-primary animate-shimmer bg-gradient-gold bg-[length:200%_100%] bg-clip-text text-transparent">
            {t.title}
          </h1>
          
          <p className="text-2xl md:text-3xl text-foreground/80 font-light tracking-wide">
            {t.subtitle}
          </p>

          <div className="py-12">
            <button
              onClick={handleButtonClick}
              className="group relative w-80 h-80 rounded-full bg-gradient-gold shadow-glow hover:shadow-[0_0_100px_hsl(45,100%,51%/0.6)] transition-all duration-500 hover:scale-110 active:scale-95"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-gold-radial animate-pulse-gold" />
              <span className="relative z-10 text-4xl font-black text-primary-foreground drop-shadow-lg">
                {t.mainButton}
              </span>
            </button>
          </div>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.description}
          </p>
        </div>
      </section>

      {/* Legal Footer */}
      <footer className="relative z-10 container mx-auto px-4 py-12 mt-20 border-t border-primary/20">
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-sm text-muted-foreground">
          <Link to="/privacy" className="hover:text-primary transition-colors">
            {t.legal.privacy}
          </Link>
          <span className="hidden md:inline">•</span>
          <Link to="/terms" className="hover:text-primary transition-colors">
            {t.legal.terms}
          </Link>
          <span className="hidden md:inline">•</span>
          <span>© {new Date().getFullYear()} {t.title}</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
