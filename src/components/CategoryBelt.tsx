
import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Apple, Bread, Milk, Beef, GlassWater, Snowflake, 
  Candy, House, Wheat, Package, Egg, Droplet, CookingPot, LeafyGreen, Globe, 
  IceCream, Dog, Baby } from 'lucide-react';
import { cn } from '@/lib/utils';

// Replace images with icons
const categories = [
  { id: 1, name: "Fruit & Veg", icon: Apple },
  { id: 2, name: "Bakery", icon: Bread },
  { id: 3, name: "Dairy", icon: Milk },
  { id: 4, name: "Meat", icon: Beef },
  { id: 5, name: "Drinks", icon: GlassWater },
  { id: 6, name: "Frozen", icon: Snowflake },
  { id: 7, name: "Snacks", icon: Candy },
  { id: 8, name: "Household", icon: House },
  { id: 9, name: "Pasta & Rice", icon: Wheat },
  { id: 10, name: "Canned Goods", icon: Package },
  { id: 11, name: "Breakfast", icon: Egg },
  { id: 12, name: "Condiments", icon: Droplet },
  { id: 13, name: "Baking", icon: CookingPot },
  { id: 14, name: "Health Foods", icon: LeafyGreen },
  { id: 15, name: "International", icon: Globe },
  { id: 16, name: "Sweets", icon: IceCream },
  { id: 17, name: "Pet Supplies", icon: Dog },
  { id: 18, name: "Baby Products", icon: Baby },
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
    <div className="relative px-4 py-6">
      <h2 className="text-xl font-medium mb-4">Categories</h2>
      
      <div className="relative">
        {/* Left arrow - positioned at left edge */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center bg-black text-white hover:bg-black/90 transition-colors"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-4 px-6 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div 
                key={category.id}
                className="flex-shrink-0 snap-start text-center cursor-pointer"
              >
                <div className="w-[90px] h-[90px] mb-1 mx-auto relative flex items-center justify-center transition-transform hover:scale-105 duration-200">
                  <IconComponent className="w-12 h-12 text-primary" strokeWidth={1.5} />
                </div>
                <p className="text-sm font-normal mt-0 text-center">{category.name}</p>
              </div>
            );
          })}
        </div>
        
        {/* Right arrow - positioned at right edge */}
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center bg-black text-white hover:bg-black/90 transition-colors"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CategoryBelt;
