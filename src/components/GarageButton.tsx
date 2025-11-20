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
        className="px-12 py-6 text-2xl font-black bg-[image:var(--gradient-metallic-silver)] text-black hover:scale-110 transition-all duration-300 rounded-full border-4 border-white/40 relative overflow-hidden"
        style={{
          boxShadow: 'var(--shadow-silver)',
          animation: 'pulse-crazy 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          textShadow: '0 2px 10px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.8)'
        }}
      >
        <span className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{text}</span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shimmer" />
      </Button>
    </div>
  );
};
