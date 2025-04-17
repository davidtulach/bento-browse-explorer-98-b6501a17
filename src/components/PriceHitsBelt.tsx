import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import AnimatedImage from './AnimatedImage';
import { ShoppingBag, Percent, Weight, Plus, Minus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useHapticFeedback } from '@/hooks/use-haptic';
import { useIsMobile } from '@/hooks/use-mobile';
import DotLottiePlayer from './DotLottiePlayer';

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
      image: "/lovable-uploads/5605b049-dcdd-4472-94da-213652ce6d5b.png",
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
      image: "/lovable-uploads/9c744d60-ea7b-4c1d-8552-ee3900c25ff5.png",
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

const PriceHitsBelt = () => {
  const productsScrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { triggerHaptic } = useHapticFeedback();
  const isMobile = useIsMobile();
  
  const [cart, setCart] = useState<Record<number, number>>({});
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [expandTimers, setExpandTimers] = useState<Record<number, NodeJS.Timeout>>({});
  const [glowingItems, setGlowingItems] = useState<Record<number, boolean>>({});
  const [glowTimers, setGlowTimers] = useState<Record<number, NodeJS.Timeout>>({});
  
  const [focusedProductIndex, setFocusedProductIndex] = useState<number | null>(0);
  
  const productItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastHapticTime = useRef<number>(0);

  const [buttonAnimations, setButtonAnimations] = useState<Record<number, boolean>>({});
  const buttonAnimationTimers = useRef<Record<number, NodeJS.Timeout>>({});

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
    
    // Trigger animation on the button only
    triggerButtonAnimation(productId);
    
    expandCartControl(productId);
  };
  
  const triggerButtonAnimation = (productId: number) => {
    // Clear any existing timer for this product
    if (buttonAnimationTimers.current[productId]) {
      clearTimeout(buttonAnimationTimers.current[productId]);
    }
    
    // Set the animation state for the button
    setButtonAnimations(prev => ({ ...prev, [productId]: true }));
    
    // Set a timer to remove the animation after the animation duration (1.5s)
    buttonAnimationTimers.current[productId] = setTimeout(() => {
      setButtonAnimations(prev => ({ ...prev, [productId]: false }));
    }, 1500);
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

  // Set up intersection observer for products
  useEffect(() => {
    if (!isMobile || !productsScrollRef.current) return;
    
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.7,
    };
    
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      // Find the leftmost visible item
      const visibleEntries = entries.filter(entry => entry.isIntersecting)
        .sort((a, b) => {
          const rectA = a.boundingClientRect;
          const rectB = b.boundingClientRect;
          return rectA.left - rectB.left;
        });
      
      if (visibleEntries.length > 0) {
        const leftmostItem = visibleEntries[0];
        const index = Number(leftmostItem.target.getAttribute('data-index'));
        
        if (focusedProductIndex !== index) {
          setFocusedProductIndex(index);
          
          // Trigger haptic feedback with throttling
          const now = Date.now();
          if (now - lastHapticTime.current > 150) {
            triggerHaptic();
            lastHapticTime.current = now;
          }
        }
      }
    };
    
    const observer = new IntersectionObserver(handleIntersection, options);
    
    productItemRefs.current.forEach(item => {
      if (item) observer.observe(item);
    });
    
    return () => {
      observer.disconnect();
    };
  }, [isMobile, focusedProductIndex, triggerHaptic]);

  // Clear all timers on component unmount
  useEffect(() => {
    return () => {
      Object.values(expandTimers).forEach(timer => clearTimeout(timer));
      Object.values(glowTimers).forEach(timer => clearTimeout(timer));
      Object.values(buttonAnimationTimers.current).forEach(timer => clearTimeout(timer));
    };
  }, [expandTimers, glowTimers]);

  return (
    <div className="py-4">
      {/* Discounted Products Section */}
      <div className="mb-6">
        <div className="px-4 mb-4 flex items-center gap-2">
          <Percent className="w-5 h-5 text-red-500 dark:text-red-400" />
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">{discountedProducts.title}</h2>
        </div>
        
        <div
          ref={productsScrollRef}
          className="flex gap-3 px-4 pb-2 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {discountedProducts.items.map((product, index) => (
            <div
              key={product.id}
              ref={el => productItemRefs.current[index] = el}
              data-index={index}
              className={cn(
                "flex-shrink-0 snap-start overflow-hidden transition-all relative transform-gpu will-change-transform",
                focusedProductIndex === index ? "scale-105 shadow-md rounded-lg" : "scale-100",
                "style-width-150px"
              )}
              style={{ 
                width: '150px', 
                transition: 'all 300ms cubic-bezier(0.23, 1, 0.32, 1)'
              }}
            >
              <div className="relative">
                <AnimatedImage
                  src={product.image}
                  alt={product.title}
                  aspectRatio="aspect-square"
                  className={cn(
                    "w-full rounded-lg transition-all duration-300 transform-gpu will-change-transform",
                    focusedProductIndex === index ? "border-2 border-primary/20" : ""
                  )}
                  objectFit="cover"
                />
                
                {/* Discount badge */}
                <div className="absolute top-1 right-1 bg-red-500 dark:bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-md">
                  {product.discount}
                </div>
                
                {/* New badge */}
                {product.isNew && (
                  <div className="absolute top-1 left-1 bg-blue-500 dark:bg-blue-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-md">
                    New
                  </div>
                )}
              </div>
              
              <div className="py-2 relative dark:bg-gray-800 rounded-b-lg px-2">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">{product.category}</div>
                <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100 mb-0.5 truncate">{product.title}</h3>
                
                <div className="flex items-center gap-1 mb-0.5">
                  <Weight className="w-3 h-3 text-gray-400 dark:text-gray-500" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">{product.weight}</span>
                </div>
                
                <div className="flex items-baseline gap-1.5">
                  <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{product.discountedPrice} CZK</span>
                  <span className="text-xs line-through text-gray-400 dark:text-gray-500">{product.originalPrice}</span>
                </div>
                
                <div className="text-xs text-gray-500 dark:text-gray-400">{product.pricePerUnit}</div>

                {/* Add to cart button - with animations */}
                <div className="absolute bottom-2 right-2">
                  {/* Lottie animation overlay for button only */}
                  {buttonAnimations[product.id] && (
                    <div className="absolute inset-0 z-10 pointer-events-none" style={{ width: cart[product.id] ? '80px' : '32px', height: '32px' }}>
                      <DotLottiePlayer 
                        src="https://lottie.host/6ef8a2c9-5c28-4f6d-9667-44f4edcf14d4/eZdNiHrJg2.lottie" 
                        background="transparent" 
                        speed={1}
                        loop={false}
                        autoplay={true}
                        style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%' }}
                      />
                    </div>
                  )}
                  
                  {cart[product.id] ? (
                    <div 
                      className={cn(
                        "flex items-center justify-center bg-primary text-white rounded-full transition-all duration-300 ease-in-out transform-gpu will-change-transform",
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
                      className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full hover:bg-primary/90 transition-all duration-200 transform hover:scale-110 transform-gpu will-change-transform"
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

export default PriceHitsBelt;
