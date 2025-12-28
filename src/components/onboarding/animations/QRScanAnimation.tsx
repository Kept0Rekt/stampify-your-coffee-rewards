import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import stampifyLogo from "@/assets/stampify-logo.png";

// QR Code component - warm styled
function QRCode({ size = "md" }: { size?: "sm" | "md" }) {
  const dim = size === "sm" ? "w-10 h-10" : "w-14 h-14";
  return (
    <div className={`${dim} bg-white rounded-lg p-1.5 shadow-soft`}>
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

// QR Terminal - mobile sized
function QRTerminal() {
  return (
    <div className="relative flex flex-col items-center">
      {/* Terminal body */}
      <motion.div 
        className="w-24 sm:w-28 h-18 sm:h-20 rounded-xl relative overflow-hidden"
        style={{ 
          background: 'linear-gradient(180deg, hsl(35 20% 88%) 0%, hsl(35 18% 82%) 100%)',
          boxShadow: '0 4px 20px -4px hsla(35, 20%, 40%, 0.15), 0 1px 3px hsla(0, 0%, 0%, 0.05)'
        }}
      >
        {/* Screen area */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-18 sm:w-20 h-11 sm:h-12 rounded-lg bg-white flex items-center justify-center shadow-inner">
          <QRCode size="sm" />
        </div>
        
        {/* Status indicator */}
        <motion.div 
          className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary"
          animate={{ 
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      
      {/* Base */}
      <div 
        className="w-16 h-1.5 rounded-b-lg -mt-0.5"
        style={{ background: 'hsl(35 18% 78%)' }}
      />
    </div>
  );
}

// iPhone device - mobile sized
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
    <div className="relative w-36 sm:w-40 h-[280px] sm:h-[300px]" style={{ transformStyle: 'preserve-3d' }}>
      {/* Outer frame - warm metallic */}
      <div 
        className="absolute inset-0 rounded-[2.25rem]"
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
        className="absolute inset-[2px] rounded-[2rem]"
        style={{ background: 'hsl(35 10% 92%)' }}
      />
      
      {/* Screen */}
      <div 
        className="absolute inset-[4px] rounded-[1.85rem] overflow-hidden bg-background"
      >
        {/* Dynamic Island */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-5 bg-foreground/90 rounded-full z-20" />

        {/* Screen content */}
        <div className="absolute inset-0 pt-10 pb-2 px-2">
          
          {/* Scanner view */}
          <motion.div 
            className="absolute inset-0 pt-12 flex flex-col items-center justify-center"
            animate={{ opacity: showScanner && !showCard ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Viewfinder */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              {/* Corner brackets - gold accent */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 96 96">
                <path d="M3 24 L3 6 Q3 3 6 3 L24 3" stroke="hsl(38 45% 55%)" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M72 3 L90 3 Q93 3 93 6 L93 24" stroke="hsl(38 45% 55%)" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M3 72 L3 90 Q3 93 6 93 L24 93" stroke="hsl(38 45% 55%)" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M72 93 L90 93 Q93 93 93 90 L93 72" stroke="hsl(38 45% 55%)" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
              
              {/* Scanning pulse */}
              <motion.div
                className="absolute inset-2 rounded-lg"
                animate={isScanning ? {
                  boxShadow: [
                    "inset 0 0 0 hsla(38, 45%, 55%, 0)",
                    "inset 0 0 16px hsla(38, 45%, 55%, 0.15)",
                    "inset 0 0 0 hsla(38, 45%, 55%, 0)"
                  ]
                } : {}}
                transition={{ duration: 0.8, repeat: 2 }}
              />

              {/* Scan line */}
              {isScanning && (
                <motion.div
                  className="absolute left-2 right-2 h-0.5 bg-primary rounded-full z-10"
                  style={{ boxShadow: "0 0 10px hsla(38, 45%, 55%, 0.6)" }}
                  initial={{ top: 8 }}
                  animate={{ top: [8, 88, 8] }}
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
              className="text-muted-foreground text-[10px] font-medium mt-3"
              animate={{ opacity: isScanning ? 0.5 : 0.7 }}
            >
              {isScanning ? "Scanning..." : showQRInside ? "Found!" : "Point at QR code"}
            </motion.span>
          </motion.div>

          {/* Loyalty card view */}
          <motion.div 
            className="absolute inset-0 pt-12 pb-4 px-3 flex flex-col items-center justify-center"
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
                className="w-full h-28 rounded-xl overflow-hidden relative"
                style={{ 
                  background: 'linear-gradient(145deg, hsl(38 50% 58%) 0%, hsl(38 45% 50%) 100%)',
                  boxShadow: '0 8px 24px -8px hsla(38, 45%, 45%, 0.35)'
                }}
              >
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  initial={{ x: -140 }}
                  animate={showCard ? { x: 180 } : { x: -140 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                />
                
                <motion.div 
                  className="relative p-3 h-full flex flex-col justify-between"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: showCard ? 1 : 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  {/* Header */}
                  <div className="flex items-center gap-2">
                    <motion.div 
                      className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center p-1"
                      initial={{ scale: 0 }}
                      animate={{ scale: showCard ? 1 : 0 }}
                      transition={{ delay: 0.4, type: "spring", stiffness: 400, damping: 20 }}
                    >
                      <img src={stampifyLogo} alt="Stampify" className="h-5 w-auto object-contain" />
                    </motion.div>
                    <div>
                      <motion.div 
                        className="text-white font-semibold text-xs"
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: showCard ? 1 : 0, x: showCard ? 0 : -8 }}
                        transition={{ delay: 0.45, duration: 0.25 }}
                      >
                        The Daily Grind
                      </motion.div>
                      <motion.div 
                        className="text-white/70 text-[9px] font-medium"
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
                        className="w-4 h-4 rounded-full bg-white/15 border border-white/30 flex items-center justify-center"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={showCard ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                        transition={{ delay: 0.55 + i * 0.035, duration: 0.2 }}
                      >
                        {i === 0 && (
                          <motion.div 
                            className="w-2.5 h-2.5 rounded-full bg-white/80"
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

              {/* Welcome badge */}
              <motion.div
                className="flex justify-center mt-3"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: showCard ? 1 : 0, y: showCard ? 0 : 4 }}
                transition={{ delay: 0.9, duration: 0.25 }}
              >
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
                  <span className="text-[10px]">🎁</span>
                  <span className="text-primary text-[9px] font-medium">Welcome stamp added</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-20 h-1 bg-foreground/20 rounded-full" />
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
          backgroundSize: '20px 20px'
        }}
      />

      {/* 3D perspective container */}
      <div 
        className="relative flex flex-col items-center gap-6"
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

        {/* Success badge - slides from right */}
        <motion.div
          className="absolute top-1/2 right-0 z-30"
          initial={{ opacity: 0, x: -20, y: "-50%" }}
          animate={showCard 
            ? { opacity: 1, x: 60, y: "-50%" } 
            : { opacity: 0, x: -20, y: "-50%" }
          }
          transition={{ duration: 0.5, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div 
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl"
            style={{
              background: 'hsla(140, 40%, 45%, 0.15)',
              border: '1px solid hsla(140, 40%, 50%, 0.3)',
              backdropFilter: 'blur(8px)'
            }}
          >
            <div 
              className="w-4 h-4 rounded-full flex items-center justify-center"
              style={{ background: 'hsl(140 40% 45%)' }}
            >
              <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 text-white">
                <path d="M5 12l5 5L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <span 
              className="font-semibold text-xs whitespace-nowrap"
              style={{ color: 'hsl(140 40% 35%)' }}
            >
              Café added
            </span>
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
            y: isPivoting ? 20 : 10,
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
