
import React from 'react';
import { X } from 'lucide-react';
import { Sheet, SheetContent, SheetClose } from '@/components/ui/sheet';
import CategoryContent from './CategoryContent';

interface MobileCategorySheetProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}

const MobileCategorySheet: React.FC<MobileCategorySheetProps> = ({ isOpen, onClose, category }) => {
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="bottom" className="h-auto max-h-[70vh] rounded-t-xl p-0">
        <SheetClose className="absolute right-4 top-4 rounded-full bg-muted p-2 hover:bg-muted/80 z-10">
          <X className="h-5 w-5" />
        </SheetClose>
        <CategoryContent category={category} onClose={onClose} isMobile={true} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileCategorySheet;
