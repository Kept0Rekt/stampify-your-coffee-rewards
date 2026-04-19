import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import stampifyLogo from "@/assets/stampify-logo.png";

export function DigitalCardsAnimation() {
  const [phase, setPhase] = useState<"idle" | "scatter" | "merge" | "complete">("idle");

  useEffect(() => {
    // Reset to idle immediately, then schedule phases.
    // We do NOT use framer-motion `initial` props anywhere in this component
    // because AnimatePresence initial={false} propagates down and silently
    // skips initial props on first mount — breaking the first-load animation.
    // Instead, animate is the sole source of truth for all visual state.
    setPhase("idle");

    const t1 = setTimeout(() => setPhase("scatter"), 600);
    const t2 = setTimeout(() => setPhase("merge"), 1500);
    const t3 = setTimeout(() => setPhase("complete"), 2600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const paperCards = [
    { id: 1, x: -80, y: -50, rotate: -25, delay: 0 },
    { id: 2, x: 70,  y: -40, rotate: 18,  delay: 0.05 },
    { id: 3, x: -50, y: 30,  rotate: -12, delay: 0.1 },
    { id: 4, x: 60,  y: 50,  rotate: 22,  delay: 0.15 },
    { id: 5, x: -20, y: -80, rotate: 8,   delay: 0.08 },
    { id: 6, x: 30,  y: 70,  rotate: -18, delay: 0.12 },
  ];

  const cardAnimate = (card: typeof paperCards[0]) => {
    if (phase === "scatter") {
      return { x: card.x, y: card.y, rotate: card.rotate, opacity: 1, scale: 1 };
    }
    // idle, merge, complete — all hidden at center
    return { x: 0, y: 0, rotate: 0, opacity: 0, scale: 0 };
  };

  const isVisible = phase === "merge" || phase === "complete";

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-100 via-stone-50 to-neutral-100" />

      {/* Paper cards — no initial prop; animate drives everything */}
      {paperCards.map((card) => (
        <motion.div
          key={card.id}
          className="absolute w-24 h-14 rounded-lg bg-white border border-neutral-200 shadow-sm"
          animate={cardAnimate(card)}
          transition={{
            duration: phase === "scatter" ? 0.6 : 0.7,
            delay: phase === "scatter" ? card.delay : card.delay * 0.3,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <div className="p-1.5">
            <div className="w-6 h-1 bg-neutral-300 rounded mb-1.5" />
            <div className="flex gap-0.5 flex-wrap">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-neutral-200 border border-neutral-300" />
              ))}
            </div>
          </div>
        </motion.div>
      ))}

      {/* Digital wallet card — animate only, no initial */}
      <motion.div
        className="absolute"
        animate={isVisible ? { scale: 1, opacity: 1, y: 0 } : { scale: 0, opacity: 0, y: 30 }}
        transition={{ duration: 0.7, delay: isVisible ? 0.4 : 0, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.div
          className="relative w-64 h-40 sm:w-72 sm:h-44 rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, hsl(38 52% 54%) 0%, hsl(32 48% 46%) 50%, hsl(26 44% 38%) 100%)',
            border: '1px solid hsla(0,0%,100%,0.30)',
          }}
          animate={phase === "complete" ? {
            boxShadow: [
              "0 10px 30px hsla(32, 48%, 28%, 0.35)",
              "0 16px 42px hsla(32, 48%, 28%, 0.50)",
              "0 10px 30px hsla(32, 48%, 28%, 0.35)",
            ],
          } : {
            boxShadow: "0 10px 30px hsla(32, 48%, 28%, 0.35)",
          }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
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
            animate={phase === "complete" ? { x: 400 } : { x: -300 }}
            transition={{ duration: 0.8, delay: phase === "complete" ? 1.1 : 0 }}
          />

          {/* Decorative circle */}
          <div
            style={{
              position: 'absolute',
              bottom: -28,
              right: -28,
              width: 110,
              height: 110,
              borderRadius: '50%',
              background: 'hsla(0,0%,100%,0.06)',
            }}
          />

          <div className="relative h-full flex flex-col justify-between" style={{ padding: '14px 18px' }}>
            {/* Header — logo + counter */}
            <div className="flex items-center justify-between">
              <img
                src={stampifyLogo}
                alt="Stampify"
                style={{
                  height: 26,
                  width: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 1px 4px hsla(26, 44%, 20%, 0.5)) drop-shadow(0 0 1px hsla(0,0%,0%,0.25))',
                }}
              />
              <motion.div
                className="flex items-baseline gap-0.5"
                animate={phase === "complete" ? { opacity: 1, x: 0 } : { opacity: 0, x: 6 }}
                transition={{ delay: 0.55, duration: 0.3 }}
              >
                <span className="text-white font-bold leading-none" style={{ fontSize: 18 }}>1</span>
                <span className="text-white/55 font-medium leading-none" style={{ fontSize: 11 }}>/ 10</span>
              </motion.div>
            </div>

            {/* Stamp grid — 5x2 of 10 */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 18px)',
                gap: 8,
                rowGap: 6,
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              {[...Array(10)].map((_, i) => {
                const filled = i < 1;
                return (
                  <motion.div
                    key={i}
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      background: filled ? 'hsla(0,0%,100%,0.92)' : 'hsla(0,0%,100%,0.10)',
                      border: filled
                        ? '1.5px solid hsla(0,0%,100%,0.75)'
                        : '1.5px solid hsla(0,0%,100%,0.22)',
                      boxShadow: filled
                        ? '0 2px 5px hsla(32,48%,20%,0.25), inset 0 1px 0 hsla(0,0%,100%,0.6)'
                        : 'none',
                    }}
                    animate={phase === "complete" ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{
                      delay: phase === "complete" ? 0.7 + i * 0.04 : 0,
                      duration: 0.22,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Glow — no initial */}
          <motion.div
            className="absolute -inset-4 rounded-3xl -z-10"
            style={{ background: "hsla(38, 38%, 60%, 0.08)" }}
            animate={phase === "complete"
              ? { opacity: [0, 0.5, 0.3], scale: [0.9, 1.1, 1.05] }
              : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 1, delay: phase === "complete" ? 1.6 : 0, ease: "easeOut" }}
          />
        </motion.div>
      </motion.div>

      {/* Particles — only shown in complete phase */}
      {phase === "complete" && [...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{ background: "hsla(38, 38%, 60%, 0.5)" }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0.5],
            x: (Math.random() - 0.5) * 120,
            y: (Math.random() - 0.5) * 120,
          }}
          transition={{ duration: 1.5, delay: 1.8 + i * 0.1, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
