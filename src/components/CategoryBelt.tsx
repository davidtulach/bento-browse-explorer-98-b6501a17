
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedImage from './AnimatedImage';

const categories = [
  { id: 1, name: "Fruit & Veg", image: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c116.png" }, // Apple
  { id: 2, name: "Bakery", image: "https://assets.stickpng.com/images/5bbc96d80bc67a02c98d958e.png" }, // Bread loaf
  { id: 3, name: "Dairy", image: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c13c.png" }, // Milk carton
  { id: 4, name: "Meat", image: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c128.png" }, // Steak
  { id: 5, name: "Drinks", image: "https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c239.png" }, // Water bottle
  { id: 6, name: "Frozen", image: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c1d1.png" }, // Ice cream
  { id: 7, name: "Snacks", image: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c1c4.png" }, // Chips/crisps
  { id: 8, name: "Household", image: "https://assets.stickpng.com/images/5a5a5ca39d5d1a02041aa82b.png" }, // Detergent
  { id: 9, name: "Pasta & Rice", image: "https://assets.stickpng.com/images/5e96c088c051e656bbd5be2d.png" }, // Pasta
  { id: 10, name: "Canned Goods", image: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c0ff.png" }, // Can
  { id: 11, name: "Breakfast", image: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c0e1.png" }, // Cereal box
  { id: 12, name: "Condiments", image: "https://assets.stickpng.com/images/5a1d2c151a6881f458a5b8e1.png" }, // Ketchup
  { id: 13, name: "Baking", image: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c0ec.png" }, // Flour
  { id: 14, name: "Health Foods", image: "https://assets.stickpng.com/images/5b5a1df4ee59da7dfd6f00c6.png" }, // Broccoli
  { id: 15, name: "International", image: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c153.png" }, // Ramen/noodles
  { id: 16, name: "Sweets", image: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c0fa.png" }, // Candies
  { id: 17, name: "Pet Supplies", image: "https://assets.stickpng.com/images/58afdad6829958a978a4a692.png" }, // Pet food
  { id: 18, name: "Baby Products", image: "https://assets.stickpng.com/images/5a5a3df114d8c4188e0b088e.png" }, // Baby bottle
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
