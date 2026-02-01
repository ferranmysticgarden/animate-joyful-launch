import { useState, useEffect } from "react";
import { ShoppingCart, X } from "lucide-react";

const fakeNames = [
  "Carlos M.", "María L.", "Juan P.", "Ana S.", "Pedro R.",
  "Laura G.", "Diego F.", "Sofia T.", "Miguel A.", "Elena V.",
  "Roberto H.", "Carmen D.", "Fernando B.", "Isabel N.", "Alejandro C.",
  "John S.", "Emma W.", "Michael B.", "Sarah J.", "David L.",
  "Mohammed A.", "Yuki T.", "Hans M.", "François D.", "Giovanni R."
];

const fakeCities = [
  "Madrid", "Barcelona", "Miami", "New York", "London",
  "Paris", "Dubai", "Tokyo", "Berlin", "Rome",
  "Los Angeles", "Chicago", "Sydney", "Toronto", "Singapore"
];

const vehicles = [
  { name: "Sports Car", level: 1 },
  { name: "Yacht", level: 2 },
  { name: "Helicopter", level: 3 },
  { name: "Private Jet", level: 4 },
  { name: "Mansion", level: 5 },
  { name: "Luxury Island", level: 6 },
];

export const PurchaseNotification = () => {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ name: "", city: "", vehicle: "" });

  useEffect(() => {
    const showNotification = () => {
      const name = fakeNames[Math.floor(Math.random() * fakeNames.length)];
      const city = fakeCities[Math.floor(Math.random() * fakeCities.length)];
      const vehicle = vehicles[Math.floor(Math.random() * vehicles.length)];
      
      setNotification({ name, city, vehicle: vehicle.name });
      setShow(true);
      
      setTimeout(() => setShow(false), 4000);
    };

    // First notification after 5-10 seconds
    const initialDelay = 5000 + Math.random() * 5000;
    const initialTimer = setTimeout(showNotification, initialDelay);

    // Subsequent notifications every 15-30 seconds
    const interval = setInterval(() => {
      showNotification();
    }, 15000 + Math.random() * 15000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed top-28 left-4 z-20 animate-[slide-in-right_0.5s_ease-out] max-w-[220px] pointer-events-none">
      <div className="pointer-events-auto bg-background/90 backdrop-blur-sm border border-primary/30 rounded-lg p-3" style={{ boxShadow: "var(--shadow-elite)" }}>
        <button 
          onClick={() => setShow(false)}
          className="absolute -top-2 -right-2 bg-background/80 rounded-full p-1 border border-primary/30"
        >
          <X size={12} className="text-primary" />
        </button>
        <div className="flex items-center gap-3">
          <div className="bg-primary/20 rounded-full p-2">
            <ShoppingCart size={20} className="text-primary" />
          </div>
          <div className="text-sm">
            <p className="text-secondary-foreground font-semibold">{notification.name}</p>
            <p className="text-primary/80 text-xs">
              from {notification.city} just bought
            </p>
            <p className="text-primary font-bold">{notification.vehicle} 🎉</p>
          </div>
        </div>
        <p className="text-[10px] text-muted-foreground mt-2 text-center">
          A few seconds ago
        </p>
      </div>
    </div>
  );
};
