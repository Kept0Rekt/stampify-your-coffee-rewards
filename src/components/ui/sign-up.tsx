import { cn } from "@/lib/utils";
import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle, useMemo, useCallback, createContext, Children } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight, Mail, Lock, Eye, EyeOff, ArrowLeft, X, AlertCircle, PartyPopper, Loader } from "lucide-react";
import { AnimatePresence, motion, useInView, Variants, Transition } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

import type { GlobalOptions as ConfettiGlobalOptions, CreateTypes as ConfettiInstance, Options as ConfettiOptions } from "canvas-confetti";
import confetti from "canvas-confetti";
import { StampifyLogoMark } from "@/components/ui/StampifyLogo";

// --- CONFETTI ---
type Api = { fire: (options?: ConfettiOptions) => void };
export type ConfettiRef = Api | null;
const ConfettiContext = createContext<Api>({} as Api);

const Confetti = forwardRef<ConfettiRef, React.ComponentPropsWithRef<"canvas"> & { options?: ConfettiOptions; globalOptions?: ConfettiGlobalOptions; manualstart?: boolean }>((props, ref) => {
  const { options, globalOptions = { resize: true, useWorker: true }, manualstart = false, ...rest } = props;
  const instanceRef = useRef<ConfettiInstance | null>(null);
  const canvasRef = useCallback((node: HTMLCanvasElement) => {
    if (node !== null) {
      if (instanceRef.current) return;
      instanceRef.current = confetti.create(node, { ...globalOptions, resize: true });
    } else {
      if (instanceRef.current) { instanceRef.current.reset(); instanceRef.current = null; }
    }
  }, [globalOptions]);
  const fire = useCallback((opts = {}) => instanceRef.current?.({ ...options, ...opts }), [options]);
  const api = useMemo(() => ({ fire }), [fire]);
  useImperativeHandle(ref, () => api, [api]);
  useEffect(() => { if (!manualstart) fire(); }, [manualstart, fire]);
  return <canvas ref={canvasRef} {...rest} />;
});
Confetti.displayName = "Confetti";

// --- TEXT LOOP ---
type TextLoopProps = { children: React.ReactNode[]; className?: string; interval?: number; transition?: Transition; variants?: Variants; onIndexChange?: (index: number) => void; stopOnEnd?: boolean; };
export function TextLoop({ children, className, interval = 2, transition = { duration: 0.3 }, variants, onIndexChange, stopOnEnd = false }: TextLoopProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = Children.toArray(children);
  useEffect(() => {
    const intervalMs = interval * 1000;
    const timer = setInterval(() => {
      setCurrentIndex((current) => {
        if (stopOnEnd && current === items.length - 1) { clearInterval(timer); return current; }
        const next = (current + 1) % items.length;
        onIndexChange?.(next);
        return next;
      });
    }, intervalMs);
    return () => clearInterval(timer);
  }, [items.length, interval, onIndexChange, stopOnEnd]);
  const motionVariants: Variants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  };
  return (
    <div className={cn('relative inline-block whitespace-nowrap', className)}>
      <AnimatePresence mode='popLayout' initial={false}>
        <motion.div key={currentIndex} initial='initial' animate='animate' exit='exit' transition={transition} variants={variants || motionVariants}>
          {items[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// --- BLUR FADE ---
interface BlurFadeProps { children: React.ReactNode; className?: string; variant?: { hidden: { y: number }; visible: { y: number } }; duration?: number; delay?: number; yOffset?: number; inView?: boolean; inViewMargin?: string; blur?: string; }
function BlurFade({ children, className, variant, duration = 0.4, delay = 0, yOffset = 6, inView = true, inViewMargin = "-50px", blur = "6px" }: BlurFadeProps) {
  const ref = useRef(null);
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin as `${number}px` | `${number}%` | `${number}px ${number}px ${number}px ${number}px` });
  const isInView = !inView || inViewResult;
  const defaultVariants: Variants = {
    hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` },
    visible: { y: -yOffset, opacity: 1, filter: `blur(0px)` },
  };
  const combinedVariants = variant || defaultVariants;
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} exit="hidden" variants={combinedVariants} transition={{ delay: 0.04 + delay, duration, ease: "easeOut" }} className={className}>
      {children}
    </motion.div>
  );
}

// --- GLASS BUTTON ---
const glassButtonVariants = cva("relative isolate all-unset cursor-pointer rounded-full transition-all", { variants: { size: { default: "text-base font-medium", sm: "text-sm font-medium", lg: "text-lg font-medium", icon: "h-10 w-10" } }, defaultVariants: { size: "default" } });
const glassButtonTextVariants = cva("glass-button-text relative block select-none tracking-tighter", { variants: { size: { default: "px-6 py-3.5", sm: "px-4 py-2", lg: "px-8 py-4", icon: "flex h-10 w-10 items-center justify-center" } }, defaultVariants: { size: "default" } });
export interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof glassButtonVariants> { contentClassName?: string; }
const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(({ className, children, size, contentClassName, onClick, ...props }, ref) => {
  const handleWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const button = e.currentTarget.querySelector('button');
    if (button && e.target !== button) button.click();
  };
  return (
    <div className={cn("glass-button-wrap cursor-pointer rounded-full relative", className)} onClick={handleWrapperClick}>
      <button className={cn("glass-button relative z-10", glassButtonVariants({ size }))} ref={ref} onClick={onClick} {...props}>
        <span className={cn(glassButtonTextVariants({ size }), contentClassName)}>{children}</span>
      </button>
      <div className="glass-button-shadow rounded-full pointer-events-none"></div>
    </div>
  );
});
GlassButton.displayName = "GlassButton";

// --- GRADIENT BACKGROUND ---
// Colors sampled from the Stampify logo: sandy cream #E8C99A, caramel #D4A06A, copper #B87040, deep bronze #8C5230
const GradientBackground = () => (
  <>
    <style>{`
      @keyframes float1 { 0% { transform: translate(0, 0); } 50% { transform: translate(-10px, 10px); } 100% { transform: translate(0, 0); } }
      @keyframes float2 { 0% { transform: translate(0, 0); } 50% { transform: translate(10px, -10px); } 100% { transform: translate(0, 0); } }
    `}</style>
    <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" className="absolute top-0 left-0 w-full h-full">
      <defs>
        {/* Base warm cream fill */}
        <linearGradient id="bg_base" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5E6D0" />
          <stop offset="100%" stopColor="#EDD5B0" />
        </linearGradient>
        {/* Sandy gold blob */}
        <linearGradient id="rev_grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8C99A" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#D4A06A" stopOpacity="0.7" />
        </linearGradient>
        {/* Caramel to copper blob */}
        <linearGradient id="rev_grad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C8875A" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#B87040" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#D4A06A" stopOpacity="0.5" />
        </linearGradient>
        {/* Deep bronze radial blob */}
        <radialGradient id="rev_grad3" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8C5230" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#B87040" stopOpacity="0.2" />
        </radialGradient>
        {/* Light highlight blob */}
        <radialGradient id="rev_grad4" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F0D8B8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#E8C99A" stopOpacity="0.3" />
        </radialGradient>
        <filter id="rev_blur1" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="35" /></filter>
        <filter id="rev_blur2" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="25" /></filter>
        <filter id="rev_blur3" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="45" /></filter>
      </defs>
      {/* Warm cream base */}
      <rect width="800" height="600" fill="url(#bg_base)" />
      <g style={{ animation: 'float1 20s ease-in-out infinite' }}>
        <ellipse cx="200" cy="500" rx="250" ry="180" fill="url(#rev_grad1)" filter="url(#rev_blur1)" transform="rotate(-30 200 500)" />
        <rect x="500" y="100" width="300" height="250" rx="80" fill="url(#rev_grad2)" filter="url(#rev_blur2)" transform="rotate(15 650 225)" />
      </g>
      <g style={{ animation: 'float2 25s ease-in-out infinite' }}>
        <circle cx="650" cy="450" r="150" fill="url(#rev_grad3)" filter="url(#rev_blur3)" opacity="0.7" />
        <ellipse cx="50" cy="150" rx="180" ry="120" fill="url(#rev_grad4)" filter="url(#rev_blur2)" opacity="0.9" />
      </g>
    </svg>
  </>
);

// --- ICONS ---
const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-6 h-6">
    <g fillRule="evenodd" fill="none"><g fillRule="nonzero" transform="translate(3, 2)">
      <path fill="#4285F4" d="M57.8123233,30.1515267 C57.8123233,27.7263183 57.6155321,25.9565533 57.1896408,24.1212666 L29.4960833,24.1212666 L29.4960833,35.0674653 L45.7515771,35.0674653 C45.4239683,37.7877475 43.6542033,41.8844383 39.7213169,44.6372555 L39.6661883,45.0037254 L48.4223791,51.7870338 L49.0290201,51.8475849 C54.6004021,46.7020943 57.8123233,39.1313952 57.8123233,30.1515267" />
      <path fill="#34A853" d="M29.4960833,58.9921667 C37.4599129,58.9921667 44.1456164,56.3701671 49.0290201,51.8475849 L39.7213169,44.6372555 C37.2305867,46.3742596 33.887622,47.5868638 29.4960833,47.5868638 C21.6960582,47.5868638 15.0758763,42.4415991 12.7159637,35.3297782 L12.3700541,35.3591501 L3.26524241,42.4054492 L3.14617358,42.736447 C7.9965904,52.3717589 17.959737,58.9921667 29.4960833,58.9921667" />
      <path fill="#FBBC05" d="M12.7159637,35.3297782 C12.0932812,33.4944915 11.7329116,31.5279353 11.7329116,29.4960833 C11.7329116,27.4640054 12.0932812,25.4976752 12.6832029,23.6623884 L12.6667095,23.2715173 L3.44779955,16.1120237 L3.14617358,16.2554937 C1.14708246,20.2539019 0,24.7439491 0,29.4960833 C0,34.2482175 1.14708246,38.7380388 3.14617358,42.736447 L12.7159637,35.3297782" />
      <path fill="#EB4335" d="M29.4960833,11.4050769 C35.0347044,11.4050769 38.7707997,13.7975244 40.9011602,15.7968415 L49.2255853,7.66898166 C44.1130815,2.91684746 37.4599129,0 29.4960833,0 C17.959737,0 7.9965904,6.62018183 3.14617358,16.2554937 L12.6832029,23.6623884 C15.0758763,16.5505675 21.6960582,11.4050769 29.4960833,11.4050769" />
    </g></g>
  </svg>
);

const AppleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
  </svg>
);

const signUpSteps = [
  { message: "Creating your account...", icon: <Loader className="w-12 h-12 text-primary animate-spin" /> },
  { message: "Setting things up...", icon: <Loader className="w-12 h-12 text-primary animate-spin" /> },
  { message: "Almost there...", icon: <Loader className="w-12 h-12 text-primary animate-spin" /> },
  { message: "Welcome Aboard!", icon: <PartyPopper className="w-12 h-12 text-green-500" /> },
];

const signInSteps = [
  { message: "Signing you in...", icon: <Loader className="w-12 h-12 text-primary animate-spin" /> },
  { message: "Welcome back!", icon: <PartyPopper className="w-12 h-12 text-green-500" /> },
];

const TEXT_LOOP_INTERVAL = 1.5;

const StampifyLogo = () => <StampifyLogoMark size="sm" />;

interface AuthComponentProps {
  logo?: React.ReactNode;
  brandName?: string;
}

export const AuthComponent = ({ logo = <StampifyLogo />, brandName = "Stampify" }: AuthComponentProps) => {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<"signup" | "signin">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [authStep, setAuthStep] = useState("email");
  const [modalStatus, setModalStatus] = useState<'closed' | 'loading' | 'error' | 'success'>('closed');
  const [modalErrorMessage, setModalErrorMessage] = useState('');
  const [redirectMessage, setRedirectMessage] = useState('');
  const [emailCheckLoading, setEmailCheckLoading] = useState(false);
  const isAndroid = /android/i.test(navigator.userAgent);
  const confettiRef = useRef<ConfettiRef>(null);

  const isEmailValid = /\S+@\S+\.\S+/.test(email);
  const isPasswordValid = password.length >= 6;
  const isConfirmPasswordValid = confirmPassword.length >= 6;

  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);

  const modalSteps = authMode === "signup" ? signUpSteps : signInSteps;

  const fireSideCanons = () => {
    const fire = confettiRef.current?.fire;
    if (fire) {
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };
      const particleCount = 50;
      fire({ ...defaults, particleCount, origin: { x: 0, y: 1 }, angle: 60 });
      fire({ ...defaults, particleCount, origin: { x: 1, y: 1 }, angle: 120 });
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (modalStatus !== 'closed') return;
    if (authMode === "signup" && authStep !== 'confirmPassword') return;
    if (authMode === "signin" && authStep !== 'password') return;

    if (authMode === "signup" && password !== confirmPassword) {
      setModalErrorMessage("Passwords do not match!");
      setModalStatus('error');
      return;
    }

    setModalStatus('loading');

    try {
      if (authMode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/` },
        });
        if (error) {
          if (error.message.includes("already registered") || error.message.includes("User already registered")) {
            setModalStatus('closed');
            setAuthMode("signin");
            setAuthStep("password");
            setPassword("");
            setRedirectMessage("Looks like you already have an account. Please enter your password.");
          } else {
            setModalErrorMessage(error.message || "Something went wrong.");
            setModalStatus('error');
          }
          return;
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          setModalErrorMessage(error.message.includes("Invalid login credentials")
            ? "Invalid email or password. Please try again."
            : error.message || "Something went wrong.");
          setModalStatus('error');
          return;
        }
      }

      const totalDuration = (modalSteps.length - 1) * TEXT_LOOP_INTERVAL * 1000;
      setTimeout(() => {
        fireSideCanons();
        setModalStatus('success');
        setTimeout(() => navigate("/wallet"), 1500);
      }, totalDuration);
    } catch (err: any) {
      setModalErrorMessage(err.message || "Something went wrong. Please try again.");
      setModalStatus('error');
    }
  };

  const handleProgressStep = async () => {
    if (authStep === 'email' && isEmailValid) {
      setEmailCheckLoading(true);
      try {
        const { count, error } = await supabase
          .from("profiles")
          .select("id", { count: "exact", head: true })
          .eq("email", email);

        if (!error && (count ?? 0) > 0) {
          // Email already registered — switch straight to sign-in
          setAuthMode("signin");
          setAuthStep("password");
          setPassword("");
          setRedirectMessage("You already have an account. Enter your password to sign in.");
        } else {
          setAuthStep("password");
        }
      } catch {
        setAuthStep("password");
      } finally {
        setEmailCheckLoading(false);
      }
    } else if (authStep === 'password' && isPasswordValid) {
      if (authMode === "signup") setAuthStep("confirmPassword");
      else handleFinalSubmit({ preventDefault: () => {} } as React.FormEvent);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { e.preventDefault(); handleProgressStep(); }
  };

  const handleGoBack = () => {
    if (authStep === 'confirmPassword') { setAuthStep('password'); setConfirmPassword(''); }
    else if (authStep === 'password') { setAuthStep('email'); setRedirectMessage(''); }
  };

  const handleGoogleAuth = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/wallet` },
    });
    if (error) { setModalErrorMessage(error.message || "Failed to sign in with Google."); setModalStatus('error'); }
  };

  const switchMode = (mode: "signup" | "signin") => {
    setAuthMode(mode);
    setAuthStep("email");
    setEmail(""); setPassword(""); setConfirmPassword("");
    setModalStatus('closed');
    setRedirectMessage('');
  };

  useEffect(() => {
    if (authStep === 'password') setTimeout(() => passwordInputRef.current?.focus(), 500);
    else if (authStep === 'confirmPassword') setTimeout(() => confirmPasswordInputRef.current?.focus(), 500);
  }, [authStep]);

  useEffect(() => {
    if (modalStatus === 'success') fireSideCanons();
  }, [modalStatus]);

  const closeModal = () => { setModalStatus('closed'); setModalErrorMessage(''); };

  const Modal = () => (
    <AnimatePresence>
      {modalStatus !== 'closed' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-card/80 border-4 border-border rounded-2xl p-8 w-full max-w-sm flex flex-col items-center gap-4 mx-2">
            {(modalStatus === 'error' || modalStatus === 'success') && <button onClick={closeModal} className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-foreground transition-colors"><X className="w-5 h-5" /></button>}
            {modalStatus === 'error' && <>
              <AlertCircle className="w-12 h-12 text-destructive" />
              <p className="text-lg font-medium text-foreground text-center">{modalErrorMessage}</p>
              <GlassButton onClick={closeModal} size="sm" className="mt-4">Try Again</GlassButton>
            </>}
            {modalStatus === 'loading' &&
              <TextLoop interval={TEXT_LOOP_INTERVAL} stopOnEnd={true}>
                {modalSteps.slice(0, -1).map((step, i) =>
                  <div key={i} className="flex flex-col items-center gap-4">{step.icon}<p className="text-lg font-medium text-foreground">{step.message}</p></div>
                )}
              </TextLoop>
            }
            {modalStatus === 'success' &&
              <div className="flex flex-col items-center gap-4">
                {modalSteps[modalSteps.length - 1].icon}
                <p className="text-lg font-medium text-foreground">{modalSteps[modalSteps.length - 1].message}</p>
              </div>
            }
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen w-screen flex flex-col" style={{ backgroundColor: '#F0D5B0' }}>
      <style>{`
        input[type="password"]::-ms-reveal, input[type="password"]::-ms-clear { display: none !important; }
        input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus { -webkit-box-shadow: 0 0 0 30px transparent inset !important; -webkit-text-fill-color: var(--foreground) !important; transition: background-color 5000s ease-in-out 0s !important; }
        @property --angle-1 { syntax: "<angle>"; inherits: false; initial-value: -75deg; }
        @property --angle-2 { syntax: "<angle>"; inherits: false; initial-value: -45deg; }
        .glass-button-wrap { --anim-time: 400ms; --anim-ease: cubic-bezier(0.25, 1, 0.5, 1); --border-width: clamp(1px, 0.0625em, 4px); position: relative; z-index: 2; transform-style: preserve-3d; transition: transform var(--anim-time) var(--anim-ease); }
        .glass-button-wrap:has(.glass-button:active) { transform: rotateX(25deg); }
        .glass-button-shadow { --shadow-cutoff-fix: 2em; position: absolute; width: calc(100% + var(--shadow-cutoff-fix)); height: calc(100% + var(--shadow-cutoff-fix)); top: calc(0% - var(--shadow-cutoff-fix) / 2); left: calc(0% - var(--shadow-cutoff-fix) / 2); filter: blur(clamp(2px, 0.125em, 12px)); transition: filter var(--anim-time) var(--anim-ease); pointer-events: none; z-index: 0; }
        .glass-button-shadow::after { content: ""; position: absolute; inset: 0; border-radius: 9999px; background: linear-gradient(180deg, oklch(from var(--foreground) l c h / 20%), oklch(from var(--foreground) l c h / 10%)); width: calc(100% - var(--shadow-cutoff-fix) - 0.25em); height: calc(100% - var(--shadow-cutoff-fix) - 0.25em); top: calc(var(--shadow-cutoff-fix) - 0.5em); left: calc(var(--shadow-cutoff-fix) - 0.875em); padding: 0.125em; box-sizing: border-box; mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); mask-composite: exclude; transition: all var(--anim-time) var(--anim-ease); opacity: 1; }
        .glass-button { -webkit-tap-highlight-color: transparent; backdrop-filter: blur(clamp(1px, 0.125em, 4px)); transition: all var(--anim-time) var(--anim-ease); background: linear-gradient(-75deg, oklch(from var(--background) l c h / 5%), oklch(from var(--background) l c h / 20%), oklch(from var(--background) l c h / 5%)); box-shadow: inset 0 0.125em 0.125em oklch(from var(--foreground) l c h / 5%), inset 0 -0.125em 0.125em oklch(from var(--background) l c h / 50%), 0 0.25em 0.125em -0.125em oklch(from var(--foreground) l c h / 20%), 0 0 0.1em 0.25em inset oklch(from var(--background) l c h / 20%), 0 0 0 0 oklch(from var(--background) l c h); }
        .glass-button:hover { transform: scale(0.975); backdrop-filter: blur(0.01em); box-shadow: inset 0 0.125em 0.125em oklch(from var(--foreground) l c h / 5%), inset 0 -0.125em 0.125em oklch(from var(--background) l c h / 50%), 0 0.15em 0.05em -0.1em oklch(from var(--foreground) l c h / 25%), 0 0 0.05em 0.1em inset oklch(from var(--background) l c h / 50%), 0 0 0 0 oklch(from var(--background) l c h); }
        .glass-button-text { color: oklch(from var(--foreground) l c h / 90%); text-shadow: 0em 0.25em 0.05em oklch(from var(--foreground) l c h / 10%); transition: all var(--anim-time) var(--anim-ease); }
        .glass-button:hover .glass-button-text { text-shadow: 0.025em 0.025em 0.025em oklch(from var(--foreground) l c h / 12%); }
        .glass-button-text::after { content: ""; display: block; position: absolute; width: calc(100% - var(--border-width)); height: calc(100% - var(--border-width)); top: calc(0% + var(--border-width) / 2); left: calc(0% + var(--border-width) / 2); box-sizing: border-box; border-radius: 9999px; overflow: clip; background: linear-gradient(var(--angle-2), transparent 0%, oklch(from var(--background) l c h / 50%) 40% 50%, transparent 55%); z-index: 3; mix-blend-mode: screen; pointer-events: none; background-size: 200% 200%; background-position: 0% 50%; transition: background-position calc(var(--anim-time) * 1.25) var(--anim-ease), --angle-2 calc(var(--anim-time) * 1.25) var(--anim-ease); }
        .glass-button:hover .glass-button-text::after { background-position: 25% 50%; }
        .glass-button:active .glass-button-text::after { background-position: 50% 15%; --angle-2: -15deg; }
        .glass-button::after { content: ""; position: absolute; z-index: 1; inset: 0; border-radius: 9999px; width: calc(100% + var(--border-width)); height: calc(100% + var(--border-width)); top: calc(0% - var(--border-width) / 2); left: calc(0% - var(--border-width) / 2); padding: var(--border-width); box-sizing: border-box; background: conic-gradient(from var(--angle-1) at 50% 50%, oklch(from var(--foreground) l c h / 50%) 0%, transparent 5% 40%, oklch(from var(--foreground) l c h / 50%) 50%, transparent 60% 95%, oklch(from var(--foreground) l c h / 50%) 100%), linear-gradient(180deg, oklch(from var(--background) l c h / 50%), oklch(from var(--background) l c h / 50%)); mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); mask-composite: exclude; transition: all var(--anim-time) var(--anim-ease), --angle-1 500ms ease; box-shadow: inset 0 0 0 calc(var(--border-width) / 2) oklch(from var(--background) l c h / 50%); pointer-events: none; }
        .glass-button:hover::after { --angle-1: -125deg; }
        .glass-button:active::after { --angle-1: -75deg; }
        .glass-button-wrap:has(.glass-button:hover) .glass-button-shadow { filter: blur(clamp(2px, 0.0625em, 6px)); }
        .glass-button-wrap:has(.glass-button:hover) .glass-button-shadow::after { top: calc(var(--shadow-cutoff-fix) - 0.875em); opacity: 1; }
        .glass-button-wrap:has(.glass-button:active) .glass-button-shadow { filter: blur(clamp(2px, 0.125em, 12px)); }
        .glass-button-wrap:has(.glass-button:active) .glass-button-shadow::after { top: calc(var(--shadow-cutoff-fix) - 0.5em); opacity: 0.75; }
        .glass-button-wrap:has(.glass-button:active) .glass-button-text { text-shadow: 0.025em 0.25em 0.05em oklch(from var(--foreground) l c h / 12%); }
        .glass-button-wrap:has(.glass-button:active) .glass-button { box-shadow: inset 0 0.125em 0.125em oklch(from var(--foreground) l c h / 5%), inset 0 -0.125em 0.125em oklch(from var(--background) l c h / 50%), 0 0.125em 0.125em -0.125em oklch(from var(--foreground) l c h / 20%), 0 0 0.1em 0.25em inset oklch(from var(--background) l c h / 20%), 0 0.225em 0.05em 0 oklch(from var(--foreground) l c h / 5%), 0 0.25em 0 0 oklch(from var(--background) l c h / 75%), inset 0 0.25em 0.05em 0 oklch(from var(--foreground) l c h / 15%); }
        @media (hover: none) and (pointer: coarse) { .glass-button::after, .glass-button:hover::after, .glass-button:active::after { --angle-1: -75deg; } .glass-button .glass-button-text::after, .glass-button:active .glass-button-text::after { --angle-2: -45deg; } }
        .glass-input-wrap { position: relative; z-index: 2; transform-style: preserve-3d; border-radius: 9999px; }
        .glass-input { display: flex; position: relative; width: 100%; align-items: center; gap: 0.5rem; border-radius: 9999px; padding: 0.25rem; -webkit-tap-highlight-color: transparent; backdrop-filter: blur(clamp(1px, 0.125em, 4px)); transition: all 400ms cubic-bezier(0.25, 1, 0.5, 1); background: linear-gradient(-75deg, oklch(from var(--background) l c h / 5%), oklch(from var(--background) l c h / 20%), oklch(from var(--background) l c h / 5%)); box-shadow: inset 0 0.125em 0.125em oklch(from var(--foreground) l c h / 5%), inset 0 -0.125em 0.125em oklch(from var(--background) l c h / 50%), 0 0.25em 0.125em -0.125em oklch(from var(--foreground) l c h / 20%), 0 0 0.1em 0.25em inset oklch(from var(--background) l c h / 20%), 0 0 0 0 oklch(from var(--background) l c h); }
        .glass-input-wrap:focus-within .glass-input { backdrop-filter: blur(0.01em); box-shadow: inset 0 0.125em 0.125em oklch(from var(--foreground) l c h / 5%), inset 0 -0.125em 0.125em oklch(from var(--background) l c h / 50%), 0 0.15em 0.05em -0.1em oklch(from var(--foreground) l c h / 25%), 0 0 0.05em 0.1em inset oklch(from var(--background) l c h / 50%), 0 0 0 0 oklch(from var(--background) l c h); }
        .glass-input::after { content: ""; position: absolute; z-index: 1; inset: 0; border-radius: 9999px; width: calc(100% + clamp(1px, 0.0625em, 4px)); height: calc(100% + clamp(1px, 0.0625em, 4px)); top: calc(0% - clamp(1px, 0.0625em, 4px) / 2); left: calc(0% - clamp(1px, 0.0625em, 4px) / 2); padding: clamp(1px, 0.0625em, 4px); box-sizing: border-box; background: conic-gradient(from var(--angle-1) at 50% 50%, oklch(from var(--foreground) l c h / 50%) 0%, transparent 5% 40%, oklch(from var(--foreground) l c h / 50%) 50%, transparent 60% 95%, oklch(from var(--foreground) l c h / 50%) 100%), linear-gradient(180deg, oklch(from var(--background) l c h / 50%), oklch(from var(--background) l c h / 50%)); mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); mask-composite: exclude; transition: all 400ms cubic-bezier(0.25, 1, 0.5, 1), --angle-1 500ms ease; box-shadow: inset 0 0 0 calc(clamp(1px, 0.0625em, 4px) / 2) oklch(from var(--background) l c h / 50%); pointer-events: none; }
        .glass-input-wrap:focus-within .glass-input::after { --angle-1: -125deg; }
        .glass-input-text-area { position: absolute; inset: 0; border-radius: 9999px; pointer-events: none; }
        .glass-input-text-area::after { content: ""; display: block; position: absolute; width: calc(100% - clamp(1px, 0.0625em, 4px)); height: calc(100% - clamp(1px, 0.0625em, 4px)); top: calc(0% + clamp(1px, 0.0625em, 4px) / 2); left: calc(0% + clamp(1px, 0.0625em, 4px) / 2); box-sizing: border-box; border-radius: 9999px; overflow: clip; background: linear-gradient(var(--angle-2), transparent 0%, oklch(from var(--background) l c h / 50%) 40% 50%, transparent 55%); z-index: 3; mix-blend-mode: screen; pointer-events: none; background-size: 200% 200%; background-position: 0% 50%; transition: background-position calc(400ms * 1.25) cubic-bezier(0.25, 1, 0.5, 1), --angle-2 calc(400ms * 1.25) cubic-bezier(0.25, 1, 0.5, 1); }
        .glass-input-wrap:focus-within .glass-input-text-area::after { background-position: 25% 50%; }

        /* ---- Liquid Glass (layered) ---- */
        .lg-btn {
          --bg-color: rgba(255, 255, 255, 0.28);
          --highlight: rgba(255, 255, 255, 0.80);
          position: relative;
          padding: 13px 20px;
          border: none;
          border-radius: 9999px;
          cursor: pointer;
          overflow: hidden;
          background: transparent;
          transition: transform 0.2s ease;
          outline: none;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .lg-btn:hover { transform: scale(1.02); }
        .lg-btn:active { transform: scale(0.97); }

        .lg-filter, .lg-overlay, .lg-specular { position: absolute; inset: 0; border-radius: inherit; }

        .lg-filter {
          z-index: 1;
          backdrop-filter: blur(12px);
          filter: url(#glass-distortion) saturate(140%) brightness(1.08);
        }
        .lg-overlay {
          z-index: 2;
          background: var(--bg-color);
          border: 1px solid rgba(255, 255, 255, 0.45);
        }
        .lg-specular {
          z-index: 3;
          box-shadow: inset 1px 1px 1px var(--highlight), inset 0 -1px 1px rgba(176, 112, 64, 0.12);
        }
        .lg-content {
          position: relative;
          z-index: 4;
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 600;
          font-size: 14px;
          color: #1c1917;
        }

        .lg-input-wrap {
          --bg-color: rgba(255, 255, 255, 0.28);
          --highlight: rgba(255, 255, 255, 0.80);
          position: relative;
          border-radius: 9999px;
          overflow: hidden;
          transition: transform 0.2s ease;
        }
        .lg-input-filter {
          position: absolute; inset: 0; border-radius: inherit; z-index: 1;
          backdrop-filter: blur(12px);
          filter: url(#glass-distortion) saturate(140%) brightness(1.08);
        }
        .lg-input-overlay {
          position: absolute; inset: 0; border-radius: inherit; z-index: 2;
          background: var(--bg-color);
          border: 1px solid rgba(255, 255, 255, 0.45);
        }
        .lg-input-specular {
          position: absolute; inset: 0; border-radius: inherit; z-index: 3;
          box-shadow: inset 1px 1px 1px var(--highlight), inset 0 -1px 1px rgba(176, 112, 64, 0.12);
          pointer-events: none;
        }
        .lg-input-content {
          position: relative; z-index: 4;
          display: flex; align-items: center; gap: 0.5rem;
          padding: 11px 14px;
        }
        .lg-input-wrap:focus-within .lg-input-overlay {
          border-color: rgba(255, 255, 255, 0.70);
        }
        .lg-input-wrap:focus-within .lg-input-specular {
          box-shadow: inset 1px 1px 2px var(--highlight), inset 0 -1px 1px rgba(176, 112, 64, 0.15);
        }

        /* ---- iOS Liquid Glass ---- */
        .liquid-glass-panel {
          position: relative;
          background: rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.50);
          border-radius: 24px;
          box-shadow:
            0 8px 32px rgba(140, 82, 48, 0.13),
            0 1.5px 8px rgba(140, 82, 48, 0.08),
            inset 0 1.5px 0 rgba(255, 255, 255, 0.75),
            inset 0 -1px 0 rgba(176, 112, 64, 0.10);
          overflow: hidden;
        }
        .liquid-glass-panel::before {
          content: "";
          position: absolute;
          top: 0; left: 12%; right: 12%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.9) 40%, rgba(255,255,255,0.9) 60%, transparent);
          border-radius: 9999px;
          pointer-events: none;
          z-index: 10;
        }

        .liquid-glass-pill {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 13px 20px;
          background: rgba(255, 255, 255, 0.28);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.55);
          border-radius: 9999px;
          box-shadow:
            0 4px 16px rgba(140, 82, 48, 0.10),
            0 1px 4px rgba(140, 82, 48, 0.06),
            inset 0 1.5px 0 rgba(255, 255, 255, 0.80),
            inset 0 -1px 0 rgba(176, 112, 64, 0.08);
          cursor: pointer;
          transition: all 0.22s cubic-bezier(0.25, 1, 0.5, 1);
          overflow: hidden;
          text-decoration: none;
        }
        .liquid-glass-pill::before {
          content: "";
          position: absolute;
          top: 0; left: 15%; right: 15%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.95) 40%, rgba(255,255,255,0.95) 60%, transparent);
          pointer-events: none;
          z-index: 10;
        }
        .liquid-glass-pill:hover {
          background: rgba(255, 255, 255, 0.36);
          box-shadow:
            0 6px 24px rgba(140, 82, 48, 0.14),
            0 2px 6px rgba(140, 82, 48, 0.08),
            inset 0 1.5px 0 rgba(255, 255, 255, 0.85),
            inset 0 -1px 0 rgba(176, 112, 64, 0.10);
          transform: translateY(-1px);
        }
        .liquid-glass-pill:active {
          transform: translateY(0px) scale(0.985);
          background: rgba(255, 255, 255, 0.20);
        }

        .liquid-glass-input-wrap {
          position: relative;
          background: rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.50);
          border-radius: 9999px;
          box-shadow:
            0 4px 16px rgba(140, 82, 48, 0.10),
            inset 0 1.5px 0 rgba(255, 255, 255, 0.75),
            inset 0 -1px 0 rgba(176, 112, 64, 0.08);
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
          overflow: hidden;
        }
        .liquid-glass-input-wrap::before {
          content: "";
          position: absolute;
          top: 0; left: 15%; right: 15%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.9) 40%, rgba(255,255,255,0.9) 60%, transparent);
          pointer-events: none;
          z-index: 10;
        }
        .liquid-glass-input-wrap:focus-within {
          border-color: rgba(255, 255, 255, 0.70);
          box-shadow:
            0 6px 24px rgba(140, 82, 48, 0.14),
            inset 0 1.5px 0 rgba(255, 255, 255, 0.90),
            inset 0 -1px 0 rgba(176, 112, 64, 0.10);
        }
        .liquid-glass-input-inner {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 0.5rem;
        }
      `}</style>

      {/* SVG filter for glass distortion */}
      <svg style={{ display: 'none' }}>
        <defs>
          <filter id="glass-distortion" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="3" stitchTiles="stitch" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <Confetti ref={confettiRef} manualstart className="fixed top-0 left-0 w-full h-full pointer-events-none z-[999]" />
      <Modal />

      <div className={cn("fixed top-4 left-4 z-20 flex items-center gap-2", "md:left-1/2 md:-translate-x-1/2")}>
        {logo}
        <h1 className="text-base font-bold text-foreground">{brandName}</h1>
      </div>

      <div className={cn("flex w-full flex-1 h-full items-center justify-center", "relative overflow-hidden")} style={{ backgroundColor: '#F0D5B0' }}>
        <div className="absolute inset-0 z-0"><GradientBackground /></div>
        <fieldset disabled={modalStatus !== 'closed'} className="relative z-10 flex flex-col items-center gap-8 w-[280px] mx-auto p-4">

          <AnimatePresence mode="wait">
            {authStep === "email" && (
              <motion.div key="email-content" initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: "easeOut" }} className="w-full flex flex-col items-center gap-4">
                <BlurFade delay={0.25 * 1} className="w-full">
                  <div className="text-center">
                    <p className="font-serif font-light text-4xl sm:text-5xl tracking-tight text-stone-900 whitespace-nowrap drop-shadow-sm">
                      {authMode === "signup" ? "Get started" : "Welcome back"}
                    </p>
                  </div>
                </BlurFade>
                <BlurFade delay={0.25 * 2}><p className="text-sm font-semibold text-stone-800 tracking-wide">Continue with</p></BlurFade>
                <BlurFade delay={0.25 * 3} className="w-[300px]">
                  <div className="flex flex-col gap-3 w-full">
                    <button className="lg-btn" onClick={handleGoogleAuth} type="button">
                      <div className="lg-filter" />
                      <div className="lg-overlay" />
                      <div className="lg-specular" />
                      <div className="lg-content"><GoogleIcon /><span>Continue with Google</span></div>
                    </button>
                    {!isAndroid && (
                      <button className="lg-btn" type="button" onClick={() => { setModalErrorMessage("Apple sign-in is not available yet."); setModalStatus('error'); }}>
                        <div className="lg-filter" />
                        <div className="lg-overlay" />
                        <div className="lg-specular" />
                        <div className="lg-content"><AppleIcon /><span>Continue with Apple</span></div>
                      </button>
                    )}
                  </div>
                </BlurFade>
                <BlurFade delay={0.25 * 4} className="w-[300px]">
                  <div className="flex items-center w-full gap-3 py-1">
                    <div className="flex-1 h-px bg-stone-400/40" />
                    <span className="text-xs font-semibold text-stone-500 tracking-widest uppercase">or</span>
                    <div className="flex-1 h-px bg-stone-400/40" />
                  </div>
                </BlurFade>
              </motion.div>
            )}
            {authStep === "password" && (
              <motion.div key="password-title" initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: "easeOut" }} className="w-full flex flex-col items-center text-center gap-2">
                <BlurFade delay={0} className="w-full">
                  <p className="font-serif font-light text-3xl sm:text-4xl tracking-tight text-stone-900 whitespace-nowrap drop-shadow-sm">
                    {authMode === "signup" ? "Create your password" : "Enter your password"}
                  </p>
                  {redirectMessage ? (
                    <p className="text-sm font-semibold text-amber-800 mt-2 bg-amber-100/60 rounded-xl px-3 py-2">{redirectMessage}</p>
                  ) : (
                    <p className="text-sm font-semibold text-stone-700 mt-2">{authMode === "signup" ? "Must be at least 6 characters." : "Enter the password for your account."}</p>
                  )}
                </BlurFade>
              </motion.div>
            )}
            {authStep === "confirmPassword" && (
              <motion.div key="confirm-title" initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: "easeOut" }} className="w-full flex flex-col items-center text-center gap-2">
                <BlurFade delay={0} className="w-full">
                  <p className="font-serif font-light text-3xl sm:text-4xl tracking-tight text-stone-900 whitespace-nowrap drop-shadow-sm">One Last Step</p>
                  <p className="text-sm font-semibold text-stone-700 mt-2">Confirm your password to continue</p>
                </BlurFade>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleFinalSubmit} className="w-[300px] space-y-6">
            <AnimatePresence>
              {authStep !== 'confirmPassword' && (
                <motion.div key="email-password-fields" exit={{ opacity: 0, filter: 'blur(4px)' }} transition={{ duration: 0.3, ease: "easeOut" }} className="w-full space-y-6">
                  <BlurFade delay={authStep === 'email' ? 0.25 * 5 : 0} inView={true} className="w-full">
                    <div className="relative w-full">
                      <AnimatePresence>
                        {authStep === "password" && (
                          <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3, delay: 0.4 }} className="absolute -top-6 left-4 z-10">
                            <label className="text-xs text-muted-foreground font-semibold">Email</label>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <div className="lg-input-wrap w-full">
                        <div className="lg-input-filter" />
                        <div className="lg-input-overlay" />
                        <div className="lg-input-specular" />
                        <div className="lg-input-content">
                          <div className={cn("flex-shrink-0 flex items-center justify-center overflow-hidden transition-all duration-300 ease-in-out", email.length > 20 && authStep === 'email' ? "w-0" : "w-6")}>
                            <Mail className="h-5 w-5 text-stone-600 flex-shrink-0" />
                          </div>
                          <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={handleKeyDown} className="h-full w-0 flex-grow bg-transparent text-stone-800 placeholder:text-stone-500 focus:outline-none text-sm font-medium" />
                          <div className={cn("flex-shrink-0 overflow-hidden transition-all duration-300 ease-in-out", isEmailValid && authStep === 'email' ? "w-9" : "w-0")}>
                            <GlassButton type="button" onClick={handleProgressStep} size="icon" aria-label="Continue" contentClassName="text-stone-700 hover:text-stone-900" disabled={emailCheckLoading}>
                              {emailCheckLoading ? <Loader className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                            </GlassButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </BlurFade>
                  <AnimatePresence>
                    {authStep === "password" && (
                      <BlurFade key="password-field" className="w-full">
                        <div className="relative w-full">
                          <AnimatePresence>
                            {password.length > 0 && (
                              <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }} className="absolute -top-6 left-4 z-10">
                                <label className="text-xs text-muted-foreground font-semibold">Password</label>
                              </motion.div>
                            )}
                          </AnimatePresence>
                          <div className="lg-input-wrap w-full">
                            <div className="lg-input-filter" />
                            <div className="lg-input-overlay" />
                            <div className="lg-input-specular" />
                            <div className="lg-input-content">
                              <div className="flex-shrink-0 flex items-center justify-center w-6">
                                {isPasswordValid
                                  ? <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-stone-600 hover:text-stone-800 transition-colors rounded-full">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
                                  : <Lock className="h-5 w-5 text-stone-600 flex-shrink-0" />}
                              </div>
                              <input ref={passwordInputRef} type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown} className="h-full w-0 flex-grow bg-transparent text-stone-800 placeholder:text-stone-500 focus:outline-none text-sm font-medium" />
                              <div className={cn("flex-shrink-0 overflow-hidden transition-all duration-300 ease-in-out", isPasswordValid ? "w-9" : "w-0")}>
                                {authMode === "signup"
                                  ? <GlassButton type="button" onClick={handleProgressStep} size="icon" contentClassName="text-stone-700 hover:text-stone-900"><ArrowRight className="w-5 h-5" /></GlassButton>
                                  : <GlassButton type="submit" size="icon" contentClassName="text-stone-700 hover:text-stone-900"><ArrowRight className="w-5 h-5" /></GlassButton>}
                              </div>
                            </div>
                          </div>
                        </div>
                        <BlurFade inView delay={0.2}>
                          <button type="button" onClick={handleGoBack} className="mt-4 flex items-center gap-2 text-sm font-semibold text-stone-700 hover:text-stone-900 transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Go back
                          </button>
                        </BlurFade>
                      </BlurFade>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {authStep === 'confirmPassword' && (
                <BlurFade key="confirm-password-field" className="w-full">
                  <div className="relative w-full">
                    <AnimatePresence>
                      {confirmPassword.length > 0 && (
                        <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }} className="absolute -top-6 left-4 z-10">
                          <label className="text-xs text-muted-foreground font-semibold">Confirm Password</label>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div className="lg-input-wrap w-full">
                      <div className="lg-input-filter" />
                      <div className="lg-input-overlay" />
                      <div className="lg-input-specular" />
                      <div className="lg-input-content">
                        <div className="flex-shrink-0 flex items-center justify-center w-6">
                          {isConfirmPasswordValid
                            ? <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="text-stone-600 hover:text-stone-800 transition-colors rounded-full">{showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
                            : <Lock className="h-5 w-5 text-stone-600 flex-shrink-0" />}
                        </div>
                        <input ref={confirmPasswordInputRef} type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="h-full w-0 flex-grow bg-transparent text-stone-800 placeholder:text-stone-500 focus:outline-none text-sm font-medium" />
                        <div className={cn("flex-shrink-0 overflow-hidden transition-all duration-300 ease-in-out", isConfirmPasswordValid ? "w-9" : "w-0")}>
                          <GlassButton type="submit" size="icon" contentClassName="text-stone-700 hover:text-stone-900"><ArrowRight className="w-5 h-5" /></GlassButton>
                        </div>
                      </div>
                    </div>
                  </div>
                  <BlurFade inView delay={0.2}>
                    <button type="button" onClick={handleGoBack} className="mt-4 flex items-center gap-2 text-sm font-semibold text-stone-700 hover:text-stone-900 transition-colors">
                      <ArrowLeft className="w-4 h-4" /> Go back
                    </button>
                  </BlurFade>
                </BlurFade>
              )}
            </AnimatePresence>
          </form>

          <BlurFade delay={0.25 * 6} className="text-center">
            <p className="text-sm font-medium text-stone-700">
              {authMode === "signup" ? "Already have an account? " : "Don't have an account? "}
              <button type="button" onClick={() => switchMode(authMode === "signup" ? "signin" : "signup")} className="text-stone-900 font-bold hover:underline">
                {authMode === "signup" ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </BlurFade>

        </fieldset>
      </div>
    </div>
  );
};
