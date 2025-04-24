
import { useState, useRef, useEffect } from 'react';
import { useHapticFeedback } from '@/hooks/use-haptic';

interface TransitionSettings {
  minimumDisplayTime?: number;
  scrollThreshold?: number;
  enableScrollTriggers?: boolean;
}

export function useContentTransitions(
  itemCount: number,
  isMobile: boolean,
  settings?: TransitionSettings
) {
  const { triggerHaptic } = useHapticFeedback();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isManuallyControlled, setIsManuallyControlled] = useState(false);
  
  const lastScrollY = useRef<number>(0);
  const scrollDirection = useRef<'up' | 'down'>('down');
  const scrollAccumulator = useRef<number>(0);
  const isTransitioning = useRef<boolean>(false);
  const transitionQueue = useRef<number[]>([]);
  const transitionTimer = useRef<number | null>(null);
  const manualControlTimer = useRef<number | null>(null);
  const scrollThrottleTimer = useRef<number | null>(null);
  
  // Default settings
  const minimumDisplayTime = settings?.minimumDisplayTime || 3000;
  const scrollThreshold = settings?.scrollThreshold || 150;
  const enableScrollTriggers = settings?.enableScrollTriggers !== false;

  // Reset transition state and clear timers
  const resetTransitionState = () => {
    if (transitionTimer.current) {
      window.clearTimeout(transitionTimer.current);
      transitionTimer.current = null;
    }
    isTransitioning.current = false;
  };

  // Set content to a specific index manually
  const goToContent = (index: number) => {
    if (index < 0 || index >= itemCount) return;
    
    // Clear existing transition queue
    transitionQueue.current = [];
    resetTransitionState();
    
    // Set manual control flag to temporarily disable scroll triggers
    setIsManuallyControlled(true);
    setActiveIndex(index);
    triggerHaptic();
    
    // Reset manual control after a period of inactivity
    if (manualControlTimer.current) {
      window.clearTimeout(manualControlTimer.current);
    }
    
    manualControlTimer.current = window.setTimeout(() => {
      setIsManuallyControlled(false);
      manualControlTimer.current = null;
    }, minimumDisplayTime * 2);
  };

  // Go to next content item
  const nextContent = () => {
    goToContent((activeIndex + 1) % itemCount);
  };

  // Go to previous content item
  const prevContent = () => {
    goToContent((activeIndex - 1 + itemCount) % itemCount);
  };

  // Process the queue of transitions
  const processTransitionQueue = () => {
    if (transitionQueue.current.length === 0 || isTransitioning.current) {
      isTransitioning.current = false;
      return;
    }

    isTransitioning.current = true;
    const nextIndex = transitionQueue.current.shift();
    
    if (nextIndex !== undefined) {
      setActiveIndex(nextIndex);
      triggerHaptic();
      
      transitionTimer.current = window.setTimeout(() => {
        isTransitioning.current = false;
        processTransitionQueue();
      }, minimumDisplayTime);
    }
  };

  // Handle scroll events to trigger content transitions
  const handleScroll = () => {
    if (!enableScrollTriggers || isManuallyControlled || isMobile === undefined) return;
    
    // Throttle scroll events
    if (scrollThrottleTimer.current) return;
    
    scrollThrottleTimer.current = window.setTimeout(() => {
      scrollThrottleTimer.current = null;
    }, 50);
    
    const currentScrollY = window.scrollY;
    const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);
    
    if (scrollDelta > 5) {
      // Determine scroll direction
      const direction = currentScrollY > lastScrollY.current ? 'down' : 'up';
      
      // Reset accumulator if direction changed
      if (direction !== scrollDirection.current) {
        scrollDirection.current = direction;
        scrollAccumulator.current = 0;
      }
      
      scrollAccumulator.current += scrollDelta;
      
      // Trigger content transition if threshold is reached
      if (scrollAccumulator.current >= scrollThreshold) {
        scrollAccumulator.current = 0;
        
        // Calculate next index based on scroll direction
        const nextIndex = direction === 'down' 
          ? (activeIndex + 1) % itemCount 
          : (activeIndex - 1 + itemCount) % itemCount;
        
        if (!transitionQueue.current.includes(nextIndex)) {
          transitionQueue.current.push(nextIndex);
          processTransitionQueue();
        }
      }
      
      lastScrollY.current = currentScrollY;
    }
  };

  // Set up scroll event handler
  useEffect(() => {
    if (enableScrollTriggers) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      lastScrollY.current = window.scrollY; // Initialize scroll position
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        
        if (transitionTimer.current) {
          window.clearTimeout(transitionTimer.current);
        }
        
        if (manualControlTimer.current) {
          window.clearTimeout(manualControlTimer.current);
        }
        
        if (scrollThrottleTimer.current) {
          window.clearTimeout(scrollThrottleTimer.current);
        }
      };
    }
  }, [activeIndex, isMobile, enableScrollTriggers, itemCount]);

  return {
    activeIndex,
    goToContent,
    nextContent,
    prevContent,
    isManuallyControlled
  };
}
