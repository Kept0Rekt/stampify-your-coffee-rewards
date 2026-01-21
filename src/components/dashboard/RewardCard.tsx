import { motion } from "framer-motion";
import { Gift, Sparkles } from "lucide-react";

interface RewardCardProps {
  merchantName: string;
  reward: string;
  emoji: string;
  category: string;
  onClick?: () => void;
  index?: number;
}

export function RewardCard({
  merchantName,
  reward,
  emoji,
  category,
  onClick,
  index = 0,
}: RewardCardProps) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.97 }}
      className="flex-shrink-0 w-44 relative overflow-hidden rounded-2xl p-5 text-left touch-feedback group"
      style={{
        background: 'linear-gradient(160deg, hsl(158 64% 52% / 0.15), hsl(165 30% 12% / 0.95))',
        boxShadow: '0 8px 32px -8px rgba(0, 0, 0, 0.5), 0 0 0 0.5px hsl(158 64% 52% / 0.2)',
      }}
    >
      {/* Sparkle decoration */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-8 -right-8 w-24 h-24 opacity-20"
        style={{
          background: 'radial-gradient(circle, hsl(158 64% 52% / 0.4), transparent 70%)',
        }}
      />

      {/* Emoji */}
      <div className="relative mb-4">
        <div 
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
          style={{
            background: 'linear-gradient(145deg, hsl(165 25% 20%), hsl(165 25% 14%))',
            boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.08), 0 4px 12px rgba(0, 0, 0, 0.3)',
          }}
        >
          {emoji}
        </div>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
          style={{ boxShadow: '0 0 12px hsl(158 64% 52% / 0.6)' }}
        >
          <Gift className="w-3 h-3 text-primary-foreground" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-primary" />
          {category}
        </p>
        <h3 className="font-semibold text-foreground text-sm leading-tight mb-1">
          {reward}
        </h3>
        <p className="text-xs text-muted-foreground truncate">
          {merchantName}
        </p>
      </div>

      {/* Claim indicator */}
      <div 
        className="mt-4 py-1.5 rounded-lg text-center text-xs font-medium text-primary border border-primary/30 bg-primary/10"
      >
        Tap to claim
      </div>
    </motion.button>
  );
}
