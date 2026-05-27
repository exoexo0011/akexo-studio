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
            className="leading-[0.9] text-[4rem] md:text-[10rem]"
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
            Mobile (default): flex-col, every cluster horizontally centered.
            DOM order via CSS `order` utilities → logo on top, copyright in
            the middle, back-to-top button at the bottom.
            Desktop (md+):    CSS grid with three equal columns. The logo
            sits dead-center in column 2 (justify-self-center), copyright
            sits in column 1 left-aligned, button sits in column 3
            right-aligned. The DOM order is logo → copyright → button on
            mobile via order-* utilities; on desktop it becomes copyright →
            logo → button via the order-* overrides at md. */}
        <div className="flex flex-col items-center gap-6 border-t border-white/[0.08] pt-8 md:grid md:grid-cols-3 md:items-center md:gap-8">
          {/* 1 — Logo (icon-only).
                 Mobile: order-1 → first in the column.
                 Desktop: order-2 → middle column, justify-self-center keeps
                 it perfectly centered no matter how wide the side clusters
                 grow. The logo also acts as a click-to-top affordance. */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
            aria-label="AkExo Studio — back to top"
            className="order-1 md:order-2 group inline-flex md:justify-self-center"
          >
            <img
              src="/logo-icon.png"
              alt="AkExo Studio"
              style={{
                height: 'auto',
                objectFit: 'contain',
                /* Layered drop-shadow paints a soft violet halo around
                   the transparent edges of the icon — inner pass at 20px
                   80% alpha for the bright core, outer pass at 40px 40%
                   alpha for atmospheric falloff. drop-shadow respects
                   the alpha channel of the PNG, so the halo follows the
                   actual silhouette instead of forming a rectangle. */
                filter:
                  'drop-shadow(0 0 20px rgba(139,92,246,0.8)) drop-shadow(0 0 40px rgba(139,92,246,0.4))',
              }}
              /* Responsive width: 80px on mobile, 180px from md+. Keeps
                 desktop sizing exactly where it was while taming the
                 footer block on small screens.
                 animate-logo_pulse loops a 5% scale breath every 3s. Only
                 the transform channel is touched, so the inline filter
                 stays put; group-hover:opacity-90 lives on the opacity
                 channel and is also non-conflicting. */
              className="block w-[80px] md:w-[180px] animate-logo_pulse group-hover:opacity-90 transition-opacity"
            />
          </a>

          {/* 2 — Copyright + tagline.
                 Mobile: order-2 → middle, centered.
                 Desktop: order-1 → first column (left), left-aligned, with
                 the two phrases reflowed onto one wrapping row.
                 Brand-name line is mixed-case (no `uppercase`) so "AkExo
                 Studio" reads exactly as it should; the generic descriptor
                 underneath keeps the editorial all-caps treatment. */}
          <div className="order-2 md:order-1 flex flex-col items-center gap-1 text-center md:items-start md:text-left md:flex-row md:flex-wrap md:gap-x-4 md:gap-y-1">
            <span className="font-mono text-[11px] tracking-tight text-bone/70">
              © {new Date().getFullYear()} AkExo Studio
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/55">
              Written, designed, and shipped by one person.
            </span>
          </div>

          {/* 3 — Back-to-top button.
                 Mobile: order-3 → last in the column.
                 Desktop: stays at order-3, justify-self-end pins it to the
                 right edge of its grid cell. 48x48 violet halo button with
                 a perpetual pulse via halo_pulse and a hover scale-110 +
                 solid-violet fill swap. */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
            className="order-3 md:justify-self-end group inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[rgba(139,92,246,0.5)] bg-[rgba(139,92,246,0.2)] text-white transition-all duration-300 ease-out animate-halo_pulse hover:scale-110 hover:bg-[#8B5CF6] hover:border-[#8B5CF6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(139,92,246,0.7)] focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            <ArrowUp size={20} strokeWidth={2.25} />
          </button>
        </div>
      </div>
    </footer>
  );
}
