
/**
 * Utility function for handling keyboard events to improve accessibility
 * Converts keyboard events (Enter or Space) into click/change events
 */
export const getOnKeyUpCallback = <T extends (...args: any[]) => void>(
  callback: T
): React.KeyboardEventHandler<HTMLElement> => {
  return (event) => {
    // Only trigger on Enter or Space key
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      callback(event);
    }
  };
};
