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
        "glass-card p-5 space-y-4 cursor-pointer group transition-all duration-300",
        isRewardReady && "ring-1 ring-primary/40",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {cafeLogoUrl ? (
            <img
              src={cafeLogoUrl}
              alt={cafeName}
              className="w-12 h-12 rounded-xl object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center shadow-gold">
              <Coffee className="w-6 h-6 text-primary-foreground" />
            </div>
          )}
          <div>
            <h3 className="font-semibold text-foreground">{cafeName}</h3>
            <p className="text-sm text-muted-foreground">
              {isRewardReady
                ? "Free coffee ready!"
                : `${stampsRequired - stampsCollected} more to go`}
            </p>
          </div>
        </div>
        
        {isRewardReady ? (
          <div className="flex items-center gap-1.5 gold-gradient text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full shadow-gold">
            <Gift className="w-3.5 h-3.5" />
            CLAIM
          </div>
        ) : (
          <StampifyLogoMark size="xs" opacity={0.3} />
        )}
      </div>

      {/* Stamps Grid */}
      <div className="flex justify-center gap-2.5 py-3">
        {Array.from({ length: stampsRequired }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300",
              index < stampsCollected
                ? "gold-gradient shadow-sm"
                : "bg-muted/40 border border-border/40"
            )}
            style={{
              animationDelay: `${index * 0.08}s`,
            }}
          >
            {index < stampsCollected && (
              <Coffee className="w-4 h-4 text-primary-foreground" />
            )}
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="h-1.5 bg-muted/60 rounded-full overflow-hidden">
          <div
            className="h-full gold-gradient rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-center text-xs text-muted-foreground font-medium">
          {stampsCollected} / {stampsRequired} stamps
        </p>
      </div>
    </div>
  );
}
