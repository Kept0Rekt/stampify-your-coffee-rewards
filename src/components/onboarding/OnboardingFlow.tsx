import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StampifyLogo } from "@/components/ui/StampifyLogo";
import { cn } from "@/lib/utils";
import { DigitalCardsAnimation } from "./animations/DigitalCardsAnimation";
import { NFCTapAnimation } from "./animations/NFCTapAnimation";
import { QRScanAnimation } from "./animations/QRScanAnimation";
import { FreeCoffeeAnimation } from "./animations/FreeCoffeeAnimation";
import { PrivacyAnimation } from "./animations/PrivacyAnimation";

interface OnboardingScreen {
  animation: React.ReactNode;
  title: string;
  description: string;
  highlight?: string;
}

const screens: OnboardingScreen[] = [
  {
    animation: <DigitalCardsAnimation />,
    title: "Digital Loyalty Cards",
    description: "Replace all your paper loyalty cards with beautiful digital ones. Never lose a stamp again!",
    highlight: "Get Started Free",
  },
  {
    animation: <NFCTapAnimation />,
    title: "Tap to Earn Stamps",
    description: "Simply tap your phone on the café's NFC reader to collect stamps instantly. No scanning needed!",
    highlight: "Start Collecting Now",
  },
  {
    animation: <QRScanAnimation />,
    title: "Join New Cafés",
    description: "Scan any QR code to join and get a free welcome stamp!",
    highlight: "Free coffee on signup",
  },
  {
    animation: <FreeCoffeeAnimation />,
    title: "Earn Rewards Faster",
    description: "Premium members need only 6 stamps—2 fewer than the free plan!",
    highlight: "Upgrade to Premium",
  },
  {
    animation: <PrivacyAnimation />,
    title: "Privacy & Permissions",
    description: "We need camera access for QR scanning and NFC for collecting stamps. Your data stays private and secure.",
    highlight: "Your data is safe",
  },
];

// Full-screen slide variants with parallax
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

// Text content with slight delay for depth
const textVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 80 : -80,
    opacity: 0,
  }),
};

interface OnboardingFlowProps {
  onComplete: () => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [[currentIndex, direction], setPage] = useState([0, 0]);
  const isLastScreen = currentIndex === screens.length - 1;
  const isFirstScreen = currentIndex === 0;

  const paginate = useCallback((newDirection: number) => {
    if (newDirection > 0 && currentIndex < screens.length - 1) {
      setPage([currentIndex + 1, newDirection]);
    } else if (newDirection < 0 && currentIndex > 0) {
      setPage([currentIndex - 1, newDirection]);
    }
  }, [currentIndex]);

  const handleNext = () => {
    if (isLastScreen) {
      onComplete();
    } else {
      paginate(1);
    }
  };

  const handleBack = () => {
    if (!isFirstScreen) {
      paginate(-1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const goToScreen = (index: number) => {
    const newDirection = index > currentIndex ? 1 : -1;
    setPage([index, newDirection]);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-hidden relative">
      {/* Header - Fixed at top with transparency */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <StampifyLogo size="sm" />
        {!isLastScreen && (
          <Button
            variant="ghost"
            onClick={handleSkip}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Skip
          </Button>
        )}
      </motion.div>

      {/* Full-screen Animation Area */}
      <div className="flex-1 relative">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 350, damping: 35, duration: 0.45 },
              opacity: { duration: 0.25 },
            }}
            className="absolute inset-0"
          >
            {screens[currentIndex].animation}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Content Area - Text anchored at bottom */}
      <div className="relative z-20 bg-gradient-to-t from-background via-background to-transparent pt-16 pb-6">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={`text-${currentIndex}`}
            custom={direction}
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.35,
              delay: 0.1,
            }}
            className="px-6 text-center"
          >
            {/* Title */}
            <h1 className="text-2xl font-bold text-foreground mb-3">
              {screens[currentIndex].title}
            </h1>

            {/* Description */}
            <p className="text-muted-foreground mb-4 leading-relaxed max-w-sm mx-auto">
              {screens[currentIndex].description}
            </p>

            {/* Highlight Badge */}
            {screens[currentIndex].highlight && (
              <motion.div
                className="inline-block gold-gradient text-primary-foreground text-sm font-semibold px-5 py-2 rounded-full shadow-lg"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {screens[currentIndex].highlight}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-6 mb-4">
          {screens.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToScreen(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "gold-gradient"
                  : "bg-muted hover:bg-muted-foreground/30"
              )}
              animate={{
                width: index === currentIndex ? 28 : 8,
                opacity: index === currentIndex ? 1 : 0.4,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
              }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between px-6 gap-4">
          <motion.div
            className="flex-1"
            initial={false}
            animate={{ opacity: isFirstScreen ? 0 : 1 }}
          >
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={isFirstScreen}
              className={cn(
                "w-full transition-all duration-200 border-border bg-muted/50 text-foreground hover:bg-muted",
                isFirstScreen && "invisible"
              )}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </motion.div>

          <motion.div 
            className="flex-1" 
            whileTap={{ scale: 0.97 }}
          >
            <Button
              onClick={handleNext}
              className="w-full btn-gold relative overflow-hidden group shadow-lg"
            >
              {/* Glow effect on tap */}
              <motion.span
                className="absolute inset-0 bg-white/20 rounded-md"
                initial={{ scale: 0, opacity: 0 }}
                whileTap={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative z-10 flex items-center justify-center font-semibold">
                {isLastScreen ? "Get Started" : "Next"}
                {!isLastScreen && <ChevronRight className="w-4 h-4 ml-2" />}
              </span>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
