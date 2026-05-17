import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sluice: {
          navy: "#1D3487",
          deepNavy: "#101422",
          ink: "#1B1B1D",
          paper: "#F2F3F5",
          paperWarm: "#EDEEEE",
          paperMuted: "#E7E7E8",
          routeBlue: "#4A77DC",
          softBlue: "#8990A9",
          muted: "#707380",
        },
      },
      fontFamily: {
        display: ['"DM Serif Display"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      borderRadius: {
        frame: "32px",
        card: "18px",
        pill: "999px",
      },
      transitionTimingFunction: {
        sluice: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      backgroundImage: {
        "paper-grain":
          "radial-gradient(rgba(16, 20, 34, 0.045) 1px, transparent 1px)",
        "top-line":
          "linear-gradient(90deg, #3682D8 0%, #4B68DD 35%, #6550E1 65%, #8B3FE4 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
