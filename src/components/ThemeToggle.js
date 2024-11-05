// ThemeToggle.js
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../ThemeContext';

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className={`fixed bottom-4 right-4 p-3 rounded-lg backdrop-blur-md 
        transform hover:scale-110 transition-all duration-300 z-50 group
        ${darkMode 
          ? 'bg-black/50 hover:bg-black/70 border border-[#FF008C]/20' 
          : 'bg-white/50 hover:bg-white/70 border border-[#00F0FF]/20'
        }`}
      aria-label="Toggle Dark Mode"
    >
      {darkMode ? (
        <Sun className="w-6 h-6 text-[#FF008C] group-hover:text-[#00F0FF] transition-colors duration-300" />
      ) : (
        <Moon className="w-6 h-6 text-[#00F0FF] group-hover:text-[#FF008C] transition-colors duration-300" />
      )}
    </button>
  );
};

export default ThemeToggle;