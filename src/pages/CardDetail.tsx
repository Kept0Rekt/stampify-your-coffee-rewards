import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Bell, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { usePlan } from "@/hooks/usePlan";
import { BusinessHeader } from "@/components/card/BusinessHeader";
import { StampGrid } from "@/components/wallet/StampGrid";
import { StampProgressBar } from "@/components/wallet/StampProgressBar";
import { StampHistory } from "@/components/card/StampHistory";
import { RewardUnlocked } from "@/components/card/RewardUnlocked";
import { PremiumUpsell } from "@/components/card/PremiumUpsell";

// Mock card data with full details
const mockCardData: Record<string, {
  businessName: string;
  category: string;
  address: string;
  phone: string;
  currentStamps: number;
  logoEmoji: string;
  brandColor: string;
  rewardName: string;
  rewardValue: number;
  latitude: number;
  longitude: number;
  history: Array<{
    id: string;
    stampsAdded: number;
    multiplierType?: "normal" | "tuesday_double" | "birthday_triple";
    createdAt: Date;
  }>;
}> = {
  "1": {
    businessName: "Classic Cuts",
    category: "Barbershop",
    address: "123 Main Street",
    phone: "555-0101",
    currentStamps: 6,
    logoEmoji: "💈",
    brandColor: "#34D399",
    rewardName: "Free Haircut",
    rewardValue: 30,
    latitude: 40.7128,
    longitude: -74.006,
    history: [
      { id: "h1", stampsAdded: 1, multiplierType: "normal", createdAt: new Date("2024-01-15T14:30:00") },
      { id: "h2", stampsAdded: 2, multiplierType: "tuesday_double", createdAt: new Date("2024-01-09T11:00:00") },
      { id: "h3", stampsAdded: 1, multiplierType: "normal", createdAt: new Date("2024-01-02T16:45:00") },
      { id: "h4", stampsAdded: 1, multiplierType: "normal", createdAt: new Date("2023-12-28T10:15:00") },
      { id: "h5", stampsAdded: 1, multiplierType: "normal", createdAt: new Date("2023-12-20T13:30:00") },
    ],
  },
  "2": {
    businessName: "Style Studio",
    category: "Hair Salon",
    address: "456 Oak Avenue",
    phone: "555-0102",
    currentStamps: 4,
    logoEmoji: "✂️",
    brandColor: "#60A5FA",
    rewardName: "Free Styling",
    rewardValue: 25,
    latitude: 40.7138,
    longitude: -74.007,
    history: [
      { id: "h1", stampsAdded: 1, multiplierType: "normal", createdAt: new Date("2024-01-10T15:00:00") },
      { id: "h2", stampsAdded: 1, multiplierType: "normal", createdAt: new Date("2024-01-03T12:30:00") },
      { id: "h3", stampsAdded: 2, multiplierType: "tuesday_double", createdAt: new Date("2023-12-26T14:00:00") },
    ],
  },
  "3": {
    businessName: "The Grooming Lounge",
    category: "Barbershop",
    address: "789 Elm Boulevard",
    phone: "555-0103",
    currentStamps: 10,
    logoEmoji: "🪒",
    brandColor: "#F59E0B",
    rewardName: "Free Hot Shave",
    rewardValue: 35,
    latitude: 40.7148,
    longitude: -74.008,
    history: [
      { id: "h1", stampsAdded: 1, multiplierType: "normal", createdAt: new Date("2024-01-14T09:00:00") },
      { id: "h2", stampsAdded: 1, multiplierType: "normal", createdAt: new Date("2024-01-07T11:30:00") },
      { id: "h3", stampsAdded: 3, multiplierType: "birthday_triple", createdAt: new Date("2024-01-01T10:00:00") },
      { id: "h4", stampsAdded: 2, multiplierType: "tuesday_double", createdAt: new Date("2023-12-19T14:00:00") },
      { id: "h5", stampsAdded: 1, multiplierType: "normal", createdAt: new Date("2023-12-12T16:30:00") },
      { id: "h6", stampsAdded: 1, multiplierType: "normal", createdAt: new Date("2023-12-05T10:45:00") },
      { id: "h7", stampsAdded: 1, multiplierType: "normal", createdAt: new Date("2023-11-28T15:00:00") },
    ],
  },
};

export default function CardDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { plan, stampsRequired } = usePlan();
  
  const card = mockCardData[id || "1"] || mockCardData["1"];
  const isRewardReady = card.currentStamps >= stampsRequired;
  const remaining = Math.max(stampsRequired - card.currentStamps, 0);

  // Generate a redemption code
  const redemptionCode = `${card.businessName.substring(0, 2).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="pt-safe sticky top-0 z-20 bg-background/80 backdrop-blur-lg">
        <div className="px-5 pt-4 pb-4 flex items-center justify-between">
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center touch-feedback"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </motion.button>

          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center touch-feedback">
              <Share2 className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center touch-feedback">
              <Bell className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-5 pb-8 space-y-6">
        {/* Business Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <BusinessHeader
            name={card.businessName}
            category={card.category}
            address={card.address}
            phone={card.phone}
            logoEmoji={card.logoEmoji}
            brandColor={card.brandColor}
            latitude={card.latitude}
            longitude={card.longitude}
          />
        </motion.div>

        {/* Reward Unlocked State */}
        {isRewardReady ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <RewardUnlocked
              rewardName={card.rewardName}
              rewardValue={card.rewardValue}
              redemptionCode={redemptionCode}
              expiresAt={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
              onRedeem={() => console.log("Redeem clicked")}
            />
          </motion.div>
        ) : (
          <>
            {/* Progress Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-5 rounded-2xl bg-card border border-border"
            >
              <h3 className="font-semibold text-foreground mb-4">Your Progress</h3>
              
              {/* Stamp Grid */}
              <div className="mb-4">
                <StampGrid
                  currentStamps={card.currentStamps}
                  stampsRequired={stampsRequired}
                  size="lg"
                  showLabels={false}
                />
              </div>

              {/* Progress Bar */}
              <StampProgressBar
                currentStamps={card.currentStamps}
                stampsRequired={stampsRequired}
                size="md"
              />

              {/* Reward Info */}
              <div className="mt-4 pt-4 border-t border-border/50">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{remaining}</span> more stamp{remaining !== 1 ? "s" : ""} for:
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-2xl">🎁</span>
                  <div>
                    <p className="font-semibold text-foreground">{card.rewardName}</p>
                    <p className="text-sm text-muted-foreground">
                      (${card.rewardValue.toFixed(2)} value)
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Premium Upsell (for free users) */}
            {plan === "free" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <PremiumUpsell
                  currentRequired={10}
                  premiumRequired={7}
                />
              </motion.div>
            )}
          </>
        )}

        {/* Stamp History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-5 rounded-2xl bg-card border border-border"
        >
          <StampHistory entries={card.history} />
        </motion.div>
      </main>
    </div>
  );
}
