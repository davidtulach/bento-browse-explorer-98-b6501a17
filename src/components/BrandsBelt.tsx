
import React, { useRef, useState, useEffect } from 'react';
import { 
  Circle, Square, Triangle, Diamond, Hexagon, 
  Star, Infinity, Layers, LayoutGrid, Heart, 
  Smartphone, Zap, CupSoda, UtilityPole
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHapticFeedback } from '@/hooks/use-haptic';
import { useIsMobile } from '@/hooks/use-mobile';

const brandIcons = [
  { id: 1, name: "Eco Fresh", icon: Circle, color: "#4CAF50" },
  { id: 2, name: "Pure Box", icon: Square, color: "#2196F3" },
  { id: 3, name: "Delta", icon: Triangle, color: "#FF9800" },
  { id: 4, name: "Luxe", icon: Diamond, color: "#9C27B0" },
  { id: 5, name: "Hexo", icon: Hexagon, color: "#009688" },
  { id: 6, name: "Star Foods", icon: Star, color: "#FFC107" },
  { id: 7, name: "Forever", icon: Infinity, color: "#E91E63" },
  { id: 8, name: "Layer", icon: Layers, color: "#3F51B5" },
  { id: 9, name: "Grid", icon: LayoutGrid, color: "#795548" },
  { id: 10, name: "Lovely", icon: Heart, color: "#F44336" },
  { id: 11, name: "Tech Food", icon: Smartphone, color: "#607D8B" },
  { id: 12, name: "Energy", icon: Zap, color: "#FFEB3B" },
  { id: 13, name: "Fizz", icon: CupSoda, color: "#03A9F4" },
  { id: 14, name: "Electra", icon: UtilityPole, color: "#673AB7" },
];

const BrandsBelt = () => {
  const { triggerHaptic } = useHapticFeedback();
  const isMobile = useIsMobile();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [focusedItemIndex, setFocusedItemIndex] = useState<number | null>(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastHapticTime = useRef<number>(0);
  
  // Set up intersection observer to track visible items
  useEffect(() => {
    if (!isMobile || !scrollRef.current) return;
    
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.8, // Item must be 80% visible to be considered "in view"
    };
    
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      // Find the leftmost visible item
      const visibleEntries = entries.filter(entry => entry.isIntersecting)
        .sort((a, b) => {
          const rectA = a.boundingClientRect;
          const rectB = b.boundingClientRect;
          return rectA.left - rectB.left;
        });
      
      if (visibleEntries.length > 0) {
        const leftmostItem = visibleEntries[0];
        const index = Number(leftmostItem.target.getAttribute('data-index'));
        
        if (focusedItemIndex !== index) {
          setFocusedItemIndex(index);
          
          // Trigger haptic feedback with throttling (max once per 150ms)
          const now = Date.now();
          if (now - lastHapticTime.current > 150) {
            triggerHaptic();
            lastHapticTime.current = now;
          }
        }
      }
    };
    
    const observer = new IntersectionObserver(handleIntersection, options);
    
    // Observe all brand items
    itemRefs.current.forEach(item => {
      if (item) observer.observe(item);
    });
    
    return () => {
      observer.disconnect();
    };
  }, [isMobile, focusedItemIndex, triggerHaptic]);
  
  return (
    <div className="py-6 px-4">
      <h2 className="text-lg font-medium mb-4">Brands we think you might love</h2>
      
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-5 pb-4 scrollbar-hide"
      >
        {brandIcons.map((brand, index) => (
          <div 
            key={brand.id} 
            ref={el => itemRefs.current[index] = el}
            data-index={index}
            className={cn(
              "flex flex-col items-center flex-shrink-0 transition-transform duration-200",
              focusedItemIndex === index && "scale-110"
            )}
          >
            <div 
              className={cn(
                "w-14 h-14 rounded-full flex items-center justify-center mb-2 transition-transform border border-gray-100",
                focusedItemIndex === index 
                  ? "bg-primary/10 shadow-md border-primary/30" 
                  : "bg-white shadow-sm"
              )}
            >
              {React.createElement(brand.icon, { 
                size: 28, 
                color: brand.color,
                strokeWidth: 1.5,
                className: "transition-all duration-200"
              })}
            </div>
            <span className="text-xs font-medium text-center whitespace-nowrap">{brand.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandsBelt;
