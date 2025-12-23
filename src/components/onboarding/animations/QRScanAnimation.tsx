import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Minimal QR Machine
function QRMachine({ scanning = false }: { scanning?: boolean }) {
  return (
    <div className="relative w-20 h-28">
      {/* Stand */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-3 bg-gradient-to-b from-zinc-700 to-zinc-800 rounded-b-lg" />
      
      {/* Body */}
      <div className="relative w-full h-full rounded-xl bg-gradient-to-b from-zinc-800 to-zinc-900 border-2 border-latte/60 shadow-lg overflow-hidden">
        <div className="absolute inset-1.5 rounded-lg bg-charcoal flex flex-col items-center justify-center gap-2">
          
          {/* NFC Ring */}
          <motion.div 
            className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center"
            animate={scanning ? {
              boxShadow: [
                "0 0 0 0 rgba(212, 175, 55, 0)",
                "0 0 12px 4px rgba(212, 175, 55, 0.3)",
                "0 0 0 0 rgba(212, 175, 55, 0)",
              ],
            } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="w-4 h-4 rounded-full bg-gold/20 flex items-center justify-center">
              <span className="text-[8px] text-gold">S</span>
            </div>
          </motion.div>

          {/* QR Code */}
          <div className="relative w-10 h-10 bg-white rounded p-1">
            <div className="w-full h-full grid grid-cols-4 gap-px">
              {[1,1,0,1, 1,0,1,1, 0,1,1,0, 1,1,0,1].map((f, i) => (
                <div key={i} className={f ? "bg-charcoal" : "bg-transparent"} />
              ))}
            </div>
            
            {/* Scan line */}
            {scanning && (
              <motion.div
                className="absolute left-1 right-1 h-0.5 bg-gold rounded-full"
                style={{ boxShadow: "0 0 8px rgba(212, 175, 55, 0.8)" }}
                initial={{ top: 4 }}
                animate={{ top: [4, 32, 4] }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Phone with dynamic screen content
function Phone({ 
  showCard = false, 
  showScanner = true 
}: { 
  showCard?: boolean;
  showScanner?: boolean;
}) {
  return (
    <div className="relative w-44 h-72 rounded-[2rem] bg-gradient-to-b from-zinc-800 to-zinc-900 border-[3px] border-zinc-700 shadow-2xl overflow-hidden">
      {/* Notch */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-5 rounded-full bg-zinc-950 z-10" />
      
      {/* Screen */}
      <div className="absolute inset-2 top-8 rounded-2xl bg-gradient-to-b from-background to-muted overflow-hidden">
        
        {/* Scanner view */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          animate={{ opacity: showScanner && !showCard ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-center gap-4">
            {/* Viewfinder */}
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-2 border-gold/40 rounded-xl" />
              <div className="absolute -top-1 -left-1 w-5 h-5 border-t-3 border-l-3 border-gold rounded-tl-lg" style={{ borderWidth: '3px' }} />
              <div className="absolute -top-1 -right-1 w-5 h-5 border-t-3 border-r-3 border-gold rounded-tr-lg" style={{ borderWidth: '3px' }} />
              <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-3 border-l-3 border-gold rounded-bl-lg" style={{ borderWidth: '3px' }} />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-3 border-r-3 border-gold rounded-br-lg" style={{ borderWidth: '3px' }} />
            </div>
            <span className="text-muted-foreground text-xs">Scan café QR code</span>
          </div>
        </motion.div>

        {/* Loyalty card appearing */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center p-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: showCard ? 1 : 0, 
            scale: showCard ? 1 : 0.9 
          }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="w-full">
            {/* Card */}
            <motion.div 
              className="w-full h-36 rounded-xl bg-gradient-to-br from-gold via-caramel to-copper shadow-lg overflow-hidden"
              initial={{ y: 20 }}
              animate={{ y: showCard ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Shine */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                initial={{ x: -150 }}
                animate={showCard ? { x: 200 } : { x: -150 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              />
              
              <div className="relative p-4 h-full flex flex-col justify-between">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/25 flex items-center justify-center">
                    <span className="text-lg">☕</span>
                  </div>
                  <div>
                    <div className="text-white/90 font-semibold text-sm">The Daily Grind</div>
                    <div className="text-white/60 text-xs">Loyalty Card</div>
                  </div>
                </div>

                {/* Stamps */}
                <div className="flex justify-between">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-5 h-5 rounded-full border-2 border-white/40 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={showCard ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: 0.6 + i * 0.04, duration: 0.2 }}
                    >
                      {i === 0 && (
                        <motion.div 
                          className="w-3 h-3 rounded-full bg-white/70"
                          initial={{ scale: 0 }}
                          animate={showCard ? { scale: 1 } : { scale: 0 }}
                          transition={{ delay: 0.9, duration: 0.2 }}
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Welcome text */}
            <motion.p
              className="text-center text-gold text-xs font-medium mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: showCard ? 1 : 0 }}
              transition={{ delay: 1.1, duration: 0.3 }}
            >
              🎁 Welcome stamp added!
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function QRScanAnimation() {
  const [phase, setPhase] = useState<"idle" | "scan" | "confirm" | "card">("idle");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("scan"), 500),
      setTimeout(() => setPhase("confirm"), 1600),
      setTimeout(() => setPhase("card"), 2400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const isScanning = phase === "scan";
  const showConfirm = phase === "confirm";
  const showCard = phase === "card";

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Clean background */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal to-espresso/10" />

      {/* Main centered container */}
      <div className="relative flex flex-col items-center">
        
        {/* Confirmation message - appears alone */}
        <motion.div
          className="absolute -top-20 z-20"
          initial={{ opacity: 0, y: 10 }}
          animate={showConfirm ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-500/20 border border-green-500/40">
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-3 h-3 text-white">
                <path d="M5 12l5 5L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <span className="text-green-400 font-medium text-sm">Café added</span>
          </div>
        </motion.div>

        {/* Phone - always centered */}
        <motion.div
          animate={{
            y: isScanning ? 30 : 0,
          }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <Phone showCard={showCard} showScanner={!showCard} />
        </motion.div>

        {/* QR Machine - below phone */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: showCard ? 0 : 1,
            y: showCard ? 20 : 0,
          }}
          transition={{ duration: 0.4 }}
        >
          <QRMachine scanning={isScanning} />
        </motion.div>

      </div>
    </div>
  );
}
