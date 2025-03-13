import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import AnimatedImage from './AnimatedImage';
import { Tag, ShoppingBag, Percent, Weight, Plus, Minus, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
      image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800&q=80",
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
      image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800&q=80",
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
      image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800&q=80",
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
      image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800&q=80",
      discount: "19%",
      isNew: false,
    },
    {
      id: 205,
      title: "Avocado",
      category: "Fruits",
      originalPrice: 49,
      discountedPrice: 39,
      weight: "1 pc",
      pricePerUnit: "39 CZK/pc",
      image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800&q=80",
      discount: "20%",
      isNew: true,
    },
    {
      id: 206,
      title: "Salmon Fillet",
      category: "Fish",
      originalPrice: 199,
      discountedPrice: 159,
      weight: "200 g",
      pricePerUnit: "795 CZK/kg",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800&q=80",
      discount: "20%",
      isNew: false,
    }
  ]
};

const IkeaBelt = () => {
  const weeklyScrollRef = useRef<HTMLDivElement>(null);
  const productsScrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [cart, setCart] = useState<Record<number, number>>({});
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [expandTimers, setExpandTimers] = useState<Record<number, NodeJS.Timeout>>({});

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleAddToCart = (productId: number, productTitle: string) => {
    setCart(prev => {
      const newCount = (prev[productId] || 0) + 1;
      
      // Show toast notification
      toast({
        title: "Added to cart",
        description: `${productTitle} (${newCount} ${newCount === 1 ? 'pc' : 'pcs'})`,
        duration: 2000,
      });
      
      return { ...prev, [productId]: newCount };
    });
    expandCartControl(productId);
  };

  const handleRemoveFromCart = (productId: number, productTitle: string) => {
    setCart(prev => {
      const currentCount = prev[productId] || 0;
      if (currentCount <= 1) {
        const newCart = { ...prev };
        delete newCart[productId];
        
        // Show toast notification for removal
        toast({
          title: "Removed from cart",
          description: `${productTitle}`,
          duration: 2000,
        });
        
        return newCart;
      }
      
      // Show toast notification for quantity reduction
      toast({
        title: "Updated cart",
        description: `${productTitle} (${currentCount - 1} ${currentCount - 1 === 1 ? 'pc' : 'pcs'})`,
        duration: 2000,
      });
      
      return { ...prev, [productId]: currentCount - 1 };
    });
    expandCartControl(productId);
  };

  const expandCartControl = (productId: number) => {
    // Clear any existing timer for this product
    if (expandTimers[productId]) {
      clearTimeout(expandTimers[productId]);
    }
    
    // Expand the control
    setExpandedItems(prev => ({ ...prev, [productId]: true }));
    
    // Set a new timer to collapse it after 3 seconds
    const timerId = setTimeout(() => {
      setExpandedItems(prev => ({ ...prev, [productId]: false }));
    }, 3000);
    
    setExpandTimers(prev => ({ ...prev, [productId]: timerId }));
  };

  // Clear all timers on component unmount
  useEffect(() => {
    return () => {
      Object.values(expandTimers).forEach(timer => clearTimeout(timer));
    };
  }, [expandTimers]);

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
              className="flex-shrink-0 snap-start overflow-hidden transition-all"
              style={{ width: '150px' }}
            >
              <div className="relative">
                <AnimatedImage
                  src={product.image}
                  alt={product.title}
                  aspectRatio="aspect-square"
                  className="w-full rounded-lg"
                />
                
                {/* Discount badge */}
                <div className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-md">
                  {product.discount}
                </div>
                
                {/* New badge */}
                {product.isNew && (
                  <div className="absolute top-1 left-1 bg-blue-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-md">
                    New
                  </div>
                )}
              </div>
              
              <div className="py-2 relative">
                <div className="text-xs text-gray-500 mb-0.5">{product.category}</div>
                <h3 className="font-medium text-sm text-gray-900 mb-0.5 truncate">{product.title}</h3>
                
                <div className="flex items-center gap-1 mb-0.5">
                  <Weight className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{product.weight}</span>
                </div>
                
                <div className="flex items-baseline gap-1.5">
                  <span className="text-sm font-bold text-gray-900">{product.discountedPrice} CZK</span>
                  <span className="text-xs line-through text-gray-400">{product.originalPrice}</span>
                </div>
                
                <div className="text-xs text-gray-500">{product.pricePerUnit}</div>

                {/* Add to cart button - with animations */}
                <div className="absolute bottom-2 right-0">
                  {cart[product.id] ? (
                    <div 
                      className={cn(
                        "flex items-center justify-center bg-primary text-white rounded-full transition-all duration-300 ease-in-out transform",
                        expandedItems[product.id] 
                          ? "w-[80px] h-8 scale-100" 
                          : "w-8 h-8 scale-95"
                      )}
                    >
                      {expandedItems[product.id] ? (
                        <>
                          <button 
                            className="w-8 h-8 flex items-center justify-center transition-transform duration-200 hover:scale-110" 
                            onClick={() => handleRemoveFromCart(product.id, product.title)}
                            aria-label="Remove item"
                          >
                            <Minus className="w-4 h-4 transition-opacity duration-150" />
                          </button>
                          <span className="text-xs font-medium animate-fade-in">{cart[product.id]}</span>
                          <button 
                            className="w-8 h-8 flex items-center justify-center transition-transform duration-200 hover:scale-110" 
                            onClick={() => handleAddToCart(product.id, product.title)}
                            aria-label="Add item"
                          >
                            <Plus className="w-4 h-4 transition-opacity duration-150" />
                          </button>
                        </>
                      ) : (
                        <button 
                          className="w-8 h-8 flex items-center justify-center transition-transform duration-200 hover:scale-110" 
                          onClick={() => expandCartControl(product.id)}
                          aria-label="Adjust quantity"
                        >
                          <span className="text-xs font-medium animate-fade-in">{cart[product.id]}</span>
                        </button>
                      )}
                    </div>
                  ) : (
                    <button 
                      className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full hover:bg-primary/90 transition-all duration-200 transform hover:scale-110"
                      onClick={() => handleAddToCart(product.id, product.title)}
                      aria-label="Add to cart"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  )}
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
