import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Linkedin, Mail, Github, Phone, MapPin, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    emailjs
      .send(
        'service_fmpx1xn',
        'template_roxzdsp',
        { from_name: formData.name, from_email: formData.email, message: formData.message },
        'Oe4jvFItr1PiWo17O'
      )
      .then(() => {
        setIsSubmitting(false);
        toast({ title: 'Message sent', description: "Thanks — I'll get back to you soon." });
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((error) => {
        setIsSubmitting(false);
        console.error('EmailJS error:', error);
        toast({ title: 'Error', description: 'Could not send. Please try again later.', variant: 'destructive' });
      });
  };

  const inputCls =
    'w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/30 transition-colors focus:border-white/40 focus:outline-none';

  return (
    <section id="contact" className="relative overflow-hidden py-24">
      <div className="container relative z-10 mx-auto px-6">
        <p className="section-kicker">07 — Contact</p>
        <h2 className="section-title mt-3">Let&apos;s build something</h2>

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
          {/* Info */}
          <div className="flex flex-col justify-between gap-8">
            <div className="space-y-5">
              <a href="mailto:lokeshpantangi@gmail.com" className="group flex items-center gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/12 bg-white/[0.03] text-white/70 transition-colors group-hover:border-white/40 group-hover:text-white"><Mail size={18} /></span>
                <span><span className="block text-xs text-white/40">Email</span><span className="text-white/80">lokeshpantangi@gmail.com</span></span>
              </a>
              <a href="tel:+919573580571" className="group flex items-center gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/12 bg-white/[0.03] text-white/70 transition-colors group-hover:border-white/40 group-hover:text-white"><Phone size={18} /></span>
                <span><span className="block text-xs text-white/40">Phone</span><span className="text-white/80">+91 95735 80571</span></span>
              </a>
              <div className="flex items-center gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/12 bg-white/[0.03] text-white/70"><MapPin size={18} /></span>
                <span><span className="block text-xs text-white/40">Location</span><span className="text-white/80">Bengaluru, India</span></span>
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs uppercase tracking-widest text-white/40">Connect</p>
              <div className="flex gap-3">
                {[
                  { icon: Github, href: 'https://github.com/lokeshpanthangi', label: 'GitHub' },
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/pvlokesh', label: 'LinkedIn' },
                  { icon: Mail, href: 'mailto:lokeshpantangi@gmail.com', label: 'Email' },
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-white/[0.03] text-white/70 transition-all hover:-translate-y-0.5 hover:border-white/40 hover:text-white">
                    <s.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="card-mono space-y-4 p-7">
            <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your name" className={inputCls} />
            <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Your email" className={inputCls} />
            <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} placeholder="Your message" className={inputCls} />
            <button type="submit" disabled={isSubmitting} className="btn-mono w-full disabled:opacity-60">
              {isSubmitting ? 'Sending…' : (<>Send message <Send size={15} /></>)}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
