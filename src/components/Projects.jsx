import { motion } from 'framer-motion';
import { ArrowUpRight, Lock } from 'lucide-react';
import SectionHeader from './SectionHeader.jsx';

const projects = [
  {
    code: 'PRJ_001',
    title: 'AI Content Creator',
    blurb:
      'A four-agent pipeline. It scrapes viral posts, scores them on engagement, drafts the reel script, and gives you five hook options. One command, sixty seconds.',
    tags: ['Claude', 'React', 'N8N', 'Tailwind'],
    href: 'https://github.com/exoexo0011',
    status: 'Live',
    accent: true,
    metric: '4-agent / 60s',
  },
  {
    code: 'PRJ_002',
    title: 'Founder Site System',
    blurb:
      'Landing pages for AI startups. Next.js on the Vercel edge, animated with Framer Motion, A/B tests pre-wired. I deliver them with analytics and a live preview link in 72 hours.',
    tags: ['Next.js', 'Framer Motion', 'Vercel'],
    href: '#contact',
    status: 'Live',
    metric: 'Ship in 72h',
  },
  {
    code: 'PRJ_003',
    title: 'AutoFlow Agent',
    blurb:
      'An ops agent that reads your Slack and Gmail, drafts replies, opens Linear tickets, and emails a summary every morning at 8.',
    tags: ['OpenAI', 'Node', 'Postgres'],
    href: '#contact',
    status: 'Beta',
    metric: 'Daily 8am',
  },
  {
    code: 'PRJ_004',
    title: 'Client Portal App',
    blurb:
      'A React Native app for client onboarding. Stripe billing, push notifications, and a chat that talks to your project bot. I push it to TestFlight in 14 days.',
    tags: ['React Native', 'Expo', 'Stripe'],
    href: '#contact',
    status: 'Soon',
    locked: true,
    metric: '14-day TestFlight',
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
  const featured = projects[0];
  const rest = projects.slice(1);

  return (
    <section id="projects" className="relative section-pad bg-ink2">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="02"
          eyebrow="Selected Work"
          title={
            <>
              Things I've{' '}
              <span className="display-italic text-matrix">shipped</span>.
            </>
          }
          sub="A short list. I built each one end-to-end: design, code, AI, deploy. Most went live in under three weeks."
        />

        {/* Featured editorial issue */}
        <motion.a
          href={featured.href}
          target={featured.href.startsWith('http') ? '_blank' : undefined}
          rel={featured.href.startsWith('http') ? 'noreferrer noopener' : undefined}
          variants={cardVariants}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          whileHover={{ y: -6 }}
          className="glass-matrix group relative block overflow-hidden p-8 md:p-12 mb-5"
        >
          <div className="grid gap-8 md:grid-cols-[1.5fr_1fr] md:gap-16 items-end">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-matrix">
                  {featured.code}
                </span>
                <span className="h-px w-8 bg-matrix/40" />
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-coral flex items-center gap-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral opacity-70" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-coral" />
                  </span>
                  {featured.status}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/45">
                  Featured
                </span>
              </div>
              <h3 className="display text-bone text-5xl md:text-7xl mb-4 leading-[0.92]">
                {featured.title}
              </h3>
              <p className="font-body text-bone/75 text-base md:text-lg leading-relaxed max-w-xl mb-6">
                {featured.blurb}
              </p>
              <div className="flex flex-wrap gap-2">
                {featured.tags.map((t) => (
                  <span
                    key={t}
                    className="border border-bone/15 bg-ink/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/65"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6 items-start md:items-end">
              <div className="display-italic text-matrix text-5xl md:text-6xl">
                {featured.metric}
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-matrix group-hover:text-bone transition-colors">
                Open repo
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </div>
            </div>
          </div>
        </motion.a>

        {/* The rest as 3-up grid */}
        <div className="grid gap-5 md:grid-cols-3">
          {rest.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.href}
              target={p.href.startsWith('http') ? '_blank' : undefined}
              rel={p.href.startsWith('http') ? 'noreferrer noopener' : undefined}
              custom={i + 1}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              whileHover={{ y: -6 }}
              className="glass group relative block overflow-hidden p-7 flex flex-col gap-5"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-matrix">
                    {p.code}
                  </span>
                  <span className="h-px w-4 bg-bone/20" />
                  <span
                    className={`font-mono text-[10px] uppercase tracking-[0.25em] flex items-center gap-1 ${
                      p.status === 'Live'
                        ? 'text-coral'
                        : p.status === 'Beta'
                          ? 'text-bone/65'
                          : 'text-bone/40'
                    }`}
                  >
                    {p.status === 'Live' && (
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral opacity-70" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-coral" />
                      </span>
                    )}
                    {p.status}
                  </span>
                </div>
                <div className="text-bone/40 group-hover:text-matrix transition-colors">
                  {p.locked ? <Lock size={16} /> : <ArrowUpRight size={18} />}
                </div>
              </div>

              <h3 className="display text-bone text-3xl md:text-4xl">
                {p.title}
              </h3>

              <p className="font-body text-sm text-bone/70 leading-relaxed flex-1">
                {p.blurb}
              </p>

              <div className="flex items-baseline justify-between border-t border-bone/12 pt-4">
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[9px] uppercase tracking-[0.18em] text-bone/55"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span className="display-italic text-matrix text-sm">
                  {p.metric}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
