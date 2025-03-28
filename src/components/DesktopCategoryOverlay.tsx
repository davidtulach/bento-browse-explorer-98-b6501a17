
import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import CategoryContent from './CategoryContent';

interface DesktopCategoryOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  position?: { top: number; left: number; width: number };
}

const DesktopCategoryOverlay: React.FC<DesktopCategoryOverlayProps> = ({ 
  isOpen, 
  onClose, 
  category, 
  position 
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !position) return;

    // Get the belt element
    const beltElement = document.querySelector('[data-category-belt]');
    if (!beltElement || !overlayRef.current) return;

    // Position the overlay directly below the belt
    const beltRect = beltElement.getBoundingClientRect();
    
    overlayRef.current.style.position = 'absolute';
    overlayRef.current.style.top = `${beltRect.bottom}px`;
    overlayRef.current.style.left = '0px';
    overlayRef.current.style.right = '0px';
    overlayRef.current.style.width = `${position.width || 1200}px`;
    overlayRef.current.style.maxWidth = '1200px';
    overlayRef.current.style.marginLeft = 'auto';
    overlayRef.current.style.marginRight = 'auto';
    overlayRef.current.style.zIndex = '50';
  }, [isOpen, position]);

  if (!category) return null;

  return (
    <div 
      className={cn(
        "fixed inset-0 z-50",
        !isOpen && "pointer-events-none"
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        ref={overlayRef}
        className={cn(
          "bg-white rounded-lg shadow-xl border border-gray-200 transition-all duration-200 overflow-hidden",
          !isOpen && "opacity-0 translate-y-[-10px]",
          isOpen && "opacity-100 translate-y-0"
        )}
      >
        <CategoryContent category={category} onClose={onClose} isMobile={false} />
      </div>
    </div>
  );
};

export default DesktopCategoryOverlay;
