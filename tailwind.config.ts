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
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['11px', { lineHeight: '1.4', letterSpacing: '0.01em' }],
        'sm': ['13px', { lineHeight: '1.45', letterSpacing: '-0.003em' }],
        'base': ['15px', { lineHeight: '1.5', letterSpacing: '-0.009em' }],
        'lg': ['17px', { lineHeight: '1.4', letterSpacing: '-0.014em' }],
        'xl': ['20px', { lineHeight: '1.35', letterSpacing: '-0.017em' }],
        '2xl': ['22px', { lineHeight: '1.3', letterSpacing: '-0.019em' }],
        '3xl': ['28px', { lineHeight: '1.2', letterSpacing: '-0.021em' }],
        '4xl': ['34px', { lineHeight: '1.15', letterSpacing: '-0.023em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        'safe': 'env(safe-area-inset-bottom)',
      },
      boxShadow: {
        'soft': '0 1px 2px hsla(0, 0%, 0%, 0.02), 0 2px 8px hsla(0, 0%, 0%, 0.03)',
        'elevated': '0 1px 2px hsla(0, 0%, 0%, 0.03), 0 4px 16px hsla(0, 0%, 0%, 0.05)',
        'float': '0 4px 12px hsla(0, 0%, 0%, 0.08), 0 12px 32px hsla(0, 0%, 0%, 0.1)',
        'gold': '0 2px 8px hsla(38, 45%, 55%, 0.15)',
        'gold-lg': '0 4px 20px hsla(38, 45%, 55%, 0.22)',
      },
      transitionTimingFunction: {
        'apple': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'apple-bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
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
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-out": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(8px)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.96)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "spring-in": {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "60%": { transform: "scale(1.02)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.25s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
        "fade-out": "fade-out 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
        "scale-in": "scale-in 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
        "slide-up": "slide-up 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
        "spring-in": "spring-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
