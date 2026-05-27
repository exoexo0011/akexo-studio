/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // "Bone & Vermilion" palette
        // ink   = primary background (warm parchment cream)
        // ink2  = alt background (deeper cream)
        // bone  = primary text (warm near-black ink)
        // matrix = single accent (vermilion / hunter orange)
        ink: '#EFE6D2',
        ink2: '#E5DAC0',
        bone: '#0F0E0C',
        matrix: {
          DEFAULT: '#E63B1E',
          dim: '#B82A0F',
          glow: 'rgba(230, 59, 30, 0.45)',
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
          'radial-gradient(ellipse at 50% 40%, rgba(230,59,30,0.14), transparent 65%)',
        'paper-grain':
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.06  0 0 0 0 0.055  0 0 0 0 0.05  0 0 0 0.18 0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.55'/></svg>\")",
      },
    },
  },
  plugins: [],
};
