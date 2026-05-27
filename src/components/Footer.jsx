import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

/* The wordmark is split into individual letters so each glyph can stagger
   into view independently. Mixed-case "AkExo" exactly as specified — no
   `text-transform` is applied, so the displayed casing matches the source
   character-for-character. */
const MASTHEAD_LETTERS = ['A', 'k', 'E', 'x', 'o'];

/* whileInView entrance animation. `custom={i}` feeds the index in as the
   variant argument so each letter computes its own delay. The dot uses
   the same variants but at index === MASTHEAD_LETTERS.length so it lands
   one stagger beat after the final letter. */
const letterVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function Footer() {
  /* Smooth-scroll the page back to the very top. Using window.scrollTo is
     more explicit than an href="#top" anchor — it always reaches y=0 even
     if the hero section ever gets repositioned, and the global CSS rule
     `html { scroll-behavior: smooth }` already handles reduced-motion
     preferences for us. */
  const scrollToTop = () => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/[0.08]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
        {/* === Masthead row ===
            Big "AkExo" wordmark on the left, "END / FIN" badge on the right
            (sm+ only). The h2 is treated as a single block of inline-block
            letters rather than a flex row so the glyphs flow as text with
            no inter-letter gap; the violet pulse dot trails the last letter
            with a fixed margin and a baseline alignment so it reads like
            punctuation. */}
        <div className="flex items-end justify-between gap-6 mb-10">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            aria-label="AkExo Studio"
            className="leading-[0.9] text-[5rem] md:text-[10rem]"
            style={{
              /* Clash Display is the primary face. Syne and Bricolage
                 Grotesque follow as graceful fallbacks while Fontshare
                 finishes loading (or for any environment where it can't
                 be reached). */
              fontFamily:
                '"Clash Display", "Syne", "Bricolage Grotesque", system-ui, sans-serif',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              color: '#ffffff',
            }}
          >
            {MASTHEAD_LETTERS.map((char, i) => (
              <motion.span
                key={`${char}-${i}`}
                custom={i}
                variants={letterVariants}
                aria-hidden="true"
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}

            {/* Pulsing violet dot — wrapped in a motion.span so it can
                share the entrance stagger (custom = letters.length, so it
                arrives one beat after "o"). The visible disc lives on the
                INNER element so the perpetual `animate-pulse_glow` scale
                CSS animation doesn't fight the framer-motion transform on
                the outer wrapper. */}
            <motion.span
              custom={MASTHEAD_LETTERS.length}
              variants={letterVariants}
              aria-hidden="true"
              className="inline-block align-baseline ml-4 sm:ml-5"
            >
              <span
                className="block animate-pulse_glow"
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  background: '#8B5CF6',
                  boxShadow:
                    '0 0 12px #8B5CF6, 0 0 24px rgba(139, 92, 246, 0.5)',
                }}
              />
            </motion.span>
          </motion.h2>

          <span className="hidden sm:flex font-mono text-[10px] uppercase tracking-[0.28em] text-bone/45 pb-4">
            END / FIN
          </span>
        </div>

        {/* === Bottom bar ===
            Mobile (default): vertical stack, every cluster centered. Each
            cluster's content is also center-aligned so the column feels
            intentional rather than just naturally collapsed.
            Desktop (md+):    horizontal three-column layout via flex-row +
            justify-between, with text-left restored. */}
        <div className="flex flex-col items-center gap-6 text-center border-t border-white/[0.08] pt-8 md:flex-row md:items-center md:justify-between md:gap-8 md:text-left">
          {/* 1 — Brand lockup. Logo is always shown; the live indicator is
                 hidden on the smallest screens so the mobile column stays
                 tidy and the brand mark gets the spotlight. */}
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-4">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="group inline-flex"
              aria-label="AkExo Studio — back to top"
            >
              <img
                src="/logo-full.png"
                alt="AkExo Studio"
                style={{
                  height: '40px',
                  width: 'auto',
                  objectFit: 'contain',
                }}
                className="block group-hover:opacity-90 transition-opacity"
              />
            </a>
            <span className="hidden sm:flex items-center gap-2 sm:pl-4 sm:border-l sm:border-white/[0.08]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-coral" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/65">
                Solo AI Dev Studio
              </span>
            </span>
          </div>

          {/* 2 — Copyright + tagline.
                 Mobile stacks them on two centered lines; desktop reflows
                 onto a single row. The brand-name line uses MIXED CASE
                 (no `uppercase` utility) so "AkExo Studio" reads exactly
                 the way it should — the all-caps editorial treatment is
                 only kept for the generic descriptor underneath. */}
          <div className="flex flex-col items-center gap-1.5 md:flex-row md:flex-wrap md:items-center md:justify-center md:gap-x-4 md:gap-y-1">
            <span className="font-mono text-[11px] tracking-tight text-bone/70">
              © {new Date().getFullYear()} AkExo Studio
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/55">
              Written, designed, and shipped by one person.
            </span>
          </div>

          {/* 3 — Back to top.
              48x48 circular button with a violet halo that pulses via the
              halo_pulse keyframe (see tailwind.config.js). Colors are set
              with arbitrary-value bracket syntax so the build can't quietly
              drop them if the opacity-modifier shorthand on a hex token
              ever fails to resolve. Hover swaps the translucent fill for a
              solid violet and bumps the scale by 10%. */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
            className="group inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[rgba(139,92,246,0.5)] bg-[rgba(139,92,246,0.2)] text-white transition-all duration-300 ease-out animate-halo_pulse hover:scale-110 hover:bg-[#8B5CF6] hover:border-[#8B5CF6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(139,92,246,0.7)] focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            <ArrowUp size={20} strokeWidth={2.25} />
          </button>
        </div>
      </div>
    </footer>
  );
}
