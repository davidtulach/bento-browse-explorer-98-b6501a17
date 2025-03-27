import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
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
    setIsLoading(true);
    setHasError(false);
    setIsVisible(false);
    setCurrentSrc(src);
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setIsLoading(false);
      setTimeout(() => setIsVisible(true), 100);
    };
    img.onerror = () => {
      // If there's a fallback image available, try that instead
      if (fallbackSrc) {
        console.log(`Trying fallback image for: ${src}`);
        setCurrentSrc(fallbackSrc);
        const fallbackImg = new Image();
        fallbackImg.src = fallbackSrc;
        fallbackImg.onload = () => {
          setIsLoading(false);
          setTimeout(() => setIsVisible(true), 100);
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
  return <div className={cn(aspectRatio, "overflow-hidden relative", rounded && "rounded-lg", className)}>
      {isLoading && <div className="absolute inset-0 animate-image-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />}
      
      {hasError ? <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-xs">
          Image not found
        </div> : <img src={currentSrc} alt={alt} onLoad={() => {
      setIsLoading(false);
      setTimeout(() => setIsVisible(true), 100);
    }} onError={() => {
      // This handles any potential errors with the currently displayed image
      if (currentSrc === fallbackSrc || !fallbackSrc) {
        setHasError(true);
      }
    }} className="" />}
    </div>;
};
export default AnimatedImage;