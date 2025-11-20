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
        <img
          src={image}
          alt={name}
          className="w-32 h-32 object-contain"
        />
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-primary mb-2">{name}</h3>
          <p className="text-xl text-muted-foreground font-semibold">{price}</p>
        </div>
      </div>
    </Card>
  );
};
