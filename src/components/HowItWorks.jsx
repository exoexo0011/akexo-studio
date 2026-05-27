import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader.jsx';

const steps = [
  {
    n: '01',
    title: 'Brief',
    desc: 'A 30-minute call. We agree on your goal, your audience, and the metric we are chasing. You leave with a fixed quote and a delivery date in writing.',
    micro: 'DAY 0',
  },
  {
    n: '02',
    title: 'Build',
    desc: "I disappear into the code. You get a daily Loom walkthrough, a live staging URL that updates on every git push, and Slack access for whatever question pops up.",
    micro: 'DAY 1 → 14',
  },
  {
    n: '03',
    title: 'Launch',
    desc: "We push to production together. I hand over the repo, a Notion doc, and dashboards for analytics and errors. You get 30 days of fixes on the house.",
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
              Three steps from brief to{' '}
              <span className="text-matrix">launch</span>.
            </>
          }
          sub="I have used the same flow on 40+ projects. You get a fixed quote on day one, a live staging URL by week two, and 30 days of free fixes after the launch."
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
