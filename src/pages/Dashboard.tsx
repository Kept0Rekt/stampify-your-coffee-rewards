import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { usePlan } from "@/hooks/usePlan";
import { BottomNav } from "@/components/ui/BottomNav";
import { Bell, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { PlanSelectionModal } from "@/components/PlanSelectionModal";
import { GiftCard } from "@/components/dashboard/GiftCard";
import { DiscountCard } from "@/components/dashboard/DiscountCard";
import { WalletCard } from "@/components/dashboard/WalletCard";
import stampifyLogo from "@/assets/stampify-logo.png";

// Mock data for gifts (rewards ready to claim)
const mockGifts = [
  {
    id: "1",
    merchantName: "Pretty Patty",
    reward: "Free pastry",
    imageEmoji: "🥮",
    category: "Bakery",
  },
  {
    id: "2",
    merchantName: "Florentina",
    reward: "Free bouquet",
    imageEmoji: "💐",
    category: "Florist",
  },
  {
    id: "3",
    merchantName: "Brew House",
    reward: "Free coffee",
    imageEmoji: "☕",
    category: "Café",
  },
];

// Mock data for discounts
const mockDiscounts = [
  {
    id: "1",
    merchantName: "Snazzy Scissors",
    discount: "-15%",
    description: "Off Your Next Visit",
    category: "Salon",
  },
];

// Mock data for wallet cards
const mockWalletCards = [
  {
    id: "1",
    merchantName: "Snazzy Scissors",
    category: "Hair Salon",
    stamps: 7,
    totalStamps: 8,
    emoji: "✂️",
  },
  {
    id: "2",
    merchantName: "FitZone Gym",
    category: "Fitness",
    stamps: 5,
    totalStamps: 10,
    emoji: "💪",
  },
  {
    id: "3",
    merchantName: "Sparkle Wash",
    category: "Car Wash",
    stamps: 3,
    totalStamps: 6,
    emoji: "🚗",
  },
  {
    id: "4",
    merchantName: "Brew House",
    category: "Café",
    stamps: 8,
    totalStamps: 8,
    emoji: "☕",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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

export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const { setPlan, hasSelectedPlan } = usePlan();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/auth", { replace: true });
    }
  }, [user, isLoading, navigate]);

  const showPlanModal = user && !hasSelectedPlan;

  // Get user's first name for greeting
  const firstName =
    user?.user_metadata?.full_name?.split(" ")[0] ||
    user?.email?.split("@")[0] ||
    "there";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-5">
        <img
          src={stampifyLogo}
          alt="Stampify"
          className="h-8 w-auto object-contain opacity-50 animate-pulse"
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
        <div className="px-6 pt-12 pb-6 flex items-start justify-between">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h1 className="heading-display text-3xl text-foreground">
              Hey, {firstName}
            </h1>
            <p className="text-muted-foreground mt-1">
              Let's earn more stamps!
            </p>
          </motion.div>

          {/* Header Actions */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center touch-feedback">
              <Bell className="w-5 h-5 text-muted-foreground" />
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-light to-primary overflow-hidden touch-feedback"
            >
              {user?.user_metadata?.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-primary-foreground font-semibold text-sm">
                  {firstName[0]?.toUpperCase()}
                </div>
              )}
            </button>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-5 pb-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* My Gifts Section */}
          {mockGifts.length > 0 && (
            <motion.section variants={itemVariants}>
              <div className="section-header">
                <h2 className="section-title">My Gifts</h2>
                <button className="section-action flex items-center gap-1">
                  View all
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
                {mockGifts.map((gift) => (
                  <GiftCard
                    key={gift.id}
                    merchantName={gift.merchantName}
                    reward={gift.reward}
                    imageEmoji={gift.imageEmoji}
                    onClick={() => navigate(`/card/${gift.id}`)}
                  />
                ))}
              </div>
            </motion.section>
          )}

          {/* Discounts Section */}
          {mockDiscounts.length > 0 && (
            <motion.section variants={itemVariants}>
              <div className="section-header">
                <h2 className="section-title">Discounts</h2>
                <button className="section-action flex items-center gap-1">
                  View all
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {mockDiscounts.map((discount) => (
                  <DiscountCard
                    key={discount.id}
                    merchantName={discount.merchantName}
                    discount={discount.discount}
                    description={discount.description}
                  />
                ))}
              </div>
            </motion.section>
          )}

          {/* My Wallet Section - Primary Focus */}
          <motion.section variants={itemVariants}>
            <div className="section-header">
              <h2 className="section-title text-xl">My Wallet</h2>
              <button
                onClick={() => navigate("/wallet")}
                className="section-action flex items-center gap-1"
              >
                See all
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {mockWalletCards.map((card, index) => (
                <WalletCard
                  key={card.id}
                  merchantName={card.merchantName}
                  category={card.category}
                  stamps={card.stamps}
                  totalStamps={card.totalStamps}
                  emoji={card.emoji}
                  index={index}
                  onClick={() => navigate(`/card/${card.id}`)}
                />
              ))}
            </div>
          </motion.section>
        </motion.div>
      </main>

      <BottomNav />
    </div>
  );
}
