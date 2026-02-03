import { useState, useEffect } from 'react';

interface ManifestoData {
  title: string;
  subtitle: string;
  content: string;
}

interface ThankYouData {
  title: string;
  subtitle: string;
  content: string;
}

interface ManifestoDataResult {
  manifesto: ManifestoData | null;
  thankYou: ThankYouData | null;
  loading: boolean;
}

export const useManifestoData = (lang: 'en' = 'en'): ManifestoDataResult => {
  const [data, setData] = useState<ManifestoDataResult>({
    manifesto: null,
    thankYou: null,
    loading: true
  });

  useEffect(() => {
    const loadData = async () => {
      setData(prev => ({ ...prev, loading: true }));

      try {
        const basePath = import.meta.env.MODE === 'production' 
          ? (import.meta.env.BASE_URL || '/') 
          : '/';
        const response = await fetch(`${basePath}content/shifts-${lang}.json`);
        if (response.ok) {
          const content = await response.json();
          
          setData({
            manifesto: content.manifesto || null,
            thankYou: content.thankYou || null,
            loading: false
          });
        } else {
          console.warn(`Failed to load ${lang} manifesto/thankYou content`);
          setData({ manifesto: null, thankYou: null, loading: false });
        }
      } catch (error) {
        console.warn(`Failed to load ${lang} manifesto/thankYou content`, error);
        setData({ manifesto: null, thankYou: null, loading: false });
      }
    };

    loadData();
  }, [lang]);

  return data;
};
