//import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeTemplateProps {
  code: string;
  language: string;
  fontSize: number;
  fontFamily: string;
  blur: number;
  opacity: number;
  rotation: number;
  scale: number;
  skew: number;
  brightness: number;
  contrast: number;
}

export function CodeTemplate({ 
  code, 
  language, 
  fontSize, 
  fontFamily,
  blur,
  opacity,
  rotation,
  scale,
  skew,
  brightness,
  contrast
}: CodeTemplateProps) {
  const transformStyle = {
    filter: `blur(${blur}px) brightness(${brightness}%) contrast(${contrast}%)`,
    opacity: opacity / 100,
    transform: `
      rotate(${rotation}deg)
      scale(${scale / 100})
      skew(${skew}deg)
    `,
  };

  return (
    <div className="max-w-[800px] mx-auto rounded-lg overflow-hidden shadow-lg" style={transformStyle}>
      <div className="bg-[#1E1E1E] px-4 py-2 flex items-center gap-2">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-gray-400 text-sm ml-2">{language}</span>
      </div>
      <SyntaxHighlighter
        language={language}
        style={atomDark}
        customStyle={{
          margin: 0,
          fontSize: `${fontSize}px`,
          fontFamily,
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}