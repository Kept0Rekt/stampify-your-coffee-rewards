import { cn } from "@/lib/utils";
import stampifyLogo from "@/assets/stampify-logo.png";

interface StampifyLogoProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  variant?: "default" | "light" | "subtle" | "dark" | "latte";
}

const sizeClasses = {
  xs: "w-6 h-6",
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-14 h-14",
  xl: "w-20 h-20",
};

const textSizeClasses = {
  xs: "text-sm",
  sm: "text-base",
  md: "text-xl",
  lg: "text-2xl",
  xl: "text-3xl",
};

export function StampifyLogo({ 
  className, 
  size = "md", 
  showText = true,
  variant = "default" 
}: StampifyLogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {/* Logo Image */}
      <img
        src={stampifyLogo}
        alt="Stampify"
        className={cn(
          sizeClasses[size],
          "object-contain",
          variant === "subtle" && "opacity-60"
        )}
      />
      
      {showText && (
        <span className={cn(
          "font-semibold tracking-tight",
          textSizeClasses[size],
          variant === "default" && "caramel-text",
          variant === "latte" && "caramel-text",
          variant === "dark" && "text-primary",
          variant === "light" && "text-foreground",
          variant === "subtle" && "text-muted-foreground"
        )}>
          Stampify
        </span>
      )}
    </div>
  );
}

// Compact logo for tight spaces
export function StampifyLogoMark({ 
  className, 
  size = "md",
  opacity = 1 
}: { 
  className?: string; 
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  opacity?: number;
}) {
  return (
    <img
      src={stampifyLogo}
      alt="Stampify"
      className={cn(sizeClasses[size], "object-contain", className)}
      style={{ opacity }}
    />
  );
}