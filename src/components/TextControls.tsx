//import React from 'react';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface TextControlsProps {
  text: string;
  fontSize: number;
  fontWeight: number;
  letterSpacing: number;
  fontFamily: string;
  textAlign: 'left' | 'center' | 'right';
  textShadow: string;
  textTransform: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  textColor: string;
  onTextChange: (text: string) => void;
  onFontSizeChange: (size: number) => void;
  onFontWeightChange: (weight: number) => void;
  onLetterSpacingChange: (spacing: number) => void;
  onFontFamilyChange: (family: string) => void;
  onTextAlignChange: (align: 'left' | 'center' | 'right') => void;
  onTextShadowChange: (shadow: string) => void;
  onTextTransformChange: (transform: 'none' | 'uppercase' | 'lowercase' | 'capitalize') => void;
  onTextColorChange: (color: string) => void;
  templateType: 'default' | 'twitter' | 'code';
  code: string;
  onCodeChange: (code: string) => void;
  language: string;
  onLanguageChange: (language: string) => void;
}

export function TextControls({
  text,
  fontSize,
  fontWeight,
  letterSpacing,
  fontFamily,
  textAlign,
  textShadow,
  textTransform,
  textColor,
  onTextChange,
  onFontSizeChange,
  onFontWeightChange,
  onLetterSpacingChange,
  onFontFamilyChange,
  onTextAlignChange,
  onTextShadowChange,
  onTextTransformChange,
  onTextColorChange,
  templateType,
  code,
  onCodeChange,
  language,
  onLanguageChange,
}: TextControlsProps) {
  const { theme } = useTheme();
  const [isFontDropdownOpen, setIsFontDropdownOpen] = useState(false);
  
  const fontFamilies = [
    { name: 'Inter', style: 'font-sans' },
    { name: 'Roboto', style: 'font-sans' },
    { name: 'Poppins', style: 'font-sans' },
    { name: 'Playfair Display', style: 'font-serif' },
    { name: 'Space Grotesk', style: 'font-mono' },
    { name: 'Montserrat', style: 'font-sans' },
    { name: 'Open Sans', style: 'font-sans' },
    { name: 'Lato', style: 'font-sans' },
    { name: 'Fira Code', style: 'font-mono' },
    { name: 'JetBrains Mono', style: 'font-mono' },
    { name: 'Source Code Pro', style: 'font-mono' }
  ];

  const textShadowPresets = [
    { name: 'None', value: 'none' },
    { name: 'Soft', value: '2px 2px 4px rgba(0,0,0,0.3)' },
    { name: 'Hard', value: '3px 3px 0px rgba(0,0,0,0.8)' },
    { name: 'Glow', value: '0 0 10px rgba(255,255,255,0.8)' },
    { name: 'Neon', value: '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0073e6, 0 0 20px #0073e6' }
  ];

  const transformOptions = [
    { label: 'None', value: 'none' },
    { label: 'Uppercase', value: 'uppercase' },
    { label: 'Lowercase', value: 'lowercase' },
    { label: 'Capitalize', value: 'capitalize' }
  ];

  const programmingLanguages = [
    'javascript',
    'typescript',
    'python',
    'java',
    'cpp',
    'ruby',
    'go',
    'rust'
  ];

  const selectedFont = fontFamilies.find(font => font.name === fontFamily) || fontFamilies[0];

  const getCategoryLabel = (style: string) => {
    switch(style) {
      case 'font-sans': return 'Sans-serif';
      case 'font-serif': return 'Serif';
      case 'font-mono': return 'Monospace';
      default: return '';
    }
  };

  const handleFontSelect = (fontName: string) => {
    onFontFamilyChange(fontName);
    setIsFontDropdownOpen(false);
  };

  return (
    <div className="space-y-6 overflow-y-auto">
      {templateType === 'code' ? (
        <>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Programming Language</label>
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value)}
              className={`w-full rounded-lg px-4 py-2 ${
                theme === 'dark' ? 'bg-[#2a2a2a] text-white' : 'bg-gray-100 text-gray-900'
              } hover:ring-2 hover:ring-blue-500 transition-all`}
            >
              {programmingLanguages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Code</label>
            <textarea
              value={code}
              onChange={(e) => onCodeChange(e.target.value)}
              rows={10}
              className={`w-full rounded-lg px-4 py-2 font-mono ${
                theme === 'dark' ? 'bg-[#2a2a2a] text-white' : 'bg-gray-100 text-gray-900'
              } hover:ring-2 hover:ring-blue-500 transition-all`}
            />
          </div>
        </>
      ) : (
        <div>
          <label className="text-sm text-gray-400 mb-2 block">Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            className={`w-full rounded-lg px-4 py-2 ${
              theme === 'dark' ? 'bg-[#2a2a2a] text-white' : 'bg-gray-100 text-gray-900'
            } hover:ring-2 hover:ring-blue-500 transition-all`}
          />
        </div>
      )}

      <div>
        <label className="text-sm text-gray-400 mb-2 block">Text Color</label>
        <input
          type="color"
          value={textColor}
          onChange={(e) => onTextColorChange(e.target.value)}
          className="w-full h-10 rounded-lg cursor-pointer"
        />
      </div>

      <div>
        <label className="text-sm text-gray-400 mb-2 block">Font Family</label>
        <div className="relative">
          {/* Dropdown Button */}
          <button
            onClick={() => setIsFontDropdownOpen(!isFontDropdownOpen)}
            className={`w-full px-4 py-3 rounded-lg shadow-sm hover:ring-2 hover:ring-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
              theme === 'dark' 
                ? 'bg-[#2a2a2a] text-white border border-gray-600 hover:bg-[#3a3a3a]' 
                : 'bg-gray-100 text-gray-900 border border-gray-300 hover:bg-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className={`${selectedFont.style} font-medium`}>
                  {selectedFont.name}
                </span>
                <span className={`text-xs px-2 py-1 rounded ${
                  theme === 'dark' ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'
                }`}>
                  {getCategoryLabel(selectedFont.style)}
                </span>
              </div>
              {isFontDropdownOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </div>
          </button>

          {/* Dropdown Menu */}
          {isFontDropdownOpen && (
            <div className={`absolute z-10 w-full mt-1 rounded-lg shadow-lg max-h-60 overflow-y-auto ${
              theme === 'dark' 
                ? 'bg-[#2a2a2a] border border-gray-600' 
                : 'bg-white border border-gray-300'
            }`}>
              {fontFamilies.map((font, index) => (
                <button
                  key={font.name}
                  onClick={() => handleFontSelect(font.name)}
                  className={`w-full px-4 py-3 text-left hover:ring-2 hover:ring-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all ${
                    fontFamily === font.name 
                      ? 'bg-blue-500 text-white' 
                      : theme === 'dark'
                      ? 'text-white hover:bg-[#3a3a3a]'
                      : 'text-gray-900 hover:bg-gray-50'
                  } ${index === 0 ? 'rounded-t-lg' : ''} ${
                    index === fontFamilies.length - 1 
                      ? 'rounded-b-lg' 
                      : theme === 'dark' ? 'border-b border-gray-600' : 'border-b border-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`${font.style} font-medium`}>
                      {font.name}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      fontFamily === font.name
                        ? 'bg-blue-400 text-white'
                        : theme === 'dark' 
                        ? 'bg-gray-600 text-gray-300' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {getCategoryLabel(font.style)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {templateType === 'default' && (
        <>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Text Transform</label>
            <div className="grid grid-cols-2 gap-2">
              {transformOptions.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => onTextTransformChange(value as 'none' | 'uppercase' | 'lowercase' | 'capitalize')}
                  className={`py-2 px-3 rounded-lg transition-all ${
                    textTransform === value
                      ? 'bg-blue-500 text-white'
                      : theme === 'dark'
                      ? 'bg-[#2a2a2a] hover:bg-[#3a3a3a]'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Text Shadow</label>
            <div className="grid grid-cols-2 gap-2">
              {textShadowPresets.map(({ name, value }) => (
                <button
                  key={name}
                  onClick={() => onTextShadowChange(value)}
                  className={`py-2 px-3 rounded-lg transition-all ${
                    textShadow === value
                      ? 'bg-blue-500 text-white'
                      : theme === 'dark'
                      ? 'bg-[#2a2a2a] hover:bg-[#3a3a3a]'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Text Align</label>
            <div className="flex gap-2">
              {['left', 'center', 'right'].map((align) => (
                <button
                  key={align}
                  onClick={() => onTextAlignChange(align as 'left' | 'center' | 'right')}
                  className={`flex-1 py-2 rounded-lg transition-all hover:ring-2 hover:ring-blue-500 ${
                    textAlign === align
                      ? 'bg-blue-500 text-white'
                      : theme === 'dark'
                      ? 'bg-[#2a2a2a]'
                      : 'bg-gray-100'
                  }`}
                >
                  {align.charAt(0).toUpperCase() + align.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      <div>
        <label className="text-sm text-gray-400 mb-2 block">Font Size ({fontSize}px)</label>
        <input
          type="range"
          min="12"
          max="200"
          value={fontSize}
          onChange={(e) => onFontSizeChange(Number(e.target.value))}
          className="w-full accent-blue-500"
        />
      </div>

      {templateType === 'default' && (
        <>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Font Weight ({fontWeight})</label>
            <input
              type="range"
              min="100"
              max="900"
              step="100"
              value={fontWeight}
              onChange={(e) => onFontWeightChange(Number(e.target.value))}
              className="w-full accent-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Letter Spacing ({letterSpacing}px)</label>
            <input
              type="range"
              min="-10"
              max="20"
              value={letterSpacing}
              onChange={(e) => onLetterSpacingChange(Number(e.target.value))}
              className="w-full accent-blue-500"
            />
          </div>
        </>
      )}
    </div>
  );
}