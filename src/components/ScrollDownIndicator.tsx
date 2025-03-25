
import { useEffect, useState, useRef } from 'react';

// Add declaration for dotlottie-player custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'dotlottie-player': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src: string;
        background: string;
        speed: string;
        style?: React.CSSProperties;
        loop?: boolean;
        autoplay?: boolean;
      };
    }
  }
}

interface ScrollDownIndicatorProps {
  show: boolean;
  onClick?: () => void;
}

const ScrollDownIndicator = ({ show, onClick }: ScrollDownIndicatorProps) => {
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
      onClick={onClick}
    >
      {/* Removed the background circle, now just rendering the player directly */}
      <dotlottie-player 
        src="https://lottie.host/85dd3c9d-bf13-46b8-97cf-2e73908d76c2/EMjP9SQVy4.lottie" 
        background="transparent" 
        speed="1" 
        style={{ width: '56px', height: '56px' }} 
        loop 
        autoplay
      ></dotlottie-player>
      <p className="text-xs bg-black text-white px-4 py-1.5 rounded-full font-semibold shadow-sm cursor-pointer text-center whitespace-nowrap min-w-[200px]">
        Scroll for your unique discount
      </p>
    </div>
  );
};

export default ScrollDownIndicator;
