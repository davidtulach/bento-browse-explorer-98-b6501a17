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
  'Snacks': ['Chips', 'Protein Bars'],
  'Cosmetics': ['Organic Serums', 'Bio Products', 'Natural Oils']
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
      description: "10% off all Cosmetics items in your basket",
      duration: 3000
    });
  };

  const renderRegularCategory = () => <div className="flex flex-col md:flex-row gap-8">
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
          <AnimatedImage src={brandMessage.imageSrc} fallbackSrc={brandMessage.fallbackSrc} alt={brandMessage.title} aspectRatio="aspect-[16/10]" objectFit="cover" className="w-full" />
          <div className="mt-4">
            <h3 className="font-semibold text-lg mb-1">{brandMessage.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{brandMessage.description}</p>
            <button className="text-sm font-medium text-primary underline flex items-center group">
              <span>Read more</span>
              <ChevronRight className={cn("h-4 w-4 ml-1 transition-all", isMobile ? "opacity-70" : "opacity-70 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0")} />
            </button>
          </div>
        </div>
      </div>
    </div>;

  const renderCosmeticsCategory = () => <div className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-5">
          <div>
            <p className="text-lg text-gray-700 dark:text-gray-200 font-extrabold">Discover our new range of beauty products</p>
          </div>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg px-6 py-5">
            <div className="flex items-start mb-3">
              <BadgePercent className="h-5 w-5 text-yellow-600 dark:text-yellow-500 mt-1 mr-2 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold text-yellow-600 dark:text-yellow-500">10% off everything</h3>
                <p className="font-semibold text-gray-700 dark:text-gray-300">Use code SALE10</p>
              </div>
            </div>
            
            <div className="flex items-center mb-3">
              <Timer className="h-5 w-5 mr-2 text-gray-600 dark:text-gray-400" />
              <div className="flex space-x-2 items-center">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Ends in:</span>
                <div className="flex space-x-1">
                  <div className="bg-white dark:bg-gray-800 px-2 py-1 rounded text-sm font-bold dark:text-white">
                    {timeRemaining.days}d
                  </div>
                  <div className="bg-white dark:bg-gray-800 px-2 py-1 rounded text-sm font-bold dark:text-white">
                    {timeRemaining.hours}h
                  </div>
                  <div className="bg-white dark:bg-gray-800 px-2 py-1 rounded text-sm font-bold dark:text-white">
                    {timeRemaining.minutes}m
                  </div>
                </div>
              </div>
            </div>
            
            <button onClick={handleApplyDiscount} className={cn("flex items-center font-medium text-sm transition-all", codeApplied ? "text-green-600 dark:text-green-500" : "text-primary hover:text-primary/90")}>
              {codeApplied ? <>
                  <CheckCircle className="mr-1 h-4 w-4" />
                  Code applied to your basket
                </> : <>
                  Apply discount to basket <ArrowRight className="ml-1 h-4 w-4" />
                </>}
            </button>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg px-6 py-5">
            <h3 className="text-xl font-bold text-purple-800 dark:text-purple-300 mb-3">60+ new products just arrived!</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">We've partnered with dozens of amazing new suppliers bringing you the best in Bio products and natural skincare.</p>
            <div className="grid grid-cols-2 gap-4">
              {subcategories.map((subcat, index) => <a key={index} href="#" className="hover:underline py-1 flex items-center justify-between group">
                  <span className="text-gray-800 dark:text-gray-200 font-medium">{subcat}</span>
                  <ChevronRight className="h-4 w-4 text-primary transition-all opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0" />
                </a>)}
            </div>
          </div>
        </div>
        
        <div className="aspect-[4/5] rounded-lg overflow-hidden">
          <img src="/lovable-uploads/cff494d1-5fe6-4575-95a4-5240eaa31691.png" alt="Cosmetics collection" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>;

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
        
        {category === 'Cosmetics' ? renderCosmeticsCategory() : renderRegularCategory()}
      </div>
    </div>;
};

export default CategoryContent;
