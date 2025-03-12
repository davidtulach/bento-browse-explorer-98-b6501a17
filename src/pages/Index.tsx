
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import StoryScroller from '@/components/StoryScroller';
import CategoryBelt from '@/components/CategoryBelt';
import PinterestGrid from '@/components/PinterestGrid';
import IkeaBelt from '@/components/IkeaBelt';

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
        
        <div className="py-2">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>
        
        <PinterestGrid />
        
        <div className="py-2">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>
        
        <IkeaBelt />
      </main>
    </div>
  );
};

export default Index;
