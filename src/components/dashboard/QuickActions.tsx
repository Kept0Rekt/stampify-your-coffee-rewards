import { motion } from "framer-motion";
import { QrCode, CreditCard, MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const actions = [
  { icon: QrCode, label: "Scan", path: "/scan", primary: true },
  { icon: CreditCard, label: "Cards", path: "/wallet" },
  { icon: MapPin, label: "Nearby", path: "/map" },
  { icon: Star, label: "Rewards", path: "/wallet" },
];

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between gap-3">
      {actions.map((action, index) => (
        <motion.button
          key={action.label}
          onClick={() => navigate(action.path)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 + 0.2, duration: 0.3 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className={`flex-1 flex flex-col items-center gap-2 py-4 rounded-2xl transition-all ${
            action.primary
              ? 'bg-primary text-primary-foreground shadow-lg'
              : 'bg-secondary/50 text-foreground hover:bg-secondary'
          }`}
          style={action.primary ? { boxShadow: '0 4px 20px hsl(158 64% 52% / 0.4)' } : {}}
        >
          <action.icon className={`w-6 h-6 ${action.primary ? '' : 'text-muted-foreground'}`} />
          <span className="text-xs font-medium">{action.label}</span>
        </motion.button>
      ))}
    </div>
  );
}
