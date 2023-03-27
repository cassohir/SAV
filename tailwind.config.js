/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Inter, sans-serif",
      },

      colors: {
        style: {
          100: "#FAFAFA"
        },
        distance: {
          100: "#9fc5e8",
          200: "#93c47d",
          300: "#6aa84f",
          400: "#ffd966",
          500: "#f6b26b", 
          600: "#e06666",

        },
        gray: {
          100: "#E1E1E6",
          300: "#8D8D99",
          600: "#323238",
          800: "#202024",
          900: "#121214",
        },
        blue: {
          300: "#18b6f6",
          500: "#006ce9",
          700: "#07224b",

        },
        purple: {
          500: "#ac7ff4",
          700: "#713fc2",
        },
        red: {
          500: "#ff4848"
        }
      },
    },
  },
  plugins: [],
};