import { motion } from "framer-motion";
import { Check, Gift } from "lucide-react";
import { cn } from "@/lib/utils";

interface StampGridProps {
  currentStamps: number;
  stampsRequired: number;
  size?: "sm" | "md" | "lg";
  showLabels?: boolean;
  animated?: boolean;
}

const sizeConfig = {
  sm: { circle: "w-8 h-8", icon: "w-4 h-4", gap: "gap-2" },
  md: { circle: "w-10 h-10", icon: "w-5 h-5", gap: "gap-2.5" },
  lg: { circle: "w-12 h-12", icon: "w-6 h-6", gap: "gap-3" },
};

export function StampGrid({
  currentStamps,
  stampsRequired,
  size = "md",
  showLabels = false,
  animated = true,
}: StampGridProps) {
  const config = sizeConfig[size];
  const isComplete = currentStamps >= stampsRequired;
  
  // Calculate grid columns based on stamps required
  const columns = stampsRequired <= 7 ? stampsRequired : 5;

  return (
    <div className="space-y-3">
      <div 
        className={cn("flex flex-wrap", config.gap)}
        style={{ maxWidth: `${columns * (size === "lg" ? 60 : size === "md" ? 50 : 40)}px` }}
      >
        {Array.from({ length: stampsRequired }).map((_, index) => {
          const isFilled = index < currentStamps;
          const isLast = index === stampsRequired - 1;
          
          return (
            <motion.div
              key={index}
              initial={animated ? { scale: 0.8, opacity: 0 } : false}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: animated ? index * 0.05 : 0, type: "spring", stiffness: 400 }}
              className={cn(
                config.circle,
                "rounded-full flex items-center justify-center transition-all duration-300",
                isFilled 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "border-2 border-dashed border-muted-foreground/30 bg-transparent",
                isLast && !isFilled && "border-primary/50 bg-primary/5"
              )}
            >
              {isFilled ? (
                <motion.div
                  initial={animated ? { scale: 0 } : false}
                  animate={{ scale: 1 }}
                  transition={{ delay: animated ? index * 0.05 + 0.1 : 0, type: "spring" }}
                >
                  <Check className={config.icon} strokeWidth={3} />
                </motion.div>
              ) : isLast ? (
                <Gift className={cn(config.icon, "text-primary/50")} />
              ) : (
                <span className="text-muted-foreground/40 text-xs font-medium">
                  {index + 1}
                </span>
              )}
            </motion.div>
          );
        })}
      </div>
      
      {showLabels && (
        <p className="text-sm text-muted-foreground">
          {isComplete ? (
            <span className="text-primary font-medium">
              🎉 Reward unlocked! Show code to redeem.
            </span>
          ) : (
            <>
              <span className="font-medium text-foreground">{currentStamps}</span>
              {" "}of{" "}
              <span className="font-medium text-foreground">{stampsRequired}</span>
              {" "}stamps collected
            </>
          )}
        </p>
      )}
    </div>
  );
}
