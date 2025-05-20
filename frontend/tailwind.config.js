/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"'],
        quicksand: ['Quicksand'],
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out forwards',
        'progress': 'progress 1s linear infinite', // ✅ NEW shimmer animation
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'scale(95%)' },
          '100%': { opacity: 1, transform: 'scale(100%)' },
        },
        progress: { // ✅ NEW shimmer effect
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 0%' },
        },
      },
    },
  },
  plugins: [],
};
