
import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useHapticFeedback } from '@/hooks/use-haptic';
import { useIsMobile } from '@/hooks/use-mobile';
import { ListTodo } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface AdItem {
  id: number;
  title: string;
  image: string;
  sponsor: string;
}

interface BeltItem {
  id: number;
  title: string;
  image?: string;
  fallbackSrc?: string;
  badge?: {
    icon: string;
    text: string;
  };
  isAdStack?: boolean;
  ads?: AdItem[];
  isAd?: boolean;
  sponsor?: string;
}

interface BeltSection {
  id: number;
  title: string;
  items: BeltItem[];
}

const processBeltItems = (section: BeltSection): BeltItem[] => {
  const processedItems: BeltItem[] = [];
  
  section.items.forEach(item => {
    if (item.isAdStack && item.ads) {
      item.ads.forEach(ad => {
        processedItems.push({
          id: ad.id,
          title: ad.title,
          image: ad.image,
          fallbackSrc: ad.image,
          isAd: true,
          sponsor: ad.sponsor
        } as BeltItem);
      });
    } else {
      processedItems.push(item);
    }
  });
  
  return processedItems;
};

const weeklyOffers: BeltSection = {
  id: 1,
  title: "Weekly Topics",
  items: [
    {
      id: 101,
      title: "The Perfect Sunday Breakfast",
      image: "/lovable-uploads/cbfe3137-a8fe-47b7-b7bb-4e2fdcd931fc.png",
      fallbackSrc: "/lovable-uploads/cbfe3137-a8fe-47b7-b7bb-4e2fdcd931fc.png",
      badge: {
        icon: "ListTodo",
        text: "Shopping list"
      }
    }, 
    {
      id: 102,
      title: "Stacked Ads",
      isAdStack: true,
      ads: [
        {
          id: 1021,
          title: "Viladomy Pitkovic",
          image: "/lovable-uploads/90f118dd-41bc-482c-98b0-3763799f43e1.png",
          sponsor: "Central Group"
        },
        {
          id: 1022,
          title: "Partners Banka",
          image: "/lovable-uploads/ae63401e-b7d6-4f1f-817d-2c379b21bd15.png",
          sponsor: "Partners Banka"
        }
      ]
    }, 
    {
      id: 103,
      title: "Bakery Fresh",
      image: "/lovable-uploads/449d2a80-7b69-4959-8a66-f74b63814e56.png",
      fallbackSrc: "/lovable-uploads/449d2a80-7b69-4959-8a66-f74b63814e56.png"
    }, 
    {
      id: 104,
      title: "Stacked Ads",
      isAdStack: true,
      ads: [
        {
          id: 1041,
          title: "Misa Ice Cream",
          image: "/lovable-uploads/d136c32a-fa95-4a02-ac7a-ca96bdad4f58.png",
          sponsor: "Misa"
        },
        {
          id: 1042,
          title: "U-mai Caviar",
          image: "/lovable-uploads/80409ac3-087c-453d-a031-d3dc5358c401.png",
          sponsor: "U-mai"
        }
      ]
    }
  ]
};

const ContentCard = ({ 
  item, 
  isFocused 
}: { 
  item: BeltItem, 
  isFocused: boolean 
}) => {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover" 
          loading="eager"
        />
      </div>
      
      {item.badge && (
        <div className="absolute top-4 left-4 z-10">
          <Badge variant="secondary" className="px-2 py-1 bg-white/90 text-primary shadow-sm backdrop-blur-sm flex items-center gap-1.5">
            <ListTodo className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">{item.badge.text}</span>
          </Badge>
        </div>
      )}
      
      {(item as any).sponsor && (
        <div className="absolute top-4 right-4 z-10">
          <Badge variant="secondary" className="px-2 py-1 bg-white/90 text-primary shadow-sm backdrop-blur-sm">
            <span className="text-xs font-medium">Sponsored</span>
          </Badge>
        </div>
      )}
      
      <div className={cn(
        "absolute inset-0 bg-gradient-to-b from-black/10 to-black/70",
        "transition-opacity duration-200",
        isFocused ? "opacity-90" : "opacity-100"
      )} />
      
      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3 className="text-white text-2xl font-extrabold leading-tight">
          {item.title}
        </h3>
        {(item as any).sponsor && (
          <p className="text-white/80 text-sm mt-1">
            By {(item as any).sponsor}
          </p>
        )}
      </div>
    </div>
  );
};

const IkeaBelt = () => {
  const beltRef = useRef<HTMLDivElement>(null);
  const { triggerHaptic } = useHapticFeedback();
  const isMobile = useIsMobile();
  const [focusedIndex, setFocusedIndex] = useState<number | null>(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastHapticTime = useRef<number>(0);
  const [visibleMobileIndex, setVisibleMobileIndex] = useState(0);
  const [visibleDesktopItems, setVisibleDesktopItems] = useState<number[]>([0, 1, 2, 3]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Process the belt items
  const processedItems = processBeltItems(weeklyOffers);
  
  const scrollThreshold = 150; // Pixels to scroll before triggering a transition
  const lastScrollY = useRef<number>(0);
  const scrollDirection = useRef<'up' | 'down'>('down');
  const scrollAccumulator = useRef<number>(0);
  
  // Timing and transition queue management
  const lastTransitionTime = useRef<number>(Date.now());
  const minimumDisplayTime = 1000; // 1 second minimum display time
  const transitionQueue = useRef<number[]>([]);
  const isTransitioning = useRef<boolean>(false);
  const isProcessingQueue = useRef<boolean>(false);

  // Process the transition queue with guaranteed minimum display time
  const processTransitionQueue = () => {
    if (isProcessingQueue.current) return;
    
    if (transitionQueue.current.length > 0 && !isTransitioning.current) {
      isProcessingQueue.current = true;
      isTransitioning.current = true;
      
      const nextIndex = transitionQueue.current.shift() as number;
      
      // Update the visible index
      if (isMobile) {
        setVisibleMobileIndex(nextIndex);
      } else {
        // For desktop, update the 4 visible items
        const newVisibleItems = [
          nextIndex,
          (nextIndex + 1) % processedItems.length,
          (nextIndex + 2) % processedItems.length,
          (nextIndex + 3) % processedItems.length
        ];
        setVisibleDesktopItems(newVisibleItems);
        setFocusedIndex(nextIndex);
      }
      
      // Provide haptic feedback
      triggerHaptic();
      
      // Update the last transition time
      lastTransitionTime.current = Date.now();
      
      // Wait for minimum display time before processing the next item
      setTimeout(() => {
        isTransitioning.current = false;
        isProcessingQueue.current = false;
        
        // Process the next item in the queue if available
        if (transitionQueue.current.length > 0) {
          processTransitionQueue();
        }
      }, minimumDisplayTime);
    }
  };

  // Queue a transition to a specific index
  const queueTransition = (index: number) => {
    // Prevent adding duplicate consecutive transitions
    if (transitionQueue.current.length > 0) {
      const lastQueuedIndex = transitionQueue.current[transitionQueue.current.length - 1];
      if (lastQueuedIndex === index) return;
    } else if ((isMobile ? visibleMobileIndex : focusedIndex) === index) {
      return;
    }
    
    // Add the transition to the queue
    transitionQueue.current.push(index);
    
    // Start processing the queue if not already processing
    processTransitionQueue();
  };

  useEffect(() => {
    processedItems.forEach(item => {
      if (item.image) {
        const img = new Image();
        img.src = item.image;
        if (item.fallbackSrc) {
          const fallbackImg = new Image();
          fallbackImg.src = item.fallbackSrc;
        }
      }
    });
  }, []);

  useEffect(() => {
    // Apply scroll-based transitions to both mobile and desktop
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY.current ? 'down' : 'up';
      const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);
      
      // Only process if there's a meaningful scroll
      if (scrollDelta > 5) {
        // Update or reset scroll accumulator based on direction change
        if (direction === scrollDirection.current) {
          scrollAccumulator.current += scrollDelta;
        } else {
          scrollDirection.current = direction;
          scrollAccumulator.current = scrollDelta;
        }
        
        // Check if we've scrolled enough to trigger item changes
        if (scrollAccumulator.current >= scrollThreshold) {
          // Calculate how many items to move
          const itemsToMove = Math.floor(scrollAccumulator.current / scrollThreshold);
          scrollAccumulator.current = scrollAccumulator.current % scrollThreshold;
          
          // Determine the new index based on direction
          let currentIndex = isMobile ? visibleMobileIndex : (focusedIndex || 0);
          
          // Process multiple transitions if needed
          for (let i = 0; i < itemsToMove; i++) {
            if (direction === 'down') {
              currentIndex = Math.min(currentIndex + 1, processedItems.length - 1);
            } else {
              currentIndex = Math.max(currentIndex - 1, 0);
            }
            
            // Queue this transition
            queueTransition(currentIndex);
          }
        }
        
        lastScrollY.current = currentScrollY;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    lastScrollY.current = window.scrollY;
    lastTransitionTime.current = Date.now();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile, visibleMobileIndex, focusedIndex, triggerHaptic]);

  useEffect(() => {
    if (!isMobile || !beltRef.current) return;
    
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.7
    };
    
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const visibleEntries = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => {
          const rectA = a.boundingClientRect;
          const rectB = b.boundingClientRect;
          return rectA.left - rectB.left;
        });
      
      if (visibleEntries.length > 0) {
        const leftmostItem = visibleEntries[0];
        const index = Number(leftmostItem.target.getAttribute('data-index'));
        
        if ((isMobile ? visibleMobileIndex : (focusedIndex || 0)) !== index) {
          queueTransition(index);
        }
      }
    };
    
    const observer = new IntersectionObserver(handleIntersection, options);
    
    itemRefs.current.forEach(item => {
      if (item) observer.observe(item);
    });
    
    return () => observer.disconnect();
  }, [isMobile, visibleMobileIndex, focusedIndex, triggerHaptic]);

  return (
    <div className="py-8">
      <div className="mb-8">
        <div className="px-4 mb-4">
          <h2 className="text-xl font-semibold">{weeklyOffers.title}</h2>
        </div>
        
        {isMobile ? (
          <div className={cn(
            "relative overflow-hidden",
            "w-full"
          )}>
            <AspectRatio ratio={3 / 2.5} className="w-full">
              <div 
                ref={containerRef}
                className="w-full h-full relative overflow-hidden"
              >
                {processedItems.map((item, index) => (
                  <div 
                    key={item.id}
                    className={cn(
                      "absolute inset-0 w-full h-full transition-all duration-500",
                      visibleMobileIndex === index 
                        ? "opacity-100 z-10 translate-y-0" 
                        : index < visibleMobileIndex
                          ? "opacity-0 z-0 -translate-y-8" 
                          : "opacity-0 z-0 translate-y-8"
                    )}
                  >
                    <ContentCard item={item} isFocused={false} />
                  </div>
                ))}
                
                <div className="absolute bottom-4 right-4 flex gap-1">
                  {processedItems.map((_, index) => (
                    <div 
                      key={index}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300",
                        visibleMobileIndex === index 
                          ? "bg-white scale-125" 
                          : "bg-white/40"
                      )}
                    />
                  ))}
                </div>
              </div>
            </AspectRatio>
          </div>
        ) : (
          <div className="relative px-4">
            <div className="grid grid-cols-4 gap-4">
              {visibleDesktopItems.map((itemIndex, gridIndex) => {
                const item = processedItems[itemIndex];
                return (
                  <div 
                    key={`${item.id}-${gridIndex}`}
                    className={cn(
                      "transition-all duration-500",
                      "transform-gpu"
                    )}
                  >
                    <AspectRatio ratio={3 / 2.5} className="overflow-hidden">
                      <Card
                        className={cn(
                          "h-full w-full overflow-hidden border-0 shadow-md",
                          "transition-all duration-200",
                          focusedIndex === itemIndex && "scale-[1.02] shadow-lg",
                          "!rounded-none"
                        )}
                        style={{ borderRadius: 0 }}
                      >
                        <ContentCard item={item} isFocused={focusedIndex === itemIndex} />
                      </Card>
                    </AspectRatio>
                  </div>
                );
              })}
            </div>
            
            <div className="flex justify-center mt-4 gap-1">
              {processedItems.map((_, index) => (
                <div 
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    visibleDesktopItems.includes(index)
                      ? "bg-primary scale-125" 
                      : "bg-primary/40"
                  )}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IkeaBelt;
