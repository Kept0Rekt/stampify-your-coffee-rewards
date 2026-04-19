import { cn } from "@/lib/utils";
import { Coffee, Gift, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LocationMap } from "./LocationMap";
import stampifyLogo from "@/assets/stampify-logo.png";

interface LoyaltyCardProps {
  cafeName: string;
  cafeLogoUrl?: string;
  stampsCollected: number;
  stampsRequired: number;
  latitude?: number;
  longitude?: number;
  className?: string;
  isExpanded?: boolean;
  onToggle?: () => void;
}

// Helper to convert decimal coordinates to DMS format
function formatCoordinates(lat: number, lng: number): string {
  const latDir = lat >= 0 ? "N" : "S";
  const lngDir = lng >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(4)}° ${latDir}, ${Math.abs(lng).toFixed(4)}° ${lngDir}`;
}

export function LoyaltyCard({
  cafeName,
  cafeLogoUrl,
  stampsCollected,
  stampsRequired,
  latitude,
  longitude,
  className,
  isExpanded = false,
  onToggle,
}: LoyaltyCardProps) {
  const isRewardReady = stampsCollected >= stampsRequired;

  // Default coordinates if not provided
  const lat = latitude ?? 40.7128;
  const lng = longitude ?? -74.006;
  const coordinates = formatCoordinates(lat, lng);

  // Stamp grid layout — 5 columns for 10 stamps, otherwise the count itself
  const columns = stampsRequired === 10 ? 5 : Math.min(stampsRequired, 7);

  const handleClick = () => {
    onToggle?.();
  };

  return (
    <motion.div
      layout
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn("w-full", className)}
    >
      <motion.button
        onClick={handleClick}
        className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-2xl"
      >
        {/* Credit-card */}
        <div
          className="relative w-full overflow-hidden rounded-2xl"
          style={{
            background:
              "linear-gradient(135deg, hsl(38 52% 54%) 0%, hsl(32 48% 46%) 50%, hsl(26 44% 38%) 100%)",
            border: "1px solid hsla(0,0%,100%,0.30)",
            boxShadow: "0 10px 30px hsla(32, 48%, 28%, 0.35)",
            aspectRatio: "1.586 / 1",
          }}
        >
          {/* Top edge highlight */}
          <div
            className="absolute inset-x-0 top-0"
            style={{
              height: 1,
              background:
                "linear-gradient(90deg, transparent, hsla(0,0%,100%,0.4), transparent)",
            }}
          />

          {/* Decorative circle (bottom-right) */}
          <div
            style={{
              position: "absolute",
              bottom: -40,
              right: -40,
              width: 160,
              height: 160,
              borderRadius: "50%",
              background: "hsla(0,0%,100%,0.06)",
            }}
          />

          {/* Content */}
          <div className="relative h-full flex flex-col justify-between p-5 sm:p-6">
            {/* Top Row: Cafe (left) + Stampify (right) */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                {cafeLogoUrl ? (
                  <img
                    src={cafeLogoUrl}
                    alt={cafeName}
                    className="w-9 h-9 rounded-full object-cover flex-shrink-0 ring-1 ring-white/40"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-white/15 ring-1 ring-white/40 flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                    <Coffee className="w-4 h-4 text-white" />
                  </div>
                )}
                <span
                  className="font-semibold text-white text-base truncate"
                  style={{
                    textShadow: "0 1px 2px hsla(26, 44%, 20%, 0.4)",
                  }}
                >
                  {cafeName}
                </span>
              </div>

              <img
                src={stampifyLogo}
                alt="Stampify"
                style={{
                  height: 26,
                  width: "auto",
                  objectFit: "contain",
                  filter:
                    "drop-shadow(0 1px 4px hsla(26, 44%, 20%, 0.5)) drop-shadow(0 0 1px hsla(0,0%,0%,0.25))",
                }}
                className="flex-shrink-0"
              />
            </div>

            {/* Bottom Row: Stamps grid (left) + counter / claim (right) */}
            <div className="flex items-end justify-between gap-3">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${columns}, 18px)`,
                  gap: 8,
                  rowGap: 6,
                }}
              >
                {Array.from({ length: stampsRequired }).map((_, i) => {
                  const filled = i < stampsCollected;
                  return (
                    <div
                      key={i}
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        background: filled
                          ? "hsla(0,0%,100%,0.92)"
                          : "hsla(0,0%,100%,0.10)",
                        border: filled
                          ? "1.5px solid hsla(0,0%,100%,0.75)"
                          : "1.5px solid hsla(0,0%,100%,0.22)",
                        boxShadow: filled
                          ? "0 2px 5px hsla(32,48%,20%,0.25), inset 0 1px 0 hsla(0,0%,100%,0.6)"
                          : "none",
                      }}
                    />
                  );
                })}
              </div>

              <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                {isRewardReady ? (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[hsl(26,44%,38%)] text-xs font-semibold shadow-sm">
                    <Gift className="w-3.5 h-3.5" />
                    Claim
                  </span>
                ) : (
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4 text-white/60" />
                  </motion.div>
                )}
                <div className="flex items-baseline gap-0.5 tabular-nums">
                  <span
                    className="text-white font-bold leading-none"
                    style={{ fontSize: 18 }}
                  >
                    {stampsCollected}
                  </span>
                  <span
                    className="text-white/55 font-medium leading-none"
                    style={{ fontSize: 11 }}
                  >
                    / {stampsRequired}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.button>

      {/* Expandable Map Section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="px-1 pt-3">
              <LocationMap
                location={cafeName}
                coordinates={coordinates}
                latitude={lat}
                longitude={lng}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
