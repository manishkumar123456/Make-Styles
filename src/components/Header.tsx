import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex justify-between items-center mb-6">
      <div></div>
      <button 
        onClick={toggleTheme}
        className="p-2 rounded-lg bg-[#2a2a2a] hover:bg-[#3a3a3a] transition-colors"
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </div>
  );
}