import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import stampifyLogo from "@/assets/stampify-logo.png";

const CARD_H = 78;

function QRCode({ size = "md" }: { size?: "sm" | "md" }) {
  const dim = size === "sm" ? "w-10 h-10" : "w-14 h-14";
  return (
    <div className={`${dim} bg-white rounded-lg p-1.5 shadow-soft`}>
      <div className="w-full h-full grid grid-cols-5 gap-0.5">
        {[1,1,1,0,1, 1,0,1,1,1, 1,1,0,1,0, 0,1,1,0,1, 1,1,1,1,1].map((f, i) => (
          <div key={i} className={`rounded-[1px] ${f ? "bg-foreground" : "bg-transparent"}`} />
        ))}
      </div>
    </div>
  );
}

function QRTerminal() {
  return (
    <div className="relative flex flex-col items-center">
      <motion.div
        className="w-24 sm:w-28 rounded-xl relative overflow-hidden"
        style={{
          height: 72,
          background: 'linear-gradient(180deg, hsl(35 20% 88%) 0%, hsl(35 18% 82%) 100%)',
          boxShadow: '0 4px 20px -4px hsla(35, 20%, 40%, 0.15), 0 1px 3px hsla(0, 0%, 0%, 0.05)'
        }}
      >
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-18 sm:w-20 h-11 sm:h-12 rounded-lg bg-white flex items-center justify-center shadow-inner">
          <QRCode size="sm" />
        </div>
        <motion.div
          className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary"
          animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      <div className="w-16 h-1.5 rounded-b-lg -mt-0.5" style={{ background: 'hsl(35 18% 78%)' }} />
    </div>
  );
}

function WalletStack({ showCard }: { showCard: boolean }) {
  const stamps = Array.from({ length: 10 }, (_, i) => i);
  const filledCount = 1;

  return (
    <div className="relative w-full mx-auto" style={{ height: CARD_H + 30 }}>
      {/* Back card */}
      <motion.div
        className="absolute overflow-hidden"
        style={{
          top: 30,
          left: '6%',
          right: '6%',
          height: CARD_H,
          borderRadius: 14,
          background: 'linear-gradient(135deg, hsl(32 42% 40%) 0%, hsl(26 38% 32%) 100%)',
          border: '1px solid hsla(0,0%,100%,0.25)',
          boxShadow: '0 6px 18px -6px hsla(30, 40%, 20%, 0.35)',
          zIndex: 1,
        }}
        animate={showCard ? { opacity: 0.75, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ delay: 0.1, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, height: 1,
            background: 'linear-gradient(90deg, transparent, hsla(0,0%,100%,0.15), transparent)',
          }}
        />
      </motion.div>

      {/* Middle card */}
      <motion.div
        className="absolute overflow-hidden"
        style={{
          top: 15,
          left: '3%',
          right: '3%',
          height: CARD_H,
          borderRadius: 14,
          background: 'linear-gradient(135deg, hsl(36 46% 47%) 0%, hsl(30 42% 39%) 100%)',
          border: '1px solid hsla(0,0%,100%,0.25)',
          boxShadow: '0 8px 22px -8px hsla(30, 42%, 22%, 0.38)',
          zIndex: 2,
        }}
        animate={showCard ? { opacity: 0.875, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ delay: 0.2, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, height: 1,
            background: 'linear-gradient(90deg, transparent, hsla(0,0%,100%,0.18), transparent)',
          }}
        />
      </motion.div>

      {/* Front card */}
      <motion.div
        className="absolute overflow-hidden"
        style={{
          top: 0,
          left: 0,
          right: 0,
          height: CARD_H,
          borderRadius: 14,
          background: 'linear-gradient(135deg, hsl(38 52% 54%) 0%, hsl(32 48% 46%) 50%, hsl(26 44% 38%) 100%)',
          border: '1px solid hsla(0,0%,100%,0.3)',
          boxShadow: '0 16px 36px -10px hsla(32, 48%, 28%, 0.5), 0 2px 6px hsla(32, 48%, 30%, 0.15)',
          zIndex: 3,
        }}
        animate={showCard ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ delay: 0.3, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Top edge highlight */}
        <div
          className="absolute inset-x-0"
          style={{
            top: 0,
            height: 1,
            background: 'linear-gradient(90deg, transparent, hsla(0,0%,100%,0.4), transparent)',
          }}
        />

        {/* Shine sweep */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, transparent, hsla(0,0%,100%,0.22), transparent)',
            transform: 'skewX(-12deg)',
          }}
          animate={showCard ? { x: ['-140%', '240%'] } : { x: '-140%' }}
          transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
        />

        {/* Decorative circle */}
        <div
          style={{
            position: 'absolute',
            bottom: -20,
            right: -20,
            width: 70,
            height: 70,
            borderRadius: '50%',
            background: 'hsla(0,0%,100%,0.06)',
          }}
        />

        {/* Content */}
        <div
          className="relative flex flex-col justify-between"
          style={{ padding: '10px 12px', height: '100%' }}
        >
          {/* Top row */}
          <div className="flex items-center justify-between">
            <img
              src={stampifyLogo}
              alt="Stampify"
              style={{
                height: 18,
                width: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 1px 4px hsla(26, 44%, 20%, 0.5)) drop-shadow(0 0px 1px hsla(0,0%,0%,0.25))',
              }}
            />
            <div className="flex items-baseline gap-0.5">
              <span className="text-white font-bold leading-none" style={{ fontSize: 13 }}>1</span>
              <span className="text-white/50 font-medium leading-none" style={{ fontSize: 8 }}>/10</span>
            </div>
          </div>

          {/* Stamp grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 14px)',
              gap: 5,
            }}
          >
            {stamps.map((i) => {
              const filled = i < filledCount;
              return (
                <motion.div
                  key={i}
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    background: filled ? 'hsla(0,0%,100%,0.92)' : 'hsla(0,0%,100%,0.10)',
                    border: filled
                      ? '1.5px solid hsla(0,0%,100%,0.75)'
                      : '1.5px solid hsla(0,0%,100%,0.22)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: filled
                      ? '0 2px 5px hsla(32,48%,20%,0.25), inset 0 1px 0 hsla(0,0%,100%,0.6)'
                      : 'none',
                  }}
                  animate={showCard ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{
                    delay: 0.5 + i * 0.04,
                    duration: 0.25,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                >
                </motion.div>
              );
            })}
          </div>

        </div>
      </motion.div>
    </div>
  );
}

function IPhoneDevice({
  showCard = false,
  isScanning = false,
  showQRInside = false,
}: {
  showCard?: boolean;
  isScanning?: boolean;
  showQRInside?: boolean;
}) {
  return (
    <div className="relative w-36 sm:w-40 h-[280px] sm:h-[300px]" style={{ transformStyle: 'preserve-3d' }}>
      <div
        className="absolute inset-0 rounded-[2.25rem]"
        style={{
          background: 'linear-gradient(180deg, hsl(35 15% 75%) 0%, hsl(35 12% 68%) 100%)',
          boxShadow: `inset 0 1px 0 hsla(35, 20%, 90%, 0.5), 0 20px 40px -12px hsla(35, 20%, 30%, 0.25)`
        }}
      />
      <div className="absolute inset-[2px] rounded-[2rem]" style={{ background: 'hsl(35 10% 92%)' }} />
      <div className="absolute inset-[4px] rounded-[1.85rem] overflow-hidden bg-background">
        {/* Dynamic Island */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-5 bg-foreground/90 rounded-full z-20" />

        {/* Scanner view */}
        <motion.div
          className="absolute inset-0 pt-12 flex flex-col items-center justify-center"
          animate={{ opacity: showCard ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 96 96">
              <path d="M3 24 L3 6 Q3 3 6 3 L24 3" stroke="hsl(38 45% 55%)" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M72 3 L90 3 Q93 3 93 6 L93 24" stroke="hsl(38 45% 55%)" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M3 72 L3 90 Q3 93 6 93 L24 93" stroke="hsl(38 45% 55%)" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M72 93 L90 93 Q93 93 93 90 L93 72" stroke="hsl(38 45% 55%)" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
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
            {isScanning && (
              <motion.div
                className="absolute left-2 right-2 h-0.5 bg-primary rounded-full z-10"
                style={{ boxShadow: "0 0 10px hsla(38, 45%, 55%, 0.6)" }}
                initial={{ top: 8 }}
                animate={{ top: [8, 88, 8] }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            )}
            <motion.div
              animate={{ opacity: showQRInside ? 1 : 0, scale: showQRInside ? 1 : 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <QRCode size="md" />
            </motion.div>
          </div>
        </motion.div>

        {/* Loyalty card view */}
        <motion.div
          className="absolute inset-0 pt-10 pb-3 px-3 flex flex-col items-center justify-center"
          animate={{ opacity: showCard ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="w-full flex justify-center"
            animate={{ scale: showCard ? 1 : 0.85, opacity: showCard ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <WalletStack showCard={showCard} />
          </motion.div>
        </motion.div>

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
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, hsl(35 25% 92%) 0%, hsl(35 20% 88%) 50%, hsl(35 18% 85%) 100%)' }}
      />

      <div className="relative flex flex-col items-center gap-6" style={{ perspective: '1000px' }}>
        {/* QR Terminal */}
        <motion.div
          animate={{
            opacity: isPivoting ? 0 : 1,
            y: isPivoting ? -10 : 0,
            scale: isPivoting ? 0.9 : 1,
          }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <QRTerminal />
        </motion.div>

        {/* Phone + badge side by side */}
        <div className="relative">
          {/* iPhone with 3D pivot */}
          <motion.div
            style={{ transformStyle: 'preserve-3d' }}
            animate={{
              rotateX: isPivoting ? 0 : -10,
              rotateY: isPivoting ? 0 : -15,
              rotateZ: isPivoting ? 0 : -2,
              y: isPivoting ? 20 : 10,
              opacity: 1,
            }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <IPhoneDevice
              showCard={showCard}
              isScanning={isScanning}
              showQRInside={showQRInside}
            />
          </motion.div>

          {/* "Wallet added" badge — floats to the right of the phone */}
          <motion.div
            className="absolute top-1/2 left-full ml-3 -translate-y-1/2 z-30"
            animate={showCard ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
            transition={{ duration: 0.45, delay: showCard ? 0.65 : 0, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-2xl whitespace-nowrap"
              style={{
                background: 'hsla(142, 42%, 96%, 0.92)',
                border: '1px solid hsla(142, 40%, 75%, 0.6)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 16px -4px hsla(142, 40%, 40%, 0.18)',
              }}
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'hsl(142 42% 44%)' }}
              >
                <svg viewBox="0 0 24 24" width="11" height="11" fill="none">
                  <path d="M5 12l5 5L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-[11px] font-semibold" style={{ color: 'hsl(142 38% 28%)' }}>
                Wallet added
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
