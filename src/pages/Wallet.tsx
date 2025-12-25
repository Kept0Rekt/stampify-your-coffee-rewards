import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LoyaltyCard } from "@/components/ui/LoyaltyCard";
import { StampifyLogo } from "@/components/ui/StampifyLogo";
import { BottomNav } from "@/components/ui/BottomNav";
import { Button } from "@/components/ui/button";
import { Plus, QrCode, Loader2 } from "lucide-react";
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <img src={stampifyLogo} alt="Stampify" className="h-10 w-auto object-contain opacity-60 animate-pulse" />
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
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
        <div className="flex items-center justify-center py-4 px-5">
          <StampifyLogo size="sm" variant="latte" />
        </div>
      </header>

      {/* Main Content */}
      <main className="px-5 pt-6 pb-32">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-6"
        >
          <h1 className="text-xl font-semibold text-foreground">Your Wallet</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {mockCards.length} loyalty {mockCards.length === 1 ? "card" : "cards"}
          </p>
        </motion.div>

        {/* Loyalty Cards */}
        <div className="space-y-4">
          {mockCards.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="latte-card p-8 text-center space-y-5"
            >
              <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center">
                <QrCode className="w-6 h-6 text-primary" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-medium text-foreground">
                  No loyalty cards yet
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                  Scan a café's QR code to add your first loyalty card
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
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.08, 
                  duration: 0.35, 
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
      <div className="fixed bottom-24 right-5 z-20">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          <Button
            size="lg"
            className="btn-gold rounded-full w-12 h-12 p-0 shadow-gold"
            onClick={() => navigate("/scan")}
          >
            <Plus className="w-5 h-5" strokeWidth={2} />
          </Button>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}