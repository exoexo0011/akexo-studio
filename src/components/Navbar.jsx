import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Projects' },
  { href: '#process', label: 'Process' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-ink/75 backdrop-blur-md border-b border-bone/10'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <a href="#top" className="flex items-center gap-2 group">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-matrix opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-matrix" />
          </span>
          <span className="font-display text-xl tracking-[0.05em] text-bone group-hover:text-matrix transition-colors">
            AKEXO
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-bone/40 sm:inline">
            // studio
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-xs uppercase tracking-[0.2em] text-bone/70 hover:text-matrix transition-colors sweep"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 border border-matrix/60 bg-matrix/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-matrix hover:bg-matrix hover:text-ink transition-colors"
        >
          Book the call
          <span aria-hidden>→</span>
        </a>

        <button
          onClick={() => setOpen((s) => !s)}
          className="md:hidden text-bone p-2 -mr-2"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-bone/10 bg-ink/95 backdrop-blur"
          >
            <div className="flex flex-col px-5 py-6 gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="px-2 py-3 font-mono text-sm uppercase tracking-[0.2em] text-bone/80 hover:text-matrix"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex items-center justify-center gap-2 border border-matrix/60 bg-matrix/10 px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] text-matrix"
              >
                Book the call →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
