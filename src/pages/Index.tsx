import { useState } from "react";
import { Crown, Gem, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Language, getTranslation } from "@/lib/i18n";
import { FloatingDollar } from "@/components/FloatingDollar";
import { Confetti } from "@/components/Confetti";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { LuxuryButton } from "@/components/LuxuryButton";
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

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center space-y-8 animate-slide-up">
          <div className="inline-block">
            <Crown className="w-24 h-24 text-primary mx-auto mb-4 animate-pulse-gold drop-shadow-glow" />
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black text-primary animate-shimmer bg-gradient-gold bg-[length:200%_100%] bg-clip-text text-transparent">
            {t.title}
          </h1>
          
          <p className="text-2xl md:text-3xl text-foreground/80 font-light tracking-wide">
            {t.subtitle}
          </p>

          <div className="py-12">
            <LuxuryButton onClick={handleButtonClick}>
              {t.mainButton}
            </LuxuryButton>
          </div>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.description}
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary">
          {t.features.title}
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { icon: Crown, title: t.features.luxury, desc: t.features.luxuryDesc, delay: 0 },
            { icon: Gem, title: t.features.exclusive, desc: t.features.exclusiveDesc, delay: 0.2 },
            { icon: Star, title: t.features.premium, desc: t.features.premiumDesc, delay: 0.4 },
          ].map(({ icon: Icon, title, desc, delay }) => (
            <div
              key={title}
              className="group bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl p-8 hover:border-primary/60 transition-all duration-300 hover:shadow-gold animate-slide-up hover:scale-105"
              style={{ animationDelay: `${delay}s` }}
            >
              <Icon className="w-12 h-12 text-primary mb-4 group-hover:animate-pulse-gold" />
              <h3 className="text-2xl font-bold text-foreground mb-3">{title}</h3>
              <p className="text-muted-foreground">{desc}</p>
            </div>
          ))}
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
