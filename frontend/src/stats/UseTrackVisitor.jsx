import { useEffect } from 'react';

export function UseTrackVisitor() {
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/analytics/track-visitor`, {
      method: 'GET',
    }).catch((err) => {
      console.error("Visitor tracking failed:", err);
    });
  }, []);
}
