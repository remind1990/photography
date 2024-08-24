import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'custom-gradient': 'linear-gradient(135deg, #FFEDD5, #FFFAF0)',
      },
      keyframes: {
        extends: {
          from: { width: '0' },
          to: { width: '100%' },
        },
        blink: {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: 'black' },
        },
        moveX: {
          from: { transform: 'translateX(50px)' },
          to: { transform: 'translateX(0)' },
        },
      },
      animation: {
        extends: 'extends 1s steps(50, end) forwards',
        blink: 'blink 1s step-end infinite',
        moveX: 'moveX 1s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};
export default config;
