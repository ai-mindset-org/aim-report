import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { SlideData } from '../../types';

export function useSlides() {
  const { i18n } = useTranslation();
  const [slides, setSlides] = useState<SlideData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadContent() {
      try {
        setLoading(true);
        const response = await fetch(`/locales/${i18n.language}/slides.json`);
        
        if (!response.ok) {
          throw new Error(`Failed to load slides: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Add sequential IDs to slides
        const slidesWithIds = data.slides.map((slide: any, index: number) => ({
          ...slide,
          id: index + 1,
        }));
        
        setSlides(slidesWithIds);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setSlides([]);
      } finally {
        setLoading(false);
      }
    }

    loadContent();
  }, [i18n.language]);

  return { slides, loading, error };
}
