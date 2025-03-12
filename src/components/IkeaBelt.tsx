import { useRef } from 'react';
import { cn } from '@/lib/utils';
import AnimatedImage from './AnimatedImage';
import { Tag, PackageOpen, Flame, ShoppingBag } from 'lucide-react';

// Weekly offers sections
const weeklyOffers = {
  id: 1,
  title: "Weekly Topics",
  items: [
    {
      id: 101,
      title: "Fresh Produce Sale",
      description: "Up to 40% off on seasonal fruits and vegetables",
      image: "/lovable-uploads/24478780-f5e1-46bf-ab23-a561b8dbffb5.png",
    },
    {
      id: 102,
      title: "Butcher's Special",
      description: "Premium cuts at special weekend prices",
      image: "/lovable-uploads/57df0949-8906-423f-8116-7248ef4503f4.png",
    },
    {
      id: 103,
      title: "Bakery Fresh",
      description: "Buy 2 get 1 free on all artisan breads",
      image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
    },
    {
      id: 104,
      title: "Wine & Cheese Festival",
      description: "Special pairings and tastings this weekend",
      image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
    }
  ]
};

// Price hits section
const priceHits = {
  id: 2,
  title: "Price Hits",
  items: [
    {
      id: 201,
      title: "Today's Deals",
      icon: Tag,
      color: "bg-orange-100 text-orange-700",
    },
    {
      id: 202,
      title: "Fresh Offers",
      icon: PackageOpen,
      color: "bg-green-100 text-green-700",
    },
    {
      id: 203,
      title: "Hot Deals",
      icon: Flame,
      color: "bg-red-100 text-red-700",
    },
    {
      id: 204,
      title: "Bundle Savings",
      icon: ShoppingBag,
      color: "bg-blue-100 text-blue-700",
    },
  ]
};

const IkeaBelt = () => {
  const weeklyScrollRef = useRef<HTMLDivElement>(null);
  const priceHitsScrollRef = useRef<HTMLDivElement>(null);

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-4">
      {/* Weekly Topics section - larger panels */}
      <div className="mb-10">
        <div className="px-4 mb-3">
          <h2 className="text-lg font-medium">{weeklyOffers.title}</h2>
        </div>
        
        <div
          ref={weeklyScrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scrollbar-hide pl-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {weeklyOffers.items.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 snap-start overflow-hidden shadow-sm hover-scale w-[300px]"
            >
              <div className="relative">
                <AnimatedImage
                  src={item.image}
                  alt={item.title}
                  className="w-full"
                  aspectRatio="aspect-[3/4]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/70"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-medium text-lg">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm text-white/90 mt-1">{item.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Price Hits section */}
      <div className="mb-6">
        <div className="px-4 mb-4">
          <h2 className="text-lg font-medium text-gray-900">{priceHits.title}</h2>
        </div>
        
        <div
          ref={priceHitsScrollRef}
          className="flex gap-3 px-4 pb-2 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {priceHits.items.map((item) => (
            <button
              key={item.id}
              className={cn(
                "flex flex-col items-center justify-center p-4 rounded-xl transition-transform hover:scale-105",
                "min-w-[120px] h-[120px]",
                item.color
              )}
            >
              <item.icon className="w-6 h-6 mb-2" />
              <span className="text-sm font-medium text-center">{item.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IkeaBelt;
