import { cn } from "@/lib/utils";
import { Coffee, Gift } from "lucide-react";
import { StampifyLogoMark } from "./StampifyLogo";

interface LoyaltyCardProps {
  cafeName: string;
  cafeLogoUrl?: string;
  stampsCollected: number;
  stampsRequired: number;
  className?: string;
  onClick?: () => void;
  variant?: "light" | "dark";
}

export function LoyaltyCard({
  cafeName,
  cafeLogoUrl,
  stampsCollected,
  stampsRequired,
  className,
  onClick,
  variant = "light",
}: LoyaltyCardProps) {
  const isRewardReady = stampsCollected >= stampsRequired;
  const progress = Math.min((stampsCollected / stampsRequired) * 100, 100);
  const isDark = variant === "dark";

  return (
    <div
      onClick={onClick}
      className={cn(
        "cursor-pointer group transition-all duration-300",
        isDark ? "wallet-card" : "glass-card",
        "p-6 space-y-5",
        isRewardReady && isDark && "ring-1 ring-gold/30",
        isRewardReady && !isDark && "ring-1 ring-primary/40",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          {cafeLogoUrl ? (
            <img
              src={cafeLogoUrl}
              alt={cafeName}
              className="w-11 h-11 rounded-xl object-cover"
            />
          ) : (
            <div className={cn(
              "w-11 h-11 rounded-xl flex items-center justify-center",
              isDark ? "gold-gradient-dark" : "gold-gradient shadow-gold"
            )}>
              <Coffee className={cn(
                "w-5 h-5",
                isDark ? "text-wallet-bg" : "text-primary-foreground"
              )} />
            </div>
          )}
          <div className="space-y-0.5">
            <h3 className={cn(
              "font-medium",
              isDark ? "text-wallet-text" : "text-foreground"
            )}>
              {cafeName}
            </h3>
            <p className={cn(
              "text-sm",
              isDark ? "text-wallet-muted" : "text-muted-foreground"
            )}>
              {isRewardReady
                ? "Free coffee ready!"
                : `${stampsRequired - stampsCollected} more to go`}
            </p>
          </div>
        </div>
        
        {isRewardReady ? (
          <div className={cn(
            "flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full",
            isDark 
              ? "wallet-claim-btn" 
              : "gold-gradient text-primary-foreground shadow-gold"
          )}>
            <Gift className="w-3 h-3" />
            CLAIM
          </div>
        ) : (
          <StampifyLogoMark size="xs" opacity={isDark ? 0.15 : 0.3} />
        )}
      </div>

      {/* Stamps Grid */}
      <div className="flex justify-center gap-3 py-2">
        {Array.from({ length: stampsRequired }).map((_, index) => {
          const isCollected = index < stampsCollected;
          return (
            <div
              key={index}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                isCollected && isDark && "bg-gold/90 shadow-[0_0_12px_rgba(201,169,98,0.3)]",
                isCollected && !isDark && "gold-gradient shadow-sm",
                !isCollected && isDark && "bg-wallet-bg/50 border border-wallet-border/30",
                !isCollected && !isDark && "bg-muted/40 border border-border/40"
              )}
            >
              {isCollected && (
                <Coffee className={cn(
                  "w-3.5 h-3.5",
                  isDark ? "text-wallet-bg" : "text-primary-foreground"
                )} />
              )}
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="space-y-2 pt-1">
        <div className={cn(
          "h-1 rounded-full overflow-hidden",
          isDark ? "bg-wallet-bg/60" : "bg-muted/60"
        )}>
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              isDark ? "bg-gold/70" : "gold-gradient"
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className={cn(
          "text-center text-xs font-medium",
          isDark ? "text-wallet-muted/80" : "text-muted-foreground"
        )}>
          {stampsCollected} / {stampsRequired} stamps
        </p>
      </div>
    </div>
  );
}
