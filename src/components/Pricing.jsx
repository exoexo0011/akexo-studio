import { motion } from 'framer-motion';
import { Check, Star, ArrowRight } from 'lucide-react';
import SectionHeader from './SectionHeader.jsx';

const tiers = [
  {
    name: 'Starter',
    code: 'TIER_01',
    price: '₹1,999',
    cadence: 'one-time',
    pitch: 'For founders testing an idea before they raise.',
    features: [
      '1-page landing site',
      'Mobile-first, animated',
      'One round of revisions',
      'Deployed to Vercel',
      '7-day delivery',
    ],
    cta: 'Start small',
  },
  {
    name: 'Pro',
    code: 'TIER_02',
    price: '₹4,999',
    cadence: 'one-time',
    pitch: 'Most clients pick this. A custom build, designed and shipped from scratch.',
    features: [
      'Up to 6-page site or small AI tool',
      'Custom design system',
      'Three rounds of revisions',
      'CMS, analytics, SEO',
      'One AI feature included',
      '14-day delivery',
    ],
    featured: true,
    cta: 'Go pro',
  },
  {
    name: 'Agency',
    code: 'TIER_03',
    price: '₹9,999',
    cadence: 'per month',
    pitch: 'I become your in-house dev for a month at a time.',
    features: [
      '40 hours of dev per month',
      'Sites, apps, AI features',
      'Slack with a 24h reply window',
      'Weekly Loom report',
      'Front of the build queue',
      'Cancel any month',
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
              Pick a <span className="display-italic">lane</span>.
            </>
          }
          sub="Fixed scope. Fixed fee. Fixed deadline. I do not bill by the hour and I do not chase scope. Most projects kick off within seven days of you signing."
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
                <div
                  className="absolute -top-3 right-6 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-white"
                  style={{
                    backgroundImage:
                      'linear-gradient(120deg, #8B5CF6 0%, #6366F1 50%, #EC4899 100%)',
                    boxShadow: '0 8px 24px -8px rgba(139, 92, 246, 0.55)',
                  }}
                >
                  <Star size={11} strokeWidth={2.5} />
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
                <h3 className="display text-bone text-5xl md:text-6xl">
                  {t.name}
                </h3>
                <p className="font-body text-sm text-bone/65">{t.pitch}</p>
              </div>

              <div className="flex items-baseline gap-2 border-y border-white/[0.08] py-5">
                {t.featured ? (
                  <span className="display-italic text-5xl md:text-6xl">
                    {t.price}
                  </span>
                ) : (
                  <span className="display text-5xl md:text-6xl text-bone">
                    {t.price}
                  </span>
                )}
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/40">
                  INR / {t.cadence}
                </span>
              </div>

              <ul className="flex flex-col gap-3">
                {t.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 font-body text-[15px] text-bone/85"
                  >
                    <Check
                      size={16}
                      strokeWidth={2.5}
                      className={
                        t.featured ? 'text-matrix mt-1' : 'text-matrix/70 mt-1'
                      }
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`mt-auto justify-center ${
                  t.featured ? 'btn-primary' : 'btn-ghost'
                }`}
              >
                {t.cta}
                <ArrowRight size={14} />
              </a>
            </motion.div>
          ))}
        </div>

        <p className="mt-12 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-bone/45">
          Need something between tiers?{' '}
          <a
            href="#contact"
            className="display-italic hover:opacity-80 transition-opacity"
          >
            Email me the scope.
          </a>
        </p>
      </div>
    </section>
  );
}
