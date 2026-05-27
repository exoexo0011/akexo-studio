import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

/**
 * useLiveVisitorCount
 * Drives the fake "X people viewing now" counter. Initial value is a random
 * number in [12, 28]. Every 20–40 seconds the count steps by +/-1, clamped
 * to [8, 35]. At the boundaries we force the next step away from the wall
 * so the count doesn't "stick" — keeps the rhythm feeling organic.
 */
const VISITOR_MIN = 8;
const VISITOR_MAX = 35;

function useLiveVisitorCount() {
  const [count, setCount] = useState(() => 12 + Math.floor(Math.random() * 17));

  useEffect(() => {
    let timeoutId;

    const scheduleNext = () => {
      const delay = (20 + Math.random() * 20) * 1000;
      timeoutId = setTimeout(() => {
        setCount((current) => {
          let direction;
          if (current <= VISITOR_MIN) direction = 1;
          else if (current >= VISITOR_MAX) direction = -1;
          else direction = Math.random() < 0.5 ? -1 : 1;
          return current + direction;
        });
        scheduleNext();
      }, delay);
    };

    scheduleNext();
    return () => clearTimeout(timeoutId);
  }, []);

  return count;
}

/* Hot-pink accent (#FF69B4) used by the live-visitors indicator. Defined
   once so the dot, its halo, and the "LIVE" word all stay in lockstep. */
const VISITOR_ACCENT = '#FF69B4';

/**
 * LiveVisitors
 * Plain-text live indicator rendered just below the navbar, left-aligned.
 * Format: [pulsing pink dot] LIVE · [count] VIEWING NOW
 * No pill, no border, no background — just typography on the dark hero.
 * The dot uses Tailwind's `animate-ping` for the radiating ring layered
 * over a static disc with a pink box-shadow halo. The count fade-swaps
 * via AnimatePresence on each tick.
 */
function LiveVisitors() {
  const count = useLiveVisitorCount();

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="inline-flex items-center gap-2 font-mono uppercase"
      style={{ fontSize: '11px', letterSpacing: '0.2em' }}
      role="status"
      aria-live="polite"
      aria-label={`${count} people viewing now`}
    >
      {/* Pulsing pink dot — animate-ping ring + static disc with halo. */}
      <span aria-hidden="true" className="relative flex h-2 w-2">
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
          style={{ backgroundColor: VISITOR_ACCENT }}
        />
        <span
          className="relative inline-flex h-2 w-2 rounded-full"
          style={{
            backgroundColor: VISITOR_ACCENT,
            boxShadow:
              '0 0 8px rgba(255, 105, 180, 0.75), 0 0 16px rgba(255, 105, 180, 0.40)',
          }}
        />
      </span>

      {/* "LIVE" in pink. */}
      <span style={{ color: VISITOR_ACCENT }}>Live</span>

      {/* Middle-dot divider in muted white. */}
      <span aria-hidden="true" className="text-bone/55">
        ·
      </span>

      {/* Count + descriptor in muted white. tabular-nums keeps the digits
          from jittering as glyph widths change between 9 and 10. */}
      <span className="text-bone/70">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={count}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="inline-block tabular-nums"
          >
            {count}
          </motion.span>
        </AnimatePresence>{' '}
        viewing now
      </span>
    </motion.div>
  );
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

      {/* === LIVE VISITORS INDICATOR (z-index: 2) ===
          Plain-text live indicator just below the fixed navbar, left-aligned.
          pt-24 / md:pt-28 clears the navbar bar (~68px on mobile / ~104px
          on desktop) and lets the headline below center itself in the
          remaining space. */}
      <div
        className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 pt-24 md:pt-28"
        style={{ zIndex: 2 }}
      >
        <LiveVisitors />
      </div>

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
