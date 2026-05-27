import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader.jsx';

const steps = [
  {
    n: '01',
    title: 'Brief',
    desc: 'A 30-min call. We map your goal, audience, and what success looks like. You leave with a fixed quote and a delivery date.',
    micro: 'DAY 0',
  },
  {
    n: '02',
    title: 'Build',
    desc: "I disappear into the code. Daily Loom updates, a live staging URL, and Slack on-demand. You see progress every single day.",
    micro: 'DAY 1 → 14',
  },
  {
    n: '03',
    title: 'Launch',
    desc: "We ship to production. I hand off docs, dashboards, and a 30-day support window. Then I'm one DM away whenever you need me.",
    micro: 'GO LIVE',
  },
];

const stepVariants = {
  hidden: { y: 32, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
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
              Three steps. <span className="text-matrix">No drama.</span>
            </>
          }
          sub="A simple, repeatable flow that's gotten 40+ products to launch. Tight feedback loops, daily updates, zero ghosting."
        />

        <div className="relative grid gap-8 md:grid-cols-3">
          {/* Connecting line — desktop only */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
            className="pointer-events-none absolute left-0 right-0 top-[58px] hidden h-px origin-left bg-gradient-to-r from-matrix/0 via-matrix to-matrix/0 md:block"
          />

          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              custom={i}
              variants={stepVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="relative glass p-7 flex flex-col gap-5"
            >
              {/* numbered chip on top of the line */}
              <div className="relative z-10 -mt-12 mb-2 flex items-center justify-between">
                <div className="flex h-12 items-center gap-3 border border-matrix/40 bg-ink px-4 font-mono text-xs uppercase tracking-[0.25em] text-matrix">
                  <span className="text-bone/40">step</span>
                  <span className="text-matrix">{s.n}</span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/40">
                  {s.micro}
                </span>
              </div>

              <h3 className="display text-5xl text-bone">{s.title}</h3>
              <p className="font-body text-sm text-bone/60 leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
