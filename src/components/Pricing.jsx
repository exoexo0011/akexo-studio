import { motion } from 'framer-motion';
import { Check, Zap } from 'lucide-react';
import SectionHeader from './SectionHeader.jsx';

const tiers = [
  {
    name: 'Starter',
    code: 'TIER_01',
    price: '$1.5k',
    cadence: 'one-time',
    pitch: 'For founders validating an idea fast.',
    features: [
      '1-page landing site',
      'Mobile-first, animated',
      'Up to 1 round of revisions',
      'Deployed to Vercel',
      '7-day delivery',
    ],
    cta: 'Start small',
  },
  {
    name: 'Pro',
    code: 'TIER_02',
    price: '$4.5k',
    cadence: 'one-time',
    pitch: 'Most clients pick this. Fully custom build.',
    features: [
      'Up to 6-page site OR small AI tool',
      'Custom design system',
      '3 rounds of revisions',
      'CMS + analytics + SEO',
      'AI feature included',
      '14-day delivery',
    ],
    featured: true,
    cta: 'Go pro',
  },
  {
    name: 'Agency',
    code: 'TIER_03',
    price: '$3k',
    cadence: 'per month',
    pitch: 'Done-for-you ongoing build partner.',
    features: [
      '40 hours of dev / month',
      'Sites, apps, AI features',
      'Slack + 24h response',
      'Weekly Loom reports',
      'Priority shipping queue',
      'Cancel anytime',
    ],
    cta: 'Book intro',
  },
];

const variants = {
  hidden: { y: 32, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Pricing() {
  return (
    <section id="pricing" className="relative section-pad">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="04"
          eyebrow="Pricing"
          title={
            <>
              Pick a <span className="text-matrix">lane</span>.
            </>
          }
          sub="Fixed scope, fixed fee, fixed deadline. No hourly billing surprises. Most projects start within 7 days of signing."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              custom={i}
              variants={variants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{ y: -6 }}
              className={`relative flex flex-col gap-6 p-8 ${
                t.featured ? 'glass-matrix md:-translate-y-3' : 'glass'
              }`}
            >
              {t.featured && (
                <div className="absolute -top-3 right-6 flex items-center gap-1.5 bg-matrix px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-ink">
                  <Zap size={11} strokeWidth={3} />
                  Most picked
                </div>
              )}

              <div className="flex items-center justify-between">
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.25em] ${
                    t.featured ? 'text-matrix' : 'text-bone/40'
                  }`}
                >
                  {t.code}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/40">
                  {t.cadence}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="display text-5xl text-bone">{t.name}</h3>
                <p className="font-body text-sm text-bone/55">{t.pitch}</p>
              </div>

              <div className="flex items-baseline gap-2 border-y border-bone/10 py-5">
                <span
                  className={`display text-6xl ${
                    t.featured ? 'text-matrix' : 'text-bone'
                  }`}
                >
                  {t.price}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/40">
                  USD / {t.cadence}
                </span>
              </div>

              <ul className="flex flex-col gap-3">
                {t.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 font-body text-sm text-bone/75"
                  >
                    <Check
                      size={16}
                      strokeWidth={2.5}
                      className={t.featured ? 'text-matrix mt-0.5' : 'text-matrix/70 mt-0.5'}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`mt-auto inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] font-bold border transition-colors ${
                  t.featured
                    ? 'bg-matrix text-ink border-matrix hover:bg-bone hover:border-bone'
                    : 'text-bone border-bone/15 hover:text-matrix hover:border-matrix/60'
                }`}
              >
                {t.cta} →
              </a>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-bone/40">
          Need something custom? <a href="#contact" className="text-matrix hover:underline">Let's talk.</a>
        </p>
      </div>
    </section>
  );
}
