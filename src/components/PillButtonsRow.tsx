
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface PillButton {
  id: string;
  label: string;
  lightColor: string;
  darkColor: string;
}

interface PillButtonsRowProps {
  buttons: PillButton[];
}

const PillButtonsRow: React.FC<PillButtonsRowProps> = ({ buttons }) => {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleButtonClick = (id: string) => {
    setActiveButton(currentActive => currentActive === id ? null : id);
  };

  return (
    <div className="px-4 py-3 flex overflow-x-auto gap-2 md:gap-4 scrollbar-hide justify-center">
      {buttons.map((button) => {
        const isActive = activeButton === button.id;
        
        return (
          <button 
            key={button.id}
            onClick={() => handleButtonClick(button.id)}
            className={cn(
              "flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium",
              "transition-all duration-200",
              isActive 
                ? "shadow-material-1 scale-105" 
                : "shadow-none",
              button.lightColor,
              button.darkColor
            )}
          >
            {button.label}
          </button>
        )
      })}
    </div>
  );
};

export default PillButtonsRow;
