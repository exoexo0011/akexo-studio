/* === Tech-stack registry ===
   Each key is the label that gets rendered; the value is the brand color
   used for the leading dot (and for its halo). Picked the most
   recognizable wordmark color per tech — the dot doubles as a tiny logo
   so the whole pill stays compact and readable in a moving strip. */
const TECHS = {
  // Row 1 — frontend & languages
  React: '#61DAFB',
  'Next.js': '#FFFFFF',
  TypeScript: '#3178C6',
  Tailwind: '#38BDF8',
  Vite: '#646CFF',
  'Framer Motion': '#0055FF',
  'React Native': '#61DAFB',
  HTML: '#E34F26',
  // Row 2 — backend, AI, infra
  'Node.js': '#5FA04E',
  Python: '#FFD43B',
  OpenAI: '#10A37F',
  Claude: '#DA7757',
  Supabase: '#3ECF8E',
  PostgreSQL: '#336791',
  Vercel: '#FFFFFF',
  Stripe: '#635BFF',
  N8N: '#EA4B71',
};

/* The two rows scroll in opposite directions to give the strip a
   "weave" feel. Order inside each row is mostly editorial — start with
   the most recognizable mark so the brand-color dot reads instantly. */
const ROW_TOP = [
  'React',
  'Next.js',
  'TypeScript',
  'Tailwind',
  'Vite',
  'Framer Motion',
  'React Native',
  'HTML',
];

const ROW_BOTTOM = [
  'Node.js',
  'Python',
  'OpenAI',
  'Claude',
  'Supabase',
  'PostgreSQL',
  'Vercel',
  'Stripe',
  'N8N',
];

/* TechPill
   Single rounded chip in the marquee row.
   - Resting:  white/5 fill, white/10 border, monospace caps, 70% bone text
   - Hovered:  scales up 5%, fill shifts to violet/15, border to violet/50,
               and a 18px violet halo blooms via box-shadow
   The leading dot carries the tech's brand color and gets its own soft
   color-matched halo so the pill reads as instantly identifiable even at
   speed. */
function TechPill({ name, color }) {
  return (
    <span
      className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-bone/70 backdrop-blur-sm transition-all duration-300 ease-out hover:scale-[1.06] hover:border-violet-400/55 hover:bg-violet-500/15 hover:text-bone hover:shadow-[0_0_22px_rgba(139,92,246,0.55)]"
    >
      <span
        aria-hidden="true"
        className="block h-1.5 w-1.5 shrink-0 rounded-full"
        style={{
          background: color,
          /* Two-pass color-matched halo. The hex+alpha trick (`${color}66`
             ≈ 40%, `${color}33` ≈ 20%) only works because every value
             in TECHS is a 6-digit #RRGGBB literal. */
          boxShadow: `0 0 6px ${color}66, 0 0 12px ${color}33`,
        }}
      />
      {name}
    </span>
  );
}

/* MarqueeRow
   Renders one infinitely-looping row.
   - We duplicate the items array (`[...items, ...items]`) so when the
     translateX(-50%) keyframe completes, the second copy is sitting in
     exactly the same place the first copy started — visually seamless.
   - `duration` overrides the Tailwind animation default (50s) inline.
   - `reverse` flips animation-direction so the row scrolls the other
     way without needing a second keyframe. */
function MarqueeRow({ items, duration, reverse = false }) {
  const loop = [...items, ...items];
  return (
    <div
      className="flex w-max animate-marquee gap-6 whitespace-nowrap will-change-transform"
      style={{
        animationDuration: `${duration}s`,
        animationDirection: reverse ? 'reverse' : 'normal',
      }}
    >
      {loop.map((name, i) => (
        <TechPill key={`${name}-${i}`} name={name} color={TECHS[name]} />
      ))}
    </div>
  );
}

/* Marquee
   The whole strip. The horizontal mask-image fades content in/out at
   both edges so pills don't pop in and out abruptly — the gradient
   stops at 10% / 90% give a generous fade without eating too much of
   the visible row. -webkit-mask-image is set alongside mask-image for
   Safari, which still requires the prefix for masks on non-SVG
   content. */
export default function Marquee() {
  const fadeMask =
    'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)';

  return (
    <section
      aria-label="Tech stack"
      className="relative overflow-hidden border-y border-white/[0.06] bg-white/[0.015] py-6 backdrop-blur-md"
      style={{
        WebkitMaskImage: fadeMask,
        maskImage: fadeMask,
      }}
    >
      {/* Two rows stacked with a small vertical gap. Top row scrolls
          left at 25s; bottom row scrolls right at 30s — the duration
          delta is intentional so they don't lock into a visible
          repeating pattern. */}
      <div className="flex flex-col gap-3">
        <MarqueeRow items={ROW_TOP} duration={25} />
        <MarqueeRow items={ROW_BOTTOM} duration={30} reverse />
      </div>
    </section>
  );
}
