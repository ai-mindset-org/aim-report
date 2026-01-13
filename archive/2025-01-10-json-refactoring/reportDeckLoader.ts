import type { SlideData } from '../types';

type Section = { title: string; startSlide: number };

let cachedSlides: SlideData[] | null = null;
let cachedSections: Section[] | null = null;

export async function loadReportDeck(locale: string = 'en'): Promise<{
  slides: SlideData[];
  sections: Section[];
}> {
  try {
    // Load slides
    const slidesResponse = await fetch(`/locales/${locale}/slides.json`);
    if (!slidesResponse.ok) {
      throw new Error('Failed to load slides');
    }
    const slidesData = await slidesResponse.json();
    
    // Add sequential IDs
    const slides = slidesData.slides.map((slide: any, index: number) => ({
      ...slide,
      id: index + 1,
    }));

    // Load sections (with fallback to default)
    let sections: Section[] = [
      { title: 'intro', startSlide: 0 },
      { title: '11 shifts', startSlide: 6 },
    ];

    try {
      const sectionsResponse = await fetch(`/locales/${locale}/sections.json`);
      if (sectionsResponse.ok) {
        const sectionsData = await sectionsResponse.json();
        sections = sectionsData.sections || sections;
      }
    } catch (e) {
      console.warn('Sections not found, using defaults');
    }

    cachedSlides = slides;
    cachedSections = sections;

    return { slides, sections };
  } catch (error) {
    console.error('Error loading report deck:', error);
    
    // Fallback to hardcoded data if JSON fails
    if (cachedSlides && cachedSections) {
      return { slides: cachedSlides, sections: cachedSections };
    }
    
    // Return empty fallback
    return { 
      slides: [], 
      sections: [
        { title: 'intro', startSlide: 0 },
        { title: '11 shifts', startSlide: 6 },
      ] 
    };
  }
}

export function getCachedDeck(): { slides: SlideData[]; sections: Section[] } | null {
  if (cachedSlides && cachedSections) {
    return { slides: cachedSlides, sections: cachedSections };
  }
  return null;
}
