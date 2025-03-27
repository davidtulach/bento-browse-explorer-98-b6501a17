import React, { useState, useEffect } from 'react';
import { X, ChevronRight, PercentIcon } from 'lucide-react';
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
  'Cosmetics': ['Skincare', 'Makeup', 'Natural & Organic'],
  'Frozen': ['Frozen Fruits'],
  'Snacks': ['Chips', 'Protein Bars']
};

const discountedCategories = ['Cosmetics'];

const CategoryContent: React.FC<CategoryContentProps> = ({ category, onClose, isMobile }) => {
  const subcategories = categorySubcategories[category] || [];
  const brandMessage: BrandMessage = categoryBrandMessages[category] || categoryBrandMessages.default;
  const { toast } = useToast();
  const [timeRemaining, setTimeRemaining] = useState({
    days: 3,
    hours: 4,
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

  useEffect(() => {
    if (!hasDiscount(category)) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        const newSeconds = prev.seconds - 1;
        
        if (newSeconds >= 0) {
          return { ...prev, seconds: newSeconds };
        }
        
        const newMinutes = prev.minutes - 1;
        if (newMinutes >= 0) {
          return { ...prev, minutes: newMinutes, seconds: 59 };
        }
        
        const newHours = prev.hours - 1;
        if (newHours >= 0) {
          return { ...prev, hours: newHours, minutes: 59, seconds: 59 };
        }
        
        const newDays = prev.days - 1;
        if (newDays >= 0) {
          return { ...prev, days: newDays, hours: 23, minutes: 59, seconds: 59 };
        }
        
        clearInterval(timer);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [category]);

  const handleApplyDiscount = () => {
    setCodeApplied(true);
    toast({
      title: "Discount Applied!",
      description: "15% off all Cosmetics items in your basket",
      duration: 3000,
    });
  };

  const CosmeticsDiscountCard = () => {
    return (
      <div className="bg-orange-50 rounded-lg p-4 mb-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="default" className="bg-orange-500">SALE</Badge>
            <span className="font-semibold text-orange-800">15% OFF ALL COSMETICS</span>
          </div>
          
          <div className="grid grid-cols-4 gap-2 mb-3 text-center">
            <div className="bg-white p-2 rounded shadow-sm">
              <div className="text-lg font-bold text-orange-800">{timeRemaining.days}</div>
              <div className="text-xs text-gray-600">days</div>
            </div>
            <div className="bg-white p-2 rounded shadow-sm">
              <div className="text-lg font-bold text-orange-800">{timeRemaining.hours}</div>
              <div className="text-xs text-gray-600">hours</div>
            </div>
            <div className="bg-white p-2 rounded shadow-sm">
              <div className="text-lg font-bold text-orange-800">{timeRemaining.minutes}</div>
              <div className="text-xs text-gray-600">mins</div>
            </div>
            <div className="bg-white p-2 rounded shadow-sm">
              <div className="text-lg font-bold text-orange-800">{timeRemaining.seconds}</div>
              <div className="text-xs text-gray-600">secs</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 bg-gray-100 py-2 px-3 rounded font-mono text-sm">BEAUTY15</div>
            <Button 
              onClick={handleApplyDiscount}
              disabled={codeApplied}
              className="whitespace-nowrap"
              variant={codeApplied ? "outline" : "default"}
            >
              {codeApplied ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Applied
                </>
              ) : (
                "Apply"
              )}
            </Button>
          </div>
          
          <p className="text-xs text-gray-600">
            Apply this code to get 15% off on all Cosmetics products in your basket.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
      <div className={cn("py-6 px-6", isMobile && "relative")}>
        {isMobile ? (
          <SheetHeader className="pb-2">
            <SheetTitle className="text-xl">{category}</SheetTitle>
          </SheetHeader>
        ) : (
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium">All in {category}</h2>
            <button 
              onClick={onClose}
              className="rounded-full bg-muted p-2 hover:bg-muted/80"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-3/5 grid grid-cols-2 gap-x-8 gap-y-2">
            <a 
              href="#"
              className="text-sm font-bold hover:underline col-span-2 mb-2 flex items-center group"
            >
              <span className="mr-1">Browse all from {category}</span>
              <ChevronRight className={cn(
                "h-4 w-4 transition-all",
                isMobile ? "opacity-70" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
              )} />
            </a>
            
            {subcategories.map((subcat, index) => (
              <a 
                key={index}
                href="#"
                className="text-sm hover:underline py-1 flex items-center justify-between group relative"
              >
                <div className="flex items-center flex-wrap">
                  <span>{subcat}</span>
                  
                  {hasNewArrival(category, subcat) && (
                    <div className="ml-2">
                      {isMobile ? (
                        <div className="flex items-center">
                          <div className={cn(
                            "w-4 h-4 rounded-full flex items-center justify-center",
                            "bg-orange-500"
                          )}>
                            <PercentIcon 
                              className="text-white" 
                              size={10}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className={cn(
                          "px-2 py-0.5 text-xs font-medium rounded-full",
                          "bg-orange-500 text-white"
                        )}>
                          15% OFF
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <ChevronRight className={cn(
                  "h-4 w-4 text-primary transition-all",
                  isMobile ? "opacity-70" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                )} />
              </a>
            ))}
          </div>
          
          <div className="md:w-2/5">
            <div className="relative overflow-hidden bg-white">
              {category === 'Cosmetics' ? (
                <>
                  <div className="absolute top-2 right-2 z-10">
                    <Badge variant="default" className="bg-orange-500">15% OFF</Badge>
                  </div>
                  <AnimatedImage 
                    src={brandMessage.imageSrc}
                    fallbackSrc={brandMessage.fallbackSrc}
                    alt="Cosmetics Sale"
                    aspectRatio="aspect-[16/10]"
                    objectFit="cover"
                    className="w-full"
                  />
                  <div className="mt-4">
                    <h3 className="font-semibold text-lg mb-1">Limited Time Beauty Sale!</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      For a limited time only, enjoy 15% off on all Cosmetics products. 
                      Treat yourself to premium skincare, makeup, and more at special prices.
                    </p>
                    
                    <CosmeticsDiscountCard />
                    
                    <button className="text-sm font-medium text-primary underline flex items-center group">
                      <span>Explore the sale</span>
                      <ChevronRight className={cn(
                        "h-4 w-4 ml-1 transition-all",
                        isMobile ? "opacity-70" : "opacity-70 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
                      )} />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <AnimatedImage 
                    src={brandMessage.imageSrc}
                    fallbackSrc={brandMessage.fallbackSrc}
                    alt={brandMessage.title}
                    aspectRatio="aspect-[16/10]"
                    objectFit="cover"
                    className="w-full"
                  />
                  <div className="mt-4">
                    <h3 className="font-semibold text-lg mb-1">{brandMessage.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{brandMessage.description}</p>
                    <button className="text-sm font-medium text-primary underline flex items-center group">
                      <span>Read more</span>
                      <ChevronRight className={cn(
                        "h-4 w-4 ml-1 transition-all",
                        isMobile ? "opacity-70" : "opacity-70 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
                      )} />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryContent;
