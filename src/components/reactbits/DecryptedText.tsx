import { useEffect, useRef, useState } from 'react';

interface DecryptedTextProps {
  text: string;
  className?: string;
  /** ms between reveal steps */
  speed?: number;
  /** start when scrolled into view */
  animateOnView?: boolean;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\/[]{}=+*^?#';

/** Scramble-in text reveal. Monochrome, mono font. ReactBits-style. */
const DecryptedText = ({ text, className = '', speed = 45, animateOnView = true }: DecryptedTextProps) => {
  const [display, setDisplay] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  const run = () => {
    if (started.current) return;
    started.current = true;
    let frame = 0;
    const reveal = () => {
      const revealed = Math.floor(frame / 2);
      setDisplay(
        text
          .split('')
          .map((ch, i) => {
            if (ch === ' ') return ' ';
            if (i < revealed) return text[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );
      frame += 1;
      if (revealed <= text.length) {
        setTimeout(reveal, speed);
      } else {
        setDisplay(text);
      }
    };
    reveal();
  };

  useEffect(() => {
    if (!animateOnView) { run(); return; }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) run(); },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return <span ref={ref} className={className}>{display}</span>;
};

export default DecryptedText;
