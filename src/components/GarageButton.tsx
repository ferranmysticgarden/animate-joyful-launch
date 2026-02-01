interface GarageButtonProps {
  onClick: () => void;
  text?: string;
}

export const GarageButton = ({ onClick, text = "Start" }: GarageButtonProps) => {
  return (
    <div className="py-10 flex justify-center px-4">
      <button
        onClick={onClick}
        className="w-full max-w-xs md:max-w-sm px-12 py-6 md:px-16 md:py-8 bg-black/90 hover:bg-black hover:scale-105 transition-all duration-300 rounded-full border-2 border-primary relative"
        style={{
          boxShadow:
            "0 0 30px hsl(45 100% 50% / 0.5), 0 0 60px hsl(45 100% 50% / 0.3), inset 0 0 30px rgba(0,0,0,0.6)",
        }}
      >
        {/* Golden 3D metallic text */}
        <span className="flex items-center justify-center gap-4">
          <span className="text-3xl md:text-4xl">💎</span>
          <span 
            style={{ 
              fontFamily: "'Pinyon Script', cursive",
              fontSize: "2.5rem",
              background: "linear-gradient(180deg, #FFD700 0%, #FFC107 30%, #FFB300 50%, #FFC107 70%, #FFD700 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              filter: "drop-shadow(0 0 8px rgba(255, 215, 0, 0.8)) drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
            }}
          >
            {text}
          </span>
          <span className="text-3xl md:text-4xl">💎</span>
        </span>
      </button>
    </div>
  );
};
