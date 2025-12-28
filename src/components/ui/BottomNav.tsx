import { useLocation, useNavigate } from "react-router-dom";
import { Wallet, Map, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { path: "/wallet", label: "Wallet", icon: Wallet },
  { path: "/map", label: "Discover", icon: Map },
  { path: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 nav-latte">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
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
                "flex flex-col items-center gap-1 py-2 px-6 rounded-2xl transition-colors duration-200",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <div className="relative">
                <Icon
                  className={cn(
                    "w-[22px] h-[22px] transition-all duration-200",
                  )}
                  strokeWidth={isActive ? 2 : 1.5}
                />
                {isActive && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                    transition={{ 
                      type: "spring", 
                      stiffness: 500, 
                      damping: 35 
                    }}
                  />
                )}
              </div>
              <span className={cn(
                "text-[10px] font-medium transition-colors duration-200",
                isActive ? "text-primary" : "text-muted-foreground"
              )}>
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
      {/* Safe area for iOS */}
      <div className="h-safe pb-safe" />
    </nav>
  );
}
