import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface WalletCardProps {
  merchantName: string;
  category: string;
  stamps: number;
  totalStamps: number;
  accentColor?: string;
  emoji: string;
  onClick?: () => void;
  index?: number;
}

export function WalletCard({
  merchantName,
  category,
  stamps,
  totalStamps,
  emoji,
  onClick,
  index = 0,
}: WalletCardProps) {
  const progress = (stamps / totalStamps) * 100;
  const isComplete = stamps >= totalStamps;

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="w-full relative overflow-hidden rounded-2xl p-5 text-left touch-feedback group"
      style={{
        background: 'linear-gradient(145deg, hsl(165 30% 14% / 0.95), hsl(165 30% 10% / 0.98))',
        boxShadow: '0 4px 24px -4px rgba(0, 0, 0, 0.4), 0 0 0 0.5px rgba(255, 255, 255, 0.06)',
      }}
    >
      {/* Subtle gradient overlay */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(145deg, hsl(158 64% 52% / 0.05), transparent)',
        }}
      />

      <div className="relative z-10 flex items-center gap-4">
        {/* Emoji Badge */}
        <div 
          className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0"
          style={{
            background: 'linear-gradient(145deg, hsl(165 25% 18%), hsl(165 25% 14%))',
            boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.05), 0 2px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          {emoji}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="min-w-0">
              <h3 className="font-semibold text-foreground text-base truncate">
                {merchantName}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {category}
              </p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <span className="text-sm font-semibold tabular-nums text-foreground">
                {stamps}
              </span>
              <span className="text-sm text-muted-foreground">/</span>
              <span className="text-sm text-muted-foreground tabular-nums">
                {totalStamps}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative h-1.5 rounded-full overflow-hidden bg-secondary/50">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ delay: index * 0.05 + 0.2, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className={`absolute inset-y-0 left-0 rounded-full ${
                isComplete 
                  ? 'bg-gradient-to-r from-primary to-emerald-light' 
                  : 'bg-primary/70'
              }`}
              style={isComplete ? { boxShadow: '0 0 12px hsl(158 64% 52% / 0.5)' } : {}}
            />
          </div>
        </div>

        {/* Arrow */}
        <ChevronRight className="w-5 h-5 text-muted-foreground/50 shrink-0 group-hover:text-primary transition-colors" />
      </div>

      {/* Ready badge */}
      {isComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-primary/20 text-primary border border-primary/30"
        >
          Reward Ready
        </motion.div>
      )}
    </motion.button>
  );
}
