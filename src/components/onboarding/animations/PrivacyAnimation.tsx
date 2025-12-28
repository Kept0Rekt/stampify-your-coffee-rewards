import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";

interface PrivacyAnimationProps {
  onAllow?: () => void;
  onSkip?: () => void;
}

export function PrivacyAnimation({ onAllow, onSkip }: PrivacyAnimationProps) {
  const [showGlow, setShowGlow] = useState(false);

  useEffect(() => {
    const glowTimer = setTimeout(() => setShowGlow(true), 600);
    const permissionTimer = setTimeout(() => requestPermissions(), 2500);
    
    return () => {
      clearTimeout(glowTimer);
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

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Clean background */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 to-neutral-100" />

      {/* Single authoritative shield */}
      <motion.div
        className="relative flex items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: [0.34, 1.56, 0.64, 1],
        }}
      >
        {/* Subtle glow ring */}
        <motion.div
          className="absolute w-40 h-40 rounded-full"
          style={{ 
            background: "radial-gradient(circle, hsla(38, 38%, 60%, 0.15) 0%, transparent 70%)" 
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={showGlow ? { 
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          } : {}}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Main shield icon */}
        <motion.div
          animate={showGlow ? { 
            scale: [1, 1.02, 1],
          } : {}}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ShieldCheck 
            className="w-28 h-28"
            style={{ color: "hsl(38 38% 50%)" }}
            strokeWidth={1.2}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
