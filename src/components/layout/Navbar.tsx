import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Video } from 'lucide-react';
import { useDarkMode } from '../../hooks/useDarkMode';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useDarkMode();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 dark:bg-dark-900/95 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Video className="h-8 w-8 text-teal-500 mr-2" />
            <span className="font-poppins font-bold text-xl text-gray-900 dark:text-gray-100">
              Ishaara AI
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button 
                onClick={() => scrollToSection('hero')}
                className="font-inter text-gray-700 dark:text-gray-200 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('demo')}
                className="font-inter text-gray-700 dark:text-gray-200 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
              >
                Live Demo
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="font-inter text-gray-700 dark:text-gray-200 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="font-inter text-gray-700 dark:text-gray-200 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Dark Mode Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-dark-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 dark:bg-dark-900/95 backdrop-blur-md rounded-lg mt-2 border border-gray-200/50 dark:border-dark-700/50">
              <button 
                onClick={() => scrollToSection('hero')}
                className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-teal-500 dark:hover:text-teal-400 transition-colors w-full text-left"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('demo')}
                className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-teal-500 dark:hover:text-teal-400 transition-colors w-full text-left"
              >
                Live Demo
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-teal-500 dark:hover:text-teal-400 transition-colors w-full text-left"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-teal-500 dark:hover:text-teal-400 transition-colors w-full text-left"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;