import DotPattern from "./ui/dot-pattern-1";

export function AboutQuote() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative flex flex-col items-center border border-primary/40 dark:border-primary/30 rounded-3xl overflow-hidden py-12 md:py-20 shadow-xl">
          {/* Dot Pattern Background */}
          <DotPattern 
            width={12} 
            height={12} 
            cx={1} 
            cy={1} 
            cr={1} 
            className="fill-primary/10 dark:fill-primary/10 opacity-70" 
          />

          {/* Accent Corner Nodes */}
          <div className="absolute -left-1.5 -top-1.5 h-3 w-3 bg-primary rounded-full shadow-lg" />
          <div className="absolute -bottom-1.5 -left-1.5 h-3 w-3 bg-primary rounded-full shadow-lg" />
          <div className="absolute -right-1.5 -top-1.5 h-3 w-3 bg-primary rounded-full shadow-lg" />
          <div className="absolute -bottom-1.5 -right-1.5 h-3 w-3 bg-primary rounded-full shadow-lg" />

          {/* Content */}
          <div className="relative z-20 mx-auto max-w-4xl text-center px-4">
            <p className="text-xs md:text-sm text-primary uppercase font-bold tracking-[0.25em] mb-6">
              My Engineering Creed
            </p>
            <div className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.3] max-w-3xl mx-auto">
              <div className="flex flex-wrap justify-center gap-x-2 gap-y-1">
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500 dark:from-blue-400 dark:to-primary">"AI Systems</span>
                <span className="font-extralight text-gray-500 dark:text-gray-400">should be</span>
              </div>
              <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 mt-1">
                <span className="font-extralight text-gray-500 dark:text-gray-400">agentic,</span>
                <span className="font-bold">observable,</span>
                <span className="font-extralight text-gray-500 dark:text-gray-400">and built to</span>
              </div>
              <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 mt-1">
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-primary dark:from-primary dark:to-blue-400">solve complex</span>
                <span className="font-bold">enterprise</span>
              </div>
              <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 mt-1">
                <span className="font-extralight text-gray-500 dark:text-gray-400">workflows with</span>
                <span className="font-bold">ultimate precision."</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutQuote;
