import { Github, ArrowUpRight, ArrowRight } from 'lucide-react';
import TiltCard from './reactbits/TiltCard';

interface Project {
  title: string;
  repo: string;
  bucket: string;
  description: string;
  tech: string[];
  color: string;
  demo?: string;
}

const OWNER = 'lokeshpanthangi';

// Curated flagship projects — images pulled live from GitHub's OpenGraph cards.
const projects: Project[] = [
  {
    title: 'MCP Agent',
    repo: 'mcp_agent',
    bucket: 'Agentic AI · MCP',
    color: '#818cf8',
    description:
      'A local MCP agent — paste any provider URL and it connects to 100+ tools. Your data stays on your machine while the work still gets done.',
    tech: ['Python', 'MCP', 'LLM Agents'],
  },
  {
    title: 'Human-in-the-Loop Agent',
    repo: 'hitl_agnet',
    bucket: 'Agentic AI',
    color: '#4ade80',
    description:
      'An agent that knows when to stop. Before any critical action it pauses for human review instead of blindly executing the whole plan.',
    tech: ['LangGraph', 'Python', 'Agents'],
  },
  {
    title: 'Dispute Resolution Agent',
    repo: 'Dispute_Agent',
    bucket: 'Agentic AI',
    color: '#fbbf24',
    description:
      'AI assistant that resolves customer payment disputes — chargebacks, failed payments, duplicate charges and missing credits — end to end.',
    tech: ['Python', 'Tool Use', 'LangChain'],
  },
  {
    title: 'Advanced Graph RAG',
    repo: 'Advanced_Graph_RAG',
    bucket: 'RAG',
    color: '#f472b6',
    description:
      'Knowledge-graph RAG that fuses graph traversal with vector retrieval for multi-hop reasoning across connected documents.',
    tech: ['Graph RAG', 'GraphDB', 'Embeddings'],
  },
  {
    title: 'Advanced RAG + Eval Pipeline',
    repo: 'Evaluating_RAG_PLGJ-Stack',
    bucket: 'RAG · LLMOps',
    color: '#22d3ee',
    description:
      'Dual-EC2 RAG hitting 80% precision / 90% recall, with a full observability + evaluation suite: LangSmith, Prometheus, Grafana, Loki, Jaeger.',
    tech: ['Pinecone', 'AWS', 'LangSmith', 'Grafana'],
  },
  {
    title: 'Fine-tuned Llama 3.2 & Mistral',
    repo: 'FineTuned-Llama-3.2-and-Mistral-',
    bucket: 'LLM · Fine-tuning',
    color: '#fb7185',
    description:
      'LoRA fine-tunes of Llama 3.2 and Mistral with Unsloth for domain-specific tasks — faster training, smaller memory footprint.',
    tech: ['Unsloth', 'PyTorch', 'LoRA'],
  },
  {
    title: 'SystemDesign.io',
    repo: 'systemdesign.io',
    bucket: 'Product',
    color: '#a78bfa',
    description:
      'An interactive platform for learning system design — visual, hands-on breakdowns of how real systems are built.',
    tech: ['TypeScript', 'React'],
    demo: 'https://systemdesign-io.vercel.app',
  },
  {
    title: 'MLCodex',
    repo: 'MLCodex',
    bucket: 'Product',
    color: '#2dd4bf',
    description:
      'A living codex of machine-learning concepts, code and playground — the reference I wished I had while learning ML.',
    tech: ['TypeScript', 'React'],
    demo: 'https://mlcodex.vercel.app',
  },
];

const ogImage = (repo: string) => `https://opengraph.githubassets.com/live/${OWNER}/${repo}`;
const repoUrl = (repo: string) => `https://github.com/${OWNER}/${repo}`;

const Projects = () => {
  return (
    <section id="projects" className="relative overflow-hidden py-24">
      <div className="container relative z-10 mx-auto px-6">
        <p className="section-kicker">02 — Work</p>
        <div className="mt-3 flex flex-col items-center gap-4">
          <h2 className="section-title">Selected Projects</h2>
          <p className="max-w-xl text-center text-white/50">
            A slice of what I build — agents, retrieval systems and evaluated LLM pipelines. Cards pull live from GitHub.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <TiltCard key={p.repo} max={5}>
              <article
                style={{ ['--c' as string]: p.color }}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b] transition-all duration-300 hover:border-[color:var(--c)] hover:shadow-[0_16px_50px_-16px_var(--c)]"
              >
                {/* top accent */}
                <span className="absolute inset-x-0 top-0 z-20 h-[2px] opacity-70 transition-opacity duration-300 group-hover:opacity-100" style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }} />

                {/* Live GitHub OG card (full colour) */}
                <a href={repoUrl(p.repo)} target="_blank" rel="noopener noreferrer" className="relative block aspect-[2/1] overflow-hidden border-b border-white/10 bg-[#0d0d0d]">
                  <div className="absolute inset-0 grid place-items-center font-space text-xs text-white/25">{p.repo}</div>
                  <img
                    src={ogImage(p.repo)}
                    alt={`${p.title} — GitHub repository`}
                    loading="lazy"
                    className="relative h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
                  />
                </a>

                <div className="flex flex-1 flex-col p-6">
                  <span className="font-space text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: p.color }}>{p.bucket}</span>
                  <h3 className="mt-2 font-grotesk text-lg font-bold text-white">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">{p.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span key={t} className="chip">{t}</span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center gap-4 border-t border-white/10 pt-4">
                    <a href={repoUrl(p.repo)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-white">
                      <Github size={15} /> Code
                    </a>
                    {p.demo && (
                      <a href={p.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-white">
                        <ArrowUpRight size={15} /> Live demo
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </TiltCard>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a href={`https://github.com/${OWNER}?tab=repositories`} target="_blank" rel="noopener noreferrer" className="btn-outline">
            View all 130+ repositories <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
