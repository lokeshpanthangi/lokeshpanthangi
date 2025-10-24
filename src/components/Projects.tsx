import { useState, useRef, useEffect } from 'react';
import { Github } from 'lucide-react';

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
    title: "TaskPal",
    description: `🚀 TaskPal: Ultimate Task & Project Management App\n\nTaskPal is a feature-rich task and project management app designed for individuals and teams, offering secure authentication, customizable user profiles, and theme switching. Users can create, organize, and manage tasks with labels, categories, dependencies, and recurring options. Projects feature dashboards, progress tracking, and team collaboration. The app includes a calendar view, productivity analytics, and real-time notifications. Built with React, TypeScript, and Tailwind CSS (frontend), and powered by Supabase for backend services, TaskPal supports JWT-based authentication, file storage, and real-time updates. It targets individuals, teams, freelancers, and students, providing flexible project management and planning. Future plans include mobile apps, advanced analytics, AI-powered assistance, and integrations with popular tools.`,
    technologies: [
      "React 18 with TypeScript",
      "Tailwind CSS",
      "Supabase (PostgreSQL, Auth, Storage, Realtime)",
      "Vite (Build Tool)",
      "Framer Motion (Animations)",
      "React Query (State Management)"
    ],
    image: "/taskpal.jpg",
    github: "https://github.com/lokeshpanthangi/taskpal-official",
    demo: "https://taskpal-official.onrender.com",
    featured: true,
    color: "#3a86ff"
  },
  {
    id: 2,
    title: "EchoVoice",
    description: `🌊 EchoVerse: Your Time Capsule for Voice Memories\n\nEchoVerse is a modern voice journaling app that lets users record audio messages as time capsules, set future unlock dates, and tag them with moods. It features a timeline view, mood tracking, user reflections, and responsive design for both desktop and mobile. Users can personalize their profiles and switch between dark and light themes. The app ensures data security with row-level security and secure authentication via Supabase. Built with a clean and intuitive UI, EchoVerse offers a seamless experience for capturing and revisiting voice memories.`,
    technologies: [
      "React",
      "Supabase (PostgreSQL, Auth, Storage)",
      "Vite",
      "TypeScript",
      "Tailwind CSS",
      "React Query"
    ],
    image: "/echovoice.jpg",
    github: "https://github.com/lokeshpanthangi/EchoVoice-official",
    demo: "https://echovoice-official.vercel.app/",
    color: "#a259f7"
  },
  {
    id: 3,
    title: "WiseChoice",
    description: `🌐 WiseChoice: Your Intelligent Shopping Companion\n\nWiseChoice is an AI-powered shopping assistant designed to help users make informed purchasing decisions. It analyzes product reviews to filter out fake ones, performs sentiment analysis, and offers a concise review summary. It also assesses price fairness by comparing prices across platforms and provides a product grade (S, A, B, C, D) based on quality and price. Users can interact with an AI chatbot for queries. Built with a robust backend and a modern frontend, WiseChoice offers a seamless shopping experience.`,
    technologies: [
      "Flask (Python)",
      "Selenium (Web Scraping)",
      "Transformers (NLP)",
      "NLTK (Natural Language Processing)",
      "Scipy",
      "Next.js",
      "React",
      "Tailwind CSS"
    ],
    image: "/wisechoice.jpg",
    github: "https://github.com/lokeshpanthangi/WiseChoice",
    color: "#e0e0e0"
  },
  {
    id: 4,
    title: "BookBurst",
    description: `📚 BookBurst - Summary\n\nBookBurst is a modern web application for book enthusiasts, enabling users to track, discover, and share their reading journeys. Users can maintain a personal bookshelf, discover new books, connect with other readers, and view personalized reading statistics. The app features a clean, responsive design with dark mode support, allowing users to write private notes, share reviews, and explore their reading timeline.`,
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui (Radix UI)",
      "React Query",
      "Context API",
      "Supabase (Auth, Database, Storage)",
      "Vite",
      "Netlify",
      "Render"
    ],
    image: "/bookburst.jpg",
    github: "https://github.com/lokeshpanthangi/BookBurst-Official",
    demo: "https://bookburst-official.vercel.app/",
    color: "#00f0ff"
  },
  {
    id: 5,
    title: "Slack Clone with AI Integration",
    description: `🚀 Slack Clone with AI Integration\n\nA modern, feature-rich Slack clone built with React, TypeScript, and AI-powered capabilities. This application provides real-time messaging, workspace management, and intelligent features like tone analysis and AI-assisted communication. Features include authentication & user management, real-time messaging in channels, direct messages, threaded conversations, message reactions, file sharing, and AI features such as tone analysis, AI Assistant (@zani), smart replies, and meeting notes generation. The app has beautiful, responsive design with dark/light theme support and mobile-friendly interface.`,
    technologies: [
      "React 18",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "shadcn/ui & Radix UI",
      "Framer Motion",
      "React Context",
      "TanStack Query",
      "OpenAI API"
    ],
    image: "/tiller-blog-slack-brand-audit-960x540.png",
    github: "https://github.com/lokeshpanthangi/slack-mock1",
    demo: "https://slack-mock1.vercel.app",
    featured: true,
    color: "#6B2A6B"
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
    <section id="projects" className="py-20 relative overflow-hidden bg-white dark:bg-gray-900">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-baseline justify-center gap-4 mb-4">
            <h2 className="section-title with-glowing-dots">Featured Projects</h2>
            <a 
              href="https://github.com/lokeshpanthangi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-all duration-300 hover:scale-110 group -translate-y-1 md:-translate-y-2"
              title="View all projects on GitHub"
            >
              <Github 
                size={20} 
                className="md:w-6 md:h-6 text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors" 
              />
            </a>
          </div>
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
            <p className="text-xl text-gray-500 dark:text-gray-400">No projects found.</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/80 transition-colors"
            >
              Refresh Page
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
