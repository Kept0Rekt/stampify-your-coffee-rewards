import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Shield, Camera, Smartphone, Lock, Check } from "lucide-react";

export function PrivacyAnimation() {
  const [phase, setPhase] = useState<"icons" | "shield" | "complete">("icons");

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("shield"), 1000);
    const timer2 = setTimeout(() => setPhase("complete"), 2200);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const permissionIcons = [
    { Icon: Camera, label: "Camera", delay: 0, x: -80, y: -60 },
    { Icon: Smartphone, label: "NFC", delay: 0.1, x: 80, y: -60 },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-100 via-stone-50 to-neutral-100" />

      {/* Permission icons floating */}
      {permissionIcons.map(({ Icon, label, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute flex flex-col items-center gap-2"
          initial={{ x, y, opacity: 1, scale: 1 }}
          animate={phase === "shield" || phase === "complete" ? {
            x: 0,
            y: -20,
            opacity: 0,
            scale: 0.5,
          } : {}}
          transition={{
            duration: 0.6,
            delay,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <motion.div
            className="w-16 h-16 rounded-2xl bg-white border border-neutral-200 shadow-sm flex items-center justify-center"
            animate={phase === "icons" ? {
              y: [0, -8, 0],
            } : {}}
            transition={{
              duration: 2,
              delay: delay * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Icon className="w-7 h-7 text-neutral-600" />
          </motion.div>
          <span className="text-xs text-neutral-500 font-medium">{label}</span>
        </motion.div>
      ))}

      {/* Central shield */}
      <motion.div
        className="absolute"
        initial={{ scale: 0, opacity: 0 }}
        animate={phase === "shield" || phase === "complete" ? {
          scale: 1,
          opacity: 1,
        } : {}}
        transition={{
          duration: 0.5,
          delay: 0.3,
          ease: [0.34, 1.56, 0.64, 1],
        }}
      >
        <motion.div
          className="relative w-32 h-36 flex items-center justify-center"
          animate={phase === "complete" ? {
            scale: [1, 1.05, 1],
          } : {}}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Shield background glow */}
          <motion.div
            className="absolute inset-0 rounded-full -z-10"
            style={{ background: "hsla(38, 38%, 60%, 0.15)" }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={phase === "complete" ? {
              scale: [1.2, 1.4, 1.2],
              opacity: [0.3, 0.5, 0.3],
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Shield icon */}
          <motion.div
            className="relative"
            initial={{ rotate: 0 }}
            animate={phase === "complete" ? { rotate: [0, 5, -5, 0] } : {}}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Shield 
              className="w-24 h-24"
              style={{ color: "hsl(38 38% 55%)" }}
              strokeWidth={1.5}
            />
            
            {/* Lock icon inside shield */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={phase === "shield" || phase === "complete" ? {
                scale: 1,
                opacity: 1,
              } : {}}
              transition={{
                duration: 0.4,
                delay: 0.6,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            >
              <Lock 
                className="w-8 h-8 mt-2"
                style={{ color: "hsl(38 38% 45%)" }}
                strokeWidth={2}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Checkmarks appearing around shield */}
      {phase === "complete" && (
        <>
          {[
            { x: -70, y: -50, delay: 0.5 },
            { x: 70, y: -50, delay: 0.7 },
            { x: -60, y: 50, delay: 0.9 },
            { x: 60, y: 50, delay: 1.1 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "hsl(38 38% 60%)" }}
              initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                x: pos.x,
                y: pos.y,
              }}
              transition={{
                duration: 0.4,
                delay: pos.delay,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            >
              <Check className="w-4 h-4 text-white" strokeWidth={3} />
            </motion.div>
          ))}
        </>
      )}

      {/* Floating security particles */}
      {phase === "complete" && [...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{ background: "hsla(38, 38%, 60%, 0.4)" }}
          initial={{ 
            opacity: 0, 
            scale: 0,
            x: 0,
            y: 0,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0.5],
            x: (Math.random() - 0.5) * 180,
            y: (Math.random() - 0.5) * 180,
          }}
          transition={{
            duration: 1.8,
            delay: 1.5 + i * 0.15,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
