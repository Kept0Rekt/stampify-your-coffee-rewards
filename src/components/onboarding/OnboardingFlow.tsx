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
    highlight: "One app, all your cafés",
  },
  {
    animation: <NFCTapAnimation />,
    title: "Tap to Earn Stamps",
    description: "Simply tap your phone on the café's NFC reader to collect stamps instantly. No scanning needed!",
    highlight: "Just tap & go",
  },
  {
    animation: <QRScanAnimation />,
    title: "Join New Cafés",
    description: "Scan a café's QR code to add their loyalty card to your wallet. Get a welcome free coffee!",
    highlight: "Free coffee on signup",
  },
  {
    animation: <FreeCoffeeAnimation />,
    title: "Earn Rewards Faster",
    description: "Free plan: 8 stamps = free coffee. Premium plan: only 5 stamps needed! Upgrade anytime.",
    highlight: "Premium: 5 stamps only",
  },
  {
    animation: <PrivacyAnimation />,
    title: "Privacy & Permissions",
    description: "We need camera access for QR scanning and NFC for collecting stamps. Your data stays private and secure.",
    highlight: "Your data is safe",
  },
];

// Slide variants with parallax depth effect
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
};

// Animation content slides with slight delay for parallax
const contentVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
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
    <div className="min-h-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between p-6"
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

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8 relative">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30, duration: 0.45 },
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
            }}
            className="flex flex-col items-center text-center max-w-sm w-full"
          >
            {/* Animation Container */}
            <motion.div
              className="w-32 h-32 rounded-3xl bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center mb-8 relative overflow-hidden"
              variants={contentVariants}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.4,
                delay: 0.05,
              }}
            >
              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent" />
              {screens[currentIndex].animation}
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-2xl font-bold text-foreground mb-4"
              variants={contentVariants}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.4,
                delay: 0.1,
              }}
            >
              {screens[currentIndex].title}
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-muted-foreground mb-4 leading-relaxed"
              variants={contentVariants}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.4,
                delay: 0.15,
              }}
            >
              {screens[currentIndex].description}
            </motion.p>

            {/* Highlight Badge */}
            {screens[currentIndex].highlight && (
              <motion.div
                className="gold-gradient text-primary-foreground text-sm font-semibold px-4 py-2 rounded-full shadow-md"
                variants={contentVariants}
                custom={direction}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.4,
                  delay: 0.2,
                }}
              >
                {screens[currentIndex].highlight}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mb-6">
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
              width: index === currentIndex ? 32 : 8,
              opacity: index === currentIndex ? 1 : 0.5,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between p-6 gap-4">
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
              "w-full transition-all duration-200",
              isFirstScreen && "invisible"
            )}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </motion.div>

        <motion.div className="flex-1" whileTap={{ scale: 0.98 }}>
          <Button
            onClick={handleNext}
            className="w-full btn-gold relative overflow-hidden group"
          >
            {/* Button glow effect on tap */}
            <motion.span
              className="absolute inset-0 bg-white/20 rounded-md"
              initial={{ scale: 0, opacity: 0 }}
              whileTap={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
            <span className="relative z-10 flex items-center justify-center">
              {isLastScreen ? "Get Started" : "Next"}
              {!isLastScreen && <ChevronRight className="w-4 h-4 ml-2" />}
            </span>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
