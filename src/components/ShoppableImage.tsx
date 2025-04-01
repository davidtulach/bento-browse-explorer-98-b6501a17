
import React, { useState } from 'react';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Plus, ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HotspotItem {
  id: number;
  x: number;
  y: number;
  name: string;
  price: string;
  unit: string;
  description: string;
}

const ShoppableImage = () => {
  const { toast } = useToast();
  
  // Hotspot items data
  const hotspots: HotspotItem[] = [
    {
      id: 1,
      x: 15,
      y: 30,
      name: "Fresh Bread",
      price: "3.99",
      unit: "loaf",
      description: "Freshly baked artisan sourdough bread, perfect for sandwiches"
    },
    {
      id: 2,
      x: 48,
      y: 52,
      name: "Organic Butter",
      price: "4.99",
      unit: "pack",
      description: "Creamy organic butter made from grass-fed cow's milk"
    },
    {
      id: 3,
      x: 70,
      y: 35,
      name: "Free-range Eggs",
      price: "5.49",
      unit: "dozen",
      description: "Farm fresh free-range eggs from locally raised hens"
    },
    {
      id: 4,
      x: 30,
      y: 70,
      name: "Organic Milk",
      price: "3.29",
      unit: "liter",
      description: "Organic whole milk from grass-fed cows, non-homogenized"
    },
    {
      id: 5,
      x: 85,
      y: 75,
      name: "Seasonal Fruit",
      price: "6.99",
      unit: "basket",
      description: "Assorted seasonal fruits, locally grown and pesticide-free"
    },
    {
      id: 6,
      x: 60,
      y: 85,
      name: "Artisan Cheese",
      price: "7.99",
      unit: "pack",
      description: "Locally produced artisan cheese, naturally aged and hand-crafted"
    }
  ];

  const handleAddToCart = (item: HotspotItem) => {
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  return (
    <div className="py-4 px-2">
      <h2 className="text-lg font-medium mb-3 px-2">Outdoor dining inspiration</h2>
      
      <div className="relative w-full mx-auto overflow-hidden md:max-w-[400px] lg:max-w-[450px]">
        <img 
          src="/lovable-uploads/0df29fa2-95a6-408b-b51e-4d7f69a34fc7.png" 
          alt="Outdoor dining setup" 
          className="w-full h-auto"
        />
        
        {/* Hotspots */}
        {hotspots.map((hotspot) => (
          <Popover key={hotspot.id}>
            <PopoverTrigger asChild>
              <button
                className="absolute w-10 h-10 rounded-full bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-200 dark:border-gray-600 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary"
                style={{ 
                  left: `${hotspot.x}%`, 
                  top: `${hotspot.y}%`,
                }}
                aria-label={`View ${hotspot.name} details`}
              >
                <Plus className="h-5 w-5 text-gray-800 dark:text-gray-200" />
              </button>
            </PopoverTrigger>
            <PopoverContent 
              className="w-64 p-3 shadow-md bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-gray-100 dark:border-gray-700" 
              sideOffset={5}
            >
              <div className="space-y-2">
                <h3 className="font-medium text-base dark:text-gray-100">{hotspot.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-300 line-clamp-2">{hotspot.description}</p>
                
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <p className="text-sm font-bold dark:text-white">${hotspot.price}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Price per {hotspot.unit}</p>
                  </div>
                  <Button 
                    onClick={() => handleAddToCart(hotspot)}
                    size="sm"
                    className="h-8 px-3 text-xs"
                  >
                    <ShoppingCart className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        ))}
      </div>
    </div>
  );
};

export default ShoppableImage;
