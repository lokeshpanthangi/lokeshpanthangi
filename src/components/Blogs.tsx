import { Calendar, Clock, ArrowUpRight } from 'lucide-react';
import SpotlightCard from './reactbits/SpotlightCard';

interface Blog {
  title: string;
  hook: string;
  date: string;
  readTime: string;
  url: string;
  tags: string[];
}

const blogs: Blog[] = [
  {
    title: 'Gen AI — The Man-Made Creator',
    hook: 'What if the intelligence we created eventually surpasses our own ability to understand it?',
    date: 'May 17, 2025',
    readTime: '9 min read',
    url: 'https://gencreator.blogspot.com/2025/05/themanscreation.html',
    tags: ['Generative AI', 'Creativity', 'AI'],
  },
];

const Blogs = () => {
  return (
    <section id="blogs" className="relative overflow-hidden py-24">
      <div className="container relative z-10 mx-auto px-6">
        <p className="section-kicker">05 — Writing</p>
        <h2 className="section-title mt-3">From the Blog</h2>

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          {blogs.map((b) => (
            <SpotlightCard key={b.title}>
              <a href={b.url} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col p-7">
                <div className="flex items-center justify-between text-xs text-white/40">
                  <span className="inline-flex items-center gap-1.5"><Calendar size={13} /> {b.date}</span>
                  <span className="inline-flex items-center gap-1.5"><Clock size={13} /> {b.readTime}</span>
                </div>
                <h3 className="mt-5 font-grotesk text-xl font-bold text-white">{b.title}</h3>
                <p className="mt-3 flex-1 italic leading-relaxed text-white/55">&ldquo;{b.hook}&rdquo;</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {b.tags.map((t) => (<span key={t} className="chip">{t}</span>))}
                </div>
                <span className="mt-5 inline-flex items-center gap-1 text-sm text-white/60 transition-colors group-hover:text-white">
                  Read article <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </SpotlightCard>
          ))}

          {/* Invite card */}
          <div className="card-mono flex flex-col items-center justify-center gap-3 p-7 text-center">
            <p className="text-white/50">More writing on GenAI, agents &amp; RAG — soon.</p>
            <a href="https://gencreator.blogspot.com" target="_blank" rel="noopener noreferrer" className="btn-outline">
              Visit blog <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
