interface GarageButtonProps {
  onClick: () => void;
  text?: string;
}

export const GarageButton = ({ onClick, text = "Start" }: GarageButtonProps) => {
  return (
    <div className="relative z-50 py-10 flex justify-center px-4">
      <button
        onClick={onClick}
        className="relative w-full max-w-[360px] md:max-w-[460px] h-24 md:h-28 px-8 md:px-10 bg-background/95 hover:bg-background hover:scale-105 transition-transform duration-300 rounded-full border-[3px] border-primary overflow-visible"
        style={{
          boxShadow: "var(--shadow-mega)",
        }}
      >
        {/* Inner ring */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-1 rounded-full border border-primary/40"
          style={{ boxShadow: "inset 0 0 24px hsl(var(--primary) / 0.18)" }}
        />

        {/* Golden 3D metallic text */}
        <span className="relative z-10 flex items-center justify-center gap-4">
          <span className="text-3xl md:text-4xl">💎</span>
          <span
            className="bg-clip-text text-transparent"
            style={{
              fontFamily: "'Pinyon Script', cursive",
              backgroundImage: "var(--gradient-gold-metal-text)",
              fontSize: "clamp(2.4rem, 6vw, 3.2rem)",
              display: "inline-block",
              lineHeight: 1.25,
              padding: "0.12em 0.2em 0.18em",
              filter:
                "drop-shadow(0 0 18px hsl(var(--primary) / 0.95)) drop-shadow(0 3px 12px hsl(0 0% 0% / 0.75))",
              letterSpacing: "0.02em",
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
