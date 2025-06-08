// import React, { useState } from 'react';
// import { Twitter, Upload, Wand2 } from 'lucide-react';
// import { Tweet } from 'react-tweet';
// import { useTheme } from '../../context/ThemeContext';

// interface TwitterTemplateProps {
//   text: string;
//   fontSize: number;
//   fontFamily: string;
//   textColor: string;
//   blur: number;
//   opacity: number;
//   rotation: number;
//   scale: number;
//   skew: number;
//   brightness: number;
//   contrast: number;
// }

// export function TwitterTemplate({ 
//   text, 
//   fontSize, 
//   fontFamily, 
//   textColor,
//   blur,
//   opacity,
//   rotation,
//   scale,
//   skew,
//   brightness,
//   contrast
// }: TwitterTemplateProps) {
//   const { theme } = useTheme();
//   const [tweetUrl, setTweetUrl] = useState('');
//   const [showTweet, setShowTweet] = useState(false);
//   const [backgroundImage, setBackgroundImage] = useState('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop');
//   const [useGradient, setUseGradient] = useState(false);
//   const [gradient, setGradient] = useState('linear-gradient(45deg, #1DA1F2, #14171A)');

//   const handleTweetUrlSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setShowTweet(true);
//   };

//   const getTweetId = (url: string) => {
//     const matches = url.match(/status\/(\d+)/);
//     return matches ? matches[1] : null;
//   };

//   const transformStyle = {
//     filter: `blur(${blur}px) brightness(${brightness}%) contrast(${contrast}%)`,
//     opacity: opacity / 100,
//     transform: `
//       rotate(${rotation}deg)
//       scale(${scale / 100})
//       skew(${skew}deg)
//     `,
//   };

//   const handleBackgroundChange = () => {
//     const input = document.createElement('input');
//     input.type = 'file';
//     input.accept = 'image/*';
//     input.onchange = (e) => {
//       const file = (e.target as HTMLInputElement).files?.[0];
//       if (file) {
//         const reader = new FileReader();
//         reader.onload = (e) => {
//           const result = e.target?.result as string;
//           setBackgroundImage(result);
//           setUseGradient(false);
//         };
//         reader.readAsDataURL(file);
//       }
//     };
//     input.click();
//   };

//   const generateRandomGradient = () => {
//     const randomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16);
//     const newGradient = `linear-gradient(45deg, ${randomColor()}, ${randomColor()})`;
//     setGradient(newGradient);
//     setUseGradient(true);
//   };

//   if (showTweet && getTweetId(tweetUrl)) {
//     return (
//       <div 
//         className="max-w-[598px] mx-auto rounded-2xl p-4 shadow-2xl"
//         style={{
//           ...transformStyle,
//           background: useGradient ? gradient : `url(${backgroundImage})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//         }}
//       >
//         <div className={`backdrop-blur-md bg-white/90 rounded-xl p-4 ${theme === 'dark' ? 'bg-opacity-20' : 'bg-opacity-90'}`}>
//           <Tweet id={getTweetId(tweetUrl)!} />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div 
//       className="max-w-[598px] mx-auto rounded-2xl p-6 shadow-2xl relative overflow-hidden"
//       style={{
//         ...transformStyle,
//         background: useGradient ? gradient : `url(${backgroundImage})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//       }}
//     >
//       <div className={`backdrop-blur-md ${theme === 'dark' ? 'bg-black/50' : 'bg-white/90'} rounded-xl p-6`}>
//         <form onSubmit={handleTweetUrlSubmit} className="mb-4">
//           <div className="flex gap-2">
//             <input
//               type="text"
//               placeholder="Paste Tweet URL here"
//               value={tweetUrl}
//               onChange={(e) => setTweetUrl(e.target.value)}
//               className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50"
//             />
//             <button
//               type="submit"
//               className="px-4 py-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a8cd8] transition-colors"
//             >
//               Load Tweet
//             </button>
//           </div>
//         </form>

//         <div className="flex items-start gap-3 mb-4">
//           <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0" />
//           <div>
//             <div className="flex items-center gap-2">
//               <span className="font-bold text-gray-900">rishi</span>
//               <span className="text-gray-500">@thelifeofrishi</span>
//             </div>
//           </div>
//           <Twitter className="ml-auto text-[#1DA1F2]" size={20} />
//         </div>
        
//         <p 
//           style={{ 
//             fontSize: `${fontSize}px`,
//             fontFamily,
//             color: textColor,
//           }}
//           className="mb-4"
//         >
//           {text}
//         </p>
        
//         <div className="text-gray-500 text-sm">
//           07:29 PM · Sep 29, 2022
//         </div>
        
//         <div className="flex gap-6 mt-4 text-gray-500 text-sm border-t border-gray-100 pt-4">
//           <div>4 retweets</div>
//           <div>2 quotes</div>
//           <div>17 likes</div>
//           <div>8 replies</div>
//         </div>
//       </div>

//       <div className="absolute top-4 right-4 flex gap-2">
//         <button
//           onClick={generateRandomGradient}
//           className={`p-2 rounded-lg ${
//             theme === 'dark' 
//               ? 'bg-gray-800 hover:bg-gray-700' 
//               : 'bg-white hover:bg-gray-100'
//           } transition-colors`}
//           title="Generate Gradient"
//         >
//           <Wand2 size={20} className={theme === 'dark' ? 'text-white' : 'text-gray-800'} />
//         </button>
//         <button
//           onClick={handleBackgroundChange}
//           className={`p-2 rounded-lg ${
//             theme === 'dark' 
//               ? 'bg-gray-800 hover:bg-gray-700' 
//               : 'bg-white hover:bg-gray-100'
//           } transition-colors`}
//           title="Upload Background"
//         >
//           <Upload size={20} className={theme === 'dark' ? 'text-white' : 'text-gray-800'} />
//         </button>
//       </div>
//     </div>
//   );
// }






import React, { useState } from 'react';
import { Twitter, Upload, Wand2 } from 'lucide-react';
import { Tweet } from 'react-tweet';
import { useTheme } from '../../context/ThemeContext';

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
  const { theme } = useTheme();
  const [tweetUrl, setTweetUrl] = useState('');
  const [showTweet, setShowTweet] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop');
  const [useGradient, setUseGradient] = useState(false);
  const [gradient, setGradient] = useState('linear-gradient(45deg, #1DA1F2, #14171A)');

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
          setUseGradient(false);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const generateRandomGradient = () => {
    const randomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16);
    const newGradient = `linear-gradient(45deg, ${randomColor()}, ${randomColor()})`;
    setGradient(newGradient);
    setUseGradient(true);
  };

  const commonCardStyles = {
    ...transformStyle,
    background: useGradient ? gradient : `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div 
        className="w-full max-w-[600px] rounded-2xl p-6 shadow-xl relative overflow-hidden"
        style={commonCardStyles}
      >
        <div className={`backdrop-blur-md rounded-xl p-6 ${theme === 'dark' ? 'bg-black/50' : 'bg-white/90'}`}>
          {showTweet && getTweetId(tweetUrl) ? (
            <Tweet id={getTweetId(tweetUrl)!} />
          ) : (
            <>
              <form onSubmit={handleTweetUrlSubmit} className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Paste Tweet URL here"
                    value={tweetUrl}
                    onChange={(e) => setTweetUrl(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a8cd8] transition-colors"
                  >
                    Load Tweet
                  </button>
                </div>
              </form>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div>
                  <div className="font-semibold text-gray-900">rishi</div>
                  <div className="text-gray-500 text-sm">@thelifeofrishi</div>
                </div>
                <Twitter className="ml-auto text-[#1DA1F2]" size={20} />
              </div>

              <p
                style={{
                  fontSize: `${fontSize}px`,
                  fontFamily,
                  color: textColor,
                }}
                className="mb-4 text-gray-800"
              >
                {text}
              </p>

              <div className="text-gray-500 text-sm">07:29 PM · Sep 29, 2022</div>

              <div className="flex gap-6 mt-4 text-gray-500 text-sm border-t border-gray-200 pt-4">
                <div>4 retweets</div>
                <div>2 quotes</div>
                <div>17 likes</div>
                <div>8 replies</div>
              </div>
            </>
          )}
        </div>

        {/* Floating Controls */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={generateRandomGradient}
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
        </div>
      </div>
    </div>
  );
}
