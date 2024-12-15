/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        }
      },
      boxShadow: {
        'glow-light': '0 0 20px rgba(34, 197, 94, 0.2)',
        'glow-dark': '0 0 20px rgba(74, 222, 128, 0.2)',
      },
      backgroundImage: {
        'gradient-border-light': 'linear-gradient(to right, #22c55e, #16a34a)',
        'gradient-border-dark': 'linear-gradient(to right, #4ade80, #22c55e)',
      },
    },
  },
  plugins: [],
};