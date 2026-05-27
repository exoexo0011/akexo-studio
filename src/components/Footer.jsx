export default function Footer() {
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

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-t border-white/[0.08] pt-8">
          {/* Brand lockup — icon + name. The icon is the primary identifier;
              "AkExo Studio" sits beside it. The live indicator follows. */}
          <div className="flex items-center gap-4">
            <a href="#top" className="flex items-center gap-3 group">
              <img
                src="/logo-full.png"
                alt="AkExo Studio"
                style={{ height: '48px', width: 'auto', objectFit: 'contain' }}
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

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.25em] text-bone/55">
            <span>© {new Date().getFullYear()} AkExo Studio</span>
            <span className="text-bone/25">/</span>
            <span>Written, designed, and shipped by one person.</span>
            <span className="text-bone/25">/</span>
            <a
              href="#top"
              className="hover:text-bone transition-colors sweep"
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
