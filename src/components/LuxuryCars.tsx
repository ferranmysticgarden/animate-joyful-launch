import { useEffect, useState } from "react";

interface Car {
  id: number;
  emoji: string;
  top: number;
  duration: number;
  delay: number;
}

export const LuxuryCars = () => {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    const carEmojis = ['🏎️', '🚗', '🚙', '🚕', '🏁'];
    
    const generateCar = () => {
      const newCar: Car = {
        id: Date.now() + Math.random(),
        emoji: carEmojis[Math.floor(Math.random() * carEmojis.length)],
        top: 10 + Math.random() * 70,
        duration: 3 + Math.random() * 2,
        delay: 0,
      };
      
      setCars(prev => [...prev, newCar]);
      
      setTimeout(() => {
        setCars(prev => prev.filter(car => car.id !== newCar.id));
      }, (newCar.duration + 1) * 1000);
    };

    const interval = setInterval(generateCar, 3000);
    generateCar();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {cars.map((car) => (
        <div
          key={car.id}
          className="absolute text-6xl md:text-8xl animate-slide-car"
          style={{
            top: `${car.top}%`,
            left: '-10%',
            animationDuration: `${car.duration}s`,
            filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.8))',
          }}
        >
          {car.emoji}
        </div>
      ))}
    </div>
  );
};
