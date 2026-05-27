/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // "Aurora Noir" v4 palette — kling.ai inspired
        // Token semantics preserved across the v3 → v4 redesign so most
        // markup keeps working untouched. Only the values changed:
        //   ink   = primary background  (true near-black)
        //   ink2  = lifted surface      (a hair brighter than ink)
        //   bone  = primary text        (pure white)
        //   mute  = secondary text      (cool light gray)
        //   matrix = primary accent     (electric violet)
        //   coral  = warm pulse accent  (rose-pink)
        ink: '#050507',
        ink2: '#0B0B14',
        ink3: '#14141F',
        bone: '#FFFFFF',
        mute: '#A4A4B5',
        rule: '#1F1F2A',
        matrix: {
          DEFAULT: '#A78BFA',
          dim: '#7C3AED',
          deep: '#5B21B6',
          glow: 'rgba(167, 139, 250, 0.5)',
        },
        coral: '#F472B6',
        // Brand gradient stops, exported so per-component gradients can be
        // composed via Tailwind utilities (from-violet via-indigo to-pink).
        violet: '#8B5CF6',
        indigo: '#6366F1',
        pink: '#EC4899',
        rose: '#F472B6',
      },
      fontFamily: {
        // Display: bold sans with personality (variable, can tighten optical
        // size at huge display weights). Replaces Fraunces serif entirely.
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        body: ['"Manrope"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.045em',
        tighter: '-0.025em',
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
          '33%': { transform: 'translate(40px, -30px) scale(1.08)' },
          '66%': { transform: 'translate(-30px, 20px) scale(0.95)' },
        },
        drift_slow: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-50px, 40px) scale(1.1)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        gradient_shift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        // Slow scale pulse used by the footer brand dot. Keeps the violet
        // glow alive without ever quite catching the eye — peaks at 1.2x
        // halfway through the 2s loop, returns to 1.0 at the boundaries.
        pulse_glow: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
        // Halo pulse — animates the box-shadow only, leaving transform
        // free for hover scale. Used on the footer's "back to top" button
        // so the violet halo around it gently breathes without fighting
        // the hover:scale-110 transform.
        halo_pulse: {
          '0%, 100%': {
            boxShadow:
              '0 0 16px rgba(139, 92, 246, 0.35), 0 0 32px rgba(139, 92, 246, 0.12)',
          },
          '50%': {
            boxShadow:
              '0 0 24px rgba(139, 92, 246, 0.65), 0 0 48px rgba(139, 92, 246, 0.30)',
          },
        },
      },
      animation: {
        blink: 'blink 1s steps(2, start) infinite',
        spin_slow: 'spin_slow 60s linear infinite',
        drift: 'drift 22s ease-in-out infinite',
        drift_slow: 'drift_slow 30s ease-in-out infinite',
        marquee: 'marquee 50s linear infinite',
        gradient_shift: 'gradient_shift 8s ease-in-out infinite',
        pulse_glow: 'pulse_glow 2s ease-in-out infinite',
        halo_pulse: 'halo_pulse 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
