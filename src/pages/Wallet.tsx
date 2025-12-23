import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LoyaltyCard } from "@/components/ui/LoyaltyCard";
import { StampifyLogo } from "@/components/ui/StampifyLogo";
import { BottomNav } from "@/components/ui/BottomNav";
import { Button } from "@/components/ui/button";
import { Plus, QrCode } from "lucide-react";
import { Loader2 } from "lucide-react";
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
  const { user, isLoading, signOut } = useAuth();
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

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center justify-center p-4">
          <StampifyLogo size="sm" />
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 pb-24 space-y-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-1"
        >
          <h1 className="text-2xl font-bold text-foreground">Your Wallet</h1>
          <p className="text-muted-foreground">
            {mockCards.length} loyalty {mockCards.length === 1 ? "card" : "cards"}
          </p>
        </motion.div>

        {/* Loyalty Cards */}
        <div className="space-y-4">
          {mockCards.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card-premium p-8 text-center space-y-4"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl gold-gradient flex items-center justify-center gold-glow">
                <QrCode className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground">
                No loyalty cards yet
              </h3>
              <p className="text-muted-foreground">
                Scan a café's QR code to add your first loyalty card and get a free welcome coffee!
              </p>
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
                transition={{ delay: index * 0.1 }}
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
      <div className="fixed bottom-24 right-6">
        <Button
          size="lg"
          className="btn-gold rounded-full w-14 h-14 shadow-lg"
          onClick={() => navigate("/scan")}
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>

      <BottomNav />
    </div>
  );
}
