import React from 'react';
import { Github, Twitter, Linkedin, Mail, Video } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 dark:bg-dark-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Video className="h-8 w-8 text-teal-500 mr-2" />
              <span className="font-poppins font-bold text-xl">Ishaara AI</span>
            </div>
            <p className="font-inter text-gray-400 max-w-sm">
              Breaking communication barriers through AI-powered sign language interpretation.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-poppins font-semibold text-lg">Quick Links</h3>
            <div className="space-y-2">
              <a href="#demo" className="font-inter text-gray-400 dark:text-gray-300 hover:text-teal-400 transition-colors block">Live Demo</a>
              <a href="#about" className="font-inter text-gray-400 dark:text-gray-300 hover:text-teal-400 transition-colors block">About</a>
              <a href="#contact" className="font-inter text-gray-400 dark:text-gray-300 hover:text-teal-400 transition-colors block">Contact</a>
              <a href="#" className="font-inter text-gray-400 dark:text-gray-300 hover:text-teal-400 transition-colors block">Privacy Policy</a>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="font-poppins font-semibold text-lg">Connect</h3>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="p-2 bg-gray-800 dark:bg-dark-800 rounded-lg hover:bg-teal-600 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-gray-800 dark:bg-dark-800 rounded-lg hover:bg-teal-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-gray-800 dark:bg-dark-800 rounded-lg hover:bg-teal-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-gray-800 dark:bg-dark-800 rounded-lg hover:bg-teal-600 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="font-inter text-gray-400 dark:text-gray-300">
            © 2024 Ishaara AI. All rights reserved. Built with ❤️ for accessibility.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;