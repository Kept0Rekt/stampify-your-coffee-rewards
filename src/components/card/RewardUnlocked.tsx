import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Gift, QrCode, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

interface RewardUnlockedProps {
  rewardName: string;
  rewardValue?: number;
  redemptionCode: string;
  expiresAt?: Date;
  onRedeem?: () => void;
}

export function RewardUnlocked({
  rewardName,
  rewardValue,
  redemptionCode,
  expiresAt,
  onRedeem,
}: RewardUnlockedProps) {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!hasAnimated) {
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#34D399", "#10B981", "#6EE7B7", "#FFD700"],
      });
      setHasAnimated(true);
    }
  }, [hasAnimated]);

  const daysUntilExpiry = expiresAt 
    ? Math.ceil((expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : 30;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", duration: 0.6 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/30 p-6"
    >
      {/* Sparkle effects */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute top-4 right-4 text-primary/30"
      >
        <Sparkles className="w-8 h-8" />
      </motion.div>

      <div className="text-center space-y-4">
        {/* Celebration Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center"
        >
          <span className="text-5xl">🎉</span>
        </motion.div>

        {/* Title */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-foreground"
          >
            Reward Unlocked!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground mt-1"
          >
            You've earned a free reward
          </motion.p>
        </div>

        {/* Reward Details */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-xl p-4 border border-border"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Gift className="w-5 h-5 text-primary" />
            <span className="font-semibold text-lg text-foreground">
              {rewardName}
            </span>
          </div>
          {rewardValue && (
            <p className="text-sm text-muted-foreground">
              (${rewardValue.toFixed(2)} value)
            </p>
          )}
        </motion.div>

        {/* QR Code Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl p-6 mx-auto max-w-[200px]"
        >
          <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center">
              <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-2" />
              <p className="text-xs text-gray-500 font-mono">{redemptionCode}</p>
            </div>
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-sm text-muted-foreground"
        >
          Show this code to staff to redeem
        </motion.p>

        {/* Expiry */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-1 text-xs text-muted-foreground"
        >
          <Clock className="w-3 h-3" />
          <span>Expires in {daysUntilExpiry} days</span>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Button 
            className="w-full btn-primary"
            onClick={onRedeem}
          >
            <Gift className="w-4 h-4 mr-2" />
            Redeem Now
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
