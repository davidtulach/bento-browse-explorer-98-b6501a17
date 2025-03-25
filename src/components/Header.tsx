
import { Bell, ChevronDown, Clock, ShoppingCart, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import SearchBar from './SearchBar';

const DeliveryWindow = () => {
  return (
    <button className="flex flex-col items-start bg-white/80 backdrop-blur-sm rounded-xl py-1.5 px-3 text-sm border border-gray-100 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center">
        <Clock className="w-4 h-4 mr-1.5 text-primary" />
        <span className="font-medium">Today 15:20</span>
        <ChevronDown className="w-3 h-3 ml-1 opacity-60" />
      </div>
      <span className="text-xs text-gray-500 mt-0.5 ml-5">Vinohradská 1234, Praha 2</span>
    </button>
  );
};

const Header = () => {
  return (
    <header className={cn(
      "sticky top-0 z-50 w-full",
      "bg-white/70 backdrop-blur-md border-b border-gray-100",
      "px-4 py-3",
      "transition-all duration-300 ease-in-out"
    )}>
      <div className="flex items-center justify-between mb-2">
        <DeliveryWindow />
        
        <div className="flex items-center space-x-3">
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
      
      {/* Embedded SearchBar */}
      <div className="w-full">
        <SearchBar inHeader={true} />
      </div>
    </header>
  );
};

export default Header;
