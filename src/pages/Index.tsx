import { useState, useEffect } from "react";
import { Crown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Language } from "@/lib/i18n";
import { translations } from "@/lib/translations";
import { FloatingDollar } from "@/components/FloatingDollar";
import { Confetti } from "@/components/Confetti";
import { ParticleBackground } from "@/components/ParticleBackground";
import { GarageButton } from "@/components/GarageButton";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { DollarSymbol } from "@/components/DollarSymbol";
import { PurchaseNotification } from "@/components/PurchaseNotification";
import { PurchaseCounter } from "@/components/PurchaseCounter";
import { UrgencyTimer } from "@/components/UrgencyTimer";
import { TrustBadges } from "@/components/TrustBadges";
import { Testimonials } from "@/components/Testimonials";
import { DonationProgress } from "@/components/DonationProgress";
import { toast } from "sonner";
import luxuryBackground from "@/assets/luxury-background.jpg";

const Index = () => {
  const [lang, setLang] = useState<Language>('es');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showDollar, setShowDollar] = useState(false);
  const [showText, setShowText] = useState(false);
  
  const navigate = useNavigate();
  const t = translations[lang];

  useEffect(() => {
    // Detectar idioma del navegador
    const browserLang = navigator.language.split('-')[0] as Language;
    if (['es', 'en', 'fr', 'de', 'pt', 'it', 'ar', 'ja', 'zh', 'ru'].includes(browserLang)) {
      setLang(browserLang);
    }

    // Secuencia de animación inicial
    const timer1 = setTimeout(() => setShowDollar(true), 500);
    const timer2 = setTimeout(() => setShowText(true), 2000);
    const timer3 = setTimeout(() => {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3500);
    }, 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleGarageClick = () => {
    navigate("/garage");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Luxury background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${luxuryBackground})` }}
      />
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-radial animate-pulse-gold pointer-events-none opacity-20" />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <FloatingDollar key={i} delay={i * 0.5} duration={4 + (i % 3)} size={18 + (i % 20)} />
        ))}
      </div>

      <ParticleBackground />
      <Confetti show={showConfetti} />
      <LanguageSwitch currentLang={lang} onLanguageChange={setLang} />
      <PurchaseNotification />

      {/* Top bars - Urgency + Counter */}
      <div className="relative z-20 pt-12">
        <UrgencyTimer />
        <PurchaseCounter />
      </div>

      <section className="relative z-10 container mx-auto px-4 flex flex-col items-center justify-center py-8">
        <div className="text-center space-y-2">
          {/* Title FIRST - at the top */}
          <div className={`transition-all duration-500 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <h1 
              className="text-5xl md:text-7xl lg:text-8xl font-normal animate-rainbow bg-gradient-party bg-[length:400%_400%] bg-clip-text text-transparent drop-shadow-[0_0_60px_rgba(255,215,0,0.9)]"
              style={{ fontFamily: "'Pinyon Script', cursive" }}
            >
              Luxury Life
            </h1>
          </div>

          {/* Dollar symbol BELOW title */}
          {showDollar && (
            <div className="animate-[scale-in_1.5s_ease-out,spin-slow_1.5s_ease-out,bounce-crazy_0.3s_ease-out_1.5s] py-2">
              <DollarSymbol />
            </div>
          )}
          
          {/* Tagline below dollar */}
          {showText && (
            <div className="animate-[fade-in_0.8s_ease-out] space-y-3">
              <p className="text-xl md:text-2xl lg:text-3xl text-white font-bold tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                Can you afford it?
              </p>
              <p className="text-base md:text-lg text-primary animate-pulse-gold font-semibold">
                💎 Your status. Your rules.
              </p>
              <p className="text-sm text-red-400 animate-pulse font-bold mt-2">
                🔥 Only 47 spots left at this price 🔥
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Trust badges */}
      <div className="relative z-10">
        <TrustBadges />
      </div>

      {/* Testimonials */}
      <div className="relative z-10">
        <Testimonials />
      </div>

      {/* Donation progress */}
      <div className="relative z-10">
        <DonationProgress />
      </div>

      <GarageButton onClick={handleGarageClick} text="ENTER THE GARAGE 🚀" />

      {/* Spacer for fixed button */}
      <div className="h-40" />

      <footer className="relative z-10 container mx-auto px-4 py-6 border-t border-primary/20 bg-black/40">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-muted-foreground">
          <Link to="/privacy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <span className="hidden md:inline">•</span>
          <Link to="/terms" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Index;
