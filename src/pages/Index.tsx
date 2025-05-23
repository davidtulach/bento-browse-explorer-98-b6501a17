
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
import { Toaster } from '@/components/ui/toaster';
import { useHapticFeedback } from '@/hooks/use-haptic';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTheme } from '@/context/ThemeContext';
import PillButtonsRow from '@/components/PillButtonsRow';
import TopicsBelt from '@/components/TopicsBelt';

const pillButtons = [
  { 
    id: 'favorites', 
    label: 'Favorites', 
    lightColor: 'bg-[#D2E3A0] text-[#2A3518]', 
    darkColor: 'bg-[#D2E3A0] text-[#2A3518]' 
  },
  { 
    id: 'price-hits', 
    label: 'Price Hits', 
    lightColor: 'bg-[#F1D789] text-[#3B2E0A]', 
    darkColor: 'bg-[#F1D789] text-[#3B2E0A]' 
  },
  { 
    id: 'new-arrivals', 
    label: 'New Arrivals', 
    lightColor: 'bg-[#D0BCFF] text-[#381E72]', 
    darkColor: 'bg-[#D0BCFF] text-[#381E72]' 
  },
  { 
    id: 'rescue', 
    label: 'Rescue and Save', 
    lightColor: 'bg-[#FFB4AB] text-[#690005]', 
    darkColor: 'bg-[#FFB4AB] text-[#690005]' 
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
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

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
    // Wrap everything in a more semantic structure
    <div 
      className="min-h-screen w-full bg-gray-50 dark:bg-background flex flex-col overflow-hidden"
      onScroll={handleScroll}
      ref={containerRef}
    >
      <Header />
      
      <main 
        className={cn(
          "flex-1 pb-20 w-full",
          isMobile && "pt-0"
        )}
        id="main-content"
      >
        <section aria-label="Featured stories" className="mb-4">
          <StoryScroller />
        </section>
        
        <section aria-label="Categories" className="mb-4">
          <CategoryBelt />
        </section>
        
        <section aria-label="Quick filters" className="mb-4">
          <PillButtonsRow buttons={pillButtons} />
        </section>
        
        <div className="py-2" role="separator">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
        </div>
        
        <section aria-label="Weekly topics" className="mb-4">
          <IkeaBelt />
        </section>
        
        <div className="py-2" role="separator">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
        </div>
        
        <section aria-label="Brand spotlight" className="mb-4">
          <BrandsBelt />
        </section>
        
        <div className="py-2" role="separator">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
        </div>
        
        <section aria-label="Inspiration gallery" className="mb-4">
          <PinterestGrid />
        </section>
        
        <div className="py-2" role="separator">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
        </div>
        
        <section aria-label="Featured topics" className="mb-4">
          <TopicsBelt />
        </section>
        
        <div className="py-2" role="separator">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
        </div>
        
        <section aria-label="Price hits" className="mb-4">
          <PriceHitsBelt />
        </section>
        
        <div className="py-2" role="separator">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
        </div>
        
        <section aria-label="Shoppable content" className="mb-4">
          <ShoppableImage />
        </section>
        
        <div className="py-2" role="separator">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
        </div>
        
        <section aria-label="Discount code" className="mb-4">
          <DiscountCode 
            code="XHAU8254" 
            description="Your unique discount code for free delivery:" 
          />
        </section>
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
