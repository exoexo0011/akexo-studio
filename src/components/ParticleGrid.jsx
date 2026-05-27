import { useEffect, useRef } from 'react';

/**
 * Animated particle grid background.
 * - Subtle dot grid that pulses
 * - Floating particles drifting upward
 * - Mouse parallax that shifts the field slightly
 */
export default function ParticleGrid() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    // Particle field
    const COUNT = Math.min(70, Math.floor((w * h) / 22000));
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -Math.random() * 0.35 - 0.05,
      r: Math.random() * 1.6 + 0.4,
      a: Math.random() * 0.6 + 0.2,
    }));

    const onMouse = (e) => {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', onMouse);

    let t = 0;
    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, w, h);

      // dot grid
      const spacing = 38;
      const ox = (mouseRef.current.x - 0.5) * 14;
      const oy = (mouseRef.current.y - 0.5) * 14;
      for (let x = -spacing; x < w + spacing; x += spacing) {
        for (let y = -spacing; y < h + spacing; y += spacing) {
          // distance from a roving "scan" position to make some dots glow
          const cx = w * 0.5 + Math.cos(t) * w * 0.35;
          const cy = h * 0.45 + Math.sin(t * 0.8) * h * 0.3;
          const dx = x - cx;
          const dy = y - cy;
          const d = Math.sqrt(dx * dx + dy * dy);
          const glow = Math.max(0, 1 - d / 240);
          const alpha = 0.06 + glow * 0.55;
          ctx.fillStyle = `rgba(0, 255, 65, ${alpha})`;
          const r = 1 + glow * 1.6;
          ctx.beginPath();
          ctx.arc(x + ox, y + oy, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // floating particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        ctx.fillStyle = `rgba(0, 255, 65, ${p.a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* radial fade backdrop */}
      <div className="absolute inset-0 bg-grid-fade" />
      {/* canvas particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      />
      {/* faint scanline sweep */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-matrix/60 to-transparent animate-scan" />
      {/* perspective floor at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-[55%] grid-floor opacity-40 [transform:perspective(800px)_rotateX(60deg)] origin-bottom" />
      {/* deep vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(3,3,3,0.85)_85%)]" />
    </div>
  );
}
