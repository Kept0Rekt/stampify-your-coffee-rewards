import { motion } from "framer-motion";
import { Shield, Lock, Camera, Smartphone, ShieldCheck, Eye, KeyRound } from "lucide-react";

interface PrivacyAnimationProps {
  onAllow?: () => void;
  onSkip?: () => void;
}

export function PrivacyAnimation({ onAllow, onSkip }: PrivacyAnimationProps) {
  const trustBadges = [
    { icon: ShieldCheck, label: "Encrypted" },
    { icon: Eye, label: "Private" },
    { icon: KeyRound, label: "Secure" },
  ];

  const permissionItems = [
    { icon: Camera, text: "Scan QR codes to join new cafés" },
    { icon: Smartphone, text: "Collect stamps at nearby readers" },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden px-6">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />

      {/* Main card */}
      <motion.div
        className="relative z-10 w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="latte-card p-8 text-center">
          {/* Shield with pulsing ring */}
          <div className="relative mx-auto mb-6 flex h-28 w-28 items-center justify-center">
            {/* Pulsing rings */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary/20"
              animate={{
                scale: [1, 1.3, 1.3],
                opacity: [0.4, 0, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary/20"
              animate={{
                scale: [1, 1.3, 1.3],
                opacity: [0.4, 0, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.8,
              }}
            />
            
            {/* Shield background */}
            <motion.div
              className="absolute inset-2 rounded-full bg-primary/10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            />

            {/* Shield icon */}
            <motion.div
              className="relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Shield className="h-16 w-16 text-primary" strokeWidth={1.5} />
              <Lock className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-primary-foreground" strokeWidth={2} />
            </motion.div>
          </div>

          {/* Trust badges */}
          <motion.div
            className="mb-6 flex justify-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            {trustBadges.map((badge, index) => (
              <motion.div
                key={badge.label}
                className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              >
                <badge.icon className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-medium text-foreground">{badge.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Permission explanations */}
          <motion.div
            className="mb-6 space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            {permissionItems.map((item, index) => (
              <div key={index} className="flex items-center gap-3 text-left">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary">
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <span className="text-sm text-muted-foreground">{item.text}</span>
              </div>
            ))}
          </motion.div>

          {/* Reassurance text */}
          <motion.p
            className="mb-6 text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            Your data never leaves your device. We only use these permissions when you tap to collect stamps.
          </motion.p>

          {/* Action buttons */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
          >
            <button
              onClick={onAllow}
              className="w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90 active:scale-[0.98]"
            >
              Allow Access
            </button>
            <button
              onClick={onSkip}
              className="w-full py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Not now
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
