import { MapPin } from "lucide-react";

interface LocationMapProps {
  cafeName: string;
  latitude: number;
  longitude: number;
}

export function LocationMap({ cafeName, latitude, longitude }: LocationMapProps) {
  // Generate a static map preview using OpenStreetMap tiles
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.005}%2C${latitude - 0.003}%2C${longitude + 0.005}%2C${latitude + 0.003}&layer=mapnik&marker=${latitude}%2C${longitude}`;
  
  const openInMaps = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
      "_blank"
    );
  };

  return (
    <div className="w-full">
      {/* Map Container */}
      <div className="relative w-full h-40 rounded-xl overflow-hidden bg-muted">
        <iframe
          src={mapUrl}
          className="w-full h-full border-0"
          title={`Map showing ${cafeName} location`}
          loading="lazy"
        />
        
        {/* Overlay for click handling */}
        <button
          onClick={openInMaps}
          className="absolute inset-0 bg-transparent hover:bg-foreground/5 transition-colors cursor-pointer"
          aria-label={`Open ${cafeName} in maps`}
        />
      </div>
      
      {/* Location Info */}
      <button
        onClick={openInMaps}
        className="flex items-center gap-2 mt-3 px-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
        <span className="truncate">Get directions to {cafeName}</span>
      </button>
    </div>
  );
}
