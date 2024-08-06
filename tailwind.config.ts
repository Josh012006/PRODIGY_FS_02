import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "dark-teal-green" : "#013C3D",
        "teal-green" : "#028585",
        "sea-green" : "#03BBB0",
        "soft-mint": "#E2F8F0",
        "medium-aquamarine" : "#50DEBC"
      },
    },
  },
  plugins: [],
};
export default config;
