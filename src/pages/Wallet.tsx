import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { usePlan } from "@/hooks/usePlan";
import { LoyaltyCard } from "@/components/ui/LoyaltyCard";
import { BottomNav } from "@/components/ui/BottomNav";
import { Button } from "@/components/ui/button";
import { Plus, QrCode, Loader2, Gift, Crown, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { PlanSelectionModal } from "@/components/PlanSelectionModal";
import stampifyLogo from "@/assets/stampify-logo.png";

// Mock data for demo with coordinates
const mockCards = [
  {
    id: "1",
    cafeName: "The Daily Grind",
    stampsCollected: 6,
    stampsRequired: 8,
    latitude: 40.7128,
    longitude: -74.006,
  },
  {
    id: "2",
    cafeName: "Espresso House",
    stampsCollected: 8,
    stampsRequired: 8,
    latitude: 40.7580,
    longitude: -73.9855,
  },
  {
    id: "3",
    cafeName: "Artisan Roasters",
    stampsCollected: 2,
    stampsRequired: 8,
    latitude: 40.7484,
    longitude: -73.9857,
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
  const { plan, setPlan, hasSelectedPlan, cardLimit, isCardLimitReached } = usePlan();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/auth", { replace: true });
    }
  }, [user, isLoading, navigate]);

  const rewardsReady = mockCards.filter(
    (card) => card.stampsCollected >= card.stampsRequired
  ).length;

  // Show plan selection modal if user hasn't selected a plan yet
  const showPlanModal = user && !hasSelectedPlan;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-5">
        <img
          src={stampifyLogo}
          alt="Stampify"
          className="h-8 w-auto object-contain opacity-50 animate-pulse-soft"
        />
        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Cards to display based on plan limit
  const displayedCards = plan === "free" ? mockCards.slice(0, cardLimit) : mockCards;
  const lockedCards = plan === "free" ? mockCards.slice(cardLimit) : [];

  return (
    <div className="min-h-screen bg-background">
      {/* Plan Selection Modal */}
      <PlanSelectionModal
        isOpen={showPlanModal}
        onSelectPlan={setPlan}
      />

      {/* Header */}
      <header className="pt-safe">
        <div className="px-6 pt-10 pb-2 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h1 className="text-3xl font-semibold text-foreground tracking-tight">
              Wallet
            </h1>
          </motion.div>
          
          {/* Plan Badge */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            onClick={() => {/* Could open upgrade modal */}}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
              plan === "premium" 
                ? "gold-gradient text-primary-foreground" 
                : "bg-muted text-muted-foreground"
            }`}
          >
            {plan === "premium" && <Crown className="w-3 h-3" />}
            {plan === "premium" ? "Premium" : "Free"}
          </motion.button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-5 pt-4 pb-32">
        {/* Rewards Banner */}
        {rewardsReady > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-6 p-4 rounded-2xl bg-primary/8 border border-primary/12"
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-[14px] bg-primary/12 flex items-center justify-center">
                <Gift className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-base font-medium text-foreground">
                  {rewardsReady} reward{rewardsReady !== 1 ? "s" : ""} ready
                </p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Tap to claim your free coffee
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Cards Section */}
        {mockCards.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="latte-card p-12 text-center"
          >
            <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/8 flex items-center justify-center mb-5">
              <QrCode className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No cards yet
            </h3>
            <p className="text-muted-foreground text-sm max-w-[220px] mx-auto mb-6">
              Scan a QR code at a café to start collecting stamps
            </p>
            <Button
              onClick={() => navigate("/scan")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 h-11 font-medium shadow-gold"
            >
              <QrCode className="w-4 h-4 mr-2" />
              Scan QR Code
            </Button>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            <motion.p variants={itemVariants} className="section-header">
              {displayedCards.length} Card{displayedCards.length !== 1 ? "s" : ""}
              {plan === "free" && ` of ${cardLimit}`}
            </motion.p>

            {displayedCards.map((card) => (
              <motion.div key={card.id} variants={itemVariants}>
                <LoyaltyCard
                  cafeName={card.cafeName}
                  stampsCollected={card.stampsCollected}
                  stampsRequired={card.stampsRequired}
                  latitude={card.latitude}
                  longitude={card.longitude}
                />
              </motion.div>
            ))}

            {/* Locked cards for free users */}
            {lockedCards.length > 0 && (
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

                {lockedCards.map((card) => (
                  <motion.div 
                    key={card.id} 
                    variants={itemVariants}
                    className="relative"
                  >
                    <div className="opacity-40 pointer-events-none blur-[1px]">
                      <LoyaltyCard
                        cafeName={card.cafeName}
                        stampsCollected={card.stampsCollected}
                        stampsRequired={card.stampsRequired}
                        latitude={card.latitude}
                        longitude={card.longitude}
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button
                        size="sm"
                        className="btn-gold shadow-lg"
                        onClick={() => {/* Open upgrade modal */}}
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
        )}
      </main>

      {/* Floating Action Button */}
      <motion.div 
        className="fixed bottom-24 right-5 z-20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => navigate("/scan")}
          className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-float"
        >
          <Plus className="w-6 h-6" strokeWidth={2} />
        </motion.button>
      </motion.div>

      <BottomNav />
    </div>
  );
}
