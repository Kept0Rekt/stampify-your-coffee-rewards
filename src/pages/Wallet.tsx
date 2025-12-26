import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LoyaltyCard } from "@/components/ui/LoyaltyCard";
import { BottomNav } from "@/components/ui/BottomNav";
import { Button } from "@/components/ui/button";
import { Plus, QrCode, Loader2, Coffee } from "lucide-react";
import { motion } from "framer-motion";
import stampifyLogo from "@/assets/stampify-logo.png";

// Mock data for demo
const mockCards = [
  {
    id: "1",
    cafeName: "The Daily Grind",
    stampsCollected: 6,
    stampsRequired: 8,
  },
  {
    id: "2",
    cafeName: "Espresso House",
    stampsCollected: 8,
    stampsRequired: 8,
  },
  {
    id: "3",
    cafeName: "Artisan Roasters",
    stampsCollected: 2,
    stampsRequired: 8,
  },
];

export default function Wallet() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/auth", { replace: true });
    }
  }, [user, isLoading, navigate]);

  // Count rewards ready
  const rewardsReady = mockCards.filter(
    (card) => card.stampsCollected >= card.stampsRequired
  ).length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <img
          src={stampifyLogo}
          alt="Stampify"
          className="h-10 w-auto object-contain opacity-60 animate-pulse"
        />
        <Loader2 className="w-5 h-5 animate-spin text-primary/60" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="pt-safe">
        <div className="px-6 pt-8 pb-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex justify-center mb-8"
          >
            <img
              src={stampifyLogo}
              alt="Stampify"
              className="h-6 w-auto object-contain opacity-40"
            />
          </motion.div>

          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">
              Wallet
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {mockCards.length} café{mockCards.length !== 1 ? "s" : ""}
              {rewardsReady > 0 && (
                <span className="text-primary font-medium">
                  {" "}
                  · {rewardsReady} reward{rewardsReady !== 1 ? "s" : ""} ready
                </span>
              )}
            </p>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-5 pb-32">
        {/* Quick Stats - Only show if rewards ready */}
        {rewardsReady > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="mb-6 p-4 rounded-2xl bg-primary/5 border border-primary/10"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Coffee className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {rewardsReady} free coffee{rewardsReady !== 1 ? "s" : ""}{" "}
                  waiting
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Tap a card to claim your reward
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Loyalty Cards */}
        <div className="space-y-4">
          {mockCards.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl bg-[hsl(32,29%,87%)] p-10 text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/8 flex items-center justify-center mb-5">
                <QrCode className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-base font-medium text-foreground mb-1.5">
                No loyalty cards yet
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-[240px] mx-auto mb-6">
                Scan a café's QR code to start collecting stamps
              </p>
              <Button
                onClick={() => navigate("/scan")}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6"
              >
                <QrCode className="w-4 h-4 mr-2" />
                Scan QR Code
              </Button>
            </motion.div>
          ) : (
            <>
              {/* Section Label */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xs font-medium text-muted-foreground/60 uppercase tracking-wider px-1 mb-3"
              >
                Your Cards
              </motion.p>

              {mockCards.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.2 + index * 0.08,
                    duration: 0.4,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  <LoyaltyCard
                    cafeName={card.cafeName}
                    stampsCollected={card.stampsCollected}
                    stampsRequired={card.stampsRequired}
                    onClick={() => navigate(`/card/${card.id}`)}
                  />
                </motion.div>
              ))}
            </>
          )}
        </div>
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-28 right-5 z-20">
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
          <Button
            size="lg"
            className="rounded-full w-14 h-14 p-0 bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90"
            onClick={() => navigate("/scan")}
          >
            <Plus className="w-5 h-5" strokeWidth={2.5} />
          </Button>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
