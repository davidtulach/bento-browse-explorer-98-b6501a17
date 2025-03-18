
export const categorySubcategories: Record<string, string[]> = {
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

export interface BrandMessage {
  title: string;
  description: string;
  imageSrc: string;
  fallbackSrc: string;
}

export const categoryBrandMessages: Record<string, BrandMessage> = {
  'Fruit & Veg': {
    title: 'Fresh from Local Farms',
    description: 'Our fruits and vegetables are sourced from local farmers who share our passion for quality and sustainability.',
    imageSrc: 'https://images.pexels.com/photos/2817549/pexels-photo-2817549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    fallbackSrc: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf',
  },
  'Bakery': {
    title: 'Freshly Baked Daily',
    description: 'Our bakery products are made fresh daily using traditional recipes and quality ingredients.',
    imageSrc: '/lovable-uploads/132e56cb-640b-449f-ba4e-7b0dc9b2b22f.png',
    fallbackSrc: 'https://images.unsplash.com/photo-1509440159596-0249088772ff',
  },
  'Dairy': {
    title: 'Farm to Table',
    description: 'We work with local dairy farms to bring you the freshest milk, cheese, and other dairy products.',
    imageSrc: '/lovable-uploads/b6da379e-12f4-4e03-bea8-4239cf9a1b88.png',
    fallbackSrc: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da',
  },
  'Meat': {
    title: 'Sustainably Sourced',
    description: 'Our meat comes from farms committed to ethical and sustainable practices.',
    imageSrc: '/lovable-uploads/83c57aa5-ad25-4064-bddd-6ddd52e44f91.png',
    fallbackSrc: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f',
  },
  'Drinks': {
    title: 'Refreshment Selection',
    description: 'From sparkling waters to craft sodas, we offer a wide range of beverages for every taste.',
    imageSrc: 'https://images.unsplash.com/photo-1544145945-f90425340c7e',
    fallbackSrc: 'https://images.unsplash.com/photo-1544145945-f90425340c7e',
  },
  'Frozen': {
    title: 'Frozen at Peak Freshness',
    description: 'Our frozen products are flash-frozen at peak freshness to preserve nutrients and flavor.',
    imageSrc: '/lovable-uploads/52102b56-f168-4c24-94b7-056625b16ce4.png',
    fallbackSrc: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb',
  },
  'Snacks': {
    title: 'Perfect Treats',
    description: 'From savory to sweet, our snack selection offers something for every craving.',
    imageSrc: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087',
    fallbackSrc: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087',
  },
  'Household': {
    title: 'Home Essentials',
    description: 'Everything you need to keep your home clean, organized, and comfortable.',
    imageSrc: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f',
    fallbackSrc: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f',
  },
  'Pasta & Rice': {
    title: 'Pantry Staples',
    description: 'Quality pasta and rice for your favorite recipes.',
    imageSrc: 'https://images.unsplash.com/photo-1627286400579-027de47e9e73',
    fallbackSrc: 'https://images.unsplash.com/photo-1627286400579-027de47e9e73',
  },
  'Canned Goods': {
    title: 'Stock Your Pantry',
    description: 'Long-lasting staples to keep on hand for quick and easy meals.',
    imageSrc: 'https://images.unsplash.com/photo-1584263347416-85a696b4eda7',
    fallbackSrc: 'https://images.unsplash.com/photo-1584263347416-85a696b4eda7',
  },
  'Breakfast': {
    title: 'Start Your Day Right',
    description: 'Nutritious and delicious breakfast options to power your morning.',
    imageSrc: 'https://images.unsplash.com/photo-1533089860892-a7c6f10a081a',
    fallbackSrc: 'https://images.unsplash.com/photo-1533089860892-a7c6f10a081a',
  },
  'Condiments': {
    title: 'Flavor Enhancers',
    description: 'Add extra flavor to your meals with our selection of quality condiments.',
    imageSrc: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc',
    fallbackSrc: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc',
  },
  'Baking': {
    title: 'Baking Essentials',
    description: 'Everything you need to create delicious homemade treats.',
    imageSrc: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d',
    fallbackSrc: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d',
  },
  'Health Foods': {
    title: 'Wellness Selection',
    description: 'Nutritious options to support your healthy lifestyle.',
    imageSrc: 'https://images.unsplash.com/photo-1490819312566-8912e9c8a213',
    fallbackSrc: 'https://images.unsplash.com/photo-1490819312566-8912e9c8a213',
  },
  'International': {
    title: 'Global Flavors',
    description: 'Explore cuisines from around the world with our international selection.',
    imageSrc: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2',
    fallbackSrc: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2',
  },
  'Sweets': {
    title: 'Sweet Treats',
    description: 'Indulge your sweet tooth with our selection of candies and chocolates.',
    imageSrc: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f',
    fallbackSrc: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f',
  },
  'Pet Supplies': {
    title: 'For Your Furry Friends',
    description: 'Quality food and supplies for all your pets.',
    imageSrc: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c',
    fallbackSrc: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c',
  },
  'Baby Products': {
    title: 'Baby Care',
    description: 'Everything you need for your little one, from food to care products.',
    imageSrc: 'https://images.unsplash.com/photo-1594824494829-c1655ba0f581',
    fallbackSrc: 'https://images.unsplash.com/photo-1594824494829-c1655ba0f581',
  },
  default: {
    title: 'Quality Products',
    description: 'We carefully select our products to ensure you get the best quality for your money.',
    imageSrc: 'https://images.unsplash.com/photo-1604719312566-8912e9c8a213',
    fallbackSrc: 'https://images.unsplash.com/photo-1604719312566-8912e9c8a213',
  }
};
