
import { cn } from '@/lib/utils';
import AnimatedImage from './AnimatedImage';
import { useIsMobile } from '@/hooks/use-mobile';

const items = [
  {
    id: 1,
    title: "BIO Fruits & Veggies",
    image: "/lovable-uploads/8b6e7d15-1f15-448b-9910-39864305b594.png",
    tag: "Organic",
  },
  {
    id: 2,
    title: "Discover Premium",
    image: "/lovable-uploads/0ccbc4e9-e89f-461b-ab5e-ff37120e43a9.png",
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
    title: "Freshly Picked Near You",
    image: "/lovable-uploads/00d23097-6ec0-4918-b036-136735c6e583.png",
    tag: "Premium",
  },
  {
    id: 5,
    title: "Shopping Lists",
    image: "/lovable-uploads/d6ee2bf5-680d-4701-afbf-6a284aa69456.png",
    tag: "New",
  },
  {
    id: 6,
    title: "Fresh Farm Poultry",
    image: "/lovable-uploads/f740b72a-5c5c-4364-b827-45c0751320fa.png",
    tag: "New",
  },
  {
    id: 7,
    title: "Your Banking ad",
    image: "https://images.unsplash.com/photo-1559589689-577aabd1db4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80",
    tag: "Ad",
    sponsor: "Costa Coffee"
  },
  {
    id: 8,
    title: "Why Shop With Us",
    image: "/lovable-uploads/a4bc5c29-be18-4a8a-8a4c-083acf9b661c.png",
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
  const isMobile = useIsMobile();
  
  // Split items into two columns for mobile
  const leftColumnItems = items.filter((_, idx) => idx % 2 === 0);
  const rightColumnItems = items.filter((_, idx) => idx % 2 === 1);
  
  // For larger screens, show in a regular grid
  const renderMasonryItem = (item: typeof items[0]) => (
    <div 
      key={item.id} 
      className="pin-card hover:shadow-xl transition-all duration-200"
    >
      <div className="relative overflow-hidden rounded-xl">
        <div className="relative">
          <AnimatedImage
            src={item.image}
            alt={item.title}
            className="w-full rounded-xl"
            aspectRatio=""
            objectFit="cover"
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
      
      <div className="mt-2 mb-1 flex justify-between items-start px-1">
        <h3 className="font-medium text-sm">{item.title}</h3>
        <button className="text-lg leading-none opacity-70 hover:opacity-100">•••</button>
      </div>
      {item.sponsor && (
        <p className="text-xs text-gray-500 px-1">
          Sponsored by {item.sponsor}
        </p>
      )}
    </div>
  );

  return (
    <div className="px-2 py-4 md:px-4">
      <h2 className="text-lg font-medium mb-4 px-2">Discover our assortment</h2>
      
      {isMobile ? (
        // Mobile view with two columns and offset for right column
        <div className="flex gap-3 max-w-6xl mx-auto">
          {/* Left column */}
          <div className="w-1/2 flex flex-col gap-3">
            {leftColumnItems.map(renderMasonryItem)}
          </div>
          
          {/* Right column with offset */}
          <div className="w-1/2 flex flex-col gap-3 mt-10">
            {rightColumnItems.map(renderMasonryItem)}
          </div>
        </div>
      ) : (
        // Desktop view with regular grid
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-auto gap-3 max-w-6xl mx-auto">
          {items.map(renderMasonryItem)}
        </div>
      )}
    </div>
  );
};

export default PinterestGrid;
