
import React, { useState, useEffect } from 'react';
import { X, ChevronRight, CheckCircle, BadgePercent, ArrowRight, Timer, Star, Gift, Image } from 'lucide-react';
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

const CategoryContent: React.FC<CategoryContentProps> = ({ category, onClose, isMobile }) => {
  const subcategories = categorySubcategories[category] || [];
  const brandMessage: BrandMessage = categoryBrandMessages[category] || categoryBrandMessages.default;
  const { toast } = useToast();
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

  const CosmeticsDiscountBanner = () => {
    return (
      <div className="mb-6">
        <div className="flex flex-col">
          <div className="text-3xl font-bold mb-2 text-purple-800">Cosmetics</div>
          
          <div className="flex flex-col gap-3">
            <div className="inline-flex items-center px-4 py-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg w-full border border-purple-200">
              <BadgePercent className="h-6 w-6 text-purple-600 mr-2" />
              <span className="text-lg font-bold text-purple-800">15% off everything — use code BEAUTY15</span>
            </div>
            
            <div className="flex items-center mb-3">
              <Timer className="h-5 w-5 mr-2 text-purple-600" />
              <span className="text-base font-medium mr-2">Ends in:</span>
              <div className="flex space-x-2">
                {[
                  { value: timeRemaining.days, label: 'd' },
                  { value: timeRemaining.hours, label: 'h' },
                  { value: timeRemaining.minutes, label: 'm' },
                  { value: timeRemaining.seconds, label: 's' }
                ].map((time, index) => (
                  <div key={index} className="bg-purple-100 px-2 py-1 rounded-md">
                    <span className="font-bold text-purple-800">{time.value}{time.label}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              onClick={handleApplyDiscount} 
              className={cn(
                "text-lg font-medium flex items-center transition-colors",
                codeApplied 
                  ? "text-green-600 hover:text-green-700" 
                  : "text-purple-600 hover:text-purple-700 hover:underline"
              )}
            >
              {codeApplied ? (
                <>
                  <CheckCircle className="mr-1 h-5 w-5" />
                  Code applied
                </>
              ) : (
                <>
                  Apply discount <ArrowRight className="ml-1 h-5 w-5" />
                </>
              )}
            </button>
          </div>
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
            <h2 className="text-xl font-medium">{category === 'Cosmetics' ? '' : `All in ${category}`}</h2>
            <button 
              onClick={onClose}
              className="rounded-full bg-muted p-2 hover:bg-muted/80"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
        
        {category === 'Cosmetics' && <CosmeticsDiscountBanner />}
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-3/5 grid grid-cols-2 gap-x-8 gap-y-2">
            {category === 'Cosmetics' && (
              <div className="col-span-2 mb-4 bg-gradient-to-r from-fuchsia-50 to-purple-50 p-3 rounded-lg border border-purple-100">
                <span className="font-medium text-purple-800 flex items-center">
                  <Star className="h-4 w-4 text-purple-500 mr-1" /> 
                  Over 20 new premium suppliers added this month!
                </span>
              </div>
            )}
            
            <a 
              href="#"
              className="text-sm font-bold hover:underline col-span-2 mb-2 flex items-center group"
            >
              <span className={cn(
                "mr-1",
                category === 'Cosmetics' ? "text-purple-700" : ""
              )}>Browse all from {category}</span>
              <ChevronRight className={cn(
                "h-4 w-4 transition-all",
                category === 'Cosmetics' ? "text-purple-500" : "",
                isMobile ? "opacity-70" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
              )} />
            </a>
            
            {subcategories.map((subcat, index) => (
              <a 
                key={index}
                href="#"
                className={cn(
                  "text-sm hover:underline py-1 flex items-center justify-between group relative",
                  category === 'Cosmetics' ? "text-gray-700" : ""
                )}
              >
                <div className="flex items-center flex-wrap">
                  <span>{subcat}</span>
                  
                  {isDiscountedSubcategory(category, subcat) && (
                    <div className="ml-2">
                      <div className="px-2 py-0.5 text-xs font-medium rounded-full bg-gradient-to-r from-pink-200 to-purple-200 text-purple-800">
                        15% OFF
                      </div>
                    </div>
                  )}
                  
                  {hasNewArrival(category, subcat) && (
                    <div className="ml-2">
                      <div className={cn(
                        "px-2 py-0.5 text-xs font-medium rounded-full",
                        "bg-purple-500 text-white"
                      )}>
                        NEW
                      </div>
                    </div>
                  )}
                </div>
                <ChevronRight className={cn(
                  "h-4 w-4 transition-all",
                  category === 'Cosmetics' ? "text-purple-500" : "text-primary",
                  isMobile ? "opacity-70" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                )} />
              </a>
            ))}
          </div>
          
          <div className="md:w-2/5">
            {category === 'Cosmetics' ? (
              <div className="flex flex-col">
                <div className="relative">
                  <div className="absolute -top-2 -right-2 z-10">
                    <Badge className="bg-purple-600 text-white font-bold">
                      <Gift className="h-3 w-3 mr-1" /> NEW
                    </Badge>
                  </div>
                  <AnimatedImage 
                    src={brandMessage.imageSrc}
                    fallbackSrc={brandMessage.fallbackSrc}
                    alt="Cosmetics Sale"
                    aspectRatio="aspect-[16/10]"
                    objectFit="cover"
                    className="w-full rounded-lg shadow-md"
                  />
                </div>
                <div className="mt-4 bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
                  <h3 className="font-semibold text-lg mb-2 text-purple-800">Beauty Collection Expanded!</h3>
                  <p className="text-sm text-gray-700 mb-3">
                    We've partnered with over 20 new premium suppliers to bring you an expanded range of luxury and organic cosmetics. Discover exclusive brands and formulations now available in our stores!
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">Premium Brands</Badge>
                    <a href="#" className="text-sm font-medium text-purple-600 hover:underline flex items-center group">
                      Explore new arrivals <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative overflow-hidden">
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryContent;
