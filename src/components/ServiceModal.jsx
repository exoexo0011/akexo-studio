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
 *
 * Layout note (important):
 *   The backdrop is a sibling tree of FIXED layers that always pin to the
 *   viewport, and the scrollable panel lives in its own absolute scroll
 *   container above them. This prevents the page from leaking through when
 *   the modal content is taller than the viewport and the user scrolls.
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
          // Root is fixed to the viewport. No scroll on this layer; the
          // scrolling lives in an inner wrapper so the backdrop stays put.
          className="fixed inset-0"
          style={{ zIndex: 9999 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* === BACKDROP LAYERS — fixed to viewport, never scroll =========== */}
          {/* (1) Opaque base color — locks the viewport so absolutely
                 nothing from the underlying page can bleed through. */}
          <div
            className="fixed inset-0"
            aria-hidden
            style={{ background: '#050014', zIndex: 0 }}
          />
          {/* (2) Spec'd dark purple-black wash. */}
          <div
            className="fixed inset-0"
            aria-hidden
            style={{ background: 'rgba(5, 0, 20, 0.97)', zIndex: 1 }}
          />
          {/* (3) Top-right purple radial glow. */}
          <div
            className="fixed inset-0 pointer-events-none"
            aria-hidden
            style={{
              background:
                'radial-gradient(ellipse at top right, rgba(139, 92, 246, 0.15), transparent 60%)',
              zIndex: 2,
            }}
          />

          {/* === CLOSE BUTTON — fixed, always reachable ====================== */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="fixed top-5 right-5 md:top-8 md:right-8 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-bone/80 backdrop-blur-md transition hover:border-violet/60 hover:bg-violet/15 hover:text-bone focus:outline-none focus:ring-2 focus:ring-violet/60"
            style={{ zIndex: 20 }}
          >
            <X size={18} strokeWidth={1.75} />
          </button>

          {/* === SCROLL CONTAINER — its own layer above the backdrop ========= */}
          <div
            className="absolute inset-0 overflow-y-auto flex items-stretch justify-center"
            style={{ zIndex: 10 }}
            onClick={onClose}
          >
            <motion.div
              // Outer wrapper handles the slide-up entrance and viewport
              // padding. The visual "panel" is the inner div.
              className="relative my-auto w-full max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal content panel — rich purple-black surface with a
                  thin violet hairline border. */}
              <div
                className="relative rounded-3xl p-7 sm:p-10 md:p-14 overflow-hidden"
                style={{
                  background: 'rgba(15, 5, 35, 0.95)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  boxShadow:
                    '0 30px 80px -20px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(139, 92, 246, 0.05) inset',
                }}
              >
                {/* Icon */}
                <div
                  className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-violet/30 bg-violet/[0.08] text-matrix"
                  aria-hidden
                >
                  <service.icon size={28} strokeWidth={1.5} />
                </div>

                {/* Eyebrow code */}
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

                {/* How it works */}
                <div className="mt-12">
                  <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-bone/50">
                    How it works
                  </div>
                  <ol className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {service.modal.howItWorks.map((step, i) => (
                      <li
                        key={i}
                        className="relative rounded-2xl p-5 flex flex-col gap-3"
                        style={{
                          background: 'rgba(139, 92, 246, 0.06)',
                          border: '1px solid rgba(139, 92, 246, 0.18)',
                        }}
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

                {/* Optional example callout */}
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
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
