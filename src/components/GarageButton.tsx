import { Button } from "./ui/button";

interface GarageButtonProps {
  onClick: () => void;
  text: string;
}

export const GarageButton = ({ onClick, text }: GarageButtonProps) => {
  return (
    <div className="py-8 flex justify-center">
      <Button
        onClick={onClick}
        className="w-28 h-28 md:w-32 md:h-32 text-xs md:text-sm font-black bg-red-600 hover:bg-red-500 text-white hover:scale-110 transition-all duration-300 rounded-full border-4 border-red-400/50 relative overflow-hidden leading-tight"
        style={{
          boxShadow: '0 0 30px rgba(239, 68, 68, 0.6), 0 0 60px rgba(239, 68, 68, 0.3)',
          animation: 'pulse-crazy 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        }}
      >
        <span className="relative z-10 font-bold tracking-wide text-center px-2">{text}</span>
      </Button>
    </div>
  );
};
