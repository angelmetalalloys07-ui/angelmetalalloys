import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — Angel Metal & Alloys
        navy: {
          DEFAULT: "#0a1628",
          50: "#e8edf5",
          100: "#c5d0e6",
          200: "#9fb1d5",
          300: "#7892c4",
          400: "#5478b6",
          500: "#1a3a6b",
          600: "#152f58",
          700: "#0f2345",
          800: "#0a1628",
          900: "#050b14",
        },
        steel: {
          DEFAULT: "#1a3a6b",
          light: "#2a5090",
          dark: "#0f2345",
        },
        gold: {
          DEFAULT: "#d4922a",
          light: "#f0b44c",
          lighter: "#f7d08a",
          dark: "#b87820",
        },
        silver: {
          DEFAULT: "#c0c8d8",
          light: "#e8ecf4",
          dark: "#8a94a8",
        },
        brand: {
          bg: "#f4f6fa",
          text: "#0a1628",
        },
        // shadcn/ui semantic tokens
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-rajdhani)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-2xl": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-xl": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["3rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-md": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        "display-sm": ["1.875rem", { lineHeight: "1.25" }],
      },
      backgroundImage: {
        "gradient-navy": "linear-gradient(135deg, #0a1628 0%, #1a3a6b 50%, #0f2345 100%)",
        "gradient-gold": "linear-gradient(135deg, #d4922a 0%, #f0b44c 100%)",
        "gradient-hero": "linear-gradient(135deg, #050b14 0%, #0a1628 40%, #1a3a6b 100%)",
        "gradient-card": "linear-gradient(180deg, rgba(10,22,40,0.9) 0%, rgba(26,58,107,0.7) 100%)",
        "mesh-pattern": "radial-gradient(circle at 20% 80%, rgba(212,146,42,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(26,58,107,0.15) 0%, transparent 50%)",
      },
      boxShadow: {
        "gold-glow": "0 0 30px rgba(212, 146, 42, 0.3)",
        "navy-deep": "0 25px 50px rgba(10, 22, 40, 0.5)",
        "card-hover": "0 20px 40px rgba(10, 22, 40, 0.15)",
        "glass": "0 8px 32px rgba(10, 22, 40, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "slide-in-right": "slideInRight 0.5s ease-out forwards",
        "slide-in-left": "slideInLeft 0.5s ease-out forwards",
        "scale-in": "scaleIn 0.4s ease-out forwards",
        "pulse-gold": "pulseGold 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "marquee": "marquee 40s linear infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(212, 146, 42, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(212, 146, 42, 0.6)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      transitionTimingFunction: {
        "smooth-out": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
