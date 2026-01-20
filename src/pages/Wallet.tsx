import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { usePlan } from "@/hooks/usePlan";
import { BottomNav } from "@/components/ui/BottomNav";
import { MerchantRow } from "@/components/wallet/MerchantRow";
import { Crown, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { PlanSelectionModal } from "@/components/PlanSelectionModal";
import { Button } from "@/components/ui/button";
import stampifyLogo from "@/assets/stampify-logo.png";

// Mock data with multiple business types
const mockMerchants = [
  {
    id: "1",
    name: "Coffee Fellow",
    category: "Food & Drinks",
    stampsCollected: 6,
    stampsRequired: 8,
    logoEmoji: "☕",
    latitude: 40.7128,
    longitude: -74.006,
  },
  {
    id: "2",
    name: "Snazzy Scissors",
    category: "Salon",
    stampsCollected: 3,
    stampsRequired: 5,
    logoEmoji: "✂️",
    latitude: 40.758,
    longitude: -73.9855,
  },
  {
    id: "3",
    name: "FitZone Gym",
    category: "Fitness",
    stampsCollected: 10,
    stampsRequired: 10,
    logoEmoji: "💪",
    latitude: 40.7484,
    longitude: -73.9857,
  },
  {
    id: "4",
    name: "Sparkle Car Wash",
    category: "Auto Services",
    stampsCollected: 2,
    stampsRequired: 6,
    logoEmoji: "🚗",
    latitude: 40.7614,
    longitude: -73.9776,
  },
  {
    id: "5",
    name: "Florentina",
    category: "Florist",
    stampsCollected: 4,
    stampsRequired: 6,
    logoEmoji: "💐",
    latitude: 40.7549,
    longitude: -73.984,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function Wallet() {
  const { user, isLoading } = useAuth();
  const { plan, setPlan, hasSelectedPlan, cardLimit } = usePlan();
  const navigate = useNavigate();
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/auth", { replace: true });
    }
  }, [user, isLoading, navigate]);

  const showPlanModal = user && !hasSelectedPlan;

  // Cards to display based on plan limit
  const displayedMerchants = plan === "free" ? mockMerchants.slice(0, cardLimit) : mockMerchants;
  const lockedMerchants = plan === "free" ? mockMerchants.slice(cardLimit) : [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-5">
        <img
          src={stampifyLogo}
          alt="Stampify"
          className="h-8 w-auto object-contain opacity-50 animate-pulse-soft"
        />
        <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Plan Selection Modal */}
      <PlanSelectionModal isOpen={showPlanModal} onSelectPlan={setPlan} />

      {/* Header */}
      <header className="pt-safe">
        <div className="px-6 pt-12 pb-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">
              My Cards
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {displayedMerchants.length} merchant{displayedMerchants.length !== 1 ? "s" : ""}
              {plan === "free" && ` • ${cardLimit - displayedMerchants.length} slots left`}
            </p>
          </motion.div>

          {/* Plan Badge */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            onClick={() => navigate("/profile")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
              plan === "premium"
                ? "emerald-gradient text-primary-foreground"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            {plan === "premium" && <Crown className="w-3 h-3" />}
            {plan === "premium" ? "Premium" : "Free"}
          </motion.button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-5 pt-2 pb-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          {displayedMerchants.map((merchant) => (
            <motion.div key={merchant.id} variants={itemVariants}>
              <MerchantRow
                id={merchant.id}
                name={merchant.name}
                category={merchant.category}
                stampsCollected={merchant.stampsCollected}
                stampsRequired={merchant.stampsRequired}
                logoEmoji={merchant.logoEmoji}
                isExpanded={expandedCardId === merchant.id}
                onToggle={() =>
                  setExpandedCardId((prev) =>
                    prev === merchant.id ? null : merchant.id
                  )
                }
                onViewDetails={() => navigate(`/card/${merchant.id}`)}
              />
            </motion.div>
          ))}

          {/* Locked merchants for free users */}
          {lockedMerchants.length > 0 && (
            <>
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3 pt-4"
              >
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Lock className="w-3 h-3" />
                  Upgrade to unlock
                </span>
                <div className="flex-1 h-px bg-border" />
              </motion.div>

              {lockedMerchants.map((merchant) => (
                <motion.div
                  key={merchant.id}
                  variants={itemVariants}
                  className="relative"
                >
                  <div className="opacity-40 pointer-events-none blur-[1px]">
                    <MerchantRow
                      id={merchant.id}
                      name={merchant.name}
                      category={merchant.category}
                      stampsCollected={merchant.stampsCollected}
                      stampsRequired={merchant.stampsRequired}
                      logoEmoji={merchant.logoEmoji}
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      size="sm"
                      className="btn-primary shadow-lg"
                      onClick={() => navigate("/profile")}
                    >
                      <Crown className="w-4 h-4 mr-1.5" />
                      Upgrade to Premium
                    </Button>
                  </div>
                </motion.div>
              ))}
            </>
          )}
        </motion.div>
      </main>

      <BottomNav />
    </div>
  );
}
