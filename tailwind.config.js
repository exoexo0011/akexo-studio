/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#030303',
        ink2: '#0a0a0a',
        bone: '#f5f5f0',
        matrix: {
          DEFAULT: '#00FF41',
          dim: '#00b82e',
          glow: 'rgba(0, 255, 65, 0.45)',
        },
      },
      fontFamily: {
        display: ['Anton', 'Impact', 'sans-serif'],
        body: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        blink: 'blink 1s steps(2, start) infinite',
        scan: 'scan 8s linear infinite',
        floatY: 'floatY 6s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
      },
      backgroundImage: {
        'grid-fade':
          'radial-gradient(ellipse at 50% 40%, rgba(0,255,65,0.10), transparent 60%)',
      },
    },
  },
  plugins: [],
};
