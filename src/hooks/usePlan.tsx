import { useState, useEffect, createContext, useContext, ReactNode } from "react";

type PlanType = "free" | "premium";

interface PlanContextType {
  plan: PlanType;
  setPlan: (plan: PlanType) => void;
  hasSelectedPlan: boolean;
  cardLimit: number;
  isCardLimitReached: (currentCards: number) => boolean;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

const FREE_CARD_LIMIT = 3;
const PREMIUM_CARD_LIMIT = Infinity;

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlanState] = useState<PlanType>("free");
  const [hasSelectedPlan, setHasSelectedPlan] = useState(false);

  useEffect(() => {
    const savedPlan = localStorage.getItem("stampify-plan") as PlanType | null;
    const planSelected = localStorage.getItem("stampify-plan-selected");
    
    if (savedPlan) {
      setPlanState(savedPlan);
    }
    if (planSelected === "true") {
      setHasSelectedPlan(true);
    }
  }, []);

  const setPlan = (newPlan: PlanType) => {
    setPlanState(newPlan);
    setHasSelectedPlan(true);
    localStorage.setItem("stampify-plan", newPlan);
    localStorage.setItem("stampify-plan-selected", "true");
  };

  const cardLimit = plan === "premium" ? PREMIUM_CARD_LIMIT : FREE_CARD_LIMIT;

  const isCardLimitReached = (currentCards: number) => {
    return plan === "free" && currentCards >= FREE_CARD_LIMIT;
  };

  return (
    <PlanContext.Provider value={{ plan, setPlan, hasSelectedPlan, cardLimit, isCardLimitReached }}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (context === undefined) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return context;
}
