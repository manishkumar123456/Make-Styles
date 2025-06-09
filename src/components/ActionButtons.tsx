//import React from 'react';
import { Wand2, Image, Undo } from 'lucide-react';

interface ActionButtonsProps {
  onGenerateGradient: () => void;
  onBackgroundImage: () => void;
  onUndo: () => void;
  canUndo: boolean;
}

export function ActionButtons({ 
  onGenerateGradient, 
  onBackgroundImage,
  onUndo,
  canUndo
}: ActionButtonsProps) {
  return (
    <div className="flex gap-4 mt-6 justify-center">
      <button
        onClick={onGenerateGradient}
        className="px-6 py-2 rounded-lg bg-[#39af31] flex items-center gap-2 hover:bg-[#3e854c] transition-colors"
      >
        <Wand2 size={20} />
        Generate Gradient
      </button>
      <button 
        onClick={onBackgroundImage}
        className="px-6 py-2 rounded-lg bg-[#e63dc7] flex items-center gap-2 hover:bg-[#d945d2] transition-colors"
      >
        <Image size={20} />
        Background Image
      </button>
      <button 
        onClick={onUndo}
        disabled={!canUndo}
        className={`px-6 py-2 rounded-lg flex items-center gap-2 transition-colors ${
          canUndo 
            ? 'bg-[#2d95ea] hover:bg-[#3a3a3a]' 
            : 'bg-[#bfe72f] opacity-50 cursor-not-allowed'
        }`}
      >
        <Undo size={20} />
        Undo
      </button>
    </div>
  );
}







