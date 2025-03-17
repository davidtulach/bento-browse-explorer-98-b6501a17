
import { useCallback } from 'react';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export function useHapticFeedback() {
  const triggerHaptic = useCallback(async (style: ImpactStyle = ImpactStyle.Light) => {
    try {
      await Haptics.impact({ style });
    } catch (error) {
      console.error('Haptic feedback error:', error);
      // Silently fail if haptics are not available
    }
  }, []);

  return { triggerHaptic };
}
