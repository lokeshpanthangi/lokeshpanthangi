import DotGrid from './DotGrid';

/**
 * Single fixed, page-wide animated background — the hero's dot grid extended
 * behind every section. Sections render transparent on top of this.
 * pointer-events-none so it never blocks clicks; DotGrid reads window mousemove.
 */
const PageBackground = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#080808]">
      {/* interactive dots */}
      <div className="absolute inset-0 opacity-60">
        <DotGrid gap={30} proximity={130} />
      </div>
      {/* faint static grid for structure */}
      <div className="bg-grid absolute inset-0 opacity-[0.25]" />
      {/* depth vignette top & bottom */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55))]" />
    </div>
  );
};

export default PageBackground;
