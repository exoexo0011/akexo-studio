export default function Footer() {
  return (
    <footer className="relative border-t border-bone/15 bg-ink2">
      {/* big serif AKEXO masthead */}
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
        <div className="flex items-end justify-between gap-6 mb-10">
          <h2 className="display text-bone text-[18vw] sm:text-[14vw] md:text-[10rem] lg:text-[12rem] leading-[0.85]">
            Akexo<span className="text-matrix">.</span>
          </h2>
          <span className="hidden sm:flex font-mono text-[10px] uppercase tracking-[0.28em] text-bone/45 pb-4">
            END / FIN
          </span>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-t border-bone/15 pt-8">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-coral" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/65">
              Solo AI Dev Studio
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.25em] text-bone/55">
            <span>© {new Date().getFullYear()} AKEXO</span>
            <span className="text-matrix/60">/</span>
            <span>Written, designed, and shipped by one person.</span>
            <span className="text-matrix/60">/</span>
            <a
              href="#top"
              className="hover:text-matrix transition-colors sweep"
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
