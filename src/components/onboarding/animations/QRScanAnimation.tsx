import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function QRScanAnimation() {
  const [phase, setPhase] = useState<"scanning" | "transform" | "slide">("scanning");

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("transform"), 1400);
    const timer2 = setTimeout(() => setPhase("slide"), 2200);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-espresso/10 to-charcoal" />

      {/* QR Code - Left side */}
      <motion.div
        className="absolute left-[8%]"
        initial={{ opacity: 1, x: 0 }}
        animate={phase === "transform" || phase === "slide" ? {
          opacity: 0,
          scale: 0.8,
          x: 100,
          rotateY: 90,
        } : {}}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="relative w-44 h-44 bg-white rounded-2xl p-4 shadow-2xl">
          {/* QR pattern */}
          <div className="w-full h-full grid grid-cols-7 gap-1">
            {[
              1,1,1,0,1,1,1,
              1,0,1,1,1,0,1,
              1,1,1,0,1,1,1,
              0,1,0,1,0,1,0,
              1,1,1,0,1,1,1,
              1,0,1,1,1,0,1,
              1,1,1,0,1,1,1,
            ].map((filled, i) => (
              <div
                key={i}
                className={`rounded-sm ${filled ? "bg-espresso" : "bg-transparent"}`}
              />
            ))}
          </div>

          {/* Scanning line */}
          {phase === "scanning" && (
            <motion.div
              className="absolute left-4 right-4 h-1 bg-gradient-to-r from-transparent via-gold to-transparent rounded-full shadow-lg"
              style={{ boxShadow: "0 0 20px rgba(212, 175, 55, 0.8)" }}
              initial={{ top: 16 }}
              animate={{ top: [16, 160, 16] }}
              transition={{
                duration: 1.4,
                repeat: 1,
                ease: "easeInOut",
              }}
            />
          )}

          {/* Corner brackets */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-gold rounded-tl-xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-gold rounded-tr-xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-gold rounded-bl-xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-gold rounded-br-xl" />
          </div>
        </div>
      </motion.div>

      {/* Wallet stack - Right side */}
      <motion.div
        className="absolute right-[8%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {/* Background cards in stack */}
        {[2, 1, 0].map((i) => (
          <motion.div
            key={i}
            className="absolute w-48 h-28 rounded-xl shadow-lg"
            style={{
              background: `linear-gradient(135deg, 
                hsl(${35 + i * 5}, ${70 - i * 10}%, ${50 - i * 8}%), 
                hsl(${25 + i * 5}, ${60 - i * 10}%, ${40 - i * 8}%))`,
              zIndex: 3 - i,
            }}
            initial={{ y: i * 12, scale: 1 - i * 0.05, opacity: 0.9 - i * 0.2 }}
            animate={phase === "slide" ? {
              y: (i + 1) * 14,
              scale: 1 - (i + 1) * 0.05,
            } : {}}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="p-3 opacity-60">
              <div className="w-6 h-6 rounded-full bg-white/30 mb-2" />
              <div className="w-16 h-1.5 bg-white/30 rounded" />
            </div>
          </motion.div>
        ))}

        {/* New card sliding in */}
        <motion.div
          className="absolute w-48 h-28 rounded-xl bg-gradient-to-br from-gold via-caramel to-copper shadow-2xl overflow-hidden"
          initial={{ x: -200, opacity: 0, rotateY: -45 }}
          animate={phase === "slide" ? {
            x: 0,
            opacity: 1,
            rotateY: 0,
            y: 0,
          } : phase === "transform" ? {
            x: -100,
            opacity: 1,
            rotateY: -20,
          } : {}}
          transition={{
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1],
          }}
          style={{ zIndex: 4 }}
        >
          {/* Card shine */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
            initial={{ x: -200 }}
            animate={phase === "slide" ? { x: 250 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          />

          <div className="p-3 h-full flex flex-col justify-between relative">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center">
                <span className="text-sm">☕</span>
              </div>
              <div>
                <div className="w-16 h-2 bg-white/50 rounded" />
                <div className="w-10 h-1 bg-white/30 rounded mt-1" />
              </div>
            </div>
            <div className="flex gap-1">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-full border border-white/40 bg-white/10"
                />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Success indicator */}
      <motion.div
        className="absolute top-[20%]"
        initial={{ scale: 0, opacity: 0 }}
        animate={phase === "slide" ? {
          scale: 1,
          opacity: 1,
        } : {}}
        transition={{
          duration: 0.5,
          delay: 0.5,
          ease: [0.34, 1.56, 0.64, 1],
        }}
      >
        <div className="flex flex-col items-center">
          <motion.div
            className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-xl"
            animate={phase === "slide" ? {
              boxShadow: [
                "0 4px 20px rgba(72, 187, 120, 0.4)",
                "0 8px 40px rgba(72, 187, 120, 0.6)",
                "0 4px 20px rgba(72, 187, 120, 0.4)",
              ],
            } : {}}
            transition={{ duration: 1, repeat: 1 }}
          >
            <span className="text-white text-2xl">✓</span>
          </motion.div>
          <motion.p
            className="text-green-400 text-sm font-semibold mt-2"
            initial={{ opacity: 0, y: 5 }}
            animate={phase === "slide" ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
          >
            Café Added!
          </motion.p>
        </div>
      </motion.div>

      {/* Decorative connection line */}
      <motion.div
        className="absolute top-1/2 left-[30%] right-[30%] h-0.5 bg-gradient-to-r from-gold/0 via-gold/50 to-gold/0"
        initial={{ scaleX: 0 }}
        animate={phase === "transform" ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
}
