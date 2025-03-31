
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface AnimatedImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  aspectRatio?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  rounded?: boolean;
  priority?: boolean;
  sizes?: string;
}

const AnimatedImage = ({ 
  src, 
  alt, 
  fallbackSrc,
  className, 
  aspectRatio = "aspect-square",
  objectFit = "contain",
  rounded = false,
  priority = false,
  sizes = "100vw"
}: AnimatedImageProps) => {
  const [isLoading, setIsLoading] = useState(!priority);
  const [isVisible, setIsVisible] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const thumbnailSrc = generateThumbnailUrl(src);

  // Function to generate a thumbnail URL or placeholder
  function generateThumbnailUrl(originalUrl: string) {
    // If it's an unsplash image, use their built-in resizing
    if (originalUrl.includes('unsplash.com')) {
      return originalUrl.replace(/&w=\d+/, '&w=50').replace(/&q=\d+/, '&q=20');
    }
    // For other images, we could use a generic placeholder or a tiny version
    return originalUrl;
  }

  // Handle intersection observer for lazy loading
  useEffect(() => {
    if (priority) return; // Skip for priority images

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadFullImage();
        observer.current?.disconnect();
      }
    }, {
      rootMargin: '200px', // Start loading when image is 200px away
      threshold: 0.01
    });
    
    if (imageRef.current) {
      observer.current.observe(imageRef.current);
    }

    return () => {
      observer.current?.disconnect();
    };
  }, []);

  // Load the full image
  const loadFullImage = () => {
    setIsLoading(true);
    setHasError(false);
    
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setCurrentSrc(src);
      setIsLoading(false);
      setTimeout(() => setIsVisible(true), 10);
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
          setTimeout(() => setIsVisible(true), 10);
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
  };

  // For priority images, load immediately
  useEffect(() => {
    if (priority) {
      loadFullImage();
    }
  }, [src, fallbackSrc, priority]);

  // Load thumbnail first
  useEffect(() => {
    if (priority) return; // Skip for priority images
    
    const thumbnailImg = new Image();
    thumbnailImg.src = thumbnailSrc;
    thumbnailImg.onload = () => {
      setThumbnailLoaded(true);
    };

    return () => {
      thumbnailImg.onload = null;
    };
  }, [thumbnailSrc]);

  return (
    <div className={cn(
      "overflow-hidden relative",
      rounded && "rounded-lg",
      className
    )}>
      <AspectRatio ratio={parseAspectRatio(aspectRatio)}>
        {isLoading && (
          <div className="absolute inset-0 animate-image-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        )}
        
        {hasError ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-xs">
            Image not found
          </div>
        ) : (
          <>
            {/* Thumbnail/placeholder image */}
            {!priority && thumbnailLoaded && !isVisible && (
              <img
                src={thumbnailSrc}
                alt=""
                className="w-full h-full absolute inset-0 blur-sm transition-opacity"
                style={{ objectFit }}
              />
            )}
            
            {/* Main image */}
            <img
              ref={imageRef}
              src={priority ? currentSrc : (isVisible ? currentSrc : thumbnailSrc)}
              alt={alt}
              loading={priority ? "eager" : "lazy"}
              sizes={sizes}
              className={cn(
                "w-full h-full transition-all duration-500",
                `object-${objectFit}`,
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-105"
              )}
              onLoad={() => {
                if (!thumbnailLoaded || priority) {
                  setIsLoading(false);
                  setTimeout(() => setIsVisible(true), 10);
                }
              }}
              onError={() => {
                if (currentSrc === fallbackSrc || !fallbackSrc) {
                  setHasError(true);
                }
              }}
            />
          </>
        )}
      </AspectRatio>
    </div>
  );
};

// Helper function to parse aspect ratio string to number
function parseAspectRatio(aspectRatio: string): number | undefined {
  if (aspectRatio === "aspect-square") return 1;
  if (aspectRatio === "aspect-video") return 16/9;
  if (aspectRatio === "aspect-portrait") return 3/4;
  if (aspectRatio === "") return undefined;
  
  // Parse custom aspect ratios like "aspect-[3/4]"
  const match = aspectRatio.match(/aspect-\[(\d+)\/(\d+)\]/);
  if (match) {
    return parseInt(match[1]) / parseInt(match[2]);
  }
  
  return undefined;
}

export default AnimatedImage;
