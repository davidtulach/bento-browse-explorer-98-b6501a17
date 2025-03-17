
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedImage from './AnimatedImage';

const categories = [
  { id: 1, name: "Fruit & Veg", image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
  { id: 2, name: "Bakery", image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
  { id: 3, name: "Dairy", image: "https://images.unsplash.com/photo-1559598467-f8b76c8155d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
  { id: 4, name: "Meat", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
  { id: 5, name: "Drinks", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
  { id: 6, name: "Frozen", image: "https://images.unsplash.com/photo-1516876437184-593fda40c7ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
  { id: 7, name: "Snacks", image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
  { id: 8, name: "Household", image: "https://images.unsplash.com/photo-1583947581924-a017c42d5f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
  { id: 9, name: "Pasta & Rice", image: "https://images.unsplash.com/photo-1627824437809-ae5a5a1a835f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
  { id: 10, name: "Canned Goods", image: "https://images.unsplash.com/photo-1576791191946-e2fccd824d44?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
  { id: 11, name: "Breakfast", image: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
  { id: 12, name: "Condiments", image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
  { id: 13, name: "Baking", image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
  { id: 14, name: "Health Foods", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
  { id: 15, name: "International", image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
  { id: 16, name: "Sweets", image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
  { id: 17, name: "Pet Supplies", image: "https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
  { id: 18, name: "Baby Products", image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
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
    <div className="relative px-4 py-8">
      <h2 className="text-xl font-medium mb-6">Categories</h2>
      
      <div className="relative">
        {/* Left arrow */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 w-10 h-10 rounded-full flex items-center justify-center bg-black text-white hover:bg-black/90 transition-colors"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 px-6 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((category) => (
            <div 
              key={category.id}
              className="flex-shrink-0 snap-start text-center cursor-pointer"
            >
              <div className="w-[110px] h-[110px] mb-2 mx-auto relative flex items-center justify-center transition-transform hover:scale-105 duration-200">
                <AnimatedImage
                  src={category.image}
                  alt={category.name}
                  className="max-w-full max-h-full object-contain"
                  aspectRatio="aspect-square"
                />
              </div>
              <p className="text-sm font-normal mt-1 text-center">{category.name}</p>
            </div>
          ))}
        </div>
        
        {/* Right arrow */}
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 w-10 h-10 rounded-full flex items-center justify-center bg-black text-white hover:bg-black/90 transition-colors"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default CategoryBelt;
