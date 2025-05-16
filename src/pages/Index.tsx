
import { useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Resume from '@/components/Resume';
import Skills from '@/components/Skills';
import Blogs from '@/components/Blogs';
import Certificates from '@/components/Certificates';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollIndicator from '@/components/ScrollIndicator';

const Index = () => {
  // Refs for all sections to apply scroll animations
  const aboutRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const resumeRef = useRef<HTMLElement>(null);
  const blogsRef = useRef<HTMLElement>(null);
  const certificatesRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  
  // Smooth scroll behavior
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.hash && link.href.includes(window.location.pathname)) {
        e.preventDefault();
        
        const targetElement = document.querySelector(link.hash);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
            behavior: 'smooth'
          });
          
          // Update URL without refreshing the page
          window.history.pushState(null, '', link.hash);
        }
      }
    };
    
    document.addEventListener('click', handleLinkClick);
    
    return () => document.removeEventListener('click', handleLinkClick);
  }, []);

  // Add water ripple effect on click
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      // Skip if clicking on interactive elements
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.closest('input') !== null ||
        target.closest('textarea') !== null
      ) {
        return;
      }
      
      // Create ripple
      const ripple = document.createElement('div');
      ripple.className = 'absolute bg-primary/10 rounded-full animate-ripple';
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      ripple.style.width = '10px';
      ripple.style.height = '10px';
      document.body.appendChild(ripple);
      
      // Clean up ripple after animation
      setTimeout(() => {
        ripple.remove();
      }, 600);
    };
    
    document.addEventListener('click', handleDocumentClick);
    
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  // Set up intersection observers for scroll animations
  useEffect(() => {
    const sectionRefs = [
      { ref: aboutRef, className: 'about-section' },
      { ref: skillsRef, className: 'skills-section' },
      { ref: projectsRef, className: 'projects-section' },
      { ref: resumeRef, className: 'resume-section' },
      { ref: blogsRef, className: 'blogs-section' },
      { ref: certificatesRef, className: 'certificates-section' },
      { ref: contactRef, className: 'contact-section' }
    ];
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px'
    };
    
    const observers: IntersectionObserver[] = [];
    
    sectionRefs.forEach(({ ref, className }) => {
      if (!ref.current) return;
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-animated');
          }
        });
      }, observerOptions);
      
      observer.observe(ref.current);
      observers.push(observer);
    });
    
    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  return (
    <div className="relative">
      <ScrollIndicator />
      <Header />
      <main>
        <Hero />
        
        <div ref={aboutRef as React.RefObject<HTMLDivElement>} className="section-fade">
          <About />
        </div>
        
        <div ref={skillsRef as React.RefObject<HTMLDivElement>} className="section-slide-right">
          <Skills />
        </div>
        
        <div ref={projectsRef as React.RefObject<HTMLDivElement>} className="section-scale">
          <Projects />
        </div>
        
        <div ref={resumeRef as React.RefObject<HTMLDivElement>} className="section-slide-left">
          <Resume />
        </div>
        
        <div ref={blogsRef as React.RefObject<HTMLDivElement>} className="section-fade">
          <Blogs />
        </div>
        
        <div ref={certificatesRef as React.RefObject<HTMLDivElement>} className="section-slide-right">
          <Certificates />
        </div>
        
        <div ref={contactRef as React.RefObject<HTMLDivElement>} className="section-scale">
          <Contact />
        </div>
      </main>
      <Footer />
      
      <style jsx global>{`
        .section-fade, 
        .section-slide-right, 
        .section-slide-left, 
        .section-scale {
          opacity: 0;
          transition: all 0.8s ease-out;
        }
        
        .section-fade {
          transform: translateY(50px);
        }
        
        .section-slide-right {
          transform: translateX(-50px);
        }
        
        .section-slide-left {
          transform: translateX(50px);
        }
        
        .section-scale {
          transform: scale(0.9);
        }
        
        .section-fade.section-animated,
        .section-slide-right.section-animated,
        .section-slide-left.section-animated,
        .section-scale.section-animated {
          opacity: 1;
          transform: translate(0) scale(1);
        }
      `}</style>
    </div>
  );
};

export default Index;
