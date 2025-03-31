import { useState } from 'react';
import { Home, ChevronDown, RotateCcw } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onReset: () => void;
  onTemplateSelect: (template: string) => void;
  onHomeClick: () => void;
}

export function Navbar({ onReset, onTemplateSelect, onHomeClick }: NavbarProps) {
  const { theme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const templates = [
    'video',
    'code',
    'twitter',
    'quote',
    'social',
    'banner'
  ];

  const getTemplateName = (template: string) => {
    const names: Record<string, string> = {
      video: 'Video Template',
      code: 'Code Screenshot',
      twitter: 'Twitter Screenshot',
      quote: 'Quote Design',
      social: 'Social Media Post',
      banner: 'Banner Design'
    };
    return names[template] || template;
  };

  const buttonBaseClass = `px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
    theme === 'dark' 
      ? 'hover:bg-[#3a3a3a] bg-[#2a2a2a]' 
      : 'hover:bg-gray-200 bg-gray-100'
  }`;

  return (
    <nav className="sticky top-0 z-50 flex justify-center items-center gap-4 mb-6 py-4 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 bg-white dark:bg-[#0f0f0f]">
      <button 
        onClick={onHomeClick}
        className={buttonBaseClass}
      >
        <Home size={20} />
        Home
      </button>
      
      <div className="relative">
        <button 
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
          className={buttonBaseClass}
        >
          Templates
          <ChevronDown size={20} className={`transform transition-transform duration-200 ${
            isDropdownOpen ? 'rotate-180' : ''
          }`} />
        </button>
        
        {isDropdownOpen && (
          <div 
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
            className={`absolute top-full mt-2 w-48 rounded-lg shadow-lg ${
              theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-white'
            }`}
          >
            {templates.map((template) => (
              <button
                key={template}
                onClick={() => {
                  onTemplateSelect(template);
                  setIsDropdownOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 first:rounded-t-lg last:rounded-b-lg ${
                  theme === 'dark'
                    ? 'hover:bg-[#2a2a2a]'
                    : 'hover:bg-gray-100'
                } transition-colors duration-200`}
              >
                {getTemplateName(template)}
              </button>
            ))}
          </div>
        )}
      </div>

      <button 
        onClick={onReset}
        className={buttonBaseClass}
      >
        <RotateCcw size={20} />
        Reset
      </button>
    </nav>
  );
}