import { cn } from "@/lib/utils";
import { Coffee, Gift } from "lucide-react";
import stampifyLogo from "@/assets/stampify-logo.png";

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

  return (
    <div
      onClick={onClick}
      className={cn(
        "cursor-pointer latte-card p-6 space-y-5 transition-all duration-200",
        isRewardReady && "ring-1 ring-primary/20",
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
              className="w-11 h-11 rounded-xl object-cover"
            />
          ) : (
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
              <Coffee className="w-5 h-5 text-primary" />
            </div>
          )}
          <div>
            <h3 className="font-medium text-foreground text-[15px]">
              {cafeName}
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              {isRewardReady
                ? "Free coffee ready!"
                : `${stampsRemaining} more to go`}
            </p>
          </div>
        </div>
        
        {isRewardReady ? (
          <button className="btn-claim flex items-center gap-1.5">
            <Gift className="w-3.5 h-3.5" />
            CLAIM
          </button>
        ) : (
          <img src={stampifyLogo} alt="Stampify" className="h-4 w-auto object-contain opacity-12" />
        )}
      </div>

      {/* Stamps Row - Hero Element */}
      <div className="flex justify-center items-center gap-3 py-2">
        {Array.from({ length: stampsRequired }).map((_, index) => {
          const isCollected = index < stampsCollected;
          return (
            <div
              key={index}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200",
                isCollected && "bg-primary",
                !isCollected && "border border-border bg-transparent"
              )}
            >
              {isCollected && (
                <Coffee className="w-3.5 h-3.5 text-primary-foreground" />
              )}
            </div>
          );
        })}
      </div>

      {/* Subtle Progress Indicator */}
      <div className="flex items-center justify-center">
        <p className="text-xs font-medium text-muted-foreground">
          {stampsCollected} of {stampsRequired} stamps collected
        </p>
      </div>
    </div>
  );
}
