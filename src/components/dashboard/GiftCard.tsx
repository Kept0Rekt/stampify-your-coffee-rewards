import { motion } from "framer-motion";

interface GiftCardProps {
  merchantName: string;
  reward: string;
  imageEmoji: string;
  onClick?: () => void;
}

export function GiftCard({ merchantName, reward, imageEmoji, onClick }: GiftCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="flex-shrink-0 w-36 gift-card p-4 text-left touch-feedback"
    >
      {/* Emoji/Image */}
      <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center text-4xl">
        {imageEmoji}
      </div>
      
      {/* Content */}
      <div className="text-center">
        <p className="text-sm font-semibold text-foreground truncate">
          {reward}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5 truncate">
          {merchantName}
        </p>
      </div>
    </motion.button>
  );
}
