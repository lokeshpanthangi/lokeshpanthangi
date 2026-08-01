import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Resume', href: '#resume' },
  { name: 'Blogs', href: '#blogs' },
  { name: 'Certs', href: '#certificates' },
  { name: 'Contact', href: '#contact' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = navItems.map((n) => n.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4">
      <div
        className={`flex w-full max-w-5xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 ${
          scrolled ? 'glass shadow-[0_8px_30px_rgba(0,0,0,0.5)]' : 'border border-transparent'
        }`}
      >
        <a href="#home" className="group flex items-center gap-2 pl-2 font-grotesk text-lg font-bold text-white">
          <span className="grid h-7 w-7 place-items-center rounded-md border border-white/20 text-sm">L</span>
          <span className="hidden sm:inline">Lokesh<span className="text-white/40">.</span></span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 md:flex">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`rounded-full px-3.5 py-1.5 text-sm transition-colors duration-200 ${
                active === item.href ? 'bg-white text-black' : 'text-white/60 hover:text-white'
              }`}
            >
              {item.name}
            </a>
          ))}
        </nav>

        <a href="#contact" className="hidden rounded-full bg-white px-4 py-1.5 text-sm font-medium text-black transition-transform hover:-translate-y-0.5 md:inline-flex">
          Let&apos;s talk
        </a>

        {/* Mobile toggle */}
        <button
          className="grid h-9 w-9 place-items-center rounded-full text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="glass absolute top-20 left-4 right-4 rounded-2xl p-2 md:hidden">
          <nav className="flex flex-col">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-center text-white/70 transition-colors hover:bg-white/5 hover:text-white"
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
