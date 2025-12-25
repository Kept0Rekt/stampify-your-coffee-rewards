import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { StampifyLogo } from "@/components/ui/StampifyLogo";
import { BottomNav } from "@/components/ui/BottomNav";
import { Loader2, MapPin, Coffee } from "lucide-react";
import { motion } from "framer-motion";
import stampifyLogo from "@/assets/stampify-logo.png";

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
        <div className="flex items-center justify-between p-4">
          <StampifyLogo size="sm" variant="latte" />
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Nearby</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 pb-28 space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-1"
        >
          <h1 className="text-xl font-semibold text-foreground">Discover Cafés</h1>
          <p className="text-muted-foreground text-sm">
            Find Stampify partner cafés near you
          </p>
        </motion.div>

        {/* Placeholder Map Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="latte-card aspect-[4/3] flex flex-col items-center justify-center gap-4 p-6"
        >
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
            <Coffee className="w-6 h-6 text-primary" />
          </div>
          <div className="text-center space-y-1.5">
            <h3 className="text-base font-semibold text-foreground">
              Map Coming Soon
            </h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              We're adding nearby café discovery to help you find Stampify partners in your area.
            </p>
          </div>
        </motion.div>

        {/* Mock Café List */}
        <div className="space-y-2">
          <h2 className="text-base font-semibold text-foreground">Popular Nearby</h2>
          {[
            { name: "The Daily Grind", distance: "0.3 km", stamps: "8 stamps" },
            { name: "Espresso House", distance: "0.5 km", stamps: "8 stamps" },
            { name: "Artisan Roasters", distance: "0.8 km", stamps: "8 stamps" },
          ].map((cafe, index) => (
            <motion.div
              key={cafe.name}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              className="latte-card p-4 flex items-center gap-3.5"
            >
              <div className="w-10 h-10 rounded-lg bg-muted/60 flex items-center justify-center">
                <Coffee className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground text-[15px]">{cafe.name}</h3>
                <p className="text-sm text-muted-foreground">{cafe.stamps} = free coffee</p>
              </div>
              <div className="text-right">
                <span className="text-sm text-primary font-medium">{cafe.distance}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
