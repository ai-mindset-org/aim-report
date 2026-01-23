import { useState, useEffect } from 'react';
import { shifts as defaultShifts, layers as defaultLayers, ShiftData, LayerData } from '../components/shiftsData';

interface ShiftsDataResult {
  shifts: ShiftData[];
  layers: LayerData[];
  loading: boolean;
}

export const useShiftsData = (lang: 'en' | 'ru' | 'by' | 'ro' = 'en'): ShiftsDataResult => {
  const [data, setData] = useState<ShiftsDataResult>({
    shifts: defaultShifts,
    layers: defaultLayers,
    loading: false
  });

  useEffect(() => {
    const loadData = async () => {
      setData(prev => ({ ...prev, loading: true }));

      try {
        // In dev mode, public/ files are served at root
        // In production with base: '/aim-report/', they're at /aim-report/
        const basePath = import.meta.env.MODE === 'production' 
          ? (import.meta.env.BASE_URL || '/') 
          : '/';
        
        // Always load from JSON, including English
        const jsonLang = lang === 'en' ? 'en' : lang;
        const response = await fetch(`${basePath}content/shifts-${jsonLang}.json`);
        if (response.ok) {
          const content = await response.json();
          
          // Use shifts from JSON with all data (researchTop, research, aimEvidence, etc.)
          const mergedShifts = (content.shifts || []).map((shift: ShiftData) => {
            return {
              ...shift,
              // Ensure arrays exist
              stats: shift.stats || [],
              researchTop: shift.researchTop || [],
              research: shift.research || [],
              aimEvidence: shift.aimEvidence || [],
              voices: shift.voices || []
            };
          });
          
          setData({
            shifts: mergedShifts,
            layers: content.layers || defaultLayers,
            loading: false
          });
        } else {
          console.warn(`Failed to load ${lang} content, using English`);
          setData({ shifts: defaultShifts, layers: defaultLayers, loading: false });
        }
      } catch (error) {
        console.warn(`Failed to load ${lang} content, using English`, error);
        setData({ shifts: defaultShifts, layers: defaultLayers, loading: false });
      }
    };

    loadData();
  }, [lang]);

  return data;
};
