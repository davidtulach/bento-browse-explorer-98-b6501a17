
import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Sheet, SheetContent, SheetClose } from '@/components/ui/sheet';
import CategoryContent from './CategoryContent';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MobileCategorySheetProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}

const MobileCategorySheet: React.FC<MobileCategorySheetProps> = ({ isOpen, onClose, category }) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Only run the nudge animation for cosmetics category
    if (isOpen && category === 'Cosmetics') {
      const timer = setTimeout(() => {
        if (scrollAreaRef.current) {
          // First subtle nudge
          scrollAreaRef.current.scrollTo({
            top: 15,
            behavior: 'smooth'
          });
          
          // Return to original position and do a second, slightly different nudge
          setTimeout(() => {
            if (scrollAreaRef.current) {
              scrollAreaRef.current.scrollTo({
                top: 5,
                behavior: 'smooth'
              });
            }
          }, 300);
        }
      }, 200); // Start nudge 200ms after opening
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, category]);
  
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="bottom" className="h-auto max-h-[80vh] rounded-t-xl p-0 flex flex-col">
        <SheetClose className="absolute right-4 top-4 rounded-full bg-muted p-2 hover:bg-muted/80 z-10">
          <X className="h-5 w-5" />
        </SheetClose>
        <ScrollArea 
          ref={scrollAreaRef} 
          className="flex-1 h-full overflow-y-auto" 
        >
          <CategoryContent category={category} onClose={onClose} isMobile={true} />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default MobileCategorySheet;

