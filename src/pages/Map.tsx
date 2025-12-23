import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { StampifyLogo } from "@/components/ui/StampifyLogo";
import { BottomNav } from "@/components/ui/BottomNav";
import { Loader2, MapPin, Coffee } from "lucide-react";
import { motion } from "framer-motion";

export default function MapPage() {
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
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center justify-between p-4">
          <StampifyLogo size="sm" />
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Nearby</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 pb-24 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-1"
        >
          <h1 className="text-2xl font-bold text-foreground">Discover Cafés</h1>
          <p className="text-muted-foreground">
            Find Stampify partner cafés near you
          </p>
        </motion.div>

        {/* Placeholder Map Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card-premium aspect-[4/3] flex flex-col items-center justify-center gap-4"
        >
          <div className="w-16 h-16 rounded-2xl gold-gradient flex items-center justify-center gold-glow">
            <Coffee className="w-8 h-8 text-primary-foreground" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-card-foreground">
              Map Coming Soon
            </h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              We're adding nearby café discovery to help you find Stampify partners in your area.
            </p>
          </div>
        </motion.div>

        {/* Mock Café List */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Popular Nearby</h2>
          {[
            { name: "The Daily Grind", distance: "0.3 km", stamps: "8 stamps" },
            { name: "Espresso House", distance: "0.5 km", stamps: "8 stamps" },
            { name: "Artisan Roasters", distance: "0.8 km", stamps: "8 stamps" },
          ].map((cafe, index) => (
            <motion.div
              key={cafe.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card-premium p-4 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                <Coffee className="w-6 h-6 text-gold" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-card-foreground">{cafe.name}</h3>
                <p className="text-sm text-muted-foreground">{cafe.stamps} = free coffee</p>
              </div>
              <div className="text-right">
                <span className="text-sm text-gold font-medium">{cafe.distance}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
