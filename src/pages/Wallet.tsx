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
      <header className="sticky top-0 z-10 header-latte">
        <div className="flex items-center justify-center py-5 px-5">
          <StampifyLogo size="sm" variant="latte" />
        </div>
      </header>

      {/* Main Content */}
      <main className="px-5 pt-8 pb-36">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-semibold text-foreground">Your Wallet</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {mockCards.length} loyalty {mockCards.length === 1 ? "card" : "cards"}
          </p>
        </motion.div>

        {/* Loyalty Cards */}
        <div className="space-y-6">
          {mockCards.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="latte-card p-10 text-center space-y-6"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl caramel-gradient flex items-center justify-center shadow-gold">
                <QrCode className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-foreground">
                  No loyalty cards yet
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                  Scan a café's QR code to add your first loyalty card
                </p>
              </div>
              <Button className="btn-caramel">
                <QrCode className="w-4 h-4 mr-2" />
                Scan QR Code
              </Button>
            </motion.div>
          ) : (
            mockCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.4, 
                  ease: [0.4, 0, 0.2, 1] 
                }}
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
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <Button
            size="lg"
            className="btn-caramel rounded-full w-14 h-14 p-0 shadow-lg"
            onClick={() => navigate("/scan")}
          >
            <Plus className="w-6 h-6" strokeWidth={2.5} />
          </Button>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}