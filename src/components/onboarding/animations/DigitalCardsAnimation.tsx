import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import stampifyLogo from "@/assets/stampify-logo.png";

export function DigitalCardsAnimation() {
  const [phase, setPhase] = useState<"scatter" | "merge" | "complete">("scatter");

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("merge"), 800);
    const timer2 = setTimeout(() => setPhase("complete"), 2000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Scattered paper cards with different positions
  const paperCards = [
    { id: 1, initialX: -120, initialY: -80, initialRotate: -25, delay: 0 },
    { id: 2, initialX: 100, initialY: -60, initialRotate: 18, delay: 0.05 },
    { id: 3, initialX: -80, initialY: 40, initialRotate: -12, delay: 0.1 },
    { id: 4, initialX: 90, initialY: 70, initialRotate: 22, delay: 0.15 },
    { id: 5, initialX: -30, initialY: -120, initialRotate: 8, delay: 0.08 },
    { id: 6, initialX: 50, initialY: 100, initialRotate: -18, delay: 0.12 },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-espresso/20 to-charcoal" />

      {/* Scattered paper cards */}
      {paperCards.map((card) => (
        <motion.div
          key={card.id}
          className="absolute w-32 h-20 rounded-lg bg-gradient-to-br from-latte/90 to-latte/70 border border-espresso/20 shadow-lg"
          initial={{
            x: card.initialX,
            y: card.initialY,
            rotate: card.initialRotate,
            opacity: 1,
            scale: 1,
          }}
          animate={phase === "merge" || phase === "complete" ? {
            x: 0,
            y: 0,
            rotate: 0,
            opacity: 0,
            scale: 0.5,
          } : {}}
          transition={{
            duration: 0.8,
            delay: card.delay,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          {/* Paper card stamps */}
          <div className="p-2">
            <div className="w-8 h-1.5 bg-espresso/30 rounded mb-2" />
            <div className="flex gap-1 flex-wrap">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full bg-espresso/20 border border-espresso/30"
                />
              ))}
            </div>
          </div>
        </motion.div>
      ))}

      {/* Digital wallet card - large, centered */}
      <motion.div
        className="absolute"
        initial={{ scale: 0.3, opacity: 0, y: 50 }}
        animate={phase === "merge" || phase === "complete" ? {
          scale: 1,
          opacity: 1,
          y: 0,
        } : {}}
        transition={{
          duration: 0.7,
          delay: 0.5,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <motion.div
          className="relative w-72 h-44 rounded-2xl bg-gradient-to-br from-charcoal via-espresso to-charcoal shadow-2xl overflow-hidden"
          animate={phase === "complete" ? {
            boxShadow: [
              "0 20px 60px rgba(212, 175, 55, 0.3)",
              "0 30px 80px rgba(212, 175, 55, 0.5)",
              "0 20px 60px rgba(212, 175, 55, 0.3)",
            ],
          } : {}}
          transition={{
            duration: 1.2,
            delay: 0.3,
            ease: "easeInOut",
          }}
        >
          {/* Card shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
            initial={{ x: -300 }}
            animate={phase === "complete" ? { x: 400 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
          />

          {/* Card content */}
          <div className="absolute inset-0 p-5 flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-charcoal/50 rounded-xl p-2">
                  <img src={stampifyLogo} alt="Stampify" className="h-10 w-auto object-contain" />
                </div>
                <div>
                  <div className="w-20 h-2.5 bg-white/50 rounded" />
                  <div className="w-14 h-2 bg-white/30 rounded mt-1.5" />
                </div>
              </div>
            </div>

            {/* Stamp progress */}
            <div className="flex justify-between items-center">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-7 h-7 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={phase === "complete" ? { scale: 1 } : {}}
                  transition={{
                    duration: 0.3,
                    delay: 1.5 + i * 0.08,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                >
                  {i < 5 && (
                    <motion.div
                      className="w-4 h-4 rounded-full bg-white/80"
                      initial={{ scale: 0 }}
                      animate={phase === "complete" ? { scale: 1 } : {}}
                      transition={{
                        duration: 0.25,
                        delay: 1.7 + i * 0.1,
                      }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Glow effect */}
          <motion.div
            className="absolute -inset-4 rounded-3xl bg-gold/20 -z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={phase === "complete" ? {
              opacity: [0, 0.6, 0.3],
              scale: [0.9, 1.1, 1.05],
            } : {}}
            transition={{
              duration: 1,
              delay: 1.8,
              ease: "easeOut",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Floating particles */}
      {phase === "complete" && [...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-gold/60"
          initial={{ 
            opacity: 0, 
            scale: 0,
            x: 0,
            y: 0,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0.5],
            x: (Math.random() - 0.5) * 200,
            y: (Math.random() - 0.5) * 200,
          }}
          transition={{
            duration: 1.5,
            delay: 2 + i * 0.1,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
