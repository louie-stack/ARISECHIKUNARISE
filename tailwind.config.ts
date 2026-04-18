import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        // Chikun's section palette — mirrors Mew's red/black/white logic
        // but with Litecoin blue as the dominant hue
        blue: {
          DEFAULT: "#2B5FAD",     // primary section background
          dark: "#1E4480",        // hover / darker variant
          light: "#4A7BC8"        // highlight variant
        },
        ink: {
          DEFAULT: "#0A0A0F",     // pure black sections
          soft: "#14141C"
        },
        bone: {
          DEFAULT: "#F5F3EF",     // off-white sections
          soft: "#EDEBE4"
        },
        mint: {
          DEFAULT: "#C5F5E4",     // pale button color (Mew's pink equivalent)
          dark: "#A8E8D1"
        },
        glow: {
          DEFAULT: "#2EE862",     // accent / ecosystem button (Mew's green)
          soft: "#5CFF85",
          deep: "#1FB84D"
        },
        blood: {
          DEFAULT: "#C41E3A"      // reserved for spray-paint graffiti overlays
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        spray: ["var(--font-spray)", "cursive"]
      },
      animation: {
        "marquee": "marquee 30s linear infinite",
        "marquee-slow": "marquee 60s linear infinite",
        "spin-slow": "spin 20s linear infinite",
        "scroll-x": "scroll-x 60s linear infinite",
        "scroll-x-reverse": "scroll-x-reverse 60s linear infinite",
        "wiggle": "wiggle 3s ease-in-out infinite"
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        "scroll-x": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        "scroll-x-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" }
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-1deg)" },
          "50%": { transform: "rotate(1deg)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
