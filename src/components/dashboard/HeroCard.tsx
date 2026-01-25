import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, ChevronRight } from "lucide-react";
import { StampGrid } from "@/components/wallet/StampGrid";

interface HeroCardProps {
  id: string;
  businessName: string;
  logoEmoji: string;
  brandColor?: string;
  currentStamps: number;
  stampsRequired: number;
  rewardName: string;
}

export function HeroCard({
  id,
  businessName,
  logoEmoji,
  brandColor = "#34D399",
  currentStamps,
  stampsRequired,
  rewardName,
}: HeroCardProps) {
  const navigate = useNavigate();
  const remaining = Math.max(stampsRequired - currentStamps, 0);
  const isComplete = remaining === 0;

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/card/${id}`)}
      className="w-full text-left"
    >
      <div 
        className="relative rounded-2xl p-5 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--card)) 100%)`,
          boxShadow: "0 8px 32px hsla(0, 0%, 0%, 0.2)",
        }}
      >
        {/* Brand color accent */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{ 
            background: `radial-gradient(circle at top right, ${brandColor}, transparent 60%)` 
          }}
        />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Closest to Reward</span>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>

        {/* Business Info */}
        <div className="relative z-10 flex items-center gap-4 mb-6">
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-lg"
            style={{ 
              background: `linear-gradient(135deg, ${brandColor}30, ${brandColor}10)`,
              border: `1px solid ${brandColor}30`
            }}
          >
            {logoEmoji}
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">{businessName}</h3>
            <p className="text-sm text-muted-foreground">
              {currentStamps}/{stampsRequired} stamps
            </p>
          </div>
        </div>

        {/* Stamp Progress */}
        <div className="relative z-10 mb-4">
          <StampGrid 
            currentStamps={currentStamps}
            stampsRequired={stampsRequired}
            size="md"
            animated={false}
          />
        </div>

        {/* Reward Info */}
        <div className="relative z-10 pt-4 border-t border-border/30">
          <p className="text-sm text-muted-foreground">
            {isComplete ? (
              <span className="text-primary font-medium">
                🎁 Tap to redeem your {rewardName}!
              </span>
            ) : (
              <>
                Just <span className="font-semibold text-foreground">{remaining}</span> more visit{remaining !== 1 ? 's' : ''} for{' '}
                <span className="font-semibold text-primary">{rewardName}</span>
              </>
            )}
          </p>
        </div>
      </div>
    </motion.button>
  );
}
