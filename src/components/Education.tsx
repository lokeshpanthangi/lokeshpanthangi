
import { useEffect, useRef } from 'react';

interface EducationItem {
  id: number;
  year: string;
  degree: string;
  institution: string;
  description: string;
  score?: string;
}

const educationData: EducationItem[] = [
  {
    id: 1,
    year: "2018 - 2022",
    degree: "Bachelor of Technology",
    institution: "Example University",
    description: "Computer Science Engineering with specialization in AI & Machine Learning",
    score: "CGPA: 9.2/10"
  },
  {
    id: 2,
    year: "2016 - 2018",
    degree: "Higher Secondary Education",
    institution: "Example High School",
    description: "Science with Mathematics, Physics and Chemistry",
    score: "Percentage: 95%"
  },
  {
    id: 3,
    year: "2014 - 2016",
    degree: "Secondary Education",
    institution: "Example School",
    description: "Completed with distinction in Mathematics and Science",
    score: "Percentage: 92%"
  }
];

const Education = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.timeline-item');
            items.forEach((item, index) => {
              setTimeout(() => {
                (item as HTMLElement).classList.add('opacity-100');
                (item as HTMLElement).classList.remove('opacity-0', 'translate-y-10');
              }, 300 * index);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (timelineRef.current) observer.observe(timelineRef.current);
    
    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" className="py-20 bg-light dark:bg-dark/95">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title">Education & Scores</h2>
        
        <div 
          ref={timelineRef} 
          className="timeline mt-16"
        >
          {educationData.map((item) => (
            <div 
              key={item.id}
              className="timeline-item opacity-0 translate-y-10 transition-all duration-700"
            >
              <div className="timeline-dot" />
              <div className="timeline-content card-3d bg-white dark:bg-dark/90 shadow-md">
                <div className="flip-card-inner">
                  <div className="flip-card-front p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-primary">{item.degree}</h3>
                      <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                        {item.year}
                      </span>
                    </div>
                    <h4 className="text-lg mb-2">{item.institution}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                    {item.score && (
                      <div className="mt-3 font-medium text-primary">
                        {item.score}
                      </div>
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

export default Education;
