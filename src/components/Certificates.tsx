
import { useState, useRef, useEffect } from 'react';
import { Badge } from 'lucide-react';

interface Certificate {
  id: number;
  name: string;
  issuer: string;
  date: string;
  image: string;
  credential?: string;
}

const certificatesData: Certificate[] = [
  {
    id: 1,
    name: "Full Stack Web Development",
    issuer: "Example Academy",
    date: "December 2023",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800",
    credential: "CERT-123456"
  },
  {
    id: 2,
    name: "Machine Learning Specialization",
    issuer: "Tech University",
    date: "March 2023",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800",
    credential: "ML-789012"
  },
  {
    id: 3,
    name: "UI/UX Design Fundamentals",
    issuer: "Design Institute",
    date: "August 2022",
    image: "https://images.unsplash.com/photo-1613909207039-6b173b755cc1?q=80&w=800",
    credential: "DESIGN-345678"
  },
  {
    id: 4,
    name: "Cloud Computing Certification",
    issuer: "Cloud Platform",
    date: "January 2022",
    image: "https://images.unsplash.com/photo-1612085781750-2bd3103bb95a?q=80&w=800",
    credential: "CLOUD-901234"
  },
  {
    id: 5,
    name: "Agile Project Management",
    issuer: "Project Management Institute",
    date: "October 2021",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=800",
    credential: "APM-567890"
  },
  {
    id: 6,
    name: "Data Science with Python",
    issuer: "Data Academy",
    date: "July 2021",
    image: "https://images.unsplash.com/photo-1608303588026-884930af2559?q=80&w=800",
    credential: "DS-123456"
  }
];

const Certificates = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const certificatesRef = useRef<HTMLDivElement>(null);
  
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
            >
              <div className="relative h-64 group overflow-hidden rounded-lg">
                {/* Badge Icon on Top Right */}
                <div className="absolute top-3 right-3 z-10 bg-white dark:bg-dark/90 p-2 rounded-full shadow-md">
                  <Badge className="text-primary w-5 h-5" />
                </div>
                
                <img
                  src={certificate.image}
                  alt={certificate.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4 text-white">
                  <h3 className="text-lg font-bold mb-1">{certificate.name}</h3>
                  <p className="text-white/90">{certificate.issuer}</p>
                  <p className="text-white/70 text-sm">{certificate.date}</p>
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
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <Badge className="text-primary w-5 h-5" />
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
              
              <div className="mb-6 rounded-lg overflow-hidden h-64 md:h-80">
                <img 
                  src={selectedCertificate.image} 
                  alt={selectedCertificate.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-4">
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
