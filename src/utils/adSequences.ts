export interface AdItem {
  id: number;
  title: string;
  image: string;
  sponsor: string;
}

// Complete ad pool with all available ads
export const adPool: AdItem[] = [
  {
    id: 2001,
    title: "OREA Family Vacation",
    image: "/lovable-uploads/b90c75e1-39bb-481a-a8d7-131c0d91c858.png",
    sponsor: "Orea Hotels"
  },
  {
    id: 2002,
    title: "Kitchin Ketchup",
    image: "/lovable-uploads/6b657181-663d-4e56-addb-92b3cf95f1d5.png",
    sponsor: "Kitchin Foods"
  },
  {
    id: 2003,
    title: "BENU Pharmacy",
    image: "/lovable-uploads/27a390bc-227f-4546-b9a2-ade0f760ebe4.png",
    sponsor: "BENU"
  },
  {
    id: 2004,
    title: "Papp Udia Salmon",
    image: "/lovable-uploads/6d4ec9ca-88b0-41e6-b3ba-6b9f8f8b583d.png",
    sponsor: "Papp Udia"
  },
  {
    id: 2005,
    title: "Yutto Popcorn",
    image: "/lovable-uploads/060fe55a-4aa0-4999-9035-c96987d6340b.png",
    sponsor: "Yutto"
  },
  {
    id: 2006,
    title: "Bio Yutto",
    image: "/lovable-uploads/f00304c3-3a5c-4ea2-889b-98cd736ec664.png",
    sponsor: "Yutto"
  }
];

// Predetermined sequences for each belt
export const topicsBeltSequence: AdItem[] = [
  adPool[0], // OREA
  adPool[1], // Kitchin Ketchup
  adPool[2], // BENU
  adPool[3], // Papp Udia
];

export const ikeaBeltSequence: AdItem[] = [
  adPool[4], // Yutto Popcorn
  adPool[5], // Bio Yutto
  adPool[2], // BENU (reused but in different sequence)
  adPool[1], // Kitchin Ketchup (reused but in different sequence)
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
