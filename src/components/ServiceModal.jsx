import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';

/**
 * ServiceModal
 * ---------------------------------------------------------------------------
 * Full-screen overlay that opens from a service card click. Rendered into
 * document.body via createPortal so its stacking context is fully detached
 * from the rest of the page (no z-index fights with the navbar, atmosphere,
 * etc). Closes on:
 *   - clicking the X button
 *   - pressing Escape
 *   - clicking the backdrop (anywhere outside the dialog content)
 *
 * Locks page scroll while open so the body doesn't drift behind the overlay
 * on iOS / desktop alike.
 */
export default function ServiceModal({ service, onClose }) {
  // ESC key + body scroll lock — only attach listeners while a modal is open.
  useEffect(() => {
    if (!service) return undefined;

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [service, onClose]);

  return createPortal(
    <AnimatePresence>
      {service && (
        <motion.div
          key="service-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
          // Backdrop — pure black with a soft violet wash so the layered
          // content reads against any underlying page hue. Clicking the
          // backdrop closes the modal; clicks on the inner dialog stop
          // propagation below.
          className="fixed inset-0 flex items-stretch justify-center overflow-y-auto"
          style={{ zIndex: 9999 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          {/* Solid black base */}
          <div className="absolute inset-0 bg-black" aria-hidden />
          {/* Subtle purple glow — top-left + bottom-right, radial,
              drifting opacity so the modal feels lit, not flat. */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden
            style={{
              background:
                'radial-gradient(60% 50% at 15% 0%, rgba(139, 92, 246, 0.22) 0%, transparent 60%), radial-gradient(50% 40% at 90% 100%, rgba(236, 72, 153, 0.16) 0%, transparent 65%)',
            }}
          />

          <motion.div
            // The dialog itself slides up from below — Framer's spring keeps
            // the entrance soft without overshoot. Stops backdrop click
            // propagation so users can interact freely inside.
            className="relative my-auto w-full max-w-3xl mx-auto px-5 sm:px-8 py-16 md:py-24"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button — fixed top-right of the viewport, not the
                dialog, so it stays reachable even on tall content scroll. */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="fixed top-5 right-5 md:top-8 md:right-8 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-bone/80 backdrop-blur-md transition hover:border-violet/60 hover:bg-violet/15 hover:text-bone focus:outline-none focus:ring-2 focus:ring-violet/60"
            >
              <X size={18} strokeWidth={1.75} />
            </button>

            {/* Icon */}
            <div
              className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-violet/30 bg-violet/[0.08] text-matrix"
              aria-hidden
            >
              <service.icon size={28} strokeWidth={1.5} />
            </div>

            {/* Eyebrow code (matches card aesthetic) */}
            <div className="mt-8 font-mono text-[11px] uppercase tracking-[0.28em] text-bone/50">
              {service.code} — Service detail
            </div>

            {/* Title */}
            <h2
              id="service-modal-title"
              className="display mt-4 text-bone text-5xl md:text-7xl"
            >
              {service.modal.title.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="display-italic text-matrix">
                {service.modal.title.split(' ').slice(-1)[0]}
              </span>
            </h2>

            {/* Description paragraphs */}
            <div className="mt-8 space-y-5">
              {service.modal.description.map((p, i) => (
                <p
                  key={i}
                  className="font-body text-base md:text-lg text-bone/75 leading-relaxed max-w-2xl"
                >
                  {p}
                </p>
              ))}
            </div>

            {/* How it works — a connected step row that reads as a flow */}
            <div className="mt-12">
              <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-bone/50">
                How it works
              </div>
              <ol className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {service.modal.howItWorks.map((step, i) => (
                  <li
                    key={i}
                    className="glass relative p-5 flex flex-col gap-3"
                  >
                    <span className="font-mono text-[10px] tracking-[0.22em] text-matrix">
                      0{i + 1}
                    </span>
                    <span className="font-body text-bone text-base leading-snug">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Optional example callout (only AI Tools uses this for now) */}
            {service.modal.example && (
              <div className="mt-10 rounded-2xl border border-violet/25 bg-violet/[0.06] p-6 md:p-7">
                <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-matrix">
                  Example
                </div>
                <p className="mt-3 font-body text-bone/85 text-base md:text-lg leading-relaxed">
                  {service.modal.example}
                </p>
              </div>
            )}

            {/* CTA */}
            <div className="mt-12">
              <a
                href={service.modal.cta.href}
                className="btn-primary group inline-flex"
              >
                {service.modal.cta.label}
                <ArrowUpRight
                  size={18}
                  strokeWidth={2}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
