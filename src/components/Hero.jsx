import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';

const PHRASES = ['AI tools', 'web apps', 'automations', 'mobile apps'];

function useTyping(words, { typeSpeed = 70, deleteSpeed = 35, pause = 1600 } = {}) {
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
  hidden: { y: 28, opacity: 0 },
  visible: (i = 0) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.15 + i * 0.09,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const issueNumber = String(
  Math.floor((Date.now() - new Date('2024-01-01').getTime()) / (1000 * 60 * 60 * 24 * 7)),
).padStart(3, '0');
const issueMonth = new Date()
  .toLocaleString('en-US', { month: 'short', year: 'numeric' })
  .toUpperCase();

/**
 * usePrefersReducedMotion
 * Tracks the user's OS-level "reduce motion" preference. When true, we skip
 * the autoplaying video background and fall back to a static dark color so
 * motion-sensitive users aren't bombarded with looping footage.
 */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener?.('change', apply);
    return () => mq.removeEventListener?.('change', apply);
  }, []);
  return reduced;
}

export default function Hero() {
  const typed = useTyping(PHRASES);
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden bg-ink"
    >
      {/* === LOOPING VIDEO BACKGROUND (z-index: 0) ===
          Simple autoplay + loop. Skipped entirely when the user prefers
          reduced motion — the section's bg-ink shows through instead. */}
      {!reducedMotion && (
        <video
          src="/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          disablePictureInPicture
          className="pointer-events-none"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        />
      )}

      {/* === DARK OVERLAY (z-index: 1) ===
          Sits above the video, below the content. Solid 65% black per spec
          so the white display type stays cleanly legible over any frame. */}
      <div
        aria-hidden="true"
        className="pointer-events-none"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.65)',
          zIndex: 1,
        }}
      />

      {/* === MASTHEAD ROW (z-index: 2) === */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 pt-28 md:pt-32"
        style={{ zIndex: 2 }}
      >
        <div className="flex flex-wrap items-baseline justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-bone/55">
          <span>
            <span className="text-bone/35">Issue No.</span>{' '}
            <span className="text-bone">{issueNumber}</span>{' '}
            <span className="text-bone/35">/</span>{' '}
            <span className="text-bone">{issueMonth}</span>
          </span>
          <span className="hidden sm:inline">Solo AI Dev Studio</span>
          <span className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-coral" />
            </span>
            <span className="text-coral">Live</span>
            <span className="text-bone/35">·</span>
            <span>Taking 2 clients</span>
          </span>
        </div>
        <div className="rule-line-accent mt-4" />
      </motion.div>

      {/* === DISPLAY HEADLINE (z-index: 2) === */}
      <div
        className="relative mx-auto w-full max-w-7xl flex-1 flex items-center px-5 sm:px-8 lg:px-12 py-12 md:py-20"
        style={{ zIndex: 2 }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          className="w-full"
        >
          {/* Desktop sizes (md/lg/xl) tuned so the longest typed phrase
              ("automations") fits inside the max-w-7xl container with
              breathing room. Mobile sizes (default + sm:) are untouched. */}
          <motion.h1
            custom={0}
            variants={fadeUp}
            className="display text-bone text-[14vw] sm:text-[12vw] md:text-[6rem] lg:text-[7.5rem] xl:text-[9rem]"
          >
            <span className="block">I build</span>
            <span className="block whitespace-nowrap overflow-visible">
              <span
                className="display-italic"
                style={{
                  textShadow:
                    '0 0 80px rgba(167, 139, 250, 0.45), 0 0 40px rgba(236, 72, 153, 0.25)',
                }}
              >
                {typed || '\u00A0'}
              </span>
              <span
                aria-hidden
                className="ml-1 inline-block h-[0.7em] w-[0.06em] translate-y-1 align-middle animate-blink"
                style={{
                  background:
                    'linear-gradient(180deg, #A78BFA 0%, #EC4899 100%)',
                }}
              />
            </span>
            <span className="block">that ship.</span>
          </motion.h1>

          {/* === SPLIT BLOCK: body + CTA / stats === */}
          <div className="mt-12 md:mt-16 grid gap-10 md:grid-cols-[1.2fr_1fr] md:gap-12 items-end">
            <motion.div custom={1} variants={fadeUp}>
              <p className="font-body text-lg md:text-xl text-bone/80 leading-[1.55] max-w-xl">
                I'm a solo AI developer. I take your brief on Monday and put a
                working demo on your screen by{' '}
                <em className="display-italic not-italic">Friday</em>. Sites,
                apps, AI tools, automations: you message me, I write the code.
                No agency layer between us.
              </p>
            </motion.div>

            <motion.div custom={2} variants={fadeUp} className="flex flex-col gap-5">
              <div className="flex flex-wrap gap-3">
                <a href="#contact" className="btn-primary group">
                  Hire me
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>
                <a href="#work" className="btn-ghost">
                  See the work
                </a>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 font-mono text-[10px] uppercase tracking-[0.2em]">
                <Stat label="Projects" value="40+" />
                <Stat label="Median" value="14d" />
                <Stat label="Reply" value="< 24h" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* === BOTTOM INDEX (z-index: 2) === */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 pb-8"
        style={{ zIndex: 2 }}
      >
        <div className="rule-line-accent mb-4" />
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.25em] text-bone/55">
          <a href="#services" className="hover:text-bone transition-colors sweep">
            <span className="text-bone/35">01</span> Services
          </a>
          <a href="#work" className="hover:text-bone transition-colors sweep">
            <span className="text-bone/35">02</span> Selected Work
          </a>
          <a href="#process" className="hover:text-bone transition-colors sweep">
            <span className="text-bone/35">03</span> Process
          </a>
          <a href="#pricing" className="hover:text-bone transition-colors sweep">
            <span className="text-bone/35">04</span> Pricing
          </a>
          <a href="#contact" className="hover:text-bone transition-colors sweep">
            <span className="text-bone/35">05</span> Contact
          </a>
          <span className="hidden md:flex items-center gap-2 text-bone/35">
            Scroll <ArrowDown size={11} />
          </span>
        </div>
      </motion.div>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-bone font-bold text-base normal-case tracking-normal font-body">
        {value}
      </span>
      <span className="text-bone/45 text-[9px]">{label}</span>
    </div>
  );
}
