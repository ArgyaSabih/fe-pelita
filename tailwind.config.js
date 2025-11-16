const plugin = require("tailwindcss/plugin");
const { extendedColor } = require("./src/utils/extendedColors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: extendedColor,
      screens: {
        xs: "560px",
        xxs: "440px",
      },
      fontFamily: {
        "adlam-display-regular": ["var(--font-adlam-display-regular)"],
        "farro-bold": ["var(--font-farro-bold)"],
        "farro-regular": ["var(--font-farro-regular)"],
        "farro-medium": ["var(--font-farro-medium)"],
      },
    },
  },
  plugins: [],
};
