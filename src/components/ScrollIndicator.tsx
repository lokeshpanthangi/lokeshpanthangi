
import { useState, useEffect } from 'react';

const ScrollIndicator = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const updateScrollProgress = () => {
      const currentScrollPosition = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = (currentScrollPosition / scrollHeight) * 100;
      setScrollProgress(scrollPercentage);
    };
    
    window.addEventListener('scroll', updateScrollProgress);
    
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div 
      className="scroll-indicator" 
      style={{ width: `${scrollProgress}%` }}
    />
  );
};

export default ScrollIndicator;
