import { ArrowUpRight, Github, Linkedin } from 'lucide-react';
import SplitText from './ui/SplitText';
import DecryptedText from './reactbits/DecryptedText';

const Hero = () => {
  return (
    <section id="home" className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-4 py-1.5 text-xs text-white/60">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </span>
          AI Engineer @ Driftal People Tech Solutions
        </div>

        <h1 className="font-grotesk text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
          <SplitText
            text="Venkata Lokesh"
            className="block"
            delay={40}
            duration={0.8}
            splitType="chars"
            from={{ opacity: 0, y: 60, rotationX: -80 }}
            to={{ opacity: 1, y: 0, rotationX: 0 }}
          />
          <SplitText
            text="Panthangi"
            className="block text-white/50"
            delay={40}
            duration={0.8}
            splitType="chars"
            from={{ opacity: 0, y: 60, rotationX: -80 }}
            to={{ opacity: 1, y: 0, rotationX: 0 }}
          />
        </h1>

        <p className="mx-auto mt-6 max-w-xl font-space text-sm text-white/60 sm:text-base">
          <DecryptedText text="Agentic AI · RAG · LLMOps" speed={40} animateOnView={false} />
        </p>
        <p className="mx-auto mt-3 max-w-xl text-white/45">
          I build autonomous agents, retrieval systems, and the evaluation pipelines that keep them honest.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a href="#projects" className="btn-mono">
            View Projects <ArrowUpRight size={16} />
          </a>
          <a href="/Lokesh_Panthangi.pdf" download className="btn-outline">
            Download Resume
          </a>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4 text-white/50">
          <a href="https://github.com/lokeshpanthangi" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white" aria-label="GitHub">
            <Github size={20} />
          </a>
          <a href="https://www.linkedin.com/in/pvlokesh" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white" aria-label="LinkedIn">
            <Linkedin size={20} />
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <a href="#intro" className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/40 transition-colors hover:text-white">
        <span className="font-space text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-white/60 to-transparent" />
      </a>
    </section>
  );
};

export default Hero;
