import { Button } from "./ui/button";

interface GarageButtonProps {
  onClick: () => void;
  text: string;
}

export const GarageButton = ({ onClick, text }: GarageButtonProps) => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <Button
        onClick={onClick}
        size="lg"
        className="px-12 py-6 text-2xl font-bold bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 text-black hover:from-slate-200 hover:via-slate-100 hover:to-slate-200 shadow-glow animate-pulse-crazy rounded-full border-2 border-slate-400"
      >
        {text}
      </Button>
    </div>
  );
};
