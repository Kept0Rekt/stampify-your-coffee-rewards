import { useState, useEffect } from "react";
import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";
import { AuthForm } from "@/components/auth/AuthForm";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const ONBOARDING_KEY = "stampify-onboarding-complete";

export default function Auth() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isCheckingOnboarding, setIsCheckingOnboarding] = useState(true);
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  // Check if user has completed onboarding
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem(ONBOARDING_KEY);
    setShowOnboarding(!hasCompletedOnboarding);
    setIsCheckingOnboarding(false);
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (!isLoading && user) {
      navigate("/wallet", { replace: true });
    }
  }, [user, isLoading, navigate]);

  const handleOnboardingComplete = () => {
    localStorage.setItem(ONBOARDING_KEY, "true");
    setShowOnboarding(false);
  };

  if (isLoading || isCheckingOnboarding) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (showOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  return <AuthForm />;
}
