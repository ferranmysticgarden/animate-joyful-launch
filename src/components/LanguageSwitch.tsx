import { Languages } from "lucide-react";
import { Button } from "./ui/button";
import { Language } from "@/lib/i18n";

interface LanguageSwitchProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LanguageSwitch = ({ currentLang, onLanguageChange }: LanguageSwitchProps) => {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => onLanguageChange(currentLang === 'es' ? 'en' : 'es')}
      className="fixed top-4 right-4 z-50 bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary"
    >
      <Languages className="h-4 w-4" />
      <span className="sr-only">Change language</span>
    </Button>
  );
};
