
import Lottie from 'lottie-react';
import { useState, useEffect } from 'react';

interface LottieAnimationProps {
  animationData: any;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const LottieAnimation = ({
  animationData,
  loop = true,
  autoplay = true,
  className = '',
  style = {},
}: LottieAnimationProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (animationData) {
      setIsLoaded(true);
    }
  }, [animationData]);

  return (
    <div className={`lottie-container ${className}`} style={style}>
      {isLoaded ? (
        <Lottie
          animationData={animationData}
          loop={loop}
          autoplay={autoplay}
        />
      ) : (
        <div className="animate-pulse bg-gray-200 w-full h-full rounded-lg" />
      )}
    </div>
  );
};

export default LottieAnimation;
