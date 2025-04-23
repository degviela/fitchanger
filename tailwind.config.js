/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      keyframes: {
        'draw-border': {
          '0%': { width: '0%', height: '0%' },
          '50%': { width: '100%', height: '0%' },
          '100%': { width: '100%', height: '100%' },
        },
      },
      animation: {
        'draw-border': 'draw-border 0.3s ease-out forwards',
      },
    },
  },
  variants: {
    extend: {
      animation: ['group-hover'],
    },
  },
  plugins: [],
};

