import React from 'react';
import { Download, Smartphone, Monitor, Square } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface SizeControlsProps {
  selectedSize: string;
  onSizeChange: (size: string) => void;
  onDownload: () => void;
}

export function SizeControls({ selectedSize, onSizeChange, onDownload }: SizeControlsProps) {
  const { theme } = useTheme();
  const sizes = [
    { name: 'Desktop', icon: Monitor, dimensions: '1920x1080' },
    { name: 'Mobile', icon: Smartphone, dimensions: '390x844' },
    { name: 'Square', icon: Square, dimensions: '1080x1080' }
  ];
  
  return (
    <div className="mt-auto space-y-4">
      <label className="text-sm text-gray-400 block">Canvas Size</label>
      <div className="grid grid-cols-3 gap-2">
        {sizes.map(({ name, icon: Icon, dimensions }) => (
          <button
            key={name}
            onClick={() => onSizeChange(name)}
            className={`p-3 rounded-lg flex flex-col items-center gap-2 transition-all ${
              selectedSize === name
                ? 'bg-blue-500 text-white'
                : theme === 'dark'
                ? 'bg-[#2a2a2a] hover:bg-[#3a3a3a]'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <Icon size={20} />
            <div className="text-center">
              <div className="text-sm">{name}</div>
              <div className="text-xs opacity-60">{dimensions}</div>
            </div>
          </button>
        ))}
      </div>
      <button
        onClick={onDownload}
        className="w-full bg-white text-black rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
      >
        <Download size={20} />
        Download
      </button>
    </div>
  );
}