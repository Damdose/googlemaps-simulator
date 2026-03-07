import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        warm: {
          bg: "#F7F3ED",
          50: "#FAF8F4",
          100: "#F0EBE3",
          200: "#E3DCD2",
          300: "#D1C7BA",
          400: "#B5A899",
          500: "#8B7E72",
          600: "#6B5F54",
          700: "#4A403A",
          800: "#342C27",
          900: "#1A1714",
        },
        accent: {
          DEFAULT: "#F0C75E",
          hover: "#E8BD4A",
          light: "#FDF8E8",
          dark: "#D4A82E",
        },
        dark: {
          DEFAULT: "#1A1714",
          light: "#2D2924",
          muted: "#4A403A",
        },
        primary: {
          DEFAULT: "#1A1714",
          light: "#F0EBE3",
          dark: "#0F0D0A",
          50: "#FAF8F4",
        },
        cta: {
          DEFAULT: "#1A1714",
          hover: "#2D2924",
          light: "#F0EBE3",
        },
        positive: "#2D8B57",
        warning: "#D49530",
        critical: "#C94432",
        gold: "#F0C75E",
        muted: "#8B7E72",
      },
      fontFamily: {
        sans: ["'Switzer'", "Arial", "sans-serif"],
        heading: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-instrument-serif)", "Georgia", "serif"],
      },
      fontSize: {
        "display-xl": ["5rem", { lineHeight: "1.1", letterSpacing: "-0.0625em", fontWeight: "300" }],
        "display-lg": ["4.25rem", { lineHeight: "1.1", letterSpacing: "-0.05em", fontWeight: "300" }],
        "display": ["3rem", { lineHeight: "1.12", letterSpacing: "-0.02em", fontWeight: "300" }],
        "heading-xl": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.015em", fontWeight: "300" }],
        "heading-lg": ["1.875rem", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "600" }],
        "heading": ["1.5rem", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "300" }],
        "heading-mobile": ["1.875rem", { lineHeight: "1.2", letterSpacing: "-0.015em", fontWeight: "300" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7", fontWeight: "400" }],
        "body": ["1rem", { lineHeight: "1.7", fontWeight: "400" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6", fontWeight: "400" }],
      },
      boxShadow: {
        soft: "0 2px 8px rgba(26,23,20,0.04), 0 1px 3px rgba(26,23,20,0.03)",
        card: "0 4px 20px rgba(26,23,20,0.06), 0 2px 8px rgba(26,23,20,0.03)",
        elevated: "0 8px 30px rgba(26,23,20,0.08), 0 4px 12px rgba(26,23,20,0.04)",
        glow: "0 0 40px rgba(240,199,94,0.2)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
        "marquee": "marquee 30s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
