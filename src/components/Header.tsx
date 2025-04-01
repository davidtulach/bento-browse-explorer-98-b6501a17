
import { Bell, ChevronDown, Clock, ShoppingCart, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import SearchBar from './SearchBar';
import { useIsMobile } from '@/hooks/use-mobile';
import ThemeToggle from './ThemeToggle';

const DeliveryWindow = () => {
  const isMobile = useIsMobile();
  
  return (
    <button className="flex flex-col items-start material-elevated py-1.5 px-3 text-sm">
      <div className="flex items-center">
        <Clock className="w-4 h-4 mr-1.5 text-material-primary" />
        <span className="font-medium">Today 15:20</span>
        <ChevronDown className="w-3 h-3 ml-1 opacity-60" />
      </div>
      <span 
        className={cn(
          "text-xs text-material-onSurfaceVariant mt-0.5 ml-5", 
          isMobile ? "max-w-[150px] truncate" : ""
        )}
        title="Vinohradská 1234, Praha 2"
      >
        Vinohradská 1234, Praha 2
      </span>
    </button>
  );
};

const Header = () => {
  const isMobile = useIsMobile();

  return (
    <>
      <header className={cn(
        "sticky top-0 z-50 w-full",
        "bg-material-surface/90 backdrop-blur-md border-b border-material-outlineVariant",
        "px-4 py-3",
        "transition-all duration-300 ease-in-out"
      )}>
        <div className="flex items-center justify-between">
          <DeliveryWindow />
          
          {!isMobile && (
            <div className="flex items-center flex-1 space-x-3 mx-3">
              <SearchBar inHeader={true} />
            </div>
          )}
          
          <div className="flex items-center space-x-3 ml-auto">
            <ThemeToggle />
            
            <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-material-primary/10 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1.5 w-2 h-2 bg-material-primary rounded-full" />
            </button>
            
            <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-material-primary/10 transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-5 h-5 bg-material-primary text-material-onPrimary rounded-full text-xs flex items-center justify-center">3</span>
            </button>
            
            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-material-secondaryContainer text-material-onSecondaryContainer hover:shadow-material-1 transition-shadow">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>
      
      {isMobile && (
        <div className="bg-material-surface border-b border-material-outlineVariant">
          <SearchBar />
        </div>
      )}
    </>
  );
};

export default Header;
