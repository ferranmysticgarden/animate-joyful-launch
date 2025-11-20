import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundImage: {
        'gradient-gold': 'var(--gradient-gold)',
        'gradient-silver': 'var(--gradient-silver)',
        'gradient-party': 'var(--gradient-party)',
        'gradient-radial': 'var(--gradient-radial)',
        'gradient-dark': 'var(--gradient-dark)',
        'gradient-metallic-silver': 'var(--gradient-metallic-silver)',
      },
      boxShadow: {
        'gold': 'var(--shadow-gold)',
        'glow': 'var(--shadow-glow)',
        'mega': 'var(--shadow-mega)',
        'silver': 'var(--shadow-silver)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-30px) rotate(5deg)" },
        },
        "shimmer": {
          "0%": { transform: "translateX(-100%) skewX(-12deg)" },
          "100%": { transform: "translateX(200%) skewX(-12deg)" },
        },
        "rainbow": {
          "0%": { filter: "hue-rotate(0deg)" },
          "100%": { filter: "hue-rotate(360deg)" },
        },
        "pulse-gold": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        "pulse-crazy": {
          "0%, 100%": { transform: "scale(1)" },
          "25%": { transform: "scale(1.15)" },
          "50%": { transform: "scale(1)" },
          "75%": { transform: "scale(0.9)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "bounce-crazy": {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-30px) scale(1.2)" },
        },
        "confetti-fall": {
          "0%": { transform: "translateY(-100vh) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(100vh) rotate(720deg)", opacity: "0" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "wiggle": {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "slide-car": {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(120vw)", opacity: "1" },
        },
      },
      animation: {
        "float": "float 3s ease-in-out infinite",
        "float-slow": "float-slow 4s ease-in-out infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
        "rainbow": "rainbow 3s linear infinite",
        "pulse-gold": "pulse-gold 1.5s ease-in-out infinite",
        "pulse-crazy": "pulse-crazy 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin-slow 8s linear infinite",
        "bounce-crazy": "bounce-crazy 1s ease-in-out infinite",
        "confetti-fall": "confetti-fall 3s linear forwards",
        "slide-up": "slide-up 0.5s ease-out",
        "wiggle": "wiggle 0.5s ease-in-out infinite",
        "slide-car": "slide-car 4s linear forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
