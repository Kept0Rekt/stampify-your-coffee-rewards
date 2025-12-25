import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import stampifyLogo from "@/assets/stampify-logo.png";

export function NFCTapAnimation() {
  const [phase, setPhase] = useState<"ready" | "tapping" | "success">("ready");

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("tapping"), 600);
    const timer2 = setTimeout(() => setPhase("success"), 1400);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-espresso/10 to-charcoal" />

      {/* NFC Terminal at bottom */}
      <motion.div
        className="absolute bottom-[35%] w-56 h-20 rounded-2xl bg-gradient-to-b from-zinc-700 to-zinc-800 border border-zinc-600 shadow-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Terminal screen */}
        <div className="absolute inset-2 rounded-xl bg-zinc-900 flex items-center justify-center">
          <motion.div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            animate={{
              backgroundColor: phase === "success" 
                ? "rgba(72, 187, 120, 0.3)" 
                : "rgba(212, 175, 55, 0.2)",
            }}
          >
            {/* NFC Symbol */}
            <div className="relative">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
                  style={{
                    width: 16 + i * 12,
                    height: 16 + i * 12,
                    borderColor: phase === "success" ? "rgba(72, 187, 120, 0.8)" : "rgba(212, 175, 55, 0.6)",
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 1.2,
                    delay: i * 0.15,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Terminal indicator */}
        <motion.div
          className="absolute top-3 right-4 w-3 h-3 rounded-full"
          animate={{
            backgroundColor: phase === "success" 
              ? "rgb(72, 187, 120)" 
              : "rgba(212, 175, 55, 0.6)",
            boxShadow: phase === "success"
              ? "0 0 12px rgba(72, 187, 120, 0.8)"
              : "0 0 8px rgba(212, 175, 55, 0.4)",
          }}
        />
      </motion.div>

      {/* Phone Device */}
      <motion.div
        className="absolute w-48 h-80 rounded-[2.5rem] bg-gradient-to-b from-zinc-800 to-zinc-900 border-4 border-zinc-700 shadow-2xl overflow-hidden"
        initial={{ y: -60 }}
        animate={{
          y: phase === "tapping" || phase === "success" ? 40 : -60,
        }}
        transition={{
          duration: 0.6,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        {/* Phone notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-6 rounded-full bg-zinc-950" />

        {/* Phone screen */}
        <div className="absolute inset-3 top-10 rounded-2xl bg-gradient-to-b from-background to-muted overflow-hidden">
          {/* App content - Loyalty card */}
          <div className="absolute inset-4 flex flex-col items-center pt-4">
            {/* Mini Stampify logo */}
            <img src={stampifyLogo} alt="Stampify" className="h-5 w-auto object-contain mb-4 opacity-80" />

            {/* Loyalty card on phone */}
            <motion.div
              className="w-full h-28 rounded-xl bg-gradient-to-br from-gold via-caramel to-copper shadow-lg"
              animate={phase === "success" ? {
                boxShadow: [
                  "0 4px 20px rgba(212, 175, 55, 0.3)",
                  "0 8px 30px rgba(212, 175, 55, 0.5)",
                  "0 4px 20px rgba(212, 175, 55, 0.3)",
                ],
              } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="p-3 h-full flex flex-col justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/30" />
                  <div className="w-12 h-1.5 bg-white/40 rounded" />
                </div>

                {/* Stamps */}
                <div className="flex justify-between px-1">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-4 h-4 rounded-full border border-white/40 flex items-center justify-center"
                      initial={{ 
                        backgroundColor: i < 4 ? "rgba(255,255,255,0.5)" : "transparent" 
                      }}
                      animate={phase === "success" && i === 4 ? {
                        backgroundColor: "rgba(255,255,255,0.5)",
                        scale: [1, 1.4, 1],
                      } : {}}
                      transition={{
                        duration: 0.4,
                        delay: 0.2,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Tap instruction */}
            <motion.p
              className="text-muted-foreground text-[10px] mt-4 text-center"
              animate={{ opacity: phase === "ready" ? 1 : 0.5 }}
            >
              Hold near reader
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Ripple effects on contact */}
      {(phase === "tapping" || phase === "success") && [...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-[38%] w-40 h-12 rounded-full border-2 border-gold/40"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.5 + i * 0.3, 2 + i * 0.3],
          }}
          transition={{
            duration: 0.8,
            delay: i * 0.12,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Success stamp indicator */}
      <motion.div
        className="absolute top-[18%] right-[15%]"
        initial={{ scale: 0, opacity: 0 }}
        animate={phase === "success" ? {
          scale: [0, 1.3, 1],
          opacity: 1,
        } : {}}
        transition={{
          duration: 0.5,
          delay: 0.3,
          ease: [0.34, 1.56, 0.64, 1],
        }}
      >
        <motion.div
          className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-caramel flex items-center justify-center shadow-xl"
          animate={phase === "success" ? {
            boxShadow: [
              "0 4px 20px rgba(212, 175, 55, 0.4)",
              "0 8px 40px rgba(212, 175, 55, 0.6)",
              "0 4px 20px rgba(212, 175, 55, 0.4)",
            ],
          } : {}}
          transition={{
            duration: 1,
            repeat: 1,
            ease: "easeInOut",
          }}
        >
          <span className="text-2xl text-white font-bold">✓</span>
        </motion.div>
        <motion.p
          className="text-gold text-sm font-semibold text-center mt-2"
          initial={{ opacity: 0, y: 5 }}
          animate={phase === "success" ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          +1 Stamp
        </motion.p>
      </motion.div>
    </div>
  );
}
