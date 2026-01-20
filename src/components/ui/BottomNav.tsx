import { useLocation, useNavigate } from "react-router-dom";
import { Home, Wallet, Search, QrCode } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { path: "/dashboard", label: "Home", icon: Home },
  { path: "/wallet", label: "Wallet", icon: Wallet },
  { path: "/map", label: "Search", icon: Search },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2">
        {/* Main nav pill */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="nav-pill flex items-center px-2 py-2"
        >
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.1 }}
                className={cn(
                  "relative flex items-center justify-center w-12 h-10 rounded-full transition-colors duration-200",
                  isActive 
                    ? "bg-secondary text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2 : 1.5} />
              </motion.button>
            );
          })}
        </motion.div>

        {/* QR Scan Button */}
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => navigate("/scan")}
          className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-emerald"
        >
          <QrCode className="w-6 h-6" strokeWidth={2} />
        </motion.button>
      </div>

      {/* Safe area */}
      <div className="h-safe pb-safe" />
    </nav>
  );
}
