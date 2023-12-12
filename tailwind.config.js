/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primPurple: "#AD31C1",
        primOrange: "#E7A557",
        logoOrange: "#D98970",
      },
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
       },
    },
  },
  plugins: [],
}

