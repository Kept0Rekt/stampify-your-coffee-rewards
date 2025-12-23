import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Vector Stampify Machine Component
function StampifyMachine({ glowing = false }: { glowing?: boolean }) {
  return (
    <div className="relative">
      {/* Machine Stand/Base */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-8 bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-b-xl shadow-lg" />
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-28 h-6 bg-gradient-to-r from-zinc-700 via-zinc-600 to-zinc-700 rounded-lg" />

      {/* Machine Body */}
      <div className="relative w-36 h-56 rounded-[1.75rem] bg-gradient-to-b from-zinc-800 to-zinc-900 border-4 border-latte/80 shadow-2xl overflow-hidden">
        
        {/* Inner Screen */}
        <div className="absolute inset-3 rounded-2xl bg-gradient-to-b from-zinc-900 to-charcoal flex flex-col items-center pt-4">
          
          {/* Status indicators */}
          <div className="flex justify-between w-full px-3 mb-3">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-gold/60" />
              <span className="text-[6px] text-muted-foreground">Ready</span>
            </div>
            <div className="flex items-center gap-1">
              <motion.div 
                className="w-1.5 h-1.5 rounded-full bg-green-500"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-[6px] text-muted-foreground">Online</span>
            </div>
          </div>

          {/* NFC Ring */}
          <motion.div 
            className="relative w-20 h-20 rounded-full flex items-center justify-center mb-2"
            animate={glowing ? {
              boxShadow: [
                "0 0 0 0 rgba(212, 175, 55, 0)",
                "0 0 20px 8px rgba(212, 175, 55, 0.4)",
                "0 0 0 0 rgba(212, 175, 55, 0)",
              ],
            } : {}}
            transition={{ duration: 1 }}
          >
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-2 border-gold/40" />
            <motion.div 
              className="absolute inset-1 rounded-full border border-gold/20"
              animate={glowing ? { borderColor: "rgba(212, 175, 55, 0.6)" } : {}}
            />
            
            {/* Inner logo area */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold/20 to-caramel/10 flex items-center justify-center border border-gold/30">
              {/* Stylized S logo */}
              <svg viewBox="0 0 24 24" className="w-8 h-8">
                <motion.path
                  d="M12 4C8 4 6 6.5 6 9c0 3 3 4 6 5s6 2 6 5c0 2.5-2 5-6 5"
                  stroke="url(#goldGradient)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                  animate={glowing ? { 
                    filter: "drop-shadow(0 0 4px rgba(212, 175, 55, 0.8))" 
                  } : {}}
                />
                <defs>
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#B8860B" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* NFC waves */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border border-gold/30"
                initial={{ scale: 1, opacity: 0 }}
                animate={glowing ? {
                  scale: [1, 1.3 + i * 0.15],
                  opacity: [0, 0.5, 0],
                } : {}}
                transition={{
                  duration: 0.8,
                  delay: i * 0.15,
                }}
              />
            ))}
          </motion.div>

          {/* Stampify text */}
          <span className="text-gold font-semibold text-sm tracking-wide mb-3">Stampify</span>

          {/* QR Code area */}
          <div className="relative w-14 h-14 bg-white rounded-lg p-1.5 shadow-inner">
            {/* Simplified QR pattern */}
            <div className="w-full h-full grid grid-cols-5 gap-0.5">
              {[
                1,1,1,0,1,
                1,0,1,1,1,
                1,1,0,1,1,
                0,1,1,0,1,
                1,1,1,1,1,
              ].map((filled, idx) => (
                <div
                  key={idx}
                  className={`rounded-[1px] ${filled ? "bg-charcoal" : "bg-transparent"}`}
                />
              ))}
            </div>
          </div>

          {/* Scan text */}
          <span className="text-[8px] text-muted-foreground mt-2">Scan to join</span>
        </div>
      </div>
    </div>
  );
}

// Vector Phone Component
function VectorPhone({ scanning = false }: { scanning?: boolean }) {
  return (
    <div className="w-20 h-36 rounded-[1.25rem] bg-gradient-to-b from-zinc-700 to-zinc-800 border-2 border-zinc-600 shadow-xl overflow-hidden">
      {/* Notch */}
      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-3 rounded-full bg-zinc-900" />
      
      {/* Screen */}
      <div className="absolute inset-1.5 top-5 rounded-xl bg-gradient-to-b from-background to-muted flex items-center justify-center">
        {/* Camera viewfinder */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-2 border-gold/50 rounded-lg" />
          
          {/* Corners */}
          <div className="absolute -top-0.5 -left-0.5 w-3 h-3 border-t-2 border-l-2 border-gold rounded-tl" />
          <div className="absolute -top-0.5 -right-0.5 w-3 h-3 border-t-2 border-r-2 border-gold rounded-tr" />
          <div className="absolute -bottom-0.5 -left-0.5 w-3 h-3 border-b-2 border-l-2 border-gold rounded-bl" />
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 border-b-2 border-r-2 border-gold rounded-br" />
          
          {/* Scanning indicator */}
          {scanning && (
            <motion.div
              className="absolute inset-1 bg-gold/20 rounded"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// Vector Loyalty Card
function VectorCard({ isNew = false }: { isNew?: boolean }) {
  return (
    <motion.div
      className={`relative w-52 h-28 rounded-xl overflow-hidden shadow-xl ${
        isNew 
          ? "bg-gradient-to-br from-gold via-caramel to-copper" 
          : "bg-gradient-to-br from-zinc-600 to-zinc-700"
      }`}
    >
      {/* Shine effect for new card */}
      {isNew && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12"
          initial={{ x: -200 }}
          animate={{ x: 250 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        />
      )}

      <div className="absolute inset-0 p-3.5 flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isNew ? "bg-white/30" : "bg-white/20"
          }`}>
            <span className="text-sm">☕</span>
          </div>
          <div>
            <div className={`w-16 h-2 rounded ${isNew ? "bg-white/50" : "bg-white/30"}`} />
            <div className={`w-10 h-1.5 rounded mt-1 ${isNew ? "bg-white/30" : "bg-white/20"}`} />
          </div>
        </div>
        
        {/* Stamps */}
        <div className="flex justify-between px-1">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full border ${
                isNew ? "border-white/40" : "border-white/25"
              } flex items-center justify-center`}
            >
              {isNew && i === 0 && (
                <div className="w-2.5 h-2.5 rounded-full bg-white/60" />
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function QRScanAnimation() {
  const [phase, setPhase] = useState<"idle" | "scan" | "glow" | "wallet" | "rest">("idle");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("scan"), 600),
      setTimeout(() => setPhase("glow"), 1800),
      setTimeout(() => setPhase("wallet"), 2600),
      setTimeout(() => setPhase("rest"), 3600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const isGlowing = phase === "glow" || phase === "wallet";

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-espresso/5 to-charcoal" />

      {/* Ambient glow */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-gold/5 blur-3xl"
        animate={{ opacity: isGlowing ? 0.8 : 0.3 }}
        transition={{ duration: 0.5 }}
      />

      {/* Centered content container */}
      <div className="relative flex flex-col items-center justify-center">
        
        {/* Stampify Machine - Centered */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: phase === "wallet" || phase === "rest" ? 0.2 : 1, 
            y: phase === "wallet" || phase === "rest" ? -80 : 0,
            scale: phase === "wallet" || phase === "rest" ? 0.75 : 1,
          }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <StampifyMachine glowing={isGlowing} />

          {/* Scanning line */}
          {phase === "scan" && (
            <motion.div
              className="absolute bottom-16 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent rounded-full z-20"
              style={{ boxShadow: "0 0 12px rgba(212, 175, 55, 0.8)" }}
              initial={{ y: -15, opacity: 0 }}
              animate={{ 
                y: [- 15, 15, -15],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 1.0,
                times: [0, 0.45, 0.9, 1],
                ease: "easeInOut",
              }}
            />
          )}
        </motion.div>

        {/* Phone rising from bottom */}
        <motion.div
          className="absolute z-20"
          initial={{ y: 180, opacity: 0 }}
          animate={
            phase === "scan" || phase === "glow"
              ? { y: 60, opacity: 1 }
              : phase === "wallet" || phase === "rest"
              ? { y: 180, opacity: 0 }
              : { y: 180, opacity: 0 }
          }
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <VectorPhone scanning={phase === "scan"} />
        </motion.div>

        {/* Success confirmation - Centered */}
        <motion.div
          className="absolute z-30 -top-8"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={
            phase === "glow"
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.8, y: -20 }
          }
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="flex flex-col items-center">
            <motion.div
              className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-xl"
              animate={phase === "glow" ? {
                boxShadow: [
                  "0 4px 20px rgba(72, 187, 120, 0.4)",
                  "0 8px 35px rgba(72, 187, 120, 0.6)",
                  "0 4px 20px rgba(72, 187, 120, 0.4)",
                ],
              } : {}}
              transition={{ duration: 0.6 }}
            >
              <motion.svg 
                viewBox="0 0 24 24" 
                className="w-7 h-7 text-white"
                initial={{ pathLength: 0 }}
                animate={phase === "glow" ? { pathLength: 1 } : {}}
              >
                <motion.path
                  d="M5 12l5 5L19 7"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={phase === "glow" ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                />
              </motion.svg>
            </motion.div>
            <motion.p
              className="text-green-400 font-semibold mt-2.5 text-sm"
              initial={{ opacity: 0, y: 5 }}
              animate={phase === "glow" ? { opacity: 1, y: 0 } : { opacity: 0 }}
              transition={{ delay: 0.2 }}
            >
              Café Added!
            </motion.p>
          </div>
        </motion.div>

        {/* Wallet card stack - Centered */}
        <motion.div
          className="absolute z-20 flex flex-col items-center"
          initial={{ opacity: 0, y: 80 }}
          animate={
            phase === "wallet" || phase === "rest"
              ? { opacity: 1, y: 10 }
              : { opacity: 0, y: 80 }
          }
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Stack cards behind */}
          {[1, 0].map((i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ y: 0 }}
              animate={phase === "rest" ? { 
                y: (i + 1) * 14, 
                scale: 1 - (i + 1) * 0.04,
                opacity: 0.7 - i * 0.2,
              } : {
                y: (i + 1) * 10,
                scale: 1 - (i + 1) * 0.04,
                opacity: 0.6 - i * 0.15,
              }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              style={{ zIndex: -i }}
            >
              <VectorCard isNew={false} />
            </motion.div>
          ))}

          {/* New card animating in */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: -60 }}
            animate={phase === "wallet" || phase === "rest" ? { 
              scale: 1, 
              opacity: 1, 
              y: 0,
            } : {}}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <VectorCard isNew={true} />
            
            {/* Subtle glow */}
            <motion.div
              className="absolute -inset-2 rounded-2xl bg-gold/15 -z-10 blur-sm"
              initial={{ opacity: 0 }}
              animate={phase === "rest" ? { opacity: [0, 0.6, 0.3] } : {}}
              transition={{ duration: 0.8 }}
            />
          </motion.div>

          {/* Welcome badge */}
          <motion.div
            className="mt-5"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={phase === "rest" ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gold/15 to-caramel/15 border border-gold/25">
              <span className="text-gold text-sm">🎁</span>
              <span className="text-gold text-sm font-medium">Welcome stamp added!</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
