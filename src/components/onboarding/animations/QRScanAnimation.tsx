import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// QR Code component
function QRCode({ size = "md" }: { size?: "sm" | "md" }) {
  const dim = size === "sm" ? "w-16 h-16" : "w-24 h-24";
  return (
    <div className={`${dim} bg-white rounded-lg p-2 shadow-lg`}>
      <div className="w-full h-full grid grid-cols-5 gap-0.5">
        {[1,1,1,0,1, 1,0,1,1,1, 1,1,0,1,0, 0,1,1,0,1, 1,1,1,1,1].map((f, i) => (
          <div key={i} className={`rounded-[1px] ${f ? "bg-charcoal" : "bg-transparent"}`} />
        ))}
      </div>
    </div>
  );
}

// QR Machine below phone
function QRMachine() {
  return (
    <div className="relative flex flex-col items-center">
      {/* Terminal body */}
      <div 
        className="w-28 h-20 rounded-xl bg-gradient-to-b from-zinc-700 to-zinc-800 relative"
        style={{ boxShadow: '0 8px 24px -8px rgba(0,0,0,0.5)' }}
      >
        {/* Screen */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-10 rounded-lg bg-gradient-to-b from-zinc-900 to-black overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <QRCode size="sm" />
          </div>
        </div>
      </div>
      {/* Base stand */}
      <div className="w-16 h-2 rounded-b-lg bg-zinc-800 -mt-1" />
    </div>
  );
}

// iPhone device with 3D transform support
function IPhoneDevice({ 
  showCard = false, 
  showScanner = true,
  isScanning = false,
  showQRInside = false,
}: { 
  showCard?: boolean;
  showScanner?: boolean;
  isScanning?: boolean;
  showQRInside?: boolean;
}) {
  return (
    <div className="relative w-52 h-[380px]" style={{ transformStyle: 'preserve-3d' }}>
      {/* Outer frame with metallic edge */}
      <div 
        className="absolute inset-0 rounded-[3rem] bg-gradient-to-b from-zinc-600 via-zinc-700 to-zinc-800"
        style={{
          boxShadow: `
            inset 0 1px 0 rgba(255,255,255,0.15),
            inset 0 -1px 0 rgba(0,0,0,0.3),
            0 25px 50px -12px rgba(0,0,0,0.5)
          `
        }}
      />
      
      {/* Inner bezel */}
      <div className="absolute inset-[3px] rounded-[2.75rem] bg-zinc-900" />
      
      {/* Screen area */}
      <div 
        className="absolute inset-[6px] rounded-[2.5rem] overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #1a1a1e 0%, #0d0d0f 100%)',
          boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.5)'
        }}
      >
        {/* Dynamic Island */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[90px] h-[28px] bg-black rounded-full z-20 flex items-center justify-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-700">
            <div className="w-1 h-1 rounded-full bg-zinc-600 mt-[2px] ml-[2px]" />
          </div>
        </div>

        {/* Screen content */}
        <div className="absolute inset-0 pt-14 pb-2 px-3">
          
          {/* Camera/Scanner view */}
          <motion.div 
            className="absolute inset-0 pt-16 flex flex-col items-center justify-center"
            animate={{ opacity: showScanner && !showCard ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Status bar */}
            <div className="absolute top-16 left-0 right-0 flex justify-between px-6">
              <span className="text-[10px] text-white/40 font-light tracking-wide">9:41</span>
              <div className="flex items-center gap-1">
                <div className="flex gap-0.5">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-0.5 rounded-full bg-white/40" style={{ height: 4 + i }} />
                  ))}
                </div>
                <div className="w-5 h-2.5 rounded-sm border border-white/40 relative ml-1">
                  <div className="absolute inset-0.5 right-1 bg-white/40 rounded-[1px]" />
                </div>
              </div>
            </div>

            {/* Viewfinder frame */}
            <div className="relative w-36 h-36 flex items-center justify-center">
              {/* Corner brackets */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 144 144">
                <path d="M4 36 L4 8 Q4 4 8 4 L36 4" stroke="rgba(212,175,55,0.8)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M108 4 L136 4 Q140 4 140 8 L140 36" stroke="rgba(212,175,55,0.8)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M4 108 L4 136 Q4 140 8 140 L36 140" stroke="rgba(212,175,55,0.8)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M108 140 L136 140 Q140 140 140 136 L140 108" stroke="rgba(212,175,55,0.8)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </svg>
              
              {/* Scanning pulse */}
              <motion.div
                className="absolute inset-4 rounded-xl border-2 border-gold/0"
                animate={isScanning ? {
                  borderColor: ["rgba(212,175,55,0)", "rgba(212,175,55,0.5)", "rgba(212,175,55,0)"],
                  boxShadow: [
                    "inset 0 0 0 rgba(212,175,55,0)",
                    "inset 0 0 20px rgba(212,175,55,0.2)",
                    "inset 0 0 0 rgba(212,175,55,0)"
                  ]
                } : {}}
                transition={{ duration: 0.8, repeat: 2 }}
              />

              {/* Scan line */}
              {isScanning && (
                <motion.div
                  className="absolute left-4 right-4 h-0.5 bg-gold rounded-full z-10"
                  style={{ boxShadow: "0 0 12px rgba(212,175,55,0.8)" }}
                  initial={{ top: 16 }}
                  animate={{ top: [16, 128, 16] }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              )}

              {/* QR appears inside viewfinder after scan */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: showQRInside ? 1 : 0, 
                  scale: showQRInside ? 1 : 0.8 
                }}
                transition={{ duration: 0.3 }}
              >
                <QRCode size="md" />
              </motion.div>
            </div>

            {/* Instruction text */}
            <motion.span 
              className="text-white/50 text-[13px] font-light tracking-tight mt-5"
              animate={{ opacity: isScanning ? 0.3 : 0.5 }}
            >
              {isScanning ? "Scanning..." : showQRInside ? "Found!" : "Point at QR code"}
            </motion.span>
          </motion.div>

          {/* Loyalty card - morphs from QR */}
          <motion.div 
            className="absolute inset-0 pt-16 pb-8 px-4 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: showCard ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div 
              className="w-full"
              initial={{ scale: 0.4, borderRadius: 8 }}
              animate={{ 
                scale: showCard ? 1 : 0.4,
                borderRadius: showCard ? 16 : 8
              }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Loyalty Card */}
              <motion.div 
                className="w-full h-[150px] rounded-2xl overflow-hidden relative"
                initial={{ 
                  background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)'
                }}
                animate={{ 
                  background: showCard 
                    ? 'linear-gradient(135deg, #D4AF37 0%, #B8860B 50%, #8B6914 100%)'
                    : 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)'
                }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{ boxShadow: '0 10px 30px -10px rgba(212,175,55,0.3)' }}
              >
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  initial={{ x: -200 }}
                  animate={showCard ? { x: 250 } : { x: -200 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                />
                
                <motion.div 
                  className="relative p-4 h-full flex flex-col justify-between"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: showCard ? 1 : 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  {/* Header */}
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: showCard ? 1 : 0 }}
                      transition={{ delay: 0.4, duration: 0.25, type: "spring", stiffness: 300 }}
                    >
                      <span className="text-2xl">☕</span>
                    </motion.div>
                    <div>
                      <motion.div 
                        className="text-white font-semibold text-[15px] tracking-tight"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: showCard ? 1 : 0, x: showCard ? 0 : -10 }}
                        transition={{ delay: 0.45, duration: 0.25 }}
                      >
                        The Daily Grind
                      </motion.div>
                      <motion.div 
                        className="text-white/60 text-[11px] font-light"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: showCard ? 1 : 0, x: showCard ? 0 : -10 }}
                        transition={{ delay: 0.5, duration: 0.25 }}
                      >
                        Loyalty Card
                      </motion.div>
                    </div>
                  </div>

                  {/* Stamps */}
                  <div className="flex justify-between px-0.5">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-[24px] h-[24px] rounded-full bg-white/10 border border-white/30 flex items-center justify-center"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={showCard ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                        transition={{ delay: 0.55 + i * 0.04, duration: 0.2 }}
                      >
                        {i === 0 && (
                          <motion.div 
                            className="w-3.5 h-3.5 rounded-full bg-white/70"
                            initial={{ scale: 0 }}
                            animate={showCard ? { scale: 1 } : { scale: 0 }}
                            transition={{ delay: 0.85, duration: 0.15 }}
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* Welcome badge */}
              <motion.div
                className="flex justify-center mt-4"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: showCard ? 1 : 0, y: showCard ? 0 : 5 }}
                transition={{ delay: 1, duration: 0.25 }}
              >
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                  <span className="text-xs">🎁</span>
                  <span className="text-white/60 text-[11px] font-light">Welcome stamp added</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/20 rounded-full" />
      </div>
    </div>
  );
}

export function QRScanAnimation() {
  const [phase, setPhase] = useState<"idle" | "scan" | "found" | "pivot" | "morph">("idle");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("scan"), 300),      // Start scanning
      setTimeout(() => setPhase("found"), 1800),    // QR found
      setTimeout(() => setPhase("pivot"), 2400),    // Phone pivots
      setTimeout(() => setPhase("morph"), 3200),    // QR morphs to card
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const isScanning = phase === "scan";
  const showQRInside = phase === "found";
  const isPivoting = phase === "pivot" || phase === "morph";
  const showCard = phase === "morph";

  // 3D rotation values
  const phoneRotation = {
    idle: { rotateX: 12, rotateY: -20, rotateZ: 3 },
    scan: { rotateX: 12, rotateY: -20, rotateZ: 3 },
    found: { rotateX: 12, rotateY: -20, rotateZ: 3 },
    pivot: { rotateX: 0, rotateY: 0, rotateZ: 0 },
    morph: { rotateX: 0, rotateY: 0, rotateZ: 0 },
  };

  const currentRotation = phoneRotation[phase] || phoneRotation.idle;

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Clean background */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal to-espresso/10" />

      {/* 3D perspective container */}
      <div 
        className="relative flex flex-col items-center gap-6"
        style={{ perspective: '1200px' }}
      >
        {/* QR Machine - above phone, fades out during pivot */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ 
            opacity: isPivoting ? 0 : 1,
            y: isPivoting ? -20 : 0,
            scale: isPivoting ? 0.9 : 1
          }}
          transition={{ duration: 0.5 }}
        >
          <QRMachine />
        </motion.div>

        {/* Confirmation badge - appears after pivot */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: 10 }}
          animate={showCard ? { opacity: 1, y: -60 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/15 border border-green-500/30 backdrop-blur-sm">
            <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 text-white">
                <path d="M5 12l5 5L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <span className="text-green-400 font-medium text-[13px]">Café added</span>
          </div>
        </motion.div>

        {/* iPhone with 3D pivot animation */}
        <motion.div
          style={{ transformStyle: 'preserve-3d' }}
          initial={{ 
            rotateX: -12, 
            rotateY: -20, 
            rotateZ: -3,
            y: 0 
          }}
          animate={{ 
            rotateX: isPivoting ? 0 : -12,
            rotateY: isPivoting ? 0 : -20,
            rotateZ: isPivoting ? 0 : -3,
            y: isPivoting ? 20 : 0
          }}
          transition={{ 
            duration: 0.8, 
            ease: [0.4, 0, 0.2, 1]
          }}
        >
          <IPhoneDevice 
            showCard={showCard} 
            showScanner={!showCard} 
            isScanning={isScanning}
            showQRInside={showQRInside}
          />
        </motion.div>
      </div>
    </div>
  );
}
