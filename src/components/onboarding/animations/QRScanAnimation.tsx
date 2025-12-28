import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import stampifyLogo from "@/assets/stampify-logo.png";

// QR Code component - warm styled
function QRCode({ size = "md" }: { size?: "sm" | "md" }) {
  const dim = size === "sm" ? "w-14 h-14" : "w-20 h-20";
  return (
    <div className={`${dim} bg-white rounded-xl p-2 shadow-soft`}>
      <div className="w-full h-full grid grid-cols-5 gap-0.5">
        {[1,1,1,0,1, 1,0,1,1,1, 1,1,0,1,0, 0,1,1,0,1, 1,1,1,1,1].map((f, i) => (
          <div 
            key={i} 
            className={`rounded-[1px] ${f ? "bg-foreground" : "bg-transparent"}`} 
          />
        ))}
      </div>
    </div>
  );
}

// QR Terminal - warm beige styling
function QRTerminal() {
  return (
    <div className="relative flex flex-col items-center">
      {/* Terminal body */}
      <motion.div 
        className="w-32 h-24 rounded-2xl relative overflow-hidden"
        style={{ 
          background: 'linear-gradient(180deg, hsl(35 20% 88%) 0%, hsl(35 18% 82%) 100%)',
          boxShadow: '0 4px 20px -4px hsla(35, 20%, 40%, 0.15), 0 1px 3px hsla(0, 0%, 0%, 0.05)'
        }}
      >
        {/* Screen area */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-14 rounded-xl bg-white flex items-center justify-center shadow-inner">
          <QRCode size="sm" />
        </div>
        
        {/* Status indicator */}
        <motion.div 
          className="absolute bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary"
          animate={{ 
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      
      {/* Base */}
      <div 
        className="w-20 h-2 rounded-b-lg -mt-0.5"
        style={{ background: 'hsl(35 18% 78%)' }}
      />
    </div>
  );
}

// iPhone device - warm palette
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
    <div className="relative w-48 h-[360px]" style={{ transformStyle: 'preserve-3d' }}>
      {/* Outer frame - warm metallic */}
      <div 
        className="absolute inset-0 rounded-[2.75rem]"
        style={{
          background: 'linear-gradient(180deg, hsl(35 15% 75%) 0%, hsl(35 12% 68%) 100%)',
          boxShadow: `
            inset 0 1px 0 hsla(35, 20%, 90%, 0.5),
            0 20px 40px -12px hsla(35, 20%, 30%, 0.25)
          `
        }}
      />
      
      {/* Inner bezel */}
      <div 
        className="absolute inset-[3px] rounded-[2.5rem]"
        style={{ background: 'hsl(35 10% 92%)' }}
      />
      
      {/* Screen */}
      <div 
        className="absolute inset-[5px] rounded-[2.35rem] overflow-hidden bg-background"
      >
        {/* Dynamic Island */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-6 bg-foreground/90 rounded-full z-20" />

        {/* Screen content */}
        <div className="absolute inset-0 pt-12 pb-2 px-3">
          
          {/* Scanner view */}
          <motion.div 
            className="absolute inset-0 pt-14 flex flex-col items-center justify-center"
            animate={{ opacity: showScanner && !showCard ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Viewfinder */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              {/* Corner brackets - gold accent */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 128 128">
                <path d="M4 32 L4 8 Q4 4 8 4 L32 4" stroke="hsl(38 45% 55%)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M96 4 L120 4 Q124 4 124 8 L124 32" stroke="hsl(38 45% 55%)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M4 96 L4 120 Q4 124 8 124 L32 124" stroke="hsl(38 45% 55%)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M96 124 L120 124 Q124 124 124 120 L124 96" stroke="hsl(38 45% 55%)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </svg>
              
              {/* Scanning pulse */}
              <motion.div
                className="absolute inset-3 rounded-xl"
                animate={isScanning ? {
                  boxShadow: [
                    "inset 0 0 0 hsla(38, 45%, 55%, 0)",
                    "inset 0 0 20px hsla(38, 45%, 55%, 0.15)",
                    "inset 0 0 0 hsla(38, 45%, 55%, 0)"
                  ]
                } : {}}
                transition={{ duration: 0.8, repeat: 2 }}
              />

              {/* Scan line */}
              {isScanning && (
                <motion.div
                  className="absolute left-3 right-3 h-0.5 bg-primary rounded-full z-10"
                  style={{ boxShadow: "0 0 12px hsla(38, 45%, 55%, 0.6)" }}
                  initial={{ top: 12 }}
                  animate={{ top: [12, 116, 12] }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              )}

              {/* QR appears inside viewfinder */}
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
              className="text-muted-foreground text-xs font-medium mt-4"
              animate={{ opacity: isScanning ? 0.5 : 0.7 }}
            >
              {isScanning ? "Scanning..." : showQRInside ? "Found!" : "Point at QR code"}
            </motion.span>
          </motion.div>

          {/* Loyalty card view */}
          <motion.div 
            className="absolute inset-0 pt-14 pb-6 px-4 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: showCard ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div 
              className="w-full"
              initial={{ scale: 0.5 }}
              animate={{ scale: showCard ? 1 : 0.5 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Loyalty Card */}
              <motion.div 
                className="w-full h-36 rounded-2xl overflow-hidden relative"
                style={{ 
                  background: 'linear-gradient(145deg, hsl(38 50% 58%) 0%, hsl(38 45% 50%) 100%)',
                  boxShadow: '0 8px 24px -8px hsla(38, 45%, 45%, 0.35)'
                }}
              >
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  initial={{ x: -180 }}
                  animate={showCard ? { x: 220 } : { x: -180 }}
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
                      className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center p-1.5"
                      initial={{ scale: 0 }}
                      animate={{ scale: showCard ? 1 : 0 }}
                      transition={{ delay: 0.4, type: "spring", stiffness: 400, damping: 20 }}
                    >
                      <img src={stampifyLogo} alt="Stampify" className="h-6 w-auto object-contain" />
                    </motion.div>
                    <div>
                      <motion.div 
                        className="text-white font-semibold text-sm"
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: showCard ? 1 : 0, x: showCard ? 0 : -8 }}
                        transition={{ delay: 0.45, duration: 0.25 }}
                      >
                        The Daily Grind
                      </motion.div>
                      <motion.div 
                        className="text-white/70 text-[10px] font-medium"
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: showCard ? 1 : 0, x: showCard ? 0 : -8 }}
                        transition={{ delay: 0.5, duration: 0.25 }}
                      >
                        Loyalty Card
                      </motion.div>
                    </div>
                  </div>

                  {/* Stamps row */}
                  <div className="flex justify-between px-0.5">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-5 h-5 rounded-full bg-white/15 border border-white/30 flex items-center justify-center"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={showCard ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                        transition={{ delay: 0.55 + i * 0.035, duration: 0.2 }}
                      >
                        {i === 0 && (
                          <motion.div 
                            className="w-3 h-3 rounded-full bg-white/80"
                            initial={{ scale: 0 }}
                            animate={showCard ? { scale: 1 } : { scale: 0 }}
                            transition={{ delay: 0.85, type: "spring", stiffness: 500 }}
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* Card registered text */}
              <motion.div
                className="flex justify-center mt-4"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: showCard ? 1 : 0, y: showCard ? 0 : 4 }}
                transition={{ delay: 0.9, duration: 0.25 }}
              >
                <span className="text-muted-foreground text-[10px] font-medium">Card registered</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-foreground/20 rounded-full" />
      </div>
    </div>
  );
}

export function QRScanAnimation() {
  const [phase, setPhase] = useState<"idle" | "scan" | "found" | "pivot" | "morph">("idle");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("scan"), 400),
      setTimeout(() => setPhase("found"), 1900),
      setTimeout(() => setPhase("pivot"), 2500),
      setTimeout(() => setPhase("morph"), 3300),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const isScanning = phase === "scan";
  const showQRInside = phase === "found";
  const isPivoting = phase === "pivot" || phase === "morph";
  const showCard = phase === "morph";

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Warm background gradient */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: 'linear-gradient(180deg, hsl(35 25% 92%) 0%, hsl(35 20% 88%) 50%, hsl(35 18% 85%) 100%)'
        }}
      />

      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, hsla(35, 15%, 70%, 0.15) 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* 3D perspective container */}
      <div 
        className="relative flex flex-col items-center gap-8"
        style={{ perspective: '1000px' }}
      >
        {/* QR Terminal - fades during pivot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isPivoting ? 0 : 1,
            y: isPivoting ? -10 : 0,
            scale: isPivoting ? 0.9 : 1
          }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <QRTerminal />
        </motion.div>

        {/* Success badge - combined message */}
        <motion.div
          className="absolute top-1/2 right-0 z-30"
          initial={{ opacity: 0, x: -20, y: "-50%", scale: 0.9 }}
          animate={showCard 
            ? { opacity: 1, x: 85, y: "-50%", scale: 1 } 
            : { opacity: 0, x: -20, y: "-50%", scale: 0.9 }
          }
          transition={{ duration: 0.5, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div 
            className="flex items-center gap-2.5 px-5 py-3 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, hsla(140, 45%, 45%, 0.2) 0%, hsla(140, 40%, 40%, 0.15) 100%)',
              border: '1.5px solid hsla(140, 45%, 50%, 0.4)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 8px 24px -6px hsla(140, 40%, 30%, 0.2)'
            }}
          >
            <div 
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{ 
                background: 'linear-gradient(135deg, hsl(140 45% 50%) 0%, hsl(140 40% 42%) 100%)',
                boxShadow: '0 2px 8px hsla(140, 45%, 40%, 0.4)'
              }}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-white">
                <path d="M5 12l5 5L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span 
                className="font-bold text-sm whitespace-nowrap"
                style={{ color: 'hsl(140 45% 32%)' }}
              >
                Welcome!
              </span>
              <span 
                className="text-xs font-medium whitespace-nowrap"
                style={{ color: 'hsl(140 35% 42%)' }}
              >
                +1 Free Stamp
              </span>
            </div>
          </div>
        </motion.div>

        {/* iPhone with 3D pivot */}
        <motion.div
          style={{ transformStyle: 'preserve-3d' }}
          initial={{ 
            rotateX: -10, 
            rotateY: -15, 
            rotateZ: -2,
            y: 10,
            opacity: 0
          }}
          animate={{ 
            rotateX: isPivoting ? 0 : -10,
            rotateY: isPivoting ? 0 : -15,
            rotateZ: isPivoting ? 0 : -2,
            y: isPivoting ? 30 : 10,
            opacity: 1
          }}
          transition={{ 
            duration: 0.7, 
            ease: [0.25, 0.1, 0.25, 1],
            opacity: { duration: 0.4 }
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
