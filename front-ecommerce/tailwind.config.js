/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '550px',
      },
      colors: {
        main: '#DAA8A7',
        mainn: '#eAA8A7',
      },
      height: {
        fullnav: 'calc(100svh - 100px)',
        fullnavmb: 'calc(100svh - 70px)',
      },
      margin: {
        fullnav: 'calc(100svh - 100px)',
        fullnavmb: 'calc(100svh - 70px)',
      },
      fontFamily: {
        nobia: "Nobia"
      }
    },
  },
  plugins: [],
}