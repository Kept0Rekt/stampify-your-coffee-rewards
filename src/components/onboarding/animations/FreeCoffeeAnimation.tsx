import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function FreeCoffeeAnimation() {
  const [phase, setPhase] = useState<"free" | "premium" | "reward">("free");

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("premium"), 2200);
    const timer2 = setTimeout(() => setPhase("reward"), 3800);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const freeStamps = 8;
  const premiumStamps = 5;

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Background gradient - professional light */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-100 via-stone-50 to-neutral-100" />

      {/* Free Plan Section */}
      <motion.div
        className="absolute w-full px-8"
        initial={{ opacity: 1, y: 0 }}
        animate={phase !== "free" ? { opacity: 0, y: -50 } : {}}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-neutral-500 text-sm font-medium">FREE PLAN</span>
        </motion.div>

        {/* 8 Stamps Row */}
        <div className="flex justify-center gap-3 mb-4">
          {[...Array(freeStamps)].map((_, i) => (
            <motion.div
              key={i}
              className="relative"
            >
              <motion.div
                className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center bg-white"
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
              >
                <motion.div
                  className="w-6 h-6 rounded-full"
                  style={{ background: "hsl(38 38% 60%)" }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.8 + i * 0.15,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-neutral-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          8 stamps for free coffee
        </motion.p>
      </motion.div>

      {/* Premium Plan Section */}
      <motion.div
        className="absolute w-full px-8"
        initial={{ opacity: 0, y: 50 }}
        animate={phase === "premium" || phase === "reward" ? { 
          opacity: phase === "premium" ? 1 : 0.3, 
          y: phase === "reward" ? -80 : 0,
          scale: phase === "reward" ? 0.9 : 1,
        } : {}}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={phase === "premium" || phase === "reward" ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          <span className="text-sm font-semibold flex items-center justify-center gap-2" style={{ color: "hsl(38 38% 50%)" }}>
            <span className="text-lg">👑</span> PREMIUM PLAN
          </span>
        </motion.div>

        {/* 5 Stamps Row - Larger */}
        <div className="flex justify-center gap-5 mb-4">
          {[...Array(premiumStamps)].map((_, i) => (
            <motion.div
              key={i}
              className="relative"
            >
              <motion.div
                className="w-14 h-14 rounded-full flex items-center justify-center shadow-sm bg-white"
                style={{ 
                  border: "2px solid hsl(38 38% 60%)",
                }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={phase === "premium" || phase === "reward" ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.08 }}
              >
                <motion.div
                  className="w-9 h-9 rounded-full"
                  style={{ background: "hsl(38 38% 60%)" }}
                  initial={{ scale: 0 }}
                  animate={phase === "premium" || phase === "reward" ? { scale: 1 } : {}}
                  transition={{
                    duration: 0.25,
                    delay: 0.5 + i * 0.1,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                />
              </motion.div>

              {/* Glow on last stamp */}
              {i === premiumStamps - 1 && (phase === "premium" || phase === "reward") && (
                <motion.div
                  className="absolute -inset-2 rounded-full -z-10"
                  style={{ background: "hsla(38, 38%, 60%, 0.15)" }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: [0, 0.6, 0], scale: [0.8, 1.3, 1.5] }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                />
              )}
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-sm font-medium"
          style={{ color: "hsl(38 38% 50%)" }}
          initial={{ opacity: 0 }}
          animate={phase === "premium" || phase === "reward" ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
        >
          Only 5 stamps needed! 🎉
        </motion.p>
      </motion.div>

      {/* Coffee Cup with Steam & Reward */}
      <motion.div
        className="absolute bottom-[25%]"
        initial={{ scale: 0, opacity: 0 }}
        animate={phase === "reward" ? { scale: 1, opacity: 1 } : {}}
        transition={{
          duration: 0.6,
          ease: [0.34, 1.56, 0.64, 1],
        }}
      >
        <div className="flex flex-col items-center">
          {/* Coffee cup */}
          <div className="relative">
            {/* Steam */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 bg-gradient-to-t from-neutral-300 to-transparent rounded-full"
                  initial={{ height: 0, opacity: 0 }}
                  animate={phase === "reward" ? {
                    height: [0, 20, 30, 20],
                    opacity: [0, 0.5, 0.3, 0],
                    y: [0, -5, -15, -25],
                  } : {}}
                  transition={{
                    duration: 2,
                    delay: 0.4 + i * 0.2,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>

            {/* Cup */}
            <motion.div
              className="relative w-20 h-24 rounded-b-3xl rounded-t-lg shadow-md"
              style={{ background: "linear-gradient(to bottom, hsl(35 18% 92%), hsl(35 16% 88%))" }}
              animate={phase === "reward" ? {
                boxShadow: [
                  "0 4px 16px hsla(38, 38%, 60%, 0.12)",
                  "0 8px 24px hsla(38, 38%, 60%, 0.18)",
                  "0 4px 16px hsla(38, 38%, 60%, 0.12)",
                ],
              } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {/* Coffee */}
              <div className="absolute inset-x-2 top-3 bottom-3 bg-gradient-to-b from-amber-700 to-amber-900 rounded-b-2xl rounded-t-sm" />
              
              {/* Handle */}
              <div className="absolute top-3 -right-4 w-5 h-12 border-4 rounded-r-full" style={{ borderColor: "hsl(35 18% 92%)" }} />
            </motion.div>
          </div>

          {/* Free Coffee Badge */}
          <motion.div
            className="mt-6"
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={phase === "reward" ? { scale: 1, opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: 0.8,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          >
            <motion.div
              className="px-6 py-3 rounded-full shadow-md"
              style={{ background: "hsl(38 38% 60%)" }}
              animate={phase === "reward" ? {
                boxShadow: [
                  "0 2px 12px hsla(38, 38%, 60%, 0.2)",
                  "0 4px 20px hsla(38, 38%, 60%, 0.3)",
                  "0 2px 12px hsla(38, 38%, 60%, 0.2)",
                ],
              } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span className="text-white font-semibold text-base">🎉 FREE COFFEE!</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Comparison indicator */}
      <motion.div
        className="absolute top-[15%] right-8 flex items-center gap-2"
        initial={{ opacity: 0, x: 20 }}
        animate={phase === "premium" ? { opacity: 1, x: 0 } : { opacity: 0 }}
        transition={{ delay: 0.8 }}
      >
        <span className="text-2xl font-bold" style={{ color: "hsl(140 14% 50%)" }}>3×</span>
        <span className="text-sm" style={{ color: "hsl(140 14% 50%)" }}>faster</span>
      </motion.div>
    </div>
  );
}
