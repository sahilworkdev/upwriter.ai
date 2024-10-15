import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(0deg, #0A0A0D, #0A0A0D), linear-gradient(90deg, #000000 19.96%, rgba(124, 101, 252, 0.5) 39.86%, rgba(152, 234, 114, 0.5) 58.21%, #000000 80.96%)',
      },
      fontFamily:{
        Inter: ["Inter", "sans-serif"]
      },
     
      colors : {
        gray:{
          50:"#6B7280",
          100: "#E2E8F0" ,
          200: "#4B4B50"
        },
        primary: {
          default: "#6366F1",
          disabled: "#989898",
          hover: "#474BFF",
          light: '#1C1C25',
          green: "#A6FF7C"
        },
        secondary: {
          default: "#475569",
          disabled: "#989898",
          hover: "#394351"
        },
        text: {
          primary: "#111827",
          third: "#B9B9BB",
          light: "#E8E8E9"
        } 

      }
    },
  },
  plugins: [],
};
export default config;
