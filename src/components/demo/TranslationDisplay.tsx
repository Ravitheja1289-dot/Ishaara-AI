import React, { useState, useEffect } from 'react';
import { MessageSquare, Copy, Download } from 'lucide-react';

interface TranslationDisplayProps {
  translations: string[];
  isCapturing: boolean;
}

const TranslationDisplay: React.FC<TranslationDisplayProps> = ({ 
  translations, 
  isCapturing 
}) => {

  const copyToClipboard = () => {
    navigator.clipboard.writeText(translations.join('\n'));
  };

  const downloadTranscript = () => {
    const transcript = translations.join('\n');
    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ishaara-transcript.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Current Translation */}
      <div className="bg-white/10 dark:bg-dark-800/70 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-dark-600/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-teal-500" />
            <h3 className="font-poppins font-semibold text-gray-900 dark:text-gray-100">
              Real-time Translation
            </h3>
          </div>
          
          {isCapturing && (
            <div className="flex items-center space-x-2 text-teal-500">
              <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
              <span className="font-inter text-sm">Live</span>
            </div>
          )}
        </div>

        <div className="min-h-[120px] flex items-center">
          <p className="font-inter text-gray-500 dark:text-gray-400 italic">
            {isCapturing 
              ? 'Ready to capture sign language...' 
              : 'Start capturing to see translations appear here'
            }
          </p>
        </div>
      </div>

      {/* Translation History */}
      <div className="bg-white/10 dark:bg-dark-800/70 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-dark-600/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-poppins font-semibold text-gray-900 dark:text-gray-100">
              Translation History
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={copyToClipboard}
                className="p-2 bg-gray-200 dark:bg-dark-700 rounded-lg hover:bg-gray-300 dark:hover:bg-dark-600 transition-colors text-gray-700 dark:text-gray-200"
                title="Copy to clipboard"
              >
                <Copy className="h-4 w-4" />
              </button>
              <button
                onClick={downloadTranscript}
                className="p-2 bg-gray-200 dark:bg-dark-700 rounded-lg hover:bg-gray-300 dark:hover:bg-dark-600 transition-colors text-gray-700 dark:text-gray-200"
                title="Download transcript"
              >
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="min-h-[120px] flex items-center justify-center">
            <p className="font-inter text-gray-500 dark:text-gray-400 italic">
              Translation history will appear here
            </p>
          </div>
        </div>
    </div>
  );
};

export default TranslationDisplay;