import { useState } from 'react';
import { Play, Upload, Video, Wand2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface VideoTemplateProps {
  text: string;
  fontSize: number;
  fontFamily: string;
  textColor: string;
  blur: number;
  opacity: number;
  rotation: number;
  scale: number;
  skew: number;
  brightness: number;
  contrast: number;
  gradient: string;
  onGenerateGradient: () => void;
}

export function VideoTemplate({
  text,
  fontSize,
  fontFamily,
  textColor,
  blur,
  opacity,
  rotation,
  scale,
  skew,
  brightness,
  contrast,
  gradient,
  onGenerateGradient
}: VideoTemplateProps) {
  const { theme } = useTheme();
  const [videoUrl, setVideoUrl] = useState('');
  const [useGradient, setUseGradient] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop');
  
  const transformStyle = {
    filter: `blur(${blur}px) brightness(${brightness}%) contrast(${contrast}%)`,
    opacity: opacity / 100,
    transform: `
      rotate(${rotation}deg)
      scale(${scale / 100})
      skew(${skew}deg)
    `,
  };

  const handleBackgroundChange = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setBackgroundImage(result);
          setUseGradient(true);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleVideoUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'video/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setVideoUrl(url);
      }
    };
    input.click();
  };

  const handleGenerateGradient = () => {
    setUseGradient(true);
    onGenerateGradient();
  };

  return (
    <div 
      className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl"
      style={transformStyle}
    >
      <div 
        className="relative aspect-video w-full"
        style={{
          background: useGradient ? gradient : `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm">
          {videoUrl ? (
            <video
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded-xl shadow-2xl"
              src={videoUrl}
              controls
            />
          ) : (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <button
                onClick={handleVideoUpload}
                className="p-8 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all mb-4"
              >
                <Play size={48} className="text-white" />
              </button>
              <p className="text-white text-lg">Click to upload video</p>
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
          <p
            style={{
              fontSize: `${fontSize}px`,
              fontFamily,
              color: textColor,
            }}
            className="text-white text-center"
          >
            {text}
          </p>
        </div>

        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={handleGenerateGradient}
            className={`p-2 rounded-lg ${
              theme === 'dark' 
                ? 'bg-gray-800 hover:bg-gray-700' 
                : 'bg-white hover:bg-gray-100'
            } transition-colors`}
            title="Generate Gradient"
          >
            <Wand2 size={20} className={theme === 'dark' ? 'text-white' : 'text-gray-800'} />
          </button>
          <button
            onClick={handleBackgroundChange}
            className={`p-2 rounded-lg ${
              theme === 'dark' 
                ? 'bg-gray-800 hover:bg-gray-700' 
                : 'bg-white hover:bg-gray-100'
            } transition-colors`}
            title="Upload Background"
          >
            <Upload size={20} className={theme === 'dark' ? 'text-white' : 'text-gray-800'} />
          </button>
          <button
            onClick={handleVideoUpload}
            className={`p-2 rounded-lg ${
              theme === 'dark' 
                ? 'bg-gray-800 hover:bg-gray-700' 
                : 'bg-white hover:bg-gray-100'
            } transition-colors`}
            title="Upload Video"
          >
            <Video size={20} className={theme === 'dark' ? 'text-white' : 'text-gray-800'} />
          </button>
        </div>
      </div>
    </div>
  );
}