import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import stampifyMachine from "@/assets/stampify-machine.png";

export function QRScanAnimation() {
  const [phase, setPhase] = useState<"arrival" | "scan" | "confirm" | "wallet" | "rest">("arrival");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("scan"), 800),
      setTimeout(() => setPhase("confirm"), 2200),
      setTimeout(() => setPhase("wallet"), 3200),
      setTimeout(() => setPhase("rest"), 4200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden">
      {/* Soft café environment background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-charcoal via-espresso/5 to-charcoal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Subtle ambient glow */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-gold/5 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1, delay: 0.3 }}
      />

      {/* Main content container - perfectly centered */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-sm">
        
        {/* Stampify Machine - Centered */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: phase === "wallet" || phase === "rest" ? 0.3 : 1, 
            scale: phase === "wallet" || phase === "rest" ? 0.85 : 1,
            y: phase === "wallet" || phase === "rest" ? -60 : 0,
          }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.img
            src={stampifyMachine}
            alt="Stampify Machine"
            className="w-56 h-auto object-contain drop-shadow-2xl"
            animate={{
              filter: phase === "confirm" 
                ? "drop-shadow(0 0 30px rgba(212, 175, 55, 0.5))" 
                : "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.4))",
            }}
            transition={{ duration: 0.4 }}
          />

          {/* QR Scanning line overlay */}
          {phase === "scan" && (
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-transparent via-gold to-transparent rounded-full"
              style={{ boxShadow: "0 0 15px rgba(212, 175, 55, 0.8)" }}
              initial={{ y: 0, opacity: 0 }}
              animate={{ 
                y: [-20, 20, -20],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 1.2,
                times: [0, 0.4, 0.8, 1],
                ease: "easeInOut",
              }}
            />
          )}

          {/* Scan success glow pulse */}
          {phase === "confirm" && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="absolute w-64 h-64 rounded-full border-2 border-gold/40"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.4, opacity: [0, 0.6, 0] }}
                transition={{ duration: 0.8 }}
              />
            </motion.div>
          )}
        </motion.div>

        {/* Phone appearing from bottom */}
        <motion.div
          className="absolute z-20"
          initial={{ y: 200, opacity: 0 }}
          animate={
            phase === "scan" 
              ? { y: 40, opacity: 1 } 
              : phase === "confirm"
              ? { y: 40, opacity: 1 }
              : phase === "wallet" || phase === "rest"
              ? { y: 200, opacity: 0 }
              : { y: 200, opacity: 0 }
          }
          transition={{ 
            duration: 0.7, 
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <div className="w-28 h-48 rounded-[1.5rem] bg-gradient-to-b from-zinc-800 to-zinc-900 border-2 border-zinc-700 shadow-2xl overflow-hidden">
            {/* Phone notch */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-4 rounded-full bg-zinc-950" />
            
            {/* Phone screen */}
            <div className="absolute inset-2 top-6 rounded-xl bg-gradient-to-b from-background to-muted flex items-center justify-center">
              {/* Camera viewfinder */}
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-2 border-gold/60 rounded-lg" />
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-gold rounded-tl" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-gold rounded-tr" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-gold rounded-bl" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-gold rounded-br" />
                
                {/* Scanning indicator */}
                {phase === "scan" && (
                  <motion.div
                    className="absolute inset-2 bg-gold/20 rounded"
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Confirmation - Centered above machine */}
        <motion.div
          className="absolute z-30 top-0"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={
            phase === "confirm" 
              ? { opacity: 1, scale: 1, y: 0 }
              : phase === "wallet"
              ? { opacity: 0, scale: 0.8, y: -20 }
              : { opacity: 0, scale: 0.8, y: 20 }
          }
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="flex flex-col items-center">
            <motion.div
              className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center shadow-xl"
              animate={phase === "confirm" ? {
                boxShadow: [
                  "0 4px 20px rgba(72, 187, 120, 0.4)",
                  "0 8px 40px rgba(72, 187, 120, 0.6)",
                  "0 4px 20px rgba(72, 187, 120, 0.4)",
                ],
              } : {}}
              transition={{ duration: 0.8 }}
            >
              <motion.span 
                className="text-white text-3xl"
                initial={{ scale: 0 }}
                animate={phase === "confirm" ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
              >
                ✓
              </motion.span>
            </motion.div>
            <motion.p
              className="text-green-400 font-semibold mt-3 text-base"
              initial={{ opacity: 0, y: 5 }}
              animate={phase === "confirm" ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
              transition={{ delay: 0.2 }}
            >
              Café Added!
            </motion.p>
          </div>
        </motion.div>

        {/* Wallet card stack - Centered */}
        <motion.div
          className="absolute z-20 flex flex-col items-center"
          initial={{ opacity: 0, y: 100 }}
          animate={
            phase === "wallet" || phase === "rest"
              ? { opacity: 1, y: 20 }
              : { opacity: 0, y: 100 }
          }
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Background cards in stack */}
          {[2, 1].map((i) => (
            <motion.div
              key={i}
              className="absolute w-56 h-32 rounded-2xl shadow-xl"
              style={{
                background: `linear-gradient(135deg, 
                  hsl(${35 + i * 8}, ${65 - i * 12}%, ${45 - i * 10}%), 
                  hsl(${25 + i * 8}, ${55 - i * 12}%, ${35 - i * 10}%))`,
                zIndex: 3 - i,
              }}
              initial={{ y: 0, scale: 1 }}
              animate={phase === "rest" ? { 
                y: i * 16, 
                scale: 1 - i * 0.04,
                opacity: 0.85 - i * 0.15,
              } : {
                y: i * 12,
                scale: 1 - i * 0.04,
                opacity: 0.8 - i * 0.15,
              }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
            >
              <div className="p-4 opacity-70">
                <div className="w-8 h-8 rounded-full bg-white/25 mb-2" />
                <div className="w-20 h-2 bg-white/25 rounded" />
              </div>
            </motion.div>
          ))}

          {/* New card sliding in from machine */}
          <motion.div
            className="relative w-56 h-32 rounded-2xl bg-gradient-to-br from-gold via-caramel to-copper shadow-2xl overflow-hidden z-10"
            initial={{ scale: 0.6, opacity: 0, y: -80 }}
            animate={phase === "wallet" || phase === "rest" ? { 
              scale: 1, 
              opacity: 1, 
              y: 0,
            } : {}}
            transition={{ 
              duration: 0.5, 
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            {/* Card shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
              initial={{ x: -250 }}
              animate={phase === "rest" ? { x: 300 } : { x: -250 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            />

            {/* Card content */}
            <div className="absolute inset-0 p-4 flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
                  <span className="text-lg">☕</span>
                </div>
                <div>
                  <div className="w-20 h-2.5 bg-white/50 rounded" />
                  <div className="w-14 h-1.5 bg-white/30 rounded mt-1.5" />
                </div>
              </div>
              
              {/* Stamp progress */}
              <div className="flex justify-between">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-5 h-5 rounded-full border-2 border-white/40 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={phase === "rest" ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                  >
                    {i === 0 && (
                      <motion.div 
                        className="w-3 h-3 rounded-full bg-white/60"
                        initial={{ scale: 0 }}
                        animate={phase === "rest" ? { scale: 1 } : {}}
                        transition={{ delay: 0.8 }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Subtle glow */}
            <motion.div
              className="absolute -inset-1 rounded-3xl bg-gold/20 -z-10"
              initial={{ opacity: 0 }}
              animate={phase === "rest" ? { opacity: [0, 0.5, 0.2] } : {}}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </motion.div>

          {/* Welcome stamp badge */}
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={phase === "rest" ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gold/20 to-caramel/20 border border-gold/30">
              <span className="text-gold text-sm">🎁</span>
              <span className="text-gold text-sm font-medium">Welcome stamp added!</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
