const items = [
  'React',
  'Next.js',
  'Tailwind',
  'TypeScript',
  'Node.js',
  'Python',
  'OpenAI',
  'Claude',
  'Supabase',
  'PostgreSQL',
  'Vercel',
  'N8N',
  'Stripe',
  'React Native',
];

export default function Marquee() {
  const loop = [...items, ...items];
  return (
    <section
      aria-label="Tech stack"
      className="relative border-y border-bone/10 py-5 overflow-hidden bg-ink"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-ink to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-ink to-transparent z-10" />
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
        {loop.map((it, i) => (
          <span
            key={i}
            className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone/55 hover:text-matrix transition-colors"
          >
            <span className="text-matrix mr-3">·</span>
            {it}
          </span>
        ))}
      </div>
    </section>
  );
}
