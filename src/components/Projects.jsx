import { motion } from 'framer-motion';
import { ArrowUpRight, Lock } from 'lucide-react';
import SectionHeader from './SectionHeader.jsx';

const projects = [
  {
    code: 'PRJ_001',
    title: 'AI Content Creator',
    blurb:
      'A 4-agent pipeline that scrapes viral content, scores it, writes a reel script, and generates 5 hooks — all in one run.',
    tags: ['Claude', 'React', 'N8N', 'Tailwind'],
    href: 'https://github.com/exoexo0011',
    status: 'Live',
    accent: true,
    preview: 'content',
  },
  {
    code: 'PRJ_002',
    title: 'Founder Site System',
    blurb:
      'High-conversion landing pages for AI startups. Edge-deployed Next.js, animated, A/B-ready out of the box.',
    tags: ['Next.js', 'Framer Motion', 'Vercel'],
    href: '#contact',
    status: 'Live',
    preview: 'site',
  },
  {
    code: 'PRJ_003',
    title: 'AutoFlow Agent',
    blurb:
      'AI ops agent that watches Slack + Gmail, drafts responses, files tickets, and reports a daily summary.',
    tags: ['OpenAI', 'Node', 'Postgres'],
    href: '#contact',
    status: 'Beta',
    preview: 'flow',
  },
  {
    code: 'PRJ_004',
    title: 'Client Portal App',
    blurb:
      'React Native app with Stripe billing, push notifications, and a chat with the project bot. Ships in 14 days.',
    tags: ['React Native', 'Expo', 'Stripe'],
    href: '#contact',
    status: 'Soon',
    locked: true,
    preview: 'app',
  },
];

const cardVariants = {
  hidden: { y: 32, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Projects() {
  return (
    <section id="projects" className="relative section-pad">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="02"
          eyebrow="Selected Work"
          title={
            <>
              Things I've <span className="text-matrix">shipped</span>.
            </>
          }
          sub="A short list. Each project was built end-to-end — design, code, AI, deploy. Most go live in under 3 weeks."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.href}
              target={p.href.startsWith('http') ? '_blank' : undefined}
              rel={p.href.startsWith('http') ? 'noreferrer noopener' : undefined}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              whileHover={{ y: -8 }}
              className={`group relative block overflow-hidden p-7 md:p-8 ${
                p.accent ? 'glass-matrix' : 'glass'
              }`}
            >
              {/* preview canvas */}
              <Preview kind={p.preview} accent={p.accent} />

              <div className="relative z-10 flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-matrix">
                    {p.code}
                  </span>
                  <span className="h-px w-6 bg-bone/15" />
                  <span
                    className={`font-mono text-[10px] uppercase tracking-[0.25em] ${
                      p.status === 'Live'
                        ? 'text-matrix'
                        : p.status === 'Beta'
                          ? 'text-yellow-300/80'
                          : 'text-bone/40'
                    }`}
                  >
                    {p.status === 'Live' && '● '}
                    {p.status}
                  </span>
                </div>
                <div className="text-bone/40 group-hover:text-matrix transition-colors">
                  {p.locked ? <Lock size={18} /> : <ArrowUpRight size={20} />}
                </div>
              </div>

              <h3 className="relative z-10 display text-4xl md:text-5xl text-bone mb-4">
                {p.title}
              </h3>

              <p className="relative z-10 font-body text-sm text-bone/60 leading-relaxed max-w-md mb-6">
                {p.blurb}
              </p>

              <div className="relative z-10 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="border border-bone/10 bg-ink/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/60"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Decorative tiny preview that hints at what the project does */
function Preview({ kind, accent }) {
  if (kind === 'content') {
    return (
      <div className="pointer-events-none absolute -right-10 -top-10 opacity-50 group-hover:opacity-100 transition-opacity">
        <div className="flex flex-col gap-1.5 rotate-[-6deg]">
          {['SCRAPE → 47 posts', 'SCORE → top 5', 'WRITE → script', 'HOOK → x5'].map(
            (l, idx) => (
              <span
                key={l}
                className="font-mono text-[10px] uppercase tracking-[0.2em] px-2 py-1 border border-matrix/30 bg-ink/60 text-matrix"
                style={{ marginLeft: idx * 14 }}
              >
                &gt; {l}
              </span>
            ),
          )}
        </div>
      </div>
    );
  }
  if (kind === 'site') {
    return (
      <div className="pointer-events-none absolute -right-6 top-6 opacity-40 group-hover:opacity-80 transition-opacity">
        <div className="border border-bone/15 bg-ink/60 w-44 h-28 p-2 rotate-[5deg]">
          <div className="h-1 w-12 bg-bone/40 mb-2" />
          <div className="h-1 w-20 bg-bone/20 mb-1" />
          <div className="h-1 w-16 bg-bone/20 mb-3" />
          <div className="h-4 w-12 bg-matrix/80" />
        </div>
      </div>
    );
  }
  if (kind === 'flow') {
    return (
      <div className="pointer-events-none absolute -right-4 top-4 opacity-50 group-hover:opacity-100 transition-opacity">
        <svg width="160" height="120" viewBox="0 0 160 120" className="rotate-[-4deg]">
          <g stroke="currentColor" strokeWidth="1" className="text-matrix" fill="none">
            <circle cx="20" cy="20" r="6" />
            <circle cx="80" cy="60" r="6" />
            <circle cx="140" cy="20" r="6" />
            <circle cx="140" cy="100" r="6" />
            <line x1="26" y1="20" x2="74" y2="58" />
            <line x1="86" y1="60" x2="134" y2="22" />
            <line x1="86" y1="60" x2="134" y2="98" />
          </g>
        </svg>
      </div>
    );
  }
  // app
  return (
    <div className="pointer-events-none absolute -right-2 top-4 opacity-40 group-hover:opacity-80 transition-opacity">
      <div className="rotate-[6deg] border border-bone/15 bg-ink/60 w-20 h-32 p-1.5">
        <div className="h-1 w-6 mx-auto bg-bone/30 mb-2 rounded-full" />
        <div className="h-2 w-full bg-bone/10 mb-1" />
        <div className="h-2 w-3/4 bg-bone/10 mb-1" />
        <div className="h-2 w-2/3 bg-bone/10 mb-3" />
        <div className="h-5 w-full bg-matrix/70" />
      </div>
    </div>
  );
}
