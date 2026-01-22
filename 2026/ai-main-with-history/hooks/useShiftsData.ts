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
      if (lang === 'en') {
        setData({ shifts: defaultShifts, layers: defaultLayers, loading: false });
        return;
      }

      setData(prev => ({ ...prev, loading: true }));

      try {
        const response = await fetch(`/content/shifts-${lang}.json`);
        if (response.ok) {
          const content = await response.json();
          setData({
            shifts: content.shifts || defaultShifts,
            layers: content.layers || defaultLayers,
            loading: false
          });
        } else {
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
