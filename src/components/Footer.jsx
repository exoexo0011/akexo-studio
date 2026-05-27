export default function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-matrix opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-matrix" />
          </span>
          <span className="font-display text-lg tracking-[0.05em] text-bone">
            AKEXO
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/40">
            // solo ai dev studio
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.25em] text-bone/40">
          <span>© {new Date().getFullYear()} AKEXO</span>
          <span className="hidden md:inline text-matrix/60">/</span>
          <span>Built by hand. Shipped on Vercel.</span>
          <span className="hidden md:inline text-matrix/60">/</span>
          <a
            href="#top"
            className="hover:text-matrix transition-colors"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
