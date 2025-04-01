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
    title: "Butcher's Special",
    image: "/lovable-uploads/93315171-35f2-45a1-9399-e3f088c074fc.png",
    fallbackSrc: "/lovable-uploads/93315171-35f2-45a1-9399-e3f088c074fc.png"
  }, {
    id: 103,
    title: "Bakery Fresh",
    image: "/lovable-uploads/449d2a80-7b69-4959-8a66-f74b63814e56.png",
    fallbackSrc: "/lovable-uploads/449d2a80-7b69-4959-8a66-f74b63814e56.png"
  }, {
    id: 104,
    title: "Wine & Cheese Festival",
    image: "/lovable-uploads/c2a98500-94d6-4675-9461-4de64da74d39.png",
    fallbackSrc: "/lovable-uploads/c2a98500-94d6-4675-9461-4de64da74d39.png"
  }]
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

  const renderWeeklyItem = (item: typeof weeklyOffers.items[0], index: number) => {
    const itemContent = <div className="relative">
        <AnimatedImage src={item.image} fallbackSrc={item.fallbackSrc} alt={item.title} className="w-full" aspectRatio="aspect-[3/4]" objectFit="cover" />
        {item.badge && <div className="absolute top-4 left-4 z-10">
            <Badge variant="secondary" className="px-2 py-1 bg-white/90 text-primary shadow-sm backdrop-blur-sm flex items-center gap-1.5">
              <ListTodo className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">{item.badge.text}</span>
            </Badge>
          </div>}
        <div className={cn("absolute inset-0 bg-gradient-to-b from-black/10 to-black/70 transition-opacity duration-200", focusedWeeklyIndex === index ? "opacity-90" : "opacity-100")}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-center text-white px-4 max-w-full text-2xl font-black tracking-tight text-shadow-sm">
            {item.title}
          </h3>
        </div>
      </div>;

    const previewContent = <div className="relative rounded overflow-hidden">
        <img src={item.image} alt={item.title} className="w-full aspect-video object-cover" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-white font-black text-xl text-center px-4">{item.title}</h3>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded-md inline-block">
              <p className="text-white text-xs">Click to view shopping list</p>
            </div>
          </div>
        </div>
      </div>;

    return <div key={item.id} ref={el => weeklyItemRefs.current[index] = el} data-index={index} className={cn("flex-shrink-0 snap-start overflow-hidden shadow-sm w-[300px] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-16px)] transition-all duration-200", focusedWeeklyIndex === index && "scale-105 shadow-md")}>
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
          <div ref={weeklyScrollRef} className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scrollbar-hide" style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}>
            {weeklyOffers.items.map((item, index) => renderWeeklyItem(item, index))}
          </div>
        </div>
      </div>
    </div>;
};

export default IkeaBelt;
