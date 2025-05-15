
import { useEffect } from 'react';

const Hero = () => {
  // Simple parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      document.querySelectorAll('.parallax-layer').forEach((layer: Element) => {
        const depth = (layer as HTMLElement).dataset.depth || "0.2";
        const moveX = (x * 50) * parseFloat(depth);
        const moveY = (y * 50) * parseFloat(depth);
        (layer as HTMLElement).style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center parallax gradient-bg">
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="parallax-layer" data-depth="0.1">
          {[...Array(30)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white/30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 30 + 5}px`,
                height: `${Math.random() * 30 + 5}px`,
                opacity: Math.random() * 0.5 + 0.3,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 15}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 z-10">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 text-white">
            <span className="block">Hi, I'm</span>
            <span className="text-primary inline-block animate-float">Your Name</span>
          </h1>
          
          <div className="overflow-hidden h-20 my-4">
            <div className="animate-float flex flex-col">
              <p className="text-xl md:text-3xl font-light text-white py-5">Full Stack Developer</p>
              <p className="text-xl md:text-3xl font-light text-white py-5">UI/UX Designer</p>
              <p className="text-xl md:text-3xl font-light text-white py-5">Problem Solver</p>
              <p className="text-xl md:text-3xl font-light text-white py-5">Full Stack Developer</p>
            </div>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a 
              href="#projects" 
              className="btn-custom bg-primary"
              onClick={(e) => {
                const button = e.currentTarget;
                const circle = document.createElement('span');
                const diameter = Math.max(button.clientWidth, button.clientHeight);
                const radius = diameter / 2;
                
                const rect = button.getBoundingClientRect();
                
                circle.style.width = circle.style.height = `${diameter}px`;
                circle.style.left = `${e.clientX - rect.left - radius}px`;
                circle.style.top = `${e.clientY - rect.top - radius}px`;
                circle.classList.add('ripple');
                
                const ripple = button.getElementsByClassName('ripple')[0];
                if (ripple) {
                  ripple.remove();
                }
                
                button.appendChild(circle);
              }}
            >
              View My Projects
            </a>
            <a href="#contact" className="btn-custom bg-secondary">
              Contact Me
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-white/80 flex flex-col items-center">
          <span className="text-sm mb-2">Scroll Down</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;
