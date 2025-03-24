
import { cn } from '@/lib/utils';
import AnimatedImage from './AnimatedImage';
import { useIsMobile } from '@/hooks/use-mobile';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

const items = [
  {
    id: 1,
    title: "BIO Fruits & Veggies",
    image: "/lovable-uploads/8b6e7d15-1f15-448b-9910-39864305b594.png",
    tag: "Organic",
    marketingHook: "Nourish your body with garden-fresh organic produce",
    featuredProducts: ["Organic Avocados", "Fresh Strawberries", "Baby Spinach"],
    brandMessage: "Supporting local farmers with sustainable practices",
  },
  {
    id: 2,
    title: "Discover Premium",
    image: "/lovable-uploads/0ccbc4e9-e89f-461b-ab5e-ff37120e43a9.png",
    tag: "Premium",
    marketingHook: "Elevate your everyday meals with premium ingredients",
    featuredProducts: ["Artisanal Cheeses", "Aged Balsamic Vinegar"],
    brandMessage: "Curated selection from award-winning producers",
  },
  {
    id: 3,
    title: "Weekend Discount: Fresh Bread",
    image: "/lovable-uploads/d6fe3ce3-ccf0-4750-92b2-78904cbdd8a1.png", // Updated bread image
    tag: "Discount",
    marketingHook: "Warm, fresh-baked bread at special weekend prices",
    featuredProducts: ["Sourdough Loaf", "Multigrain Baguette"],
    brandMessage: "25% off all artisan breads this weekend only!",
  },
  {
    id: 4,
    title: "Freshly Picked Near You",
    image: "/lovable-uploads/2ebf8da3-5721-4b76-9570-3586cad057cc.png", // Updated veggies image
    tag: "Premium",
    marketingHook: "From farm to table in under 24 hours",
    featuredProducts: ["Heirloom Tomatoes", "Sweet Corn"],
    brandMessage: "Supporting farms within 50 miles of your location",
  },
  {
    id: 5,
    title: "Shopping Lists",
    image: "/lovable-uploads/d6ee2bf5-680d-4701-afbf-6a284aa69456.png",
    tag: "New",
    marketingHook: "Organize your shopping with smart lists and reminders",
    featuredProducts: ["Weekly Essentials", "Party Planning"],
    brandMessage: "Save time and never forget an item again",
  },
  {
    id: 6,
    title: "Fresh Farm Poultry",
    image: "/lovable-uploads/d95bfd46-5d77-465d-b281-41e43d4b6d4b.png", // Updated poultry image
    tag: "New",
    marketingHook: "Discover 5 ways to prepare farm-fresh chicken",
    featuredProducts: ["Free-range Chicken", "Duck Breast"],
    brandMessage: "Ethically raised with no antibiotics or hormones",
  },
  {
    id: 7,
    title: "Your Banking ad",
    image: "https://images.unsplash.com/photo-1559589689-577aabd1db4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=600&q=80",
    tag: "Ad",
    sponsor: "Costa Coffee",
    marketingHook: "Simplified banking for your everyday needs",
    featuredProducts: ["Mobile Banking App", "No-fee Checking"],
    brandMessage: "Sponsored: Banking made simple",
  },
  {
    id: 8,
    title: "Why Shop With Us",
    image: "/lovable-uploads/a4bc5c29-be18-4a8a-8a4c-083acf9b661c.png",
    tag: "Ad",
    sponsor: "Eco Clean",
    marketingHook: "Discover the benefits of shopping sustainably",
    featuredProducts: ["Eco Rewards Program", "Carbon-neutral Delivery"],
    brandMessage: "Join over 1 million eco-conscious shoppers",
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
      {isMobile ? (
        // Mobile view - no hover effects
        <div className="relative overflow-hidden rounded-xl">
          <div className="relative">
            <AnimatedImage
              src={item.image}
              alt={item.title}
              className="w-full"
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
      ) : (
        // Desktop view - with hover card
        <HoverCard openDelay={300} closeDelay={100}>
          <HoverCardTrigger asChild>
            <div className="relative overflow-hidden group">
              <div className="relative">
                <AnimatedImage
                  src={item.image}
                  alt={item.title}
                  className="w-full group-hover:scale-105 transition-transform duration-300"
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
          </HoverCardTrigger>
          <HoverCardContent className="w-72 p-4 bg-white/95 backdrop-blur-sm border border-gray-200 shadow-lg">
            <div className="space-y-2">
              <h3 className="font-semibold text-base">{item.title}</h3>
              {item.marketingHook && (
                <p className="text-sm text-gray-700">{item.marketingHook}</p>
              )}
              {item.featuredProducts && item.featuredProducts.length > 0 && (
                <div className="pt-1">
                  <p className="text-xs font-medium text-gray-500 mb-1">Featured:</p>
                  <div className="flex flex-wrap gap-1">
                    {item.featuredProducts.map((product, idx) => (
                      <span key={idx} className="inline-block px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs">
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {item.brandMessage && (
                <p className="text-xs italic text-gray-600 pt-1">{item.brandMessage}</p>
              )}
              {item.sponsor && (
                <p className="text-xs text-gray-500 pt-1">
                  Sponsored by {item.sponsor}
                </p>
              )}
            </div>
          </HoverCardContent>
        </HoverCard>
      )}
      
      <div className="mt-1 mb-1 flex justify-between items-start px-1">
        <h3 className="font-medium text-xs">{item.title}</h3>
        <button className="text-sm leading-none opacity-70 hover:opacity-100">•••</button>
      </div>
      {item.sponsor && (
        <p className="text-xs text-gray-500 px-1">
          Sponsored by {item.sponsor}
        </p>
      )}
    </div>
  );

  return (
    <div className="px-2 py-2 md:px-2">
      <h2 className="text-lg font-medium mb-3 px-2">Our best offers</h2>
      
      {isMobile ? (
        // Mobile view with two columns and offset for right column
        <div className="flex gap-2 max-w-6xl mx-auto">
          {/* Left column */}
          <div className="w-1/2 flex flex-col gap-2">
            {leftColumnItems.map(renderMasonryItem)}
          </div>
          
          {/* Right column with offset */}
          <div className="w-1/2 flex flex-col gap-2 mt-10">
            {rightColumnItems.map(renderMasonryItem)}
          </div>
        </div>
      ) : (
        // Desktop view with compact grid (more columns, smaller gap)
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 max-w-6xl mx-auto">
          {items.map(renderMasonryItem)}
        </div>
      )}
    </div>
  );
};

export default PinterestGrid;
