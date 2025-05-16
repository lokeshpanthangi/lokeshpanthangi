
import { useEffect, useRef, useState } from 'react';

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) observer.observe(sectionRef.current);
    
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden"
    >
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-title with-glowing-dots inline-block relative">
            About Me
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary/30 to-primary transform scale-x-0 transition-transform duration-700 ease-out"
              style={{ transform: isVisible ? 'scaleX(1)' : 'scaleX(0)' }}></span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Passionate about creating beautiful, functional digital experiences
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mt-12">
          {/* Photo column */}
          <div 
            ref={photoRef}
            className={`lg:col-span-2 flex justify-center items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-primary/20 animate-pulse-slow"></div>
              <div className="absolute -bottom-6 -right-6 w-8 h-8 rounded-full bg-blue-400/20 animate-pulse-slow animation-delay-500"></div>
              
              {/* Main photo frame */}
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                {/* Animated gradient border */}
                <div className="absolute inset-0 animate-morph border-2 bg-gradient-to-br from-primary/30 via-blue-400/20 to-purple-500/30 rounded-2xl" />
                
                <div className="absolute inset-2 overflow-hidden animate-morph rounded-2xl shadow-lg">
                  {/* Replace with your image */}
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center p-6">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <span className="text-4xl font-bold text-primary">V</span>
                      </div>
                      <span className="text-gray-500 dark:text-gray-300 block">Your Photo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bio column */}
          <div 
            ref={bioRef} 
            className={`lg:col-span-3 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="mb-4 text-lg leading-relaxed">
                A <span className="font-semibold text-primary">Full Stack Developer</span> with a passion for creating elegant, efficient, and user-friendly web applications. My journey in technology began with a curiosity about how digital experiences are built, and it has evolved into a dedicated career crafting solutions that make a difference.
              </p>
              
              <p className="mb-4 text-lg leading-relaxed">
                With expertise in modern web technologies like <span className="font-medium">React</span>, <span className="font-medium">TypeScript</span>, and <span className="font-medium">Node.js</span>, I specialize in building responsive, accessible, and performant applications that deliver exceptional user experiences.
              </p>
              
              <p className="mb-6 text-lg leading-relaxed">
                Beyond coding, I'm passionate about continuous learning and staying at the forefront of technology trends. I believe in the power of clean code, thoughtful architecture, and collaborative development to create digital products that truly resonate with users.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
