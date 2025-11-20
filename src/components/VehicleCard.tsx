import { Card } from "./ui/card";

interface VehicleCardProps {
  name: string;
  price: string;
  image: string;
  onClick: () => void;
}

export const VehicleCard = ({ name, price, image, onClick }: VehicleCardProps) => {
  return (
    <Card
      onClick={onClick}
      className="group cursor-pointer p-6 bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/60 transition-all duration-300 hover:shadow-gold hover:scale-105"
    >
      <div className="flex items-center gap-6">
        <div className="relative w-32 h-32 rounded-lg overflow-hidden" style={{
          background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.15) 0%, rgba(0, 0, 0, 0.3) 100%), linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
          boxShadow: 'inset 0 0 40px rgba(255, 215, 0, 0.1), 0 4px 20px rgba(0, 0, 0, 0.5)'
        }}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_10px_rgba(255,215,0,0.3)]"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-primary mb-2">{name}</h3>
          <p className="text-xl text-muted-foreground font-semibold">{price}</p>
        </div>
      </div>
    </Card>
  );
};
