import type { Config } from "tailwindcss";

const colors = {
  main1: "#B2DBCB",
  main2: "#8AC2AC",
  main3: "#DAF5EA",
  main4: "#67A88F",
  main5: "#518E77",
  main6: "#30755B",
  main7: "#1C5C44",
  main8: "#0E422E",
  main9: "#063322",
  main10: "#013320",
  main11: "#1d809f",
  main12: "#186379FF",
};
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    listStyleType: {
      none: "none",
      disc: "disc",
      decimal: "decimal",
      square: "square",
      roman: "upper-roman",
    },

    extend: {
      height: {
        screen: "100dvh",
      },
      width: {
        screen: "100dvw",
      },
      keyframes: {},
      animation: {},
      colors: {
        ...colors,
      },
      backgroundColor: {
        ...colors,
      },
    },
  },
  plugins: [],
} satisfies Config;
