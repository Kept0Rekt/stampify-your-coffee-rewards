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

      <div className="relative w-full max-w-sm px-6">
        {/* Free Plan Card */}
        <motion.div
          className="rounded-2xl p-5 mb-4"
          style={{ 
            background: 'white',
            boxShadow: '0 2px 12px hsla(35, 20%, 50%, 0.08)'
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium" style={{ color: 'hsl(35 15% 45%)' }}>
              Free Plan
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full" style={{ 
              background: 'hsl(35 20% 94%)',
              color: 'hsl(35 15% 50%)'
            }}>
              Current
            </span>
          </div>
          
          {/* 8 stamps */}
          <div className="flex justify-between gap-1.5 mb-3">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ 
                  background: 'hsl(35 18% 94%)',
                  border: '1.5px solid hsl(35 15% 85%)'
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  delay: 0.3 + i * 0.06, 
                  duration: 0.25,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
              >
                <motion.div
                  className="w-4 h-4 rounded-full"
                  style={{ background: 'hsl(38 45% 55%)' }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    delay: 0.5 + i * 0.08, 
                    duration: 0.2,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                />
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: 'hsl(35 12% 55%)' }}>
              8 stamps required
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs" style={{ color: 'hsl(35 12% 55%)' }}>=</span>
              <ToGoCup size={20} />
            </div>
          </div>
        </motion.div>

        {/* Premium Plan Card */}
        <motion.div
          className="rounded-2xl p-5 relative overflow-hidden"
          style={{ 
            background: 'linear-gradient(135deg, hsl(38 50% 56%) 0%, hsl(38 45% 50%) 100%)',
            boxShadow: '0 4px 20px hsla(38, 45%, 45%, 0.25)'
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ 
            opacity: showPremium ? 1 : 0.4, 
            y: showPremium ? 0 : 8,
            scale: showPremium ? 1 : 0.98
          }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Subtle shine */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
            initial={{ x: -200 }}
            animate={showPremium ? { x: 300 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />

          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">
                  Premium Plan
                </span>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-white/20 text-white font-medium">
                Recommended
              </span>
            </div>
            
            {/* 6 stamps */}
            <div className="flex justify-center gap-2 mb-3">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ 
                    background: 'hsla(0, 0%, 100%, 0.2)',
                    border: '1.5px solid hsla(0, 0%, 100%, 0.4)'
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={showPremium ? { scale: 1, opacity: 1 } : {}}
                  transition={{ 
                    delay: 0.2 + i * 0.08, 
                    duration: 0.3,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                >
                  <motion.div
                    className="w-5 h-5 rounded-full bg-white"
                    initial={{ scale: 0 }}
                    animate={showPremium ? { scale: 1 } : {}}
                    transition={{ 
                      delay: 0.4 + i * 0.1, 
                      duration: 0.2,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                  />
                </motion.div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-white/80">
                6 stamps required
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-white/90">
                  2 fewer stamps
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Summary */}
        <motion.p
          className="text-center mt-6 text-sm"
          style={{ color: 'hsl(35 15% 50%)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: showPremium ? 1 : 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          Earn free coffee faster with Premium
        </motion.p>
      </div>
    </div>
  );
}
