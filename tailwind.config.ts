import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#0F172A",
        sand: "#F8FAFC",
        accent: "#2563EB"
      }
    }
  },
  plugins: []
};

export default config;
