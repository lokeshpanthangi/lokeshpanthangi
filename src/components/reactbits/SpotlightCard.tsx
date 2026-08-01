import { useRef, ReactNode, MouseEvent } from 'react';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
}

/** Card with a white radial spotlight that follows the cursor. Mono. */
const SpotlightCard = ({ children, className = '' }: SpotlightCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b] ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(320px circle at var(--mx) var(--my), rgba(255,255,255,0.10), transparent 70%)',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default SpotlightCard;
