 // old code
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

import { 
  Smartphone, 
  Laptop, 
  BoxSelect, 
  Layers, 
  Sparkles, 
  Cuboid as Cube, 
  Phone, 
  LampDesk as Desktop, 
  AppWindow as Window, 
  Tablet,
  Square,
  Circle
} from 'lucide-react';


import { Smartphone, Laptop, BoxSelect, Layers, Sparkles, Cuboid as Cube, Phone, LampDesk as Desktop, AppWindow as Window, Tablet } from 'luc

interface EffectsControlsProps {
  blur: number;
  opacity: number;
  rotation: number;
  scale: number;
  skew: number;
  brightness: number;
  contrast: number;
  onBlurChange: (value: number) => void;
  onOpacityChange: (value: number) => void;
  onRotationChange: (value: number) => void;
  onScaleChange: (value: number) => void;
  onSkewChange: (value: number) => void;
  onBrightnessChange: (value: number) => void;
  onContrastChange: (value: number) => void;
}

export function EffectsControls({
  blur,
  opacity,
  rotation,
  scale,
  skew,
  brightness,
  contrast,
  onBlurChange,
  onOpacityChange,
  onRotationChange,
  onScaleChange,
  onSkewChange,
  onBrightnessChange,
  onContrastChange,
}: EffectsControlsProps) {
  const { theme } = useTheme();
  const [activeEffect, setActiveEffect] = useState<string | null>(null);
  
  // NEW: Pattern state (self-contained for now)
  const [activePattern, setActivePattern] = useState<string>('none');
  const [patternIntensity, setPatternIntensity] = useState(67);
  const [patternRotation, setPatternRotation] = useState(0);
  const [patternOpacity, setPatternOpacity] = useState(108);
  const [patternBlur, setPatternBlur] = useState(0);
  const [patternBlending, setPatternBlending] = useState('normal');
  
  const mockups = [
    { name: 'iPhone', icon: Phone, transform: 'rotate(-10deg) perspective(1000px)' },
    { name: 'MacBook', icon: Laptop, transform: 'rotate(-5deg) perspective(2000px) rotateX(45deg)' },
    { name: 'Browser', icon: Window, transform: 'perspective(1000px) rotateX(5deg)' },
    { name: 'iPad', icon: Tablet, transform: 'rotate(15deg) perspective(1000px)' },
    { name: 'Desktop', icon: Desktop, transform: 'perspective(2000px) rotateY(-20deg)' },
    { name: 'Android', icon: Smartphone, transform: 'rotate(10deg) perspective(1000px)' }
  ];

  const effects = [
    { name: 'Isometric', icon: Cube, transform: 'perspective(1000px) rotateX(45deg) rotateZ(45deg)' },
    { name: 'Perspective', icon: BoxSelect, transform: 'perspective(1000px) rotateX(15deg)' },
    { name: 'Float', icon: Sparkles, transform: 'translateY(-10px) rotate(2deg)' },
    { name: 'Tilt', icon: Layers, transform: 'perspective(1000px) rotateY(15deg)' }
  ];

  // Simplified patterns with basic icons
  const patterns = [
    { name: 'None', icon: Square, type: 'none' },
    { name: 'Circles', icon: Circle, type: 'circles' },
    { name: 'Dots', icon: Circle, type: 'dots' },
    { name: 'Grid', icon: Square, type: 'grid' }
  ];

  const blendModes = ['normal', 'multiply', 'screen', 'overlay', 'soft-light'];

  const sliderClass = "w-full accent-blue-500";
  const labelClass = "text-sm text-gray-400 mb-2 block";
  const valueClass = "text-xs text-gray-400 mb-1 block";

  const handleEffectClick = (effect: string, transform: string) => {
    setActiveEffect(effect);
    onRotationChange(0);
    onSkewChange(0);
    onScaleChange(100);
    
    if (transform.includes('rotateX')) {
      const match = transform.match(/rotateX\((\d+)deg\)/);
      if (match) onRotationChange(Number(match[1]));
    }
    if (transform.includes('rotateY')) {
      const match = transform.match(/rotateY\((\d+)deg\)/);
      if (match) onSkewChange(Number(match[1]));
    }
    if (transform.includes('scale')) {
      const match = transform.match(/scale\(([0-9.]+)\)/);
      if (match) onScaleChange(Number(match[1]) * 100);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm text-gray-400 mb-4 block">Device Mockups</label>
        <div className="grid grid-cols-2 gap-2">
          {mockups.map(({ name, icon: Icon, transform }) => (
            <button
              key={name}
              onClick={() => handleEffectClick(name, transform)}
              className={`p-4 rounded-lg flex flex-col items-center gap-2 transition-all ${
                activeEffect === name
                  ? 'bg-blue-500 text-white'
                  : theme === 'dark'
                  ? 'bg-[#2a2a2a] hover:bg-[#3a3a3a]'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <Icon size={24} />
              <span className="text-sm">{name}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm text-gray-400 mb-2 block">3D Effects</label>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {effects.map(({ name, icon: Icon, transform }) => (
            <button
              key={name}
              onClick={() => handleEffectClick(name, transform)}
              className={`p-4 rounded-lg flex items-center justify-center gap-2 transition-all ${
                activeEffect === name
                  ? 'bg-blue-500 text-white'
                  : theme === 'dark'
                  ? 'bg-[#2a2a2a] hover:bg-[#3a3a3a]'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <Icon size={20} />
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* SIMPLIFIED PATTERN SECTION */}
      <div>
        <label className="text-sm text-gray-400 mb-2 block">Background Patterns</label>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {patterns.map(({ name, icon: Icon, type }) => (
            <button
              key={type}
              onClick={() => setActivePattern(type)}
              className={`p-3 rounded-lg flex items-center gap-2 transition-all ${
                activePattern === type
                  ? 'bg-blue-500 text-white'
                  : theme === 'dark'
                  ? 'bg-[#2a2a2a] hover:bg-[#3a3a3a]'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <Icon size={16} />
              <span className="text-sm">{name}</span>
            </button>
          ))}
        </div>

        {/* Show pattern controls only when pattern is selected */}
        {activePattern !== 'none' && (
          <div className="space-y-3 pt-2 border-t border-gray-200 dark:border-gray-700">
            <div>
              <label className={valueClass}>Intensity ({patternIntensity})</label>
              <input
                type="range"
                min="10"
                max="200"
                value={patternIntensity}
                onChange={(e) => setPatternIntensity(Number(e.target.value))}
                className={sliderClass}
              />
            </div>

            <div>
              <label className={valueClass}>Opacity ({Math.round(patternOpacity / 2.55)}%)</label>
              <input
                type="range"
                min="0"
                max="255"
                value={patternOpacity}
                onChange={(e) => setPatternOpacity(Number(e.target.value))}
                className={sliderClass}
              />
            </div>

            <div>
              <label className={valueClass}>Blend Mode</label>
              <select
                value={patternBlending}
                onChange={(e) => setPatternBlending(e.target.value)}
                className={`w-full p-2 rounded border text-sm ${
                  theme === 'dark'
                    ? 'bg-[#2a2a2a] border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                {blendModes.map((mode) => (
                  <option key={mode} value={mode}>
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <label className={labelClass}>Transform Controls</label>
        
        <div>
          <label className={valueClass}>Blur ({blur}px)</label>
          <input
            type="range"
            min="0"
            max="20"
            value={blur}
            onChange={(e) => onBlurChange(Number(e.target.value))}
            className={sliderClass}
          />
        </div>

        <div>
          <label className={valueClass}>Opacity ({opacity}%)</label>
          <input
            type="range"
            min="0"
            max="100"
            value={opacity}
            onChange={(e) => onOpacityChange(Number(e.target.value))}
            className={sliderClass}
          />
        </div>

        <div>
          <label className={valueClass}>Scale ({scale}%)</label>
          <input
            type="range"
            min="50"
            max="200"
            value={scale}
            onChange={(e) => onScaleChange(Number(e.target.value))}
            className={sliderClass}
          />
        </div>

        <div>
          <label className={valueClass}>Rotation ({rotation}°)</label>
          <input
            type="range"
            min="0"
            max="360"
            value={rotation}
            onChange={(e) => onRotationChange(Number(e.target.value))}
            className={sliderClass}
          />
        </div>

        <div>
          <label className={valueClass}>Skew ({skew}°)</label>
          <input
            type="range"
            min="-45"
            max="45"
            value={skew}
            onChange={(e) => onSkewChange(Number(e.target.value))}
            className={sliderClass}
          />
        </div>
      </div>

      <div className="space-y-4">
        <label className={labelClass}>Image Adjustments</label>
        
        <div>
          <label className={valueClass}>Brightness ({brightness}%)</label>
          <input
            type="range"
            min="0"
            max="200"
            value={brightness}
            onChange={(e) => onBrightnessChange(Number(e.target.value))}
            className={sliderClass}
          />
        </div>

        <div>
          <label className={valueClass}>Contrast ({contrast}%)</label>
          <input
            type="range"
            min="0"
            max="200"
            value={contrast}
            onChange={(e) => onContrastChange(Number(e.target.value))}
            className={sliderClass}
          />
        </div>
      </div>
    </div>
  );
}

