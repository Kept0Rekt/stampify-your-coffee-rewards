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
        // Emerald palette
        emerald: {
          DEFAULT: "hsl(158 64% 52%)",
          light: "hsl(158 60% 65%)",
          dark: "hsl(165 50% 40%)",
        },
        // Semantic colors
        success: {
          DEFAULT: "hsl(158 64% 52%)",
          light: "hsl(158 60% 65%)",
        },
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
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      fontSize: {
        'xs': ['11px', { lineHeight: '1.4', letterSpacing: '0.01em' }],
        'sm': ['13px', { lineHeight: '1.45', letterSpacing: '-0.003em' }],
        'base': ['15px', { lineHeight: '1.5', letterSpacing: '-0.009em' }],
        'lg': ['17px', { lineHeight: '1.4', letterSpacing: '-0.014em' }],
        'xl': ['20px', { lineHeight: '1.35', letterSpacing: '-0.017em' }],
        '2xl': ['24px', { lineHeight: '1.3', letterSpacing: '-0.019em' }],
        '3xl': ['32px', { lineHeight: '1.2', letterSpacing: '-0.021em' }],
        '4xl': ['40px', { lineHeight: '1.15', letterSpacing: '-0.023em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        'safe': 'env(safe-area-inset-bottom)',
      },
      boxShadow: {
        'soft': '0 2px 8px hsla(0, 0%, 0%, 0.08)',
        'elevated': '0 4px 20px hsla(0, 0%, 0%, 0.12)',
        'float': '0 8px 32px hsla(0, 0%, 0%, 0.16)',
        'emerald': '0 4px 16px hsla(158, 64%, 52%, 0.25)',
        'emerald-lg': '0 8px 32px hsla(158, 64%, 52%, 0.35)',
        'inner-soft': 'inset 0 1px 2px hsla(0, 0%, 0%, 0.06)',
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
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
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
        "shimmer": "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
