import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function FreeCoffeeAnimation() {
  const [phase, setPhase] = useState<"filling" | "complete" | "steam">("filling");

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("complete"), 1600);
    const timer2 = setTimeout(() => setPhase("steam"), 2000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const stamps = [0, 1, 2, 3, 4];

  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      {/* Loyalty card with stamps */}
      <motion.div
        className="absolute w-24 h-16 rounded-xl bg-gradient-to-br from-charcoal to-espresso border border-gold/30 shadow-lg"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Card header */}
        <div className="absolute top-1.5 left-2 flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-gold/60" />
          <div className="w-6 h-1 rounded bg-gold/40" />
        </div>

        {/* Stamp circles */}
        <div className="absolute bottom-2 left-2 right-2 flex justify-between">
          {stamps.map((i) => (
            <motion.div
              key={i}
              className="relative w-3.5 h-3.5"
            >
              {/* Outline */}
              <div className="absolute inset-0 rounded-full border border-gold/40" />
              
              {/* Fill */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-gold to-caramel"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.25,
                  delay: 0.3 + i * 0.2,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
              />

              {/* Checkmark */}
              <motion.span
                className="absolute inset-0 flex items-center justify-center text-[6px] text-white font-bold"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.2,
                  delay: 0.4 + i * 0.2,
                }}
              >
                ✓
              </motion.span>

              {/* Last stamp glow */}
              {i === 4 && (
                <motion.div
                  className="absolute -inset-1 rounded-full bg-gold/30"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={phase === "complete" || phase === "steam" ? {
                    opacity: [0, 0.8, 0],
                    scale: [0.5, 1.5, 1.8],
                  } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Coffee cup */}
      <motion.div
        className="absolute -bottom-2 right-0"
        initial={{ scale: 0, opacity: 0 }}
        animate={phase === "complete" || phase === "steam" ? {
          scale: 1,
          opacity: 1,
        } : {}}
        transition={{
          duration: 0.4,
          delay: 0.3,
          ease: [0.34, 1.56, 0.64, 1],
        }}
      >
        {/* Cup body */}
        <div className="relative w-8 h-9 bg-gradient-to-b from-latte to-caramel/80 rounded-b-lg rounded-t-sm shadow-md">
          {/* Coffee liquid */}
          <div className="absolute inset-x-0.5 top-1 bottom-1 bg-gradient-to-b from-amber-900 to-amber-950 rounded-b-md rounded-t-sm" />
          
          {/* Cup handle */}
          <div className="absolute top-1 -right-1.5 w-2 h-4 border-2 border-latte rounded-r-full" />

          {/* Steam */}
          {phase === "steam" && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-0.5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-0.5 bg-gradient-to-t from-muted-foreground/40 to-transparent rounded-full"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: [0, 8, 12, 8],
                    opacity: [0, 0.6, 0.4, 0],
                    y: [0, -2, -6, -10],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.2,
                    repeat: 1,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Free Coffee Badge */}
      <motion.div
        className="absolute -top-3 left-0"
        initial={{ scale: 0, opacity: 0, y: 10 }}
        animate={phase === "steam" ? {
          scale: 1,
          opacity: 1,
          y: 0,
        } : {}}
        transition={{
          duration: 0.5,
          delay: 0.5,
          ease: [0.34, 1.56, 0.64, 1],
        }}
      >
        <motion.div
          className="px-2 py-1 rounded-full bg-gradient-to-r from-gold to-caramel shadow-lg"
          animate={phase === "steam" ? {
            boxShadow: [
              "0 2px 8px rgba(212, 175, 55, 0.3)",
              "0 4px 16px rgba(212, 175, 55, 0.5)",
              "0 2px 8px rgba(212, 175, 55, 0.3)",
            ],
          } : {}}
          transition={{
            duration: 1,
            repeat: 1,
            ease: "easeInOut",
          }}
        >
          <span className="text-[8px] font-bold text-white whitespace-nowrap">
            FREE ☕
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
