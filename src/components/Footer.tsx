import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);
  const controls = useAnimation();
  const inView = useInView(footerRef, { once: false });

  useEffect(() => {
    if (inView) {
      controls.start({ scale: [1.2, 1], opacity: 1, transition: { duration: 0.8, type: 'spring', bounce: 0.5 } });
    } else {
      controls.set({ scale: 0.8, opacity: 0 });
    }
  }, [inView, controls]);

  return (
    <footer className="bg-dark text-white py-8" ref={footerRef}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <motion.a
              href="#home"
              className="text-2xl font-bold text-blue-500 bg-gradient-to-r from-blue-400 via-pink-500 to-purple-500 bg-clip-text text-transparent"
              animate={controls}
              initial={{ scale: 0.8, opacity: 0 }}
            >
              Lokesh
            </motion.a>
            <p className="mt-1 text-gray-400">Bringing ideas to life through code</p>
          </div>
        </div>
        
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© {currentYear} Your Name. All rights reserved.</p>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-6">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-500 transition-colors"
            >
              GitHub
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-500 transition-colors"
            >
              LinkedIn
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-500 transition-colors"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
