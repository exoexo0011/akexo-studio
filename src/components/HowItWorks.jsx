import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader.jsx';

const steps = [
  {
    n: '01',
    title: 'Brief',
    desc: 'A 30-minute call. We agree on your goal, your audience, and the metric we are chasing. You leave with a fixed quote and a delivery date in writing.',
    micro: 'DAY 0',
    pull: 'md:translate-y-0',
  },
  {
    n: '02',
    title: 'Build',
    desc: 'I disappear into the code. You get a daily Loom walkthrough, a live staging URL that updates on every git push, and Slack access for whatever question pops up.',
    micro: 'DAY 1 → 14',
    pull: 'md:translate-y-12',
  },
  {
    n: '03',
    title: 'Launch',
    desc: 'We push to production together. I hand over the repo, a Notion doc, and dashboards for analytics and errors. You get 30 days of fixes on the house.',
    micro: 'GO LIVE',
    pull: 'md:translate-y-24',
  },
];

const stepVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function HowItWorks() {
  return (
    <section id="process" className="relative section-pad">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="03"
          eyebrow="Process"
          title={
            <>
              Three steps from brief to{' '}
              <span className="display-italic text-matrix">launch</span>.
            </>
          }
          sub="I have used the same flow on 40+ projects. You get a fixed quote on day one, a live staging URL by week two, and 30 days of free fixes after the launch."
        />

        {/* asymmetric ladder — each step drops further down on desktop */}
        <div className="relative grid gap-6 md:grid-cols-3 md:gap-8">
          {/* connecting diagonal line on desktop */}
          <motion.svg
            aria-hidden
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.4, ease: 'easeOut', delay: 0.3 }}
            className="hidden md:block pointer-events-none absolute inset-0 w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="processGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="50%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
            <motion.line
              x1="16%"
              y1="20%"
              x2="84%"
              y2="80%"
              stroke="url(#processGradient)"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              opacity="0.7"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: 'easeOut', delay: 0.3 }}
            />
          </motion.svg>

          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              custom={i}
              variants={stepVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className={`relative glass p-7 md:p-8 flex flex-col gap-5 ${s.pull}`}
            >
              {/* big serif numeral as design element */}
              <div className="flex items-baseline justify-between">
                <span className="display-italic text-matrix text-7xl md:text-8xl leading-none">
                  {s.n}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/45">
                  {s.micro}
                </span>
              </div>

              <h3 className="display text-bone text-4xl md:text-5xl mt-2">
                {s.title}
              </h3>
              <p className="font-body text-sm text-bone/65 leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
