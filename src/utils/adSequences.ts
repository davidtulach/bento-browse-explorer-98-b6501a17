
export interface AdItem {
  id: number;
  title: string;
  image: string;
  sponsor: string;
}

// Complete ad pool with all available ads
export const adPool: AdItem[] = [
  // Original ads
  {
    id: 1021,
    title: "Viladomy Pitkovic",
    image: "/lovable-uploads/90f118dd-41bc-482c-98b0-3763799f43e1.png",
    sponsor: "Central Group"
  },
  {
    id: 1022,
    title: "Partners Banka",
    image: "/lovable-uploads/ae63401e-b7d6-4f1f-817d-2c379b21bd15.png",
    sponsor: "Partners Banka"
  },
  {
    id: 1041,
    title: "Misa Ice Cream",
    image: "/lovable-uploads/d136c32a-fa95-4a02-ac7a-ca96bdad4f58.png",
    sponsor: "Misa"
  },
  {
    id: 1042,
    title: "U-mai Caviar",
    image: "/lovable-uploads/80409ac3-087c-453d-a031-d3dc5358c401.png",
    sponsor: "U-mai"
  },
  // New ads
  {
    id: 2001,
    title: "Orea Family Vacation",
    image: "/lovable-uploads/5e135883-52db-4451-b69d-b7abc32c058d.png",
    sponsor: "Orea Hotels"
  },
  {
    id: 2002,
    title: "Kitchin Ketchup",
    image: "/lovable-uploads/395a1055-a028-4359-9d87-650fd9c29440.png",
    sponsor: "Kitchin Foods"
  },
  {
    id: 2003,
    title: "Kitchin Premium Sauce",
    image: "/lovable-uploads/93315171-35f2-45a1-9399-e3f088c074fc.png",
    sponsor: "Kitchin Foods"
  },
  {
    id: 2004,
    title: "BENU Pharmacy",
    image: "/lovable-uploads/8b6e7d15-1f15-448b-9910-39864305b594.png",
    sponsor: "BENU"
  },
  {
    id: 2005,
    title: "Papp Udia Salmon",
    image: "/lovable-uploads/57df0949-8906-423f-8116-7248ef4503f4.png",
    sponsor: "Papp Udia"
  }
];

// Predetermined sequences for each belt
export const topicsBeltSequence: AdItem[] = [
  adPool[0], // Viladomy Pitkovic
  adPool[4], // Orea Family Vacation
  adPool[1], // Partners Banka
  adPool[5], // Kitchin Ketchup
  adPool[2], // Misa Ice Cream
  adPool[7], // BENU Pharmacy
  adPool[3], // U-mai Caviar
  adPool[6]  // Kitchin Premium Sauce
];

export const ikeaBeltSequence: AdItem[] = [
  adPool[4], // Orea Family Vacation
  adPool[0], // Viladomy Pitkovic
  adPool[6], // Kitchin Premium Sauce
  adPool[1], // Partners Banka
  adPool[8], // Papp Udia Salmon
  adPool[2], // Misa Ice Cream
  adPool[7], // BENU Pharmacy
  adPool[3]  // U-mai Caviar
];

// Helper function to get next ad from a sequence
export const getNextAd = (sequence: AdItem[], currentIndex: number, direction: 'next' | 'prev'): { ad: AdItem; index: number } => {
  const sequenceLength = sequence.length;
  let newIndex;
  
  if (direction === 'next') {
    newIndex = (currentIndex + 1) % sequenceLength;
  } else {
    newIndex = (currentIndex - 1 + sequenceLength) % sequenceLength;
  }
  
  return { ad: sequence[newIndex], index: newIndex };
};
