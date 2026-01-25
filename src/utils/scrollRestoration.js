/**
 * Restore scroll position on navigation
 */
export const restoreScroll = () => {
  // Scroll to top on route change
  window.scrollTo(0, 0);
};

/**
 * Save scroll position (for future use if needed)
 */
export const saveScrollPosition = (key) => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(`scroll_${key}`, window.scrollY.toString());
  }
};

/**
 * Restore saved scroll position
 */
export const restoreScrollPosition = (key) => {
  if (typeof window !== 'undefined') {
    const saved = sessionStorage.getItem(`scroll_${key}`);
    if (saved) {
      window.scrollTo(0, parseInt(saved, 10));
    }
  }
};
