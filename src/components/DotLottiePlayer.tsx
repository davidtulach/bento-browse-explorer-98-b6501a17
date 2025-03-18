
import { useEffect, useRef } from 'react';

interface DotLottiePlayerProps {
  src: string;
  background?: string;
  speed?: number;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const DotLottiePlayer = ({
  src,
  background = 'transparent',
  speed = 1,
  loop = true,
  autoplay = true,
  className = '',
  style = {},
}: DotLottiePlayerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load the dotlottie-player script dynamically
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs';
    script.type = 'module';
    document.head.appendChild(script);

    // Clean up
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      // Create the dotlottie-player element
      const player = document.createElement('dotlottie-player');
      player.setAttribute('src', src);
      player.setAttribute('background', background);
      player.setAttribute('speed', speed.toString());
      
      if (loop) player.setAttribute('loop', '');
      if (autoplay) player.setAttribute('autoplay', '');
      
      // Apply styles
      Object.assign(player.style, {
        width: '100%',
        height: '100%',
        ...style
      });
      
      // Add classes
      if (className) {
        className.split(' ').forEach(cls => {
          if (cls) player.classList.add(cls);
        });
      }
      
      // Clear the container and append the player
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(player);
    }
  }, [src, background, speed, loop, autoplay, className, style]);

  return <div ref={containerRef} className={className} style={style}></div>;
};

export default DotLottiePlayer;
