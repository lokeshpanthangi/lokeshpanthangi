import { GraduationCap, Briefcase, Bot, Database, Cpu } from 'lucide-react';
import SpotlightCard from './reactbits/SpotlightCard';

const focus = [
  { icon: Bot, title: 'Agentic AI', text: 'Autonomous & human-in-the-loop agents with LangGraph, CrewAI, and MCP tool use.' },
  { icon: Database, title: 'RAG Systems', text: 'Traditional, multimodal & graph RAG with vector stores and retrieval eval.' },
  { icon: Cpu, title: 'LLMOps', text: 'Fine-tuning, evaluation & full observability — LangSmith, Prometheus, Grafana.' },
];

const stats = [
  { value: '130+', label: 'Repositories' },
  { value: '200+', label: 'LeetCode solved' },
  { value: '16+', label: 'Languages shipped' },
];

const About = () => {
  return (
    <section id="about" className="relative overflow-hidden py-24">
      <div className="container relative z-10 mx-auto px-6">
        <p className="section-kicker">01 — About</p>
        <h2 className="section-title mt-3">Who I am</h2>

        <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main bio */}
          <SpotlightCard className="lg:col-span-2">
            <div className="p-8 md:p-10">
              <h3 className="font-grotesk text-2xl font-bold text-white md:text-3xl">
                AI Engineer building systems that <span className="text-white/50">think, retrieve, and act.</span>
              </h3>
              <p className="mt-5 leading-relaxed text-white/60">
                I&apos;m Lokesh — an AI Engineer focused on agentic AI, retrieval-augmented generation, and the
                LLMOps around them. I completed my B.Tech in CSE (AI &amp; ML) at VVIT in 2025 and now work
                full-time at <span className="text-white">Driftal People Tech Solutions</span>, while sharpening
                advanced AI engineering at <span className="text-white">MisogiAI (Masai)</span>.
              </p>
              <p className="mt-4 leading-relaxed text-white/60">
                From multi-agent orchestration and MCP servers to fine-tuning Llama &amp; Mistral and shipping
                evaluated RAG pipelines with real observability, I like taking AI from notebook to production.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="font-grotesk text-2xl font-bold text-white md:text-3xl">{s.value}</div>
                    <div className="mt-1 text-xs text-white/45">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </SpotlightCard>

          {/* Side: current + education */}
          <div className="flex flex-col gap-6">
            <div className="card-mono p-6">
              <div className="mb-3 flex items-center gap-2 text-white/50">
                <Briefcase size={16} />
                <span className="text-xs uppercase tracking-widest">Currently</span>
              </div>
              <div className="font-grotesk text-lg font-semibold text-white">AI Engineer</div>
              <div className="text-sm text-white/60">Driftal People Tech Solutions</div>
              <div className="mt-1 font-space text-xs text-white/35">Present</div>
            </div>

            <div className="card-mono p-6">
              <div className="mb-3 flex items-center gap-2 text-white/50">
                <GraduationCap size={16} />
                <span className="text-xs uppercase tracking-widest">Education</span>
              </div>
              <div className="font-grotesk text-base font-semibold text-white">AI Engineering</div>
              <div className="text-sm text-white/60">MisogiAI · Masai — Bengaluru</div>
              <div className="mt-1 font-space text-xs text-white/35">Jun 2025 – Present</div>
              <div className="mt-4 border-t border-white/10 pt-4">
                <div className="font-grotesk text-base font-semibold text-white">B.Tech CSE — AI &amp; ML</div>
                <div className="text-sm text-white/60">VVIT — Guntur</div>
                <div className="mt-1 font-space text-xs text-white/35">2021 – 2025</div>
              </div>
            </div>
          </div>
        </div>

        {/* Focus areas */}
        <div className="mx-auto mt-6 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
          {focus.map((f) => (
            <div key={f.title} className="card-mono p-6">
              <f.icon className="text-white" size={22} />
              <h4 className="mt-4 font-grotesk text-lg font-semibold text-white">{f.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
