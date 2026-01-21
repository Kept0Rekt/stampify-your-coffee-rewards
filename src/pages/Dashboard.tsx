import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { usePlan } from "@/hooks/usePlan";
import { BottomNav } from "@/components/ui/BottomNav";
import { Bell, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { PlanSelectionModal } from "@/components/PlanSelectionModal";
import { RewardCard } from "@/components/dashboard/RewardCard";
import { WalletCard } from "@/components/dashboard/WalletCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { StatsCard } from "@/components/dashboard/StatsCard";
import stampifyLogo from "@/assets/stampify-logo.png";

// Mock data for ready rewards
const mockRewards = [
  {
    id: "1",
    merchantName: "Pretty Patty",
    reward: "Free Pastry",
    emoji: "🥮",
    category: "Bakery",
  },
  {
    id: "2",
    merchantName: "Florentina",
    reward: "Free Bouquet",
    emoji: "💐",
    category: "Florist",
  },
  {
    id: "3",
    merchantName: "Brew House",
    reward: "Free Coffee",
    emoji: "☕",
    category: "Café",
  },
];

// Mock data for recent cards
const mockRecentCards = [
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
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const { plan, setPlan, hasSelectedPlan } = usePlan();
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

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

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
        <div className="px-6 pt-12 pb-4 flex items-start justify-between">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-muted-foreground text-sm mb-1">{getGreeting()}</p>
            <h1 className="heading-display text-3xl text-foreground">
              {firstName}
            </h1>
          </motion.div>

          {/* Header Actions */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <button 
              className="w-11 h-11 rounded-full flex items-center justify-center touch-feedback relative"
              style={{
                background: 'linear-gradient(145deg, hsl(165 25% 16%), hsl(165 25% 12%))',
                boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.05), 0 2px 8px rgba(0, 0, 0, 0.2)',
              }}
            >
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="w-11 h-11 rounded-full overflow-hidden touch-feedback ring-2 ring-primary/20"
              style={{
                background: 'linear-gradient(145deg, hsl(158 64% 52%), hsl(158 64% 40%))',
              }}
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
          className="space-y-7"
        >
          {/* Stats Overview */}
          <motion.section variants={itemVariants}>
            <StatsCard totalStamps={47} totalRewards={3} streak={12} />
          </motion.section>

          {/* Quick Actions */}
          <motion.section variants={itemVariants}>
            <QuickActions />
          </motion.section>

          {/* Ready Rewards */}
          {mockRewards.length > 0 && (
            <motion.section variants={itemVariants}>
              <div className="section-header">
                <h2 className="section-title flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Ready to Claim
                </h2>
                <button className="section-action flex items-center gap-1">
                  View all
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
                {mockRewards.map((reward, index) => (
                  <RewardCard
                    key={reward.id}
                    merchantName={reward.merchantName}
                    reward={reward.reward}
                    emoji={reward.emoji}
                    category={reward.category}
                    index={index}
                    onClick={() => navigate(`/card/${reward.id}`)}
                  />
                ))}
              </div>
            </motion.section>
          )}

          {/* Recent Cards */}
          <motion.section variants={itemVariants}>
            <div className="section-header">
              <h2 className="section-title">Your Cards</h2>
              <button 
                onClick={() => navigate("/wallet")}
                className="section-action flex items-center gap-1"
              >
                See all
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {mockRecentCards.map((card, index) => (
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
