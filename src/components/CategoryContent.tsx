
import React from 'react';
import { X, ChevronRight, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedImage from './AnimatedImage';
import { SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { categorySubcategories, categoryBrandMessages, BrandMessage } from '@/data/categoryData';
import { Badge } from '@/components/ui/badge';

interface CategoryContentProps {
  category: string;
  onClose: () => void;
  isMobile: boolean;
}

// New subcategory data with new arrivals flag
const newArrivalSubcategories = {
  'Bakery': ['Bread', 'Pastries'],
  'Cosmetics': ['Skincare', 'Makeup', 'Natural & Organic'],
  'Frozen': ['Frozen Fruits'],
  'Snacks': ['Chips', 'Protein Bars']
};

const CategoryContent: React.FC<CategoryContentProps> = ({ category, onClose, isMobile }) => {
  const subcategories = categorySubcategories[category] || [];
  const brandMessage: BrandMessage = categoryBrandMessages[category] || categoryBrandMessages.default;

  // Check if a subcategory has new arrivals
  const hasNewArrival = (category: string, subcategory: string) => {
    return newArrivalSubcategories[category]?.includes(subcategory) || false;
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
          {/* Left side - Categories in two columns */}
          <div className="md:w-3/5 grid grid-cols-2 gap-x-8 gap-y-2">
            {/* "Browse all" option */}
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
                  
                  {/* New arrival badge for specific subcategories */}
                  {hasNewArrival(category, subcat) && (
                    <div className="ml-2">
                      {isMobile ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded-full bg-purple-500 flex items-center justify-center">
                            <Star 
                              className="text-white fill-current" 
                              size={10} 
                              strokeWidth={0}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="px-2 py-0.5 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                          New Arrivals
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
          
          {/* Right side - Image and promotion */}
          <div className="md:w-2/5">
            <div className="relative overflow-hidden bg-white">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryContent;
