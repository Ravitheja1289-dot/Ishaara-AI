import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Play, Square, Camera, Loader } from 'lucide-react';
import Button from '../ui/Button';

interface WebcamCaptureProps {
  onTranslation: (text: string) => void;
  isCapturing: boolean;
  setIsCapturing: (capturing: boolean) => void;
}

const WebcamCapture: React.FC<WebcamCaptureProps> = ({ 
  onTranslation, 
  isCapturing, 
  setIsCapturing 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const webcamRef = useRef<Webcam>(null);

  const handleStartCapture = useCallback(async () => {
    setIsLoading(true);
    
    // Simulate camera initialization
    setTimeout(() => {
      setIsLoading(false);
      setIsCapturing(true);
    }, 2000);
  }, [onTranslation, setIsCapturing]);

  const handleStopCapture = useCallback(() => {
    setIsCapturing(false);
  }, [setIsCapturing]);

  return (
    <div className="space-y-4">
      <div className="relative bg-black rounded-2xl overflow-hidden aspect-video">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="text-center">
              <Loader className="h-12 w-12 text-teal-500 animate-spin mx-auto mb-4" />
              <p className="text-white font-inter">Initializing camera...</p>
            </div>
          </div>
        ) : (
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            className="w-full h-full object-cover"
            videoConstraints={{
              width: 1280,
              height: 720,
              facingMode: "user"
            }}
          />
        )}
        
        {/* Recording indicator */}
        {isCapturing && (
          <div className="absolute top-4 right-4 flex items-center space-x-2 bg-coral-500 text-white px-3 py-1 rounded-full">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <span className="font-inter text-sm">Recording</span>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex justify-center space-x-4">
        {!isCapturing ? (
          <Button
            onClick={handleStartCapture}
            variant="secondary"
            size="lg"
            disabled={isLoading}
            className="flex items-center space-x-2"
          >
            {isLoading ? (
              <Loader className="h-5 w-5 animate-spin" />
            ) : (
              <Play className="h-5 w-5" />
            )}
            <span>{isLoading ? 'Starting...' : 'Start Capture'}</span>
          </Button>
        ) : (
          <Button
            onClick={handleStopCapture}
            variant="coral"
            size="lg"
            className="flex items-center space-x-2"
          >
            <Square className="h-5 w-5" />
            <span>Stop Capture</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default WebcamCapture;