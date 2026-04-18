import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        // Chikun's noir palette
        ink: {
          950: "#030508",
          900: "#05070a",
          800: "#0a0d12",
          700: "#10141b",
          600: "#181d26",
          500: "#232936"
        },
        bone: {
          50: "#fafafa",
          100: "#f5f3ef",
          200: "#e8e4db"
        },
        // LTC green — the glow
        glow: {
          400: "#9bffb0",
          500: "#5cff85",
          600: "#2ee862",
          700: "#1fb84d"
        },
        // Oxblood — the red lining accent
        blood: {
          500: "#a51c2c",
          600: "#7e1220",
          700: "#58091a"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        graffiti: ["var(--font-graffiti)", "cursive"]
      },
      animation: {
        "flicker": "flicker 3s ease-in-out infinite",
        "rain": "rain 8s linear infinite",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
        "scroll-x": "scroll-x 60s linear infinite",
        "scroll-x-reverse": "scroll-x-reverse 75s linear infinite",
        "marquee": "marquee 40s linear infinite"
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1" },
          "45%": { opacity: "1" },
          "50%": { opacity: "0.4" },
          "55%": { opacity: "1" }
        },
        rain: {
          "0%": { transform: "translateY(-10%)" },
          "100%": { transform: "translateY(110%)" }
        },
        "glow-pulse": {
          "0%, 100%": { filter: "drop-shadow(0 0 8px rgb(92 255 133 / 0.6))" },
          "50%": { filter: "drop-shadow(0 0 20px rgb(92 255 133 / 0.9))" }
        },
        "scroll-x": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        "scroll-x-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" }
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" }
        }
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
        "scanlines": "repeating-linear-gradient(0deg, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 3px)"
      }
    }
  },
  plugins: []
};

export default config;
