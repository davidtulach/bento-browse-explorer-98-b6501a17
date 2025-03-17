
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedImage from './AnimatedImage';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

// Define subcategories for each category
const categorySubcategories = {
  'Fruit & Veg': ['Apples', 'Bananas', 'Berries', 'Citrus', 'Tropical Fruits', 'Salad & Leafy Greens', 'Root Vegetables', 'Herbs'],
  'Bakery': ['Bread', 'Buns & Rolls', 'Cakes', 'Pastries', 'Cookies', 'Gluten-free'],
  'Dairy': ['Milk', 'Cheese', 'Yogurt', 'Butter', 'Cream', 'Plant-based Alternatives'],
  'Meat': ['Beef', 'Pork', 'Chicken', 'Turkey', 'Lamb', 'Sausages', 'Deli Meats'],
  'Drinks': ['Water', 'Soda', 'Juice', 'Coffee', 'Tea', 'Energy Drinks', 'Alcoholic Beverages'],
  'Frozen': ['Ice Cream', 'Frozen Meals', 'Frozen Vegetables', 'Frozen Fruits', 'Pizza', 'Frozen Seafood'],
  'Snacks': ['Chips', 'Crackers', 'Nuts', 'Popcorn', 'Protein Bars', 'Dried Fruits'],
  'Household': ['Cleaning Supplies', 'Laundry', 'Paper Products', 'Bathroom Essentials', 'Kitchen Accessories'],
  'Pasta & Rice': ['Spaghetti', 'Penne', 'Fusilli', 'White Rice', 'Brown Rice', 'Risotto', 'Noodles'],
  'Canned Goods': ['Vegetables', 'Fruits', 'Beans', 'Soups', 'Fish', 'Tomato Products'],
  'Breakfast': ['Cereal', 'Oatmeal', 'Granola', 'Pancake Mix', 'Syrup', 'Breakfast Bars'],
  'Condiments': ['Ketchup', 'Mustard', 'Mayonnaise', 'Salad Dressing', 'Hot Sauce', 'Olive Oil'],
  'Baking': ['Flour', 'Sugar', 'Baking Powder', 'Vanilla Extract', 'Chocolate Chips', 'Decoration'],
  'Health Foods': ['Protein Supplements', 'Vitamins', 'Superfoods', 'Organic Products', 'Gluten-free'],
  'International': ['Asian', 'Mexican', 'Italian', 'Indian', 'Middle Eastern', 'Mediterranean'],
  'Sweets': ['Chocolate', 'Candy', 'Gum', 'Jelly', 'Licorice'],
  'Pet Supplies': ['Dog Food', 'Cat Food', 'Pet Treats', 'Pet Toys', 'Pet Care'],
  'Baby Products': ['Diapers', 'Baby Food', 'Formula', 'Baby Care', 'Baby Accessories'],
};

// Define brand messages for each category
const categoryBrandMessages = {
  'Fruit & Veg': {
    title: 'Fresh from Local Farms',
    description: 'Our fruits and vegetables are sourced from local farmers who share our passion for quality and sustainability.',
    imageSrc: '/lovable-uploads/8b6e7d15-1f15-448b-9910-39864305b594.png',
  },
  'Bakery': {
    title: 'Freshly Baked Daily',
    description: 'Our bakery products are made fresh daily using traditional recipes and quality ingredients.',
    imageSrc: '/lovable-uploads/5cb0fd3c-bc04-49aa-bc80-6aa2d3c36550.png',
  },
  'Dairy': {
    title: 'Farm to Table',
    description: 'We work with local dairy farms to bring you the freshest milk, cheese, and other dairy products.',
    imageSrc: '/lovable-uploads/f6afccdb-a1d0-4123-9b27-53eba8f72c50.png',
  },
  'Meat': {
    title: 'Sustainably Sourced',
    description: 'Our meat comes from farms committed to ethical and sustainable practices.',
    imageSrc: '/lovable-uploads/24478780-f5e1-46bf-ab23-a561b8dbffb5.png',
  },
  'Drinks': {
    title: 'Refreshment Selection',
    description: 'From sparkling waters to craft sodas, we offer a wide range of beverages for every taste.',
    imageSrc: '/lovable-uploads/0ccbc4e9-e89f-461b-ab5e-ff37120e43a9.png',
  },
  'Frozen': {
    title: 'Frozen at Peak Freshness',
    description: 'Our frozen products are flash-frozen at peak freshness to preserve nutrients and flavor.',
    imageSrc: '/lovable-uploads/57df0949-8906-423f-8116-7248ef4503f4.png',
  },
  // Default message for categories without specific content
  default: {
    title: 'Quality Products',
    description: 'We carefully select our products to ensure you get the best quality for your money.',
    imageSrc: '/lovable-uploads/395a1055-a028-4359-9d87-650fd9c29440.png',
  }
};

interface CategoryOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  category: string | null;
}

const CategoryOverlay = ({ isOpen, onClose, category }: CategoryOverlayProps) => {
  const isMobile = useIsMobile();
  
  if (!category) return null;
  
  const subcategories = categorySubcategories[category as keyof typeof categorySubcategories] || [];
  const brandMessage = categoryBrandMessages[category as keyof typeof categoryBrandMessages] || categoryBrandMessages.default;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="bottom" className="h-auto max-h-[70vh] rounded-t-xl p-0">
        <div className="relative pt-6 pb-4 px-4">
          <SheetHeader className="pb-2">
            <SheetTitle className="text-xl">{category}</SheetTitle>
            <SheetClose className="absolute right-4 top-4 rounded-full bg-muted p-2 hover:bg-muted/80">
              <X className="h-5 w-5" />
            </SheetClose>
          </SheetHeader>
          
          <div className="flex flex-col md:flex-row">
            {/* Compact subcategories grid */}
            <div className="flex-grow grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 mb-4 md:mb-0 md:mr-4">
              {subcategories.map((subcat, index) => (
                <button 
                  key={index}
                  className="h-8 px-2 flex items-center justify-center bg-gray-100 rounded-md text-xs font-medium hover:bg-gray-200 transition-colors"
                >
                  {subcat}
                </button>
              ))}
            </div>
            
            {/* Brand message with shorter height for desktop */}
            <div className="w-full md:w-1/4 lg:w-1/5 flex-shrink-0">
              <div className="relative rounded-lg overflow-hidden bg-white shadow">
                <AnimatedImage 
                  src={brandMessage.imageSrc}
                  alt={brandMessage.title}
                  aspectRatio={isMobile ? "aspect-[2/3]" : "aspect-[3/2]"}
                  objectFit="cover"
                  className="w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/70"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <h3 className="font-semibold text-sm md:text-base mb-0.5">{brandMessage.title}</h3>
                  <p className="text-xs text-white/90 mb-1 line-clamp-2">{brandMessage.description}</p>
                  <button className="text-xs font-medium underline">Read more</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CategoryOverlay;
