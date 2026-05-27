import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

const links = [
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#process', label: 'Process' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#contact', label: 'Contact' },
];

/* === Inline brand SVGs ===
   Filled brand-mark glyphs (Simple Icons-style) for Instagram, Threads, and
   GitHub so they read instantly in a 28px circle. The mail glyph is a
   filled envelope tuned to the same visual weight as the brand icons —
   Lucide's stroke-only Mail looked feathery beside the heavier brand marks.
   All four use viewBox="0 0 24 24" and fill="currentColor" so the wrapper
   button can tint them via `text-bone`. */
const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163Zm0-2.163C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
  </svg>
);

const ThreadsIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.78 3.631 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.292a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.323.143 1.504.708 2.604 1.78 3.182 3.102.79 1.85.785 4.864-1.674 7.34-1.844 1.875-4.156 2.69-7.184 2.704h-.004M11.473 12c-.187 0-.376.005-.567.015-1.812.099-2.929.946-2.851 2.41.082 1.461 1.342 2.143 2.846 2.062 1.394-.075 3.06-.612 3.347-3.756a10.31 10.31 0 0 0-2.775-.732" />
  </svg>
);

const GitHubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const MailIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
    <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
  </svg>
);

/* Order matters: this is the visual order on desktop. On mobile we hide
   anything with mobile:false, so the surviving icons collapse together
   without leaving gaps. */
const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/akexo_ai',
    Icon: InstagramIcon,
    mobile: true,
    sameTab: false,
  },
  {
    label: 'Threads',
    href: 'https://www.threads.com/@akexo_ai',
    Icon: ThreadsIcon,
    mobile: false,
    sameTab: false,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/exoexo0011',
    Icon: GitHubIcon,
    mobile: true,
    sameTab: false,
  },
  {
    label: 'Email',
    href: 'mailto:lordforpeace0011@gmail.com',
    Icon: MailIcon,
    mobile: false,
    sameTab: true,
  },
];

/**
 * Socials
 * Cluster of icon buttons. Each is a 40x40 circular button with a 28px
 * brand glyph inside and a violet glow on hover. Icons stagger-fade in
 * after the navbar header itself has settled (delay starts at 0.55s).
 *
 * Icons with `mobile: false` get `hidden lg:inline-flex` so the mobile
 * bar only shows Instagram + GitHub, keeping the row from crowding the
 * hamburger on small screens.
 */
function Socials() {
  return (
    <div className="flex items-center gap-3">
      {SOCIALS.map((s, i) => {
        const Icon = s.Icon;
        return (
          <motion.a
            key={s.label}
            href={s.href}
            target={s.sameTab ? undefined : '_blank'}
            rel={s.sameTab ? undefined : 'noopener noreferrer'}
            aria-label={s.label}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.55 + i * 0.08,
            }}
            /* Display class is applied conditionally (not in the static
               base) on purpose: if both `inline-flex` and `hidden` were
               in the unprefixed class list, the alphabetically-later
               `inline-flex` would win in Tailwind's CSS output and the
               mobile-hidden icons (Threads, Email) would still render
               on small screens. Splitting it into one branch per case
               eliminates that conflict cleanly. */
            className={`group relative h-8 w-8 items-center justify-center rounded-full bg-white/[0.08] text-bone transition-all duration-300 ease-out hover:bg-white/[0.12] hover:scale-110 hover:shadow-[0_0_22px_rgba(139,92,246,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/70 md:h-10 md:w-10 ${
              s.mobile ? 'inline-flex' : 'hidden lg:inline-flex'
            }`}
          >
            <Icon className="h-[22px] w-[22px] md:h-7 md:w-7" />
          </motion.a>
        );
      })}
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Body scroll lock while the full-screen mobile menu is open. Restoring
     the previous overflow value (rather than blanking it) keeps any other
     code that briefly sets it from being clobbered. */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  /* Close the menu on Escape — small touch but expected on any overlay. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

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
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2 md:px-8 md:py-3 lg:grid lg:grid-cols-[auto_1fr_auto] lg:px-12 min-h-[68px] md:min-h-[90px]">
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
            className="block w-auto h-[52px] object-contain transition-opacity group-hover:opacity-90 md:h-[80px]"
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

        {/* Right cluster — socials, primary CTA, and the mobile hamburger
            all share one grid cell so the desktop layout stays a clean
            three-column grid. Each child manages its own visibility:
              - <Socials />   always visible (responsive show/hide inside)
              - "Book the call"  desktop only
              - hamburger        mobile only */}
        <div className="flex items-center gap-3 lg:justify-self-end lg:gap-4">
          <Socials />

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="hidden lg:inline-flex btn-primary !px-5 !py-2.5 !text-[13px]"
          >
            Book the call
            <ArrowRight size={14} />
          </a>

          <button
            onClick={() => setOpen((s) => !s)}
            className="lg:hidden text-bone p-2 -mr-2 rounded-full hover:bg-white/[0.06] transition-colors"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* === Mobile menu — portaled to <body> ===
          Rendering through createPortal escapes every ancestor stacking
          context. The navbar header is a framer-motion element, and once
          framer leaves a `transform` on it (post-entrance), any
          `position: fixed` descendant becomes positioned relative to
          that transformed ancestor instead of the viewport — which is
          exactly what was bleeding the page through the overlay before.
          Portaling to document.body makes the overlay a top-level child
          of <body>, with no transformed/opacity ancestor between it and
          the viewport, so `position: fixed` truly covers the screen. */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                id="mobile-menu"
                key="mobile-overlay"
                role="dialog"
                aria-modal="true"
                aria-label="Site navigation"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="lg:hidden"
                style={{
                  /* Forced to fully opaque black so NOTHING bleeds
                     through. See list of guarantees:
                     - position: fixed + all-side 0 anchors the panel to
                       the viewport. Because we're now portaled to
                       <body>, there's no transformed ancestor that
                       could ever capture `fixed`.
                     - backgroundColor uses a solid hex (no rgba/alpha)
                       so the page content behind cannot be perceived.
                     - z-index 9999 places it above every other layer.
                     - backdrop-filter is intentionally absent — any
                       blur effect requires translucency to be visible.
                     - isolation: isolate creates a fresh stacking
                       context as belt-and-braces protection. */
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: '#000000',
                  zIndex: 9999,
                  isolation: 'isolate',
                }}
              >
                {/* Subtle violet/pink atmosphere accent — soft radial blob in
                    the upper-right that catches the eye without competing with
                    the link list. Pure decoration, never receives pointer events. */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-32 -top-32 h-[460px] w-[460px] rounded-full opacity-90"
                  style={{
                    background:
                      'radial-gradient(closest-side, rgba(139,92,246,0.40) 0%, rgba(236,72,153,0.18) 45%, transparent 75%)',
                    filter: 'blur(8px)',
                  }}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-40 -left-32 h-[380px] w-[380px] rounded-full opacity-70"
                  style={{
                    background:
                      'radial-gradient(closest-side, rgba(99,102,241,0.32) 0%, transparent 70%)',
                    filter: 'blur(8px)',
                  }}
                />

                {/* Close button — large enough for thumb, top-right anchor */}
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="absolute right-5 top-5 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.06] text-bone backdrop-blur transition-all duration-300 hover:border-violet-400/40 hover:bg-white/[0.12] hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/70"
                >
                  <X size={26} strokeWidth={1.75} />
                </button>

                {/* Content stack — links pinned to the top with generous breathing
                    room, CTA pinned to the bottom. flex-1 spacer in between
                    pushes the CTA down regardless of how many links exist. */}
                <div className="relative flex h-full flex-col px-6 pt-24 pb-10 sm:px-10">
                  <nav className="flex flex-col">
                    {links.map((l, i) => (
                      <motion.a
                        key={l.href}
                        href={l.href}
                        onClick={(e) => handleNavClick(e, l.href)}
                        initial={{ opacity: 0, x: 32 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.18 + i * 0.06,
                          duration: 0.42,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="group flex items-center justify-between border-b border-white/[0.10] py-5 text-bone transition-colors duration-300 hover:text-violet-300"
                      >
                        <span
                          className="display font-medium"
                          style={{ fontSize: 32, lineHeight: 1 }}
                        >
                          {l.label}
                        </span>
                        <ArrowRight
                          size={22}
                          className="text-bone/40 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:text-violet-300"
                        />
                      </motion.a>
                    ))}
                  </nav>

                  <div className="flex-1" />

                  {/* Primary CTA — full-width gradient pill at the bottom edge */}
                  <motion.a
                    href="#contact"
                    onClick={(e) => handleNavClick(e, '#contact')}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="btn-primary w-full justify-center !py-4 !text-[15px]"
                  >
                    Book the call
                    <ArrowRight size={18} />
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </motion.header>
  );
}
