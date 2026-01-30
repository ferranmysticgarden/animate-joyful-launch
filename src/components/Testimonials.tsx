import { useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Carlos M.",
    location: "Madrid, Spain",
    text: "The Sports Car changed everything. Now my friends know what real status looks like.",
    stars: 5,
    vehicle: "Sports Car"
  },
  {
    name: "Sarah J.",
    location: "New York, USA",
    text: "I bought the Yacht and I've never felt more powerful. This is what success feels like.",
    stars: 5,
    vehicle: "Yacht"
  },
  {
    name: "Mohammed A.",
    location: "Dubai, UAE",
    text: "The Private Jet is the ultimate flex. My followers can't believe it!",
    stars: 5,
    vehicle: "Private Jet"
  },
  {
    name: "Emma W.",
    location: "London, UK",
    text: "Owning a Luxury Island? That's a whole different level of prestige.",
    stars: 5,
    vehicle: "Luxury Island"
  },
  {
    name: "Yuki T.",
    location: "Tokyo, Japan",
    text: "The Mansion is pure elegance. Finally something worthy of my lifestyle.",
    stars: 5,
    vehicle: "Mansion"
  }
];

export const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonial = testimonials[current];

  return (
    <div className="py-6 px-4 bg-black/40 backdrop-blur-sm">
      <div className="max-w-md mx-auto text-center">
        <Quote size={24} className="text-primary/50 mx-auto mb-3" />
        <p className="text-white/90 text-sm italic mb-3">
          "{testimonial.text}"
        </p>
        <div className="flex justify-center gap-1 mb-2">
          {Array.from({ length: testimonial.stars }).map((_, i) => (
            <Star key={i} size={14} className="text-primary fill-primary" />
          ))}
        </div>
        <p className="text-primary font-semibold text-sm">{testimonial.name}</p>
        <p className="text-muted-foreground text-xs">{testimonial.location} • Bought {testimonial.vehicle}</p>
        
        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === current ? 'bg-primary w-4' : 'bg-primary/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
