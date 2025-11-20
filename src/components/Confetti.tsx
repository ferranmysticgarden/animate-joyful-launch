import { useEffect, useState } from "react";

interface ConfettiPiece {
  id: number;
  left: number;
  color: string;
  delay: number;
  size: number;
  shape: 'circle' | 'square' | 'star';
}

export const Confetti = ({ show }: { show: boolean }) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (show) {
      const colors = [
        '#FFD700', '#FFA500', '#FF6B6B', '#A855F7', 
        '#06B6D4', '#10B981', '#F59E0B', '#EC4899'
      ];
      const shapes: Array<'circle' | 'square' | 'star'> = ['circle', 'square', 'star'];
      
      const newPieces = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.5,
        size: 4 + Math.random() * 8,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
      }));
      setPieces(newPieces);

      const timer = setTimeout(() => setPieces([]), 3000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!show || pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className={`absolute animate-confetti-fall ${
            piece.shape === 'circle' ? 'rounded-full' : 
            piece.shape === 'square' ? 'rounded-sm' : 
            'clip-star'
          }`}
          style={{
            left: `${piece.left}%`,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            boxShadow: `0 0 10px ${piece.color}`,
          }}
        />
      ))}
    </div>
  );
};
