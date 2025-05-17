import { useEffect, useRef, useState } from 'react';

interface Skill {
  id: number;
  name: string;
  category: string;
}

const skillsData: Skill[] = [
  // Programming Languages
  { id: 1, name: "Python", category: "Programming Languages" },
  { id: 2, name: "Java", category: "Programming Languages" },
  { id: 3, name: "JavaScript", category: "Programming Languages" },
  { id: 4, name: "HTML", category: "Programming Languages" },
  { id: 5, name: "CSS", category: "Programming Languages" },
  { id: 6, name: "R Programming", category: "Programming Languages" },

  // Core CS
  { id: 7, name: "Data Structures and Algorithms", category: "Core CS" },
  { id: 8, name: "TCP/IP Networking", category: "Core CS" },
  { id: 9, name: "Computer Networks", category: "Core CS" },
  { id: 10, name: "Operating Systems (Linux/Unix, Windows)", category: "Core CS" },

  // Web Frameworks
  { id: 11, name: "Django", category: "Web Frameworks" },
  { id: 12, name: "Streamlit", category: "Web Frameworks" },
  { id: 13, name: "Flask (Basic Exposure)", category: "Web Frameworks" },

  // Databases
  { id: 14, name: "MySQL", category: "Databases" },
  { id: 15, name: "SQL", category: "Databases" },
  { id: 16, name: "Familiarity with NoSQL databases (MongoDB)", category: "Databases" },

  // Machine Learning & AI
  { id: 17, name: "Machine Learning", category: "Machine Learning & AI" },
  { id: 18, name: "Deep Learning", category: "Machine Learning & AI" },
  { id: 19, name: "Natural Language Processing", category: "Machine Learning & AI" },
  { id: 20, name: "Generative AI (GenAI) Tools", category: "Machine Learning & AI" },
];

const Skills = () => {
  const skillsRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const categories = Array.from(new Set(skillsData.map(skill => skill.category)));
  
  // Animation effect when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Set initial category if not already set
          if (!activeCategory && categories.length > 0) {
            setActiveCategory(categories[0]);
          }
        }
      },
      { threshold: 0.1 }
    );
    
    if (skillsRef.current) observer.observe(skillsRef.current);
    
    return () => observer.disconnect();
  }, [activeCategory, categories]);

  // If no category is selected, show all skills initially
  useEffect(() => {
    if (!activeCategory && categories.length > 0) {
      setActiveCategory(categories[0]);
    }
  }, [categories]);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  const filteredSkills = activeCategory 
    ? skillsData.filter(skill => skill.category === activeCategory)
    : skillsData;

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title">My Skills</h2>
        
        <div ref={skillsRef} className="mt-12">
          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Skills buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {filteredSkills.map((skill) => (
              <button
                key={skill.id}
                className="skill-button bg-blue-50 dark:bg-dark/80 backdrop-blur-sm
                  border border-gray-200/50 dark:border-gray-700/50 px-5 py-3 rounded-lg text-lg font-medium text-gray-700 dark:text-gray-300
                  transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 hover:border-primary/50
                  transform hover:-translate-y-1 focus:outline-none animate-appear"
              >
                {skill.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
