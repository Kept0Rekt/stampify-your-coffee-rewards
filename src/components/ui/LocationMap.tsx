import { motion } from "framer-motion";
import { Navigation } from "lucide-react";

interface LocationMapProps {
  location?: string;
  coordinates?: string;
  latitude?: number;
  longitude?: number;
  className?: string;
}

// Warm caramel palette to match the premium loyalty card
const CARAMEL = {
  bg: "linear-gradient(135deg, hsl(36 38% 92%) 0%, hsl(34 30% 86%) 100%)",
  border: "1px solid hsla(28, 35%, 55%, 0.35)",
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
};

export function LocationMap({
  location = "San Francisco, CA",
  coordinates = "37.7749° N, 122.4194° W",
  latitude = 37.7749,
  longitude = -122.4194,
  className,
}: LocationMapProps) {
  const handleOpenMaps = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    window.open(mapsUrl, "_blank");
  };

  return (
    <div className={`relative select-none ${className}`}>
      <motion.button
        onClick={handleOpenMaps}
        className="relative w-full overflow-hidden rounded-xl cursor-pointer active:scale-[0.98] transition-transform"
        style={{
          background: CARAMEL.bg,
          border: CARAMEL.border,
          boxShadow:
            "0 4px 14px hsla(26, 44%, 18%, 0.12), inset 0 1px 0 hsla(0,0%,100%,0.5)",
        }}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 160, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
      >
        {/* Map visualization */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <svg
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
          >
            {/* Main horizontal roads */}
            <motion.line
              x1="0%" y1="35%" x2="100%" y2="35%"
              stroke={CARAMEL.road}
              strokeOpacity="0.32"
              strokeWidth="4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <motion.line
              x1="0%" y1="65%" x2="100%" y2="65%"
              stroke={CARAMEL.road}
              strokeOpacity="0.32"
              strokeWidth="4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            {/* Vertical main roads */}
            <motion.line
              x1="30%" y1="0%" x2="30%" y2="100%"
              stroke={CARAMEL.roadLight}
              strokeOpacity="0.28"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
            <motion.line
              x1="70%" y1="0%" x2="70%" y2="100%"
              stroke={CARAMEL.roadLight}
              strokeOpacity="0.28"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            />
            {/* Secondary streets */}
            {[20, 50, 80].map((y, i) => (
              <motion.line
                key={`h-${i}`}
                x1="0%" y1={`${y}%`} x2="100%" y2={`${y}%`}
                stroke={CARAMEL.road}
                strokeOpacity="0.14"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              />
            ))}
            {[15, 45, 55, 85].map((x, i) => (
              <motion.line
                key={`v-${i}`}
                x1={`${x}%`} y1="0%" x2={`${x}%`} y2="100%"
                stroke={CARAMEL.road}
                strokeOpacity="0.14"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
              />
            ))}
          </svg>

          {/* Buildings */}
          {[
            { top: "40%", left: "10%", w: "15%", h: "20%", delay: 0.5 },
            { top: "15%", left: "35%", w: "12%", h: "15%", delay: 0.6 },
            { top: "70%", left: "75%", w: "18%", h: "18%", delay: 0.7 },
            { top: "20%", right: "10%", w: "10%", h: "25%", delay: 0.55 },
            { top: "55%", left: "5%", w: "8%", h: "12%", delay: 0.65 },
            { top: "8%", left: "75%", w: "14%", h: "10%", delay: 0.75 },
          ].map((b, i) => (
            <motion.div
              key={i}
              className="absolute rounded-sm"
              style={{
                top: b.top,
                left: b.left,
                right: b.right,
                width: b.w,
                height: b.h,
                background: CARAMEL.buildingFill,
                border: `1px solid ${CARAMEL.buildingBorder}`,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: b.delay }}
            />
          ))}

          {/* Location pin */}
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
                filter: `drop-shadow(0 2px 8px hsla(26, 44%, 20%, 0.4)) drop-shadow(0 0 10px ${CARAMEL.pin}88)`,
              }}
            >
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                fill={CARAMEL.pin}
              />
              <circle cx="12" cy="9" r="2.5" fill={CARAMEL.pinDot} />
            </svg>
          </motion.div>

          {/* Bottom soft gradient for legibility */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, hsla(36, 38%, 92%, 0.85), transparent 45%)",
            }}
          />
        </motion.div>

        {/* Content overlay */}
        <div className="relative z-10 h-full flex flex-col justify-between p-4">
          {/* Directions chip */}
          <div className="flex justify-end">
            <motion.div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-sm"
              style={{
                background: CARAMEL.accentBg,
                border: `1px solid ${CARAMEL.accent}33`,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Navigation className="w-3 h-3" style={{ color: CARAMEL.accent }} />
              <span
                className="text-[10px] font-semibold"
                style={{ color: CARAMEL.accent }}
              >
                Directions
              </span>
            </motion.div>
          </div>

          <div className="space-y-1">
            <h3
              className="font-semibold text-sm tracking-tight text-left"
              style={{ color: CARAMEL.text }}
            >
              {location}
            </h3>
            <motion.p
              className="text-xs font-mono text-left"
              style={{ color: CARAMEL.textMuted }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.2 }}
            >
              {coordinates}
            </motion.p>
            <motion.div
              className="h-px"
              style={{
                background: `linear-gradient(to right, ${CARAMEL.accent}99, ${CARAMEL.accent}33, transparent)`,
              }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 0.5 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
            />
          </div>
        </div>
      </motion.button>
    </div>
  );
}
