import React, { useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface FlowArtProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function FlowArt({ children, className, ...props }: FlowArtProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      
      // Intercept vertical scroll and convert to horizontal scroll inside FlowArt
      const isScrollable = el.scrollWidth > el.clientWidth;
      if (isScrollable) {
        el.scrollLeft += e.deltaY * 1.2; // slight multiplier for smooth speed
        e.preventDefault();
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative w-full flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-8 py-8 px-4 md:px-12 items-stretch",
        className
      )}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      {...props}
    >
      {children}
    </div>
  );
}

interface FlowSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function FlowSection({ children, className, style, ...props }: FlowSectionProps) {
  return (
    <div
      className={cn(
        "snap-center shrink-0 w-[90vw] md:w-[65vw] lg:w-[48vw] min-h-[500px] rounded-[32px] p-8 md:p-12 flex flex-col justify-between border border-gray-100 dark:border-gray-800 shadow-2xl relative overflow-hidden transition-all duration-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white",
        className
      )}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}

export default FlowArt;
