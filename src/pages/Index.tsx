
import { useEffect } from 'react';
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

  return (
    <div className="relative">
      <ScrollIndicator />
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Resume />
        <Blogs />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
