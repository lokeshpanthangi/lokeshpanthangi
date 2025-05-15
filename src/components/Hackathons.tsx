
import { useEffect, useRef } from 'react';

interface Hackathon {
  id: number;
  name: string;
  organizer: string;
  date: string;
  position?: string;
  project: string;
  icon: string;
}

const hackathonsData: Hackathon[] = [
  {
    id: 1,
    name: "Global Hack 2023",
    organizer: "TechGiants",
    date: "October 2023",
    position: "1st Place",
    project: "AI-powered Health Assistant",
    icon: "🏆"
  },
  {
    id: 2,
    name: "CodeFest",
    organizer: "University Tech Club",
    date: "March 2023",
    position: "2nd Place",
    project: "Smart City Traffic Management",
    icon: "🥈"
  },
  {
    id: 3,
    name: "DevJam",
    organizer: "Developer Community",
    date: "August 2022",
    position: "Finalist",
    project: "Sustainable Energy Tracker",
    icon: "🌟"
  },
  {
    id: 4,
    name: "HackNight",
    organizer: "Tech Startup Hub",
    date: "January 2022",
    project: "Augmented Reality Navigation",
    icon: "🔍"
  },
  {
    id: 5,
    name: "DataHack",
    organizer: "Data Science Association",
    date: "November 2021",
    position: "3rd Place",
    project: "Predictive Analytics Dashboard",
    icon: "📊"
  }
];

const Hackathons = () => {
  const badgesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const badges = entries[0].target.querySelectorAll('.badge');
          badges.forEach((badge, index) => {
            setTimeout(() => {
              (badge as HTMLElement).classList.add('opacity-100', 'translate-y-0');
              (badge as HTMLElement).classList.remove('opacity-0', 'translate-y-10');
            }, 100 * index);
          });
        }
      },
      { threshold: 0.1 }
    );
    
    if (badgesRef.current) observer.observe(badgesRef.current);
    
    return () => observer.disconnect();
  }, []);

  return (
    <section id="hackathons" className="py-20 bg-gray-50 dark:bg-dark/95">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title">Hackathons</h2>
        
        <div 
          ref={badgesRef}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {hackathonsData.map((hackathon) => (
            <div 
              key={hackathon.id}
              className="badge opacity-0 translate-y-10 transition-all duration-700"
            >
              <div className="card-3d bg-white dark:bg-dark/80 rounded-xl p-6 shadow-lg flex flex-col items-center text-center">
                <div className="text-4xl md:text-5xl mb-4 animate-pulse-glow">
                  {hackathon.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-2">{hackathon.name}</h3>
                <div className="text-gray-600 dark:text-gray-300 mb-4">
                  <p className="mb-1">{hackathon.organizer}</p>
                  <p>{hackathon.date}</p>
                </div>
                
                {hackathon.position && (
                  <span className="inline-block px-3 py-1 bg-primary/20 text-primary dark:bg-primary/30 rounded-full font-medium mb-3">
                    {hackathon.position}
                  </span>
                )}
                
                <div className="mt-auto">
                  <h4 className="font-medium text-lg">Project:</h4>
                  <p className="text-primary">{hackathon.project}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hackathons;
