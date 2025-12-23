import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LoyaltyCard } from "@/components/ui/LoyaltyCard";
import { StampifyLogo } from "@/components/ui/StampifyLogo";
import { BottomNav } from "@/components/ui/BottomNav";
import { Button } from "@/components/ui/button";
import { Plus, QrCode, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 header-glass">
        <div className="flex items-center justify-center py-5 px-4">
          <StampifyLogo size="sm" />
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-[1] px-5 pt-6 pb-32 space-y-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-1.5"
        >
          <h1 className="text-2xl font-medium text-foreground">Your Wallet</h1>
          <p className="text-muted-foreground text-sm">
            {mockCards.length} loyalty {mockCards.length === 1 ? "card" : "cards"}
          </p>
        </motion.div>

        {/* Loyalty Cards */}
        <div className="space-y-5">
          {mockCards.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-10 text-center space-y-6"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl gold-gradient flex items-center justify-center shadow-gold">
                <QrCode className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-foreground">
                  No loyalty cards yet
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                  Scan a café's QR code to add your first loyalty card and get a free welcome coffee!
                </p>
              </div>
              <Button className="btn-gold">
                <QrCode className="w-4 h-4 mr-2" />
                Scan QR Code
              </Button>
            </motion.div>
          ) : (
            mockCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              >
                <LoyaltyCard
                  cafeName={card.cafeName}
                  stampsCollected={card.stampsCollected}
                  stampsRequired={card.stampsRequired}
                  onClick={() => navigate(`/card/${card.id}`)}
                />
              </motion.div>
            ))
          )}
        </div>
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-28 right-5 z-20">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            size="lg"
            className="btn-gold rounded-full w-12 h-12 p-0"
            onClick={() => navigate("/scan")}
          >
            <Plus className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}