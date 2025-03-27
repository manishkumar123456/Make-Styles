import React, { useState } from 'react';
import { Twitter } from 'lucide-react';
import { Tweet } from 'react-tweet';

interface TwitterTemplateProps {
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
}

export function TwitterTemplate({ 
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
  contrast
}: TwitterTemplateProps) {
  const [tweetUrl, setTweetUrl] = useState('');
  const [showTweet, setShowTweet] = useState(false);

  const handleTweetUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowTweet(true);
  };

  const getTweetId = (url: string) => {
    const matches = url.match(/status\/(\d+)/);
    return matches ? matches[1] : null;
  };

  const transformStyle = {
    filter: `blur(${blur}px) brightness(${brightness}%) contrast(${contrast}%)`,
    opacity: opacity / 100,
    transform: `
      rotate(${rotation}deg)
      scale(${scale / 100})
      skew(${skew}deg)
    `,
  };

  if (showTweet && getTweetId(tweetUrl)) {
    return (
      <div className="max-w-[598px] mx-auto bg-white rounded-2xl p-4" style={transformStyle}>
        <Tweet id={getTweetId(tweetUrl)!} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 max-w-[598px] mx-auto" style={transformStyle}>
      <form onSubmit={handleTweetUrlSubmit} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Paste Tweet URL here"
            value={tweetUrl}
            onChange={(e) => setTweetUrl(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Load Tweet
          </button>
        </div>
      </form>

      <div className="flex items-start gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0" />
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900">rishi</span>
            <span className="text-gray-500">@thelifeofrishi</span>
          </div>
        </div>
        <Twitter className="ml-auto text-[#1DA1F2]" size={20} />
      </div>
      
      <p 
        style={{ 
          fontSize: `${fontSize}px`,
          fontFamily,
          color: textColor,
        }}
        className="mb-4"
      >
        {text}
      </p>
      
      <div className="text-gray-500 text-sm">
        07:29 PM · Sep 29, 2022
      </div>
      
      <div className="flex gap-6 mt-4 text-gray-500 text-sm border-t border-gray-100 pt-4">
        <div>4 retweets</div>
        <div>2 quotes</div>
        <div>17 likes</div>
        <div>8 replies</div>
      </div>
    </div>
  );
}