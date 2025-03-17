
import { useEffect, useState, useRef } from 'react';

interface ScrollDownIndicatorProps {
  show: boolean;
}

const ScrollDownIndicator = ({ show }: ScrollDownIndicatorProps) => {
  const [isVisible, setIsVisible] = useState(show);
  const playerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Create script if it doesn't exist
    if (!document.querySelector('script[src*="dotlottie-player"]')) {
      const script = document.createElement('script');
      script.src = "https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs";
      script.type = "module";
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
    } else {
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 300); // Match the transition duration
      return () => clearTimeout(timeout);
    }
  }, [show]);

  useEffect(() => {
    // Reference the player once it's in the DOM
    if (isVisible) {
      playerRef.current = document.querySelector('dotlottie-player');
    }
  }, [isVisible]);

  if (!isVisible && !show) return null;

  return (
    <div 
      className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center transition-all duration-300 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {/* Removed the background circle, now just rendering the player directly */}
      {/* @ts-ignore */}
      <dotlottie-player 
        src="https://lottie.host/85dd3c9d-bf13-46b8-97cf-2e73908d76c2/EMjP9SQVy4.lottie" 
        background="transparent" 
        speed="1" 
        style={{ width: '56px', height: '56px' }} 
        loop 
        autoplay
      ></dotlottie-player>
      <p className="text-xs bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-purple-600 font-semibold shadow-sm">
        Scroll to explore
      </p>
    </div>
  );
};

export default ScrollDownIndicator;
