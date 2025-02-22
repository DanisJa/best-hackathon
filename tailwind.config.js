/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans], // Use Inter as the default sans-serif font
      },
      colors: {
        themeGray: {
          100: "#f5f5f5",
          200: "#e0e0e0",
          300: "#cccccc",
          400: "#b3b3b3",
          500: "#999999",
          600: "#808080",
          700: "#666666",
          800: "#4d4d4d",
          900: "#333333",
        },
        gradientGreen: {
          500: "#3DFF94",
          900: "#B9FF5E",
        },
        primary: {
          500: "#b2bCF5",
        },
      },
    },
  },
  plugins: [],
};
