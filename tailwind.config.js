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
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.03em',
      },
      boxShadow: {
        'soft': '0 4px 24px -4px rgba(67, 59, 53, 0.08)',
        'card': '0 8px 32px -8px rgba(67, 59, 53, 0.12), 0 2px 8px -2px rgba(67, 59, 53, 0.06)',
        'card-hover': '0 20px 48px -12px rgba(67, 59, 53, 0.15), 0 8px 16px -6px rgba(103, 93, 84, 0.08)',
        'glow': '0 0 80px -20px rgba(103, 93, 84, 0.35)',
        'inner-light': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.45)',
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
        'float-slow': 'floatSlow 10s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 6s ease-in-out infinite',
        'mesh-shift': 'meshShift 20s ease-in-out infinite',
        'gradient-shift': 'gradientShift 24s ease-in-out infinite',
        'glow-drift': 'glowDrift 16s ease-in-out infinite',
        'glow-drift-slow': 'glowDrift 22s ease-in-out infinite alternate',
        'hero-grid-drift': 'heroGridDrift 48s linear infinite',
        'hero-grid-pulse': 'heroGridPulse 10s ease-in-out infinite',
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
        floatSlow: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(2%, -2%) scale(1.03)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.55' },
        },
        meshShift: {
          '0%, 100%': { opacity: '0.6', transform: 'translate(0, 0) scale(1)' },
          '33%': { opacity: '0.85', transform: 'translate(1.5%, 0.5%) scale(1.015)' },
          '66%': { opacity: '0.7', transform: 'translate(-1%, -1%) scale(1.01)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 40%' },
          '50%': { backgroundPosition: '100% 60%' },
        },
        glowDrift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.85' },
          '50%': { transform: 'translate(2.5%, -3%) scale(1.06)', opacity: '1' },
        },
        heroGridDrift: {
          '0%': { backgroundPosition: '0px 0px, 0px 0px' },
          '100%': { backgroundPosition: '56px 56px, 56px 56px' },
        },
        heroGridPulse: {
          '0%, 100%': { opacity: '0.14' },
          '50%': { opacity: '0.22' },
        },
      },
      backgroundSize: {
        'ambient-mesh-size': '100% 100%',
        'ambient-aurora-size': '220% 220%',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(103, 93, 84, 0.12), transparent)',
        'mesh-warm':
          'radial-gradient(at 40% 20%, rgba(103, 93, 84, 0.09) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(138, 127, 114, 0.08) 0px, transparent 45%), radial-gradient(at 0% 50%, rgba(103, 93, 84, 0.06) 0px, transparent 50%)',
        'ambient-mesh':
          'radial-gradient(at 30% 25%, rgba(103, 93, 84, 0.1) 0px, transparent 42%), radial-gradient(at 75% 15%, rgba(138, 127, 114, 0.09) 0px, transparent 40%), radial-gradient(at 15% 70%, rgba(103, 93, 84, 0.07) 0px, transparent 48%), radial-gradient(at 85% 75%, rgba(122, 111, 100, 0.06) 0px, transparent 45%)',
        'ambient-aurora':
          'linear-gradient(125deg, rgba(103, 93, 84, 0.07) 0%, transparent 28%, rgba(235, 232, 227, 0.15) 42%, transparent 58%, rgba(138, 127, 114, 0.08) 72%, transparent 88%, rgba(103, 93, 84, 0.05) 100%)',
        'shine-edge':
          'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 45%, transparent 100%)',
      },
      /* טבעות פוקוס ברירת מחדל — לא כחול Tailwind */
      ringColor: {
        DEFAULT: '#675d54',
      },
    },
  },
  plugins: [],
}
