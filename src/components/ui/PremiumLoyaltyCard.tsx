import { cn } from "@/lib/utils";
import { Coffee, Gift, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LocationMap } from "./LocationMap";
import stampifyLogo from "@/assets/stampify-logo.png";

interface PremiumLoyaltyCardProps {
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

function formatCoordinates(lat: number, lng: number): string {
  const latDir = lat >= 0 ? "N" : "S";
  const lngDir = lng >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(4)}° ${latDir}, ${Math.abs(lng).toFixed(4)}° ${lngDir}`;
}

export function PremiumLoyaltyCard({
  cafeName,
  cafeLogoUrl,
  stampsCollected,
  stampsRequired,
  latitude,
  longitude,
  className,
  isExpanded = false,
  onToggle,
}: PremiumLoyaltyCardProps) {
  const isRewardReady = stampsCollected >= stampsRequired;

  const lat = latitude ?? 40.7128;
  const lng = longitude ?? -74.006;
  const coordinates = formatCoordinates(lat, lng);

  // Stamp grid — 5 columns for 10 stamps, otherwise the count itself
  const columns = stampsRequired === 10 ? 5 : Math.min(stampsRequired, 7);

  return (
    <motion.div
      layout
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn("w-full max-w-[420px] mx-auto", className)}
    >
      <motion.button
        onClick={() => onToggle?.()}
        whileTap={{ scale: 0.985 }}
        className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-[20px]"
      >
        {/* Premium metal credit card */}
        <div
          className="relative w-full overflow-hidden rounded-[20px]"
          style={{
            aspectRatio: "1.78 / 1",
            // Multi-stop brushed-metal caramel gradient
            background:
              "linear-gradient(135deg, hsl(38 58% 62%) 0%, hsl(34 52% 52%) 22%, hsl(28 48% 40%) 48%, hsl(32 50% 46%) 72%, hsl(38 56% 58%) 100%)",
            boxShadow:
              "0 1px 0 hsla(0,0%,100%,0.35) inset, 0 -1px 0 hsla(26,44%,15%,0.4) inset, 0 14px 32px hsla(26, 44%, 15%, 0.4), 0 4px 10px hsla(26, 44%, 15%, 0.25)",
          }}
        >
          {/* Brushed metal texture — vertical fine lines */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, hsla(0,0%,100%,0.06) 0px, hsla(0,0%,100%,0.06) 1px, transparent 1px, transparent 3px)",
            }}
          />

          {/* Diagonal sheen — top-left highlight */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(115deg, hsla(0,0%,100%,0.28) 0%, hsla(0,0%,100%,0.12) 18%, transparent 38%, transparent 62%, hsla(0,0%,100%,0.06) 82%, hsla(0,0%,100%,0.18) 100%)",
            }}
          />

          {/* Soft radial glare — top-left */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "-30%",
              left: "-10%",
              width: "70%",
              height: "120%",
              background:
                "radial-gradient(ellipse at center, hsla(0,0%,100%,0.25) 0%, hsla(0,0%,100%,0.08) 35%, transparent 65%)",
              filter: "blur(12px)",
            }}
          />

          {/* Bottom-right deep shadow for depth */}
          <div
            className="absolute pointer-events-none"
            style={{
              bottom: "-40%",
              right: "-20%",
              width: "80%",
              height: "120%",
              background:
                "radial-gradient(ellipse at center, hsla(26,44%,12%,0.35) 0%, transparent 60%)",
              filter: "blur(14px)",
            }}
          />

          {/* Top edge highlight */}
          <div
            className="absolute inset-x-0 top-0 pointer-events-none"
            style={{
              height: 1,
              background:
                "linear-gradient(90deg, transparent, hsla(0,0%,100%,0.55), transparent)",
            }}
          />
          {/* Bottom edge dark line */}
          <div
            className="absolute inset-x-0 bottom-0 pointer-events-none"
            style={{
              height: 1,
              background:
                "linear-gradient(90deg, transparent, hsla(26,44%,10%,0.45), transparent)",
            }}
          />
          {/* Inner border ring */}
          <div
            className="absolute inset-0 rounded-[22px] pointer-events-none"
            style={{
              border: "1px solid hsla(0,0%,100%,0.22)",
            }}
          />

          {/* Content layout */}
          <div className="relative h-full flex flex-col p-5 sm:p-6">
            {/* Top Row: Cafe (left) + Stampify (right) */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                {cafeLogoUrl ? (
                  <img
                    src={cafeLogoUrl}
                    alt={cafeName}
                    className="w-9 h-9 rounded-full object-cover flex-shrink-0 ring-1 ring-white/50"
                    style={{
                      boxShadow:
                        "0 2px 6px hsla(26,44%,15%,0.35), inset 0 1px 0 hsla(0,0%,100%,0.4)",
                    }}
                  />
                ) : (
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, hsla(0,0%,100%,0.28), hsla(0,0%,100%,0.08))",
                      border: "1px solid hsla(0,0%,100%,0.45)",
                      boxShadow:
                        "0 2px 6px hsla(26,44%,15%,0.35), inset 0 1px 0 hsla(0,0%,100%,0.4)",
                    }}
                  >
                    <Coffee className="w-4 h-4 text-white" />
                  </div>
                )}
                <span
                  className="font-semibold text-white text-base truncate tracking-tight"
                  style={{
                    textShadow:
                      "0 1px 2px hsla(26, 44%, 15%, 0.55), 0 0 1px hsla(0,0%,0%,0.2)",
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
                    "drop-shadow(0 1px 4px hsla(26, 44%, 15%, 0.55)) drop-shadow(0 0 1px hsla(0,0%,0%,0.3))",
                }}
                className="flex-shrink-0"
              />
            </div>

            {/* Stamps grid — fills the entire card area below header */}
            <div className="flex-1 flex items-center justify-center mt-3">
              <div
                className="w-full"
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                  gap: "6%",
                  rowGap: "10px",
                  placeItems: "center",
                }}
              >
                {Array.from({ length: stampsRequired }).map((_, i) => {
                  const filled = i < stampsCollected;
                  return (
                    <div
                      key={i}
                      className="relative aspect-square w-full max-w-[44px]"
                      style={{
                        borderRadius: "50%",
                        background: filled
                          ? "radial-gradient(circle at 35% 30%, hsla(0,0%,100%,1) 0%, hsla(0,0%,96%,0.95) 50%, hsla(0,0%,82%,0.9) 100%)"
                          : "hsla(0,0%,100%,0.08)",
                        border: filled
                          ? "1.5px solid hsla(0,0%,100%,0.85)"
                          : "1.5px dashed hsla(0,0%,100%,0.32)",
                        boxShadow: filled
                          ? "0 3px 8px hsla(26,44%,15%,0.35), inset 0 1px 0 hsla(0,0%,100%,0.9), inset 0 -1px 2px hsla(26,44%,15%,0.15)"
                          : "inset 0 1px 2px hsla(26,44%,15%,0.15)",
                      }}
                    >
                      {filled && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Coffee
                            className="w-1/2 h-1/2"
                            style={{ color: "hsl(28 48% 40%)" }}
                            strokeWidth={2.2}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom row: counter only (decorative circle removed) */}
            <div className="flex items-center justify-between mt-3">
              {isRewardReady ? (
                <span
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    background:
                      "linear-gradient(135deg, hsla(0,0%,100%,0.98), hsla(0,0%,90%,0.95))",
                    color: "hsl(26, 44%, 30%)",
                    boxShadow:
                      "0 2px 6px hsla(26,44%,15%,0.3), inset 0 1px 0 hsla(0,0%,100%,1)",
                  }}
                >
                  <Gift className="w-3.5 h-3.5" />
                  Claim
                </span>
              ) : (
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4 text-white/70" />
                </motion.div>
              )}
              <div
                className="flex items-baseline gap-0.5 tabular-nums"
                style={{
                  textShadow: "0 1px 2px hsla(26,44%,15%,0.5)",
                }}
              >
                <span
                  className="text-white font-bold leading-none"
                  style={{ fontSize: 18 }}
                >
                  {stampsCollected}
                </span>
                <span
                  className="text-white/65 font-medium leading-none"
                  style={{ fontSize: 11 }}
                >
                  / {stampsRequired}
                </span>
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
