
import { useState, useRef, useEffect } from 'react';
import { Award } from 'lucide-react';

interface Certificate {
  id: number;
  name: string;
  issuer: string;
  date: string;
  credential?: string;
}

const certificatesData: Certificate[] = [
  {
    id: 1,
    name: "Full Stack Web Development",
    issuer: "Example Academy",
    date: "December 2023",
    credential: "CERT-123456"
  },
  {
    id: 2,
    name: "Machine Learning Specialization",
    issuer: "Tech University",
    date: "March 2023",
    credential: "ML-789012"
  },
  {
    id: 3,
    name: "UI/UX Design Fundamentals",
    issuer: "Design Institute",
    date: "August 2022",
    credential: "DESIGN-345678"
  },
  {
    id: 4,
    name: "Cloud Computing Certification",
    issuer: "Cloud Platform",
    date: "January 2022",
    credential: "CLOUD-901234"
  },
  {
    id: 5,
    name: "Agile Project Management",
    issuer: "Project Management Institute",
    date: "October 2021",
    credential: "APM-567890"
  },
  {
    id: 6,
    name: "Data Science with Python",
    issuer: "Data Academy",
    date: "July 2021",
    credential: "DS-123456"
  }
];

const Certificates = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
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
  
  const openModal = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setModalOpen(true);
    // Disable page scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };
  
  const closeModal = () => {
    setModalOpen(false);
    // Re-enable page scrolling
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="certificates" className="py-20 bg-white dark:bg-dark">
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
              onClick={() => openModal(certificate)}
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
      
      {/* Certificate Modal */}
      <div className={`fixed inset-0 z-50 ${modalOpen ? 'modal-open' : 'hidden'}`}>
        <div className="modal-overlay" onClick={closeModal}></div>
        <div className="modal-content">
          {selectedCertificate && (
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <Award className="text-primary w-8 h-8 award-icon-continuous" />
                  <h3 className="text-2xl font-bold">{selectedCertificate.name}</h3>
                </div>
                <button 
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-600 dark:text-gray-400">Issued By</h4>
                  <p className="text-lg">{selectedCertificate.issuer}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-600 dark:text-gray-400">Issue Date</h4>
                  <p className="text-lg">{selectedCertificate.date}</p>
                </div>
                
                {selectedCertificate.credential && (
                  <div>
                    <h4 className="font-semibold text-gray-600 dark:text-gray-400">Credential ID</h4>
                    <p className="text-lg font-mono">{selectedCertificate.credential}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
