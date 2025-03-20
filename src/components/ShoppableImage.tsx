
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus, X, ShoppingCart } from 'lucide-react';
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
  const [selectedItem, setSelectedItem] = useState<HotspotItem | null>(null);
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
    setSelectedItem(null);
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
          <button
            key={hotspot.id}
            className="absolute w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary"
            style={{ 
              left: `${hotspot.x}%`, 
              top: `${hotspot.y}%`,
            }}
            onClick={() => setSelectedItem(hotspot)}
            aria-label={`View ${hotspot.name} details`}
          >
            <Plus className="h-5 w-5 text-gray-800" />
          </button>
        ))}
      </div>

      {/* Item details dialog */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedItem?.name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <p className="text-sm text-gray-500">{selectedItem?.description}</p>
            
            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-xl font-bold">${selectedItem?.price}</p>
                <p className="text-sm text-gray-500">Price per {selectedItem?.unit}</p>
              </div>
              <Button 
                onClick={() => selectedItem && handleAddToCart(selectedItem)}
                className="flex items-center gap-2"
              >
                <ShoppingCart className="h-4 w-4" />
                Add to cart
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShoppableImage;
