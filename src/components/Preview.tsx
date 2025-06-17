import React, { useEffect, useRef, useState } from 'react';

interface PreviewProps {
  selectedSize: string;
  gradient: string;
  text: string;
  fontSize: number;
  fontWeight: number;
  letterSpacing: number;
  fontFamily: string;
  textAlign: 'left' | 'center' | 'right';
  textShadow: string;
  textTransform: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  textColor: string;
  blur: number;
  opacity: number;
  rotation: number;
  scale: number;
  skew: number;
  brightness: number;
  contrast: number;
  backgroundImage: string;
  gradientType: 'linear' | 'radial';
}

export function Preview({
  selectedSize,
  gradient,
  text,
  fontSize,
  fontWeight,
  letterSpacing,
  fontFamily,
  textAlign,
  textShadow,
  textTransform,
  textColor,
  blur,
  opacity,
  rotation,
  scale,
  skew,
  brightness,
  contrast,
  backgroundImage,
  gradientType,
}: PreviewProps) {
  const containerClass =
    selectedSize === 'Square'
      ? 'aspect-square max-w-[600px]'
      : selectedSize === 'Mobile'
      ? 'aspect-[9/16] max-w-[400px]'
      : 'aspect-video w-full';

  const transformStyle = {
    filter: `blur(${blur}px) brightness(${brightness}%) contrast(${contrast}%)`,
    opacity: opacity / 100,
    transform: `
      rotate(${rotation}deg)
      scale(${scale / 100})
      skew(${skew}deg)
    `,
  };

  const backgroundStyles = backgroundImage
    ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }
    : {
        backgroundImage:
          gradientType === 'linear'
            ? gradient
            : `radial-gradient(circle at center, ${gradient.split(',')[1]}, ${
                gradient.split(',')[2]?.replace(')', '') || ''
              })`,
      };

  const textRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const textEl = textRef.current;
    const containerEl = containerRef.current;

    if (textEl && containerEl) {
      const isOverflown =
        textEl.scrollHeight > containerEl.clientHeight ||
        textEl.scrollWidth > containerEl.clientWidth;

      setIsOverflowing(isOverflown);
    }
  }, [text, fontSize, fontWeight, letterSpacing, fontFamily, scale, rotation, skew]);

  return (
    <div className={`relative mx-auto overflow-hidden rounded-3xl ${containerClass}`}>
      <div
        className="w-full h-full flex items-center justify-center p-8"
        style={backgroundStyles}
        ref={containerRef}
      >
        <div style={transformStyle}>
          <p
            ref={textRef}
            style={{
              fontSize: `${fontSize}px`,
              fontWeight,
              letterSpacing: `${letterSpacing}px`,
              fontFamily,
              textAlign,
              textShadow,
              textTransform,
              color: textColor,
            }}
            className="break-words max-w-full text-center"
          >
            {text}
          </p>
        </div>
      </div>
      {isOverflowing && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-3 py-1 text-xs rounded shadow-lg animate-pulse">
          Warning: Text is overflowing!
        </div>
      )}
    </div>
  );
}
