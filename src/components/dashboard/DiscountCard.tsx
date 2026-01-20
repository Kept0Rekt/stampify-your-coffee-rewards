import { motion } from "framer-motion";
import { QrCode } from "lucide-react";

interface DiscountCardProps {
  merchantName: string;
  discount: string;
  description: string;
  onClick?: () => void;
}

export function DiscountCard({ merchantName, discount, description, onClick }: DiscountCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="w-full discount-ticket p-5 text-left touch-feedback"
    >
      <div className="relative z-10 flex items-center justify-between">
        {/* Left side - Content */}
        <div className="flex-1">
          <p className="text-white font-semibold text-base mb-2">
            {merchantName}
          </p>
          <div className="inline-block bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-lg mb-2">
            <span className="text-white font-bold text-lg tabular-nums">
              {discount}
            </span>
          </div>
          <p className="text-white/80 text-sm">
            {description}
          </p>
        </div>

        {/* Right side - QR Code placeholder */}
        <div className="w-20 h-20 bg-black/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20">
          <div className="w-16 h-16 bg-white/90 rounded p-1.5">
            <div className="w-full h-full grid grid-cols-4 gap-0.5">
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className={`bg-gray-900 rounded-sm ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-0'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
