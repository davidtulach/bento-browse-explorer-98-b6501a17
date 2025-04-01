
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Apple, Wheat, Milk, Beef, GlassWater, Snowflake, 
  Candy, House, Package, Egg, Droplet, CookingPot, LeafyGreen, Globe, 
  IceCream, Dog, Baby, Scissors, Percent } from 'lucide-react';
import { cn } from '@/lib/utils';
import CategoryOverlay from './CategoryOverlay';
import { useIsMobile } from '@/hooks/use-mobile';
import { Badge } from './ui/badge';
import DotLottiePlayer from './DotLottiePlayer';
import { useTheme } from '@/context/ThemeContext';

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

// Map of category colors for dark mode
const categoryPastelColors: Record<string, string> = {
  "Fruit & Veg": "text-[#F2FCE2]",
  "Bakery": "text-[#FEF7CD]",
  "Cosmetics": "text-[#FFDEE2]",
  "Dairy": "text-[#D3E4FD]",
  "Meat": "text-[#FEC6A1]",
  "Drinks": "text-[#D3E4FD]",
  "Frozen": "text-[#E5DEFF]",
  "Snacks": "text-[#FDE1D3]",
  "Household": "text-[#F1F0FB]",
  "Pasta & Rice": "text-[#FEF7CD]",
  "Canned Goods": "text-[#FDE1D3]",
  "Breakfast": "text-[#FEF7CD]",
  "Condiments": "text-[#D3E4FD]",
  "Baking": "text-[#FEF7CD]",
  "Health Foods": "text-[#F2FCE2]",
  "International": "text-[#E5DEFF]",
  "Sweets": "text-[#FFDEE2]",
  "Pet Supplies": "text-[#F1F0FB]",
  "Baby Products": "text-[#FFDEE2]",
};

const CategoryBelt = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const beltRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [overlayPosition, setOverlayPosition] = useState<{ top: number; left: number; width: number } | undefined>();
  const isMobile = useIsMobile();
  const [showAnimation, setShowAnimation] = useState(false);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

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
  
  useEffect(() => {
    setShowAnimation(true);
    
    const hideTimeout = setTimeout(() => {
      setShowAnimation(false);
    }, 5000);
    
    const intervalId = setInterval(() => {
      setShowAnimation(true);
      
      setTimeout(() => {
        setShowAnimation(false);
      }, 5000);
    }, 15000);
    
    return () => {
      clearInterval(intervalId);
      clearTimeout(hideTimeout);
    };
  }, []);

  return (
    <div className="relative" ref={beltRef}>
      <div className="px-4 py-6">
        <h2 className="text-xl font-medium mb-4">Categories</h2>
        
        <div className="relative">
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center bg-black text-white dark:bg-gray-800 hover:bg-black/90 dark:hover:bg-gray-700 transition-colors"
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
              const isCosmeticsCategory = category.name === "Cosmetics";
              const iconColorClass = isDarkMode ? categoryPastelColors[category.name] || "text-primary" : "text-primary";
              
              return (
                <div 
                  key={category.id}
                  className="flex-shrink-0 snap-start text-center cursor-pointer relative"
                  onClick={(e) => handleCategoryClick(category.name, e)}
                  onMouseEnter={() => handleCategoryHover(category.name)}
                >
                  <div className="w-[90px] h-[90px] mb-1 mx-auto relative flex items-center justify-center transition-transform hover:scale-105 duration-200">
                    {isCosmeticsCategory && showAnimation && (
                      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                        <DotLottiePlayer
                          src="https://lottie.host/dc804401-5c3c-4d6c-98d6-674f041ae826/j1ft0Kz2V9.lottie"
                          background="transparent"
                          speed={1}
                          loop={true}
                          autoplay={true}
                          className="w-[120px] h-[120px]"
                        />
                      </div>
                    )}
                    
                    <IconComponent className={cn("w-12 h-12 z-20 relative", iconColorClass)} strokeWidth={1.5} />
                    
                    {category.hasNewItems && (
                      <Badge 
                        className="absolute -top-1 -right-1 bg-purple-500 text-white border-2 border-white dark:border-gray-800 p-1 rounded-full w-6 h-6 flex items-center justify-center"
                        aria-label="New items available"
                      >
                        ★
                      </Badge>
                    )}
                    
                    {category.hasDiscount && (
                      <Badge 
                        className="absolute -top-1 -right-1 bg-[#fde7f4] text-[#de3031] border-2 border-[#de3031] dark:border-gray-800 p-1 rounded-full w-6 h-6 flex items-center justify-center"
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
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center bg-black text-white dark:bg-gray-800 hover:bg-black/90 dark:hover:bg-gray-700 transition-colors"
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
