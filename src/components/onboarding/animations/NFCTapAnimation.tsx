import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import stampifyLogo from "@/assets/stampify-logo.png";

export function NFCTapAnimation() {
  const [phase, setPhase] = useState<"offscreen" | "entering" | "hovering" | "tapping" | "contact" | "settle">("offscreen");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("entering"), 200),
      setTimeout(() => setPhase("hovering"), 700),
      setTimeout(() => setPhase("tapping"), 1100),
      setTimeout(() => setPhase("contact"), 1250),
      setTimeout(() => setPhase("settle"), 1400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Natural arc motion - mimics how a person would bring their phone to tap
  const getPhoneAnimation = () => {
    switch (phase) {
      case "offscreen":
        // Start off-screen bottom-left
        return { x: -100, y: 140, rotate: 45, scale: 0.9 };
      case "entering":
        // Arc upward and inward - accelerating
        return { x: -35, y: 50, rotate: 25, scale: 1 };
      case "hovering":
        // Slow down as approaching - moment of aim
        return { x: -10, y: 18, rotate: 12, scale: 1 };
      case "tapping":
        // Final approach - slowing for contact
        return { x: -2, y: 6, rotate: 6, scale: 1 };
      case "contact":
        // Gentle contact with slight compression feel
        return { x: 0, y: 2, rotate: 4, scale: 1 };
      case "settle":
        // Natural settle back after tap
        return { x: -8, y: 16, rotate: 10, scale: 1 };
      default:
        return { x: -100, y: 140, rotate: 45, scale: 0.9 };
    }
  };

  // Dynamic spring config based on phase
  const getSpringConfig = () => {
    switch (phase) {
      case "entering":
        return { stiffness: 80, damping: 18, mass: 1 };
      case "hovering":
        return { stiffness: 60, damping: 20, mass: 1.2 }; // Slower, more deliberate
      case "tapping":
        return { stiffness: 120, damping: 15, mass: 0.8 }; // Slight acceleration
      case "contact":
        return { stiffness: 300, damping: 25, mass: 0.5 }; // Quick, precise contact
      case "settle":
        return { stiffness: 100, damping: 18, mass: 1 }; // Natural settle
      default:
        return { stiffness: 80, damping: 18, mass: 1 };
    }
  };

  const isContact = phase === "contact" || phase === "settle";

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-100 via-stone-50 to-neutral-100" />

      {/* NFC Terminal - centered */}
      <motion.div
        className="absolute w-40 sm:w-48 h-14 sm:h-16 rounded-xl bg-gradient-to-b from-neutral-200 to-neutral-300 border border-neutral-300 shadow-lg"
        style={{ top: "36%" }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Terminal screen */}
        <div className="absolute inset-1.5 rounded-lg bg-white flex items-center justify-center">
          <motion.div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            animate={{
              backgroundColor: isContact
                ? "hsla(140, 14%, 50%, 0.15)" 
                : "hsla(38, 38%, 60%, 0.1)",
            }}
            transition={{ duration: 0.15 }}
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
                    borderColor: isContact ? "hsl(140 14% 50%)" : "hsl(38 38% 60%)",
                  }}
                  animate={{
                    scale: phase === "contact" ? [1, 1.2, 1] : [1, 1.08, 1],
                    opacity: phase === "contact" ? [0.7, 1, 0.7] : [0.4, 0.6, 0.4],
                  }}
                  transition={{
                    duration: phase === "contact" ? 0.25 : 1.2,
                    delay: i * 0.08,
                    repeat: phase === "settle" ? 0 : Infinity,
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
            backgroundColor: isContact
              ? "hsl(140 14% 50%)" 
              : "hsl(38 38% 60%)",
            boxShadow: isContact
              ? "0 0 10px hsla(140, 14%, 50%, 0.7)"
              : "0 0 4px hsla(38, 38%, 60%, 0.3)",
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>

      {/* Phone Device - natural arc motion from bottom-left */}
      <motion.div
        className="absolute w-32 sm:w-36 h-52 sm:h-60 rounded-[1.75rem] bg-gradient-to-b from-neutral-100 to-white border border-neutral-200 shadow-lg overflow-hidden"
        style={{ 
          top: "40%",
          transformOrigin: "top center" 
        }}
        initial={{ x: -100, y: 140, rotate: 45, opacity: 0, scale: 0.9 }}
        animate={{
          ...getPhoneAnimation(),
          opacity: 1,
        }}
        transition={{
          type: "spring",
          ...getSpringConfig(),
          opacity: { duration: 0.25 },
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
              animate={isContact ? {
                boxShadow: [
                  "0 2px 8px hsla(38, 38%, 60%, 0.1)",
                  "0 4px 14px hsla(38, 38%, 60%, 0.25)",
                  "0 2px 8px hsla(38, 38%, 60%, 0.1)",
                ],
              } : {}}
              transition={{ duration: 0.4 }}
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
                      animate={phase === "settle" && i === 4 ? {
                        backgroundColor: "hsl(38 38% 60%)",
                        scale: [1, 1.5, 1],
                      } : {}}
                      transition={{
                        duration: 0.3,
                        delay: 0.05,
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
                opacity: phase === "offscreen" || phase === "entering" || phase === "hovering" ? 1 : 0.3 
              }}
            >
              Hold near reader
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Contact ripple effects */}
      {(phase === "contact" || phase === "settle") && [...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-20 h-6 rounded-full border-2"
          style={{ 
            borderColor: "hsla(38, 38%, 60%, 0.5)",
            top: "38%",
          }}
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0.3, 1.2 + i * 0.2, 1.6 + i * 0.25],
          }}
          transition={{
            duration: 0.5,
            delay: i * 0.06,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Success stamp indicator - synced with contact */}
      <motion.div
        className="absolute top-[20%] right-[8%]"
        initial={{ scale: 0, opacity: 0, y: 15 }}
        animate={phase === "settle" ? {
          scale: 1,
          opacity: 1,
          y: 0,
        } : {}}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 22,
          delay: 0.08,
        }}
      >
        <motion.div
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg"
          style={{ background: "linear-gradient(135deg, hsl(38 50% 55%), hsl(38 45% 50%))" }}
          animate={phase === "settle" ? {
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
          initial={{ opacity: 0, y: 6, scale: 0.85 }}
          animate={phase === "settle" ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ 
            type: "spring",
            stiffness: 320,
            damping: 20,
            delay: 0.18 
          }}
        >
          <span className="text-xs font-bold text-white">+1 Stamp</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
