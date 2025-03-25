
import React from 'react';
import { Bell, Home, ShoppingCart, Sparkles, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const MobileNavBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-2 px-4 z-50">
      <div className="flex items-center justify-between">
        <button className="flex flex-col items-center justify-center">
          <Sparkles className="w-6 h-6 text-gray-600" />
          <span className="text-xs mt-1 text-gray-600">New</span>
        </button>

        <button className="flex flex-col items-center justify-center">
          <Home className="w-6 h-6 text-gray-600" />
          <span className="text-xs mt-1 text-gray-600">Home</span>
        </button>

        <div className="relative -mt-8">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg">
            <User className="w-7 h-7 text-white" />
          </div>
          <span className="text-xs mt-1 text-gray-600 absolute w-full text-center">Assistant</span>
        </div>

        <button className="flex flex-col items-center justify-center relative">
          <Bell className="w-6 h-6 text-gray-600" />
          <span className="absolute top-0 right-1 w-2 h-2 bg-primary rounded-full"></span>
          <span className="text-xs mt-1 text-gray-600">Alerts</span>
        </button>

        <button className="flex flex-col items-center justify-center relative">
          <ShoppingCart className="w-6 h-6 text-gray-600" />
          <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-white rounded-full text-xs flex items-center justify-center">3</span>
          <span className="text-xs mt-1 text-gray-600">Cart</span>
        </button>
      </div>
    </div>
  );
};

export default MobileNavBar;
