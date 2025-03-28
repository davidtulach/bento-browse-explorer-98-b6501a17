
import React from 'react';
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
          top: position?.top || 0,
          left: position?.left || 0,
          width: position?.width || '100%',
          maxWidth: '1200px',
          marginLeft: 'auto',
          marginRight: 'auto',
          right: 0,
          zIndex: 50
        }}
      >
        <CategoryContent category={category} onClose={onClose} isMobile={false} />
      </div>
    </div>
  );
};

export default DesktopCategoryOverlay;
