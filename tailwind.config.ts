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
        navy: {
          DEFAULT: "#0F1B2D",
          light: "#1A2D47",
          50: "#E8EDF4",
          100: "#C5D0E0",
          200: "#9BADC5",
          300: "#7089AA",
          400: "#4F6D95",
          500: "#2E5180",
          600: "#1A2D47",
          700: "#0F1B2D",
          800: "#0A1220",
          900: "#050A13",
        },
        accent: {
          DEFAULT: "#8B2232",
          hover: "#A52A3A",
          light: "#C44D5E",
          50: "#FDF2F4",
          100: "#F9E0E4",
          200: "#F2BFC8",
          300: "#E8939F",
          400: "#D4606F",
          500: "#8B2232",
          600: "#751C2A",
          700: "#5F1622",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          50: "#FAFBFC",
          100: "#F8F9FA",
          200: "#F1F3F5",
          300: "#E8E8ED",
        },
        heading: "#1A1A2E",
        body: "#4A4A68",
        "body-light": "#6B6B8A",
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display": ["3rem", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "display-sm": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(15, 27, 45, 0.04), 0 1px 2px rgba(15, 27, 45, 0.06)",
        card: "0 4px 16px rgba(15, 27, 45, 0.06), 0 1px 3px rgba(15, 27, 45, 0.04)",
        elevated: "0 8px 30px rgba(15, 27, 45, 0.08), 0 2px 8px rgba(15, 27, 45, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
