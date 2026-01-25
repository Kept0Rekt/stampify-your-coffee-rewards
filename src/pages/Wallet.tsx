import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { usePlan } from "@/hooks/usePlan";
import { BottomNav } from "@/components/ui/BottomNav";
import { StackedCard } from "@/components/wallet/StackedCard";
import { Crown, Lock, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PlanSelectionModal } from "@/components/PlanSelectionModal";
import { Button } from "@/components/ui/button";
import stampifyLogo from "@/assets/stampify-logo.png";

// Mock data with salon/barbershop businesses
const mockCards = [
  {
    id: "1",
    businessName: "Classic Cuts",
    category: "Barbershop",
    logoEmoji: "💈",
    brandColor: "#34D399",
    currentStamps: 6,
    stampsRequired: 10,
    lastVisit: "2 days ago",
    distance: "0.3 mi",
    rewardName: "Free Haircut",
  },
  {
    id: "2",
    businessName: "Style Studio",
    category: "Hair Salon",
    logoEmoji: "✂️",
    brandColor: "#60A5FA",
    currentStamps: 4,
    stampsRequired: 10,
    lastVisit: "1 week ago",
    distance: "0.8 mi",
    rewardName: "Free Styling",
  },
  {
    id: "3",
    businessName: "The Grooming Lounge",
    category: "Barbershop",
    logoEmoji: "🪒",
    brandColor: "#F59E0B",
    currentStamps: 10,
    stampsRequired: 10,
    lastVisit: "Yesterday",
    distance: "1.2 mi",
    rewardName: "Free Hot Shave",
  },
  {
    id: "4",
    businessName: "Bella Nails",
    category: "Nail Salon",
    logoEmoji: "💅",
    brandColor: "#EC4899",
    currentStamps: 3,
    stampsRequired: 10,
    lastVisit: "3 days ago",
    distance: "0.5 mi",
    rewardName: "Free Manicure",
  },
  {
    id: "5",
    businessName: "Zen Spa",
    category: "Spa",
    logoEmoji: "🧖",
    brandColor: "#8B5CF6",
    currentStamps: 7,
    stampsRequired: 10,
    lastVisit: "5 days ago",
    distance: "2.1 mi",
    rewardName: "Free Massage",
  },
];

export default function Wallet() {
  const { user, isLoading } = useAuth();
  const { plan, setPlan, hasSelectedPlan, stampsRequired } = usePlan();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/auth", { replace: true });
    }
  }, [user, isLoading, navigate]);

  const showPlanModal = user && !hasSelectedPlan;

  // Update stamps required based on plan
  const cards = mockCards.map(card => ({
    ...card,
    stampsRequired: stampsRequired,
  }));

  // For free users, limit visible cards
  const visibleCards = plan === "free" ? cards.slice(0, 3) : cards;
  const hiddenCount = plan === "free" ? cards.length - 3 : 0;

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

  // Calculate total height needed for stacked cards
  const stackedHeight = isExpanded 
    ? visibleCards.length * 220 
    : Math.min(visibleCards.length, 3) * 56 + 200;

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
              My Wallet
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {visibleCards.length} card{visibleCards.length !== 1 ? "s" : ""}
              {hiddenCount > 0 && ` • ${hiddenCount} locked`}
            </p>
          </motion.div>

          {/* Plan Badge */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            onClick={() => navigate("/premium")}
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

      {/* Main Content - Apple Wallet Style */}
      <main className="px-5 pt-2 pb-32">
        {/* Stacked Cards Container */}
        <motion.div 
          className="relative"
          style={{ height: stackedHeight }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <AnimatePresence>
            {visibleCards.slice(0, isExpanded ? visibleCards.length : 3).map((card, index) => (
              <StackedCard
                key={card.id}
                id={card.id}
                businessName={card.businessName}
                category={card.category}
                logoEmoji={card.logoEmoji}
                brandColor={card.brandColor}
                currentStamps={card.currentStamps}
                stampsRequired={card.stampsRequired}
                lastVisit={card.lastVisit}
                distance={card.distance}
                isPremium={plan === "premium"}
                index={index}
                isExpanded={isExpanded}
                onClick={() => navigate(`/card/${card.id}`)}
              />
            ))}
          </AnimatePresence>

          {/* Hidden cards indicator */}
          {!isExpanded && visibleCards.length > 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute bottom-0 left-0 right-0 text-center py-2"
              style={{ transform: "translateY(20px)" }}
            >
              <p className="text-sm text-muted-foreground">
                +{visibleCards.length - 3} more cards
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Expand/Collapse hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-muted-foreground mt-8"
        >
          {isExpanded ? "Tap to collapse" : "Tap to expand all cards"}
        </motion.p>

        {/* Locked Cards Section (Free users) */}
        {plan === "free" && hiddenCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Lock className="w-3 h-3" />
                {hiddenCount} cards locked
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <Button
              className="w-full btn-primary"
              onClick={() => navigate("/premium")}
            >
              <Crown className="w-4 h-4 mr-2" />
              Upgrade to Unlock All Cards
            </Button>
          </motion.div>
        )}

        {/* Add Card Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6"
        >
          <Button
            variant="outline"
            className="w-full rounded-xl h-12"
            onClick={() => navigate("/scan")}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Card
          </Button>
        </motion.div>
      </main>

      <BottomNav />
    </div>
  );
}
