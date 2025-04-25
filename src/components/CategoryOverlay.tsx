
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
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  
  // Handle ESC key for accessibility
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);
  
  // Update internal state when prop changes
  useEffect(() => {
    setCurrentCategory(initialCategory);
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
  
  // Apply focus management for assistive technology
  useEffect(() => {
    if (isOpen) {
      // Set an initial focus to the overlay on open for accessibility
      const timeoutId = setTimeout(() => {
        const firstFocusableElement = document.querySelector(
          '[data-category-overlay] button, [data-category-overlay] a, [data-category-overlay] input, [data-category-overlay] [tabindex]:not([tabindex="-1"])'
        ) as HTMLElement | null;
        
        if (firstFocusableElement) {
          firstFocusableElement.focus();
        }
      }, 100);
      
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, currentCategory]);
  
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
