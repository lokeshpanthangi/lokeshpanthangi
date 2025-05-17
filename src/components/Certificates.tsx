import { useState, useRef, useEffect } from 'react';
import { Award } from 'lucide-react';

interface Certificate {
  id: number;
  name: string;
  issuer: string;
  date: string;
  credential?: string;
  link: string;
}

const certificatesData: Certificate[] = [
  {
    id: 1,
    name: "Associate Cloud Engineer",
    issuer: "Google",
    date: "June 2024",
    credential: "144115",
    link: "https://drive.google.com/file/d/1_ktL8UEWZmb8QlwhqJxTshxRBWaF_ENH/view?usp=sharing"
  },
  {
    id: 2,
    name: "Salesforce Developer",
    issuer: "SmartBridge",
    date: "August 2024",
    credential: "SISFVIPAD2024-95584",
    link: "https://drive.google.com/file/d/1hmLRF3zLQuMFmcFpCYIr5piJWRQaSdvO/view?usp=sharing"
  },
  {
    id: 3,
    name: "Gate 2025",
    issuer: "IIT Roorkela",
    date: "April 2025",
    credential: "CS25 - 110085",
    link: "https://drive.google.com/file/d/1FDpSkfTF6In6zWMjMB4-r3VkuFE81Cv2/view?usp=drive_link"
  },
  {
    id: 4,
    name: "RPA Developer",
    issuer: "UiPath",
    date: "March 2024",
    credential: "29D9-FAA15",
    link: "https://drive.google.com/file/d/107y2hY86jcmbAnCDoEtv613GVFOHyff3/view?usp=sharing"
  },
  {
    id: 5,
    name: "Deep Learning",
    issuer: "IIT Roopar",
    date: "January 2024",
    credential: "NPTEL-00987",
    link: "https://drive.google.com/file/d/1B38dcSBuqtOg8A9JR6gjaVQQuHjKE0Qf/view?usp=sharing"
  },
  {
    id: 6,
    name: "Cyber Security",
    issuer: "PaloAlto",
    date: "March 2024",
    credential: "2BCE-D10D",
    link: "https://drive.google.com/file/d/1et-xQcEKyESke3yiinIR8CF8cC1uA4eH/view?usp=sharing"
  }
];

const Certificates = () => {
  const certificatesRef = useRef<HTMLDivElement>(null);
  const [hoveredCards, setHoveredCards] = useState<{[key: number]: boolean}>({});
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const items = entries[0].target.querySelectorAll('.certificate-card');
          items.forEach((item, index) => {
            setTimeout(() => {
              (item as HTMLElement).classList.add('opacity-100', 'translate-y-0');
              (item as HTMLElement).classList.remove('opacity-0', 'translate-y-10');
            }, 100 * index);
          });
        }
      },
      { threshold: 0.1 }
    );
    
    if (certificatesRef.current) observer.observe(certificatesRef.current);
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <section id="certificates" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title">Certificates</h2>
        
        <div 
          ref={certificatesRef}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {certificatesData.map((certificate) => (
            <div 
              key={certificate.id}
              className="certificate-card opacity-0 translate-y-10 transition-all duration-700"
              onClick={() => window.open(certificate.link, '_blank')}
              onMouseEnter={() => {
                if (!hoveredCards[certificate.id]) {
                  setHoveredCards(prev => ({ ...prev, [certificate.id]: true }));
                  // Reset the hover state after animation completes
                  setTimeout(() => {
                    setHoveredCards(prev => ({ ...prev, [certificate.id]: false }));
                  }, 1500);
                }
              }}
              onMouseLeave={() => {
                setHoveredCards(prev => ({ ...prev, [certificate.id]: false }));
              }}
            >
              <div className="relative h-48 group overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800/80 dark:to-gray-900/90 p-6 shadow-lg dark:shadow-blue-500/10">
                {/* Shimmering effect overlay */}
                <div className={`absolute inset-0 bg-white/5 transition-opacity duration-700 ${hoveredCards[certificate.id] ? 'opacity-100' : 'opacity-0'}`}>
                  <div className={`absolute inset-0 ${hoveredCards[certificate.id] ? 'certificate-shine-once' : ''}`}></div>
                </div>
                
                {/* Award Icon with Continuous Animation */}
                <div className="absolute top-3 right-3 z-10">
                  <Award className="text-primary w-6 h-6 award-icon-continuous" />
                </div>
                
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{certificate.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{certificate.issuer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{certificate.date}</p>
                    {certificate.credential && (
                      <p className="text-xs font-mono mt-1 text-gray-500 dark:text-gray-500">ID: {certificate.credential}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
