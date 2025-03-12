
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedImage from './AnimatedImage';

const categories = [
  { id: 1, name: "Fruit & Veg", image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80" },
  { id: 2, name: "Bakery", image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80" },
  { id: 3, name: "Dairy", image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80" },
  { id: 4, name: "Meat", image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80" },
  { id: 5, name: "Drinks", image: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80" },
  { id: 6, name: "Frozen", image: "https://images.unsplash.com/photo-1570696590864-63772baf6617?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80" },
  { id: 7, name: "Snacks", image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80" },
  { id: 8, name: "Household", image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80" },
];

const CategoryBelt = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative px-4 py-3">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-medium">Categories</h2>
        <div className="flex space-x-1">
          <button 
            onClick={() => scroll('left')}
            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-100"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-2 pb-2 -mx-4 px-4 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category) => (
          <div 
            key={category.id}
            className="flex-shrink-0 w-[90px] snap-start rounded-xl overflow-hidden shadow-sm hover-scale"
          >
            <div className="relative aspect-[2/3]">
              <AnimatedImage
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
                aspectRatio="aspect-[2/3]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/60"></div>
              <div className="absolute bottom-0 left-0 right-0 p-2 text-white font-medium text-xs text-center">
                {category.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBelt;
