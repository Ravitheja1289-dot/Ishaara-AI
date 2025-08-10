import React from 'react';
import { Brain, Zap, Globe, Target, Users, Award } from 'lucide-react';

const AboutSection: React.FC = () => {
  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "How It Works",
      description: "Powered by MediaPipe for hand tracking, TensorFlow for gesture recognition, and OpenCV for computer vision processing.",
      color: "primary"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Real-Time Accuracy",
      description: "Advanced machine learning models deliver 95%+ accuracy with sub-second response times for seamless communication.",
      color: "teal"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Cross-Platform Support",
      description: "Works across all devices and platforms - desktop, mobile, and tablet with responsive design and accessibility features.",
      color: "coral"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full">
              <Target className="h-8 w-8 text-primary-600" />
            </div>
          </div>
          <h2 className="font-poppins font-bold text-4xl md:text-5xl text-gray-900 dark:text-white mb-6">
            About Ishaara AI
          </h2>
          <p className="font-inter text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our mission is to create an inclusive world where communication knows no barriers. 
            Ishaara AI bridges the gap between sign language and spoken language through cutting-edge artificial intelligence.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-primary-50 to-teal-50 dark:from-dark-800/50 dark:to-dark-700/50 rounded-3xl p-8 md:p-12 mb-16 border border-gray-100 dark:border-dark-600/30">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Users className="h-12 w-12 text-teal-600 mr-4" />
              <h3 className="font-poppins font-bold text-3xl text-gray-900 dark:text-gray-100">
                Our Mission
              </h3>
            </div>
            <p className="font-inter text-lg text-gray-700 dark:text-gray-200 leading-relaxed mb-6">
              We believe that communication is a fundamental human right. Our AI-powered platform empowers 
              the deaf and hard-of-hearing community by providing real-time, accurate sign language translation, 
              fostering understanding and connection in every interaction.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
              <span className="px-4 py-2 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 rounded-full">
                Accessibility First
              </span>
              <span className="px-4 py-2 bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 rounded-full">
                AI Innovation
              </span>
              <span className="px-4 py-2 bg-coral-100 dark:bg-coral-900/50 text-coral-700 dark:text-coral-300 rounded-full">
                Social Impact
              </span>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/70 dark:bg-dark-800/80 backdrop-blur-lg rounded-2xl p-8 border border-gray-200/50 dark:border-dark-600/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`inline-flex p-4 rounded-2xl mb-6 bg-${feature.color}-100 dark:bg-${feature.color}-900/30`}>
                <div className={`text-${feature.color}-600`}>
                  {feature.icon}
                </div>
              </div>
              <h3 className="font-poppins font-bold text-xl text-gray-900 dark:text-white mb-4">
                {feature.title}
              </h3>
              <p className="font-inter text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50/5 dark:to-dark-700/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-dark-800/50 dark:to-dark-700/50 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-dark-600/30">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Award className="h-8 w-8 text-coral-500" />
            </div>
            <h3 className="font-poppins font-bold text-2xl text-gray-900 dark:text-gray-100 mb-4">
              Impact & Recognition
            </h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="font-poppins font-bold text-3xl md:text-4xl text-primary-600 mb-2">95%</div>
              <div className="font-inter text-gray-600 dark:text-gray-300">Translation Accuracy</div>
            </div>
            <div className="text-center">
              <div className="font-poppins font-bold text-3xl md:text-4xl text-teal-600 mb-2">50ms</div>
              <div className="font-inter text-gray-600 dark:text-gray-300">Response Time</div>
            </div>
            <div className="text-center">
              <div className="font-poppins font-bold text-3xl md:text-4xl text-coral-600 mb-2">10K+</div>
              <div className="font-inter text-gray-600 dark:text-gray-300">Users Served</div>
            </div>
            <div className="text-center">
              <div className="font-poppins font-bold text-3xl md:text-4xl text-primary-600 mb-2">24/7</div>
              <div className="font-inter text-gray-600 dark:text-gray-300">Availability</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;