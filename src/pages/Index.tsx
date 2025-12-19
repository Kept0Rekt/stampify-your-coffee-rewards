import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StampifyLogo } from "@/components/ui/StampifyLogo";
import { Button } from "@/components/ui/button";
import { Coffee, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

export default function Index() {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && user) {
      navigate("/wallet", { replace: true });
    }
  }, [user, isLoading, navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8 max-w-md"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center"
          >
            <StampifyLogo size="xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h1 className="text-3xl font-bold text-foreground">
              Your Coffee Rewards,{" "}
              <span className="gold-text">Simplified</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Collect stamps, earn free coffee, and never lose a loyalty card again.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <div className="flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-full text-sm">
              <Coffee className="w-4 h-4 text-accent" />
              <span className="text-card-foreground">Digital Stamps</span>
            </div>
            <div className="flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-full text-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-card-foreground">Free Rewards</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-4 pt-4"
          >
            <Button
              size="lg"
              className="btn-gold w-full text-lg h-14"
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

      <footer className="p-6 text-center">
        <p className="text-xs text-muted-foreground">
          © 2024 Stampify. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
