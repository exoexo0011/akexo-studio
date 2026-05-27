import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

const links = [
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Work' },
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

  /**
   * handleNavClick
   * Universal smooth-scroll handler used by every link in the navbar (desktop
   * and mobile). We bypass the browser's default anchor jump for two reasons:
   *  1. The mobile menu lives inside a fixed-position, animating header. On
   *     mobile Safari/Chrome, native hash navigation + a concurrent height
   *     animation can cancel or jitter the scroll. Driving it with
   *     scrollIntoView gives us deterministic behavior on every device.
   *  2. We always want the menu to close BEFORE scrolling so the destination
   *     isn't briefly hidden behind a collapsing panel.
   *
   * Reduced-motion users still get an instant snap because the global CSS
   * rule overrides scroll-behavior to auto, and modern browsers also honor
   * the preference for the JS scrollIntoView option.
   */
  const handleNavClick = (e, href) => {
    if (!href || !href.startsWith('#')) return;
    e.preventDefault();
    setOpen(false);

    const id = href.slice(1);
    const target = id ? document.getElementById(id) : document.documentElement;
    if (!target) return;

    // requestAnimationFrame lets the menu close-animation begin in the same
    // frame, avoiding a flash where the panel covers the scroll destination.
    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (typeof window !== 'undefined' && window.history?.replaceState) {
        window.history.replaceState(null, '', href);
      }
    });
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050507]/70 backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:grid lg:grid-cols-[auto_1fr_auto] lg:px-12">
        {/* Logo — full wordmark image from /public/logo-full.png. Already
            includes "studio" so no separate text label is needed. Fades in
            on mount. */}
        <a
          href="#top"
          onClick={(e) => handleNavClick(e, '#top')}
          className="flex items-center group lg:justify-self-start"
          aria-label="AkExo Studio — home"
        >
          <motion.img
            src="/logo-full.png"
            alt="AkExo Studio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="block group-hover:opacity-90 transition-opacity"
            style={{ height: '72px', width: 'auto', objectFit: 'contain' }}
          />
        </a>

        {/* Center nav — premium minimal, gradient sweep on hover */}
        <nav className="hidden lg:flex lg:justify-self-center items-center gap-1 px-2 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-md">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleNavClick(e, l.href)}
              className="px-4 py-2 font-body text-[13px] font-medium text-bone/70 hover:text-bone transition-colors rounded-full hover:bg-white/[0.05]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right CTA */}
        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, '#contact')}
          className="hidden lg:inline-flex lg:justify-self-end btn-primary !px-5 !py-2.5 !text-[13px]"
        >
          Book the call
          <ArrowRight size={14} />
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((s) => !s)}
          className="lg:hidden text-bone p-2 -mr-2 rounded-full hover:bg-white/[0.06] transition-colors"
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
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden border-t border-white/[0.06] bg-[#050507]/90 backdrop-blur-xl"
          >
            <div className="flex flex-col px-5 py-6 gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleNavClick(e, l.href)}
                  className="px-3 py-3 font-body text-base text-bone/85 hover:text-bone hover:bg-white/[0.04] rounded-xl transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="btn-primary mt-4 justify-center"
              >
                Book the call
                <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
