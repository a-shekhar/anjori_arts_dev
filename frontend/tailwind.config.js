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
    },
  }
,
  plugins: [],
}
