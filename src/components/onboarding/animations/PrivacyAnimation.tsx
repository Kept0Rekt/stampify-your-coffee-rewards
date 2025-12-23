import { motion } from "framer-motion";
import { Shield, Camera, Smartphone } from "lucide-react";

export function PrivacyAnimation() {
  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      {/* Central shield */}
      <motion.div
        className="relative z-10"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.6,
          ease: [0.34, 1.56, 0.64, 1],
        }}
      >
        <motion.div
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold via-caramel to-copper flex items-center justify-center shadow-lg"
          animate={{
            boxShadow: [
              "0 4px 20px rgba(212, 175, 55, 0.3)",
              "0 8px 30px rgba(212, 175, 55, 0.4)",
              "0 4px 20px rgba(212, 175, 55, 0.3)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Shield className="w-8 h-8 text-white" />
        </motion.div>
      </motion.div>

      {/* Orbiting icons */}
      <motion.div
        className="absolute"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Camera icon */}
        <motion.div
          className="absolute -top-4 left-1/2 -translate-x-1/2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center shadow-md border border-border">
              <Camera className="w-4 h-4 text-gold" />
            </div>
          </motion.div>
        </motion.div>

        {/* NFC/Phone icon */}
        <motion.div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center shadow-md border border-border">
              <Smartphone className="w-4 h-4 text-gold" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Security ring */}
      <motion.div
        className="absolute w-28 h-28 rounded-full border-2 border-gold/20"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      />

      {/* Pulse ring */}
      <motion.div
        className="absolute w-28 h-28 rounded-full border border-gold/30"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.1, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Lock indicator */}
      <motion.div
        className="absolute -bottom-1 right-2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          delay: 0.8,
          duration: 0.4,
          ease: [0.34, 1.56, 0.64, 1],
        }}
      >
        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shadow-md">
          <span className="text-[8px] text-white">🔒</span>
        </div>
      </motion.div>
    </div>
  );
}
