import { ReactNode } from 'react';

interface MarqueeProps {
  children: ReactNode;
  reverse?: boolean;
  /** seconds per loop */
  duration?: number;
  className?: string;
}

/** Infinite horizontal marquee. Duplicates content for a seamless loop. */
const Marquee = ({ children, reverse = false, duration = 40, className = '' }: MarqueeProps) => {
  return (
    <div className={`marquee-mask w-full overflow-hidden ${className}`}>
      <div
        className={`flex w-max ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} hover:[animation-play-state:paused]`}
        style={{ ['--marquee-duration' as string]: `${duration}s` }}
      >
        <div className="flex shrink-0 items-center gap-3 pr-3">{children}</div>
        <div className="flex shrink-0 items-center gap-3 pr-3" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
};

export default Marquee;
