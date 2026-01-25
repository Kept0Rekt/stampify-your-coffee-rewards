import { Phone, Navigation, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BusinessHeaderProps {
  name: string;
  category: string;
  address?: string;
  phone?: string;
  logoEmoji: string;
  brandColor?: string;
  latitude?: number;
  longitude?: number;
}

export function BusinessHeader({
  name,
  category,
  address,
  phone,
  logoEmoji,
  brandColor = "#34D399",
  latitude,
  longitude,
}: BusinessHeaderProps) {
  const handleCall = () => {
    if (phone) {
      window.location.href = `tel:${phone}`;
    }
  };

  const handleDirections = () => {
    if (latitude && longitude) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
      window.open(url, "_blank");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-4">
        <div 
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg"
          style={{ 
            background: `linear-gradient(135deg, ${brandColor}30, ${brandColor}10)`,
            border: `1px solid ${brandColor}40`
          }}
        >
          {logoEmoji}
        </div>
        
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">{name}</h1>
          <p className="text-muted-foreground">{category}</p>
          {address && (
            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {address}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          className="flex-1 rounded-xl"
          onClick={handleCall}
          disabled={!phone}
        >
          <Phone className="w-4 h-4 mr-2" />
          Call
        </Button>
        <Button
          variant="outline"
          className="flex-1 rounded-xl"
          onClick={handleDirections}
          disabled={!latitude || !longitude}
        >
          <Navigation className="w-4 h-4 mr-2" />
          Directions
        </Button>
      </div>
    </div>
  );
}
