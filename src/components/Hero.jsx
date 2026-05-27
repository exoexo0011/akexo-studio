import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ParticleGrid from './ParticleGrid.jsx';

const PHRASES = [
  'AI tools.',
  'web apps.',
  'automations.',
  'mobile apps.',
];

function useTyping(words, { typeSpeed = 70, deleteSpeed = 35, pause = 1400 } = {}) {
  const [text, setText] = useState('');
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[i % words.length];
    let timeout;
    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === '') {
      setDeleting(false);
      setI((n) => (n + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => {
          setText((prev) =>
            deleting
              ? current.slice(0, prev.length - 1)
              : current.slice(0, prev.length + 1),
          );
        },
        deleting ? deleteSpeed : typeSpeed,
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, i, words, typeSpeed, deleteSpeed, pause]);

  return text;
}

const fadeUp = {
  hidden: { y: 24, opacity: 0 },
  visible: (i = 0) => ({
    y: 0,
    opacity: 1,
    transition: { delay: 0.1 + i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  const typed = useTyping(PHRASES);

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] w-full items-center overflow-hidden"
    >
      <ParticleGrid />

      {/* Corner brackets — give it a "framed" terminal feel */}
      <Corner pos="top-6 left-6" />
      <Corner pos="top-6 right-6" rotate={90} />
      <Corner pos="bottom-6 right-6" rotate={180} />
      <Corner pos="bottom-6 left-6" rotate={270} />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 pt-32 pb-24">
        <motion.div
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-7 max-w-5xl"
        >
          <motion.div
            custom={0}
            variants={fadeUp}
            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-matrix"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-matrix opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-matrix" />
            </span>
            Live · Taking 2 clients · {new Date().getFullYear()}
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            className="display text-[15vw] sm:text-[12vw] md:text-[9.5rem] lg:text-[11rem] xl:text-[12.5rem] font-bold text-bone leading-[0.82]"
          >
            <span className="block">I build</span>
            <span className="block">
              <span className="text-matrix" style={{ textShadow: '0 0 22px rgba(230, 59, 30, 0.28)' }}>
                {typed}
              </span>
              <span
                className="ml-1 inline-block h-[0.85em] w-[0.08em] translate-y-1 bg-matrix align-middle animate-blink"
                aria-hidden
              />
            </span>
            <span className="block">that ship.</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            className="max-w-2xl font-body text-base sm:text-lg text-bone/70 leading-relaxed"
          >
            Solo AI developer. I design, build, and ship production-grade
            websites, apps, AI tools, and automations for founders who need
            things done <em className="not-italic text-matrix">yesterday</em>.
            No agencies. No filler. Just clean code and clear results.
          </motion.p>

          <motion.div custom={3} variants={fadeUp} className="flex flex-wrap items-center gap-4 pt-2">
            <a href="#contact" className="btn-primary group">
              Hire me
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#projects" className="btn-ghost">
              See my work
            </a>
          </motion.div>

          <motion.div
            custom={4}
            variants={fadeUp}
            className="mt-12 grid grid-cols-3 max-w-xl gap-x-8 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em]"
          >
            <Stat label="Projects shipped" value="40+" />
            <Stat label="Avg. delivery" value="14 days" />
            <Stat label="Stack" value="React · AI · Node" />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom edge fade for handoff to next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-ink" />
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div className="flex flex-col gap-1 border-l border-bone/15 pl-4">
      <span className="text-bone font-bold text-sm sm:text-base normal-case tracking-normal font-body">
        {value}
      </span>
      <span className="text-bone/40 text-[10px]">{label}</span>
    </div>
  );
}

function Corner({ pos, rotate = 0 }) {
  return (
    <div
      className={`pointer-events-none absolute ${pos} hidden md:block`}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden
    >
      <div className="h-6 w-6 border-l border-t border-matrix/60" />
    </div>
  );
}
