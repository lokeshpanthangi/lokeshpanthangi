import { useState } from 'react';
import { motion } from 'motion/react';

interface Group {
  cmd: string;
  label: string;
  items: string[];
}

const groups: Group[] = [
  { cmd: 'agents', label: 'Agentic AI', items: ['AI Agents', 'LangGraph', 'CrewAI', 'LangChain', 'MCP', 'Human-in-the-Loop', 'n8n'] },
  { cmd: 'rag', label: 'RAG', items: ['Traditional RAG', 'Multimodal RAG', 'Graph RAG', 'Agentic RAG', 'Pinecone', 'Chroma', 'OCR RAG'] },
  { cmd: 'llm', label: 'LLM & Fine-tuning', items: ['Transformers', 'Fine-Tuning', 'Unsloth', 'LoRA', 'RLHF', 'Prompt Engineering'] },
  { cmd: 'llmops', label: 'LLMOps & Eval', items: ['LangSmith', 'RAGAS', 'Prometheus', 'Grafana', 'Loki', 'Jaeger'] },
  { cmd: 'ml', label: 'Machine Learning', items: ['Supervised', 'Unsupervised', 'Deep Learning'] },
  { cmd: 'dev', label: 'Development', items: ['Python', 'FastAPI', 'React', 'TypeScript', 'Pydantic', 'Streamlit', 'Next.js'] },
  { cmd: 'infra', label: 'Data & Infra', items: ['PostgreSQL', 'MySQL', 'Redis', 'GraphDB', 'Docker', 'AWS'] },
];

const total = groups.reduce((n, g) => n + g.items.length, 0);

const Skills = () => {
  const [active, setActive] = useState(0);
  const g = groups[active];

  return (
    <section id="skills" className="relative overflow-hidden py-24">
      <div className="container relative z-10 mx-auto px-6">
        <p className="section-kicker">03 — Toolkit</p>
        <h2 className="section-title mt-3">Skills &amp; Stack</h2>

        <div className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-2xl border border-white/12 bg-[#0b0b0b] shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)]">
          {/* Title bar */}
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
            <span className="h-3 w-3 rounded-full border border-white/20 bg-white/10" />
            <span className="h-3 w-3 rounded-full border border-white/20 bg-white/25" />
            <span className="h-3 w-3 rounded-full border border-white/20 bg-white/40" />
            <span className="ml-3 font-space text-xs text-white/40">lokesh@driftal — ~/skills</span>
            <span className="ml-auto font-space text-[11px] text-white/25">{total} skills · {groups.length} domains</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr]">
            {/* Sidebar: category commands */}
            <div className="border-b border-white/10 p-3 md:border-b-0 md:border-r">
              <p className="px-3 pb-2 font-space text-[10px] uppercase tracking-[0.25em] text-white/25">domains</p>
              <div className="flex flex-wrap gap-1.5 md:flex-col md:flex-nowrap">
                {groups.map((grp, i) => (
                  <button
                    key={grp.cmd}
                    onClick={() => setActive(i)}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-left font-space text-sm transition-colors ${
                      i === active ? 'bg-white/[0.06] text-white' : 'text-white/45 hover:text-white/80'
                    }`}
                  >
                    <span className="text-white/30">{i === active ? '▸' : '·'}</span>
                    <span>{grp.label}</span>
                    <span className="ml-auto hidden font-space text-[11px] text-white/25 md:inline">{grp.items.length}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Output */}
            <div className="min-h-[340px] p-6 font-space text-sm leading-7">
              <div className="text-white/45">
                <span className="text-white/30">$</span> skills --area <span className="text-white">&quot;{g.label}&quot;</span>
              </div>

              <motion.ul key={active} className="mt-4 grid grid-cols-1 gap-x-8 gap-y-1 sm:grid-cols-2">
                {g.items.map((s, i) => (
                  <motion.li
                    key={s}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.25 }}
                    className="flex items-center gap-2 text-white/80"
                  >
                    <span className="text-white/25">▸</span>
                    <span>{s}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <div className="mt-6 flex items-center gap-2 text-white/35">
                <span className="text-white/25">#</span> {g.items.length} matches in {g.label.toLowerCase()}
                <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-white/70" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
