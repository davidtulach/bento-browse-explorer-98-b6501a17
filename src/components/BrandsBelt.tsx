
import React, { useRef, useState, useEffect } from 'react';
import { 
  Circle, Square, Triangle, Diamond, Hexagon, 
  Star, Infinity, Layers, LayoutGrid, Heart, 
  Smartphone, Zap, CupSoda, UtilityPole
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHapticFeedback } from '@/hooks/use-haptic';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const brandProducts = {
  1: [
    { id: 1, name: "Organic Veggie Mix", price: "$4.99", image: "https://placehold.co/300x200/4CAF50/FFFFFF/?text=Eco+Fresh" },
    { id: 2, name: "Fresh Greens Pack", price: "$3.49", image: "https://placehold.co/300x200/4CAF50/FFFFFF/?text=Eco+Fresh" },
    { id: 3, name: "Seasonal Fruit Box", price: "$6.99", image: "https://placehold.co/300x200/4CAF50/FFFFFF/?text=Eco+Fresh" },
    { id: 4, name: "Organic Smoothie Kit", price: "$5.99", image: "https://placehold.co/300x200/4CAF50/FFFFFF/?text=Eco+Fresh" },
  ],
  2: [
    { id: 1, name: "Recycled Paper Towels", price: "$3.99", image: "https://placehold.co/300x200/2196F3/FFFFFF/?text=Pure+Box" },
    { id: 2, name: "Biodegradable Bags", price: "$2.49", image: "https://placehold.co/300x200/2196F3/FFFFFF/?text=Pure+Box" },
    { id: 3, name: "Eco-Friendly Detergent", price: "$7.99", image: "https://placehold.co/300x200/2196F3/FFFFFF/?text=Pure+Box" },
    { id: 4, name: "Natural Dish Soap", price: "$4.29", image: "https://placehold.co/300x200/2196F3/FFFFFF/?text=Pure+Box" },
  ],
  3: [
    { id: 1, name: "Delta Premium Coffee", price: "$8.99", image: "https://placehold.co/300x200/FF9800/FFFFFF/?text=Delta" },
    { id: 2, name: "Breakfast Blend", price: "$6.49", image: "https://placehold.co/300x200/FF9800/FFFFFF/?text=Delta" },
    { id: 3, name: "Espresso Pods", price: "$9.99", image: "https://placehold.co/300x200/FF9800/FFFFFF/?text=Delta" },
    { id: 4, name: "Cold Brew Kit", price: "$12.99", image: "https://placehold.co/300x200/FF9800/FFFFFF/?text=Delta" },
  ],
  4: [
    { id: 1, name: "Luxury Hand Soap", price: "$14.99", image: "https://placehold.co/300x200/9C27B0/FFFFFF/?text=Luxe" },
    { id: 2, name: "Scented Candle", price: "$19.99", image: "https://placehold.co/300x200/9C27B0/FFFFFF/?text=Luxe" },
    { id: 3, name: "Bath Oil Set", price: "$24.99", image: "https://placehold.co/300x200/9C27B0/FFFFFF/?text=Luxe" },
    { id: 4, name: "Face Cream", price: "$29.99", image: "https://placehold.co/300x200/9C27B0/FFFFFF/?text=Luxe" },
  ],
  5: [
    { id: 1, name: "Hexo Smart Bulb", price: "$15.99", image: "https://placehold.co/300x200/009688/FFFFFF/?text=Hexo" },
    { id: 2, name: "Smart Plug", price: "$12.49", image: "https://placehold.co/300x200/009688/FFFFFF/?text=Hexo" },
    { id: 3, name: "LED Light Strip", price: "$22.99", image: "https://placehold.co/300x200/009688/FFFFFF/?text=Hexo" },
    { id: 4, name: "Motion Sensor", price: "$18.99", image: "https://placehold.co/300x200/009688/FFFFFF/?text=Hexo" },
  ],
  6: [
    { id: 1, name: "Breakfast Cereal", price: "$3.99", image: "https://placehold.co/300x200/FFC107/FFFFFF/?text=Star+Foods" },
    { id: 2, name: "Granola Bars", price: "$4.49", image: "https://placehold.co/300x200/FFC107/FFFFFF/?text=Star+Foods" },
    { id: 3, name: "Fruit Snacks", price: "$2.99", image: "https://placehold.co/300x200/FFC107/FFFFFF/?text=Star+Foods" },
    { id: 4, name: "Trail Mix", price: "$5.99", image: "https://placehold.co/300x200/FFC107/FFFFFF/?text=Star+Foods" },
  ],
  7: [
    { id: 1, name: "Forever Blender", price: "$49.99", image: "https://placehold.co/300x200/E91E63/FFFFFF/?text=Forever" },
    { id: 2, name: "Food Processor", price: "$59.99", image: "https://placehold.co/300x200/E91E63/FFFFFF/?text=Forever" },
    { id: 3, name: "Stand Mixer", price: "$129.99", image: "https://placehold.co/300x200/E91E63/FFFFFF/?text=Forever" },
    { id: 4, name: "Toaster", price: "$34.99", image: "https://placehold.co/300x200/E91E63/FFFFFF/?text=Forever" },
  ],
  8: [
    { id: 1, name: "Layer Winter Jacket", price: "$79.99", image: "https://placehold.co/300x200/3F51B5/FFFFFF/?text=Layer" },
    { id: 2, name: "Insulated Vest", price: "$49.99", image: "https://placehold.co/300x200/3F51B5/FFFFFF/?text=Layer" },
    { id: 3, name: "Thermal Underwear", price: "$24.99", image: "https://placehold.co/300x200/3F51B5/FFFFFF/?text=Layer" },
    { id: 4, name: "Wool Socks", price: "$12.99", image: "https://placehold.co/300x200/3F51B5/FFFFFF/?text=Layer" },
  ],
  9: [
    { id: 1, name: "Kitchen Organizer", price: "$19.99", image: "https://placehold.co/300x200/795548/FFFFFF/?text=Grid" },
    { id: 2, name: "Drawer Dividers", price: "$14.99", image: "https://placehold.co/300x200/795548/FFFFFF/?text=Grid" },
    { id: 3, name: "Shelf System", price: "$29.99", image: "https://placehold.co/300x200/795548/FFFFFF/?text=Grid" },
    { id: 4, name: "Pantry Bins", price: "$22.99", image: "https://placehold.co/300x200/795548/FFFFFF/?text=Grid" },
  ],
  10: [
    { id: 1, name: "Heart Pendant", price: "$39.99", image: "https://placehold.co/300x200/F44336/FFFFFF/?text=Lovely" },
    { id: 2, name: "Earrings Set", price: "$29.99", image: "https://placehold.co/300x200/F44336/FFFFFF/?text=Lovely" },
    { id: 3, name: "Charm Bracelet", price: "$24.99", image: "https://placehold.co/300x200/F44336/FFFFFF/?text=Lovely" },
    { id: 4, name: "Ring", price: "$19.99", image: "https://placehold.co/300x200/F44336/FFFFFF/?text=Lovely" },
  ],
  11: [
    { id: 1, name: "Smart Food Scale", price: "$29.99", image: "https://placehold.co/300x200/607D8B/FFFFFF/?text=Tech+Food" },
    { id: 2, name: "Digital Thermometer", price: "$14.99", image: "https://placehold.co/300x200/607D8B/FFFFFF/?text=Tech+Food" },
    { id: 3, name: "Cooking Timer", price: "$9.99", image: "https://placehold.co/300x200/607D8B/FFFFFF/?text=Tech+Food" },
    { id: 4, name: "Recipe Tablet", price: "$149.99", image: "https://placehold.co/300x200/607D8B/FFFFFF/?text=Tech+Food" },
  ],
  12: [
    { id: 1, name: "Energy Protein Bar", price: "$2.49", image: "https://placehold.co/300x200/FFEB3B/000000/?text=Energy" },
    { id: 2, name: "Electrolyte Drink", price: "$3.99", image: "https://placehold.co/300x200/FFEB3B/000000/?text=Energy" },
    { id: 3, name: "Power Shake Mix", price: "$19.99", image: "https://placehold.co/300x200/FFEB3B/000000/?text=Energy" },
    { id: 4, name: "Energy Gels", price: "$8.99", image: "https://placehold.co/300x200/FFEB3B/000000/?text=Energy" },
  ],
  13: [
    { id: 1, name: "Sparkling Water", price: "$3.99", image: "https://placehold.co/300x200/03A9F4/FFFFFF/?text=Fizz" },
    { id: 2, name: "Soda Maker", price: "$69.99", image: "https://placehold.co/300x200/03A9F4/FFFFFF/?text=Fizz" },
    { id: 3, name: "Flavor Drops", price: "$4.99", image: "https://placehold.co/300x200/03A9F4/FFFFFF/?text=Fizz" },
    { id: 4, name: "Carbonation Tablets", price: "$6.99", image: "https://placehold.co/300x200/03A9F4/FFFFFF/?text=Fizz" },
  ],
  14: [
    { id: 1, name: "Portable Charger", price: "$29.99", image: "https://placehold.co/300x200/673AB7/FFFFFF/?text=Electra" },
    { id: 2, name: "USB-C Cable", price: "$12.99", image: "https://placehold.co/300x200/673AB7/FFFFFF/?text=Electra" },
    { id: 3, name: "Power Strip", price: "$19.99", image: "https://placehold.co/300x200/673AB7/FFFFFF/?text=Electra" },
    { id: 4, name: "Wall Adapter", price: "$9.99", image: "https://placehold.co/300x200/673AB7/FFFFFF/?text=Electra" },
  ],
};

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
  const { triggerHaptic } = useHapticFeedback();
  const isMobile = useIsMobile();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("1");
  const [focusedItemIndex, setFocusedItemIndex] = useState<number | null>(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastHapticTime = useRef<number>(0);
  
  useEffect(() => {
    if (!isMobile || !scrollRef.current) return;
    
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.8,
    };
    
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const visibleEntries = entries.filter(entry => entry.isIntersecting)
        .sort((a, b) => {
          const rectA = a.boundingClientRect;
          const rectB = b.boundingClientRect;
          return rectA.left - rectB.left;
        });
      
      if (visibleEntries.length > 0) {
        const leftmostItem = visibleEntries[0];
        const index = Number(leftmostItem.target.getAttribute('data-index'));
        
        if (focusedItemIndex !== index) {
          setFocusedItemIndex(index);
          
          const brandId = brandIcons[index].id.toString();
          setActiveTab(brandId);
          
          const now = Date.now();
          if (now - lastHapticTime.current > 150) {
            triggerHaptic();
            lastHapticTime.current = now;
          }
        }
      }
    };
    
    const observer = new IntersectionObserver(handleIntersection, options);
    
    itemRefs.current.forEach(item => {
      if (item) observer.observe(item);
    });
    
    return () => {
      observer.disconnect();
    };
  }, [isMobile, focusedItemIndex, triggerHaptic]);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    const index = brandIcons.findIndex(brand => brand.id.toString() === value);
    
    if (index !== -1 && scrollRef.current && itemRefs.current[index]) {
      const item = itemRefs.current[index];
      if (item) {
        const containerWidth = scrollRef.current.clientWidth;
        const itemLeft = item.offsetLeft;
        const itemWidth = item.clientWidth;
        const scrollTo = itemLeft - (containerWidth / 2) + (itemWidth / 2);
        
        scrollRef.current.scrollTo({
          left: scrollTo,
          behavior: 'smooth'
        });
      }
    }
  };
  
  return (
    <div className="py-6 px-4">
      <h2 className="text-lg font-medium mb-4">Brands we think you might love</h2>
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-5 pb-4 scrollbar-hide"
        >
          {brandIcons.map((brand, index) => (
            <div 
              key={brand.id} 
              ref={el => itemRefs.current[index] = el}
              data-index={index}
              className={cn(
                "flex flex-col items-center flex-shrink-0 transition-transform duration-200",
                focusedItemIndex === index && "scale-110"
              )}
              onClick={() => handleTabChange(brand.id.toString())}
            >
              <div 
                className={cn(
                  "w-14 h-14 rounded-full flex items-center justify-center mb-2 transition-transform border cursor-pointer",
                  activeTab === brand.id.toString() 
                    ? "bg-primary/10 shadow-md border-primary/30" 
                    : "bg-white shadow-sm border-gray-100"
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
        
        <div className="mt-4">
          {brandIcons.map((brand) => (
            <TabsContent key={brand.id} value={brand.id.toString()} className="mt-2">
              <div className="w-full overflow-x-auto pb-4">
                <div className="flex gap-4 min-w-max">
                  {brandProducts[brand.id as keyof typeof brandProducts].map((product) => (
                    <div 
                      key={product.id} 
                      className="flex-shrink-0 w-[140px] bg-white dark:bg-gray-800 rounded-md shadow-sm overflow-hidden"
                    >
                      <div className="w-full h-28 bg-gray-100 dark:bg-gray-700">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="text-sm font-medium line-clamp-1">{product.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default BrandsBelt;
