import { motion } from "framer-motion";
import { TrendingUp, Award, Zap } from "lucide-react";

interface StatsCardProps {
  totalStamps: number;
  totalRewards: number;
  streak: number;
}

export function StatsCard({ totalStamps, totalRewards, streak }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.4 }}
      className="relative overflow-hidden rounded-2xl p-5"
      style={{
        background: 'linear-gradient(145deg, hsl(165 30% 12%), hsl(165 30% 9%))',
        boxShadow: '0 4px 24px -4px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.03)',
      }}
    >
      {/* Decorative gradient */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 opacity-30"
        style={{
          background: 'radial-gradient(circle at top right, hsl(158 64% 52% / 0.2), transparent 70%)',
        }}
      />

      <div className="relative z-10 flex items-center justify-between">
        {/* Stamps */}
        <div className="text-center flex-1">
          <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-secondary/50 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <p className="text-2xl font-bold tabular-nums text-foreground">{totalStamps}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Stamps</p>
        </div>

        {/* Divider */}
        <div className="w-px h-16 bg-border/50" />

        {/* Rewards */}
        <div className="text-center flex-1">
          <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-secondary/50 flex items-center justify-center">
            <Award className="w-5 h-5 text-primary" />
          </div>
          <p className="text-2xl font-bold tabular-nums text-foreground">{totalRewards}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Rewards</p>
        </div>

        {/* Divider */}
        <div className="w-px h-16 bg-border/50" />

        {/* Streak */}
        <div className="text-center flex-1">
          <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-secondary/50 flex items-center justify-center">
            <Zap className="w-5 h-5 text-amber-400" />
          </div>
          <p className="text-2xl font-bold tabular-nums text-foreground">{streak}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Day Streak</p>
        </div>
      </div>
    </motion.div>
  );
}
