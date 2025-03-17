
import React from 'react';
import { 
  Circle, Square, Triangle, Diamond, Hexagon, 
  Star, Infinity, Layers, LayoutGrid, Heart, 
  Smartphone, Zap, CupSoda, UtilityPole
} from 'lucide-react';
import { cn } from '@/lib/utils';

const brandIcons = [
  { id: 1, name: "Eco Fresh", icon: Circle, color: "#4CAF50" },
  { id: 2, name: "Pure Box", icon: Square, color: "#2196F3" },
  { id: 3, name: "Delta", icon: Triangle, color: "#FF9800" },
  { id: 4, name: "Luxe", icon: Diamond, color: "#9C27B0" },
  { id: 5, name: "Hexo", icon: Hexagon, color: "#009688" },
  { id: 6, name: "Star Foods", icon: Star, color: "#FFC107" },
  { id: 7, name: "Forever", icon: Infinity, color: "#E91E63" },
  { id: 8, name: "Layer", icon: Layers, color: "#3F51B5" },
  { id: 9, name: "Grid", icon: LayoutGrid, color: "#795548" },
  { id: 10, name: "Lovely", icon: Heart, color: "#F44336" },
  { id: 11, name: "Tech Food", icon: Smartphone, color: "#607D8B" },
  { id: 12, name: "Energy", icon: Zap, color: "#FFEB3B" },
  { id: 13, name: "Fizz", icon: CupSoda, color: "#03A9F4" },
  { id: 14, name: "Electra", icon: UtilityPole, color: "#673AB7" },
];

const BrandsBelt = () => {
  return (
    <div className="py-6 px-4">
      <h2 className="text-lg font-medium mb-4">Brands we think you might love</h2>
      
      <div className="flex overflow-x-auto gap-5 pb-4 scrollbar-hide">
        {brandIcons.map((brand) => (
          <div key={brand.id} className="flex flex-col items-center flex-shrink-0">
            <div 
              className={cn(
                "w-14 h-14 rounded-full flex items-center justify-center mb-2 transition-transform hover:scale-110",
                "bg-white shadow-sm border border-gray-100"
              )}
            >
              {React.createElement(brand.icon, { 
                size: 28, 
                color: brand.color,
                strokeWidth: 1.5,
                className: "transition-all duration-200"
              })}
            </div>
            <span className="text-xs font-medium text-center whitespace-nowrap">{brand.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandsBelt;
