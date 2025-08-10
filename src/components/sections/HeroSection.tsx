import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import Button from '../ui/Button';

const HeroSection: React.FC = () => {
  const scrollToDemo = () => {
    const demoSection = document.getElementById('demo');
    demoSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-teal-500 to-primary-600">
        {/* Abstract Wave Patterns */}
        <div className="absolute inset-0">
          <svg className="absolute bottom-0 left-0 w-full h-64" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,160L48,144C96,128,192,96,288,112C384,128,480,192,576,192C672,192,768,128,864,112C960,96,1056,128,1152,144C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" fill="rgba(255,255,255,0.1)"/>
          </svg>
          <svg className="absolute top-0 right-0 w-full h-64 transform rotate-180" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,160L48,144C96,128,192,96,288,112C384,128,480,192,576,192C672,192,768,128,864,112C960,96,1056,128,1152,144C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" fill="rgba(0,191,166,0.2)"/>
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="font-poppins font-bold text-5xl md:text-7xl text-white mb-6 leading-tight">
            Ishaara AI
          </h1>
          
          <p className="font-inter text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Breaking Communication Barriers with AI-Powered Sign Language Translation
          </p>
          
          <p className="font-inter text-lg text-white/80 mb-12 max-w-xl mx-auto">
            Experience real-time sign language interpretation powered by advanced AI, 
            making communication accessible for everyone.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={scrollToDemo}
              variant="secondary"
              size="lg"
              className="bg-white text-primary-600 hover:bg-gray-100 shadow-2xl flex items-center space-x-2 font-semibold"
            >
              <Play className="h-5 w-5" />
              <span>Try Live Demo</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
            
            <Button
              variant="primary"
              size="lg"
              className="bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white font-semibold"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 animate-slide-up">
          <div className="text-center">
            <div className="font-poppins font-bold text-3xl text-white mb-2">95%</div>
            <div className="font-inter text-white/80">Accuracy Rate</div>
          </div>
          <div className="text-center">
            <div className="font-poppins font-bold text-3xl text-white mb-2">Real-time</div>
            <div className="font-inter text-white/80">Translation</div>
          </div>
          <div className="text-center">
            <div className="font-poppins font-bold text-3xl text-white mb-2">24/7</div>
            <div className="font-inter text-white/80">Available</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;