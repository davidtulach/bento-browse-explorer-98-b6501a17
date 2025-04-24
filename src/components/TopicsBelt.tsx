import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { ListTodo } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { AdItem, topicsBeltSequence } from '@/utils/adSequences';
import AnimatedImage from '@/components/AnimatedImage';
import { useContentTransitions } from '@/hooks/use-content-transitions';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

const weeklyContentItems: BeltItem[] = [
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
    id: 103,
    title: "Bakery Fresh",
    image: "/lovable-uploads/449d2a80-7b69-4959-8a66-f74b63814e56.png",
    fallbackSrc: "/lovable-uploads/449d2a80-7b69-4959-8a66-f74b63814e56.png"
  }
];

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
        <AnimatedImage 
          src={item.image || ''} 
          alt={item.title} 
          fallbackSrc={item.fallbackSrc}
          className="w-full h-full"
          objectFit="cover"
        />
      </div>
      
      {item.badge && !item.isAd && (
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
      
      {!item.isAd && (
        <div className="absolute inset-x-0 bottom-0 p-6">
          <h3 className="text-white text-2xl font-extrabold leading-tight">
            {item.title}
          </h3>
        </div>
      )}
    </div>
  );
};

const TopicsBelt: React.FC = () => {
  const beltRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [adItems, setAdItems] = useState<AdItem[]>([
    topicsBeltSequence[0],
    topicsBeltSequence[1]
  ]);
  
  const contentItems: BeltItem[] = [
    weeklyContentItems[0],
    { ...adItems[0], isAd: true },
    weeklyContentItems[1],
    { ...adItems[1], isAd: true }
  ];
  
  useEffect(() => {
    weeklyContentItems.forEach(item => {
      if (item.image) {
        const img = new Image();
        img.src = item.image;
        if (item.fallbackSrc) {
          const fallbackImg = new Image();
          fallbackImg.src = item.fallbackSrc;
        }
      }
    });
    
    topicsBeltSequence.forEach(ad => {
      const img = new Image();
      img.src = ad.image;
    });
  }, []);

  const { 
    activeIndex, 
    goToContent, 
    nextContent, 
    prevContent 
  } = useContentTransitions(contentItems.length, isMobile, {
    minimumDisplayTime: 3000,
    scrollThreshold: 150,
    enableScrollTriggers: true
  });
  
  const touchStartX = useRef<number | null>(null);
  
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextContent();
      } else {
        prevContent();
      }
    }
    
    touchStartX.current = null;
  };

  const desktopView = (
    <div className="relative px-4">
      <div className="relative overflow-hidden" style={{ height: '320px' }}>
        <div className="h-full w-full relative">
          <div className="absolute inset-y-0 left-0 z-20 flex items-center">
            <button 
              onClick={prevContent}
              className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-all"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
          </div>
          
          <div className="absolute inset-y-0 right-0 z-20 flex items-center">
            <button 
              onClick={nextContent}
              className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-all"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          </div>

          <div className="absolute inset-0 grid grid-cols-4 gap-4">
            {contentItems.map((item, index) => (
              <div 
                key={`item-${item.id}-${index}`}
                className={cn(
                  "transition-opacity duration-700 ease-in-out",
                  Math.floor(activeIndex / 4) * 4 <= index && 
                  index < Math.floor(activeIndex / 4) * 4 + 4 
                    ? "opacity-100 z-10" 
                    : "opacity-0 z-0"
                )}
              >
                <AspectRatio ratio={3 / 2.5} className="overflow-hidden">
                  <Card
                    className="h-full w-full overflow-hidden border-0 shadow-md transition-all duration-200 !rounded-none"
                    style={{ borderRadius: 0 }}
                  >
                    <ContentCard 
                      item={item} 
                      isFocused={index === activeIndex}
                    />
                  </Card>
                </AspectRatio>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mt-4 gap-1">
        {[0, 1].map((pageIndex) => (
          <button 
            key={pageIndex}
            onClick={() => goToContent(pageIndex * 4)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              Math.floor(activeIndex / 4) === pageIndex
                ? "bg-primary scale-125" 
                : "bg-primary/40 hover:bg-primary/60"
            )}
          />
        ))}
      </div>
    </div>
  );
  
  const mobileView = (
    <div className="relative overflow-hidden w-full">
      <AspectRatio ratio={3 / 2.5} className="w-full">
        <div 
          ref={containerRef}
          className="w-full h-full relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {contentItems.map((item, index) => (
            <div 
              key={item.id}
              className={cn(
                "absolute inset-0 w-full h-full transition-opacity duration-700",
                activeIndex === index 
                  ? "opacity-100 z-10" 
                  : "opacity-0 z-0"
              )}
            >
              <ContentCard item={item} isFocused={false} />
            </div>
          ))}
          
          <div className="absolute bottom-4 right-4 flex gap-1">
            {contentItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToContent(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  activeIndex === index 
                    ? "bg-white scale-125" 
                    : "bg-white/40"
                )}
              />
            ))}
          </div>
        </div>
      </AspectRatio>
    </div>
  );

  return (
    <div className="py-8" ref={beltRef}>
      <div className="mb-8">
        <div className="px-4 mb-4">
          <h2 className="text-xl font-semibold">Weekly Topics</h2>
        </div>
        
        {isMobile ? mobileView : desktopView}
      </div>
    </div>
  );
};

export default TopicsBelt;
