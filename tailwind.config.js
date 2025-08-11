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
        secondary: "#1E251A",
        tertiaire: "#c6cc09",
        background: "#1A1F16",
        danger: "#D67229",
        text: "#FFFFFF",
      },
      backgroundImage: {
        "my-gradient": "linear-gradient(to right, #C6CC09, #64B000, #00BDB4)",
      },
      borderImage: {
        "gradient-border":
          "linear-gradient(to right, #C6CC09, #64B000 , #00BDB4)",
      },
      boxShadow: {
        custom: "0 0 10px 5px #64B000",
      },
    },
  },
  plugins: [],
};
