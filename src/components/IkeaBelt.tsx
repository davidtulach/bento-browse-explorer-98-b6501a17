
import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import AnimatedImage from './AnimatedImage';
import { ListTodo } from 'lucide-react';
import { useHapticFeedback } from '@/hooks/use-haptic';
import { useIsMobile } from '@/hooks/use-mobile';
import { Badge } from '@/components/ui/badge';
import ContentPreview from './ContentPreview';

const weeklyOffers = {
  id: 1,
  title: "Weekly Topics",
  items: [{
    id: 101,
    title: "The Perfect Sunday Breakfast",
    image: "/lovable-uploads/cbfe3137-a8fe-47b7-b7bb-4e2fdcd931fc.png",
    fallbackSrc: "/lovable-uploads/cbfe3137-a8fe-47b7-b7bb-4e2fdcd931fc.png",
    badge: {
      icon: "ListTodo",
      text: "Shopping list"
    }
  }, {
    id: 102,
    title: "Stacked Ads",
    isAdStack: true,
    ads: [
      {
        id: 1021,
        title: "Fitness Sale",
        image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=400&q=80",
        sponsor: "SportLife"
      },
      {
        id: 1022,
        title: "Travel Deals",
        image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=400&q=80",
        sponsor: "TravelCo"
      }
    ]
  }, {
    id: 103,
    title: "Bakery Fresh",
    image: "/lovable-uploads/449d2a80-7b69-4959-8a66-f74b63814e56.png",
    fallbackSrc: "/lovable-uploads/449d2a80-7b69-4959-8a66-f74b63814e56.png"
  }, {
    id: 104,
    title: "Stacked Ads",
    isAdStack: true,
    ads: [
      {
        id: 1041,
        title: "Summer Collection",
        image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=400&q=80", 
        sponsor: "FashionBrand"
      },
      {
        id: 1042,
        title: "Home Essentials",
        image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=400&q=80",
        sponsor: "HomeDeco"
      }
    ]
  }]
};

const preloadImages = () => {
  weeklyOffers.items.forEach(item => {
    if (item.isAdStack) {
      item.ads.forEach(ad => {
        const img = new Image();
        img.src = ad.image;
      });
    } else {
      const img = new Image();
      img.src = item.image;
      if (item.fallbackSrc) {
        const fallbackImg = new Image();
        fallbackImg.src = item.fallbackSrc;
      }
    }
  });
};

const IkeaBelt = () => {
  const weeklyScrollRef = useRef<HTMLDivElement>(null);
  const {
    triggerHaptic
  } = useHapticFeedback();
  const isMobile = useIsMobile();
  const [focusedWeeklyIndex, setFocusedWeeklyIndex] = useState<number | null>(0);
  const weeklyItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastHapticTime = useRef<number>(0);

  useEffect(() => {
    preloadImages();
  }, []);

  useEffect(() => {
    if (!isMobile || !weeklyScrollRef.current) return;
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.7
    };
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const visibleEntries = entries.filter(entry => entry.isIntersecting).sort((a, b) => {
        const rectA = a.boundingClientRect;
        const rectB = b.boundingClientRect;
        return rectA.left - rectB.left;
      });
      if (visibleEntries.length > 0) {
        const leftmostItem = visibleEntries[0];
        const index = Number(leftmostItem.target.getAttribute('data-index'));
        if (focusedWeeklyIndex !== index) {
          setFocusedWeeklyIndex(index);
          const now = Date.now();
          if (now - lastHapticTime.current > 150) {
            triggerHaptic();
            lastHapticTime.current = now;
          }
        }
      }
    };
    const observer = new IntersectionObserver(handleIntersection, options);
    weeklyItemRefs.current.forEach(item => {
      if (item) observer.observe(item);
    });
    return () => {
      observer.disconnect();
    };
  }, [isMobile, focusedWeeklyIndex, triggerHaptic]);

  const renderStackedAds = (item: typeof weeklyOffers.items[0], index: number) => {
    if (!item.isAdStack || !item.ads) return null;

    const stackedAdsContent = (
      <div className="relative h-full flex flex-col">
        {item.ads.map((ad, adIndex) => (
          <div key={ad.id} className={cn(
            "relative flex-1",
            adIndex === 0 ? "pb-1" : "pt-1" // Add padding between stacked ads
          )}>
            <img 
              src={ad.image} 
              alt={ad.title} 
              className="w-full h-full object-cover rounded" 
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/70">
              <div className="absolute bottom-2 left-2 right-2">
                <h4 className="text-white text-sm font-medium">{ad.title}</h4>
                {ad.sponsor && (
                  <span className="text-white/80 text-xs">Sponsored by {ad.sponsor}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );

    const previewContent = (
      <div className="relative rounded overflow-hidden">
        <div className="flex flex-col h-full">
          {item.ads.map((ad, adIndex) => (
            <div key={ad.id} className={cn(
              "relative flex-1",
              adIndex === 0 ? "mb-1" : "mt-1" // Add margin between ads in preview
            )}>
              <img 
                src={ad.image} 
                alt={ad.title} 
                className="w-full object-cover rounded" 
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded-md inline-block">
                  <p className="text-white text-xs">Sponsored by {ad.sponsor}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

    return (
      <div 
        key={item.id} 
        ref={el => weeklyItemRefs.current[index] = el} 
        data-index={index} 
        className={cn(
          "flex-shrink-0 snap-start overflow-hidden shadow-sm rounded-lg transition-all duration-200 h-[400px]", 
          focusedWeeklyIndex === index && "scale-105 shadow-md",
          "w-[280px]" // Unified card width
        )}
      >
        {isMobile ? stackedAdsContent : (
          <ContentPreview 
            previewContent={previewContent} 
            previewTitle="Sponsored Content" 
            openDelay={1000}
          >
            {stackedAdsContent}
          </ContentPreview>
        )}
      </div>
    );
  };

  const renderWeeklyItem = (item: typeof weeklyOffers.items[0], index: number) => {
    if (item.isAdStack) {
      return renderStackedAds(item, index);
    }

    const itemContent = <div className="relative h-full">
        <AnimatedImage 
          src={item.image} 
          fallbackSrc={item.fallbackSrc} 
          alt={item.title} 
          className="w-full h-full" 
          aspectRatio="aspect-[3/4]" 
          objectFit="cover" 
        />
        {item.badge && <div className="absolute top-4 left-4 z-10">
            <Badge variant="secondary" className="px-2 py-1 bg-white/90 text-primary shadow-sm backdrop-blur-sm flex items-center gap-1.5">
              <ListTodo className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">{item.badge.text}</span>
            </Badge>
          </div>}
        <div className={cn("absolute inset-0 bg-gradient-to-b from-black/10 to-black/70 transition-opacity duration-200", focusedWeeklyIndex === index ? "opacity-90" : "opacity-100")}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-center text-white px-4 max-w-full text-2xl tracking-tight text-shadow-sm" style={{ fontWeight: 900 }}>
            {item.title}
          </h3>
        </div>
      </div>;

    const previewContent = <div className="relative rounded overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full aspect-video object-cover" 
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-white text-xl text-center px-4" style={{ fontWeight: 900 }}>
            {item.title}
          </h3>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded-md inline-block">
              <p className="text-white text-xs">Click to view shopping list</p>
            </div>
          </div>
        </div>
      </div>;

    return <div 
      key={item.id} 
      ref={el => weeklyItemRefs.current[index] = el} 
      data-index={index} 
      className={cn(
        "flex-shrink-0 snap-start overflow-hidden shadow-sm rounded-lg transition-all duration-200 h-[400px]", 
        focusedWeeklyIndex === index && "scale-105 shadow-md",
        "w-[280px]" // Unified card width
      )}
    >
        {isMobile ? itemContent : <ContentPreview previewContent={previewContent} previewTitle={`${item.title} Preview`} openDelay={1000}>
            {itemContent}
          </ContentPreview>}
      </div>;
  };

  return <div className="py-4">
      <div className="mb-10">
        <div className="px-4 mb-3">
          <h2 className="text-lg font-medium">{weeklyOffers.title}</h2>
        </div>
        
        <div className="relative px-4">
          <div 
            ref={weeklyScrollRef} 
            className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-5 pb-4 scrollbar-hide" 
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {weeklyOffers.items.map((item, index) => renderWeeklyItem(item, index))}
          </div>
        </div>
      </div>
    </div>;
};

export default IkeaBelt;
