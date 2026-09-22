/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Warm dark base
        espresso: {
          950: '#0e0a06',
          900: '#15100a',
          800: '#1f1710',
          700: '#2a1f14',
          600: '#3a2a1a',
          500: '#5a3e26',
        },
        // Saffron gold ramp
        saffron: {
          50: '#fff7e6',
          100: '#fdeec9',
          200: '#f9dd93',
          300: '#f5d27a',
          400: '#e8a838',
          500: '#c9882a',
          600: '#a36a1d',
          700: '#7a4a1f',
          800: '#5a3618',
          900: '#3d2410',
        },
        // Persian red / crimson accent
        crimson: {
          400: '#d94a3f',
          500: '#c9352f',
          600: '#a8281f',
          700: '#841f18',
        },
        // Warm cream text
        cream: {
          50: '#fff7e6',
          100: '#f5ecdc',
          200: '#e8dcc4',
          300: '#c9b894',
          400: '#9a8a6e',
          500: '#6f6149',
        },
        teal: {
          400: '#2db39a',
          500: '#1f9c87',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '88rem',
      },
      boxShadow: {
        gold: '0 10px 40px -10px rgba(232, 168, 56, 0.35)',
        'gold-lg': '0 24px 60px -15px rgba(232, 168, 56, 0.4)',
        inset: 'inset 0 1px 0 0 rgba(245, 210, 122, 0.12)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
