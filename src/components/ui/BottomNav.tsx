import { useLocation, useNavigate } from "react-router-dom";
import { Wallet, Map, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { path: "/wallet", label: "Wallet", icon: Wallet },
  { path: "/map", label: "Map", icon: Map },
  { path: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 nav-glass">
      <div className="flex items-center justify-around py-3 px-4 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center gap-1.5 px-6 py-2 rounded-2xl transition-all duration-300",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <motion.div
                whileTap={{ scale: 0.92 }}
                className="relative"
              >
                <Icon
                  className={cn(
                    "w-6 h-6 transition-all duration-300",
                    isActive && "text-primary"
                  )}
                  strokeWidth={isActive ? 2.5 : 1.75}
                />
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute -inset-3 glass-subtle rounded-2xl -z-10"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
              </motion.div>
              <span className={cn(
                "text-xs font-medium transition-all duration-300",
                isActive ? "text-primary" : "text-muted-foreground"
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
      {/* Safe area padding for iOS */}
      <div className="h-safe-area-inset-bottom" />
    </nav>
  );
}
