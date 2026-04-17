import { motion, AnimatePresence } from "framer-motion";
import { Check, Crown, Coffee, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlanSelectionModalProps {
  isOpen: boolean;
  onSelectPlan: (plan: "free" | "premium") => void;
  onClose?: () => void;
  showClose?: boolean;
}

const freeBenefits = [
  "Up to 3 café loyalty cards",
  "10 stamps for a free coffee",
  "Digital loyalty cards",
  "NFC tap to collect",
];

const premiumBenefits = [
  "Unlimited café loyalty cards",
  "Only 7 stamps for a free coffee",
  "Priority rewards",
  "Exclusive promotions",
  "Early access to new cafés",
];

export function PlanSelectionModal({ isOpen, onSelectPlan, onClose, showClose = false }: PlanSelectionModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-lg"
          >
            {/* Header */}
            <div className="text-center mb-6">
              {showClose && onClose && (
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              )}
              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl font-bold text-foreground"
              >
                Choose Your Plan
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="text-muted-foreground mt-2"
              >
                Select the plan that works best for you
              </motion.p>
            </div>

            {/* Cards container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Free Plan Card */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
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
                  {/* Header */}
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
                        transition={{ delay: 0.3 + index * 0.05 }}
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
                transition={{ duration: 0.5, delay: 0.3 }}
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
                  {/* Header */}
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
                        transition={{ delay: 0.4 + index * 0.05 }}
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
