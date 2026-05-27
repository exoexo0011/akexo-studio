import { motion } from 'framer-motion';

/**
 * AmbientLayer — replaces the old ParticleGrid.
 *
 * Editorial direction: no particles, no halftones. Just three quiet decorative
 * elements that breathe slowly and read as a magazine cover backdrop:
 *   1. A huge cobalt circle outline, slowly rotating (decorative, like a
 *      magazine cover sticker)
 *   2. A soft drifting cobalt blob (low-opacity, gentle parallax)
 *   3. Subtle paper grain across the whole field
 *
 * Component name kept as ParticleGrid.jsx to avoid a noisy import refactor;
 * the default export is the new AmbientLayer.
 */
export default function ParticleGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* paper grain */}
      <div className="absolute inset-0 paper-grain opacity-70" />

      {/* drifting cobalt blob (bottom-right) */}
      <motion.div
        aria-hidden
        animate={{
          x: [0, 30, -10, 0],
          y: [0, -20, 10, 0],
          scale: [1, 1.08, 0.96, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-32 -bottom-32 h-[42rem] w-[42rem] rounded-full opacity-50"
        style={{
          background:
            'radial-gradient(circle, rgba(0,51,255,0.18) 0%, rgba(0,51,255,0.08) 35%, transparent 70%)',
          filter: 'blur(2px)',
        }}
      />

      {/* secondary blob (top-left) */}
      <motion.div
        aria-hidden
        animate={{
          x: [0, -20, 10, 0],
          y: [0, 25, -15, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full opacity-40"
        style={{
          background:
            'radial-gradient(circle, rgba(255,107,71,0.12) 0%, transparent 65%)',
          filter: 'blur(8px)',
        }}
      />

      {/* big rotating cobalt ring — magazine cover stamp */}
      <motion.svg
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        className="absolute -right-24 top-20 h-[28rem] w-[28rem] opacity-25 hidden md:block"
        viewBox="0 0 400 400"
      >
        <defs>
          <path
            id="ring-text"
            d="M 200, 200 m -160, 0 a 160,160 0 1,1 320,0 a 160,160 0 1,1 -320,0"
          />
        </defs>
        <circle
          cx="200"
          cy="200"
          r="160"
          stroke="#0033FF"
          strokeWidth="1"
          fill="none"
        />
        <circle
          cx="200"
          cy="200"
          r="120"
          stroke="#0033FF"
          strokeWidth="1"
          fill="none"
          strokeDasharray="2 6"
        />
        <text
          fill="#0033FF"
          fontFamily="JetBrains Mono, monospace"
          fontSize="13"
          letterSpacing="6"
        >
          <textPath href="#ring-text" startOffset="0">
            AKEXO · SOLO STUDIO · EST. 2024 · BUILDING WITH AI · AKEXO ·
            SOLO STUDIO · EST. 2024 ·{' '}
          </textPath>
        </text>
      </motion.svg>

      {/* edge fade so the hero handoff feels seamless */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
    </div>
  );
}
