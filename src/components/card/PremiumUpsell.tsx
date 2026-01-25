import { motion } from "framer-motion";
import { Crown, Zap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PremiumUpsellProps {
  currentRequired: number;
  premiumRequired: number;
}

export function PremiumUpsell({ currentRequired, premiumRequired }: PremiumUpsellProps) {
  const navigate = useNavigate();
  const savingsPercent = Math.round(((currentRequired - premiumRequired) / currentRequired) * 100);

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate("/premium")}
      className="w-full p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 text-left"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
          <Crown className="w-5 h-5 text-amber-500" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-foreground">Go Premium</h4>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-500 text-xs font-medium">
              {savingsPercent}% faster
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground mt-1">
            Get rewards with only {premiumRequired} stamps instead of {currentRequired}
          </p>
          
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1">
              {/* Free circles */}
              {Array.from({ length: currentRequired }).map((_, i) => (
                <div
                  key={`free-${i}`}
                  className="w-2 h-2 rounded-full bg-muted-foreground/30"
                />
              ))}
            </div>
            
            <Zap className="w-4 h-4 text-amber-500" />
            
            <div className="flex items-center gap-1">
              {/* Premium circles */}
              {Array.from({ length: premiumRequired }).map((_, i) => (
                <div
                  key={`premium-${i}`}
                  className="w-2.5 h-2.5 rounded-full bg-primary"
                />
              ))}
            </div>
          </div>
        </div>
        
        <ArrowRight className="w-5 h-5 text-muted-foreground mt-1" />
      </div>
    </motion.button>
  );
}
