import React, { useState, useEffect } from 'react';
import { X, ChevronRight, CheckCircle, BadgePercent, ArrowRight, Timer } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedImage from './AnimatedImage';
import { SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { categorySubcategories, categoryBrandMessages, BrandMessage } from '@/data/categoryData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
interface CategoryContentProps {
  category: string;
  onClose: () => void;
  isMobile: boolean;
}
const newArrivalSubcategories = {
  'Bakery': ['Bread', 'Pastries'],
  'Frozen': ['Frozen Fruits'],
  'Snacks': ['Chips', 'Protein Bars']
};
const discountedCategories = ['Cosmetics'];
const CategoryContent: React.FC<CategoryContentProps> = ({
  category,
  onClose,
  isMobile
}) => {
  const subcategories = categorySubcategories[category] || [];
  const brandMessage: BrandMessage = categoryBrandMessages[category] || categoryBrandMessages.default;
  const {
    toast
  } = useToast();
  const [timeRemaining, setTimeRemaining] = useState({
    days: 3,
    hours: 10,
    minutes: 23,
    seconds: 59
  });
  const [codeApplied, setCodeApplied] = useState(false);
  const hasNewArrival = (category: string, subcategory: string) => {
    return newArrivalSubcategories[category]?.includes(subcategory) || false;
  };
  const hasDiscount = (category: string) => {
    return discountedCategories.includes(category);
  };
  const isDiscountedSubcategory = (category: string, subcategory: string) => {
    return category === 'Cosmetics';
  };
  useEffect(() => {
    if (!hasDiscount(category)) return;
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        const newSeconds = prev.seconds - 1;
        if (newSeconds >= 0) {
          return {
            ...prev,
            seconds: newSeconds
          };
        }
        const newMinutes = prev.minutes - 1;
        if (newMinutes >= 0) {
          return {
            ...prev,
            minutes: newMinutes,
            seconds: 59
          };
        }
        const newHours = prev.hours - 1;
        if (newHours >= 0) {
          return {
            ...prev,
            hours: newHours,
            minutes: 59,
            seconds: 59
          };
        }
        const newDays = prev.days - 1;
        if (newDays >= 0) {
          return {
            ...prev,
            days: newDays,
            hours: 23,
            minutes: 59,
            seconds: 59
          };
        }
        clearInterval(timer);
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [category]);
  const handleApplyDiscount = () => {
    setCodeApplied(true);
    toast({
      title: "Discount Applied!",
      description: "15% off all Cosmetics items in your basket",
      duration: 3000
    });
  };
  const CosmeticsDiscountBanner = () => {
    return <div className="mb-6">
        <div className="flex flex-col">
          
          
          <div className="flex flex-col gap-3">
            <div className="inline-flex items-center px-4 py-3 bg-yellow-100 rounded-lg w-full">
              <span className="text-xl mr-2">🏷️</span>
              <span className="text-lg font-bold">15% off everything — use code BEAUTY15</span>
            </div>
            
            <div className="flex items-center mb-3">
              <Timer className="h-5 w-5 mr-2" />
              <span className="text-base font-medium mr-2">Ends in:</span>
              <div className="flex space-x-2">
                <div className="bg-gray-100 px-2 py-1 rounded-md">
                  <span className="font-bold">{timeRemaining.days}d</span>
                </div>
                <div className="bg-gray-100 px-2 py-1 rounded-md">
                  <span className="font-bold">{timeRemaining.hours}h</span>
                </div>
                <div className="bg-gray-100 px-2 py-1 rounded-md">
                  <span className="font-bold">{timeRemaining.minutes}m</span>
                </div>
                <div className="bg-gray-100 px-2 py-1 rounded-md">
                  <span className="font-bold">{timeRemaining.seconds}s</span>
                </div>
              </div>
            </div>
            
            <button onClick={handleApplyDiscount} className="text-lg font-medium flex items-center hover:underline text-primary mb-4">
              {codeApplied ? <>
                  <CheckCircle className="mr-1 h-5 w-5" />
                  Code applied
                </> : <>
                  Apply discount <ArrowRight className="ml-1 h-5 w-5" />
                </>}
            </button>
          </div>
        </div>
      </div>;
  };
  return <div className="relative">
      <div className={cn("py-6 px-6", isMobile && "relative")}>
        {isMobile ? <SheetHeader className="pb-2">
            <SheetTitle className="text-xl">{category}</SheetTitle>
          </SheetHeader> : <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium">All in {category}</h2>
            <button onClick={onClose} className="rounded-full bg-muted p-2 hover:bg-muted/80">
              <X className="h-5 w-5" />
            </button>
          </div>}
        
        {category === 'Cosmetics' && <CosmeticsDiscountBanner />}
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-3/5 grid grid-cols-2 gap-x-8 gap-y-2">
            <a href="#" className="text-sm font-bold hover:underline col-span-2 mb-2 flex items-center group">
              <span className="mr-1">Browse all from {category}</span>
              <ChevronRight className={cn("h-4 w-4 transition-all", isMobile ? "opacity-70" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0")} />
            </a>
            
            {subcategories.map((subcat, index) => <a key={index} href="#" className="text-sm hover:underline py-1 flex items-center justify-between group relative">
                <div className="flex items-center flex-wrap">
                  <span>{subcat}</span>
                  
                  {isDiscountedSubcategory(category, subcat) && <div className="ml-2">
                      <div className="px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-200 text-gray-700">
                        15% OFF
                      </div>
                    </div>}
                  
                  {hasNewArrival(category, subcat) && <div className="ml-2">
                      <div className={cn("px-2 py-0.5 text-xs font-medium rounded-full", "bg-purple-500 text-white")}>
                        NEW
                      </div>
                    </div>}
                </div>
                <ChevronRight className={cn("h-4 w-4 text-primary transition-all", isMobile ? "opacity-70" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0")} />
              </a>)}
          </div>
          
          <div className="md:w-2/5">
            <div className="relative overflow-hidden">
              {category === 'Cosmetics' ? <div className="flex flex-col">
                  <AnimatedImage src={brandMessage.imageSrc} fallbackSrc={brandMessage.fallbackSrc} alt="Cosmetics Sale" aspectRatio="aspect-[16/10]" objectFit="cover" className="w-full" />
                  <div className="mt-4 bg-white p-3 rounded-lg">
                    <p className="text-sm text-gray-700 mb-2">
                      <span className="font-medium">Special partner promotion!</span> Our luxury brand partners have enabled this exclusive offer for a limited time.
                    </p>
                    <a href="#" className="text-sm font-medium text-purple-600 hover:underline flex items-center">
                      See all partner offers <ChevronRight className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </div> : <>
                  <AnimatedImage src={brandMessage.imageSrc} fallbackSrc={brandMessage.fallbackSrc} alt={brandMessage.title} aspectRatio="aspect-[16/10]" objectFit="cover" className="w-full" />
                  <div className="mt-4">
                    <h3 className="font-semibold text-lg mb-1">{brandMessage.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{brandMessage.description}</p>
                    <button className="text-sm font-medium text-primary underline flex items-center group">
                      <span>Read more</span>
                      <ChevronRight className={cn("h-4 w-4 ml-1 transition-all", isMobile ? "opacity-70" : "opacity-70 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0")} />
                    </button>
                  </div>
                </>}
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default CategoryContent;