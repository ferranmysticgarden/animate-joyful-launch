import { TrendingUp } from "lucide-react";

interface StatusChallengeProps {
  purchasedCount: number;
}

const statusMessages = [
  { min: 0, max: 0, text: "¿A qué nivel llegarás?", subtext: "Tu estatus empieza aquí." },
  { min: 1, max: 1, text: "Nivel 1 alcanzado", subtext: "Ya estás por encima del 90%." },
  { min: 2, max: 2, text: "Nivel 2 — Subiendo", subtext: "No cualquiera llega hasta aquí." },
  { min: 3, max: 3, text: "Nivel 3 — Zona Premium", subtext: "Solo el top 5% sigue avanzando." },
  { min: 4, max: 4, text: "Nivel 4 — Élite cercana", subtext: "El lujo ya no es una aspiración. Es tu realidad." },
  { min: 5, max: 5, text: "Nivel 5 — Diamante", subtext: "Pocos pueden decir esto." },
  { min: 6, max: 9, text: "Nivel máximo", subtext: "No queda nada por demostrar." },
];

export const StatusChallenge = ({ purchasedCount }: StatusChallengeProps) => {
  const status = statusMessages.find(
    (s) => purchasedCount >= s.min && purchasedCount <= s.max
  ) || statusMessages[0];

  return (
    <div className="mb-10 flex items-center justify-center">
      <div
        className="inline-flex items-center gap-3 px-6 py-3 rounded-full border"
        style={{
          borderColor: "hsl(45 100% 50% / 0.25)",
          background:
            "linear-gradient(135deg, hsl(0 0% 8%), hsl(45 100% 50% / 0.05))",
        }}
      >
        <TrendingUp
          className="w-5 h-5 text-primary"
          style={{ filter: "drop-shadow(0 0 6px hsl(45 100% 50% / 0.5))" }}
        />
        <div className="text-center">
          <p
            className="text-sm font-black text-primary uppercase tracking-wider"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            {status.text}
          </p>
          <p className="text-xs text-muted-foreground/70 mt-0.5">
            {status.subtext}
          </p>
        </div>
        <TrendingUp
          className="w-5 h-5 text-primary"
          style={{
            filter: "drop-shadow(0 0 6px hsl(45 100% 50% / 0.5))",
            transform: "scaleX(-1)",
          }}
        />
      </div>
    </div>
  );
};
