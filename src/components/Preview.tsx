
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
  const containerClass = selectedSize === 'Square' 
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
        backgroundImage: gradientType === 'linear' 
          ? gradient 
          : `radial-gradient(circle at center, ${gradient.split(',')[1]}, ${gradient.split(',')[2].replace(')', '')})`,
      };

  return (
    <div className={`relative mx-auto overflow-hidden rounded-3xl ${containerClass}`}>
      <div
        className="w-full h-full flex items-center justify-center p-8"
        style={backgroundStyles}
      >
        <div style={transformStyle}>
          <p
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
            className="break-words max-w-full"
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}