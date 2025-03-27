import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface ColorControlsProps {
  color1: string;
  color2: string;
  angle: number;
  gradientType: 'linear' | 'radial';
  onColor1Change: (color: string) => void;
  onColor2Change: (color: string) => void;
  onAngleChange: (angle: number) => void;
  onGradientTypeChange: (type: 'linear' | 'radial') => void;
  onPresetSelect: (color1: string, color2: string) => void;
  gradientPresets: [string, string][];
}

export function ColorControls({
  color1,
  color2,
  angle,
  gradientType,
  onColor1Change,
  onColor2Change,
  onAngleChange,
  onGradientTypeChange,
  onPresetSelect,
  gradientPresets,
}: ColorControlsProps) {
  const { theme } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm text-gray-400 mb-2 block">Gradient Type</label>
        <div className="flex gap-2">
          {['linear', 'radial'].map((type) => (
            <button
              key={type}
              onClick={() => onGradientTypeChange(type as 'linear' | 'radial')}
              className={`flex-1 py-2 rounded-lg transition-all hover:ring-2 hover:ring-blue-500 ${
                gradientType === type
                  ? 'bg-blue-500 text-white'
                  : theme === 'dark'
                  ? 'bg-[#2a2a2a]'
                  : 'bg-gray-100'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm text-gray-400 mb-2 block">Color 1</label>
        <input
          type="color"
          value={color1}
          onChange={(e) => onColor1Change(e.target.value)}
          className="w-full h-10 rounded-lg cursor-pointer"
        />
      </div>

      <div>
        <label className="text-sm text-gray-400 mb-2 block">Color 2</label>
        <input
          type="color"
          value={color2}
          onChange={(e) => onColor2Change(e.target.value)}
          className="w-full h-10 rounded-lg cursor-pointer"
        />
      </div>

      {gradientType === 'linear' && (
        <div>
          <label className="text-sm text-gray-400 mb-2 block">Angle ({angle}°)</label>
          <input
            type="range"
            min="0"
            max="360"
            value={angle}
            onChange={(e) => onAngleChange(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>
      )}

      <div>
        <label className="text-sm text-gray-400 mb-2 block">Presets</label>
        <div className="grid grid-cols-2 gap-2">
          {gradientPresets.map(([c1, c2], index) => (
            <button
              key={index}
              className="h-12 rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all"
              style={{ background: `linear-gradient(45deg, ${c1}, ${c2})` }}
              onClick={() => onPresetSelect(c1, c2)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}