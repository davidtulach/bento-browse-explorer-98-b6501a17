
import React, { createContext, useContext, useState } from 'react';
import type { CarouselApi } from '@/components/ui/carousel';

interface TopicsContextType {
  currentSlide: number;
  setCurrentSlide: (slide: number) => void;
  api: CarouselApi | null;
  setApi: (api: CarouselApi | null) => void;
}

const TopicsContext = createContext<TopicsContextType | undefined>(undefined);

export function TopicsProvider({ children }: { children: React.ReactNode }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState<CarouselApi | null>(null);

  return (
    <TopicsContext.Provider value={{ currentSlide, setCurrentSlide, api, setApi }}>
      {children}
    </TopicsContext.Provider>
  );
}

export function useTopics() {
  const context = useContext(TopicsContext);
  if (context === undefined) {
    throw new Error('useTopics must be used within a TopicsProvider');
  }
  return context;
}
