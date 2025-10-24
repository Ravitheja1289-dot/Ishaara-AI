import React, { useState } from 'react';
import { Video, Zap } from 'lucide-react';

const DemoSection: React.FC = () => {
  const [isCapturing, setIsCapturing] = useState(false);

  return (
    <section id="demo" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-900 dark:to-dark-800">
  <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-full">
              <Video className="h-8 w-8 text-teal-600" />
            </div>
          </div>
          <h2 className="font-poppins font-bold text-4xl md:text-5xl text-gray-900 dark:text-white mb-4">
            Live Demo
          </h2>
          <p className="font-inter text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Experience real-time sign language translation in action. Start your webcam and see the magic happen.
          </p>
        </div>

  {/* Demo Interface */}
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
    {/* Webcam Section */}
    <div className="space-y-4 lg:col-span-12">
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="h-5 w-5 text-coral-500" />
              <h3 className="font-poppins font-semibold text-xl text-gray-900 dark:text-gray-100">
                Camera Feed
              </h3>
            </div>
            {/* Embedded third-party hand-sign app */}
            <div className="rounded-2xl overflow-hidden border border-white/10">
              <iframe
                src="https://handsign-m4qq6.ondigitalocean.app/"
                title="HandSign"
                className="w-full h-[85vh]"
                // Allow the iframe to access camera/microphone and run scripts
                allow="camera; microphone; autoplay; encrypted-media; clipboard-read; clipboard-write"
                sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
              />
            </div>

            {/* Start/Stop controls for UI flow (iframe handles capture/translation)
                These control the live indicator only. */}
            <div className="flex justify-center mt-4">
              {!isCapturing ? (
                <button
                  onClick={() => setIsCapturing(true)}
                  className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                >
                  Start
                </button>
              ) : (
                <button
                  onClick={() => setIsCapturing(false)}
                  className="px-4 py-2 bg-coral-500 text-white rounded-md hover:bg-coral-600"
                >
                  Stop
                </button>
              )}
            </div>
          </div>

          {/* (translation UI removed) */}
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white/50 dark:bg-dark-800/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-dark-600/30">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-primary-600" />
            </div>
            <h4 className="font-poppins font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2">
              Lightning Fast
            </h4>
            <p className="font-inter text-gray-600 dark:text-gray-300">
              Real-time processing with minimal latency for seamless communication.
            </p>
          </div>

          <div className="text-center p-6 bg-white/50 dark:bg-dark-800/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-dark-600/30">
            <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Video className="h-6 w-6 text-teal-600" />
            </div>
            <h4 className="font-poppins font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2">
              High Accuracy
            </h4>
            <p className="font-inter text-gray-600 dark:text-gray-300">
              Advanced AI models ensure precise translation of sign language gestures.
            </p>
          </div>

          <div className="text-center p-6 bg-white/50 dark:bg-dark-800/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-dark-600/30">
            <div className="w-12 h-12 bg-coral-100 dark:bg-coral-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-6 h-6 bg-coral-600 rounded-full"></div>
            </div>
            <h4 className="font-poppins font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2">
              Easy to Use
            </h4>
            <p className="font-inter text-gray-600 dark:text-gray-300">
              Simple interface that anyone can use without technical knowledge.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;