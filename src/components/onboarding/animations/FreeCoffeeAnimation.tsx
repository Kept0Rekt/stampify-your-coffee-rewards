import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Simple To-Go Coffee Cup SVG
function ToGoCup({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 48 60" fill="none">
      {/* Lid */}
      <path 
        d="M6 10 L42 10 L40 6 C40 4 38 2 35 2 L13 2 C10 2 8 4 8 6 L6 10Z" 
        fill="hsl(35 18% 85%)"
      />
      <rect x="5" y="10" width="38" height="5" rx="1.5" fill="hsl(35 16% 82%)" />
      
      {/* Cup body */}
      <path 
        d="M8 15 L11 55 C11 57 13 59 16 59 L32 59 C35 59 37 57 37 55 L40 15 L8 15Z" 
        fill="hsl(35 22% 92%)"
      />
      
      {/* Sleeve */}
      <path 
        d="M9.5 26 L11.5 44 L36.5 44 L38.5 26 L9.5 26Z" 
        fill="hsl(38 45% 55%)"
      />
    </svg>
  );
}

export function FreeCoffeeAnimation() {
  const [showPremium, setShowPremium] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPremium(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Warm background */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: 'linear-gradient(180deg, hsl(35 25% 93%) 0%, hsl(35 20% 89%) 100%)'
        }}
      />

      <div className="relative w-full max-w-md px-4">
        {/* Free Plan Card - smaller */}
        <motion.div
          className="rounded-2xl p-4 mb-3"
          style={{ 
            background: 'white',
            boxShadow: '0 2px 12px hsla(35, 20%, 50%, 0.08)'
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium" style={{ color: 'hsl(35 15% 50%)' }}>
              Free Plan
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ 
              background: 'hsl(35 20% 94%)',
              color: 'hsl(35 15% 55%)'
            }}>
              Current
            </span>
          </div>
          
          {/* 8 stamps - smaller */}
          <div className="flex justify-between gap-1 mb-2.5">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="relative w-7 h-7 rounded-full flex items-center justify-center"
                style={{
                  background: "transparent",
                  border: "1.5px solid hsl(35 15% 85%)",
                }}
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 0.25 + i * 0.05,
                  duration: 0.28,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <motion.div
                  className="absolute inset-[2px] rounded-full"
                  style={{ background: "hsl(35 20% 70%)" }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.06, 1], opacity: [0, 1, 1] }}
                  transition={{
                    delay: 0.55 + i * 0.07,
                    duration: 0.42,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                />
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[11px]" style={{ color: 'hsl(35 12% 55%)' }}>
              <span style={{ textDecoration: 'line-through', opacity: 0.6 }}>8 stamps</span> required
            </span>
            <div className="flex items-center gap-1">
              <ToGoCup size={16} />
            </div>
          </div>
        </motion.div>

        {/* Premium Plan Card - larger and more prominent */}
        <motion.div
          className="rounded-3xl p-6 relative overflow-hidden"
          style={{ 
            background: 'linear-gradient(135deg, hsl(38 55% 58%) 0%, hsl(38 50% 48%) 100%)',
            boxShadow: '0 8px 32px hsla(38, 50%, 40%, 0.35), 0 2px 8px hsla(38, 50%, 40%, 0.2)'
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ 
            opacity: showPremium ? 1 : 0.4, 
            y: showPremium ? 0 : 8,
            scale: showPremium ? 1.02 : 0.96
          }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Subtle shine */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12"
            initial={{ x: -250 }}
            animate={showPremium ? { x: 350 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />

          <div className="relative">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-white">
                  ⭐ Premium Plan
                </span>
              </div>
              <span className="text-xs px-3 py-1.5 rounded-full bg-white/25 text-white font-semibold">
                Recommended
              </span>
            </div>
            
            {/* 6 stamps - larger */}
            <div className="flex justify-center gap-2.5 mb-4">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="relative w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: "transparent",
                    border: "2px solid hsla(0, 0%, 100%, 0.5)",
                  }}
                  initial={{ scale: 0.98, opacity: 0 }}
                  animate={showPremium ? { scale: 1, opacity: 1 } : {}}
                  transition={{
                    delay: 0.15 + i * 0.075,
                    duration: 0.28,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  <motion.div
                    className="absolute inset-[4px] rounded-full"
                    style={{ background: "hsl(0 0% 100%)" }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={showPremium ? { scale: [0, 1.06, 1], opacity: [0, 1, 1] } : {}}
                    transition={{
                      delay: 0.35 + i * 0.095,
                      duration: 0.42,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Comparison highlight */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20">
                <span className="text-white/60 text-sm line-through">8</span>
                <span className="text-white text-sm">→</span>
                <span className="text-white text-lg font-bold">6</span>
                <span className="text-white/90 text-xs font-medium">stamps</span>
              </div>
              <div className="px-2.5 py-1 rounded-full bg-green-400/30 border border-green-300/40">
                <span className="text-green-100 text-xs font-semibold">-2 stamps!</span>
              </div>
            </div>

            {/* Upgrade button */}
            <motion.button
              className="w-full py-3 rounded-xl font-semibold text-sm transition-all"
              style={{
                background: 'white',
                color: 'hsl(38 50% 40%)',
                boxShadow: '0 4px 12px hsla(0, 0%, 0%, 0.15)'
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={showPremium ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Upgrade to Premium
            </motion.button>
          </div>
        </motion.div>

        {/* Summary */}
        <motion.p
          className="text-center mt-5 text-sm font-medium"
          style={{ color: 'hsl(35 18% 45%)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: showPremium ? 1 : 0 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        >
          Get free coffee 25% faster!
        </motion.p>
      </div>
    </div>
  );
}
