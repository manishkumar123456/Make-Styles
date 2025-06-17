 // old code
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

import { Smartphone, Laptop, BoxSelect, Layers, Sparkles, Cuboid as Cube, Phone, LampDesk as Desktop, AppWindow as Window, Tablet } from 'lucide-react';

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

  const sliderClass = "w-full accent-blue-500";
  const labelClass = "text-sm text-gray-400 mb-2 block";
  const valueClass = "text-xs text-gray-400 mb-1 block";

  const handleEffectClick = (effect: string, transform: string) => {
    setActiveEffect(effect);
    onRotationChange(0);
    onSkewChange(0);
    onScaleChange(100);
    
    // Parse the transform string and apply appropriate values
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

