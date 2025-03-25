
import { cn } from '@/lib/utils';
import SearchBar from './SearchBar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Bell, ShoppingCart, User } from 'lucide-react';

const Header = () => {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        <div className="bg-white border-b border-gray-100 pt-3">
          <SearchBar />
        </div>
      ) : (
        <header className={cn(
          "sticky top-0 z-50 w-full",
          "bg-white/70 backdrop-blur-md border-b border-gray-100",
          "px-4 py-3",
          "transition-all duration-300 ease-in-out"
        )}>
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-start bg-white/80 backdrop-blur-sm rounded-xl py-1.5 px-3 text-sm border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center">
                <span className="font-medium">Today 15:20</span>
              </div>
              <span className="text-xs text-gray-500 mt-0.5">Vinohradská 1234, Praha 2</span>
            </div>
            
            <div className="flex items-center flex-1 space-x-3 mx-3">
              <SearchBar inHeader={true} />
            </div>
            
            <div className="flex items-center space-x-3 ml-auto">
              <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1.5 w-2 h-2 bg-primary rounded-full" />
              </button>
              
              <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-white rounded-full text-xs flex items-center justify-center">3</span>
              </button>
              
              <button className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors">
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
