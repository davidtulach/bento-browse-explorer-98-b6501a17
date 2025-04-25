
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import CategoryContent from './CategoryContent';
import { getOnKeyUpCallback } from '@/utils/accessibility';
import useFocusTrap from '@/hooks/use-focus-trap';

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
  const containerRef = useFocusTrap<HTMLDivElement>(isOpen);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Store the previously focused element to return focus when closing
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
    } else if (previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div 
      className={cn(
        "absolute left-0 right-0 z-50",
        !isOpen && "pointer-events-none hidden"
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      }}
      style={{
        top: position?.top || 0
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`${category} category menu`}
      data-category-overlay
    >
      <div 
        ref={containerRef}
        className={cn(
          "absolute left-0 bg-white dark:bg-gray-900 rounded-lg shadow-xl",
          "border border-gray-200 dark:border-gray-700 transition-all duration-200 overflow-hidden w-full",
          !isOpen && "opacity-0 translate-y-[-10px]",
          isOpen && "opacity-100 translate-y-0"
        )}
        style={{
          maxWidth: '1200px',
          zIndex: 50
        }}
      >
        <CategoryContent category={category} onClose={onClose} isMobile={false} />
      </div>
    </div>
  );
};

export default DesktopCategoryOverlay;
