
import React, { useState } from 'react';
import { 
  HoverCard,
  HoverCardTrigger,
  HoverCardContent 
} from '@/components/ui/hover-card';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface ContentPreviewProps {
  children: React.ReactNode;
  previewContent: React.ReactNode;
  previewTitle?: string;
  className?: string;
  openDelay?: number;
}

const ContentPreview = ({ 
  children, 
  previewContent, 
  previewTitle,
  className,
  openDelay = 750 // Default 750ms (0.75s) delay before showing preview
}: ContentPreviewProps) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  let hoverTimer: ReturnType<typeof setTimeout> | null = null;

  // Don't apply hover previews on mobile
  if (isMobile) {
    return <>{children}</>;
  }

  const handleMouseEnter = () => {
    // Set timer to open preview after delay
    hoverTimer = setTimeout(() => {
      setIsOpen(true);
    }, openDelay);
  };

  const handleMouseLeave = () => {
    // Clear timer if mouse leaves before delay completes
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      hoverTimer = null;
    }
    setIsOpen(false);
  };

  return (
    <HoverCard open={isOpen} onOpenChange={setIsOpen}>
      <HoverCardTrigger asChild>
        <div 
          className={cn("cursor-pointer", className)} 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {children}
        </div>
      </HoverCardTrigger>
      <HoverCardContent 
        className="w-96 p-0 shadow-xl border border-gray-200/50"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={handleMouseLeave}
      >
        <div className="overflow-hidden">
          {previewTitle && (
            <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
              <h3 className="text-sm font-medium">{previewTitle}</h3>
            </div>
          )}
          <div className="p-1">
            {previewContent}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default ContentPreview;
