//import React from 'react';

//import React from 'react';
import { Palette } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function Logo() {
  const { theme } = useTheme();
  
  return (
    <div className="flex items-center gap-2 mb-6">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500`}>
        <Palette size={24} className="text-white" />
      </div>
      <div>
        <h1 className="text-xl font-bold">Make-Styles</h1>
        <span className={`text-xs px-2 py-1 rounded ${
          theme === 'dark' ? 'bg-[#2a2a2a]' : 'bg-gray-100'
        }`}>v0.1 Beta</span>
      </div>
    </div>
  );
}