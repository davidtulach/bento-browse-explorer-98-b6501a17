
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import StoryScroller from '@/components/StoryScroller';
import CategoryBelt from '@/components/CategoryBelt';
import PinterestGrid from '@/components/PinterestGrid';
import IkeaBelt from '@/components/IkeaBelt';
import BrandsBelt from '@/components/BrandsBelt';
import LottieAnimation from '@/components/LottieAnimation';
import shoppingAnimation from '@/lottie/shopping.json';
import ScrollDownIndicator from '@/components/ScrollDownIndicator';

const pillButtons = [
  { id: 'favorites', label: 'Favorites', color: 'bg-purple-100 text-purple-700' },
  { id: 'price-hits', label: 'Price Hits', color: 'bg-orange-100 text-orange-700' },
  { id: 'new-arrivals', label: 'New Arrivals', color: 'bg-blue-100 text-blue-700' },
  { id: 'rescue', label: 'Rescue and Save', color: 'bg-green-100 text-green-700' },
];

const Index = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const scrollTimerRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    // Clear timer on component unmount
    return () => {
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
    };
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const position = container.scrollTop;
    setScrollPosition(position);
    
    // Check if we're at the bottom of the page
    const isBottom = 
      Math.abs(
        (container.scrollHeight - container.scrollTop) - 
        container.clientHeight
      ) < 5; // Small threshold for rounding errors
    
    setIsAtBottom(isBottom);
    
    // If at the top of the page, show the indicator
    if (position === 0) {
      setShowScrollIndicator(true);
      // Clear any existing timers
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
        scrollTimerRef.current = null;
      }
    } 
    // If we start scrolling, hide the indicator and set a timer to show it again after 30 seconds
    else if (position > 0 && showScrollIndicator) {
      setShowScrollIndicator(false);
      
      // Clear any existing timers before setting a new one
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
      
      // Set timer to show indicator again after 30 seconds (30000ms)
      scrollTimerRef.current = window.setTimeout(() => {
        // Only show if we're not at the bottom
        if (!isAtBottom) {
          setShowScrollIndicator(true);
        }
        scrollTimerRef.current = null;
      }, 30000);
    }
  };

  const handleIndicatorClick = () => {
    // Hide the indicator when clicked
    setShowScrollIndicator(false);
    
    // Clear any existing timers
    if (scrollTimerRef.current) {
      clearTimeout(scrollTimerRef.current);
    }
    
    // Set a new timer to show the indicator again after 60 seconds
    scrollTimerRef.current = window.setTimeout(() => {
      // Only show if we're not at the bottom
      if (!isAtBottom) {
        setShowScrollIndicator(true);
      }
      scrollTimerRef.current = null;
    }, 60000); // 60 seconds
  };

  return (
    <div 
      className="min-h-screen bg-gray-50 flex flex-col overflow-auto"
      onScroll={handleScroll}
      ref={containerRef}
    >
      <Header />
      
      <main className="flex-1 pb-20">
        <SearchBar />
        
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
        
        {/* Lottie Animation */}
        <div className="flex justify-center items-center py-4 mb-2">
          <div className="w-20 h-20 md:w-24 md:h-24">
            <LottieAnimation 
              animationData={shoppingAnimation} 
              loop={true}
              autoplay={true}
            />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-800">Shopping Made Fun</h3>
            <p className="text-sm text-gray-500">Discover amazing deals today!</p>
          </div>
        </div>
        
        <PinterestGrid />
        
        <div className="py-2">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>
        
        <IkeaBelt />
        
        <div className="py-2">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>
        
        <BrandsBelt />
      </main>
      
      {/* Scroll Down Indicator - hide if at bottom */}
      {!isAtBottom && (
        <ScrollDownIndicator 
          show={showScrollIndicator} 
          onClick={handleIndicatorClick}
        />
      )}
    </div>
  );
};

export default Index;
