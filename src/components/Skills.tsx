
import { useEffect, useRef, useState } from 'react';

interface Skill {
  id: number;
  name: string;
  category: string;
}

const skillsData: Skill[] = [
  // Frontend
  { id: 1, name: "React", category: "Frontend" },
  { id: 2, name: "JavaScript", category: "Frontend" },
  { id: 3, name: "TypeScript", category: "Frontend" },
  { id: 4, name: "HTML5", category: "Frontend" },
  { id: 5, name: "CSS3", category: "Frontend" },
  { id: 6, name: "Tailwind CSS", category: "Frontend" },
  { id: 7, name: "Material UI", category: "Frontend" },
  { id: 8, name: "Redux", category: "Frontend" },
  
  // Backend
  { id: 9, name: "Node.js", category: "Backend" },
  { id: 10, name: "Express", category: "Backend" },
  { id: 11, name: "MongoDB", category: "Backend" },
  { id: 12, name: "PostgreSQL", category: "Backend" },
  { id: 13, name: "GraphQL", category: "Backend" },
  { id: 14, name: "REST API", category: "Backend" },
  
  // DevOps & Tools
  { id: 15, name: "Git", category: "Tools" },
  { id: 16, name: "Docker", category: "DevOps" },
  { id: 17, name: "AWS", category: "Cloud" },
  { id: 18, name: "CI/CD", category: "DevOps" },
  { id: 19, name: "Jest", category: "Testing" },
  { id: 20, name: "Webpack", category: "Tools" },
  
  // Other
  { id: 21, name: "Figma", category: "Design" },
  { id: 22, name: "Agile", category: "Methodology" },
  { id: 23, name: "JIRA", category: "Tools" },
  { id: 24, name: "Python", category: "Languages" },
  // Cloud
  { id: 25, name: "AWS EC2", category: "Cloud" },
  { id: 26, name: "AWS S3", category: "Cloud" },
  { id: 27, name: "AWS Lambda", category: "Cloud" },
  { id: 28, name: "Google Cloud", category: "Cloud" },
  { id: 29, name: "Azure", category: "Cloud" },
  { id: 30, name: "Kubernetes", category: "Cloud" },
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
    <section id="skills" className="py-20 bg-gray-50 dark:bg-dark/95">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title">My Skills</h2>
        
        <div ref={skillsRef} className="mt-12">
          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`category-button px-6 py-3 rounded-lg text-lg font-medium transition-all duration-300 
                  ${activeCategory === category 
                    ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                    : 'bg-white dark:bg-dark/80 text-gray-700 dark:text-gray-300 hover:shadow-md border-2 border-gray-200 dark:border-gray-700'}`}
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
                className="skill-button bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 
                  border border-gray-200 dark:border-gray-700 px-5 py-3 rounded-lg text-lg font-medium text-gray-800 dark:text-gray-200
                  transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/60 
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
