import { useState } from 'react';
import { Download, Briefcase, GraduationCap } from 'lucide-react';
import { Liquid, type Colors } from '@/components/ui/button-1';

const LIQUID_COLORS: Colors = {
  color1: '#FFFFFF', color2: '#1E10C5', color3: '#9089E2', color4: '#FCFCFE',
  color5: '#F9F9FD', color6: '#B2B8E7', color7: '#0E2DCB', color8: '#0017E9',
  color9: '#4743EF', color10: '#7D7BF4', color11: '#0B06FC', color12: '#C5C1EA',
  color13: '#1403DE', color14: '#B6BAF6', color15: '#C1BEEB', color16: '#290ECB',
  color17: '#3F4CC0',
};

const ResumeButton = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="/Lokesh_Panthangi.pdf"
      download
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative inline-block h-[3em] w-56 rounded-lg border-2 border-white bg-black"
      aria-label="Download Resume"
    >
      <div className="absolute left-1/2 top-[8.57%] h-[128.57%] w-[112.81%] -translate-x-1/2 opacity-70 blur-[19px]">
        <span className="absolute inset-0 rounded-lg bg-[#d9d9d9] blur-[6.5px]" />
        <div className="relative h-full w-full overflow-hidden rounded-lg">
          <Liquid isHovered={hovered} colors={LIQUID_COLORS} />
        </div>
      </div>
      <div className="absolute left-1/2 top-1/2 h-[112.85%] w-[92.23%] -translate-x-1/2 -translate-y-[40%] rounded-lg bg-[#010128] blur-[7.3px]" />
      <div className="relative h-full w-full overflow-hidden rounded-lg">
        <span className="absolute inset-0 rounded-lg bg-[#d9d9d9]" />
        <span className="absolute inset-0 rounded-lg bg-black" />
        <Liquid isHovered={hovered} colors={LIQUID_COLORS} />
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={`absolute inset-0 rounded-lg border-[3px] border-solid border-white mix-blend-overlay ${
              i <= 2 ? 'blur-[3px]' : i === 3 ? 'blur-[5px]' : 'blur-[4px]'
            }`}
          />
        ))}
        <span className="absolute left-1/2 top-1/2 h-[42.85%] w-[70.8%] -translate-x-1/2 -translate-y-[40%] rounded-lg bg-[#006] blur-[15px]" />
      </div>
      <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 rounded-lg text-base font-semibold tracking-wide text-white transition-colors group-hover:text-yellow-300">
        <Download className="h-5 w-5" /> Download Resume
      </span>
    </a>
  );
};

interface Entry {
  role: string;
  org: string;
  place: string;
  period: string;
  points: string[];
}

const experience: Entry[] = [
  {
    role: 'AI Engineer',
    org: 'Driftal People Tech Solutions',
    place: 'India',
    period: 'Present',
    points: [
      'Building production AI systems — autonomous agents, retrieval-augmented pipelines and the evaluation/observability that keeps them reliable.',
      'Working across the stack: LLM orchestration, tool/MCP integrations, and API delivery with Python and FastAPI.',
    ],
  },
  {
    role: 'Full Stack Machine Learning Intern',
    org: 'Compunnel',
    place: 'Hyderabad',
    period: 'Jul 2024 – Dec 2024',
    points: [
      'Built part of a Django app for real-time monitoring of 50+ pressure pumps across locations, with self-initiated alerts and analytics.',
      'Reduced dashboard latency by 18% by reworking data-retrieval algorithms over 50+ live pump feeds.',
      'Automated notifications and reporting with Django Channels, cutting response time to critical issues by 30% via event-driven architecture.',
    ],
  },
];

const education: Entry[] = [
  {
    role: 'AI Engineering',
    org: 'MisogiAI · Masai',
    place: 'Bengaluru',
    period: 'Jun 2025 – Present',
    points: ['Advanced AI engineering — agents, RAG, transformers, fine-tuning and LLMOps.'],
  },
  {
    role: 'B.Tech — Computer Science (AI & ML)',
    org: 'Vasireddy Venkatadri Institute of Technology',
    place: 'Guntur',
    period: 'Nov 2021 – Apr 2025',
    points: ['B.Tech in Computer Science Engineering, specialization in Artificial Intelligence and Machine Learning.'],
  },
];

const Timeline = ({ entries }: { entries: Entry[] }) => (
  <div className="relative space-y-8 pl-6">
    <span className="absolute left-0 top-1 h-full w-px bg-white/10" />
    {entries.map((e) => (
      <div key={e.role + e.org} className="relative">
        <span className="absolute -left-6 top-1.5 h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-white/40 bg-black" />
        <div className="flex flex-col justify-between gap-1 md:flex-row md:items-center">
          <h4 className="font-grotesk text-lg font-semibold text-white">{e.role}</h4>
          <span className="font-space text-xs text-white/40">{e.period}</span>
        </div>
        <div className="mt-0.5 flex items-center gap-2 text-sm text-white/60">
          <span>{e.org}</span><span className="text-white/25">·</span><span className="text-white/40">{e.place}</span>
        </div>
        <ul className="mt-3 space-y-2">
          {e.points.map((p, i) => (
            <li key={i} className="flex gap-2 text-sm leading-relaxed text-white/55">
              <span className="mt-1 text-white/30">—</span>{p}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

const Resume = () => {
  const [tab, setTab] = useState<'experience' | 'education'>('experience');

  return (
    <section id="resume" className="relative overflow-hidden py-24">
      <div className="container relative z-10 mx-auto px-6">
        <p className="section-kicker">05 — Résumé</p>
        <h2 className="section-title mt-3">Experience &amp; Education</h2>

        <div className="mx-auto mt-12 max-w-4xl">
          <div className="flex flex-col items-center justify-between gap-4 rounded-t-2xl border border-white/10 bg-[#0b0b0b] p-6 sm:flex-row">
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-full border border-white/20 font-grotesk text-lg font-bold text-white">VP</div>
              <div>
                <div className="font-grotesk text-lg font-bold text-white">Venkata Lokesh Panthangi</div>
                <div className="text-sm text-white/50">AI Engineer — Agentic AI · RAG · LLMOps</div>
              </div>
            </div>
            <ResumeButton />
          </div>

          {/* Tabs */}
          <div className="flex border-x border-white/10 bg-[#0b0b0b]">
            {(['experience', 'education'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex flex-1 items-center justify-center gap-2 py-4 text-sm font-medium capitalize transition-colors ${
                  tab === t ? 'bg-white/[0.04] text-white' : 'text-white/40 hover:text-white/70'
                }`}
              >
                {t === 'experience' ? <Briefcase size={16} /> : <GraduationCap size={16} />}
                {t}
              </button>
            ))}
          </div>

          <div className="rounded-b-2xl border border-t-0 border-white/10 bg-[#0b0b0b] p-8 md:p-10">
            <Timeline entries={tab === 'experience' ? experience : education} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
