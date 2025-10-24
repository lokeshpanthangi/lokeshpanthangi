import { useEffect, useRef, useState } from 'react';

interface Skill {
  id: number;
  name: string;
  category: string;
}

const skillsData: Skill[] = [
  // Gen AI
  { id: 1, name: "AI Agents", category: "Gen AI" },
  { id: 2, name: "n8n", category: "Gen AI" },
  { id: 3, name: "LangChain", category: "Gen AI" },
  { id: 4, name: "LangGraph", category: "Gen AI" },
  { id: 5, name: "CrewAI", category: "Gen AI" },

  // RAG
  { id: 6, name: "Traditional RAG", category: "RAG" },
  { id: 7, name: "Multimodal RAG", category: "RAG" },
  { id: 8, name: "Knowledge Graphs", category: "RAG" },
  { id: 9, name: "Agentic RAG", category: "RAG" },

  // LLM
  { id: 10, name: "Transformers", category: "LLM" },
  { id: 11, name: "Fine-Tuning (Unsloth)", category: "LLM" },

  // Machine Learning
  { id: 12, name: "Supervised Learning", category: "Machine Learning" },
  { id: 13, name: "Unsupervised Learning", category: "Machine Learning" },
  { id: 14, name: "Deep Learning", category: "Machine Learning" },

  // Core CS
  { id: 15, name: "Data Structures and Algorithms", category: "Core CS" },
  { id: 16, name: "TCP/IP Networking", category: "Core CS" },
  { id: 17, name: "Computer Networks", category: "Core CS" },
  { id: 18, name: "Operating Systems", category: "Core CS" },
  { id: 19, name: "OOP", category: "Core CS" },

  // Databases
  { id: 20, name: "MySQL", category: "Databases" },
  { id: 21, name: "SQL", category: "Databases" },
  { id: 22, name: "Redis", category: "Databases" },
  { id: 23, name: "GraphDB", category: "Databases" },

  // Development
  { id: 24, name: "Python", category: "Development" },
  { id: 25, name: "React", category: "Development" },
  { id: 26, name: "FastAPI", category: "Development" },
  { id: 27, name: "Pydantic", category: "Development" },
  { id: 28, name: "Streamlit", category: "Development" },
  { id: 29, name: "Docker", category: "Development" },
  { id: 30, name: "AWS", category: "Development" },
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
