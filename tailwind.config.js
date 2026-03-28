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
        // רקע ראשי מהלוגו
        page: '#dad7d1',
        surface: {
          DEFAULT: '#dad7d1',
          alt: '#d2cdc6',
          card: '#e8e5e0',
          elevated: '#efede9',
        },
        // טקסט: גוונים חומים בלבד (ללא שחור / כחול)
        ink: {
          DEFAULT: '#433b35',
          muted: '#5e564e',
          subtle: '#7a726a',
        },
        // מותג = צבע הכפתורים מהלוגו + גוונים תואמים
        brand: {
          50: '#f7f6f4',
          100: '#ebe8e3',
          200: '#d9d4cc',
          300: '#c4bdb2',
          400: '#8a7f72',
          500: '#7a6f64',
          600: '#675d54',
          700: '#5a5149',
          800: '#4d4540',
          900: '#3d3732',
          950: '#2c2620',
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
        'hero-pattern': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(103, 93, 84, 0.12), transparent)',
      },
      /* טבעות פוקוס ברירת מחדל — לא כחול Tailwind */
      ringColor: {
        DEFAULT: '#675d54',
      },
    },
  },
  plugins: [],
}
