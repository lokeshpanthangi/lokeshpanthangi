
import { useState, useRef, useEffect } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  github?: string;
  demo?: string;
  featured?: boolean;
  color?: string;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform built with React, Node.js, and MongoDB. Features include product listings, shopping cart, user authentication, and payment processing.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800",
    github: "https://github.com",
    demo: "https://demo.com",
    featured: true,
    color: "#3a86ff"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A productivity app for managing tasks and projects with team collaboration features. Built with React and Firebase.",
    technologies: ["React", "Firebase", "Material UI", "React DnD"],
    image: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?q=80&w=800",
    github: "https://github.com",
    demo: "https://demo.com",
    color: "#4cc9f0"
  },
  {
    id: 3,
    title: "AI Image Generator",
    description: "A web application that uses machine learning to generate unique images based on text prompts.",
    technologies: ["Python", "TensorFlow", "React", "Flask"],
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=800",
    github: "https://github.com",
    demo: "https://demo.com",
    featured: true,
    color: "#f72585"
  },
  {
    id: 4,
    title: "Social Media Dashboard",
    description: "A comprehensive analytics dashboard for tracking social media performance across multiple platforms.",
    technologies: ["Vue.js", "D3.js", "Node.js", "Express"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
    github: "https://github.com",
    color: "#7209b7"
  }
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Show all projects by default
  const filteredProjects = projectsData;
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const projects = entries[0].target.querySelectorAll('.project-card');
          projects.forEach((project, index) => {
            setTimeout(() => {
              (project as HTMLElement).classList.add('project-card-visible');
            }, 150 * index);
          });
        }
      },
      { threshold: 0.1 }
    );
    
    if (projectsRef.current) observer.observe(projectsRef.current);
    
    return () => observer.disconnect();
  }, []); // Run once on component mount
  
  // Handle mouse move for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    if (!hoveredProject || hoveredProject !== id) return;
    
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top; // y position within the element
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Reduce tilt effect significantly
    const rotateX = (y - centerY) / 30;
    const rotateY = (centerX - x) / 30;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };
  
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setHoveredProject(null);
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  };
  
  const openModal = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.classList.add('modal-closing');
      setTimeout(() => {
        setModalOpen(false);
        document.body.style.overflow = 'auto';
        if (modalRef.current) modalRef.current.classList.remove('modal-closing');
      }, 300);
    } else {
      setModalOpen(false);
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden project-section">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-title with-glowing-dots">Featured Projects</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Explore my latest work and creative solutions. Each project represents a unique challenge and innovative approach.
          </p>
        </div>
        
        {/* Projects section without filters */}
        
        {/* Projects Grid */}
        <div 
          ref={projectsRef}
          className="projects-container"
        >
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              className="project-card"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseMove={(e) => handleMouseMove(e, project.id)}
              onMouseLeave={handleMouseLeave}
              onClick={() => openModal(project)}
              style={{
                '--project-color': project.color || '#3a86ff'
              } as React.CSSProperties}
            >
              <div className="project-card-inner">
                <div className="project-image-container">
                  <div className="project-overlay"></div>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="project-image"
                  />
                  {project.featured && (
                    <div className="featured-badge">
                      <span>Featured</span>
                    </div>
                  )}
                </div>
                
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description line-clamp-2">{project.description}</p>
                  
                  <div className="project-tech-stack">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  
                  <div className="project-links">
                    {project.github && (
                      <a 
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link github"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        <span>Code</span>
                      </a>
                    )}
                    {project.demo && (
                      <a 
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link demo"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14 9v6h-4v-6h4zm2-2h-8v10h8v-10zm-6-8h-10v22h22v-22h-10v-2h-2v2zm-10 2h18v18h-18v-18z"/>
                        </svg>
                        <span>Demo</span>
                      </a>
                    )}
                  </div>
                </div>
                
                <div className="card-shine"></div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500 dark:text-gray-400">No projects found with the selected filter.</p>
            <button 
              onClick={() => setActiveCategory('all')}
              className="mt-4 px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/80 transition-colors"
            >
              View All Projects
            </button>
          </div>
        )}
      </div>

      {/* Project Modal */}
      {modalOpen && (
        <div className="project-modal-backdrop" onClick={closeModal}>
          <div 
            ref={modalRef}
            className="project-modal-container"
            onClick={(e) => e.stopPropagation()}
            style={{
              '--project-color': selectedProject?.color || '#3a86ff'
            } as React.CSSProperties}
          >
            {selectedProject && (
              <div className="project-modal-content">
                <button 
                  onClick={closeModal}
                  className="modal-close-btn"
                  aria-label="Close modal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
                
                <div className="modal-header">
                  <h2 className="modal-title">{selectedProject.title}</h2>
                  {selectedProject.featured && (
                    <span className="modal-featured-badge">Featured Project</span>
                  )}
                </div>
                
                <div className="modal-image-container">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    className="modal-image"
                  />
                </div>
                
                <div className="modal-body">
                  <div className="modal-description">
                    <h3 className="modal-section-title">Project Overview</h3>
                    <p>{selectedProject.description}</p>
                  </div>
                  
                  <div className="modal-tech-stack">
                    <h3 className="modal-section-title">Technologies Used</h3>
                    <div className="modal-tech-tags">
                      {selectedProject.technologies.map((tech) => (
                        <span key={tech} className="modal-tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="modal-actions">
                    {selectedProject.github && (
                      <a 
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modal-action-btn github"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        View Source Code
                      </a>
                    )}
                    {selectedProject.demo && (
                      <a 
                        href={selectedProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modal-action-btn demo"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14 9v6h-4v-6h4zm2-2h-8v10h8v-10zm-6-8h-10v22h22v-22h-10v-2h-2v2zm-10 2h18v18h-18v-18z"/>
                        </svg>
                        View Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
