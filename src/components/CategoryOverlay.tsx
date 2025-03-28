
import React, { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileCategorySheet from './MobileCategorySheet';
import DesktopCategoryOverlay from './DesktopCategoryOverlay';

interface CategoryOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  category: string | null;
  position?: { top: number; left: number; width: number };
}

const CategoryOverlay = ({ isOpen, onClose, category: initialCategory, position }: CategoryOverlayProps) => {
  const isMobile = useIsMobile();
  const [currentCategory, setCurrentCategory] = useState<string | null>(initialCategory);
  
  // Update internal state when prop changes
  useEffect(() => {
    setCurrentCategory(initialCategory);
  }, [initialCategory]);
  
  // Listen for category change events from the MobileCategorySheet
  useEffect(() => {
    const handleCategoryChange = (e: CustomEvent) => {
      setCurrentCategory(e.detail.category);
    };
    
    // Use type assertion since CustomEvent is not recognized by default in TypeScript
    window.addEventListener('categoryChange', handleCategoryChange as EventListener);
    
    return () => {
      window.removeEventListener('categoryChange', handleCategoryChange as EventListener);
    };
  }, []);
  
  if (!currentCategory) return null;
  
  return isMobile ? (
    <MobileCategorySheet 
      isOpen={isOpen} 
      onClose={onClose} 
      category={currentCategory} 
    />
  ) : (
    <DesktopCategoryOverlay 
      isOpen={isOpen} 
      onClose={onClose} 
      category={currentCategory} 
      position={position} 
    />
  );
};

export default CategoryOverlay;
