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
  const [desktopSetIndex, setDesktopSetIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const processedItems = processBeltItems(weeklyOffers);
  
  const lastScrollY = useRef<number>(0);
  const scrollDirection = useRef<'up' | 'down'>('down');
  const scrollAccumulator = useRef<number>(0);
  const scrollThreshold = 150;
  
  const lastTransitionTime = useRef<number>(Date.now());
  const minimumDisplayTime = 1000;
  const isTransitioning = useRef<boolean>(false);
  const scrollEventThrottled = useRef<boolean>(false);
  const scrollLocked = useRef<boolean>(false);
  
  const firstSet = processedItems.slice(0, 4);
  const secondSet = processedItems.slice(4);
  
  while (secondSet.length < 4 && processedItems.length > 0) {
    const indexToAdd = secondSet.length % processedItems.length;
    secondSet.push(processedItems[indexToAdd]);
  }

  const triggerTransition = (direction: 'up' | 'down') => {
    if (isTransitioning.current || scrollLocked.current) return;
    
    isTransitioning.current = true;
    
    if (isMobile) {
      if (direction === 'down') {
        setVisibleMobileIndex(prev => Math.min(prev + 1, processedItems.length - 1));
      } else {
        setVisibleMobileIndex(prev => Math.max(prev - 1, 0));
      }
    } else {
      if (direction === 'down') {
        setDesktopSetIndex(1);
      } else {
        setDesktopSetIndex(0);
      }
    }
    
    triggerHaptic();
    
    lastTransitionTime.current = Date.now();
    
    setTimeout(() => {
      isTransitioning.current = false;
    }, minimumDisplayTime);
    
    scrollLocked.current = true;
    setTimeout(() => {
      scrollLocked.current = false;
    }, 800);
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
    const handleScroll = () => {
      if (scrollEventThrottled.current || scrollLocked.current) return;
      
      scrollEventThrottled.current = true;
      setTimeout(() => {
        scrollEventThrottled.current = false;
      }, 50);
      
      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);
      
      if (scrollDelta > 5) {
        const direction = currentScrollY > lastScrollY.current ? 'down' : 'up';
        
        if (direction !== scrollDirection.current) {
          scrollDirection.current = direction;
          scrollAccumulator.current = 0;
        } 
        
        scrollAccumulator.current += scrollDelta;
        
        if (scrollAccumulator.current >= scrollThreshold) {
          scrollAccumulator.current = 0;
          triggerTransition(direction);
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
  }, [isMobile, triggerHaptic]);

  useEffect(() => {
    if (!isMobile || !beltRef.current) return;
    
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.7
    };
    
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (isTransitioning.current) return;
      
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
        
        if (visibleMobileIndex !== index) {
          const direction = index > visibleMobileIndex ? 'down' : 'up';
          if (!isTransitioning.current) {
            setVisibleMobileIndex(index);
            triggerHaptic();
          }
        }
      }
    };
    
    const observer = new IntersectionObserver(handleIntersection, options);
    
    itemRefs.current.forEach(item => {
      if (item) observer.observe(item);
    });
    
    return () => observer.disconnect();
  }, [isMobile, visibleMobileIndex, triggerHaptic]);

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
            <AspectRatio ratio={3 / 2.5} className="w-full" maxWidth={800}>
              <div 
                ref={containerRef}
                className="w-full h-full relative overflow-hidden perspective-1000"
              >
                {processedItems.map((item, index) => (
                  <div 
                    key={item.id}
                    className={cn(
                      "absolute inset-0 w-full h-full transition-all duration-500 transform-gpu will-change-transform",
                      visibleMobileIndex === index 
                        ? "opacity-100 z-10 translate-3d-0" 
                        : index < visibleMobileIndex
                          ? "opacity-0 z-0 -translate-3d-y-30 scale-90" 
                          : "opacity-0 z-0 translate-3d-y-30 scale-90"
                    )}
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: visibleMobileIndex === index 
                        ? 'translate3d(0, 0, 0) scale(1)' 
                        : index < visibleMobileIndex
                          ? 'translate3d(0, -30%, 0) scale(0.9)'
                          : 'translate3d(0, 30%, 0) scale(0.9)'
                    }}
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
            <div className="relative overflow-hidden perspective-1000 mx-auto" style={{ height: '320px', maxWidth: '1200px' }}>
              <div className="h-full w-full relative">
                <div 
                  className={cn(
                    "absolute inset-0 grid grid-cols-4 gap-4 transition-all duration-500 transform-gpu will-change-transform",
                  )}
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: desktopSetIndex === 0 
                      ? 'translate3d(0, 0, 0) scale(1)' 
                      : 'translate3d(0, -30%, 0) scale(0.9)',
                    opacity: desktopSetIndex === 0 ? 1 : 0,
                    zIndex: desktopSetIndex === 0 ? 10 : 5
                  }}
                >
                  {firstSet.map((item, gridIndex) => (
                    <div 
                      key={`first-${item.id}-${gridIndex}`}
                      className="transition-all duration-500 transform-gpu min-w-[300px] min-h-[250px]"
                    >
                      <AspectRatio ratio={3 / 2.5} className="overflow-hidden" maxWidth={300}>
                        <Card
                          className="h-full w-full overflow-hidden border-0 shadow-md transition-all duration-200 !rounded-none"
                          style={{ borderRadius: 0 }}
                        >
                          <ContentCard item={item} isFocused={false} />
                        </Card>
                      </AspectRatio>
                    </div>
                  ))}
                </div>

                <div 
                  className={cn(
                    "absolute inset-0 grid grid-cols-4 gap-4 transition-all duration-500 transform-gpu will-change-transform",
                  )}
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: desktopSetIndex === 1
                      ? 'translate3d(0, 0, 0) scale(1)' 
                      : 'translate3d(0, 30%, 0) scale(0.9)',
                    opacity: desktopSetIndex === 1 ? 1 : 0,
                    zIndex: desktopSetIndex === 1 ? 10 : 5
                  }}
                >
                  {secondSet.map((item, gridIndex) => (
                    <div 
                      key={`second-${item.id}-${gridIndex}`}
                      className="transition-all duration-500 transform-gpu min-w-[300px] min-h-[250px]"
                    >
                      <AspectRatio ratio={3 / 2.5} className="overflow-hidden" maxWidth={300}>
                        <Card
                          className="h-full w-full overflow-hidden border-0 shadow-md transition-all duration-200 !rounded-none"
                          style={{ borderRadius: 0 }}
                        >
                          <ContentCard item={item} isFocused={false} />
                        </Card>
                      </AspectRatio>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-4 gap-1">
              <div 
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  desktopSetIndex === 0 
                    ? "bg-primary scale-125" 
                    : "bg-primary/40"
                )}
              />
              <div 
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  desktopSetIndex === 1 
                    ? "bg-primary scale-125" 
                    : "bg-primary/40"
                )}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IkeaBelt;
