import { cn } from "@/lib/utils";
import { Coffee, Gift, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface LoyaltyCardProps {
  cafeName: string;
  cafeLogoUrl?: string;
  stampsCollected: number;
  stampsRequired: number;
  className?: string;
  onClick?: () => void;
}

export function LoyaltyCard({
  cafeName,
  cafeLogoUrl,
  stampsCollected,
  stampsRequired,
  className,
  onClick,
}: LoyaltyCardProps) {
  const isRewardReady = stampsCollected >= stampsRequired;
  const stampsRemaining = stampsRequired - stampsCollected;
  const progress = Math.min((stampsCollected / stampsRequired) * 100, 100);

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.995 }}
      className={cn(
        "cursor-pointer rounded-2xl p-5 transition-shadow duration-200",
        "bg-[hsl(32,29%,87%)]",
        "shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]",
        isRewardReady && "ring-1 ring-primary/25",
        className
      )}
    >
      {/* Top Row: Café Info + Action */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {cafeLogoUrl ? (
            <img
              src={cafeLogoUrl}
              alt={cafeName}
              className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
            />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0">
              <Coffee className="w-4 h-4 text-primary" />
            </div>
          )}
          <div className="min-w-0">
            <h3 className="font-medium text-foreground text-[15px] truncate">
              {cafeName}
            </h3>
            <p className="text-[13px] text-muted-foreground mt-0.5">
              {isRewardReady ? (
                <span className="text-primary font-medium">Reward ready</span>
              ) : (
                `${stampsRemaining} stamp${stampsRemaining !== 1 ? 's' : ''} to go`
              )}
            </p>
          </div>
        </div>
        
        {isRewardReady ? (
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium transition-colors hover:bg-primary/90">
            <Gift className="w-3 h-3" />
            Claim
          </button>
        ) : (
          <ChevronRight className="w-4 h-4 text-muted-foreground/50 flex-shrink-0 mt-3" />
        )}
      </div>

      {/* Stamps Grid */}
      <div className="mt-5 flex items-center justify-center gap-2.5">
        {Array.from({ length: stampsRequired }).map((_, index) => {
          const isCollected = index < stampsCollected;
          return (
            <div
              key={index}
              className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200",
                isCollected 
                  ? "bg-primary shadow-[0_2px_8px_rgba(var(--primary-rgb),0.25)]" 
                  : "border border-border/60 bg-background/50"
              )}
            >
              {isCollected && (
                <Coffee className="w-3 h-3 text-primary-foreground" />
              )}
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="h-1 rounded-full bg-border/40 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className={cn(
              "h-full rounded-full",
              isRewardReady ? "bg-primary" : "bg-primary/70"
            )}
          />
        </div>
        <p className="text-[11px] text-muted-foreground/70 mt-2 text-center font-medium">
          {stampsCollected}/{stampsRequired}
        </p>
      </div>
    </motion.div>
  );
}
