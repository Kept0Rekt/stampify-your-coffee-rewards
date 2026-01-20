import { cn } from "@/lib/utils";
import { ChevronRight, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MerchantRowProps {
  id: string;
  name: string;
  category: string;
  stampsCollected: number;
  stampsRequired: number;
  logoEmoji: string;
  isExpanded?: boolean;
  onToggle?: () => void;
  onViewDetails?: () => void;
}

export function MerchantRow({
  id,
  name,
  category,
  stampsCollected,
  stampsRequired,
  logoEmoji,
  isExpanded = false,
  onToggle,
  onViewDetails,
}: MerchantRowProps) {
  const isRewardReady = stampsCollected >= stampsRequired;
  const progress = Math.min((stampsCollected / stampsRequired) * 100, 100);

  return (
    <motion.div
      layout
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="merchant-card overflow-hidden"
    >
      <motion.button
        onClick={onToggle}
        className="w-full text-left p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded-[1.25rem]"
      >
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-2xl flex-shrink-0">
            {logoEmoji}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold text-foreground text-base truncate">
                {name}
              </h3>
              <motion.div
                animate={{ rotate: isExpanded ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className="w-5 h-5 text-muted-foreground/50 flex-shrink-0" />
              </motion.div>
            </div>
            <p className="text-sm text-muted-foreground truncate">{category}</p>

            {/* Progress bar */}
            <div className="mt-3 flex items-center gap-3">
              <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
                  className={cn(
                    "h-full rounded-full",
                    isRewardReady ? "bg-primary" : "bg-primary/70"
                  )}
                />
              </div>
              <span className="text-xs font-medium text-muted-foreground tabular-nums">
                {stampsCollected}/{stampsRequired}
              </span>
            </div>
          </div>
        </div>
      </motion.button>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-2 border-t border-border/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {isRewardReady
                      ? "🎉 Reward ready to claim!"
                      : `${stampsRequired - stampsCollected} more to earn reward`}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewDetails?.();
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium touch-feedback"
                >
                  View Card
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
