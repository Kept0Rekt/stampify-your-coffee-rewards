import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { BottomNav } from "@/components/ui/BottomNav";
import { Loader2, MapPin, Coffee, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import stampifyLogo from "@/assets/stampify-logo.png";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const nearbyCafes = [
  { name: "The Daily Grind", distance: "0.3 km", stamps: 8 },
  { name: "Espresso House", distance: "0.5 km", stamps: 8 },
  { name: "Artisan Roasters", distance: "0.8 km", stamps: 8 },
  { name: "Bean & Brew", distance: "1.2 km", stamps: 10 },
];

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
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-5">
        <img src={stampifyLogo} alt="Stampify" className="h-8 w-auto object-contain opacity-50 animate-pulse-soft" />
        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
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
        <div className="px-6 pt-10 pb-2">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h1 className="text-3xl font-semibold text-foreground tracking-tight">
              Discover
            </h1>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-5 pt-4 pb-32">
        {/* Location indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex items-center gap-2 text-muted-foreground mb-6"
        >
          <MapPin className="w-4 h-4" />
          <span className="text-sm">San Francisco, CA</span>
        </motion.div>

        {/* Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="latte-card aspect-[16/10] flex flex-col items-center justify-center gap-4 p-6 mb-8"
        >
          <div className="w-14 h-14 rounded-2xl bg-primary/8 flex items-center justify-center">
            <MapPin className="w-6 h-6 text-primary" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground">
              Map coming soon
            </h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-[240px]">
              We're adding an interactive map to help you find cafés nearby
            </p>
          </div>
        </motion.div>

        {/* Nearby Cafés List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={itemVariants} className="section-header">
            Nearby
          </motion.p>

          <div className="space-y-2">
            {nearbyCafes.map((cafe) => (
              <motion.button
                key={cafe.name}
                variants={itemVariants}
                whileTap={{ scale: 0.98 }}
                className="w-full latte-card p-4 flex items-center gap-4 text-left"
              >
                <div className="w-11 h-11 rounded-[12px] bg-primary/8 flex items-center justify-center flex-shrink-0">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground text-base truncate">
                    {cafe.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {cafe.stamps} stamps · Free coffee
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-sm font-medium text-primary">
                    {cafe.distance}
                  </span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground/40" />
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </main>

      <BottomNav />
    </div>
  );
}
