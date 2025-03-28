
import React, { useEffect, useState } from 'react';
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
  const [overlayPosition, setOverlayPosition] = useState(position);

  useEffect(() => {
    setOverlayPosition(position);
    
    const handleScroll = () => {
      if (position) {
        // Update the top position based on the belt's current position
        const beltElement = document.querySelector('[data-category-belt]');
        if (beltElement) {
          const beltRect = beltElement.getBoundingClientRect();
          setOverlayPosition({
            ...position,
            top: beltRect.bottom + window.scrollY
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [position, isOpen]);

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
        className={cn(
          "absolute bg-white rounded-lg shadow-xl border border-gray-200 transition-all duration-200 overflow-hidden",
          !isOpen && "opacity-0 translate-y-[-10px]",
          isOpen && "opacity-100 translate-y-0"
        )}
        style={{
          top: overlayPosition?.top || 0,
          left: 0,
          right: 0,
          width: overlayPosition?.width || '1200px',
          maxWidth: '1200px',
          marginLeft: 'auto',
          marginRight: 'auto',
          zIndex: 50
        }}
      >
        <CategoryContent category={category} onClose={onClose} isMobile={false} />
      </div>
    </div>
  );
};

export default DesktopCategoryOverlay;
