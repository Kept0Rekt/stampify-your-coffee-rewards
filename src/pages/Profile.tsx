import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { StampifyLogo } from "@/components/ui/StampifyLogo";
import { BottomNav } from "@/components/ui/BottomNav";
import { Button } from "@/components/ui/button";
import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";
import { Loader2, LogOut, ChevronRight, Crown, Bell, HelpCircle, Shield, History, Play } from "lucide-react";
import { motion } from "framer-motion";

export default function Profile() {
  const { user, isLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/auth", { replace: true });
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
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
    { icon: Crown, label: "Upgrade to Premium", description: "Earn free coffee faster", action: () => {}, highlight: true },
    { icon: History, label: "Activity History", description: "View your stamps & rewards", action: () => {} },
    { icon: Bell, label: "Notifications", description: "Manage your alerts", action: () => {} },
    { icon: Shield, label: "Privacy & Security", description: "Manage your data", action: () => {} },
    { icon: HelpCircle, label: "Help & Support", description: "Get assistance", action: () => {} },
    { icon: Play, label: "Preview Onboarding", description: "View the welcome animations", action: () => setShowOnboarding(true), highlight: false },
  ];

  // Show onboarding preview
  if (showOnboarding) {
    return <OnboardingFlow onComplete={() => setShowOnboarding(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center justify-between p-4">
          <StampifyLogo size="sm" />
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 pb-24 space-y-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-premium p-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center gold-glow">
              <span className="text-2xl font-bold text-primary-foreground">
                {user.email?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-card-foreground">
                {user.email?.split("@")[0] || "User"}
              </h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                  Free Plan
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
            <div className="text-center">
              <p className="text-2xl font-bold text-gold">3</p>
              <p className="text-xs text-muted-foreground">Cards</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gold">16</p>
              <p className="text-xs text-muted-foreground">Stamps</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gold">2</p>
              <p className="text-xs text-muted-foreground">Rewards</p>
            </div>
          </div>
        </motion.div>

        {/* Menu Items */}
        <div className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={item.action}
                className={`w-full card-premium p-4 flex items-center gap-4 text-left transition-all hover:scale-[1.02] ${
                  item.highlight ? "border-gold/30" : ""
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  item.highlight ? "gold-gradient gold-glow" : "bg-muted"
                }`}>
                  <Icon className={`w-5 h-5 ${item.highlight ? "text-primary-foreground" : "text-gold"}`} />
                </div>
                <div className="flex-1">
                  <h3 className={`font-medium ${item.highlight ? "text-gold" : "text-card-foreground"}`}>
                    {item.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </motion.button>
            );
          })}
        </div>

        {/* Sign Out */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            variant="outline"
            className="w-full"
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
