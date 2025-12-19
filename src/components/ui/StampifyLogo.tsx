import { cn } from "@/lib/utils";

interface StampifyLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
  xl: "w-24 h-24",
};

const textSizeClasses = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-3xl",
  xl: "text-4xl",
};

export function StampifyLogo({ className, size = "md", showText = true }: StampifyLogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Logo Icon - Coffee cup with stamp */}
      <div className={cn(
        "relative rounded-2xl gold-gradient flex items-center justify-center gold-glow",
        sizeClasses[size]
      )}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-2/3 h-2/3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Coffee cup */}
          <path d="M17 8h1a4 4 0 1 1 0 8h-1" className="text-charcoal" />
          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" className="text-charcoal" />
          {/* Steam */}
          <path d="M6 1v3" className="text-charcoal opacity-60" />
          <path d="M10 1v3" className="text-charcoal opacity-60" />
          <path d="M14 1v3" className="text-charcoal opacity-60" />
        </svg>
        {/* Stamp badge */}
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 text-accent-foreground">
            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      {showText && (
        <span className={cn(
          "font-bold tracking-tight gold-text",
          textSizeClasses[size]
        )}>
          Stampify
        </span>
      )}
    </div>
  );
}
