import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { usePlan } from "@/hooks/usePlan";
import { BottomNav } from "@/components/ui/BottomNav";
import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";
import {
  Loader2, ArrowLeft, Pencil, ChevronRight, Award,
  History, Bell, Lock, HelpCircle, RotateCcw,
} from "lucide-react";
import { motion } from "framer-motion";
import stampifyLogo from "@/assets/stampify-logo.png";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

interface MenuItem {
  icon: typeof Award;
  label: string;
  action?: () => void;
}

export default function Profile() {
  const { user, isLoading, signOut } = useAuth();
  const { plan } = usePlan();
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

  if (!user) return null;

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  const displayName = user.user_metadata?.full_name || user.email?.split("@")[0] || "User";
  const initial = displayName.charAt(0).toUpperCase();
  const planLabel = plan === "premium" ? "Premium Plan" : "Free Plan";

  const accountItems: MenuItem[] = [
    { icon: History, label: "Activity" },
    { icon: Bell, label: "Notifications" },
    { icon: Lock, label: "Privacy" },
  ];

  const supportItems: MenuItem[] = [
    { icon: HelpCircle, label: "Help" },
    { icon: RotateCcw, label: "Replay Onboarding", action: () => setShowOnboarding(true) },
  ];

  if (showOnboarding) {
    return <OnboardingFlow onComplete={() => setShowOnboarding(false)} />;
  }

  const stats = [
    { value: "4", label: "Cards" },
    { value: "28", label: "Stamps" },
    { value: "2", label: "Rewards" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header — editorial: back arrow left, title centered */}
      <header className="pt-safe">
        <div className="px-5 pt-4 pb-2 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            aria-label="Back"
            className="w-10 h-10 -ml-2 flex items-center justify-center text-primary touch-feedback rounded-full"
          >
            <ArrowLeft className="w-6 h-6" strokeWidth={2.25} />
          </button>
          <h1 className="text-[17px] font-semibold text-foreground tracking-tight">
            Profile
          </h1>
          <div className="w-10 h-10" aria-hidden />
        </div>
      </header>

      <main className="px-5 pt-6 pb-32">
        {/* Avatar + identity block */}
        <motion.section
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col items-center text-center"
        >
          <div className="relative">
            <div className="w-[140px] h-[140px] rounded-full bg-muted/60 flex items-center justify-center">
              <span className="text-[64px] font-semibold text-primary leading-none">
                {initial}
              </span>
            </div>
            <button
              aria-label="Edit profile"
              className="absolute bottom-1 right-1 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-soft touch-feedback"
            >
              <Pencil className="w-[18px] h-[18px]" strokeWidth={2.25} />
            </button>
          </div>

          <h2 className="mt-5 text-[26px] font-semibold text-foreground tracking-tight">
            {displayName}
          </h2>
          <p className="mt-1 text-[15px] text-foreground/70">
            {user.email}
          </p>

          <div className="mt-3 inline-flex items-center px-4 py-1.5 rounded-full bg-muted/60">
            <span className="text-[13px] font-medium text-foreground/80">
              {planLabel}
            </span>
          </div>
        </motion.section>

        {/* Stats pill card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-7 rounded-full bg-card shadow-soft px-2 py-5"
        >
          <div className="grid grid-cols-3">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`text-center px-2 ${
                  i < stats.length - 1 ? "border-r border-border/40" : ""
                }`}
              >
                <p className="text-[28px] font-semibold text-primary tabular-nums leading-none">
                  {stat.value}
                </p>
                <p className="mt-2 text-[11px] font-semibold text-foreground/60 uppercase tracking-[0.12em]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upgrade — featured */}
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          whileTap={{ scale: 0.985 }}
          className="mt-6 w-full rounded-3xl bg-primary/10 px-4 py-4 flex items-center gap-3 text-left touch-feedback"
        >
          <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center shrink-0">
            <Award className="w-5 h-5 text-primary-foreground" strokeWidth={2.25} />
          </div>
          <span className="flex-1 text-[17px] font-semibold text-foreground">
            Upgrade to Premium
          </span>
          <ChevronRight className="w-5 h-5 text-primary/70 shrink-0" />
        </motion.button>

        {/* Account group */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-4 rounded-3xl bg-card shadow-soft overflow-hidden"
        >
          {accountItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.label}
                variants={itemVariants}
                onClick={item.action}
                whileTap={{ scale: 0.99 }}
                className={`w-full px-4 py-4 flex items-center gap-3 text-left touch-feedback ${
                  i < accountItems.length - 1 ? "border-b border-border/30" : ""
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-muted/60 flex items-center justify-center shrink-0">
                  <Icon className="w-[18px] h-[18px] text-foreground/70" strokeWidth={2} />
                </div>
                <span className="flex-1 text-[17px] font-medium text-foreground">
                  {item.label}
                </span>
                <ChevronRight className="w-5 h-5 text-foreground/30 shrink-0" />
              </motion.button>
            );
          })}
        </motion.section>

        {/* Support group */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-4 rounded-3xl bg-card shadow-soft overflow-hidden"
        >
          {supportItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.label}
                variants={itemVariants}
                onClick={item.action}
                whileTap={{ scale: 0.99 }}
                className={`w-full px-4 py-4 flex items-center gap-3 text-left touch-feedback ${
                  i < supportItems.length - 1 ? "border-b border-border/30" : ""
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-muted/60 flex items-center justify-center shrink-0">
                  <Icon className="w-[18px] h-[18px] text-foreground/70" strokeWidth={2} />
                </div>
                <span className="flex-1 text-[17px] font-medium text-foreground">
                  {item.label}
                </span>
                <ChevronRight className="w-5 h-5 text-foreground/30 shrink-0" />
              </motion.button>
            );
          })}
        </motion.section>

        {/* Sign out */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-8 flex justify-center"
        >
          <button
            onClick={handleSignOut}
            className="text-destructive font-semibold text-[17px] py-2 px-4 touch-feedback"
          >
            Sign Out
          </button>
        </motion.div>

        {/* Version */}
        <p className="mt-6 text-center text-[12px] text-foreground/40">
          Version 1.0
        </p>
      </main>

      <BottomNav />
    </div>
  );
}
