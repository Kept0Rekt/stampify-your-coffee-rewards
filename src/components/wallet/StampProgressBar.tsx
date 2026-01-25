import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StampProgressBarProps {
  currentStamps: number;
  stampsRequired: number;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeConfig = {
  sm: { height: "h-2", text: "text-xs" },
  md: { height: "h-3", text: "text-sm" },
  lg: { height: "h-4", text: "text-base" },
};

export function StampProgressBar({
  currentStamps,
  stampsRequired,
  showText = true,
  size = "md",
  className,
}: StampProgressBarProps) {
  const progress = Math.min((currentStamps / stampsRequired) * 100, 100);
  const isComplete = currentStamps >= stampsRequired;
  const remaining = Math.max(stampsRequired - currentStamps, 0);
  const config = sizeConfig[size];

  return (
    <div className={cn("space-y-2", className)}>
      <div className={cn("relative w-full rounded-full bg-muted overflow-hidden", config.height)}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className={cn(
            "h-full rounded-full",
            isComplete 
              ? "bg-gradient-to-r from-primary to-emerald-400" 
              : "bg-primary"
          )}
          style={{
            boxShadow: isComplete ? "0 0 12px hsla(158, 64%, 52%, 0.5)" : undefined
          }}
        />
        
        {/* Milestone markers */}
        <div className="absolute inset-0 flex justify-between px-1">
          {Array.from({ length: stampsRequired - 1 }).map((_, i) => (
            <div
              key={i}
              className="w-0.5 h-full bg-background/30"
              style={{ marginLeft: `${((i + 1) / stampsRequired) * 100}%` }}
            />
          ))}
        </div>
      </div>
      
      {showText && (
        <div className="flex items-center justify-between">
          <p className={cn("text-muted-foreground", config.text)}>
            {isComplete ? (
              <span className="text-primary font-medium">🎁 Reward ready!</span>
            ) : (
              <>
                <span className="font-semibold text-foreground">{currentStamps}</span>
                {" / "}
                <span className="font-semibold text-foreground">{stampsRequired}</span>
                {" stamps"}
              </>
            )}
          </p>
          {!isComplete && (
            <p className={cn("text-muted-foreground", config.text)}>
              {remaining} more to go
            </p>
          )}
        </div>
      )}
    </div>
  );
}
