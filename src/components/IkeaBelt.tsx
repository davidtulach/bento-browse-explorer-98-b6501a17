
import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useHapticFeedback } from '@/hooks/use-haptic';
import { useIsMobile } from '@/hooks/use-mobile';
import { ListTodo } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

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
}

interface BeltSection {
  id: number;
  title: string;
  items: BeltItem[];
}

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
          fetchPriority="high"
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
      
      <div className={cn(
        "absolute inset-0 bg-gradient-to-b from-black/10 to-black/70",
        "transition-opacity duration-200",
        isFocused ? "opacity-90" : "opacity-100"
      )} />
      
      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3 className="text-white text-2xl font-extrabold leading-tight">
          {item.title}
        </h3>
      </div>
    </div>
  );
};

const StackedAdCard = ({ 
  item, 
  isFocused 
}: { 
  item: BeltItem, 
  isFocused: boolean 
}) => {
  if (!item.isAdStack || !item.ads) return null;
  
  return (
    <div className="relative h-full w-full">
      {item.ads.map((ad, adIndex) => (
        <div 
          key={ad.id} 
          className={cn(
            "absolute inset-x-0 w-full",
            adIndex === 0 ? "top-0 h-[49.5%]" : "bottom-0 h-[49.5%]"
          )}
        >
          <div className="relative h-full w-full">
            <img 
              src={ad.image} 
              alt={ad.title} 
              className="w-full h-full object-cover" 
              loading="eager"
              fetchPriority="high"
            />
            
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/70" />
          </div>
        </div>
      ))}
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

  const cardWidth = 350;
  const visibleCardPercentage = isMobile ? 0.85 : 1;
  const mobileCardWidth = cardWidth * visibleCardPercentage;

  useEffect(() => {
    weeklyOffers.items.forEach(item => {
      if (item.isAdStack) {
        item.ads?.forEach(ad => {
          const img = new Image();
          img.src = ad.image;
        });
      } else if (item.image) {
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
        
        if (focusedIndex !== index) {
          setFocusedIndex(index);
          
          const now = Date.now();
          if (now - lastHapticTime.current > 150) {
            triggerHaptic();
            lastHapticTime.current = now;
          }
        }
      }
    };
    
    const observer = new IntersectionObserver(handleIntersection, options);
    
    itemRefs.current.forEach(item => {
      if (item) observer.observe(item);
    });
    
    return () => observer.disconnect();
  }, [isMobile, focusedIndex, triggerHaptic]);

  return (
    <div className="py-8">
      <div className="mb-8">
        <div className="px-4 mb-4">
          <h2 className="text-xl font-semibold">{weeklyOffers.title}</h2>
        </div>
        
        <div className="relative px-4">
          <div 
            ref={beltRef} 
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 scrollbar-hide" 
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              paddingRight: isMobile ? '40px' : '16px'
            }}
          >
            {weeklyOffers.items.map((item, index) => (
              <Card
                key={item.id}
                ref={el => itemRefs.current[index] = el}
                data-index={index}
                className={cn(
                  "flex-shrink-0 snap-start overflow-hidden border-0 shadow-md",
                  "transition-all duration-200",
                  focusedIndex === index && "scale-[1.02] shadow-lg",
                  "!rounded-none"
                )}
                style={{
                  borderRadius: 0,
                  width: isMobile ? `${mobileCardWidth}px` : '350px',
                  height: '500px'
                }}
              >
                {item.isAdStack ? (
                  <StackedAdCard item={item} isFocused={focusedIndex === index} />
                ) : (
                  <ContentCard item={item} isFocused={focusedIndex === index} />
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IkeaBelt;
