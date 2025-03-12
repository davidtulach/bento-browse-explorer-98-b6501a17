
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import AnimatedImage from './AnimatedImage';

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

// Small format sections
const smallSections = {
  id: 2,
  title: "Our Best Offers",
  cta: "View all",
  items: [
    {
      id: 201,
      title: "BIO",
      image: "/lovable-uploads/f6afccdb-a1d0-4123-9b27-53eba8f72c50.png",
    },
    {
      id: 202,
      title: "Shopping lists",
      image: "/lovable-uploads/21973ef3-313c-4b5a-b26d-abf6db0d5d62.png",
    },
    {
      id: 203,
      title: "Bulk buy",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=400&q=80",
    },
    {
      id: 204,
      title: "New Arrivals",
      image: "/lovable-uploads/5cb0fd3c-bc04-49aa-bc80-6aa2d3c36550.png",
    },
  ]
};

const IkeaBelt = () => {
  const weeklyScrollRef = useRef<HTMLDivElement>(null);
  const smallScrollRef = useRef<HTMLDivElement>(null);

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

      {/* Small tiles section */}
      <div className="mb-6">
        <div className="px-4 flex justify-between items-center mb-3">
          <div>
            <h2 className="text-lg font-medium">{smallSections.title}</h2>
          </div>
          <button className="text-sm font-medium text-primary flex items-center">
            {smallSections.cta}
          </button>
        </div>
        
        <div
          ref={smallScrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-3 scrollbar-hide pl-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {smallSections.items.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 snap-start overflow-hidden shadow-sm hover-scale w-[120px]"
            >
              <div className="relative">
                <AnimatedImage
                  src={item.image}
                  alt={item.title}
                  className="w-full"
                  aspectRatio="aspect-[3/4]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80"></div>
                <div className="absolute bottom-0 left-0 right-0 p-2 text-white font-medium text-sm text-center">
                  {item.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IkeaBelt;
