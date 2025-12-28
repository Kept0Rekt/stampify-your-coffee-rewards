import { motion } from "framer-motion";
import { Check, Crown, Coffee } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlanSelectionAnimationProps {
  onSelectPlan: (plan: "free" | "premium") => void;
}

const freeBenefits = [
  "8 stamps for a free coffee",
  "Digital loyalty cards",
  "NFC tap to collect",
  "QR code scanning",
];

const premiumBenefits = [
  "Only 6 stamps for a free coffee",
  "Priority rewards",
  "Exclusive promotions",
  "Early access to new cafés",
  "Premium badge on profile",
];

export function PlanSelectionAnimation({ onSelectPlan }: PlanSelectionAnimationProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-6 pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
      
      {/* Cards container */}
      <div className="relative z-10 w-full max-w-lg grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Free Plan Card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          <motion.button
            onClick={() => onSelectPlan("free")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "w-full text-left rounded-2xl border-2 border-border bg-card/80 backdrop-blur-sm",
              "p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-lg",
              "focus:outline-none focus:ring-2 focus:ring-primary/30"
            )}
          >
            {/* Header with glass effect */}
            <div className="relative mb-4 pb-4 border-b border-border/50">
              <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-muted/30 to-transparent -mx-5 -mt-5 rounded-t-2xl" />
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Coffee className="w-5 h-5 text-muted-foreground" />
                  <span className="font-semibold text-foreground">Free</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                  Basic
                </span>
              </div>
              
              {/* Price */}
              <div className="mt-3">
                <span className="text-3xl font-bold text-foreground">$0</span>
                <span className="text-sm text-muted-foreground ml-1">/forever</span>
              </div>
            </div>
            
            {/* Benefits list */}
            <ul className="space-y-2.5">
              {freeBenefits.map((benefit, index) => (
                <motion.li
                  key={benefit}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span>{benefit}</span>
                </motion.li>
              ))}
            </ul>
            
            {/* Select button */}
            <div className="mt-5 py-2.5 rounded-xl bg-muted text-center font-medium text-foreground transition-colors hover:bg-muted/80">
              Select Free
            </div>
          </motion.button>
        </motion.div>

        {/* Premium Plan Card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          {/* Popular badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full gold-gradient text-primary-foreground text-xs font-semibold shadow-lg"
          >
            Most Popular
          </motion.div>
          
          <motion.button
            onClick={() => onSelectPlan("premium")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "w-full text-left rounded-2xl border-2 border-primary/50 bg-card/80 backdrop-blur-sm",
              "p-5 transition-all duration-300 hover:border-primary hover:shadow-xl hover:shadow-primary/10",
              "focus:outline-none focus:ring-2 focus:ring-primary/30",
              "ring-1 ring-primary/20"
            )}
          >
            {/* Header with gold glass effect */}
            <div className="relative mb-4 pb-4 border-b border-primary/20">
              <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-primary/10 to-transparent -mx-5 -mt-5 rounded-t-2xl" />
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground">Premium</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium gold-gradient text-primary-foreground">
                  Pro
                </span>
              </div>
              
              {/* Price */}
              <div className="mt-3">
                <span className="text-3xl font-bold text-foreground">$4.99</span>
                <span className="text-sm text-muted-foreground ml-1">/month</span>
              </div>
            </div>
            
            {/* Benefits list */}
            <ul className="space-y-2.5">
              {premiumBenefits.map((benefit, index) => (
                <motion.li
                  key={benefit}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="flex items-start gap-2 text-sm text-foreground"
                >
                  <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span>{benefit}</span>
                </motion.li>
              ))}
            </ul>
            
            {/* Select button */}
            <div className="mt-5 py-2.5 rounded-xl btn-gold text-center font-medium shadow-md">
              Select Premium
            </div>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
