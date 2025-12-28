import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import stampifyLogo from "@/assets/stampify-logo.png";

export function NFCTapAnimation() {
  const [phase, setPhase] = useState<"ready" | "approaching" | "tapping" | "success">("ready");

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("approaching"), 400);
    const timer2 = setTimeout(() => setPhase("tapping"), 1000);
    const timer3 = setTimeout(() => setPhase("success"), 1200);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Natural arc motion for human-like movement
  const getPhoneAnimation = () => {
    switch (phase) {
      case "ready":
        return { y: -50, rotate: -8, x: 10 };
      case "approaching":
        return { y: 5, rotate: -2, x: 3 };
      case "tapping":
        return { y: 18, rotate: 0, x: 0 };
      case "success":
        return { y: 12, rotate: 0, x: 0 };
      default:
        return { y: -50, rotate: -8, x: 10 };
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-100 via-stone-50 to-neutral-100" />

      {/* NFC Terminal at bottom - mobile sized */}
      <motion.div
        className="absolute bottom-[30%] w-40 sm:w-48 h-14 sm:h-16 rounded-xl bg-gradient-to-b from-neutral-200 to-neutral-300 border border-neutral-300 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Terminal screen */}
        <div className="absolute inset-1.5 rounded-lg bg-white flex items-center justify-center">
          <motion.div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            animate={{
              backgroundColor: phase === "success" 
                ? "hsla(140, 14%, 50%, 0.15)" 
                : "hsla(38, 38%, 60%, 0.1)",
            }}
            transition={{ duration: 0.2 }}
          >
            {/* NFC Symbol */}
            <div className="relative">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
                  style={{
                    width: 10 + i * 8,
                    height: 10 + i * 8,
                    borderColor: phase === "success" ? "hsl(140 14% 50%)" : "hsl(38 38% 60%)",
                  }}
                  animate={{
                    scale: phase === "tapping" || phase === "success" ? [1, 1.15, 1] : [1, 1.08, 1],
                    opacity: phase === "tapping" || phase === "success" ? [0.6, 1, 0.6] : [0.4, 0.6, 0.4],
                  }}
                  transition={{
                    duration: phase === "tapping" ? 0.3 : 1.2,
                    delay: i * 0.1,
                    repeat: phase === "success" ? 0 : Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Terminal indicator */}
        <motion.div
          className="absolute top-2 right-2.5 w-2 h-2 rounded-full"
          animate={{
            backgroundColor: phase === "success" 
              ? "hsl(140 14% 50%)" 
              : "hsl(38 38% 60%)",
            boxShadow: phase === "success"
              ? "0 0 8px hsla(140, 14%, 50%, 0.6)"
              : "0 0 4px hsla(38, 38%, 60%, 0.3)",
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Phone Device - natural human-like motion */}
      <motion.div
        className="absolute w-32 sm:w-36 h-52 sm:h-60 rounded-[1.75rem] bg-gradient-to-b from-neutral-100 to-white border border-neutral-200 shadow-lg overflow-hidden"
        initial={{ y: -50, rotate: -8, x: 10, opacity: 0 }}
        animate={{
          ...getPhoneAnimation(),
          opacity: 1,
        }}
        transition={{
          y: {
            type: "spring",
            stiffness: phase === "tapping" ? 300 : 120,
            damping: phase === "tapping" ? 15 : 20,
            mass: 0.8,
          },
          rotate: {
            type: "spring",
            stiffness: 100,
            damping: 15,
          },
          x: {
            type: "spring",
            stiffness: 100,
            damping: 18,
          },
          opacity: { duration: 0.3 },
        }}
      >
        {/* Phone notch */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-14 h-4 rounded-full bg-neutral-200" />

        {/* Phone screen */}
        <div className="absolute inset-2 top-7 rounded-xl bg-white overflow-hidden border border-neutral-100">
          {/* App content */}
          <div className="absolute inset-2 flex flex-col items-center pt-2">
            {/* Mini Stampify logo */}
            <img src={stampifyLogo} alt="Stampify" className="h-3.5 w-auto object-contain mb-2 opacity-70" />

            {/* Loyalty card on phone */}
            <motion.div
              className="w-full h-16 sm:h-20 rounded-lg bg-gradient-to-br from-stone-100 to-neutral-50 border border-neutral-200 shadow-sm"
              animate={phase === "success" ? {
                boxShadow: [
                  "0 2px 8px hsla(38, 38%, 60%, 0.1)",
                  "0 4px 12px hsla(38, 38%, 60%, 0.2)",
                  "0 2px 8px hsla(38, 38%, 60%, 0.1)",
                ],
              } : {}}
              transition={{ duration: 0.5 }}
            >
              <div className="p-1.5 h-full flex flex-col justify-between">
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 rounded-full bg-neutral-200" />
                  <div className="w-8 h-1 bg-neutral-200 rounded" />
                </div>

                {/* Stamps */}
                <div className="flex justify-between px-0.5">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2.5 h-2.5 rounded-full border border-neutral-300"
                      style={{ 
                        backgroundColor: i < 4 ? "hsl(38 38% 60%)" : "transparent" 
                      }}
                      animate={phase === "success" && i === 4 ? {
                        backgroundColor: "hsl(38 38% 60%)",
                        scale: [1, 1.4, 1],
                      } : {}}
                      transition={{
                        duration: 0.35,
                        delay: 0.1,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Tap instruction */}
            <motion.p
              className="text-neutral-400 text-[8px] mt-2 text-center"
              animate={{ 
                opacity: phase === "ready" || phase === "approaching" ? 1 : 0.4 
              }}
            >
              Hold near reader
            </motion.p>
          </div>
        </div>

        {/* Subtle phone shadow during tap */}
        <motion.div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-black/10 rounded-full blur-sm"
          animate={{
            scaleX: phase === "tapping" || phase === "success" ? 1.2 : 0.8,
            opacity: phase === "tapping" || phase === "success" ? 0.3 : 0.1,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Ripple effects on contact - synced with tap */}
      {(phase === "tapping" || phase === "success") && [...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-[32%] w-28 h-8 rounded-full border-2"
          style={{ borderColor: "hsla(38, 38%, 60%, 0.4)" }}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{
            opacity: [0, 0.7, 0],
            scale: [0.4, 1.3 + i * 0.25, 1.8 + i * 0.3],
          }}
          transition={{
            duration: 0.6,
            delay: i * 0.08,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Success stamp indicator - appears in sync with tap */}
      <motion.div
        className="absolute top-[20%] right-[6%]"
        initial={{ scale: 0, opacity: 0, y: 20 }}
        animate={phase === "success" ? {
          scale: 1,
          opacity: 1,
          y: 0,
        } : {}}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 20,
          delay: 0.05,
        }}
      >
        <motion.div
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg"
          style={{ background: "linear-gradient(135deg, hsl(38 50% 55%), hsl(38 45% 50%))" }}
          animate={phase === "success" ? {
            boxShadow: [
              "0 4px 16px hsla(38, 45%, 55%, 0.3)",
              "0 6px 24px hsla(38, 45%, 55%, 0.5)",
              "0 4px 16px hsla(38, 45%, 55%, 0.3)",
            ],
            scale: [1, 1.04, 1],
          } : {}}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="text-lg text-white font-bold">✓</span>
        </motion.div>
        <motion.div
          className="mt-1.5 px-2.5 py-1 rounded-full shadow-md text-center"
          style={{ background: "linear-gradient(135deg, hsl(38 50% 55%), hsl(38 45% 50%))" }}
          initial={{ opacity: 0, y: 8, scale: 0.85 }}
          animate={phase === "success" ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ 
            type: "spring",
            stiffness: 350,
            damping: 22,
            delay: 0.15 
          }}
        >
          <span className="text-xs font-bold text-white">+1 Stamp</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
