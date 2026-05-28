import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#fdf9ec',
          100: '#f9eecc',
          200: '#f2d98a',
          300: '#e8c060',
          400: '#D4AF37',
          500: '#C9A84C',
          600: '#b8932a',
          700: '#9a7820',
          800: '#7d601f',
          900: '#674f1e',
          DEFAULT: '#C9A84C',
          light: '#E8C97A',
          dark:  '#8B7536',
          muted: '#a08832',
        },
        ink: {
          950: '#060606',
          900: '#0a0a0a',
          800: '#111111',
          700: '#1a1a1a',
          600: '#222222',
          500: '#2a2a2a',
          400: '#333333',
          300: '#444444',
        },
        champagne: '#F5E6C8',
      },
      fontFamily: {
        display: ['PPNeueCorp', 'system-ui', 'sans-serif'],
        sans:    ['PPNeueCorp', 'system-ui', 'sans-serif'],
        mono:    ['monospace'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #E8C97A 50%, #C9A84C 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0a0a0a 0%, #111111 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
      },
      boxShadow: {
        'gold-sm':    '0 0 12px rgba(201,168,76,0.15)',
        'gold-md':    '0 0 24px rgba(201,168,76,0.20)',
        'gold-lg':    '0 0 48px rgba(201,168,76,0.18)',
        'card':       '0 4px 32px rgba(0,0,0,0.6)',
        'card-hover': '0 8px 48px rgba(0,0,0,0.8)',
      },
      letterSpacing: {
        widest2: '0.25em',
        widest3: '0.35em',
      },
    },
  },
  plugins: [],
};

export default config;
