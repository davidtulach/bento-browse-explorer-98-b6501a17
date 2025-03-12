
import { Bell, ChevronDown, Clock, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const DeliveryWindow = () => {
  return (
    <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full py-1.5 px-3 text-sm border border-gray-100 shadow-sm hover:shadow-md transition-all">
      <Clock className="w-4 h-4 mr-1.5 text-primary" />
      <span className="font-medium">Today</span>
      <ChevronDown className="w-3 h-3 ml-1 opacity-60" />
    </div>
  );
};

const Header = () => {
  return (
    <header className={cn(
      "sticky top-0 z-50 w-full",
      "bg-white/70 backdrop-blur-md border-b border-gray-100",
      "px-4 py-3 flex items-center justify-between",
      "transition-all duration-300 ease-in-out"
    )}>
      <DeliveryWindow />
      
      <div className="flex items-center space-x-3">
        <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1.5 w-2 h-2 bg-primary rounded-full" />
        </button>
        
        <button className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors">
          <User className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;
