import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        panel: "0 18px 55px -35px rgba(15, 23, 42, 0.45)",
      },
      colors: {
        ink: "#172033",
      },
    },
  },
  plugins: [],
} satisfies Config;
