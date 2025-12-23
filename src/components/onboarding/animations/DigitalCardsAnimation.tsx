import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function DigitalCardsAnimation() {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Reset animation after it completes
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  // Paper card styles - messy stack
  const paperCards = [
    { rotate: -15, x: -12, y: -8, delay: 0 },
    { rotate: 8, x: 10, y: -4, delay: 0.05 },
    { rotate: -5, x: -5, y: 4, delay: 0.1 },
    { rotate: 12, x: 8, y: 8, delay: 0.15 },
  ];

  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      {/* Paper cards that morph into digital */}
      {isAnimating && paperCards.map((card, index) => (
        <motion.div
          key={index}
          className="absolute w-16 h-10 rounded-sm bg-latte/80 border border-espresso/20"
          initial={{
            rotate: card.rotate,
            x: card.x,
            y: card.y,
            opacity: 1,
            scale: 1,
          }}
          animate={{
            rotate: 0,
            x: 0,
            y: 0,
            opacity: 0,
            scale: 0.8,
          }}
          transition={{
            duration: 0.8,
            delay: 0.4 + card.delay,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          {/* Stamp dots on paper cards */}
          <div className="flex gap-0.5 p-1 flex-wrap">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-espresso/30"
              />
            ))}
          </div>
        </motion.div>
      ))}

      {/* Digital card emerges */}
      <motion.div
        className="absolute"
        initial={{ scale: 0.5, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 1.0,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <motion.div
          className="relative w-24 h-16 rounded-xl bg-gradient-to-br from-gold via-caramel to-copper shadow-lg"
          animate={isAnimating ? {
            boxShadow: [
              "0 4px 20px rgba(212, 175, 55, 0.3)",
              "0 8px 40px rgba(212, 175, 55, 0.5)",
              "0 4px 20px rgba(212, 175, 55, 0.3)",
            ],
          } : {}}
          transition={{
            duration: 1.2,
            delay: 1.4,
            ease: "easeInOut",
          }}
        >
          {/* Card content */}
          <div className="absolute inset-0 p-2 flex flex-col justify-between">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-full bg-white/30" />
              <div className="w-8 h-1.5 rounded bg-white/40" />
            </div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2.5 h-2.5 rounded-full bg-white/50"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: 1.6 + i * 0.1,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                />
              ))}
            </div>
          </div>

          {/* Glow pulse effect */}
          <motion.div
            className="absolute -inset-2 rounded-2xl bg-gold/20 -z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isAnimating ? {
              opacity: [0, 0.6, 0],
              scale: [0.9, 1.1, 1.05],
            } : { opacity: 0 }}
            transition={{
              duration: 0.8,
              delay: 1.8,
              ease: "easeOut",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
