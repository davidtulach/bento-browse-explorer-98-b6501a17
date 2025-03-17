
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
  { id: 9, name: "Pasta & Rice", image: "https://images.unsplash.com/photo-1556761223-4c4282c73f77?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80" },
  { id: 10, name: "Canned Goods", image: "https://images.unsplash.com/photo-1534483509719-3feaee7c30da?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80" },
  { id: 11, name: "Breakfast", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80" },
  { id: 12, name: "Condiments", image: "https://images.unsplash.com/photo-1583941339800-a7a00b36bd83?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80" },
  { id: 13, name: "Baking", image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80" },
  { id: 14, name: "Health Foods", image: "https://images.unsplash.com/photo-1490885578174-acda8905c2c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80" },
  { id: 15, name: "International", image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80" },
  { id: 16, name: "Sweets", image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80" },
  { id: 17, name: "Pet Supplies", image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80" },
  { id: 18, name: "Baby Products", image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80" },
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Categories</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => scroll('left')}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-black text-white hover:bg-black/90 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-black text-white hover:bg-black/90 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 -mx-4 px-4 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category) => (
          <div 
            key={category.id}
            className="flex-shrink-0 snap-start text-center cursor-pointer"
          >
            <div className="w-[110px] h-[110px] mb-2 mx-auto relative flex items-center justify-center bg-gray-50 transition-transform hover:scale-105 duration-200">
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
    </div>
  );
};

export default CategoryBelt;
