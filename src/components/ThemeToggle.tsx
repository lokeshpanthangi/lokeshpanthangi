
import { useState, useEffect } from 'react';
import { Sun, Moon, Stars } from 'lucide-react';

export const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');
  const [isAnimating, setIsAnimating] = useState(false);

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
    setIsAnimating(true);
    setTimeout(() => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', newTheme);
      setTimeout(() => setIsAnimating(false), 800);
    }, 150);
  };

  return (
    <div className="theme-toggle-wrapper relative">
      <button
        onClick={toggleTheme}
        className={`theme-toggle-btn relative w-14 h-7 rounded-full overflow-hidden transition-all duration-500 ${isAnimating ? 'animate-wiggle' : ''}`}
        aria-label="Toggle dark mode"
      >
        {/* Day/Night background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Sky background */}
          <div 
            className={`absolute inset-0 transition-all duration-700 ${theme === 'dark' 
              ? 'bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-800' 
              : 'bg-gradient-to-b from-blue-300 via-blue-200 to-blue-100'}`}
          ></div>
          
          {/* Sun/Moon */}
          <div 
            className={`absolute w-8 h-8 rounded-full transition-all duration-700 ${isAnimating ? 'scale-110' : ''} ${theme === 'dark' 
              ? 'bg-gray-200 right-1 top-1 shadow-[0_0_10px_rgba(255,255,255,0.5)]' 
              : 'bg-yellow-300 left-1 top-1 shadow-[0_0_15px_rgba(255,193,7,0.7)]'}`}
          ></div>
          
          {/* Stars - only visible in dark mode */}
          {theme === 'dark' && (
            <div className="absolute inset-0">
              {Array.from({ length: 8 }).map((_, i) => (
                <span 
                  key={i}
                  className="absolute w-0.5 h-0.5 bg-white rounded-full"
                  style={{
                    top: `${10 + Math.random() * 80}%`,
                    left: `${10 + Math.random() * 80}%`,
                    opacity: 0.4 + Math.random() * 0.6,
                    animation: `twinkle ${1 + Math.random() * 2}s ease-in-out infinite ${Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          )}
          
          {/* Clouds - only visible in light mode */}
          {theme === 'light' && (
            <div className="absolute inset-0 overflow-hidden">
              <div 
                className="absolute w-5 h-2 bg-white rounded-full opacity-70"
                style={{ top: '30%', left: '60%' }}
              ></div>
              <div 
                className="absolute w-4 h-2 bg-white rounded-full opacity-80"
                style={{ top: '20%', left: '30%' }}
              ></div>
            </div>
          )}
        </div>
        
        {/* Toggle indicator */}
        <div 
          className={`absolute bottom-1 w-5 h-5 rounded-full z-10 transition-all duration-700 flex items-center justify-center ${isAnimating ? 'scale-90' : 'scale-100'} ${
            theme === 'dark' 
              ? 'right-1 bg-indigo-700 text-gray-200' 
              : 'left-1 bg-blue-400 text-white'
          }`}
        >
          {theme === 'dark' ? (
            <Moon className="w-3 h-3" />
          ) : (
            <Sun className="w-3 h-3" />
          )}
        </div>
      </button>
      
      {/* Decorative glow effect */}
      <div 
        className={`absolute -inset-1 rounded-full opacity-0 transition-opacity duration-300 ${isAnimating ? 'opacity-100' : ''} ${theme === 'dark' ? 'bg-indigo-500/20' : 'bg-yellow-300/20'}`}
      ></div>
    </div>
  );
};
