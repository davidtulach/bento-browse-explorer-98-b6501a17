import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import StoryScroller from '@/components/StoryScroller';
import CategoryBelt from '@/components/CategoryBelt';
import PinterestGrid from '@/components/PinterestGrid';
import IkeaBelt from '@/components/IkeaBelt';
import BrandsBelt from '@/components/BrandsBelt';
import PriceHitsBelt from '@/components/PriceHitsBelt';
import DiscountCode from '@/components/DiscountCode';
import ScrollDownIndicator from '@/components/ScrollDownIndicator';
import ShoppableImage from '@/components/ShoppableImage';
import { Haptics } from '@capacitor/haptics';
import { Toaster } from '@/components/ui/toaster';
import { useHapticFeedback } from '@/hooks/use-haptic';

const pillButtons = [
  { id: 'favorites', label: 'Favorites', color: 'bg-green-100 text-green-700' },
  { id: 'price-hits', label: 'Price Hits', color: 'bg-yellow-100 text-yellow-700' },
  { id: 'new-arrivals', label: 'New Arrivals', color: 'bg-purple-100 text-purple-700' },
  { id: 'rescue', label: 'Rescue and Save', color: 'bg-pink-100 text-red-600' },
];

const Index = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const scrollTimerRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const { triggerHaptic } = useHapticFeedback();

  useEffect(() => {
    const initCapacitorFeatures = async () => {
      try {
        await triggerHaptic();
      } catch (error) {
        console.error('Error initializing Capacitor features:', error);
      }
    };
    
    initCapacitorFeatures();
    
    return () => {
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
    };
  }, [triggerHaptic]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const position = container.scrollTop;
    setScrollPosition(position);
    
    const isBottom = 
      Math.abs(
        (container.scrollHeight - container.scrollTop) - 
        container.clientHeight
      ) < 5;
    
    setIsAtBottom(isBottom);
    
    if (position === 0) {
      setShowScrollIndicator(true);
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
        scrollTimerRef.current = null;
      }
    } 
    else if (position > 0 && showScrollIndicator) {
      setShowScrollIndicator(false);
      
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
      
      scrollTimerRef.current = window.setTimeout(() => {
        if (!isAtBottom) {
          setShowScrollIndicator(true);
        }
        scrollTimerRef.current = null;
      }, 30000);
    }
  };

  const handleIndicatorClick = () => {
    setShowScrollIndicator(false);
    
    if (scrollTimerRef.current) {
      clearTimeout(scrollTimerRef.current);
    }
    
    scrollTimerRef.current = window.setTimeout(() => {
      if (!isAtBottom) {
        setShowScrollIndicator(true);
      }
      scrollTimerRef.current = null;
    }, 60000);
  };

  return (
    <div 
      className="min-h-screen bg-gray-50 flex flex-col overflow-auto"
      onScroll={handleScroll}
      ref={containerRef}
    >
      <Header />
      
      <main className="flex-1 pb-20">
        <StoryScroller />
        
        <CategoryBelt />
        
        <div className="px-4 py-3 flex overflow-x-auto gap-2 md:gap-4 scrollbar-hide justify-center">
          {pillButtons.map((button) => (
            <button 
              key={button.id}
              className={cn(
                "flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium",
                button.color
              )}
            >
              {button.label}
            </button>
          ))}
        </div>
        
        <div className="py-2">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>
        
        <IkeaBelt />
        
        <div className="py-2">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>
        
        <BrandsBelt />
        
        <div className="py-2">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>
        
        <PinterestGrid />
        
        <div className="py-2">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>
        
        <PriceHitsBelt />
        
        <div className="py-2">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>
        
        <ShoppableImage />
        
        <div className="py-2">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>
        
        <DiscountCode 
          code="XHAU8254" 
          description="Your unique discount code for free delivery:" 
        />
      </main>
      
      {!isAtBottom && (
        <ScrollDownIndicator 
          show={showScrollIndicator} 
          onClick={handleIndicatorClick}
        />
      )}
      
      <Toaster />
    </div>
  );
};

export default Index;
