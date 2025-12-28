import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Simple To-Go Coffee Cup SVG
function ToGoCup({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 60 78" fill="none">
      {/* Lid */}
      <path 
        d="M8 12 L52 12 L50 8 C50 5 47 3 44 3 L16 3 C13 3 10 5 10 8 L8 12Z" 
        fill="hsl(35 20% 88%)"
        stroke="hsl(35 15% 75%)"
        strokeWidth="1"
      />
      {/* Lid rim */}
      <rect x="6" y="12" width="48" height="6" rx="2" fill="hsl(35 20% 85%)" stroke="hsl(35 15% 72%)" strokeWidth="1" />
      {/* Lid spout */}
      <ellipse cx="30" cy="9" rx="6" ry="2" fill="hsl(35 15% 78%)" />
      
      {/* Cup body */}
      <path 
        d="M10 18 L14 72 C14 75 17 77 20 77 L40 77 C43 77 46 75 46 72 L50 18 L10 18Z" 
        fill="hsl(35 25% 94%)"
        stroke="hsl(35 15% 82%)"
        strokeWidth="1"
      />
      
      {/* Cup sleeve */}
      <path 
        d="M12 32 L14.5 56 L45.5 56 L48 32 L12 32Z" 
        fill="hsl(38 45% 55%)"
      />
      
      {/* Sleeve texture lines */}
      <path d="M16 38 L44 38" stroke="hsl(38 40% 48%)" strokeWidth="0.5" opacity="0.5" />
      <path d="M15.5 44 L44.5 44" stroke="hsl(38 40% 48%)" strokeWidth="0.5" opacity="0.5" />
      <path d="M15 50 L45 50" stroke="hsl(38 40% 48%)" strokeWidth="0.5" opacity="0.5" />
    </svg>
  );
}

export function FreeCoffeeAnimation() {
  const [phase, setPhase] = useState<"stamps" | "complete" | "reward">("stamps");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("complete"), 2000),
      setTimeout(() => setPhase("reward"), 3200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const stamps = 5;

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Warm background */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: 'linear-gradient(180deg, hsl(35 25% 92%) 0%, hsl(35 20% 88%) 100%)'
        }}
      />

      {/* Content container */}
      <div className="relative flex flex-col items-center">
        
        {/* Plan badge */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div 
            className="flex items-center gap-2 px-4 py-2 rounded-full"
            style={{ 
              background: 'hsla(38, 45%, 55%, 0.12)',
              border: '1px solid hsla(38, 45%, 55%, 0.2)'
            }}
          >
            <span className="text-sm">👑</span>
            <span className="text-sm font-semibold" style={{ color: 'hsl(38 45% 45%)' }}>
              Premium
            </span>
          </div>
        </motion.div>

        {/* Stamps row */}
        <div className="flex justify-center gap-4 mb-8">
          {[...Array(stamps)].map((_, i) => (
            <motion.div
              key={i}
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ 
                background: 'white',
                border: '2px solid hsl(38 45% 55%)',
                boxShadow: '0 2px 8px hsla(38, 45%, 55%, 0.1)'
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                delay: 0.3 + i * 0.1, 
                duration: 0.3,
                ease: [0.25, 0.1, 0.25, 1]
              }}
            >
              <motion.div
                className="w-7 h-7 rounded-full"
                style={{ background: 'hsl(38 45% 55%)' }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.6 + i * 0.12,
                  duration: 0.25,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Progress text */}
        <motion.p
          className="text-sm font-medium mb-10"
          style={{ color: 'hsl(35 15% 45%)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === "stamps" ? 1 : 0 }}
          transition={{ delay: 1.4, duration: 0.3 }}
        >
          5 stamps = free coffee
        </motion.p>

        {/* To-Go Cup */}
        <motion.div
          className="relative"
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={phase !== "stamps" ? { 
            scale: 1, 
            opacity: 1, 
            y: 0 
          } : {}}
          transition={{ 
            duration: 0.5, 
            ease: [0.25, 0.1, 0.25, 1] 
          }}
        >
          {/* Steam wisps */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-3">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1 rounded-full"
                style={{ background: 'linear-gradient(to top, hsla(35, 15%, 70%, 0.4), transparent)' }}
                initial={{ height: 0, opacity: 0 }}
                animate={phase !== "stamps" ? {
                  height: [0, 16, 24, 16],
                  opacity: [0, 0.6, 0.3, 0],
                  y: [0, -4, -10, -18],
                } : {}}
                transition={{
                  duration: 2.5,
                  delay: 0.3 + i * 0.25,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          <motion.div
            animate={phase === "reward" ? {
              y: [0, -4, 0],
            } : {}}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <ToGoCup size={72} />
          </motion.div>
        </motion.div>

        {/* Reward badge */}
        <motion.div
          className="mt-8"
          initial={{ scale: 0.8, opacity: 0, y: 10 }}
          animate={phase === "reward" ? { 
            scale: 1, 
            opacity: 1, 
            y: 0 
          } : {}}
          transition={{ 
            delay: 0.3, 
            duration: 0.4, 
            ease: [0.25, 0.1, 0.25, 1] 
          }}
        >
          <div 
            className="px-6 py-3 rounded-full"
            style={{ 
              background: 'hsl(38 45% 55%)',
              boxShadow: '0 4px 16px hsla(38, 45%, 50%, 0.25)'
            }}
          >
            <span className="text-white font-semibold text-base">
              Free Coffee!
            </span>
          </div>
        </motion.div>

        {/* Subtle comparison note */}
        <motion.p
          className="mt-6 text-xs"
          style={{ color: 'hsl(35 12% 55%)' }}
          initial={{ opacity: 0 }}
          animate={phase === "reward" ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          3 fewer stamps than Free plan
        </motion.p>
      </div>
    </div>
  );
}
