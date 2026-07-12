import { Award, ArrowUpRight } from 'lucide-react';
import TiltCard from './reactbits/TiltCard';

interface Certificate {
  name: string;
  issuer: string;
  date: string;
  credential?: string;
  link: string;
}

const certificates: Certificate[] = [
  { name: 'Associate Cloud Engineer', issuer: 'Google', date: 'Jun 2024', credential: '144115', link: 'https://drive.google.com/file/d/1_ktL8UEWZmb8QlwhqJxTshxRBWaF_ENH/view?usp=sharing' },
  { name: 'GATE 2025', issuer: 'IIT Roorkee', date: 'Apr 2025', credential: 'CS25-110085', link: 'https://drive.google.com/file/d/1FDpSkfTF6In6zWMjMB4-r3VkuFE81Cv2/view?usp=drive_link' },
  { name: 'Salesforce Developer', issuer: 'SmartBridge', date: 'Aug 2024', credential: 'SISFVIPAD2024-95584', link: 'https://drive.google.com/file/d/1hmLRF3zLQuMFmcFpCYIr5piJWRQaSdvO/view?usp=sharing' },
  { name: 'Deep Learning', issuer: 'NPTEL · IIT Ropar', date: 'Jan 2024', credential: 'NPTEL-00987', link: 'https://drive.google.com/file/d/1B38dcSBuqtOg8A9JR6gjaVQQuHjKE0Qf/view?usp=sharing' },
  { name: 'RPA Developer', issuer: 'UiPath', date: 'Mar 2024', credential: '29D9-FAA15', link: 'https://drive.google.com/file/d/107y2hY86jcmbAnCDoEtv613GVFOHyff3/view?usp=sharing' },
  { name: 'Cyber Security', issuer: 'Palo Alto', date: 'Mar 2024', credential: '2BCE-D10D', link: 'https://drive.google.com/file/d/1et-xQcEKyESke3yiinIR8CF8cC1uA4eH/view?usp=sharing' },
];

const Certificates = () => {
  return (
    <section id="certificates" className="relative overflow-hidden py-24">
      <div className="container relative z-10 mx-auto px-6">
        <p className="section-kicker">06 — Credentials</p>
        <h2 className="section-title mt-3">Certificates</h2>

        <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((c) => (
            <TiltCard key={c.name} max={7}>
              <a
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-44 flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors duration-300 hover:border-white/25"
              >
                <div className="flex items-start justify-between">
                  <Award className="text-white/70" size={22} />
                  <ArrowUpRight className="text-white/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" size={18} />
                </div>
                <div>
                  <h3 className="font-grotesk text-lg font-bold text-white">{c.name}</h3>
                  <p className="text-sm text-white/55">{c.issuer}</p>
                  <div className="mt-2 flex items-center gap-2 font-space text-[11px] text-white/35">
                    <span>{c.date}</span>
                    {c.credential && (<><span>·</span><span>ID {c.credential}</span></>)}
                  </div>
                </div>
              </a>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
