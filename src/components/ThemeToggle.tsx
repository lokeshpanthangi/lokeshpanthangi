
import { useState, useEffect } from 'react';

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
      className="relative w-12 h-6 rounded-full bg-gray-300 dark:bg-gray-700 focus:outline-none transition-colors duration-500"
      aria-label="Toggle dark mode"
    >
      <span 
        className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-all duration-500 ${
          theme === 'dark' 
            ? 'transform translate-x-6 bg-primary' 
            : 'bg-yellow-400'
        }`}
      >
        {/* Sun/Moon icon */}
        <span className="absolute inset-0 flex items-center justify-center text-[8px]">
          {theme === 'dark' ? '🌙' : '☀️'}
        </span>
      </span>
    </button>
  );
};
