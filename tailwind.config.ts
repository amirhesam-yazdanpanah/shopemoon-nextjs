import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#f7f1e6",
          dark: "#efe6d4",
        },
        navy: {
          DEFAULT: "#1b2330",
          soft: "#2a3344",
          dark: "#0f141d",
        },
        gold: {
          DEFAULT: "#c9a25d",
          soft: "#ecddbf",
          light: "#d8b876",
        },
      },
      fontFamily: {
        body: ["var(--font-body)"],
        display: ["var(--font-display)"],
      },
      borderRadius: {
        xl2: "20px",
      },
      boxShadow: {
        soft: "0 12px 30px rgba(27, 35, 48, 0.08)",
        card: "0 6px 18px rgba(27, 35, 48, 0.07)",
      },
    },
  },
  plugins: [],
};

export default config;
