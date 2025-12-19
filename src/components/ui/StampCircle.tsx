import { cn } from "@/lib/utils";
import { Coffee, Gift } from "lucide-react";

interface StampCircleProps {
  stampsCollected: number;
  stampsRequired: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeConfig = {
  sm: { container: "w-24 h-24", text: "text-lg", icon: "w-6 h-6" },
  md: { container: "w-32 h-32", text: "text-2xl", icon: "w-8 h-8" },
  lg: { container: "w-40 h-40", text: "text-3xl", icon: "w-10 h-10" },
};

export function StampCircle({
  stampsCollected,
  stampsRequired,
  size = "md",
  className,
}: StampCircleProps) {
  const progress = Math.min((stampsCollected / stampsRequired) * 100, 100);
  const isComplete = stampsCollected >= stampsRequired;
  const config = sizeConfig[size];
  
  // Calculate stroke properties
  const strokeWidth = size === "lg" ? 8 : size === "md" ? 6 : 4;
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={cn("relative", config.container, className)}>
      {/* Background circle */}
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          className="fill-none stroke-muted"
          strokeWidth={strokeWidth}
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          className="fill-none transition-all duration-700"
          style={{
            stroke: isComplete ? "hsl(44 72% 70%)" : "hsl(31 53% 66%)",
            strokeWidth,
            strokeDasharray: circumference,
            strokeDashoffset,
            strokeLinecap: "round",
            filter: isComplete ? "drop-shadow(0 0 8px hsl(44 72% 70% / 0.5))" : "none",
          }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {isComplete ? (
          <>
            <Gift className={cn(config.icon, "text-primary animate-pulse-gold")} />
            <span className="text-xs font-medium text-primary mt-1">
              Free Coffee!
            </span>
          </>
        ) : (
          <>
            <span className={cn(config.text, "font-bold text-card-foreground")}>
              {stampsCollected}
            </span>
            <span className="text-xs text-muted-foreground">
              of {stampsRequired}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
