import { motion } from "framer-motion";
import { Shield, Camera, Smartphone, Lock } from "lucide-react";

export function PrivacyAnimation() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Background gradient - professional light */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-100 via-stone-50 to-neutral-100" />

      {/* Central shield - Large */}
      <motion.div
        className="relative z-10"
        initial={{ scale: 0, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.34, 1.56, 0.64, 1],
        }}
      >
        <motion.div
          className="w-28 h-28 rounded-2xl flex items-center justify-center shadow-md"
          style={{ background: "hsl(38 38% 60%)" }}
          animate={{
            boxShadow: [
              "0 8px 24px hsla(38, 38%, 60%, 0.15)",
              "0 12px 32px hsla(38, 38%, 60%, 0.22)",
              "0 8px 24px hsla(38, 38%, 60%, 0.15)",
            ],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Shield className="w-14 h-14 text-white" />
        </motion.div>

        {/* Lock badge */}
        <motion.div
          className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center shadow-md"
          style={{ background: "hsl(140 14% 50%)" }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <Lock className="w-5 h-5 text-white" />
        </motion.div>
      </motion.div>

      {/* Orbiting permission cards */}
      <motion.div
        className="absolute w-72 h-72"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Camera permission */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-18 h-18 rounded-xl bg-white border border-neutral-200 flex flex-col items-center justify-center shadow-sm p-3">
              <Camera className="w-7 h-7 mb-1" style={{ color: "hsl(38 38% 60%)" }} />
              <span className="text-[10px] text-neutral-500">Camera</span>
            </div>
          </motion.div>
        </motion.div>

        {/* NFC permission */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-18 h-18 rounded-xl bg-white border border-neutral-200 flex flex-col items-center justify-center shadow-sm p-3">
              <Smartphone className="w-7 h-7 mb-1" style={{ color: "hsl(38 38% 60%)" }} />
              <span className="text-[10px] text-neutral-500">NFC</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Security rings */}
      <motion.div
        className="absolute w-56 h-56 rounded-full"
        style={{ border: "1.5px solid hsla(38, 38%, 60%, 0.2)" }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      />
      <motion.div
        className="absolute w-72 h-72 rounded-full"
        style={{ border: "1px solid hsla(38, 38%, 60%, 0.1)" }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      />

      {/* Pulsing outer ring */}
      <motion.div
        className="absolute w-64 h-64 rounded-full"
        style={{ border: "1.5px solid hsla(38, 38%, 60%, 0.2)" }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.25, 0.12, 0.25],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating security particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{ background: "hsla(38, 38%, 60%, 0.3)" }}
          initial={{ 
            opacity: 0,
            x: 0,
            y: 0,
          }}
          animate={{
            opacity: [0, 0.6, 0],
            x: Math.cos((i / 6) * Math.PI * 2) * 100,
            y: Math.sin((i / 6) * Math.PI * 2) * 100,
          }}
          transition={{
            duration: 3,
            delay: 1 + i * 0.3,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Trust badges at bottom */}
      <motion.div
        className="absolute bottom-[22%] flex gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        {[
          { icon: "🔒", label: "Encrypted" },
          { icon: "🛡️", label: "Secure" },
          { icon: "✓", label: "Private" },
        ].map((badge, i) => (
          <motion.div
            key={badge.label}
            className="flex flex-col items-center gap-1 px-3.5 py-2 rounded-xl bg-white border border-neutral-200 shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 + i * 0.1 }}
          >
            <span className="text-base">{badge.icon}</span>
            <span className="text-[10px] text-neutral-500">{badge.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
