
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import StoryScroller from '@/components/StoryScroller';
import CategoryBelt from '@/components/CategoryBelt';
import PinterestGrid from '@/components/PinterestGrid';
import IkeaBelt from '@/components/IkeaBelt';

const pillButtons = [
  { id: 'favorites', label: 'Favorites', color: 'bg-purple-100 text-purple-700' },
  { id: 'price-hits', label: 'Price Hits', color: 'bg-orange-100 text-orange-700' },
  { id: 'new-arrivals', label: 'New Arrivals', color: 'bg-blue-100 text-blue-700' },
  { id: 'rescue', label: 'Rescue and Save', color: 'bg-green-100 text-green-700' },
];

const Index = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  // Handle scroll event
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const position = e.currentTarget.scrollTop;
    setScrollPosition(position);
  };

  return (
    <div 
      className="min-h-screen bg-gray-50 flex flex-col"
      onScroll={handleScroll}
    >
      <Header />
      
      <main className="flex-1 pb-20">
        <SearchBar />
        
        <div className={cn(
          "transition-opacity duration-500",
          scrollPosition > 200 ? "opacity-0 pointer-events-none h-0 overflow-hidden" : "opacity-100"
        )}>
          <StoryScroller />
        </div>
        
        <CategoryBelt />
        
        {/* Pill Buttons */}
        <div className="px-4 py-3 flex overflow-x-auto gap-2 scrollbar-hide">
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
        
        {/* Weekly offers and small tiles sections */}
        <IkeaBelt />
        
        <div className="py-2">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>
        
        {/* Pinterest grid */}
        <PinterestGrid />
      </main>
    </div>
  );
};

export default Index;
