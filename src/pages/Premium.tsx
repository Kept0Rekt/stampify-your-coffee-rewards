import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Sparkles, Crown, ArrowLeft, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlan } from "@/hooks/usePlan";

const premiumBenefits = [
  "7 stamps instead of 10 (30% faster rewards)",
  "Double stamps on Tuesdays",
  "3× stamps in your birthday month",
  "Stamps never expire (90 days for free users)",
  "Priority customer support",
];

export default function Premium() {
  const navigate = useNavigate();
  const { plan, setPlan } = usePlan();

  const handleUpgrade = () => {
    setPlan("premium");
    navigate(-1);
  };

  if (plan === "premium") {
    return (
      <div className="min-h-screen bg-background p-6 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6"
        >
          <Crown className="w-10 h-10 text-primary" />
        </motion.div>
        <h1 className="text-2xl font-bold text-foreground mb-2">You're Premium!</h1>
        <p className="text-muted-foreground text-center mb-6">
          You're already enjoying all Premium benefits
        </p>
        <Button variant="outline" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="pt-safe">
        <div className="px-5 pt-4 pb-2">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center touch-feedback"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </header>

      <main className="px-6 py-4 pb-safe">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/20 mb-4">
            <Sparkles className="w-8 h-8 text-amber-500" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Go Premium</h1>
          <p className="text-muted-foreground text-lg">
            Get rewards 30% faster
          </p>
        </motion.div>

        {/* Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="p-6 rounded-2xl bg-card border border-border">
            <div className="flex items-center justify-between gap-4">
              {/* Free */}
              <div className="flex-1 text-center">
                <p className="text-sm text-muted-foreground mb-3">FREE</p>
                <div className="flex flex-wrap justify-center gap-1 mb-3">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 rounded-full border-2 border-dashed border-muted-foreground/30"
                    />
                  ))}
                </div>
                <p className="font-semibold text-foreground">10 stamps</p>
              </div>

              {/* Divider with lightning */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-px h-8 bg-border" />
                <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-amber-500" />
                </div>
                <p className="text-xs text-amber-500 font-medium">30% faster</p>
                <div className="w-px h-8 bg-border" />
              </div>

              {/* Premium */}
              <div className="flex-1 text-center">
                <p className="text-sm text-amber-500 font-medium mb-3 flex items-center justify-center gap-1">
                  <Crown className="w-3 h-3" />
                  PREMIUM
                </p>
                <div className="flex flex-wrap justify-center gap-1 mb-3">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 rounded-full bg-primary"
                    />
                  ))}
                </div>
                <p className="font-semibold text-foreground">7 stamps</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Premium Benefits
          </h2>
          <div className="space-y-3">
            {premiumBenefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="flex items-start gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <p className="text-foreground">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-6"
        >
          <div className="inline-block px-8 py-4 rounded-2xl bg-card border border-border">
            <p className="text-4xl font-bold text-foreground">$4.99</p>
            <p className="text-muted-foreground">per month</p>
            <p className="text-xs text-muted-foreground mt-1">Cancel anytime</p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          <Button
            className="w-full h-14 text-lg btn-primary"
            onClick={handleUpgrade}
          >
            <Crown className="w-5 h-5 mr-2" />
            Start 14-Day Free Trial
          </Button>
          <button className="w-full text-sm text-muted-foreground py-2">
            Restore Purchases
          </button>
        </motion.div>
      </main>
    </div>
  );
}
