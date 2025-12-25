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
    <nav className="fixed bottom-0 left-0 right-0 z-50 nav-latte">
      <div className="flex items-center justify-around py-3 px-6 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center gap-1 px-5 py-2 rounded-xl transition-all duration-200",
                isActive && "text-primary",
                !isActive && "text-muted-foreground hover:text-foreground"
              )}
            >
              <motion.div
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Icon
                  className="w-5 h-5 transition-all duration-200"
                  strokeWidth={isActive ? 2 : 1.5}
                />
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute -inset-2.5 rounded-xl -z-10 bg-primary/8"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.12, duration: 0.4 }}
                  />
                )}
              </motion.div>
              <span className={cn(
                "text-[11px] font-medium transition-all duration-200",
                isActive && "text-primary"
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
