import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function NFCTapAnimation() {
  const [animationKey, setAnimationKey] = useState(0);
  const [loopCount, setLoopCount] = useState(0);

  useEffect(() => {
    // Loop animation twice then stop
    if (loopCount < 2) {
      const timer = setTimeout(() => {
        setAnimationKey((prev) => prev + 1);
        setLoopCount((prev) => prev + 1);
      }, 2800);
      return () => clearTimeout(timer);
    }
  }, [animationKey, loopCount]);

  return (
    <div className="relative w-32 h-32 flex items-center justify-center" key={animationKey}>
      {/* NFC Terminal */}
      <motion.div
        className="absolute bottom-0 w-20 h-8 rounded-lg bg-gradient-to-b from-charcoal to-espresso border border-gold/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Terminal indicator light */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
          initial={{ backgroundColor: "rgba(212, 175, 55, 0.3)" }}
          animate={{
            backgroundColor: [
              "rgba(212, 175, 55, 0.3)",
              "rgba(212, 175, 55, 0.3)",
              "rgba(72, 187, 120, 1)",
              "rgba(212, 175, 55, 0.3)",
            ],
          }}
          transition={{
            duration: 2.4,
            times: [0, 0.4, 0.5, 0.8],
            ease: "easeInOut",
          }}
        />
        
        {/* NFC waves symbol */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-0.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-0.5 h-2 bg-gold/40 rounded-full"
              animate={{
                scaleY: [1, 1.3, 1],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 0.5,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Phone */}
      <motion.div
        className="absolute w-14 h-24 rounded-xl bg-gradient-to-b from-zinc-700 to-zinc-800 border border-zinc-600 shadow-lg overflow-hidden"
        initial={{ y: -30, rotate: -5 }}
        animate={{
          y: [-30, 2, -30],
          rotate: [-5, 0, -5],
        }}
        transition={{
          duration: 2.0,
          times: [0, 0.45, 1],
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        {/* Phone screen */}
        <div className="absolute inset-1 rounded-lg bg-gradient-to-b from-background to-muted overflow-hidden">
          {/* Mini loyalty card on screen */}
          <div className="absolute inset-2 flex flex-col items-center justify-center">
            <div className="w-10 h-6 rounded-md bg-gradient-to-br from-gold/80 to-caramel/80 flex items-center justify-center">
              <div className="flex gap-0.5">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-1 rounded-full bg-white/60"
                    initial={{ scale: i < 3 ? 1 : 0 }}
                    animate={{
                      scale: i === 3 ? [0, 0, 1.3, 1] : 1,
                    }}
                    transition={{
                      duration: 2.0,
                      times: [0, 0.45, 0.55, 0.65],
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Phone notch */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-6 h-1 rounded-full bg-zinc-900" />
      </motion.div>

      {/* Ripple effect at contact point */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute bottom-6 w-12 h-4 rounded-full border border-gold/40"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: [0, 0, 0.8, 0],
            scale: [0.5, 0.5, 1 + i * 0.3, 1.5 + i * 0.3],
          }}
          transition={{
            duration: 2.0,
            times: [0, 0.42, 0.5, 0.7],
            delay: i * 0.08,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Stamp icon popping */}
      <motion.div
        className="absolute top-2 right-2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 0, 1.2, 1],
          opacity: [0, 0, 1, 1],
        }}
        transition={{
          duration: 2.0,
          times: [0, 0.5, 0.65, 0.75],
          ease: [0.34, 1.56, 0.64, 1],
        }}
      >
        <motion.div
          className="w-6 h-6 rounded-full bg-gradient-to-br from-gold to-caramel flex items-center justify-center shadow-md"
          animate={{
            boxShadow: [
              "0 2px 8px rgba(212, 175, 55, 0.3)",
              "0 4px 16px rgba(212, 175, 55, 0.5)",
              "0 2px 8px rgba(212, 175, 55, 0.3)",
            ],
          }}
          transition={{
            duration: 0.6,
            delay: 1.3,
            ease: "easeInOut",
          }}
        >
          <span className="text-xs font-bold text-white">✓</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
