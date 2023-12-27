/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "globe-main": "#e67800",
        "globe-text": {
          100: "#a3a3a3",
          200: "#737373",
          300: "#222222",
        },
      },
    },
  },
  plugins: [],
};
