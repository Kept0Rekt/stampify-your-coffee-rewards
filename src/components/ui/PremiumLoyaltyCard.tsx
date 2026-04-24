import { cn } from "@/lib/utils";
import { Coffee, Gift, ChevronDown, Navigation } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import stampifyLogo from "@/assets/stampify-logo.png";
import { useRef, useState, useLayoutEffect, useEffect } from "react";

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

const MAP = {
  bg: "linear-gradient(135deg, hsl(36 38% 92%) 0%, hsl(34 30% 86%) 100%)",
  road: "hsl(28 30% 35%)",
  roadLight: "hsl(28 25% 45%)",
  buildingFill: "hsla(28, 35%, 50%, 0.28)",
  buildingBorder: "hsla(28, 40%, 35%, 0.35)",
  pin: "hsl(28 60% 42%)",
  pinDot: "hsl(36 60% 92%)",
  text: "hsl(26 44% 22%)",
  textMuted: "hsl(28 30% 38%)",
  accent: "hsl(28 60% 42%)",
  accentBg: "hsla(28, 60%, 42%, 0.14)",
  accentBorder: "hsla(28, 60%, 42%, 0.2)",
};

const BUILDINGS: { top: string; left?: string; right?: string; w: string; h: string; delay: number }[] = [
  { top: "40%", left: "10%", w: "15%", h: "20%", delay: 0.5 },
  { top: "15%", left: "35%", w: "12%", h: "15%", delay: 0.6 },
  { top: "70%", left: "75%", w: "18%", h: "18%", delay: 0.7 },
  { top: "20%", right: "10%", w: "10%", h: "25%", delay: 0.55 },
  { top: "55%", left: "5%", w: "8%", h: "12%", delay: 0.65 },
  { top: "8%", left: "75%", w: "14%", h: "10%", delay: 0.75 },
];

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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);

  useLayoutEffect(() => {
    if (wrapperRef.current) {
      setCardWidth(wrapperRef.current.getBoundingClientRect().width);
    }
  }, []);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const ro = new ResizeObserver(([entry]) => setCardWidth(entry.contentRect.width));
    ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, []);

  const isRewardReady = stampsCollected >= stampsRequired;
  const lat = latitude ?? 40.7128;
  const lng = longitude ?? -74.006;
  const coordinates = formatCoordinates(lat, lng);
  const columns = stampsRequired === 10 ? 5 : Math.min(stampsRequired, 7);

  const collapsedHeight = cardWidth > 0 ? Math.round(cardWidth / 1.78) : 200;
  const expandedHeight = 230;

  const handleDirections = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, "_blank");
  };

  return (
    <div ref={wrapperRef} className={cn("w-full max-w-[420px] mx-auto", className)}>
      <motion.button
        onClick={() => onToggle?.()}
        whileTap={{ scale: 0.985 }}
        className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-[20px]"
      >
        <motion.div
          animate={{ height: isExpanded ? expandedHeight : collapsedHeight }}
          transition={{ type: "spring", stiffness: 380, damping: 34 }}
          className="relative w-full overflow-hidden rounded-[20px]"
          style={{
            boxShadow: isExpanded
              ? "0 4px 14px hsla(26,44%,18%,0.12), inset 0 1px 0 hsla(0,0%,100%,0.5)"
              : "0 1px 0 hsla(0,0%,100%,0.35) inset, 0 -1px 0 hsla(26,44%,15%,0.4) inset, 0 14px 32px hsla(26,44%,15%,0.4), 0 4px 10px hsla(26,44%,15%,0.25)",
          }}
        >
          {/* ── Map background ── */}
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.35 }}
            style={{ background: MAP.bg }}
          />

          {/* ── Metal card background layers ── */}
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: isExpanded ? 0 : 1 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, hsl(38 58% 62%) 0%, hsl(34 52% 52%) 22%, hsl(28 48% 40%) 48%, hsl(32 50% 46%) 72%, hsl(38 56% 58%) 100%)",
              }}
            />
            <div
              className="absolute inset-0 mix-blend-overlay opacity-30"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, hsla(0,0%,100%,0.06) 0px, hsla(0,0%,100%,0.06) 1px, transparent 1px, transparent 3px)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(115deg, hsla(0,0%,100%,0.28) 0%, hsla(0,0%,100%,0.12) 18%, transparent 38%, transparent 62%, hsla(0,0%,100%,0.06) 82%, hsla(0,0%,100%,0.18) 100%)",
              }}
            />
            <div
              className="absolute"
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
            <div
              className="absolute"
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
            <div
              className="absolute inset-x-0 top-0"
              style={{
                height: 1,
                background:
                  "linear-gradient(90deg, transparent, hsla(0,0%,100%,0.55), transparent)",
              }}
            />
            <div
              className="absolute inset-x-0 bottom-0"
              style={{
                height: 1,
                background:
                  "linear-gradient(90deg, transparent, hsla(26,44%,10%,0.45), transparent)",
              }}
            />
            <div
              className="absolute inset-0 rounded-[20px]"
              style={{ border: "1px solid hsla(0,0%,100%,0.22)" }}
            />
          </motion.div>

          {/* ── Map visualization ── */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <svg
                  className="absolute inset-0 w-full h-full"
                  preserveAspectRatio="none"
                >
                  <motion.line x1="0%" y1="35%" x2="100%" y2="35%" stroke={MAP.road} strokeOpacity="0.32" strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.2 }} />
                  <motion.line x1="0%" y1="65%" x2="100%" y2="65%" stroke={MAP.road} strokeOpacity="0.32" strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.3 }} />
                  <motion.line x1="30%" y1="0%" x2="30%" y2="100%" stroke={MAP.roadLight} strokeOpacity="0.28" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.4 }} />
                  <motion.line x1="70%" y1="0%" x2="70%" y2="100%" stroke={MAP.roadLight} strokeOpacity="0.28" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.5 }} />
                  {[20, 50, 80].map((y, i) => (
                    <motion.line key={`h-${i}`} x1="0%" y1={`${y}%`} x2="100%" y2={`${y}%`} stroke={MAP.road} strokeOpacity="0.14" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }} />
                  ))}
                  {[15, 45, 55, 85].map((x, i) => (
                    <motion.line key={`v-${i}`} x1={`${x}%`} y1="0%" x2={`${x}%`} y2="100%" stroke={MAP.road} strokeOpacity="0.14" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }} />
                  ))}
                </svg>

                {BUILDINGS.map((b, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-sm"
                    style={{
                      top: b.top,
                      left: b.left,
                      right: b.right,
                      width: b.w,
                      height: b.h,
                      background: MAP.buildingFill,
                      border: `1px solid ${MAP.buildingBorder}`,
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: b.delay }}
                  />
                ))}

                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  initial={{ scale: 0, y: -20 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.3 }}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{
                      filter: `drop-shadow(0 2px 8px hsla(26,44%,20%,0.4)) drop-shadow(0 0 10px ${MAP.pin}88)`,
                    }}
                  >
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                      fill={MAP.pin}
                    />
                    <circle cx="12" cy="9" r="2.5" fill={MAP.pinDot} />
                  </svg>
                </motion.div>

                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, hsla(36,38%,92%,0.85), transparent 45%)",
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Card content (stamps) — fades out on expand ── */}
          <AnimatePresence>
            {!isExpanded && (
              <motion.div
                key="card-content"
                className="absolute inset-0 flex flex-col px-4 py-3 sm:px-5 sm:py-3.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Top row */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    {cafeLogoUrl ? (
                      <img
                        src={cafeLogoUrl}
                        alt={cafeName}
                        className="w-7 h-7 rounded-full object-cover flex-shrink-0 ring-1 ring-white/50"
                        style={{
                          boxShadow:
                            "0 2px 6px hsla(26,44%,15%,0.35), inset 0 1px 0 hsla(0,0%,100%,0.4)",
                        }}
                      />
                    ) : (
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          background:
                            "linear-gradient(135deg, hsla(0,0%,100%,0.28), hsla(0,0%,100%,0.08))",
                          border: "1px solid hsla(0,0%,100%,0.45)",
                          boxShadow:
                            "0 2px 6px hsla(26,44%,15%,0.35), inset 0 1px 0 hsla(0,0%,100%,0.4)",
                        }}
                      >
                        <Coffee className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                    <span
                      className="font-semibold text-white text-sm truncate tracking-tight"
                      style={{
                        textShadow:
                          "0 1px 2px hsla(26,44%,15%,0.55), 0 0 1px hsla(0,0%,0%,0.2)",
                      }}
                    >
                      {cafeName}
                    </span>
                  </div>
                  <img
                    src={stampifyLogo}
                    alt="Stampify"
                    style={{
                      height: 22,
                      width: "auto",
                      objectFit: "contain",
                      filter:
                        "drop-shadow(0 1px 4px hsla(26,44%,15%,0.55)) drop-shadow(0 0 1px hsla(0,0%,0%,0.3))",
                    }}
                    className="flex-shrink-0"
                  />
                </div>

                {/* Stamps grid */}
                <div className="flex-1 flex items-center justify-center my-2">
                  <div
                    className="w-full h-full"
                    style={{
                      display: "grid",
                      gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                      gap: "3%",
                      rowGap: "6px",
                      placeItems: "center",
                    }}
                  >
                    {Array.from({ length: stampsRequired }).map((_, i) => {
                      const filled = i < stampsCollected;
                      return (
                        <div
                          key={i}
                          className="relative aspect-square w-full"
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

                {/* Bottom row */}
                <div className="flex items-center justify-between">
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
                    <ChevronDown className="w-4 h-4 text-white/70" />
                  )}
                  <div
                    className="flex items-baseline gap-0.5 tabular-nums"
                    style={{ textShadow: "0 1px 2px hsla(26,44%,15%,0.5)" }}
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
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Map content overlay — fades in on expand ── */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                key="map-overlay"
                className="relative z-10 h-full flex flex-col justify-between p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, delay: 0.15 }}
              >
                <div className="flex justify-end">
                  <motion.button
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-sm"
                    style={{
                      background: MAP.accentBg,
                      border: `1px solid ${MAP.accentBorder}`,
                    }}
                    onClick={handleDirections}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    <Navigation
                      className="w-3 h-3"
                      style={{ color: MAP.accent }}
                    />
                    <span
                      className="text-[10px] font-semibold"
                      style={{ color: MAP.accent }}
                    >
                      Directions
                    </span>
                  </motion.button>
                </div>

                <div className="space-y-1">
                  <h3
                    className="font-semibold text-sm tracking-tight text-left"
                    style={{ color: MAP.text }}
                  >
                    {cafeName}
                  </h3>
                  <motion.p
                    className="text-xs font-mono text-left"
                    style={{ color: MAP.textMuted }}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: 0.2 }}
                  >
                    {coordinates}
                  </motion.p>
                  <motion.div
                    className="h-px"
                    style={{
                      background: `linear-gradient(to right, ${MAP.accent}99, ${MAP.accent}33, transparent)`,
                    }}
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 0.5 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.button>
    </div>
  );
}
