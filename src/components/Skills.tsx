import { useEffect, useRef } from 'react';

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
];

const Skills = () => {
  const skillsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const skills = entries[0].target.querySelectorAll('.skill-button');
          skills.forEach((skill, index) => {
            setTimeout(() => {
              (skill as HTMLElement).classList.add('opacity-100');
              (skill as HTMLElement).classList.remove('opacity-0', 'translate-y-4');
            }, 50 * index);
          });
        }
      },
      { threshold: 0.1 }
    );
    
    if (skillsRef.current) observer.observe(skillsRef.current);
    
    return () => observer.disconnect();
  }, []);

  // Group skills by category
  const groupedSkills: Record<string, Skill[]> = skillsData.reduce((groups, skill) => {
    if (!groups[skill.category]) {
      groups[skill.category] = [];
    }
    groups[skill.category].push(skill);
    return groups;
  }, {} as Record<string, Skill[]>);

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-dark/95">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title">My Skills</h2>
        
        <div ref={skillsRef} className="mt-12 space-y-8">
          {Object.entries(groupedSkills).map(([category, skills]) => (
            <div key={category} className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-primary">{category}</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <button
                    key={skill.id}
                    className="skill-button bg-white dark:bg-dark/80 px-5 py-3 rounded-lg text-lg font-medium opacity-0 translate-y-4 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 transform hover:-translate-y-1 focus:outline-none"
                  >
                    {skill.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
