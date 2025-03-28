
import React from 'react';
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
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="bottom" className="p-0 max-h-[80vh] h-auto">
        <div className="flex flex-col h-full">
          <SheetClose className="absolute right-4 top-4 rounded-full bg-muted p-2 hover:bg-muted/80 z-10">
            <X className="h-5 w-5" />
          </SheetClose>
          <ScrollArea className="flex-grow h-full overflow-y-auto">
            <CategoryContent category={category} onClose={onClose} isMobile={true} />
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileCategorySheet;
