import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import stampifyLogo from "@/assets/stampify-logo.png";

export function DigitalCardsAnimation() {
  const [phase, setPhase] = useState<"idle" | "scatter" | "merge" | "complete">("idle");

  useEffect(() => {
    // Double rAF guarantees the component has painted at least one frame
    // (in its idle/hidden state) before we start scheduling phase changes.
    // Combined with a 700ms delay, this fully clears the ~450ms slide-in
    // transition so the user always sees the animation from frame 0.
    let timer1: ReturnType<typeof setTimeout>;
    let timer2: ReturnType<typeof setTimeout>;
    let timer3: ReturnType<typeof setTimeout>;
    let raf2 = 0;

    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        timer1 = setTimeout(() => setPhase("scatter"), 700);
        timer2 = setTimeout(() => setPhase("merge"), 1600);
        timer3 = setTimeout(() => setPhase("complete"), 2800);
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Scattered paper cards - smaller positions for mobile
  const paperCards = [
    { id: 1, initialX: -80, initialY: -50, initialRotate: -25, delay: 0 },
    { id: 2, initialX: 70, initialY: -40, initialRotate: 18, delay: 0.05 },
    { id: 3, initialX: -50, initialY: 30, initialRotate: -12, delay: 0.1 },
    { id: 4, initialX: 60, initialY: 50, initialRotate: 22, delay: 0.15 },
    { id: 5, initialX: -20, initialY: -80, initialRotate: 8, delay: 0.08 },
    { id: 6, initialX: 30, initialY: 70, initialRotate: -18, delay: 0.12 },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Background gradient - professional light */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-100 via-stone-50 to-neutral-100" />

      {/* Scattered paper cards - hidden initially, scatter out, then merge in */}
      {paperCards.map((card) => {
        const animateProps =
          phase === "idle"
            ? { x: 0, y: 0, rotate: 0, opacity: 0, scale: 0 }
            : phase === "scatter"
            ? {
                x: card.initialX,
                y: card.initialY,
                rotate: card.initialRotate,
                opacity: 1,
                scale: 1,
              }
            : { x: 0, y: 0, rotate: 0, opacity: 0, scale: 0.5 };

        return (
          <motion.div
            key={card.id}
            className="absolute w-24 h-14 rounded-lg bg-white border border-neutral-200 shadow-sm"
            initial={{ x: 0, y: 0, rotate: 0, opacity: 0, scale: 0 }}
            animate={animateProps}
            transition={{
              duration: phase === "scatter" ? 0.6 : 0.8,
              delay: phase === "scatter" ? card.delay : card.delay * 0.5,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            {/* Paper card stamps */}
            <div className="p-1.5">
              <div className="w-6 h-1 bg-neutral-300 rounded mb-1.5" />
              <div className="flex gap-0.5 flex-wrap">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-neutral-200 border border-neutral-300"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Digital wallet card - responsive size */}
      <motion.div
        className="absolute"
        initial={{ scale: 0.3, opacity: 0, y: 50 }}
        animate={phase === "merge" || phase === "complete" ? {
          scale: 1,
          opacity: 1,
          y: 0,
        } : {}}
        transition={{
          duration: 0.7,
          delay: 0.5,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <motion.div
          className="relative w-64 h-40 sm:w-72 sm:h-44 rounded-2xl bg-gradient-to-br from-stone-100 via-neutral-50 to-stone-100 border border-neutral-200 shadow-xl overflow-hidden"
          animate={phase === "complete" ? {
            boxShadow: [
              "0 10px 30px rgba(201, 168, 106, 0.12)",
              "0 15px 40px rgba(201, 168, 106, 0.18)",
              "0 10px 30px rgba(201, 168, 106, 0.12)",
            ],
          } : {}}
          transition={{
            duration: 1.2,
            delay: 0.3,
            ease: "easeInOut",
          }}
        >
          {/* Card shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -skew-x-12"
            initial={{ x: -300 }}
            animate={phase === "complete" ? { x: 400 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
          />

          {/* Card content */}
          <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-white/80 rounded-lg p-1.5 shadow-sm">
                  <img src={stampifyLogo} alt="Stampify" className="h-7 sm:h-8 w-auto object-contain" />
                </div>
                <div>
                  <div className="w-16 sm:w-20 h-2 bg-neutral-300 rounded" />
                  <div className="w-12 sm:w-14 h-2 bg-neutral-200 rounded mt-1" />
                </div>
              </div>
            </div>

            {/* Stamp progress */}
            <div className="flex justify-between items-center gap-1">
            {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-neutral-300 flex items-center justify-center bg-white/50"
                  initial={{ scale: 0 }}
                  animate={phase === "complete" ? { scale: 1 } : {}}
                  transition={{
                    duration: 0.2,
                    delay: 0.8 + i * 0.04,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                >
                  {i < 5 && (
                    <motion.div
                      className="w-4 h-4 sm:w-5 sm:h-5 rounded-full"
                      style={{ background: "hsl(38 38% 60%)" }}
                      initial={{ scale: 0 }}
                      animate={phase === "complete" ? { scale: 1 } : {}}
                      transition={{
                        duration: 0.15,
                        delay: 0.9 + i * 0.05,
                      }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Subtle glow effect */}
          <motion.div
            className="absolute -inset-4 rounded-3xl -z-10"
            style={{ background: "hsla(38, 38%, 60%, 0.08)" }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={phase === "complete" ? {
              opacity: [0, 0.5, 0.3],
              scale: [0.9, 1.1, 1.05],
            } : {}}
            transition={{
              duration: 1,
              delay: 1.8,
              ease: "easeOut",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Floating particles */}
      {phase === "complete" && [...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{ background: "hsla(38, 38%, 60%, 0.5)" }}
          initial={{ 
            opacity: 0, 
            scale: 0,
            x: 0,
            y: 0,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0.5],
            x: (Math.random() - 0.5) * 120,
            y: (Math.random() - 0.5) * 120,
          }}
          transition={{
            duration: 1.5,
            delay: 2 + i * 0.1,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
