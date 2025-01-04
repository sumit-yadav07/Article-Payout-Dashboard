import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { loadTheme, saveTheme } from '../../utils/theme';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(() => loadTheme());

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    saveTheme(newMode);
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Initialize theme on mount
  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <button
      onClick={toggleDarkMode}
      className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;