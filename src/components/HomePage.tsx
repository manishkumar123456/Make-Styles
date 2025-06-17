/* eslint-disable @typescript-eslint/no-unused-vars */
//import React from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { 
  Code2, 
  Twitter, 
  Quote, 
  Image, 
  Layout, 
  Sparkles,
  ArrowRight,
  Video,
  Github,
  Linkedin,
  Instagram,
  
  //Upload
} from 'lucide-react';
import { Logo } from './Logo';

export function HomePage() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const templates = [
    {
      name: 'video',
      title: 'Video Template',
      description: 'Create stunning video thumbnails and backgrounds',
      icon: Video,
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      name: 'code',
      title: 'Code Screenshot',
      description: 'Create beautiful code snippets with syntax highlighting',
      icon: Code2,
      gradient: 'from-blue-500 to-purple-500'
    },
    {
      name: 'twitter',
      title: 'Twitter Screenshot',
      description: 'Generate customized Twitter post screenshots',
      icon: Twitter,
      gradient: 'from-sky-400 to-blue-500'
    },
    {
      name: 'quote',
      title: 'Quote Design',
      description: 'Design stunning quote images with custom backgrounds',
      icon: Quote,
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      name: 'social',
      title: 'Social Media Post',
      description: 'Create eye-catching social media content',
      icon: Image,
      gradient: 'from-violet-500 to-purple-500'
    },
    {
      name: 'banner',
      title: 'Banner Design',
      description: 'Design professional banners for your projects',
      icon: Layout,
      gradient: 'from-emerald-500 to-teal-500'
    }
  ];

  function handleBackgroundChange(_event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#0f0f0f] text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <Logo />
            <div className="flex items-center gap-4">
  
  {/* <button className={`px-4 py-2 rounded-lg ${theme === 'dark' ? 'bg-[#1a1a1a] hover:bg-[#2a2a2a]' : 'bg-white hover:bg-gray-50'} transition-all`}>
    Login
  </button> */}
  {/* <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all">
    Sign Up
  </button> */}
  <button
    onClick={toggleTheme}
    className={`px-3 py-2 rounded-lg border ${
      theme === 'dark'
        ? 'bg-[#1a1a1a] text-white border-gray-600 hover:bg-[#2a2a2a]'
        : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
    } transition-all`}
  >
    {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
  </button>
</div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="relative">
            <div className="absolute -inset-1 "></div>
            <h1 className="relative text-4xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent animate-slide-up">
              Beautiful Screenshots and Mockups
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto animate-fade-in-up">
          Brand your screenshots, amplify your message, engage your audience with Make.Styles. 
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map(({ name, title, description, icon: Icon, gradient }) => (
            <button
              key={name}
              onClick={() => navigate(`/editor/${name}`)}
              className={`group p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 ${
                theme === 'dark' ? 'bg-[#1a1a1a] hover:bg-[#2a2a2a]' : 'bg-white hover:bg-gray-50'
              } flex flex-col items-start hover:shadow-xl`}
            >
              <div className={`p-4 rounded-xl bg-gradient-to-br ${gradient} mb-4 animate-bounce-slow`}>
                <Icon size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-400 mb-4">{description}</p>
              <div className="mt-auto flex items-center text-blue-500 group-hover:text-blue-400">
                Try now
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 animate-fade-in">
            Features that make your content stand out
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-white'} transform hover:scale-105 transition-transform`}>
              <Sparkles className="w-12 h-12 text-blue-500 mb-4 mx-auto animate-pulse" />
              <h3 className="text-xl font-semibold mb-2">Beautiful Templates</h3>
              <p className="text-gray-600">Choose from a variety of professionally designed templates</p>
            </div>
            <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-white'} transform hover:scale-105 transition-transform`}>
              <Layout className="w-12 h-12 text-purple-500 mb-4 mx-auto animate-pulse" />
              <h3 className="text-xl font-semibold mb-2">Customizable Layouts</h3>
              <p className="text-gray-600">Adjust every aspect of your design with intuitive controls</p>
            </div>
            <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-white'} transform hover:scale-105 transition-transform`}>
              <Image className="w-12 h-12 text-green-500 mb-4 mx-auto animate-pulse" />
              <h3 className="text-xl font-semibold mb-2">Export Options</h3>
              <p className="text-gray-600">Download your designs in high-quality formats</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`mt-20 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Logo />
              <p className="mt-4 text-gray-600">Create beautiful screenshots and mockups for your projects</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-600 cursor-pointer">
                <li>Features</li>
                <li>Templates</li>
                <li>Pricing</li>
                <li>Updates</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-600 cursor-pointer">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex gap-4">
                <Github className="w-6 h-6 text-gray-600 hover:text-white transition-colors cursor-pointer" />
                <Linkedin className="w-6 h-6 text-gray-600 hover:text-white transition-colors cursor-pointer" />
                <Instagram className="w-6 h-6 text-gray-600 hover:text-white transition-colors cursor-pointer" />
              </div>
            </div>
          </div>
           <div className=" w-full flex mt-4 items-center justify-center   ">
          <h1 className="text-center text-3xl md:text-5xl lg:text-[10rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-900 select-none">
            MAKE-STYLES
          </h1>
        </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-600">
            <p>© 2024 Make-Styles. All rights reserved.</p>
          </div>
           <button
          onClick={handleBackgroundChange}
          className={`p-2 rounded-lg ${
            theme === 'dark' 
              ? 'bg-gray-800 hover:bg-gray-700' 
              : 'bg-white hover:bg-gray-100'
          } transition-colors`}
          title="Upload Background"
        >
          
        </button>
        </div>
      </footer>
    </div>
  );
}