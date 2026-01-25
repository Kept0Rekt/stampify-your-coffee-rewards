import { motion } from "framer-motion";
import { MapPin, Crown, Phone, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";

interface StackedCardProps {
  id: string;
  businessName: string;
  category: string;
  logoEmoji: string;
  brandColor?: string;
  currentStamps: number;
  stampsRequired: number;
  lastVisit?: string;
  distance?: string;
  isPremium?: boolean;
  index: number;
  isExpanded: boolean;
  onClick: () => void;
}

export function StackedCard({
  id,
  businessName,
  category,
  logoEmoji,
  brandColor = "#34D399",
  currentStamps,
  stampsRequired,
  lastVisit,
  distance,
  isPremium,
  index,
  isExpanded,
  onClick,
}: StackedCardProps) {
  const isRewardReady = currentStamps >= stampsRequired;
  
  // Calculate stack transforms
  const getStackTransform = () => {
    if (isExpanded) {
      return {
        y: index * 220,
        scale: 1,
        opacity: 1,
        zIndex: 10 - index,
      };
    }
    
    if (index === 0) {
      return { y: 0, scale: 1, opacity: 1, zIndex: 3 };
    }
    if (index === 1) {
      return { y: 56, scale: 0.96, opacity: 1, zIndex: 2 };
    }
    if (index === 2) {
      return { y: 100, scale: 0.92, opacity: 1, zIndex: 1 };
    }
    // Cards beyond 3 are hidden
    return { y: 120, scale: 0.88, opacity: 0, zIndex: 0 };
  };

  const transform = getStackTransform();

  return (
    <motion.div
      layout
      initial={false}
      animate={{
        y: transform.y,
        scale: transform.scale,
        opacity: transform.opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      style={{ zIndex: transform.zIndex }}
      className="absolute inset-x-0"
    >
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="w-full text-left"
      >
        <div 
          className="stacked-card relative h-[200px] rounded-2xl p-5 overflow-hidden"
          style={{
            background: `linear-gradient(180deg, hsl(var(--card)) 0%, hsl(var(--card)) 100%)`,
            boxShadow: `0 ${4 + index * 4}px ${16 + index * 8}px hsla(0, 0%, 0%, ${0.15 + index * 0.05})`,
          }}
        >
          {/* Brand color overlay */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ 
              background: `linear-gradient(135deg, ${brandColor} 0%, transparent 60%)` 
            }}
          />
          
          {/* Content */}
          <div className="relative z-10 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ background: `${brandColor}20` }}
                >
                  {logoEmoji}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg">
                    {businessName}
                  </h3>
                  <p className="text-sm text-muted-foreground">{category}</p>
                </div>
              </div>
              
              {isPremium && (
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  <Crown className="w-3 h-3" />
                  Premium
                </div>
              )}
            </div>

            {/* Stamp Progress */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: stampsRequired }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-5 h-5 rounded-full transition-all duration-300",
                      i < currentStamps
                        ? "bg-primary shadow-sm"
                        : "border-2 border-dashed border-muted-foreground/30"
                    )}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                {isRewardReady ? (
                  <span className="text-primary font-medium">🎁 Reward ready!</span>
                ) : (
                  <>{currentStamps} of {stampsRequired} stamps</>
                )}
              </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-border/30">
              <p className="text-xs text-muted-foreground">
                {lastVisit || "No visits yet"}
              </p>
              {distance && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  {distance}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}
