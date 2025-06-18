import { useEffect, useState } from 'react';
import SplitText from './ui/SplitText';

const Hero = () => {
  const [nameAnimationComplete, setNameAnimationComplete] = useState(false);

  useEffect(() => {
    // Check local storage to see if the animation has already been shown
    const animationShown = localStorage.getItem('nameAnimationShown');
    
    if (!animationShown) {
      // If animation hasn't been shown, mark it as complete after timeout
      const timer = setTimeout(() => {
        setNameAnimationComplete(true);
        localStorage.setItem('nameAnimationShown', 'true');
      }, 3000); // 3 seconds for animation
      
      return () => clearTimeout(timer);
    } else {
      // If animation has been shown before, skip it
      setNameAnimationComplete(true);
    }
  }, []);

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

  const handleNameAnimationComplete = () => {
    setNameAnimationComplete(true);
  };

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
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
            <SplitText 
              text="Hi, I'm" 
              className="mr-2"
              delay={50}
              duration={0.8}
              from={{ opacity: 0, y: 50 }}
              to={{ opacity: 1, y: 0 }}
              splitType="words"
            />
            <SplitText 
              text="Venkata Lokesh Panthangi" 
              className="text-primary"
              delay={80}
              duration={0.8}
              from={{ opacity: 0, y: 50, rotationX: -90 }}
              to={{ opacity: 1, y: 0, rotationX: 0 }}
              onLetterAnimationComplete={handleNameAnimationComplete}
            />
          </h1>
          
          <div className="h-16 my-4 overflow-visible">
            <SplitText 
              text=" • AI & ML Engineer • Deep Learning Specialist"
              className="text-lg md:text-2xl font-light text-white"
              delay={30}
              duration={0.5}
              from={{ opacity: 0, y: 20 }}
              to={{ opacity: 1, y: 0 }}
              splitType="words"
              threshold={0.5}
            />
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a 
              href="#projects" 
              className="btn-custom bg-primary"
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
