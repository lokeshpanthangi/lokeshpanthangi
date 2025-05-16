
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
      className="theme-toggle-btn relative w-14 h-7 rounded-full bg-gradient-to-r from-blue-200 to-blue-400 dark:from-indigo-900 dark:to-purple-900 shadow-inner transition-all duration-500 p-1"
      aria-label="Toggle dark mode"
    >
      <div 
        className={`absolute top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-full shadow transition-all duration-500 ${
          theme === 'dark' 
            ? 'right-1 bg-indigo-800 text-yellow-200' 
            : 'left-1 bg-yellow-300 text-amber-800'
        }`}
      >
        {theme === 'dark' ? (
          <Moon className="w-4 h-4 animate-pulse" />
        ) : (
          <Sun className="w-4 h-4 animate-spin-slow" />
        )}
      </div>
    </button>
  );
};
