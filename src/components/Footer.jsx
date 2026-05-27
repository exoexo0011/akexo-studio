import { ArrowUp } from 'lucide-react';

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
        {/* Big sans wordmark — lowercase, with a glowing pulsing violet dot
            in place of a period. The dot is a real DOM element (not a
            character) so we can paint it with a hard violet fill, a layered
            box-shadow glow, and a slow scale pulse. items-baseline parks it
            at the baseline of "akexo" so it reads like punctuation. */}
        <div className="flex items-end justify-between gap-6 mb-10">
          <h2 className="display text-bone text-[18vw] sm:text-[14vw] md:text-[10rem] lg:text-[12rem] leading-[0.85] flex items-baseline gap-2 sm:gap-3">
            <span>akexo</span>
            <span
              aria-hidden="true"
              className="inline-block shrink-0 animate-pulse_glow"
              style={{
                width: 18,
                height: 18,
                borderRadius: '50%',
                background: '#8B5CF6',
                boxShadow:
                  '0 0 12px #8B5CF6, 0 0 24px rgba(139, 92, 246, 0.5)',
              }}
            />
          </h2>
          <span className="hidden sm:flex font-mono text-[10px] uppercase tracking-[0.28em] text-bone/45 pb-4">
            END / FIN
          </span>
        </div>

        {/* === Bottom bar ===
            Three clusters at md+, separated by md:justify-between:
              1. Left  — brand lockup (logo + live indicator)
              2. Mid   — copyright + tagline (mono caps, dot-separated)
              3. Right — circular Back-to-top button
            On mobile they stack via flex-col; the button lives last so it
            ends up nearest the user's thumb. */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-t border-white/[0.08] pt-8">
          {/* 1 — Brand lockup. The full wordmark already says "studio"
                 so no text label sits beside it. */}
          <div className="flex items-center gap-4">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="flex items-center group"
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
            <span className="hidden sm:flex items-center gap-2 pl-4 border-l border-white/[0.08]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-coral" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/65">
                Solo AI Dev Studio
              </span>
            </span>
          </div>

          {/* 2 — Copyright + tagline */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.25em] text-bone/55">
            <span>© {new Date().getFullYear()} AkExo Studio</span>
            <span className="text-bone/25">/</span>
            <span>Written, designed, and shipped by one person.</span>
          </div>

          {/* 3 — Back to top.
              Real <button> rather than an anchor: this is a UI control,
              not navigation. The violet halo pulses via halo_pulse, which
              animates box-shadow only — leaving the transform channel
              free so hover:scale-110 works without conflict. */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
            className="group inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-violet/50 bg-violet/20 text-bone transition-all duration-300 ease-out animate-halo_pulse hover:scale-110 hover:bg-violet hover:border-violet focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            <ArrowUp size={20} strokeWidth={2.25} />
          </button>
        </div>
      </div>
    </footer>
  );
}
