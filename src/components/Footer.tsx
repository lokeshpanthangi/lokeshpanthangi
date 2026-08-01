import { Github, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const exploreLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/lokeshpanthangi', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/pvlokesh', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:lokeshpantangi@gmail.com', label: 'Email' },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#080808] border-t border-white/10">
      {/* Catchy line */}
      <div className="container mx-auto px-6 pt-16 pb-12">
        <p className="mx-auto max-w-3xl text-center font-grotesk text-2xl font-bold leading-snug text-white sm:text-3xl md:text-4xl">
          The AI Engineer you want . The AI Engineer you need !!
        </p>
      </div>

      {/* Normal footer info */}
      <div className="container mx-auto px-6 pb-14">
        <div className="grid gap-10 border-y border-white/10 py-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="font-space text-xs uppercase tracking-[0.2em] text-white/40">Reach me</p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="mailto:lokeshpantangi@gmail.com"
                  className="inline-flex items-center gap-2.5 text-sm text-white/60 transition-colors hover:text-white"
                >
                  <Mail size={15} className="text-white/35" />
                  lokeshpantangi@gmail.com
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5 text-sm text-white/60">
                <Phone size={15} className="text-white/35" />
                +91 95735 80571
              </li>
              <li className="inline-flex items-center gap-2.5 text-sm text-white/60">
                <MapPin size={15} className="text-white/35" />
                Bengaluru, India
              </li>
            </ul>
          </div>

          <div>
            <p className="font-space text-xs uppercase tracking-[0.2em] text-white/40">Navigate</p>
            <ul className="mt-4 space-y-2.5">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="font-space text-sm text-white/60 transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-space text-xs uppercase tracking-[0.2em] text-white/40">Connect</p>
            <p className="mt-4 text-sm text-white/60">AI Engineer @ Driftal People Tech Solutions</p>
            <p className="mt-1 text-sm text-white/45">Agentic AI · RAG · LLMOps</p>
            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/12 text-white/55 transition-all hover:-translate-y-0.5 hover:border-white/35 hover:text-white"
                >
                  <s.icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-8 text-center font-space text-xs text-white/35 sm:text-left">
          © {year} Venkata Lokesh Panthangi. All rights reserved.
        </p>
      </div>

      {/* Name — pinned to the bottom */}
      <div className="w-full overflow-hidden leading-none">
        <h2
          className="w-full translate-y-[12%] text-center font-grotesk text-[clamp(7rem,30vw,26rem)] font-bold leading-none tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.28)]"
          aria-label="Lokesh"
        >
          Lokesh
        </h2>
      </div>
    </footer>
  );
};

export default Footer;
