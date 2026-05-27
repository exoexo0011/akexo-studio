/**
 * Atmosphere — global fixed background layer.
 *
 * Three things stack here, behind every section, at z = -10:
 *   1. A near-black solid base (#050507).
 *   2. A faint 64px grid that fades to transparent at the edges via mask.
 *   3. Three large, heavily-blurred radial gradient blobs (violet, indigo,
 *      pink) that drift slowly so the page never feels static.
 *
 * Hero has its own video background that fully covers the section, so this
 * layer doesn't fight with the video — it only shows in sections that have
 * transparent backgrounds.
 */
export default function Atmosphere() {
  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Base color */}
      <div className="absolute inset-0 bg-[#050507]" />

      {/* Faint grid — softened with a radial mask so corners go invisible */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 50%, #000 35%, transparent 85%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 60% at 50% 50%, #000 35%, transparent 85%)',
        }}
      />

      {/* Glowing gradient blobs — animation handled via Tailwind keyframes */}
      <div
        className="absolute -left-[20vw] -top-[20vw] h-[70vw] w-[70vw] rounded-full blur-[120px] animate-drift"
        style={{
          background:
            'radial-gradient(circle, rgba(139, 92, 246, 0.55) 0%, rgba(139, 92, 246, 0) 65%)',
        }}
      />
      <div
        className="absolute -right-[15vw] top-[35vh] h-[60vw] w-[60vw] rounded-full blur-[140px] animate-drift_slow"
        style={{
          background:
            'radial-gradient(circle, rgba(99, 102, 241, 0.45) 0%, rgba(99, 102, 241, 0) 65%)',
        }}
      />
      <div
        className="absolute left-[15vw] -bottom-[25vw] h-[65vw] w-[65vw] rounded-full blur-[140px] animate-drift"
        style={{
          background:
            'radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, rgba(236, 72, 153, 0) 65%)',
          animationDelay: '-10s',
        }}
      />

      {/* Subtle film grain on top to break up flat gradients */}
      <div
        className="absolute inset-0 opacity-[0.4] mix-blend-overlay"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)',
          backgroundSize: '3px 3px',
        }}
      />

      {/* Vignette — pulls focus toward center on tall pages */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% 30%, transparent 0%, rgba(5, 5, 7, 0.4) 100%)',
        }}
      />
    </div>
  );
}
