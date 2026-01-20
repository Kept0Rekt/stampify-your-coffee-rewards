import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StampifyLogo } from "@/components/ui/StampifyLogo";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Shield, Store } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

export default function Index() {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, isLoading, navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-emerald-dark/20" />

      {/* Decorative circles */}
      <div className="absolute top-20 -left-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-40 -right-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="space-y-10 max-w-md"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="flex justify-center"
          >
            <StampifyLogo size="xl" />
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h1 className="heading-display text-4xl text-foreground leading-tight">
              Your Rewards,{" "}
              <span className="emerald-text">Unified</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              All your local loyalty cards in one beautiful wallet. Cafés, salons, gyms, and more.
            </p>
          </motion.div>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <div className="flex items-center gap-2 glass-card px-4 py-2.5 rounded-full text-sm">
              <Store className="w-4 h-4 text-primary" />
              <span className="text-foreground font-medium">All Businesses</span>
            </div>
            <div className="flex items-center gap-2 glass-card px-4 py-2.5 rounded-full text-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-foreground font-medium">Earn Rewards</span>
            </div>
            <div className="flex items-center gap-2 glass-card px-4 py-2.5 rounded-full text-sm">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-foreground font-medium">Secure Wallet</span>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4 pt-2"
          >
            <Button
              size="lg"
              className="btn-primary w-full text-base h-14 rounded-2xl"
              onClick={() => navigate("/auth")}
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-sm text-muted-foreground">
              Free to use • No credit card required
            </p>
          </motion.div>
        </motion.div>
      </main>

      <footer className="p-6 text-center relative z-10">
        <p className="text-xs text-muted-foreground">
          © 2026 Stampify. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
