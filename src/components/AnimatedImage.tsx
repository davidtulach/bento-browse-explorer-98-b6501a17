
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

const AnimatedImage = ({ 
  src, 
  alt, 
  className, 
  aspectRatio = "aspect-square",
  objectFit = "contain" 
}: AnimatedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setIsLoading(false);
      setTimeout(() => setIsVisible(true), 100);
    };
    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
      console.error(`Failed to load image: ${src}`);
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
      
      {hasError ? (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-xs">
          Image not found
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={cn(
            "w-full h-full transition-all duration-700",
            `object-${objectFit}`,
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-105"
          )}
          onLoad={() => setIsLoading(false)}
        />
      )}
    </div>
  );
};

export default AnimatedImage;
