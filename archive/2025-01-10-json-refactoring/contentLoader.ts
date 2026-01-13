import type { SlideData } from '../types';

export async function loadSlides(locale: string = 'en'): Promise<SlideData[]> {
  try {
    const response = await fetch(`/locales/${locale}/slides.json`);
    if (!response.ok) {
      throw new Error(`Failed to load slides for locale ${locale}`);
    }
    const data = await response.json();
    return data.slides || [];
  } catch (error) {
    console.error('Error loading slides:', error);
    return [];
  }
}

export async function loadSections(locale: string = 'en'): Promise<Array<{ title: string; startSlide: number }>> {
  try {
    const response = await fetch(`/locales/${locale}/sections.json`);
    if (!response.ok) {
      throw new Error(`Failed to load sections for locale ${locale}`);
    }
    const data = await response.json();
    return data.sections || [];
  } catch (error) {
    console.error('Error loading sections:', error);
    return [];
  }
}
