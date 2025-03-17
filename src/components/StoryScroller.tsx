
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedImage from './AnimatedImage';
import { useIsMobile } from '@/hooks/use-mobile';

const stories = [
  { id: 1, title: "Breakfast", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80" },
  { id: 2, title: "Quick Meals", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80" },
  { id: 3, title: "Organic", image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80" },
  { id: 4, title: "Baking", image: "https://images.unsplash.com/photo-1464195244916-405fa0a82545?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80" },
  { id: 5, title: "Snacks", image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80" },
  { id: 6, title: "Dinner", image: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80" },
  { id: 7, title: "Vegetarian", image: "https://images.unsplash.com/photo-1608032077018-c9aad9565d29?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80" },
  { id: 8, title: "Desserts", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80" },
];

const StoryScroller = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Only render on mobile devices
  if (!isMobile) {
    return null;
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -200 : 200;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative px-4 py-4">
      <h2 className="text-lg font-medium mb-3">Food Inspiration</h2>
      
      <div className="relative">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 pb-2 -mx-4 px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {stories.map((story) => (
            <div key={story.id} className="flex flex-col items-center flex-shrink-0 w-16 snap-start">
              <div className="story-circle mb-1.5">
                <div className="story-circle-inner">
                  <AnimatedImage
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <span className="text-xs text-center font-medium truncate w-16">{story.title}</span>
            </div>
          ))}
        </div>
        
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default StoryScroller;
