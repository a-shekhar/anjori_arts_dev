/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // ✅ default site-wide
        heading: ['"Playfair Display"', 'serif'], // optional for hero or logo
      },
      colors: {
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
        green: {
          600: "#16a34a",
          700: "#15803d",
        },
        red: {
          600: "#dc2626",
          700: "#b91c1c",
        },
        accent: "#f59e0b", // optional highlight color
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out forwards',
        'progress': 'progress 1s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'scale(95%)' },
          '100%': { opacity: 1, transform: 'scale(100%)' },
        },
        progress: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 0%' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
