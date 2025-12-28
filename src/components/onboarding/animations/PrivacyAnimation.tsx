import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ShieldCheck, Lock, Eye, Server } from "lucide-react";

interface PrivacyAnimationProps {
  onAllow?: () => void;
  onSkip?: () => void;
}

export function PrivacyAnimation({ onAllow, onSkip }: PrivacyAnimationProps) {
  const [showGlow, setShowGlow] = useState(false);
  const [showBadges, setShowBadges] = useState(false);

  useEffect(() => {
    const glowTimer = setTimeout(() => setShowGlow(true), 600);
    const badgesTimer = setTimeout(() => setShowBadges(true), 1000);
    const permissionTimer = setTimeout(() => requestPermissions(), 3000);
    
    return () => {
      clearTimeout(glowTimer);
      clearTimeout(badgesTimer);
      clearTimeout(permissionTimer);
    };
  }, []);

  const requestPermissions = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          stream.getTracks().forEach(track => track.stop());
        })
        .catch(() => {});

      navigator.geolocation.getCurrentPosition(
        () => onAllow?.(),
        () => onSkip?.(),
        { timeout: 10000 }
      );
    } catch {
      onSkip?.();
    }
  };

  const trustBadges = [
    { icon: Lock, label: "Encrypted" },
    { icon: Eye, label: "Private" },
    { icon: Server, label: "Secure" },
  ];

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden">
      {/* Clean background */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 to-neutral-100" />

      {/* Single authoritative shield */}
      <motion.div
        className="relative flex items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.6,
          ease: [0.34, 1.56, 0.64, 1],
        }}
      >
        {/* Outer pulsing ring */}
        <motion.div
          className="absolute w-44 h-44 rounded-full border-2"
          style={{ borderColor: "hsla(38, 38%, 55%, 0.2)" }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={showGlow ? { 
            scale: [1, 1.15, 1],
            opacity: [0.4, 0, 0.4],
          } : {}}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />

        {/* Inner glow */}
        <motion.div
          className="absolute w-36 h-36 rounded-full"
          style={{ 
            background: "radial-gradient(circle, hsla(38, 38%, 55%, 0.2) 0%, transparent 70%)" 
          }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={showGlow ? { 
            scale: [1, 1.1, 1],
            opacity: [0.6, 1, 0.6],
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Main shield icon with pulse */}
        <motion.div
          initial={{ scale: 1 }}
          animate={showGlow ? { 
            scale: [1, 1.05, 1],
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ShieldCheck 
            className="w-28 h-28 drop-shadow-lg"
            style={{ color: "hsl(38 38% 50%)" }}
            strokeWidth={1.3}
          />
        </motion.div>
      </motion.div>

      {/* Trust badges */}
      <motion.div 
        className="flex items-center gap-3 mt-8 z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={showBadges ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {trustBadges.map(({ icon: Icon, label }, index) => (
          <motion.div
            key={label}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-neutral-200 shadow-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={showBadges ? { opacity: 1, scale: 1 } : {}}
            transition={{ 
              duration: 0.4, 
              delay: index * 0.1,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          >
            <Icon className="w-3.5 h-3.5 text-neutral-500" strokeWidth={2} />
            <span className="text-xs font-medium text-neutral-600">{label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Privacy message */}
      <motion.p
        className="text-xs text-neutral-400 mt-4 z-10"
        initial={{ opacity: 0 }}
        animate={showBadges ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Your data stays on your device
      </motion.p>
    </div>
  );
}
