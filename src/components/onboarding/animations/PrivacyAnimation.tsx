import { motion } from "framer-motion";
import { Shield, Camera, Smartphone, Lock } from "lucide-react";

export function PrivacyAnimation() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-espresso/10 to-charcoal" />

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
          className="w-32 h-32 rounded-3xl bg-gradient-to-br from-gold via-caramel to-copper flex items-center justify-center shadow-2xl"
          animate={{
            boxShadow: [
              "0 20px 60px rgba(212, 175, 55, 0.3)",
              "0 30px 80px rgba(212, 175, 55, 0.5)",
              "0 20px 60px rgba(212, 175, 55, 0.3)",
            ],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Shield className="w-16 h-16 text-white" />
        </motion.div>

        {/* Lock badge */}
        <motion.div
          className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shadow-xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <Lock className="w-6 h-6 text-white" />
        </motion.div>
      </motion.div>

      {/* Orbiting permission cards */}
      <motion.div
        className="absolute w-80 h-80"
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
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-muted to-muted/80 border border-border flex flex-col items-center justify-center shadow-xl">
              <Camera className="w-8 h-8 text-gold mb-1" />
              <span className="text-[10px] text-muted-foreground">Camera</span>
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
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-muted to-muted/80 border border-border flex flex-col items-center justify-center shadow-xl">
              <Smartphone className="w-8 h-8 text-gold mb-1" />
              <span className="text-[10px] text-muted-foreground">NFC</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Security rings */}
      <motion.div
        className="absolute w-64 h-64 rounded-full border-2 border-gold/20"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      />
      <motion.div
        className="absolute w-80 h-80 rounded-full border border-gold/10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      />

      {/* Pulsing outer ring */}
      <motion.div
        className="absolute w-72 h-72 rounded-full border-2 border-gold/30"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.15, 0.3],
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
          className="absolute w-2 h-2 rounded-full bg-gold/40"
          initial={{ 
            opacity: 0,
            x: 0,
            y: 0,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            x: Math.cos((i / 6) * Math.PI * 2) * 120,
            y: Math.sin((i / 6) * Math.PI * 2) * 120,
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
        className="absolute bottom-[22%] flex gap-4"
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
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl bg-muted/50 border border-border"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 + i * 0.1 }}
          >
            <span className="text-lg">{badge.icon}</span>
            <span className="text-[10px] text-muted-foreground">{badge.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
