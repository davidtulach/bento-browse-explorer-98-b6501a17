
import { useEffect, useRef } from 'react';

interface DotLottiePlayerProps {
  src: string;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

const DotLottiePlayer = ({
  src,
  loop = true,
  autoplay = true,
  speed = 1,
  className = '',
  style = {},
}: DotLottiePlayerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Create dotlottie-player element
    const player = document.createElement('dotlottie-player');
    
    // Set attributes
    player.setAttribute('src', src);
    player.setAttribute('background', 'transparent');
    player.setAttribute('speed', speed.toString());
    
    if (loop) player.setAttribute('loop', '');
    if (autoplay) player.setAttribute('autoplay', '');
    
    // Apply styles
    Object.assign(player.style, {
      width: '100%',
      height: '100%',
      ...style
    });
    
    // Append to container
    containerRef.current.appendChild(player);
    
    // Cleanup
    return () => {
      if (containerRef.current && containerRef.current.contains(player)) {
        containerRef.current.removeChild(player);
      }
    };
  }, [src, loop, autoplay, speed, style]);

  return <div ref={containerRef} className={className}></div>;
};

export default DotLottiePlayer;
