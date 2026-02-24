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
          bg: "#FAF8F4",
          50: "#FFF9F2",
          100: "#F3EDE5",
          200: "#E5DCD2",
          300: "#D1C4B6",
          400: "#B5A899",
          500: "#8B7E72",
          600: "#6B5F54",
          700: "#4A403A",
          800: "#342C27",
          900: "#1F1814",
        },
        primary: {
          DEFAULT: "#1B5E3B",
          light: "#E8F5EE",
          dark: "#14472D",
          50: "#F0FAF4",
        },
        cta: {
          DEFAULT: "#E07832",
          hover: "#CC6A28",
          light: "#FFF3E8",
        },
        positive: "#2D8B57",
        warning: "#D49530",
        critical: "#C94432",
        gold: "#D4A12A",
        muted: "#8B7E72",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 8px rgba(31,24,20,0.06), 0 1px 3px rgba(31,24,20,0.04)",
        card: "0 4px 16px rgba(31,24,20,0.06), 0 2px 6px rgba(31,24,20,0.03)",
        elevated: "0 8px 30px rgba(31,24,20,0.08), 0 4px 12px rgba(31,24,20,0.04)",
      },
    },
  },
  plugins: [],
};
export default config;
