//import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Code2, 
  Twitter, 
  Quote, 
  Image, 
  Layout, 
  Sparkles,
  ArrowRight,
  Video
} from 'lucide-react';

interface HomePageProps {
  onTemplateSelect: (template: string) => void;
}

export function HomePage({ onTemplateSelect }: HomePageProps) {
  const { theme } = useTheme();

  const templates = [
    {
      name: 'Video Template',
      description: 'Create stunning video thumbnails and backgrounds',
      icon: Video,
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      name: 'Code Screenshot',
      description: 'Create beautiful code snippets with syntax highlighting',
      icon: Code2,
      gradient: 'from-blue-500 to-purple-500'
    },
    {
      name: 'Twitter Screenshot',
      description: 'Generate customized Twitter post screenshots',
      icon: Twitter,
      gradient: 'from-sky-400 to-blue-500'
    },
    {
      name: 'Quote Design',
      description: 'Design stunning quote images with custom backgrounds',
      icon: Quote,
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      name: 'Social Media Post',
      description: 'Create eye-catching social media content',
      icon: Image,
      gradient: 'from-violet-500 to-purple-500'
    },
    {
      name: 'Banner Design',
      description: 'Design professional banners for your projects',
      icon: Layout,
      gradient: 'from-emerald-500 to-teal-500'
    }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#0f0f0f] text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Beautiful Screenshots and Mockups
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
            Create stunning visuals for your projects with our easy-to-use editor
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map(({ name, description, icon: Icon, gradient }) => (
            <button
              key={name}
              onClick={() => onTemplateSelect(name)}
              className={`group p-6 rounded-2xl transition-all duration-300 ${
                theme === 'dark' ? 'bg-[#1a1a1a] hover:bg-[#2a2a2a]' : 'bg-white hover:bg-gray-50'
              } flex flex-col items-start hover:scale-105 hover:shadow-xl`}
            >
              <div className={`p-4 rounded-xl bg-gradient-to-br ${gradient} mb-4`}>
                <Icon size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{name}</h3>
              <p className="text-gray-400 mb-4">{description}</p>
              <div className="mt-auto flex items-center text-blue-500 group-hover:text-blue-400">
                Try now
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-8">
            Features that make your content stand out
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
              <Sparkles className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Beautiful Templates</h3>
              <p className="text-gray-400">Choose from a variety of professionally designed templates</p>
            </div>
            <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
              <Layout className="w-12 h-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Customizable Layouts</h3>
              <p className="text-gray-400">Adjust every aspect of your design with intuitive controls</p>
            </div>
            <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
              <Image className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Export Options</h3>
              <p className="text-gray-400">Download your designs in high-quality formats</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}