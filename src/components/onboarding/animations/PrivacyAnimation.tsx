import { motion } from "framer-motion";
import { ShieldCheck, Lock, Eye, Server } from "lucide-react";

interface PrivacyAnimationProps {
  onAllow?: () => void;
  onSkip?: () => void;
}

export function PrivacyAnimation({ onAllow, onSkip }: PrivacyAnimationProps) {
  const trustBadges = [
    { icon: Lock, label: "Encrypted" },
    { icon: Eye, label: "Private" },
    { icon: Server, label: "Secure" },
  ];

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Clean background */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 to-neutral-100" />

      {/* Content wrapper */}
      <div className="relative flex flex-col items-center justify-center gap-6 sm:gap-8">
        {/* Shield with pulsing animation */}
        <motion.div
          className="relative flex items-center justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {/* Outer pulsing ring */}
          <motion.div
            className="absolute w-32 h-32 sm:w-36 sm:h-36 rounded-full border-2"
            style={{ borderColor: "hsla(38, 38%, 55%, 0.25)" }}
            animate={{ 
              scale: [1, 1.12, 1],
              opacity: [0.4, 0.1, 0.4],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Inner glow */}
          <motion.div
            className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full"
            style={{ 
              background: "radial-gradient(circle, hsla(38, 38%, 55%, 0.15) 0%, transparent 70%)" 
            }}
            animate={{ 
              scale: [1, 1.08, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Main shield icon with subtle pulse */}
          <motion.div
            animate={{ scale: [1, 1.03, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ShieldCheck 
              className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-lg"
              style={{ color: "hsl(38 38% 50%)" }}
              strokeWidth={1.3}
            />
          </motion.div>
        </motion.div>

        {/* Trust badges */}
        <motion.div 
          className="flex items-center justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        >
          {trustBadges.map(({ icon: Icon, label }, index) => (
            <motion.div
              key={label}
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/90 border border-neutral-200 shadow-sm"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.4, 
                delay: 0.5 + index * 0.1,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            >
              <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-neutral-500" strokeWidth={2} />
              <span className="text-[10px] sm:text-xs font-medium text-neutral-600">{label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Privacy message */}
        <motion.p
          className="text-xs sm:text-sm text-neutral-500 text-center font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          Your data is encrypted and secure
        </motion.p>
      </div>
    </div>
  );
}
