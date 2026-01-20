import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowUpRight, Bell, Coffee, Gift } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import stampifyLogo from "@/assets/stampify-logo.png";

// Mock card data
const mockCardData: Record<string, {
  merchantName: string;
  category: string;
  stampsCollected: number;
  stampsRequired: number;
  logoEmoji: string;
  barcodeId: string;
}> = {
  "1": {
    merchantName: "Coffee Fellow",
    category: "Food & Drinks",
    stampsCollected: 6,
    stampsRequired: 8,
    logoEmoji: "☕",
    barcodeId: "CF-2024-001",
  },
  "2": {
    merchantName: "Pretty Patty",
    category: "Bakery",
    stampsCollected: 8,
    stampsRequired: 8,
    logoEmoji: "🥮",
    barcodeId: "PP-2024-002",
  },
  "3": {
    merchantName: "Florentina",
    category: "Florist",
    stampsCollected: 4,
    stampsRequired: 6,
    logoEmoji: "💐",
    barcodeId: "FL-2024-003",
  },
};

export default function CardDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);

  const card = mockCardData[id || "1"] || mockCardData["1"];
  const isRewardReady = card.stampsCollected >= card.stampsRequired;

  // Calculate stamp grid layout (4 columns)
  const totalSlots = card.stampsRequired + 1; // +1 for reward slot
  const rows = Math.ceil(totalSlots / 4);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-emerald-dark/10" />

      {/* Header */}
      <header className="relative z-10 pt-safe">
        <div className="px-5 pt-4 pb-4 flex items-center justify-between">
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center touch-feedback"
          >
            <img src={stampifyLogo} alt="Stampify" className="w-5 h-5 object-contain" />
          </motion.button>

          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center touch-feedback">
              <Bell className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-light to-primary overflow-hidden touch-feedback">
              <div className="w-full h-full flex items-center justify-center text-primary-foreground font-semibold text-sm">
                E
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Card Content */}
      <main className="relative z-10 px-5 pt-4 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="merchant-card p-6"
        >
          {/* Merchant Info */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-2xl">
                {card.logoEmoji}
              </div>
              <div>
                <h2 className="font-semibold text-foreground text-lg">
                  {card.merchantName}
                </h2>
                <p className="text-sm text-muted-foreground">{card.category}</p>
              </div>
            </div>
            <button className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center touch-feedback">
              <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Stamps Grid */}
          <div className="grid grid-cols-4 gap-3 mb-8">
            {Array.from({ length: card.stampsRequired }).map((_, index) => {
              const isCollected = index < card.stampsCollected;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    "aspect-square rounded-full flex items-center justify-center",
                    isCollected ? "stamp-filled" : "stamp-empty"
                  )}
                >
                  {isCollected && (
                    <Coffee className="w-6 h-6 text-foreground" />
                  )}
                </motion.div>
              );
            })}
            
            {/* Reward Slot */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: card.stampsRequired * 0.05 }}
              className={cn(
                "aspect-square rounded-full flex items-center justify-center",
                isRewardReady ? "stamp-filled bg-primary" : "stamp-reward"
              )}
            >
              <Gift className={cn(
                "w-6 h-6",
                isRewardReady ? "text-primary-foreground" : "text-primary"
              )} />
            </motion.div>
          </div>

          {/* Barcode Section */}
          <div className="barcode-container">
            {/* Simulated barcode */}
            <div className="flex justify-center items-end gap-[2px] h-12 mb-2">
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-900"
                  style={{
                    width: Math.random() > 0.5 ? 2 : 1,
                    height: `${60 + Math.random() * 40}%`,
                  }}
                />
              ))}
            </div>
            <p className="text-center text-xs text-gray-500 font-medium">
              Show this code to the staff
            </p>
          </div>
        </motion.div>

        {/* Page Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {[0, 1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-200",
                currentPage === page
                  ? "bg-primary w-6"
                  : "bg-muted-foreground/30"
              )}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
