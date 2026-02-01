import { Button } from "./ui/button";

interface GarageButtonProps {
  onClick: () => void;
  text: string;
}

export const GarageButton = ({ onClick, text }: GarageButtonProps) => {
  const lines = splitTextToLines(text, 10, 3);

  return (
    <div className="py-8 flex justify-center">
      <Button
        onClick={onClick}
        className="w-32 h-32 md:w-36 md:h-36 font-black bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:scale-110 transition-all duration-300 rounded-full border-4 border-destructive/40 leading-tight"
        style={{
          boxShadow:
            "0 0 30px hsl(var(--destructive) / 0.6), 0 0 60px hsl(var(--destructive) / 0.3)",
          animation: 'pulse-crazy 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        }}
      >
        <span className="relative z-10 font-bold tracking-wide text-center px-3 text-[10px] md:text-xs">
          {lines.map((line, idx) => (
            <span key={`${line}-${idx}`} className="block">
              {line}
            </span>
          ))}
        </span>
      </Button>
    </div>
  );
};

function splitTextToLines(text: string, maxCharsPerLine: number, maxLines: number): string[] {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length <= 2) return [text.trim()];

  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;

    if (next.length <= maxCharsPerLine || current.length === 0) {
      current = next;
      continue;
    }

    lines.push(current);
    current = word;
  }

  if (current) lines.push(current);

  if (lines.length <= maxLines) return lines;

  // Merge overflow lines into the last line
  const head = lines.slice(0, maxLines - 1);
  const tail = lines.slice(maxLines - 1).join(" ");
  return [...head, tail];
}
