/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			sreens: {
				sm: "320px",
				md: "768px",
				lg: "1024px",
				xl: "1280px",
				"2xl": "1536px",
			},
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
};
