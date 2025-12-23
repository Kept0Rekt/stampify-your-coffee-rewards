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
  const progress = Math.min((stampsCollected / stampsRequired) * 100, 100);

  return (
    <div
      onClick={onClick}
      className={cn(
        "cursor-pointer group transition-all duration-300",
        "glass-card p-6 space-y-5",
        isRewardReady && "ring-1 ring-primary/30",
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
            <div className="w-11 h-11 rounded-xl gold-gradient shadow-gold flex items-center justify-center">
              <Coffee className="w-5 h-5 text-primary-foreground" />
            </div>
          )}
          <div className="space-y-0.5">
            <h3 className="font-medium text-foreground">
              {cafeName}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isRewardReady
                ? "Free coffee ready!"
                : `${stampsRequired - stampsCollected} more to go`}
            </p>
          </div>
        </div>
        
        {isRewardReady ? (
          <div className="claim-btn flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full">
            <Gift className="w-3 h-3" />
            CLAIM
          </div>
        ) : (
          <StampifyLogoMark size="xs" opacity={0.2} />
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
                isCollected && "gold-gradient shadow-sm",
                !isCollected && "bg-muted/50 border border-border/50"
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
      <div className="space-y-2 pt-1">
        <div className="h-1 rounded-full overflow-hidden bg-muted/60">
          <div
            className="h-full rounded-full gold-gradient transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-center text-xs font-medium text-muted-foreground">
          {stampsCollected} / {stampsRequired} stamps
        </p>
      </div>
    </div>
  );
}