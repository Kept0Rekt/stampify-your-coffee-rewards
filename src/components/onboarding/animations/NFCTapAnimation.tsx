import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import stampifyLogo from "@/assets/stampify-logo.png";

export function NFCTapAnimation() {
  const [phase, setPhase] = useState<"offscreen" | "entering" | "hovering" | "contact" | "stamped" | "settle">("offscreen");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("entering"), 200),
      setTimeout(() => setPhase("hovering"), 650),
      setTimeout(() => setPhase("contact"), 1050),
      setTimeout(() => setPhase("stamped"), 1250),
      setTimeout(() => setPhase("settle"), 1700),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Smooth arc motion - straightens upright at contact
  const getPhoneAnimation = () => {
    switch (phase) {
      case "offscreen":
        return { x: -90, y: 130, rotate: 40 };
      case "entering":
        return { x: -30, y: 45, rotate: 20 };
      case "hovering":
        return { x: -8, y: 15, rotate: 8 };
      case "contact":
        // Straighten upright at contact
        return { x: 0, y: 4, rotate: 0 };
      case "stamped":
        // Hold position during stamp animation
        return { x: 0, y: 4, rotate: 0 };
      case "settle":
        // Gentle pull back
        return { x: -12, y: 22, rotate: 6 };
      default:
        return { x: -90, y: 130, rotate: 40 };
    }
  };

  const getSpringConfig = () => {
    switch (phase) {
      case "entering":
        return { stiffness: 70, damping: 16, mass: 1 };
      case "hovering":
        return { stiffness: 55, damping: 18, mass: 1.1 };
      case "contact":
        return { stiffness: 200, damping: 22, mass: 0.7 };
      case "stamped":
        return { stiffness: 300, damping: 30, mass: 0.5 };
      case "settle":
        return { stiffness: 90, damping: 16, mass: 1 };
      default:
        return { stiffness: 70, damping: 16, mass: 1 };
    }
  };

  const isContact = phase === "contact" || phase === "stamped" || phase === "settle";
  const showStamp = phase === "stamped" || phase === "settle";

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-100 via-stone-50 to-neutral-100" />

      {/* NFC Terminal */}
      <motion.div
        className="absolute w-40 sm:w-48 h-14 sm:h-16 rounded-xl bg-gradient-to-b from-neutral-200 to-neutral-300 border border-neutral-300 shadow-lg"
        style={{ top: "35%" }}
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
                ? "hsla(38, 38%, 60%, 0.2)"
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
                    borderColor: "hsl(38 38% 60%)",
                  }}
                  animate={{
                    scale: phase === "contact" || phase === "stamped" ? [1, 1.25, 1] : [1, 1.08, 1],
                    opacity: isContact ? [0.7, 1, 0.7] : [0.4, 0.6, 0.4],
                  }}
                  transition={{
                    duration: phase === "contact" || phase === "stamped" ? 0.2 : 1.2,
                    delay: i * 0.06,
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
            backgroundColor: isContact ? "hsl(140 14% 50%)" : "hsl(38 38% 60%)",
            boxShadow: isContact
              ? "0 0 10px hsla(140, 14%, 50%, 0.7)"
              : "0 0 4px hsla(38, 38%, 60%, 0.3)",
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>

      {/* Phone Device */}
      <motion.div
        className="absolute w-32 sm:w-36 h-52 sm:h-60 rounded-[1.75rem] bg-gradient-to-b from-neutral-100 to-white border border-neutral-200 shadow-lg overflow-hidden"
        style={{ top: "39%", transformOrigin: "top center" }}
        initial={{ x: -90, y: 130, rotate: 40, opacity: 0 }}
        animate={{ ...getPhoneAnimation(), opacity: 1 }}
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
          <div className="absolute inset-2 flex flex-col items-center pt-2">
            {/* Mini Stampify logo */}
            <img src={stampifyLogo} alt="Stampify" className="h-3.5 w-auto object-contain mb-2 opacity-70" />

            {/* Loyalty card on phone */}
            <motion.div
              className="w-full h-16 sm:h-20 rounded-lg bg-gradient-to-br from-stone-100 to-neutral-50 border border-neutral-200 shadow-sm relative overflow-hidden"
              animate={showStamp ? {
                boxShadow: [
                  "0 2px 8px hsla(38, 38%, 60%, 0.1)",
                  "0 6px 20px hsla(38, 38%, 60%, 0.3)",
                  "0 3px 10px hsla(38, 38%, 60%, 0.15)",
                ],
              } : {}}
              transition={{ duration: 0.4 }}
            >
              {/* Flash effect on stamp */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                initial={{ x: "-100%", opacity: 0 }}
                animate={showStamp ? { x: "100%", opacity: [0, 0.8, 0] } : {}}
                transition={{ duration: 0.4, delay: 0.1 }}
              />

              <div className="p-1.5 h-full flex flex-col justify-between relative z-10">
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 rounded-full bg-neutral-200" />
                  <div className="w-8 h-1 bg-neutral-200 rounded" />
                </div>

                {/* Stamps - 5th stamp animates in clearly */}
                <div className="flex justify-between px-0.5">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="relative">
                      <motion.div
                        className="w-2.5 h-2.5 rounded-full border border-neutral-300"
                        style={{ 
                          backgroundColor: i < 4 ? "hsl(38 38% 60%)" : "transparent" 
                        }}
                      />
                      {/* New stamp animation for 5th stamp */}
                      {i === 4 && showStamp && (
                        <motion.div
                          className="absolute inset-0 w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: "hsl(38 38% 60%)" }}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: [0, 1.8, 1], opacity: 1 }}
                          transition={{
                            duration: 0.35,
                            ease: [0.34, 1.56, 0.64, 1],
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Tap instruction */}
            <motion.p
              className="text-neutral-400 text-[8px] mt-2 text-center"
              animate={{ opacity: isContact ? 0.3 : 1 }}
            >
              Hold near reader
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Contact ripple effects */}
      {isContact && [...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-20 h-6 rounded-full border-2"
          style={{ borderColor: "hsla(38, 38%, 60%, 0.5)", top: "37%" }}
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: [0, 0.8, 0], scale: [0.3, 1.3 + i * 0.2, 1.7 + i * 0.25] }}
          transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
        />
      ))}

      {/* Success indicator - appears right after stamp */}
      <motion.div
        className="absolute top-[18%] right-[6%]"
        initial={{ scale: 0, opacity: 0, y: 12 }}
        animate={showStamp ? { scale: 1, opacity: 1, y: 0 } : {}}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 22,
          delay: 0.15,
        }}
      >
        <motion.div
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-lg"
          style={{ background: "linear-gradient(135deg, hsl(38 50% 55%), hsl(38 45% 50%))" }}
          animate={showStamp ? {
            boxShadow: [
              "0 4px 16px hsla(38, 45%, 55%, 0.3)",
              "0 8px 28px hsla(38, 45%, 55%, 0.5)",
              "0 4px 16px hsla(38, 45%, 55%, 0.3)",
            ],
            scale: [1, 1.05, 1],
          } : {}}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xl text-white font-bold">✓</span>
        </motion.div>
        <motion.div
          className="mt-2 px-3 py-1.5 rounded-full shadow-md text-center"
          style={{ background: "linear-gradient(135deg, hsl(38 50% 55%), hsl(38 45% 50%))" }}
          initial={{ opacity: 0, y: 6, scale: 0.85 }}
          animate={showStamp ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 350, damping: 20, delay: 0.25 }}
        >
          <span className="text-sm font-bold text-white">+1 Stamp</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
