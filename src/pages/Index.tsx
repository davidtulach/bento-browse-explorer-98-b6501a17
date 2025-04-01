import React, { useState, useEffect, useRef } from 'react';
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
import { useIsMobile } from '@/hooks/use-mobile';

const pillButtons = [
  { 
    id: 'favorites', 
    label: 'Favorites', 
    lightColor: 'bg-green-100 text-green-700', 
    darkColor: 'dark:bg-green-950 dark:text-green-200 dark:border dark:border-green-800' 
  },
  { 
    id: 'price-hits', 
    label: 'Price Hits', 
    lightColor: 'bg-yellow-100 text-yellow-700', 
    darkColor: 'dark:bg-amber-950 dark:text-amber-200 dark:border dark:border-amber-800' 
  },
  { 
    id: 'new-arrivals', 
    label: 'New Arrivals', 
    lightColor: 'bg-purple-100 text-purple-700', 
    darkColor: 'dark:bg-purple-950 dark:text-purple-200 dark:border dark:border-purple-800' 
  },
  { 
    id: 'rescue', 
    label: 'Rescue and Save', 
    lightColor: 'bg-pink-100 text-red-600', 
    darkColor: 'dark:bg-red-950 dark:text-red-200 dark:border dark:border-red-800' 
  },
];

const Index = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const scrollTimerRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const { triggerHaptic } = useHapticFeedback();
  const isMobile = useIsMobile();

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
      className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col overflow-auto"
      onScroll={handleScroll}
      ref={containerRef}
    >
      <Header />
      
      <main className={cn(
        "flex-1 pb-20",
        isMobile && "pt-0"
      )}>
        <StoryScroller />
        
        <CategoryBelt />
        
        <div className="px-4 py-3 flex overflow-x-auto gap-2 md:gap-4 scrollbar-hide justify-center">
          {pillButtons.map((button) => (
            <button 
              key={button.id}
              className={cn(
                "flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium",
                button.lightColor,
                button.darkColor,
                "transition-colors duration-200"
              )}
            >
              {button.label}
            </button>
          ))}
        </div>
        
        <div className="py-2">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
        </div>
        
        <IkeaBelt />
        
        <div className="py-2">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
        </div>
        
        <BrandsBelt />
        
        <div className="py-2">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
        </div>
        
        <PinterestGrid />
        
        <div className="py-2">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
        </div>
        
        <PriceHitsBelt />
        
        <div className="py-2">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
        </div>
        
        <ShoppableImage />
        
        <div className="py-2">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
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
