module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#001E6C',
        secondary: '#035397',
        primaryOrange: '#E8630A',
        primaryYellow: '#FCD900',
      },
      minWidth: {
        '1/2': '50%',
        '1/3': '33%',
        '1/4': '25%',
        '1/5': '20%',
      },
      maxWidth: {
        '1/2': '50%',
        '1/3': '33%',
        '1/4': '25%',
        '1/5': '20%',
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
