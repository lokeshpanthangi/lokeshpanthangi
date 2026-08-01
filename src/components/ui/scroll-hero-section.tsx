import type { CSSProperties } from 'react';
import './scroll-hero-section.css';

type Theme = 'system' | 'light' | 'dark';

export type ShipStickyHeaderProps = {
  /** Words that cycle after the prefix (e.g. “I can …”) */
  items?: string[];
  /** Prefix shown before the cycling words */
  prefix?: string;
  /** UI theme (affects accent + panel colors) */
  theme?: Theme;
  /** Enable view-timeline animations if supported */
  animate?: boolean;
  /** Accent hue (0–359) — 0 = monochrome white */
  hue?: number;
  /** Where the highlight band starts (vh) */
  startVh?: number;
  /** Space (vh) below the sticky header block */
  spaceVh?: number;
  /** Debug outline (for dev) */
  debug?: boolean;
};

function WordHeroPage({
  items = ['build agents.', 'design RAG.', 'ship pipelines.', 'evaluate LLMs.', 'prototype.', 'solve.', 'develop.'],
  prefix = 'I can',
  theme = 'dark',
  animate = true,
  hue = 0,
  startVh = 50,
  spaceVh = 50,
  debug = false,
}: ShipStickyHeaderProps) {
  const rootStyle = {
    '--count': items.length,
    '--scroll-hero-hue': String(hue),
    '--scroll-hero-start': `${startVh}vh`,
    '--scroll-hero-space': `${spaceVh}vh`,
    '--scroll-hero-accent': hue === 0 ? '#fafafa' : `hsl(${hue} 100% 70%)`,
    '--scroll-hero-switch': theme === 'light' ? '#fff' : '#000',
    '--scroll-hero-canvas-text': theme === 'light' ? '#080808' : '#fafafa',
  } as CSSProperties;

  const srSummary = `${prefix} ${items.join(' ').replace(/\./g, '')}`;

  return (
    <div
      id="intro"
      className="scroll-hero-root min-h-screen w-full"
      data-animate={String(animate)}
      data-debug={String(debug)}
      style={rootStyle}
    >
      <header className="scroll-hero-fluid scroll-hero-header">
        <section className="scroll-hero-header-section">
          <h1 className="sr-only sm:not-sr-only">
            <span aria-hidden="true">{prefix}&nbsp;</span>
            <span className="sr-only">{srSummary}</span>
          </h1>

          <ul className="scroll-hero-words" aria-hidden="true">
            {items.map((word, i) => (
              <li key={word} style={{ '--i': i } as CSSProperties}>
                {word}
              </li>
            ))}
          </ul>
        </section>
      </header>
    </div>
  );
}

export { WordHeroPage };
