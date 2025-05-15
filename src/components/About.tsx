
import { useEffect, useRef } from 'react';

const About = () => {
  const photoRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (photoRef.current) observer.observe(photoRef.current);
    if (bioRef.current) observer.observe(bioRef.current);
    
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-20 bg-light dark:bg-dark">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title">About Me</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
          <div 
            ref={photoRef}
            className="flex justify-center items-center transition-all duration-1000 opacity-0 translate-y-10"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Photo frame with animated border */}
              <div className="absolute inset-0 animate-morph border-2 border-primary rounded-full" />
              
              <div className="absolute inset-2 overflow-hidden animate-morph">
                {/* Replace with your image */}
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-500">Your Photo</span>
                </div>
              </div>
            </div>
          </div>
          
          <div 
            ref={bioRef} 
            className="transition-all duration-1000 delay-300 opacity-0 translate-y-10"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-primary">
              Hello, I'm <span className="text-secondary">Your Name</span>
            </h3>
            
            <p className="mb-4 text-lg">
              I'm a passionate developer with expertise in creating beautiful, functional web applications. 
              With a strong foundation in both frontend and backend technologies, I bring ideas to life through code.
            </p>
            
            <p className="mb-6 text-lg">
              My journey in technology started several years ago, and since then I've been continuously learning and improving my skills. 
              I believe in creating solutions that not only work well but also provide an excellent user experience.
            </p>
            
            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-4">My Skills</h4>
              <div className="flex flex-wrap">
                {["JavaScript", "React", "Node.js", "TypeScript", "HTML/CSS", "Python", "MongoDB", "UI/UX Design", "Git", "AWS"].map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <a href="#contact" className="btn-custom inline-block bg-primary">
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
