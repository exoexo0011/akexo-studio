/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // "Cobalt & Cream" v3 palette
        // Token semantics preserved across redesigns:
        //   ink   = primary background  (cream paper)
        //   ink2  = lifted surface       (slightly lighter cream)
        //   bone  = primary text         (deep cobalt — not black)
        //   matrix = primary accent      (electric Klein cobalt)
        //   coral  = rare warm accent    (status pulse only)
        ink: '#F5F0E5',
        ink2: '#FBF5EA',
        bone: '#0E1E66',
        mute: '#5C6892',
        rule: '#D4CFC2',
        matrix: {
          DEFAULT: '#0033FF',
          dim: '#0028CC',
          glow: 'rgba(0, 51, 255, 0.45)',
        },
        coral: '#FF6B47',
      },
      fontFamily: {
        display: ['"Fraunces"', '"Times New Roman"', 'serif'],
        body: ['"Onest"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.025em',
        tighter: '-0.015em',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        spin_slow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(20px, -30px) scale(1.05)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        blink: 'blink 1s steps(2, start) infinite',
        spin_slow: 'spin_slow 60s linear infinite',
        drift: 'drift 14s ease-in-out infinite',
        marquee: 'marquee 50s linear infinite',
      },
    },
  },
  plugins: [],
};
