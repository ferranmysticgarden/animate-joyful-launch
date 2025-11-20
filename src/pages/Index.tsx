import { useState } from "react";
import { Crown, Gem, Star, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Language, getTranslation } from "@/lib/i18n";
import { FloatingDollar } from "@/components/FloatingDollar";
import { Confetti } from "@/components/Confetti";
import { SparkleEffect } from "@/components/SparkleEffect";
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
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial animate-pulse-gold pointer-events-none" />
      
      {/* Floating icons background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => (
          <FloatingDollar key={i} delay={i * 0.3} duration={2 + (i % 4)} size={24 + (i % 32)} />
        ))}
      </div>

      <SparkleEffect />
      <Confetti show={showConfetti} />
      <LanguageSwitch currentLang={lang} onLanguageChange={setLang} />

      {/* Main Section */}
      <section className="relative z-10 container mx-auto px-4 min-h-screen flex flex-col items-center justify-center">
        <div className="text-center space-y-8 animate-slide-up">
          {/* Rotating icons around crown */}
          <div className="relative inline-block mb-12">
            <Crown className="w-32 h-32 text-primary mx-auto animate-bounce-crazy drop-shadow-[0_0_30px_hsl(45,100%,55%)]" />
            <Gem className="absolute -top-4 -right-4 w-12 h-12 text-secondary animate-spin-slow drop-shadow-[0_0_20px_hsl(280,100%,70%)]" />
            <Star className="absolute -bottom-2 -left-6 w-10 h-10 text-accent animate-pulse-crazy drop-shadow-[0_0_20px_hsl(340,100%,65%)]" />
            <Sparkles className="absolute top-0 -left-4 w-8 h-8 text-primary animate-pulse-gold" />
            <Zap className="absolute -top-2 right-0 w-10 h-10 text-secondary animate-wiggle" />
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black animate-rainbow bg-gradient-party bg-[length:400%_400%] bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(255,215,0,0.8)]" style={{ 
            backgroundSize: '400% 400%',
            animation: 'shimmer 3s linear infinite, rainbow 5s linear infinite'
          }}>
            {t.title}
          </h1>
          
          <p className="text-2xl md:text-4xl text-primary font-bold tracking-wide animate-pulse-gold drop-shadow-[0_0_20px_hsl(45,100%,55%)]">
            {t.subtitle}
          </p>

          <div className="py-12 relative">
            {/* Rotating sparkles around button */}
            <div className="absolute inset-0 animate-spin-slow">
              {Array.from({ length: 8 }).map((_, i) => (
                <Sparkles
                  key={i}
                  className="absolute text-primary"
                  style={{
                    left: `${50 + 45 * Math.cos((i * Math.PI * 2) / 8)}%`,
                    top: `${50 + 45 * Math.sin((i * Math.PI * 2) / 8)}%`,
                  }}
                  size={24}
                />
              ))}
            </div>
            
            <button
              onClick={handleButtonClick}
              className="relative w-72 h-72 md:w-80 md:h-80 rounded-full bg-gradient-party shadow-mega transition-all duration-300 hover:scale-125 active:scale-90 animate-pulse-crazy"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-radial animate-rainbow" />
              <div className="absolute inset-4 rounded-full bg-gradient-gold animate-spin-slow" style={{ animationDuration: '4s' }} />
              <span className="absolute inset-0 flex items-center justify-center text-3xl md:text-4xl font-black text-white drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] animate-bounce-crazy">
                {t.mainButton}
              </span>
            </button>
          </div>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-bold animate-shimmer bg-gradient-party bg-[length:200%_100%] bg-clip-text text-transparent">
            {t.description}
          </p>
          
          {/* Dancing icons */}
          <div className="flex justify-center gap-8 pt-8">
            <Gem className="w-12 h-12 text-secondary animate-bounce-crazy" style={{ animationDelay: '0s' }} />
            <Star className="w-12 h-12 text-accent animate-bounce-crazy" style={{ animationDelay: '0.2s' }} />
            <Crown className="w-12 h-12 text-primary animate-bounce-crazy" style={{ animationDelay: '0.4s' }} />
            <Sparkles className="w-12 h-12 text-secondary animate-bounce-crazy" style={{ animationDelay: '0.6s' }} />
          </div>
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
