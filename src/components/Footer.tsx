import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/10">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="text-center md:text-left">
            <a href="#home" className="font-grotesk text-2xl font-bold text-white">Lokesh<span className="text-white/40">.</span></a>
            <p className="mt-1 text-sm text-white/45">AI Engineer — Agentic AI · RAG · LLMOps</p>
          </div>

          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: 'https://github.com/lokeshpanthangi', label: 'GitHub' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/pvlokesh', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:lokeshpantangi@gmail.com', label: 'Email' },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/12 text-white/60 transition-all hover:-translate-y-0.5 hover:border-white/40 hover:text-white">
                <s.icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/40 md:flex-row">
          <p>© {year} Venkata Lokesh Panthangi. All rights reserved.</p>
          <a href="#home" className="inline-flex items-center gap-1.5 transition-colors hover:text-white">
            Back to top <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
