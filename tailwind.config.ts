import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        Inter: ["Inter", "sans-serif"]
      },
      colors : {
        gray:{
          50:"#6B7280",
          100: "#E2E8F0" 
        },
        primary: {
          default: "#6366F1",
          disabled: "#989898",
          hover: "#474BFF",
          light: '#F7F9FF'
        },
        secondary: {
          default: "#475569",
          disabled: "#989898",
          hover: "#394351"
        },
        text: {
          primary: "#111827",
          third: "#64748B"
        } 

      }
    },
  },
  plugins: [],
};
export default config;
