import React from 'react';
import { X } from 'lucide-react';

interface ContentCard {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  layer: string;
  visual: string;
  keySources: string[];
}

interface ContentCardsProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (slideIndex: number) => void;
  cards: ContentCard[];
  slides: Array<{ title?: string; layout?: string }>;
}

const layerColors: Record<string, string> = {
  'Foundation': 'bg-amber-100 text-amber-900 border-amber-300',
  'Cognition': 'bg-blue-100 text-blue-900 border-blue-300',
  'Interface': 'bg-purple-100 text-purple-900 border-purple-300',
  'Humanity': 'bg-red-100 text-red-900 border-red-300',
};

export const ContentCards: React.FC<ContentCardsProps> = ({ isOpen, onClose, onNavigate, cards, slides }) => {
  if (!isOpen) return null;

  const handleCardClick = (card: ContentCard) => {
    // Find slide by title pattern matching
    const slideIndex = slides.findIndex(slide => {
      if (!slide.title) return false;
      const titleLower = slide.title.toLowerCase();
      const cardTitleLower = card.title.toLowerCase();
      // Match by shift number pattern (e.g., "shift 01" or full title match)
      return titleLower.includes(`shift ${card.number}`) || titleLower === cardTitleLower;
    });
    
    if (slideIndex !== -1) {
      onNavigate(slideIndex);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 no-print">
      <div className="relative w-full max-w-7xl max-h-[90vh] bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl">
        <div className="sticky top-0 z-10 bg-neutral-900 border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">11 Tectonic Shifts</h2>
            <p className="text-sm text-neutral-400 mt-1">navigate by layer and shift</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X size={24} className="text-neutral-400" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card)}
                className="group relative bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 hover:border-red-600 rounded-xl p-5 text-left transition-all hover:shadow-lg hover:shadow-red-900/20 hover:scale-[1.02]"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-red-600 text-white font-mono font-bold text-sm">
                    {card.number}
                  </span>
                  <span className={`px-2 py-1 rounded-md text-xs font-medium border ${layerColors[card.layer]}`}>
                    {card.layer}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-red-400 transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-neutral-400 mb-3">{card.subtitle}</p>
                <p className="text-sm text-neutral-300 mb-4 leading-relaxed">{card.description}</p>

                <div className="pt-3 border-t border-neutral-700">
                  <p className="text-xs text-neutral-500 mb-2">key sources:</p>
                  <div className="flex flex-wrap gap-1">
                    {card.keySources.map((source, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-neutral-900 text-neutral-400 rounded-md"
                      >
                        {source}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
