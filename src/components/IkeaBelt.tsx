
import { ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import AnimatedImage from './AnimatedImage';

interface BeltSection {
  id: number;
  title: string;
  subtitle?: string;
  cta: string;
  items: BeltItem[];
}

interface BeltItem {
  id: number;
  title: string;
  description?: string;
  price?: string;
  badge?: string;
  image: string;
}

const beltSections: BeltSection[] = [
  {
    id: 1,
    title: "Best Sellers",
    subtitle: "Discover our most popular organic products",
    cta: "View all",
    items: [
      {
        id: 101,
        title: "Organic Avocado",
        price: "$2.99",
        badge: "Bestseller",
        image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      },
      {
        id: 102,
        title: "Farm Fresh Eggs",
        price: "$4.50",
        badge: "Organic",
        image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      },
      {
        id: 103,
        title: "Artisan Sourdough",
        price: "$5.99",
        badge: "Handmade",
        image: "https://images.unsplash.com/photo-1585478259715-94c77a5346c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      },
      {
        id: 104,
        title: "Organic Berries Mix",
        price: "$6.99",
        badge: "Seasonal",
        image: "https://images.unsplash.com/photo-1467825487722-2a7c4cd22a68?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
      }
    ]
  },
  {
    id: 2,
    title: "Premium Membership",
    subtitle: "Join our club for exclusive benefits",
    cta: "Learn more",
    items: [
      {
        id: 201,
        title: "Free Delivery",
        description: "Get free delivery on all orders over $50",
        image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
      },
      {
        id: 202,
        title: "Special Discounts",
        description: "Members-only pricing on selected items",
        image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
      },
    ]
  },
];

const IkeaBelt = () => {
  const scrollRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scroll = (sectionIndex: number, direction: 'left' | 'right') => {
    const currentRef = scrollRefs.current[sectionIndex];
    if (currentRef) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      currentRef.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-4">
      {beltSections.map((section, sectionIndex) => (
        <div key={section.id} className="mb-10">
          <div className="px-4 flex justify-between items-center mb-3">
            <div>
              <h2 className="text-lg font-medium">{section.title}</h2>
              {section.subtitle && (
                <p className="text-sm text-gray-500 mt-0.5">{section.subtitle}</p>
              )}
            </div>
            <button className="text-sm font-medium text-primary flex items-center">
              {section.cta}
              <ChevronRight className="w-4 h-4 ml-0.5" />
            </button>
          </div>
          
          <div
            ref={(el) => (scrollRefs.current[sectionIndex] = el)}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scrollbar-hide pl-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {section.items.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "flex-shrink-0 snap-start rounded-xl overflow-hidden shadow-sm hover-scale",
                  section.id === 1 ? "w-[250px]" : "w-[350px]"
                )}
              >
                <div className="relative">
                  <AnimatedImage
                    src={item.image}
                    alt={item.title}
                    className="w-full"
                    aspectRatio={section.id === 1 ? "aspect-[3/2]" : "aspect-[7/4]"}
                  />
                  
                  {item.badge && (
                    <div className="absolute top-2 left-2 bg-white py-0.5 px-2 rounded text-xs font-medium">
                      {item.badge}
                    </div>
                  )}
                </div>
                
                <div className="p-3 bg-white">
                  <h3 className="font-medium text-sm">{item.title}</h3>
                  {item.description && (
                    <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                  )}
                  {item.price && (
                    <p className="text-sm font-bold mt-1">{item.price}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default IkeaBelt;
