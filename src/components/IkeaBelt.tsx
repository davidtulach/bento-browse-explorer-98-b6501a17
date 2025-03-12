import { useRef } from 'react';
import { cn } from '@/lib/utils';
import AnimatedImage from './AnimatedImage';
import { Tag, ShoppingBag, Percent, Weight } from 'lucide-react';

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

// Discounted products data
const discountedProducts = {
  id: 2,
  title: "Price Hits",
  items: [
    {
      id: 201,
      title: "Organic Apples",
      category: "Fruits",
      originalPrice: 79,
      discountedPrice: 59,
      weight: "1 kg",
      pricePerUnit: "59 CZK/kg",
      image: "/lovable-uploads/24478780-f5e1-46bf-ab23-a561b8dbffb5.png",
      discount: "25%",
      isNew: false,
    },
    {
      id: 202,
      title: "Beef Ribeye",
      category: "Meat",
      originalPrice: 399,
      discountedPrice: 299,
      weight: "500 g",
      pricePerUnit: "598 CZK/kg",
      image: "/lovable-uploads/57df0949-8906-423f-8116-7248ef4503f4.png",
      discount: "25%",
      isNew: false,
    },
    {
      id: 203,
      title: "Sourdough Bread",
      category: "Bakery",
      originalPrice: 69,
      discountedPrice: 49,
      weight: "400 g",
      pricePerUnit: "122.5 CZK/kg",
      image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
      discount: "29%",
      isNew: true,
    },
    {
      id: 204,
      title: "French Cheese",
      category: "Dairy",
      originalPrice: 159,
      discountedPrice: 129,
      weight: "250 g",
      pricePerUnit: "516 CZK/kg",
      image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
      discount: "19%",
      isNew: false,
    }
  ]
};

const IkeaBelt = () => {
  const weeklyScrollRef = useRef<HTMLDivElement>(null);
  const productsScrollRef = useRef<HTMLDivElement>(null);

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

      {/* Discounted Products Section */}
      <div className="mb-6">
        <div className="px-4 mb-4 flex items-center gap-2">
          <Percent className="w-5 h-5 text-red-500" />
          <h2 className="text-lg font-medium text-gray-900">{discountedProducts.title}</h2>
        </div>
        
        <div
          ref={productsScrollRef}
          className="flex gap-3 px-4 pb-2 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {discountedProducts.items.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 snap-start overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-md"
              style={{ width: '180px' }}
            >
              <div className="relative">
                <AnimatedImage
                  src={product.image}
                  alt={product.title}
                  aspectRatio="aspect-square"
                  className="w-full"
                />
                
                {/* Discount badge */}
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {product.discount}
                </div>
                
                {/* New badge */}
                {product.isNew && (
                  <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    New
                  </div>
                )}
              </div>
              
              <div className="p-3">
                <div className="text-xs text-gray-500 mb-1">{product.category}</div>
                <h3 className="font-medium text-sm text-gray-900 mb-1 truncate">{product.title}</h3>
                
                <div className="flex items-center gap-1 mb-1">
                  <Weight className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{product.weight}</span>
                </div>
                
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-bold text-gray-900">{product.discountedPrice} CZK</span>
                  <span className="text-xs line-through text-gray-400">{product.originalPrice} CZK</span>
                </div>
                
                <div className="text-xs text-gray-500 mt-1">{product.pricePerUnit}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IkeaBelt;
