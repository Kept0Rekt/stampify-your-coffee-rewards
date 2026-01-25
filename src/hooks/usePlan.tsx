import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

type PlanType = "free" | "premium";

interface PlanContextType {
  plan: PlanType;
  setPlan: (plan: PlanType) => void;
  hasSelectedPlan: boolean;
  stampsRequired: number;
  isCardLimitReached: (currentCards: number) => boolean;
  isTuesdayDouble: boolean;
  isBirthdayMonth: boolean;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

const FREE_STAMPS_REQUIRED = 10;
const PREMIUM_STAMPS_REQUIRED = 7;
const FREE_CARD_LIMIT = 3;

export function PlanProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [plan, setPlanState] = useState<PlanType>("free");
  const [hasSelectedPlan, setHasSelectedPlan] = useState(false);
  const [birthdayMonth, setBirthdayMonth] = useState<number | null>(null);

  // Check if today is Tuesday (for double stamps)
  const isTuesdayDouble = new Date().getDay() === 2;
  
  // Check if current month is user's birthday month
  const currentMonth = new Date().getMonth() + 1;
  const isBirthdayMonth = birthdayMonth === currentMonth;

  useEffect(() => {
    const loadPlan = async () => {
      if (user) {
        // Try to load from database
        const { data: profile } = await supabase
          .from("profiles")
          .select("plan, birthday_month")
          .eq("id", user.id)
          .single();

        if (profile) {
          setPlanState(profile.plan as PlanType);
          setBirthdayMonth(profile.birthday_month);
          setHasSelectedPlan(true);
        } else {
          // Fallback to localStorage
          const savedPlan = localStorage.getItem("stampify-plan") as PlanType | null;
          const planSelected = localStorage.getItem("stampify-plan-selected");
          
          if (savedPlan) {
            setPlanState(savedPlan);
          }
          if (planSelected === "true") {
            setHasSelectedPlan(true);
          }
        }
      } else {
        // Not logged in, use localStorage
        const savedPlan = localStorage.getItem("stampify-plan") as PlanType | null;
        const planSelected = localStorage.getItem("stampify-plan-selected");
        
        if (savedPlan) {
          setPlanState(savedPlan);
        }
        if (planSelected === "true") {
          setHasSelectedPlan(true);
        }
      }
    };

    loadPlan();
  }, [user]);

  const setPlan = async (newPlan: PlanType) => {
    setPlanState(newPlan);
    setHasSelectedPlan(true);
    localStorage.setItem("stampify-plan", newPlan);
    localStorage.setItem("stampify-plan-selected", "true");

    // Update database if logged in
    if (user) {
      await supabase
        .from("profiles")
        .update({ plan: newPlan })
        .eq("id", user.id);
    }
  };

  const stampsRequired = plan === "premium" ? PREMIUM_STAMPS_REQUIRED : FREE_STAMPS_REQUIRED;

  const isCardLimitReached = (currentCards: number) => {
    return plan === "free" && currentCards >= FREE_CARD_LIMIT;
  };

  return (
    <PlanContext.Provider 
      value={{ 
        plan, 
        setPlan, 
        hasSelectedPlan, 
        stampsRequired,
        isCardLimitReached,
        isTuesdayDouble,
        isBirthdayMonth,
      }}
    >
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
