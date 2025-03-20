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
      name: "LUNNOM",
      price: "9.99",
      unit: "each",
      description: "LED String Lights, 12 bulbs, battery operated/outdoor"
    },
    {
      id: 2,
      x: 48,
      y: 52,
      name: "SÖTVEDEL",
      price: "12.99",
      unit: "each",
      description: "Cushion, blue/white stripe, 50x50 cm"
    },
    {
      id: 3,
      x: 70,
      y: 35,
      name: "FEJKA",
      price: "5.99",
      unit: "each",
      description: "Artificial potted plant, outdoor/indoor herbs"
    },
    {
      id: 4,
      x: 30,
      y: 70,
      name: "ÄPPLARÖ",
      price: "89.99",
      unit: "each",
      description: "Chair with armrests, outdoor, foldable brown stained"
    },
    {
      id: 5,
      x: 85,
      y: 75,
      name: "RUNNEN",
      price: "29.99",
      unit: "9 pack",
      description: "Floor decking, outdoor, brown stained, 0.81 m²"
    },
    {
      id: 6,
      x: 60,
      y: 85,
      name: "INGEFÄRA",
      price: "4.99",
      unit: "each",
      description: "Plant pot with saucer, outdoor terracotta, 15 cm"
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
      
      <div className="relative w-full max-w-6xl mx-auto rounded-xl overflow-hidden">
        <img 
          src="/lovable-uploads/0df29fa2-95a6-408b-b51e-4d7f69a34fc7.png" 
          alt="Outdoor dining setup" 
          className="w-full h-auto rounded-xl"
        />
        
        {/* Hotspots */}
        {hotspots.map((hotspot) => (
          <Popover key={hotspot.id}>
            <PopoverTrigger asChild>
              <button
                className="absolute w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary"
                style={{ 
                  left: `${hotspot.x}%`, 
                  top: `${hotspot.y}%`,
                }}
                aria-label={`View ${hotspot.name} details`}
              >
                <Plus className="h-5 w-5 text-gray-800" />
              </button>
            </PopoverTrigger>
            <PopoverContent 
              className="w-64 p-3 shadow-md bg-white/95 backdrop-blur-sm border border-gray-100" 
              sideOffset={5}
            >
              <div className="space-y-2">
                <h3 className="font-medium text-base">{hotspot.name}</h3>
                <p className="text-xs text-gray-500 line-clamp-2">{hotspot.description}</p>
                
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <p className="text-sm font-bold">${hotspot.price}</p>
                    <p className="text-xs text-gray-500">Price per {hotspot.unit}</p>
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
