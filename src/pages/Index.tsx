import { useState, useEffect } from "react";
import { Crown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Language } from "@/lib/i18n";
import { translations } from "@/lib/translations";
import { FloatingDollar } from "@/components/FloatingDollar";
import { Confetti } from "@/components/Confetti";
import { ParticleBackground } from "@/components/ParticleBackground";
import { GarageButton } from "@/components/GarageButton";
import { GarageModal } from "@/components/GarageModal";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { toast } from "sonner";
import dollarSymbol from "@/assets/dollar-symbol.png";

const Index = () => {
  const [lang, setLang] = useState<Language>('es');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showDollar, setShowDollar] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showGarageModal, setShowGarageModal] = useState(false);
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
    setShowGarageModal(true);
  };

  const handleGarageYes = () => {
    setShowGarageModal(false);
    navigate("/garage");
  };

  return (
    <div className="min-h-screen bg-gradient-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial animate-pulse-gold pointer-events-none" />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => (
          <FloatingDollar key={i} delay={i * 0.3} duration={2 + (i % 4)} size={24 + (i % 32)} />
        ))}
      </div>

      <ParticleBackground />
      <Confetti show={showConfetti} />
      <LanguageSwitch currentLang={lang} onLanguageChange={setLang} />

      <section className="relative z-10 container mx-auto px-4 min-h-screen flex flex-col items-center justify-center">
        <div className="text-center space-y-12">
          {showDollar && (
            <div className="animate-[scale-in_1.5s_ease-out,spin-slow_1.5s_ease-out,bounce-crazy_0.3s_ease-out_1.5s] inline-block relative">
              <div className="absolute inset-0 blur-3xl opacity-60 bg-gradient-radial animate-pulse" style={{ filter: 'blur(60px)' }} />
              <img
                src={dollarSymbol}
                alt="Dollar Symbol"
                className="w-64 h-64 md:w-80 md:h-80 relative z-10"
                style={{
                  filter: 'drop-shadow(0 0 40px rgba(255, 215, 0, 0.9)) drop-shadow(0 0 80px rgba(255, 215, 0, 0.6))',
                }}
              />
            </div>
          )}
          
          {showText && (
            <div className="animate-[fade-in_0.5s_ease-out,scale-in_0.5s_ease-out]">
              <h1 className="text-7xl md:text-9xl font-black animate-rainbow bg-gradient-party bg-[length:400%_400%] bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(255,215,0,0.8)]">
                {t.title}
              </h1>
            </div>
          )}
        </div>
      </section>

      <GarageButton onClick={handleGarageClick} text={t.garage} />

      <GarageModal
        open={showGarageModal}
        onClose={() => setShowGarageModal(false)}
        onYes={handleGarageYes}
        question={t.garageQuestion}
        yesText={t.yes}
        noText={t.no}
      />

      <footer className="relative z-10 container mx-auto px-4 py-8 mt-12 border-t border-primary/20">
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
