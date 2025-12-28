import { useState } from "react";
import { cn } from "@/lib/utils";
import { Coffee, Gift, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LocationMap } from "./LocationMap";

interface LoyaltyCardProps {
  cafeName: string;
  cafeLogoUrl?: string;
  stampsCollected: number;
  stampsRequired: number;
  latitude?: number;
  longitude?: number;
  className?: string;
  onClick?: () => void;
}

export function LoyaltyCard({
  cafeName,
  cafeLogoUrl,
  stampsCollected,
  stampsRequired,
  latitude,
  longitude,
  className,
  onClick,
}: LoyaltyCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isRewardReady = stampsCollected >= stampsRequired;
  const stampsRemaining = stampsRequired - stampsCollected;
  const progress = Math.min((stampsCollected / stampsRequired) * 100, 100);

  // Default coordinates if not provided (for demo purposes)
  const lat = latitude ?? 40.7128;
  const lng = longitude ?? -74.006;

  const handleClick = () => {
    setIsExpanded(!isExpanded);
    onClick?.();
  };

  return (
    <motion.div
      layout
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "w-full rounded-2xl",
        "bg-[hsl(35,28%,93%)]",
        "border-[0.5px] border-[hsla(35,15%,80%,0.5)]",
        "shadow-soft",
        "transition-shadow duration-200",
        "hover:shadow-elevated",
        isRewardReady && "ring-1 ring-primary/20",
        className
      )}
    >
      <motion.button
        onClick={handleClick}
        className="w-full text-left p-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded-2xl"
      >
        {/* Top Row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5 min-w-0 flex-1">
            {cafeLogoUrl ? (
              <img
                src={cafeLogoUrl}
                alt={cafeName}
                className="w-11 h-11 rounded-[12px] object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-11 h-11 rounded-[12px] bg-primary/8 flex items-center justify-center flex-shrink-0">
                <Coffee className="w-5 h-5 text-primary" />
              </div>
            )}
            <div className="min-w-0">
              <h3 className="font-medium text-foreground text-base truncate">
                {cafeName}
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                {isRewardReady ? (
                  <span className="text-primary font-medium">Reward ready</span>
                ) : (
                  `${stampsRemaining} more to go`
                )}
              </p>
            </div>
          </div>
          
          {isRewardReady ? (
            <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
              <Gift className="w-3.5 h-3.5" />
              Claim
            </span>
          ) : (
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0 mt-3"
            >
              <ChevronDown className="w-5 h-5 text-muted-foreground/40" />
            </motion.div>
          )}
        </div>

        {/* Stamps Grid */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: stampsRequired }).map((_, index) => {
            const isCollected = index < stampsCollected;
            return (
              <div
                key={index}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200",
                  isCollected 
                    ? "bg-primary shadow-sm" 
                    : "border border-border bg-background/60"
                )}
              >
                {isCollected && (
                  <Coffee className="w-3.5 h-3.5 text-primary-foreground" />
                )}
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="mt-5">
          <div className="h-1 rounded-full bg-border/50 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
              className={cn(
                "h-full rounded-full",
                isRewardReady ? "bg-primary" : "bg-primary/70"
              )}
            />
          </div>
          <p className="text-xs text-muted-foreground/60 mt-2.5 text-center font-medium tabular-nums">
            {stampsCollected} of {stampsRequired}
          </p>
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
            <div className="px-5 pb-5 pt-2 border-t border-border/30">
              <LocationMap
                cafeName={cafeName}
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
