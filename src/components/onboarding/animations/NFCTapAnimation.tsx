import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import stampifyLogo from "@/assets/stampify-logo.png";

const CARD_H = 78;

type Phase = "offscreen" | "entering" | "hovering" | "contact" | "stamped" | "settle";

function LoyaltyCard({ stampedPhase }: { stampedPhase: boolean }) {
  return (
    <motion.div
      className="w-full overflow-hidden relative"
      style={{
        height: CARD_H,
        borderRadius: 14,
        background: 'linear-gradient(135deg, hsl(38 52% 54%) 0%, hsl(32 48% 46%) 50%, hsl(26 44% 38%) 100%)',
        border: '1px solid hsla(0,0%,100%,0.30)',
        boxShadow: '0 10px 28px -8px hsla(32, 48%, 28%, 0.45)',
      }}
      animate={stampedPhase ? {
        boxShadow: [
          '0 10px 28px -8px hsla(32, 48%, 28%, 0.45)',
          '0 16px 40px -8px hsla(38, 55%, 50%, 0.65)',
          '0 10px 28px -8px hsla(32, 48%, 28%, 0.45)',
        ],
      } : {}}
      transition={{ duration: 0.9, ease: 'easeInOut' }}
    >
      <div
        className="absolute inset-x-0"
        style={{ top: 0, height: 1, background: 'linear-gradient(90deg, transparent, hsla(0,0%,100%,0.4), transparent)' }}
      />
      <motion.div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to right, transparent, hsla(0,0%,100%,0.5), transparent)', transform: 'skewX(-12deg)' }}
        animate={stampedPhase ? { x: ['-140%', '240%'] } : { x: '-140%' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      />
      <div style={{ position: 'absolute', bottom: -20, right: -20, width: 70, height: 70, borderRadius: '50%', background: 'hsla(0,0%,100%,0.06)' }} />

      <div className="relative h-full flex flex-col justify-between" style={{ padding: '10px 12px' }}>
        <div className="flex items-center justify-between">
          <img
            src={stampifyLogo}
            alt="Stampify"
            style={{
              height: 18,
              width: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 1px 4px hsla(26, 44%, 20%, 0.5)) drop-shadow(0 0 1px hsla(0,0%,0%,0.25))',
            }}
          />
          <div className="flex items-baseline gap-0.5">
            <motion.span
              key={stampedPhase ? '5' : '4'}
              className="text-white font-bold leading-none"
              style={{ fontSize: 13 }}
              initial={stampedPhase ? { scale: 1.6, color: 'hsl(40 80% 80%)' } : false}
              animate={{ scale: 1, color: '#FFFFFF' }}
              transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {stampedPhase ? '5' : '4'}
            </motion.span>
            <span className="text-white/50 font-medium leading-none" style={{ fontSize: 8 }}>/10</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 14px)', gap: 5 }}>
          {[...Array(10)].map((_, i) => {
            const isPreFilled = i < 4;
            const isNewlyStamped = i === 4 && stampedPhase;
            const filled = isPreFilled || isNewlyStamped;
            return (
              <motion.div
                key={i}
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: filled ? 'hsla(0,0%,100%,0.92)' : 'hsla(0,0%,100%,0.10)',
                  border: filled ? '1.5px solid hsla(0,0%,100%,0.75)' : '1.5px solid hsla(0,0%,100%,0.22)',
                  boxShadow: filled ? '0 2px 5px hsla(32,48%,20%,0.25), inset 0 1px 0 hsla(0,0%,100%,0.6)' : 'none',
                }}
                animate={isNewlyStamped ? { scale: [0, 1.5, 1], opacity: 1 } : { scale: 1, opacity: 1 }}
                transition={
                  isNewlyStamped
                    ? { duration: 0.5, ease: [0.34, 1.56, 0.64, 1], times: [0, 0.55, 1] }
                    : { duration: 0.2 }
                }
              />
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

function IPhoneDevice({ stampedPhase }: { stampedPhase: boolean }) {
  return (
    <div className="relative w-36 sm:w-40 h-[280px] sm:h-[300px]" style={{ transformStyle: 'preserve-3d' }}>
      <div
        className="absolute inset-0 rounded-[2.25rem]"
        style={{
          background: 'linear-gradient(180deg, hsl(35 15% 75%) 0%, hsl(35 12% 68%) 100%)',
          boxShadow: 'inset 0 1px 0 hsla(35, 20%, 90%, 0.5), 0 20px 40px -12px hsla(35, 20%, 30%, 0.25)',
        }}
      />
      <div className="absolute inset-[2px] rounded-[2rem]" style={{ background: 'hsl(35 10% 92%)' }} />
      <div className="absolute inset-[4px] rounded-[1.85rem] overflow-hidden bg-background">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-5 bg-foreground/90 rounded-full z-20" />
        <div className="absolute inset-0 pt-12 pb-3 px-3 flex flex-col items-center justify-start">
          <LoyaltyCard stampedPhase={stampedPhase} />
        </div>
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-20 h-1 bg-foreground/20 rounded-full" />
      </div>
    </div>
  );
}

function NFCTerminal({ phase }: { phase: Phase }) {
  const isActive = phase === "contact" || phase === "stamped";
  const isSettling = phase === "settle";

  return (
    <motion.div
      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl relative overflow-hidden border border-neutral-300 shadow-xl"
      style={{ background: 'linear-gradient(135deg, hsl(35 18% 88%) 0%, hsl(35 14% 82%) 50%, hsl(35 16% 78%) 100%)' }}
      animate={{ scale: isActive ? [1, 1.04, 1] : 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <div className="absolute inset-2 rounded-xl bg-white flex items-center justify-center overflow-hidden shadow-inner">
        {/* Corner LED — inside white screen, green */}
        <motion.div
          className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
          animate={{
            backgroundColor: 'hsl(142 52% 42%)',
            boxShadow: isActive
              ? '0 0 8px hsla(142, 52%, 42%, 0.9)'
              : '0 0 3px hsla(142, 52%, 42%, 0.4)',
          }}
          transition={{ duration: isSettling ? 0.55 : 0.15 }}
        />

        {/* Loading: pulsing dot — fades out on contact */}
        <motion.div
          className="absolute w-3 h-3 rounded-full"
          style={{ background: 'hsl(38 38% 60%)' }}
          animate={{
            scale: isActive ? 0 : [1, 1.3, 1],
            opacity: isActive ? 0 : [0.5, 0.9, 0.5],
          }}
          transition={{ duration: 1.4, repeat: isActive ? 0 : Infinity, ease: 'easeInOut' }}
        />

        {/* Success overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: isSettling ? 0.55 : 0.2, ease: 'easeInOut' }}
        >
          {/* Tick — springs in */}
          <motion.div
            className="absolute w-7 h-7 rounded-full flex items-center justify-center shadow-md"
            style={{ background: 'linear-gradient(135deg, hsl(38 50% 55%), hsl(38 45% 48%))' }}
            animate={isActive ? { scale: 1 } : { scale: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          >
            <span className="text-white text-xs font-bold">✓</span>
          </motion.div>

          {/* Single expanding ring — no key, so it never remounts and never snaps back */}
          <motion.div
            className="absolute rounded-full border-2"
            style={{ borderColor: 'hsl(38 45% 55%)', width: 8, height: 8, opacity: 0 }}
            animate={isActive ? {
              width: [8, 130],
              height: [8, 130],
              opacity: [0.7, 0],
            } : {}}
            transition={{ duration: 1.4, delay: 0.2, ease: 'easeOut' }}
          />
        </motion.div>
      </div>

    </motion.div>
  );
}

export function NFCTapAnimation() {
  const [phase, setPhase] = useState<Phase>("offscreen");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("entering"), 220),
      setTimeout(() => setPhase("hovering"), 900),
      setTimeout(() => setPhase("contact"), 1550),
      setTimeout(() => setPhase("stamped"), 2050),
      setTimeout(() => setPhase("settle"), 2800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const getPhoneAnimation = () => {
    switch (phase) {
      case "offscreen": return { x: -118, y: 168, rotate: 34, scale: 0.96 };
      case "entering":  return { x: -58,  y: 88,  rotate: 14, scale: 0.99 };
      case "hovering":  return { x: -16,  y: 34,  rotate: 1,  scale: 1 };
      case "contact":   return { x: 0,    y: -16, rotate: 0,  scale: 0.985 };
      case "stamped":   return { x: 0,    y: -20, rotate: 0,  scale: 0.99 };
      case "settle":    return { x: 34,   y: 10,  rotate: 0,  scale: 1 };
      default:           return { x: -118, y: 168, rotate: 34, scale: 0.96 };
    }
  };

  const getPhoneTransition = () => {
    switch (phase) {
      case "entering":
        return { duration: 0.68, ease: [0.22, 1, 0.36, 1] as const };
      case "hovering":
        return { duration: 0.44, ease: [0.32, 0, 0.2, 1] as const };
      case "contact":
        return { duration: 0.32, ease: [0.3, 0.8, 0.3, 1] as const };
      case "stamped":
        return { duration: 0.28, ease: [0.34, 1.2, 0.64, 1] as const };
      case "settle":
        return { duration: 0.56, ease: [0.22, 1, 0.36, 1] as const };
      default:
        return { duration: 0.68, ease: [0.22, 1, 0.36, 1] as const };
    }
  };

  const showBadge = phase === "settle";

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, hsl(35 25% 92%) 0%, hsl(35 20% 88%) 50%, hsl(35 18% 85%) 100%)' }}
      />

      <div className="relative flex flex-col items-center gap-6">
        {/* NFC Terminal — square, centered above phone */}
        <NFCTerminal phase={phase} />

        {/* Phone + badge */}
        <div className="relative">
          <motion.div
            style={{ transformStyle: 'preserve-3d' }}
            initial={{ x: -118, y: 168, rotate: 34, scale: 0.96, opacity: 0 }}
            animate={{ ...getPhoneAnimation(), opacity: 1 }}
            transition={{
              ...getPhoneTransition(),
              opacity: { duration: 0.25 },
            }}
          >
            <IPhoneDevice stampedPhase={phase === "stamped" || phase === "settle"} />
          </motion.div>

          {/* +1 Stamp badge — right of phone, fades as phone pulls back */}
          <motion.div
            className="absolute left-full ml-2 z-30"
            style={{ top: 88 }}
            animate={showBadge ? { opacity: 1, x: 0, y: 0, scale: 1 } : { opacity: 0, x: -14, y: 6, scale: 0.92 }}
            transition={{ duration: 0.42, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="relative flex items-center gap-2 overflow-hidden rounded-2xl px-3 py-2 whitespace-nowrap"
              style={{
                background: 'hsla(142, 42%, 96%, 0.92)',
                border: '1px solid hsla(142, 40%, 75%, 0.6)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 16px -4px hsla(142, 40%, 40%, 0.18)',
              }}
            >
              <motion.div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(120deg, transparent 20%, hsla(0,0%,100%,0.32) 50%, transparent 80%)' }}
                initial={{ x: '-120%' }}
                animate={showBadge ? { x: ['-120%', '120%'] } : { x: '-120%' }}
                transition={{ duration: 0.7, delay: 0.14, ease: 'easeOut' }}
              />
              <div
                className="relative z-10 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'hsl(142 42% 44%)' }}
              >
                <svg viewBox="0 0 24 24" width="11" height="11" fill="none">
                  <path d="M5 12l5 5L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="relative z-10 text-[11px] font-semibold" style={{ color: 'hsl(142 38% 28%)' }}>
                +1 Stamp
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
