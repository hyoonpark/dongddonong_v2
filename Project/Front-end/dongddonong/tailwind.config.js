/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: "#EE6730",
      },
      strokeWidth: {
        3: "3px",
        4: "4px",
      },
    },
  },
  plugins: [],
};
