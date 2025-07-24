/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inknut: ['"Inknut Antiqua"', "serif"],
      },
      colors: {
        primary: "#64B000",
        secondary: "#2C2C2C",
        background: "#1E1E1E",
        text: "#D1D0C5",
        alt: "#FFFFFF",
        // Ajoute d'autres couleurs selon ton design
      },
      backgroundImage: {
        "my-gradient": "linear-gradient(to right, #64B000, #D1D0C5, #2C2C2C)",
      },
      borderImage: {
        "gradient-border":
          "linear-gradient(to right, #64B000, #D1D0C5, #2C2C2C)",
      },
    },
  },
  plugins: [],
};
