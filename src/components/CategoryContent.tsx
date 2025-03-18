
import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedImage from './AnimatedImage';
import { SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { categorySubcategories, categoryBrandMessages, BrandMessage } from '@/data/categoryData';

interface CategoryContentProps {
  category: string;
  onClose: () => void;
  isMobile: boolean;
}

const CategoryContent: React.FC<CategoryContentProps> = ({ category, onClose, isMobile }) => {
  const subcategories = categorySubcategories[category] || [];
  const brandMessage: BrandMessage = categoryBrandMessages[category] || categoryBrandMessages.default;

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
              className="text-sm font-bold hover:underline col-span-2 mb-2"
            >
              Browse all from {category}
            </a>
            
            {subcategories.map((subcat, index) => (
              <a 
                key={index}
                href="#"
                className="text-sm hover:underline py-1"
              >
                {subcat}
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
                <button className="text-sm font-medium text-primary underline">Read more</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryContent;
