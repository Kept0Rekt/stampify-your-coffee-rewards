import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function QRScanAnimation() {
  const [phase, setPhase] = useState<"scanning" | "transform" | "complete">("scanning");

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("transform"), 1200);
    const timer2 = setTimeout(() => setPhase("complete"), 2000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      {/* QR Code */}
      <motion.div
        className="absolute"
        initial={{ scale: 1, opacity: 1 }}
        animate={phase === "transform" || phase === "complete" ? {
          scale: 0.8,
          opacity: 0,
          rotateY: 90,
        } : {}}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="w-20 h-20 bg-white rounded-lg p-2 shadow-lg">
          {/* QR pattern */}
          <div className="w-full h-full grid grid-cols-5 gap-0.5">
            {[
              1, 1, 1, 0, 1,
              1, 0, 1, 1, 1,
              1, 1, 1, 0, 1,
              0, 1, 0, 1, 0,
              1, 1, 1, 1, 1,
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
              className="absolute left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent"
              initial={{ top: 8 }}
              animate={{ top: [8, 72, 8] }}
              transition={{
                duration: 1.2,
                repeat: 1,
                ease: "easeInOut",
              }}
            />
          )}

          {/* Corner brackets */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Top-left */}
            <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-gold rounded-tl-lg" />
            {/* Top-right */}
            <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-gold rounded-tr-lg" />
            {/* Bottom-left */}
            <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-gold rounded-bl-lg" />
            {/* Bottom-right */}
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-gold rounded-br-lg" />
          </div>
        </div>
      </motion.div>

      {/* Café Card emerges */}
      <motion.div
        className="absolute"
        initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
        animate={phase === "transform" || phase === "complete" ? {
          scale: 1,
          opacity: 1,
          rotateY: 0,
        } : {}}
        transition={{
          duration: 0.5,
          delay: 0.3,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <motion.div
          className="w-20 h-14 rounded-xl bg-gradient-to-br from-gold via-caramel to-copper shadow-lg relative overflow-hidden"
          animate={phase === "complete" ? { y: [0, 4, 0] } : {}}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Card shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
            initial={{ x: -100 }}
            animate={phase === "complete" ? { x: 100 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          />

          {/* Card content */}
          <div className="absolute inset-0 p-2 flex flex-col justify-between">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-white/40" />
              <div className="w-6 h-1 rounded bg-white/50" />
            </div>
            <div className="flex gap-0.5">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-white/50" />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Card stack (wallet) */}
      {phase === "complete" && (
        <>
          <motion.div
            className="absolute w-20 h-14 rounded-xl bg-gradient-to-br from-copper/60 to-caramel/60 shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.6, y: 16, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
          <motion.div
            className="absolute w-20 h-14 rounded-xl bg-gradient-to-br from-caramel/40 to-copper/40 shadow"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 0.4, y: 24, scale: 0.85 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          />
        </>
      )}

      {/* Success checkmark */}
      <motion.div
        className="absolute -top-1 -right-1"
        initial={{ scale: 0, opacity: 0 }}
        animate={phase === "complete" ? {
          scale: [0, 1.2, 1],
          opacity: 1,
        } : {}}
        transition={{
          duration: 0.4,
          delay: 0.6,
          ease: [0.34, 1.56, 0.64, 1],
        }}
      >
        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shadow-md">
          <span className="text-xs text-white">✓</span>
        </div>
      </motion.div>
    </div>
  );
}
