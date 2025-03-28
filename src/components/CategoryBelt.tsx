
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Apple, Wheat, Milk, Beef, GlassWater, Snowflake, 
  Candy, House, Package, Egg, Droplet, CookingPot, LeafyGreen, Globe, 
  IceCream, Dog, Baby, Scissors, Percent } from 'lucide-react';
import { cn } from '@/lib/utils';
import CategoryOverlay from './CategoryOverlay';
import { useIsMobile } from '@/hooks/use-mobile';
import { Badge } from './ui/badge';

const categories = [
  { id: 1, name: "Fruit & Veg", icon: Apple },
  { id: 2, name: "Bakery", icon: Wheat, hasNewItems: true },
  { id: 3, name: "Cosmetics", icon: Scissors, hasDiscount: true },
  { id: 4, name: "Dairy", icon: Milk },
  { id: 5, name: "Meat", icon: Beef },
  { id: 6, name: "Drinks", icon: GlassWater },
  { id: 7, name: "Frozen", icon: Snowflake, hasNewItems: true },
  { id: 8, name: "Snacks", icon: Candy, hasNewItems: true },
  { id: 9, name: "Household", icon: House },
  { id: 10, name: "Pasta & Rice", icon: Wheat },
  { id: 11, name: "Canned Goods", icon: Package },
  { id: 12, name: "Breakfast", icon: Egg },
  { id: 13, name: "Condiments", icon: Droplet },
  { id: 14, name: "Baking", icon: CookingPot },
  { id: 15, name: "Health Foods", icon: LeafyGreen },
  { id: 16, name: "International", icon: Globe },
  { id: 17, name: "Sweets", icon: IceCream },
  { id: 18, name: "Pet Supplies", icon: Dog },
  { id: 19, name: "Baby Products", icon: Baby },
];

const CategoryBelt = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const beltRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [overlayPosition, setOverlayPosition] = useState<{ top: number; left: number; width: number } | undefined>();
  const isMobile = useIsMobile();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (categoryName: string, event?: React.MouseEvent<HTMLDivElement>) => {
    setSelectedCategory(categoryName);
    
    if (!isMobile && beltRef.current) {
      const beltRect = beltRef.current.getBoundingClientRect();
      
      setOverlayPosition({
        top: beltRect.height,
        left: 0,
        width: window.innerWidth
      });
    }
    
    setIsOverlayOpen(true);
  };

  const handleCategoryHover = (categoryName: string) => {
    if (isOverlayOpen && !isMobile) {
      setSelectedCategory(categoryName);
    }
  };

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (isOverlayOpen && !isMobile && beltRef.current) {
        const beltRect = beltRef.current.getBoundingClientRect();
        
        setOverlayPosition({
          top: beltRect.height,
          left: 0,
          width: window.innerWidth
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOverlayOpen, isMobile]);

  return (
    <div className="relative" ref={beltRef}>
      <div className="px-4 py-6">
        <h2 className="text-xl font-medium mb-4">Categories</h2>
        
        <div className="relative">
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
                  onClick={(e) => handleCategoryClick(category.name, e)}
                  onMouseEnter={() => handleCategoryHover(category.name)}
                >
                  <div className="w-[90px] h-[90px] mb-1 mx-auto relative flex items-center justify-center transition-transform hover:scale-105 duration-200">
                    <IconComponent className="w-12 h-12 text-primary" strokeWidth={1.5} />
                    
                    {category.hasNewItems && (
                      <Badge 
                        className="absolute -top-1 -right-1 bg-purple-500 text-white border-2 border-white p-1 rounded-full w-6 h-6 flex items-center justify-center"
                        aria-label="New items available"
                      >
                        ★
                      </Badge>
                    )}
                    
                    {category.hasDiscount && (
                      <Badge 
                        className="absolute -top-1 -right-1 bg-[#fde7f4] text-[#de3031] border-2 border-[#de3031] p-1 rounded-full w-6 h-6 flex items-center justify-center"
                        aria-label="Discount available"
                      >
                        <Percent className="w-3 h-3" />
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm font-normal mt-0 text-center">{category.name}</p>
                </div>
              );
            })}
          </div>
          
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center bg-black text-white hover:bg-black/90 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <CategoryOverlay 
        isOpen={isOverlayOpen}
        onClose={handleCloseOverlay}
        category={selectedCategory}
        position={!isMobile ? overlayPosition : undefined}
      />
    </div>
  );
};

export default CategoryBelt;
