/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        rcb: {
          // Obsidian Pitch-Black — canvas background
          black: '#08080A',
          // Panel surface — cards & containers
          panel: '#121216',
          // RCB Crimson — primary accent
          red: '#EC0C16',
          'red-dark': '#D1040A',
          // Fiery Light Red — gradient partner for crimson
          magenta: '#FF1E27',
          // Electric Cyan — interactive highlight
          cyan: '#00E5FF',
          'cyan-dark': '#00B8CC',
          // Laser Gold — secondary accent
          gold: '#FFD23F',
          'gold-dark': '#E0B800',
          // Hyper White — primary text
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 0 1px rgba(255,255,255,0.08)' },
          '50%': { boxShadow: '0 0 0 1px rgba(236,12,22,0.35)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        glowPulse: 'glowPulse 3s ease-in-out infinite',
        fadeInUp: 'fadeInUp 0.6s ease-out forwards',
      },
      backgroundImage: {
        'crimson-gradient':
          'linear-gradient(135deg, #FF1E27 0%, #D1040A 100%)',
        'cyan-gradient':
          'linear-gradient(135deg, #00E5FF 0%, #00B8CC 100%)',
      },
    },
  },
  plugins: [],
};
