import { useEffect, useRef, useState } from 'react';
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
 * useScrollControlledVideo
 * Drives `video.currentTime` from the user's scroll progress through the hero
 * section. When `disabled` is true (e.g. prefers-reduced-motion), the hook
 * leaves the video parked on its first frame.
 */
function useScrollControlledVideo(videoRef, sectionRef, disabled) {
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    // Force the first frame to render so the video never shows as a black
    // rectangle while metadata is still loading. Tiny offset (not 0) because
    // some browsers don't paint the very first frame at exactly t=0.
    const paintFirstFrame = () => {
      try {
        if (video.currentTime < 0.05) video.currentTime = 0.05;
      } catch {
        /* seek not yet allowed — ignore */
      }
    };
    if (video.readyState >= 2) paintFirstFrame();
    else video.addEventListener('loadeddata', paintFirstFrame, { once: true });

    if (disabled) {
      return () => {
        video.removeEventListener('loadeddata', paintFirstFrame);
      };
    }

    let rafId = 0;
    let duration = 0;

    const onMeta = () => {
      duration = Number.isFinite(video.duration) ? video.duration : 0;
      update();
    };
    if (video.readyState >= 1 && Number.isFinite(video.duration)) {
      duration = video.duration;
    } else {
      video.addEventListener('loadedmetadata', onMeta);
    }

    const update = () => {
      rafId = 0;
      if (!duration) return;
      const rect = section.getBoundingClientRect();
      // Progress = how far the section's top has moved past the viewport top,
      // clamped to [0, sectionHeight]. So the video plays forward as the user
      // scrolls *out* of the hero.
      const scrolled = Math.min(Math.max(-rect.top, 0), rect.height);
      const progress = rect.height > 0 ? scrolled / rect.height : 0;
      // Leave a hair of headroom at the end so we don't seek past duration.
      const target = Math.min(progress * duration, duration - 0.01);
      try {
        video.currentTime = target;
      } catch {
        /* swallow seek errors during decode */
      }
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      video.removeEventListener('loadedmetadata', onMeta);
      video.removeEventListener('loadeddata', paintFirstFrame);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [videoRef, sectionRef, disabled]);
}

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
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useScrollControlledVideo(videoRef, sectionRef, reducedMotion);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden bg-ink"
    >
      {/* === SCROLL-CONTROLLED VIDEO BACKGROUND ===
          When prefers-reduced-motion is on, the scroll hook short-circuits and
          we just paint the first frame as a static poster. */}
      <video
        ref={videoRef}
        src="/hero.mp4"
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
        disablePictureInPicture
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* Readability overlay — keeps cobalt + bone text legible against the
          video. Sits between the video and all foreground content. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'rgba(0, 0, 0, 0.55)' }}
      />

      {/* === MASTHEAD ROW (mono small caps, cobalt rule under) === */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 pt-28 md:pt-32"
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

      {/* === DISPLAY HEADLINE === */}
      <div className="relative z-10 mx-auto w-full max-w-7xl flex-1 flex items-center px-5 sm:px-8 lg:px-12 py-12 md:py-20">
        <motion.div
          initial="hidden"
          animate="visible"
          className="w-full"
        >
          <motion.h1
            custom={0}
            variants={fadeUp}
            className="display text-bone text-[14vw] sm:text-[12vw] md:text-[10rem] lg:text-[12rem] xl:text-[13.5rem]"
          >
            <span className="block">I build</span>
            <span className="block whitespace-nowrap overflow-visible">
              <span
                className="display-italic text-matrix"
                style={{ textShadow: '0 0 60px rgba(0,51,255,0.18)' }}
              >
                {typed || '\u00A0'}
              </span>
              <span
                aria-hidden
                className="ml-1 inline-block h-[0.7em] w-[0.06em] translate-y-1 bg-matrix align-middle animate-blink"
              />
            </span>
            <span className="block">that ship.</span>
          </motion.h1>

          {/* === SPLIT BLOCK: body + CTA / stats === */}
          <div className="mt-12 md:mt-16 grid gap-10 md:grid-cols-[1.2fr_1fr] md:gap-12 items-end">
            <motion.div custom={1} variants={fadeUp}>
              <p className="font-body text-lg md:text-xl text-bone/85 leading-[1.55] max-w-xl">
                I'm a solo AI developer. I take your brief on Monday and put a
                working demo on your screen by{' '}
                <em className="display-italic text-matrix not-italic">
                  Friday
                </em>
                . Sites, apps, AI tools, automations: you message me, I write
                the code. No agency layer between us.
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
                <a href="#projects" className="btn-ghost">
                  See the work
                </a>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-bone/15 font-mono text-[10px] uppercase tracking-[0.2em]">
                <Stat label="Projects" value="40+" />
                <Stat label="Median" value="14d" />
                <Stat label="Reply" value="< 24h" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* === BOTTOM INDEX (magazine TOC) === */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 pb-8"
      >
        <div className="rule-line-accent mb-4" />
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.25em] text-bone/55">
          <a href="#services" className="hover:text-matrix transition-colors sweep">
            <span className="text-bone/35">01</span> Services
          </a>
          <a href="#projects" className="hover:text-matrix transition-colors sweep">
            <span className="text-bone/35">02</span> Selected Work
          </a>
          <a href="#process" className="hover:text-matrix transition-colors sweep">
            <span className="text-bone/35">03</span> Process
          </a>
          <a href="#pricing" className="hover:text-matrix transition-colors sweep">
            <span className="text-bone/35">04</span> Pricing
          </a>
          <a href="#contact" className="hover:text-matrix transition-colors sweep">
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
