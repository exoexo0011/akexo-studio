import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '#services', label: 'Services', n: '01' },
  { href: '#projects', label: 'Work', n: '02' },
  { href: '#process', label: 'Process', n: '03' },
  { href: '#pricing', label: 'Pricing', n: '04' },
  { href: '#contact', label: 'Contact', n: '05' },
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
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-ink/85 backdrop-blur-md border-b border-bone/10'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <a href="#top" className="flex items-baseline gap-2 group">
          <span
            className="display text-3xl text-bone group-hover:text-matrix transition-colors"
            style={{ fontStyle: 'italic', fontVariationSettings: "'opsz' 144, 'SOFT' 100" }}
          >
            Akexo
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-bone/45 sm:inline">
            / studio
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group flex items-baseline gap-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-bone/70 hover:text-matrix transition-colors"
            >
              <span className="text-bone/30 group-hover:text-matrix/60 transition-colors">{l.n}</span>
              <span className="sweep">{l.label}</span>
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 bg-bone text-ink px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] hover:bg-matrix transition-colors"
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
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-bone/10 bg-ink/95 backdrop-blur"
          >
            <div className="flex flex-col px-5 py-6 gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-3 px-2 py-3 font-mono text-sm uppercase tracking-[0.22em] text-bone hover:text-matrix"
                >
                  <span className="text-bone/40">{l.n}</span>
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex items-center justify-center gap-2 bg-bone text-ink px-4 py-3 font-mono text-xs uppercase tracking-[0.22em]"
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
