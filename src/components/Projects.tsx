
import { useState, useRef, useEffect } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  github?: string;
  demo?: string;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform built with React, Node.js, and MongoDB. Features include product listings, shopping cart, user authentication, and payment processing.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800",
    github: "https://github.com",
    demo: "https://demo.com"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A productivity app for managing tasks and projects with team collaboration features. Built with React and Firebase.",
    technologies: ["React", "Firebase", "Material UI", "React DnD"],
    image: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?q=80&w=800",
    github: "https://github.com",
    demo: "https://demo.com"
  },
  {
    id: 3,
    title: "AI Image Generator",
    description: "A web application that uses machine learning to generate unique images based on text prompts.",
    technologies: ["Python", "TensorFlow", "React", "Flask"],
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=800",
    github: "https://github.com",
    demo: "https://demo.com"
  },
  {
    id: 4,
    title: "Social Media Dashboard",
    description: "A comprehensive analytics dashboard for tracking social media performance across multiple platforms.",
    technologies: ["Vue.js", "D3.js", "Node.js", "Express"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
    github: "https://github.com",
  }
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const projectsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const projects = entries[0].target.querySelectorAll('.project-card');
          projects.forEach((project, index) => {
            setTimeout(() => {
              (project as HTMLElement).classList.add('opacity-100');
              (project as HTMLElement).classList.remove('opacity-0', 'translate-y-10');
            }, 100 * index);
          });
        }
      },
      { threshold: 0.1 }
    );
    
    if (projectsRef.current) observer.observe(projectsRef.current);
    
    return () => observer.disconnect();
  }, []);
  
  const openModal = (project: Project) => {
    setSelectedProject(project);
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
    <section id="projects" className="py-20 bg-gray-50 dark:bg-dark/90">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title">Projects</h2>
        
        <div 
          ref={projectsRef}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {projectsData.map((project) => (
            <div 
              key={project.id}
              className="project-card opacity-0 translate-y-10 transition-all duration-500 cursor-pointer"
              onClick={() => openModal(project)}
            >
              <div className="project-card-inner bg-white dark:bg-dark/80 rounded-xl overflow-hidden h-full
                hover:shadow-[0_0_25px_rgba(58,134,255,0.6)] transition-all duration-300 transform hover:-translate-y-3
                hover:scale-105">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span 
                        key={tech} 
                        className="text-xs px-2 py-1 bg-primary/10 text-primary dark:bg-primary/20 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <div className={`fixed inset-0 z-50 ${modalOpen ? 'modal-open' : 'hidden'}`}>
        <div className="modal-overlay" onClick={closeModal}></div>
        <div className="modal-content">
          {selectedProject && (
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">{selectedProject.title}</h3>
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
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="mb-6">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {selectedProject.description}
                </p>
                
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-3 py-1 bg-primary/10 text-primary dark:bg-primary/20 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                {selectedProject.github && (
                  <a 
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-custom bg-gray-800 dark:bg-gray-700"
                  >
                    GitHub Repository
                  </a>
                )}
                {selectedProject.demo && (
                  <a 
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-custom bg-primary"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
