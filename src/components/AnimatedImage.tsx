
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface AnimatedImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  aspectRatio?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  rounded?: boolean;
}

const AnimatedImage = ({ 
  src, 
  alt, 
  fallbackSrc,
  className, 
  aspectRatio = "aspect-square",
  objectFit = "contain",
  rounded = false
}: AnimatedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    // Reset states when the src changes
    setIsLoading(true);
    setHasError(false);
    setIsVisible(false);
    setCurrentSrc(src);
    
    // Preload the image
    const img = new Image();
    img.src = src;
    
    // Add loading=eager for critical images
    img.loading = 'eager';
    
    // Use high fetchPriority for important images
    if ('fetchPriority' in img) {
      (img as any).fetchPriority = 'high';
    }
    
    // Handle successful load
    img.onload = () => {
      setIsLoading(false);
      // Reduced animation delay for faster perceived performance
      setTimeout(() => setIsVisible(true), 50);
    };
    
    // Handle error
    img.onerror = () => {
      // If there's a fallback image available, try that instead
      if (fallbackSrc) {
        console.log(`Trying fallback image for: ${src}`);
        setCurrentSrc(fallbackSrc);
        
        const fallbackImg = new Image();
        fallbackImg.src = fallbackSrc;
        fallbackImg.loading = 'eager';
        
        fallbackImg.onload = () => {
          setIsLoading(false);
          setTimeout(() => setIsVisible(true), 50);
        };
        
        fallbackImg.onerror = () => {
          setIsLoading(false);
          setHasError(true);
          console.error(`Failed to load both primary and fallback images: ${src} and ${fallbackSrc}`);
        };
      } else {
        setIsLoading(false);
        setHasError(true);
        console.error(`Failed to load image: ${src}`);
      }
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, fallbackSrc]);

  return (
    <div className={cn(
      aspectRatio,
      "overflow-hidden relative",
      rounded && "rounded-lg",
      className
    )}>
      {isLoading && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}
      
      {hasError ? (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 text-xs">
          Image not found
        </div>
      ) : (
        <img
          src={currentSrc}
          alt={alt}
          className={cn(
            "w-full h-full transition-all duration-300",
            `object-${objectFit}`,
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-105"
          )}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          onLoad={() => {
            setIsLoading(false);
            setTimeout(() => setIsVisible(true), 50);
          }}
          onError={() => {
            // This handles any potential errors with the currently displayed image
            if (currentSrc === fallbackSrc || !fallbackSrc) {
              setHasError(true);
            }
          }}
        />
      )}
    </div>
  );
};

export default AnimatedImage;
