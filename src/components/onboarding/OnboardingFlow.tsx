import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Coffee, QrCode, Smartphone, Shield, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StampifyLogo } from "@/components/ui/StampifyLogo";
import { cn } from "@/lib/utils";

interface OnboardingScreen {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: string;
}

const screens: OnboardingScreen[] = [
  {
    icon: <Coffee className="w-16 h-16" />,
    title: "Digital Loyalty Cards",
    description: "Replace all your paper loyalty cards with beautiful digital ones. Never lose a stamp again!",
    highlight: "One app, all your cafés",
  },
  {
    icon: <Smartphone className="w-16 h-16" />,
    title: "Tap to Earn Stamps",
    description: "Simply tap your phone on the café's NFC reader to collect stamps instantly. No scanning needed!",
    highlight: "Just tap & go",
  },
  {
    icon: <QrCode className="w-16 h-16" />,
    title: "Join New Cafés",
    description: "Scan a café's QR code to add their loyalty card to your wallet. Get a welcome free coffee!",
    highlight: "Free coffee on signup",
  },
  {
    icon: <Gift className="w-16 h-16" />,
    title: "Earn Rewards Faster",
    description: "Free plan: 8 stamps = free coffee. Premium plan: only 5 stamps needed! Upgrade anytime.",
    highlight: "Premium: 5 stamps only",
  },
  {
    icon: <Shield className="w-16 h-16" />,
    title: "Privacy & Permissions",
    description: "We need camera access for QR scanning and NFC for collecting stamps. Your data stays private and secure.",
    highlight: "Your data is safe",
  },
];

interface OnboardingFlowProps {
  onComplete: () => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isLastScreen = currentIndex === screens.length - 1;
  const isFirstScreen = currentIndex === 0;

  const handleNext = () => {
    if (isLastScreen) {
      onComplete();
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (!isFirstScreen) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <StampifyLogo size="sm" />
        {!isLastScreen && (
          <Button variant="ghost" onClick={handleSkip} className="text-muted-foreground">
            Skip
          </Button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center max-w-sm"
          >
            {/* Icon */}
            <div className="w-32 h-32 rounded-3xl gold-gradient flex items-center justify-center mb-8 gold-glow">
              <div className="text-primary-foreground">
                {screens[currentIndex].icon}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-foreground mb-4">
              {screens[currentIndex].title}
            </h1>

            {/* Description */}
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {screens[currentIndex].description}
            </p>

            {/* Highlight Badge */}
            {screens[currentIndex].highlight && (
              <div className="gold-gradient text-primary-foreground text-sm font-semibold px-4 py-2 rounded-full">
                {screens[currentIndex].highlight}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mb-6">
        {screens.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === currentIndex
                ? "w-8 gold-gradient"
                : "bg-muted hover:bg-muted-foreground/30"
            )}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between p-6 gap-4">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={isFirstScreen}
          className={cn(
            "flex-1",
            isFirstScreen && "invisible"
          )}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Button
          onClick={handleNext}
          className="flex-1 btn-gold"
        >
          {isLastScreen ? "Get Started" : "Next"}
          {!isLastScreen && <ChevronRight className="w-4 h-4 ml-2" />}
        </Button>
      </div>
    </div>
  );
}
