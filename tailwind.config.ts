import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F5EFE3',
        'warm-white': '#FBF8F2',
        sage: '#A8B89A',
        'sage-light': '#C9D4BC',
        'sage-dark': '#7E906F',
        forest: '#2F4A3E',
        'forest-deep': '#1F3329',
        beige: '#E0D7C7',
        peach: '#F0DBC8',
        'peach-soft': '#F8E8DA',
        charcoal: '#1A1A1A',
        'charcoal-soft': '#2D2D2D',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'float-a': 'float-a 5.5s ease-in-out infinite',
        'float-b': 'float-b 6.5s ease-in-out infinite',
        'float-c': 'float-c 4.8s ease-in-out infinite',
        'float-d': 'float-d 5.8s ease-in-out infinite',
      },
      keyframes: {
        'float-a': {
          '0%,100%': { transform: 'translateY(0) rotate(-2deg)' },
          '50%': { transform: 'translateY(-10px) rotate(-2.5deg)' },
        },
        'float-b': {
          '0%,100%': { transform: 'translateY(0) rotate(1.5deg)' },
          '50%': { transform: 'translateY(-14px) rotate(2deg)' },
        },
        'float-c': {
          '0%,100%': { transform: 'translateY(0) rotate(-1deg)' },
          '50%': { transform: 'translateY(-8px) rotate(-0.5deg)' },
        },
        'float-d': {
          '0%,100%': { transform: 'translateY(0) rotate(2deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2.5deg)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;