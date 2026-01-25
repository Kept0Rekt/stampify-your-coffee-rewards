import { format } from "date-fns";
import { Stamp, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";

interface StampEntry {
  id: string;
  stampsAdded: number;
  multiplierType?: "normal" | "tuesday_double" | "birthday_triple";
  createdAt: Date;
}

interface StampHistoryProps {
  entries: StampEntry[];
  maxVisible?: number;
}

const multiplierLabels = {
  normal: null,
  tuesday_double: "2× Tuesday",
  birthday_triple: "3× Birthday",
};

export function StampHistory({ entries, maxVisible = 5 }: StampHistoryProps) {
  const visibleEntries = entries.slice(0, maxVisible);
  const hasMore = entries.length > maxVisible;

  if (entries.length === 0) {
    return (
      <div className="text-center py-8">
        <Stamp className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
        <p className="text-muted-foreground">No stamps yet</p>
        <p className="text-sm text-muted-foreground/70">
          Visit the business to earn your first stamp!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-muted-foreground" />
          Stamp History
        </h3>
        {hasMore && (
          <button className="text-sm text-primary font-medium">
            View all
          </button>
        )}
      </div>

      <div className="space-y-2">
        {visibleEntries.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between p-3 rounded-xl bg-muted/30"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Stamp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">
                  {format(entry.createdAt, "MMM d, yyyy")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {format(entry.createdAt, "h:mm a")}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="font-semibold text-primary">
                +{entry.stampsAdded}
              </p>
              {entry.multiplierType && multiplierLabels[entry.multiplierType] && (
                <p className="text-xs text-amber-500 font-medium">
                  {multiplierLabels[entry.multiplierType]}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
