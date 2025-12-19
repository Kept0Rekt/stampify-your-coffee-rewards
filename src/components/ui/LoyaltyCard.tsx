import { cn } from "@/lib/utils";
import { Coffee } from "lucide-react";

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
        "loyalty-card cursor-pointer group",
        isRewardReady && "ring-2 ring-primary animate-pulse-gold",
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
            <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center">
              <Coffee className="w-6 h-6 text-primary-foreground" />
            </div>
          )}
          <div>
            <h3 className="font-semibold text-card-foreground">{cafeName}</h3>
            <p className="text-sm text-muted-foreground">
              {isRewardReady
                ? "🎉 Free coffee ready!"
                : `${stampsRequired - stampsCollected} more to go`}
            </p>
          </div>
        </div>
        
        {isRewardReady && (
          <div className="gold-gradient text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
            CLAIM
          </div>
        )}
      </div>

      {/* Stamps Grid */}
      <div className="flex justify-center gap-2 py-4">
        {Array.from({ length: stampsRequired }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
              index < stampsCollected
                ? "stamp-collected animate-stamp-pop"
                : "stamp-empty"
            )}
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
          >
            {index < stampsCollected && (
              <Coffee className="w-4 h-4" />
            )}
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full gold-gradient rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-center text-xs text-muted-foreground">
          {stampsCollected} / {stampsRequired} stamps
        </p>
      </div>
    </div>
  );
}
