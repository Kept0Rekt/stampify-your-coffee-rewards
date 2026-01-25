import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface RecentVisit {
  id: string;
  businessName: string;
  logoEmoji: string;
  currentStamps: number;
  stampsRequired: number;
  lastVisit: string;
}

interface RecentVisitsProps {
  visits: RecentVisit[];
}

export function RecentVisits({ visits }: RecentVisitsProps) {
  const navigate = useNavigate();

  if (visits.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Recently Visited</h3>
        <button 
          onClick={() => navigate("/wallet")}
          className="text-sm text-primary font-medium flex items-center gap-1"
        >
          All
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2">
        {visits.map((visit, index) => (
          <motion.button
            key={visit.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/card/${visit.id}`)}
            className="w-full flex items-center gap-3 p-3 rounded-xl bg-card border border-border/50 text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center text-xl">
              {visit.logoEmoji}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground truncate">
                {visit.businessName}
              </h4>
              <p className="text-xs text-muted-foreground">{visit.lastVisit}</p>
            </div>

            <div className="flex items-center gap-2">
              {/* Mini stamp indicators */}
              <div className="flex items-center gap-0.5">
                {Array.from({ length: Math.min(visit.currentStamps, 5) }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-primary"
                  />
                ))}
                {visit.currentStamps > 5 && (
                  <span className="text-xs text-muted-foreground ml-0.5">
                    +{visit.currentStamps - 5}
                  </span>
                )}
              </div>
              
              <span className="text-xs text-muted-foreground font-medium tabular-nums">
                {visit.currentStamps}/{visit.stampsRequired}
              </span>
              
              <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
