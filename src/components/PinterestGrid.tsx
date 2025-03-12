
import { cn } from '@/lib/utils';
import AnimatedImage from './AnimatedImage';

const items = [
  {
    id: 1,
    title: "BIO Fruits & Veggies",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=750&q=80",
    tag: "Organic",
  },
  {
    id: 2,
    title: "Premium Imported Cheese",
    image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
    tag: "Premium",
  },
  {
    id: 3,
    title: "Weekend Discount: Fresh Bread",
    image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80",
    tag: "Discount",
  },
  {
    id: 4,
    title: "Discover Premium",
    image: "https://images.unsplash.com/photo-1490914327627-9fe8d52f4d90?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=750&q=80",
    tag: "Premium",
  },
  {
    id: 5,
    title: "Shopping Lists",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
    tag: "New",
  },
  {
    id: 6,
    title: "Fresh Seafood Selection",
    image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80",
    tag: "New",
  },
  {
    id: 7,
    title: "Premium Coffee Beans",
    image: "https://images.unsplash.com/photo-1559589689-577aabd1db4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80",
    tag: "Ad",
    sponsor: "Costa Coffee"
  },
  {
    id: 8,
    title: "Eco-friendly Cleaning Products",
    image: "https://images.unsplash.com/photo-1592861956120-e524fc739696?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=700&q=80",
    tag: "Ad",
    sponsor: "Eco Clean"
  },
];

// Tag colors mapped
const tagColors: Record<string, { bg: string, text: string }> = {
  "New": { bg: "bg-blue-500", text: "text-white" },
  "Premium": { bg: "bg-amber-500", text: "text-white" },
  "Discount": { bg: "bg-green-500", text: "text-white" },
  "Organic": { bg: "bg-emerald-500", text: "text-white" },
  "Ad": { bg: "bg-gray-500", text: "text-white" },
};

const PinterestGrid = () => {
  return (
    <div className="px-4 py-4">
      <h2 className="text-lg font-medium mb-4">Discover our assortment</h2>
      
      <div className="columns-2 gap-4 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="mb-4 break-inside-avoid">
            <div className="overflow-hidden rounded-xl shadow-sm">
              {/* Image with tag badge */}
              <div className="relative">
                <AnimatedImage
                  src={item.image}
                  alt={item.title}
                  className="w-full rounded-xl"
                  aspectRatio=""
                />
                
                <div className="absolute top-2 left-2">
                  <span className={cn(
                    "px-2 py-0.5 rounded-md text-xs font-medium",
                    tagColors[item.tag]?.bg,
                    tagColors[item.tag]?.text
                  )}>
                    {item.tag}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Title below image, outside the card */}
            <div className="mt-2 mb-1 flex justify-between items-start">
              <h3 className="font-medium text-sm">{item.title}</h3>
              <button className="text-lg leading-none opacity-70">•••</button>
            </div>
            {item.sponsor && (
              <p className="text-xs text-gray-500">
                Sponsored by {item.sponsor}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PinterestGrid;
