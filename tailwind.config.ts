import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Stampify professional colors
        gold: {
          DEFAULT: "hsl(38 38% 60%)",
          light: "hsl(38 42% 72%)",
        },
        success: {
          DEFAULT: "hsl(140 14% 50%)",
          light: "hsl(140 14% 65%)",
        },
        // Neutral palette
        neutral: {
          warm: "hsl(35 18% 95%)",
          surface: "hsl(35 16% 91%)",
          muted: "hsl(35 12% 86%)",
          border: "hsl(35 10% 82%)",
        },
        // Legacy colors (aliases for compatibility)
        ivory: "hsl(35 18% 95%)",
        stone: "hsl(35 16% 91%)",
        charcoal: "hsl(0 0% 12%)",
        caramel: "hsl(38 38% 60%)",
        copper: "hsl(35 35% 52%)",
        espresso: "hsl(30 8% 18%)",
        latte: "hsl(35 18% 95%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
        "2xl": "1rem",
        "3xl": "1.25rem",
        "4xl": "1.5rem",
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 2px 12px -2px hsla(30, 10%, 40%, 0.06)',
        'glass-lg': '0 4px 16px -4px hsla(30, 10%, 40%, 0.08)',
        'gold': '0 2px 8px hsla(38, 38%, 55%, 0.12)',
        'gold-lg': '0 4px 14px hsla(38, 38%, 55%, 0.18)',
        'soft': '0 1px 4px -1px hsla(30, 10%, 40%, 0.04)',
        'elevated': '0 2px 10px -2px hsla(30, 10%, 40%, 0.08)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-out": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(6px)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.97)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "stamp-pop": {
          "0%": { transform: "scale(0)", opacity: "0" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "pulse-gold": {
          "0%, 100%": { boxShadow: "0 0 0 0 hsla(38, 38%, 60%, 0.2)" },
          "50%": { boxShadow: "0 0 0 6px hsla(38, 38%, 60%, 0)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.35s ease-out",
        "fade-out": "fade-out 0.25s ease-out",
        "scale-in": "scale-in 0.25s ease-out",
        "slide-up": "slide-up 0.35s ease-out",
        "stamp-pop": "stamp-pop 0.35s ease-out",
        "pulse-gold": "pulse-gold 2s infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
