import { useEffect, useRef } from 'react';

interface DotGridProps {
  /** spacing between dots in px */
  gap?: number;
  /** base dot radius */
  dotSize?: number;
  /** cursor influence radius in px */
  proximity?: number;
  className?: string;
}

/**
 * Monochrome dot grid. Dots brighten and swell near the cursor.
 * Event-driven: redraws only on pointer movement / resize (no idle RAF),
 * so it stays cheap and lets the page reach an idle frame.
 */
const DotGrid = ({ gap = 32, dotSize = 1.4, proximity = 140, className = '' }: DotGridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let dots: { x: number; y: number }[] = [];
    let queued = false;

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (let y = gap; y < rect.height; y += gap) {
        for (let x = gap; x < rect.width; x += gap) dots.push({ x, y });
      }
    };

    const draw = () => {
      queued = false;
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      for (const d of dots) {
        const dist = Math.hypot(d.x - mouse.current.x, d.y - mouse.current.y);
        const t = Math.max(0, 1 - dist / proximity);
        ctx.beginPath();
        ctx.arc(d.x, d.y, dotSize + t * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.12 + t * 0.75})`;
        ctx.fill();
      }
    };

    const schedule = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      schedule();
    };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; schedule(); };
    const onResize = () => { build(); schedule(); };

    build();
    draw();
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseout', onLeave);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onLeave);
    };
  }, [gap, dotSize, proximity]);

  return <canvas ref={canvasRef} className={`h-full w-full ${className}`} aria-hidden="true" />;
};

export default DotGrid;
