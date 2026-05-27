import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from './SectionHeader.jsx';

/* === Project registry ===
   Real, shipped work only. Each entry drives one card. The order here is
   the visual order on screen (top-left → top-right on md+, top → bottom on
   mobile). `code` is the editorial PRJ_NNN tag in the corner — kept zero-
   padded for the magazine feel; bump it when adding a third entry.
   `live` is mandatory and always opens in a new tab. */
const projects = [
  {
    code: 'PRJ_001',
    title: 'AI Content Creator',
    blurb:
      '4-agent AI pipeline that generates viral scripts, hooks, and a full week of content from one topic.',
    tags: ['React', 'Vite', 'NVIDIA NIM', 'Llama 4'],
    live: 'https://ai-content-creator-jade.vercel.app',
    status: 'Live',
    metric: '4 agents',
  },
  {
    code: 'PRJ_002',
    title: 'AkExo Studio',
    blurb:
      'Personal AI dev studio website with scroll video hero, live visitor counter, and premium dark UI.',
    tags: ['React', 'Vite', 'Tailwind', 'Framer Motion'],
    live: 'https://akexo-studio.vercel.app',
    status: 'Live',
    metric: 'v1 — Live',
  },
];

/* Stagger fade-up. Each card receives `custom={i}` so its delay is
   computed independently — looks like a deck being dealt as the section
   scrolls into view. */
const cardVariants = {
  hidden: { y: 32, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Projects() {
  return (
    <section id="work" className="relative section-pad">
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
          sub="Two real, live projects. Each one designed, coded, and deployed end-to-end. No mockups, no agency layer — every link below is a working production URL."
        />

        {/* 2-up grid on md+, stacked on mobile. gap-6 keeps the cards from
            feeling glued together while staying visually linked. The
            grid intentionally has only two children today — adding a
            third project simply pushes the layout to a 3-up at lg+. */}
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              whileHover={{ y: -6 }}
              className="glass-matrix group relative flex flex-col gap-5 overflow-hidden p-7 md:p-9"
            >
              {/* === Header row ===
                  Editorial code tag + thin divider + status ping. The
                  status uses the same coral pulse pattern as every other
                  "Live" indicator on the site so it reads consistently
                  across sections. */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-matrix">
                  {p.code}
                </span>
                <span className="h-px w-6 bg-matrix/40" />
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] flex items-center gap-1.5 text-coral">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral opacity-70" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-coral" />
                  </span>
                  {p.status}
                </span>
              </div>

              {/* === Title & blurb ===
                  Title uses the display face with a slightly tighter scale
                  than the hero. flex-1 on the blurb's wrapper ensures both
                  cards in a row stay the same height even when one blurb
                  is longer than the other. */}
              <h3 className="display text-bone text-3xl md:text-4xl">
                {p.title}
              </h3>

              <p className="font-body text-[15px] leading-relaxed text-bone/75 flex-1">
                {p.blurb}
              </p>

              {/* === Tags ===
                  Pill-shaped, bordered, mono caps. They sit above the
                  divider rule so the eye groups them with the description
                  rather than the action row below. */}
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/[0.10] bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/70 backdrop-blur-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* === Action row ===
                  Top divider rule visually separates "what it is" (above)
                  from "where to go" (below). View Live is the primary
                  CTA — gradient pill, full visual weight. Metric sits to
                  the right in the brand gradient italic, echoing the
                  other accent figures across the site. */}
              <div className="flex items-center justify-between gap-3 border-t border-white/[0.08] pt-5">
                <a
                  href={p.live}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-primary !px-5 !py-2.5 !text-[13px]"
                  aria-label={`${p.title} — open live site`}
                >
                  View Live
                  <ArrowUpRight
                    size={15}
                    strokeWidth={2.25}
                    className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>

                <span className="display-italic text-base md:text-lg">
                  {p.metric}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
