
import { Bell, ChevronDown, Clock, ShoppingCart, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import SearchBar from './SearchBar';
import { useIsMobile } from '@/hooks/use-mobile';
import ThemeToggle from './ThemeToggle';

const DeliveryWindow = () => {
  const isMobile = useIsMobile();
  
  return (
    <button className="flex flex-col items-start bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl py-1.5 px-3 text-sm border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center">
        <Clock className="w-4 h-4 mr-1.5 text-primary" />
        <span className="font-medium">Today 15:20</span>
        <ChevronDown className="w-3 h-3 ml-1 opacity-60" />
      </div>
      <span 
        className={cn(
          "text-xs text-gray-500 dark:text-gray-400 mt-0.5 ml-5", 
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
        "bg-white/70 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800",
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
            
            <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1.5 w-2 h-2 bg-primary rounded-full" />
            </button>
            
            <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-white dark:text-gray-900 rounded-full text-xs flex items-center justify-center">3</span>
            </button>
            
            <button className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>
      
      {isMobile && (
        <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
          <SearchBar />
        </div>
      )}
    </>
  );
};

export default Header;
