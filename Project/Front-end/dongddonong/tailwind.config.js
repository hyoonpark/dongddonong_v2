/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#EE6730",
        secondary: "#e6e6e6",
      },
      strokeWidth: {
        3: "3px",
        4: "4px",
      },
      fontFamily: {
        anton: "anton",
      },
    },
  },
  plugins: [],
};
