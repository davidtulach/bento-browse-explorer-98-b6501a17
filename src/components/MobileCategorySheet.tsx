
import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { Sheet, SheetContent, SheetClose } from '@/components/ui/sheet';
import CategoryContent from './CategoryContent';
import { ScrollArea } from '@/components/ui/scroll-area';
import { categorySubcategories } from '@/data/categoryData';
import { cn } from '@/lib/utils';

interface MobileCategorySheetProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  slideDirection?: 'left' | 'right' | null;
}

const MobileCategorySheet: React.FC<MobileCategorySheetProps> = ({ 
  isOpen, 
  onClose, 
  category,
  slideDirection 
}) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const [animating, setAnimating] = useState(false);
  
  // Function to get the next or previous category
  const changeCategory = (direction: 'next' | 'prev') => {
    // Get all available categories
    const categories = Object.keys(categorySubcategories);
    const currentIndex = categories.indexOf(category);
    
    if (currentIndex === -1) return category;
    
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % categories.length;
    } else {
      newIndex = (currentIndex - 1 + categories.length) % categories.length;
    }
    
    return categories[newIndex];
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 75; // Minimum swipe distance to trigger category change
    
    if (Math.abs(diff) > threshold) {
      // Don't process swipes if we're already animating
      if (animating) return;
      
      setAnimating(true);
      
      // Swipe right to left (next category)
      if (diff > 0) {
        const nextCategory = changeCategory('next');
        if (nextCategory !== category) {
          // Use CustomEvent to communicate with parent component
          const event = new CustomEvent('categoryChange', { 
            detail: { category: nextCategory, direction: 'left' } 
          });
          window.dispatchEvent(event);
        }
      } 
      // Swipe left to right (previous category)
      else {
        const prevCategory = changeCategory('prev');
        if (prevCategory !== category) {
          const event = new CustomEvent('categoryChange', { 
            detail: { category: prevCategory, direction: 'right' } 
          });
          window.dispatchEvent(event);
        }
      }
      
      // Reset animation state after transition finishes
      setTimeout(() => {
        setAnimating(false);
      }, 300); // Match this with the animation duration
    }
    
    // Reset touch coordinates
    touchStartX.current = null;
    touchEndX.current = null;
  };
  
  useEffect(() => {
    // Reset animation state when a new category is displayed
    const timer = setTimeout(() => {
      setAnimating(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [category]);
  
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent 
        side="bottom" 
        className="h-auto max-h-[80vh] rounded-t-xl p-0 flex flex-col dark:bg-gray-900 dark:border-gray-800"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <SheetClose className="absolute right-4 top-4 rounded-full bg-muted dark:bg-gray-800 p-2 hover:bg-muted/80 dark:hover:bg-gray-700 z-10">
          <X className="h-5 w-5" />
        </SheetClose>
        <ScrollArea 
          ref={scrollAreaRef} 
          className="flex-1 h-full overflow-y-auto" 
        >
          <div 
            className={cn(
              "transition-transform duration-300 ease-in-out w-full",
              slideDirection === 'left' && 'animate-slide-left',
              slideDirection === 'right' && 'animate-slide-right',
            )}
          >
            <CategoryContent category={category} onClose={onClose} isMobile={true} />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default MobileCategorySheet;
