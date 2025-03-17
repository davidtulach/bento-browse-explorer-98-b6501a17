
import { useEffect, useState } from 'react';
import LottieAnimation from './LottieAnimation';
import scrollDownAnimation from '@/lottie/scroll-down.json';

interface ScrollDownIndicatorProps {
  show: boolean;
}

const ScrollDownIndicator = ({ show }: ScrollDownIndicatorProps) => {
  const [isVisible, setIsVisible] = useState(show);

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

  if (!isVisible && !show) return null;

  return (
    <div 
      className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center transition-all duration-300 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="w-16 h-16 mb-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center">
        <div className="w-14 h-14">
          <LottieAnimation 
            animationData={scrollDownAnimation}
            loop={true}
            autoplay={true}
          />
        </div>
      </div>
      <p className="text-xs bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-purple-600 font-semibold shadow-sm">
        Scroll to explore
      </p>
    </div>
  );
};

export default ScrollDownIndicator;
