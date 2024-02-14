/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fff9ed",
          100: "#fef1d6",
          200: "#fddfab",
          300: "#fbc776",
          400: "#f8a43f",
          500: "#f68b1e",
          600: "#e76e0f",
          700: "#bf530f",
          800: "#984214",
          900: "#7b3813",
          950: "#421a08",
        },
        secondary: {
          50: "#f4faf3",
          100: "#e4f5e3",
          200: "#c9eac8",
          300: "#9ed89d",
          400: "#6abe6a",
          500: "#48a948",
          600: "#348534",
          700: "#2c692d",
          800: "#275427",
          900: "#224523",
          950: "#0e2510",
        },
        dark: '#121212'
      },
      fontFamily: {
        clash: ["var(--font-clash)"],
        geist: ["var(--font-geist-sans)"],
      },
    },
    screens: {
      xs: "375px",
      sm: "576px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
      "2xl": "1536px",
    },
    fontSize: {
      xs: ".75rem",
      sm: ".875rem",
      tiny: ".875rem",
      base: "1rem",
      md: "15px",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
    },
  },
  darkMode: "class",
  plugins: [
    require('@tailwindcss/forms'),
    require("tailwindcss/nesting")
  ],
};
