
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
}

const AnimatedImage = ({ src, alt, className, aspectRatio = "aspect-square" }: AnimatedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setIsLoading(false);
      setTimeout(() => setIsVisible(true), 100);
    };
  }, [src]);

  return (
    <div className={cn(
      aspectRatio,
      "overflow-hidden relative",
      className
    )}>
      {isLoading && (
        <div className="absolute inset-0 animate-image-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      )}
      
      <img
        src={src}
        alt={alt}
        className={cn(
          "w-full h-full object-contain transition-all duration-700",
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-105"
        )}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

export default AnimatedImage;
