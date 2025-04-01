
import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';

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
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <div className="px-4 py-3 flex overflow-x-auto gap-2 md:gap-4 scrollbar-hide justify-center">
      {buttons.map((button) => (
        <button 
          key={button.id}
          className={cn(
            "flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium",
            button.lightColor,
            isDarkMode ? button.darkColor : "",
            "transition-colors duration-200",
            isDarkMode ? "shadow-inner border border-opacity-10 border-current" : "shadow-sm"
          )}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default PillButtonsRow;
