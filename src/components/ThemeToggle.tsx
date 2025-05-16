
import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Check for user's preferred theme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else if (prefersDark) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-btn relative w-14 h-7 rounded-full shadow-inner transition-all duration-500 p-1 overflow-hidden"
      aria-label="Toggle dark mode"
    >
      <div className="absolute inset-0 theme-toggle-background"></div>
      
      <div 
        className={`absolute top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-full shadow-lg z-10 transition-all duration-500 theme-toggle-icon ${
          theme === 'dark' 
            ? 'right-1 bg-indigo-800 text-yellow-200' 
            : 'left-1 bg-yellow-300 text-amber-800'
        }`}
      >
        {theme === 'dark' ? (
          <Moon className="w-4 h-4" />
        ) : (
          <Sun className="w-4 h-4" />
        )}
      </div>
      
      {/* Background stars in dark mode */}
      <div className={`stars-container ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}>
        {[...Array(8)].map((_, i) => (
          <span 
            key={i} 
            className="star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDelay: `${Math.random() * 2}s`
            }}
          ></span>
        ))}
      </div>
      
      {/* Sun rays in light mode */}
      <div className={`sun-rays ${theme === 'light' ? 'opacity-100' : 'opacity-0'}`}>
        {[...Array(8)].map((_, i) => (
          <span 
            key={i} 
            className="sun-ray" 
            style={{ transform: `rotate(${i * 45}deg)` }}
          ></span>
        ))}
      </div>
    </button>
  );
};
