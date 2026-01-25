import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { usePlan } from "@/hooks/usePlan";
import { BottomNav } from "@/components/ui/BottomNav";
import { Button } from "@/components/ui/button";
import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";
import { 
  Loader2, LogOut, ChevronRight, Crown, Bell, 
  HelpCircle, Shield, History, Play, CreditCard, BarChart3
} from "lucide-react";
import { motion } from "framer-motion";
import stampifyLogo from "@/assets/stampify-logo.png";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function Profile() {
  const { user, isLoading, signOut } = useAuth();
  const { plan, stampsRequired } = usePlan();
  const navigate = useNavigate();
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/auth", { replace: true });
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-5">
        <img src={stampifyLogo} alt="Stampify" className="h-8 w-auto object-contain opacity-50 animate-pulse-soft" />
        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  const menuItems = [
    { 
      icon: Crown, 
      label: plan === "premium" ? "Manage Subscription" : "Upgrade to Premium", 
      description: plan === "premium" ? "View your plan details" : "Get rewards 30% faster", 
      highlight: plan !== "premium",
      action: () => navigate("/premium"),
    },
    { icon: History, label: "Activity", description: "View your stamp history" },
    { icon: Bell, label: "Notifications", description: "Manage alerts" },
    { icon: Shield, label: "Privacy", description: "Manage your data" },
    { icon: HelpCircle, label: "Help", description: "Get support" },
    { icon: Play, label: "Onboarding", description: "View welcome tour", action: () => setShowOnboarding(true) },
  ];

  // Mock stats
  const stats = {
    totalCards: 5,
    rewardsEarned: 3,
    totalStamps: 27,
    memberSince: "Jan 2024",
  };

  if (showOnboarding) {
    return <OnboardingFlow onComplete={() => setShowOnboarding(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="pt-safe">
        <div className="px-6 pt-10 pb-2">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h1 className="text-3xl font-semibold text-foreground tracking-tight">
              Profile
            </h1>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-5 pt-4 pb-32">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="latte-card p-5 mb-4 rounded-2xl bg-card border border-border"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xl font-semibold text-primary">
                {user.email?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold text-foreground truncate">
                {user.email?.split("@")[0] || "User"}
              </h2>
              <p className="text-sm text-muted-foreground truncate">{user.email}</p>
            </div>
          </div>
        </motion.div>

        {/* Plan Status Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="p-5 mb-4 rounded-2xl bg-card border border-border"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {plan === "premium" && <Crown className="w-5 h-5 text-amber-500" />}
              <span className="font-semibold text-foreground">
                {plan === "premium" ? "Premium Plan" : "Free Plan"}
              </span>
            </div>
            {plan === "premium" && (
              <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                Active
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            {stampsRequired} stamps to unlock rewards
          </p>
          <Button
            variant={plan === "premium" ? "outline" : "default"}
            className={`w-full ${plan === "free" ? "btn-primary" : ""}`}
            onClick={() => navigate("/premium")}
          >
            {plan === "premium" ? (
              <>
                <CreditCard className="w-4 h-4 mr-2" />
                Manage Subscription
              </>
            ) : (
              <>
                <Crown className="w-4 h-4 mr-2" />
                Upgrade to Premium
              </>
            )}
          </Button>
        </motion.div>

        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="p-5 mb-6 rounded-2xl bg-card border border-border"
        >
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-muted-foreground" />
            <span className="font-semibold text-foreground">Your Stats</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: stats.totalCards, label: "Loyalty Cards" },
              { value: stats.rewardsEarned, label: "Rewards Earned" },
              { value: stats.totalStamps, label: "Total Stamps" },
              { value: stats.memberSince, label: "Member Since" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-3 rounded-xl bg-muted/30">
                <p className="text-xl font-semibold text-primary tabular-nums">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Menu Items */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-2"
        >
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.label}
                variants={itemVariants}
                whileTap={{ scale: 0.98 }}
                onClick={item.action}
                className={`w-full p-4 rounded-2xl bg-card border border-border flex items-center gap-4 text-left ${
                  item.highlight ? "ring-1 ring-primary/15" : ""
                }`}
              >
                <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center ${
                  item.highlight ? "bg-primary/10" : "bg-muted/50"
                }`}>
                  <Icon className={`w-[18px] h-[18px] ${
                    item.highlight ? "text-primary" : "text-muted-foreground"
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-medium text-base ${
                    item.highlight ? "text-primary" : "text-foreground"
                  }`}>
                    {item.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground/40 flex-shrink-0" />
              </motion.button>
            );
          })}
        </motion.div>

        {/* Sign Out */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <Button
            variant="ghost"
            className="w-full h-12 text-muted-foreground hover:text-foreground hover:bg-muted/40 rounded-xl"
            onClick={handleSignOut}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </motion.div>
      </main>

      <BottomNav />
    </div>
  );
}
