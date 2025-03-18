
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileCategorySheet from './MobileCategorySheet';
import DesktopCategoryOverlay from './DesktopCategoryOverlay';

interface CategoryOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  category: string | null;
  position?: { top: number; left: number; width: number };
}

const CategoryOverlay = ({ isOpen, onClose, category, position }: CategoryOverlayProps) => {
  const isMobile = useIsMobile();
  
  if (!category) return null;
  
  return isMobile ? (
    <MobileCategorySheet 
      isOpen={isOpen} 
      onClose={onClose} 
      category={category} 
    />
  ) : (
    <DesktopCategoryOverlay 
      isOpen={isOpen} 
      onClose={onClose} 
      category={category} 
      position={position} 
    />
  );
};

export default CategoryOverlay;
