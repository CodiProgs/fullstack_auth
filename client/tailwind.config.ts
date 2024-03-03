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
        bg: "var(--bg-color)",
        bg_soft: "var(--bg-colorSoft)",
        text: "var(--text-color)",
        text_soft: "var(--text-colorSoft)",
      }
    },
  },
  plugins: [],
};
export default config;
