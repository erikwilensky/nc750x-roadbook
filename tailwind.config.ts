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
        cream: "#F7F1E5",
        paper: "#FFFDF7",
        forest: "#173D32",
        forest2: "#245A48",
        gold: "#C9A24A",
        ink: "#1C1C1A",
        muted: "#6F6A5F",
        line: "#E6DCC5",
      },
      borderRadius: {
        card: "24px",
      },
      boxShadow: {
        card: "0 4px 24px rgba(23, 61, 50, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
