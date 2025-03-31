
import React, { useEffect, useState, useRef } from 'react';
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
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const previousCategory = useRef<string | null>(null);
  
  // Update internal state when prop changes
  useEffect(() => {
    // If there was a previous category and it's different, determine direction
    if (previousCategory.current && initialCategory !== previousCategory.current) {
      // Get the categories to determine direction
      // This is a simplified logic - a more complete version would compare indices in the category array
      setSlideDirection('right'); // Default direction
    }
    
    setCurrentCategory(initialCategory);
    previousCategory.current = initialCategory;
  }, [initialCategory]);
  
  // Listen for category change events from the MobileCategorySheet
  useEffect(() => {
    const handleCategoryChange = (e: CustomEvent) => {
      const newCategory = e.detail.category;
      const direction = e.detail.direction || 'right';
      
      setSlideDirection(direction);
      setCurrentCategory(newCategory);
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
      slideDirection={slideDirection}
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
