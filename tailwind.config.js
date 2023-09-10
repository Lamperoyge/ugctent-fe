module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateRows: {
        profileLayoutMobile: "repeat(10, minmax(150px, 1fr))",
        profileLayout: "repeat(5, minmax(150px, 1fr))",
      },
      colors: {
        primary: "#001E6C",
        secondary: "#035397",
        primaryOrange: "#E8630A",
        primaryYellow: "#FCD900",
        ugcblue: '#233060',
        vista: '#fcfbfa',
        vistaDark: '#d4cecb',
        ugcGreen: '#2A8D5C'
      },
      minWidth: {
        '1/2': '50%',
        '1/3': '33%',
        '1/4': '25%',
        '1/5': '20%',
        '40': '40%',
        '30': '30%',
      },
      maxWidth: {
        "1/1.3":"75%",
        "1/2": "50%",
        "1/3": "33%",
        "1/4": "25%",
        "1/5": "20%",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
};
