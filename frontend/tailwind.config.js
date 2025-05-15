/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // tailwind.config.js
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"'],
        quicksand: ['Quicksand'],
      },
      animation: {
          'fade-in': 'fadeIn 0.2s ease-out forwards',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: 0, transform: 'scale(95%)' },
            '100%': { opacity: 1, transform: 'scale(100%)' },
          },
        },
    },
  }
,
  plugins: [],
}
