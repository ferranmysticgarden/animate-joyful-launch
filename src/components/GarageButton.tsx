import { Button } from "./ui/button";

interface GarageButtonProps {
  onClick: () => void;
  text: string;
}

export const GarageButton = ({ onClick, text }: GarageButtonProps) => {
  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 mb-16">
      <Button
        onClick={onClick}
        className="w-24 h-24 md:w-28 md:h-28 text-xl md:text-2xl font-black bg-red-600 hover:bg-red-500 text-white hover:scale-110 transition-all duration-300 rounded-full border-4 border-red-400/50 relative overflow-hidden"
        style={{
          boxShadow: '0 0 30px rgba(239, 68, 68, 0.6), 0 0 60px rgba(239, 68, 68, 0.3)',
          animation: 'pulse-crazy 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        }}
      >
        <span className="relative z-10 font-bold tracking-wide">{text}</span>
      </Button>
    </div>
  );
};
