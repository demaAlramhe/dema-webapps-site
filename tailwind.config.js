/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        display: ['Clash Display', 'Outfit', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eef7ff',
          100: '#d9ecff',
          200: '#bcdeff',
          300: '#8ecaff',
          400: '#59adff',
          500: '#338cfa',
          600: '#1d6ef0',
          700: '#1658dd',
          800: '#1846b3',
          900: '#193d8d',
          950: '#142756',
        },
        dark: {
          900: '#0a0a0f',
          800: '#12121a',
          700: '#1a1a24',
          600: '#24242f',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(51, 140, 250, 0.15), transparent)',
      },
    },
  },
  plugins: [],
}
