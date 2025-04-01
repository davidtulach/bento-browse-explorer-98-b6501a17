
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';
import { Toggle } from '@/components/ui/toggle';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

const ThemeToggle = ({ className, showLabel = false }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Toggle
      pressed={theme === 'dark'}
      onPressedChange={toggleTheme}
      aria-label="Toggle theme"
      className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center transition-all",
        "hover:bg-material-primary/10",
        theme === 'dark' ? "text-material-inversePrimary" : "text-material-primary",
        className
      )}
    >
      {theme === 'dark' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
      
      {showLabel && (
        <span className="ml-2 text-sm font-medium">
          {theme === 'dark' ? 'Dark' : 'Light'} Mode
        </span>
      )}
    </Toggle>
  );
};

export default ThemeToggle;
