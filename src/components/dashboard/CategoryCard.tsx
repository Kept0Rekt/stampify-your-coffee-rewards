import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface CategoryCardProps {
  category: string;
  icon: string;
  cardCount: number;
  totalStamps: number;
  rewardsReady: number;
  gradientFrom: string;
  gradientTo: string;
  onClick?: () => void;
  index?: number;
}

export function CategoryCard({
  category,
  icon,
  cardCount,
  totalStamps,
  rewardsReady,
  gradientFrom,
  gradientTo,
  onClick,
  index = 0,
}: CategoryCardProps) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="w-full relative touch-feedback group"
    >
      {/* Stacked cards behind - creates depth */}
      <div 
        className="absolute inset-x-2 -bottom-2 h-full rounded-2xl opacity-40"
        style={{
          background: `linear-gradient(145deg, ${gradientFrom}, ${gradientTo})`,
          transform: 'translateY(8px) scale(0.96)',
        }}
      />
      <div 
        className="absolute inset-x-1 -bottom-1 h-full rounded-2xl opacity-60"
        style={{
          background: `linear-gradient(145deg, ${gradientFrom}, ${gradientTo})`,
          transform: 'translateY(4px) scale(0.98)',
        }}
      />
      
      {/* Main card */}
      <div 
        className="relative overflow-hidden rounded-2xl p-5"
        style={{
          background: `linear-gradient(145deg, ${gradientFrom}, ${gradientTo})`,
          boxShadow: '0 8px 32px -8px rgba(0, 0, 0, 0.5), 0 0 0 0.5px rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Subtle shine overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%, transparent 100%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Top row */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                style={{
                  background: 'rgba(0, 0, 0, 0.2)',
                  backdropFilter: 'blur(8px)',
                  boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1)',
                }}
              >
                {icon}
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-white text-lg leading-tight">
                  {category}
                </h3>
                <p className="text-white/70 text-sm mt-0.5">
                  {cardCount} {cardCount === 1 ? 'card' : 'cards'}
                </p>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-white/50 group-hover:text-white/80 transition-colors" />
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-4">
            <div 
              className="flex-1 py-2.5 px-4 rounded-xl text-center"
              style={{
                background: 'rgba(0, 0, 0, 0.2)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <p className="text-2xl font-bold text-white tabular-nums">{totalStamps}</p>
              <p className="text-xs text-white/60 mt-0.5">Stamps</p>
            </div>
            
            {rewardsReady > 0 && (
              <div 
                className="flex-1 py-2.5 px-4 rounded-xl text-center"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
                }}
              >
                <p className="text-2xl font-bold text-white tabular-nums">{rewardsReady}</p>
                <p className="text-xs text-white/80 mt-0.5">Rewards Ready</p>
              </div>
            )}
          </div>
        </div>

        {/* Reward badge */}
        {rewardsReady > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.08 + 0.3, type: "spring", stiffness: 200 }}
            className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white flex items-center justify-center"
            style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}
          >
            <span className="text-xs font-bold" style={{ color: gradientFrom }}>{rewardsReady}</span>
          </motion.div>
        )}
      </div>
    </motion.button>
  );
}
