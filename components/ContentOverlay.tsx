import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Layers } from 'lucide-react';
import { VisualMetaphor } from './VisualMetaphors';
import type { SlideData } from '../types';

interface ContentOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (slideIndex: number) => void;
  currentSlide: number;
  slides: SlideData[];
}

interface ShiftCard {
  number: number;
  title: string;
  slideTitle: string; // Actual title in slides.md to search for
  layer: string;
  layerNumber: number;
  description: string;
  visual: string;
}

const shifts: ShiftCard[] = [
  {
    number: 1,
    title: 'The Energy Wall',
    slideTitle: 'shift 01: chip supply ➔ power supply',
    layer: 'foundation',
    layerNumber: 1,
    description: 'AI infrastructure hits physical limits',
    visual: 'battery'
  },
  {
    number: 2,
    title: 'Agentic Labor',
    slideTitle: 'shift 02: copilot ➔ autonomous coworker',
    layer: 'foundation',
    layerNumber: 1,
    description: 'AI agents get wallets and autonomy',
    visual: 'factory'
  },
  {
    number: 3,
    title: 'Sovereignty Fragments',
    slideTitle: 'shift 03: global openness ➔ fragmented stacks',
    layer: 'foundation',
    layerNumber: 1,
    description: 'Regional AI divergence by region',
    visual: 'globe'
  },
  {
    number: 4,
    title: 'Reasoning Over Speed',
    slideTitle: 'shift 04: chatbots (system 1) ➔ thinking models (system 2)',
    layer: 'cognition',
    layerNumber: 2,
    description: 'From System 1 to System 2 thinking',
    visual: 'audit'
  },
  {
    number: 5,
    title: 'Context Explosion',
    slideTitle: 'shift 05: information hoarding ➔ context filtering',
    layer: 'cognition',
    layerNumber: 2,
    description: 'Information abundance creates scarcity',
    visual: 'tangle'
  },
  {
    number: 6,
    title: 'Synthetic Data Flood',
    slideTitle: 'shift 06: information retrieval ➔ hypothesis generation',
    layer: 'cognition',
    layerNumber: 2,
    description: 'AI training on AI output',
    visual: 'loop'
  },
  {
    number: 7,
    title: 'Code at Scale',
    slideTitle: 'shift 07: syntax ➔ vibe coding & integrity crisis',
    layer: 'interface',
    layerNumber: 3,
    description: 'From coding to orchestration',
    visual: 'pen'
  },
  {
    number: 8,
    title: 'On-Device Privacy',
    slideTitle: 'shift 08: on-device models ↔ privacy as status',
    layer: 'interface',
    layerNumber: 3,
    description: 'Local models and sovereignty',
    visual: 'shield'
  },
  {
    number: 9,
    title: 'Cognitive Warfare',
    slideTitle: 'shift 09: cybersecurity ➔ cognitive warfare',
    layer: 'interface',
    layerNumber: 3,
    description: 'Deepfakes and trust collapse',
    visual: 'mask'
  },
  {
    number: 10,
    title: 'Ideological Filters',
    slideTitle: 'shift 10: hallucination ➔ ideological filters',
    layer: 'humanity',
    layerNumber: 4,
    description: 'Constitutional AI and alignment',
    visual: 'filter'
  },
  {
    number: 11,
    title: 'Synthetic Intimacy',
    slideTitle: 'shift 11: tool ➔ emotional companion',
    layer: 'humanity',
    layerNumber: 4,
    description: 'AI companions and emotional attachment',
    visual: 'whisper'
  }
];

const layerColors = {
  foundation: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
  cognition: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
  interface: 'from-orange-500/20 to-orange-600/20 border-orange-500/30',
  humanity: 'from-red-500/20 to-red-600/20 border-red-500/30'
};

const layerTextColors = {
  foundation: 'text-blue-400',
  cognition: 'text-purple-400',
  interface: 'text-orange-400',
  humanity: 'text-red-400'
};

export const ContentOverlay: React.FC<ContentOverlayProps> = ({
  isOpen,
  onClose,
  onNavigate,
  currentSlide,
  slides
}) => {
  // Find slide index by title
  const findSlideIndex = (slideTitle: string): number => {
    const index = slides.findIndex(s => 
      s.title?.toLowerCase().trim() === slideTitle.toLowerCase().trim()
    );
    return index >= 0 ? index : 0;
  };

  const groupedByLayer = shifts.reduce((acc, shift) => {
    if (!acc[shift.layer]) acc[shift.layer] = [];
    acc[shift.layer].push(shift);
    return acc;
  }, {} as Record<string, ShiftCard[]>);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay with backdrop and content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          >
            <div className="min-h-screen px-4 py-12 md:px-8 md:py-16">
              <div
                className="max-w-7xl mx-auto bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-800"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="sticky top-0 bg-neutral-900/95 backdrop-blur border-b border-neutral-800 p-6 md:p-8 rounded-t-2xl z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Layers className="text-red-500" size={24} />
                        <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                          Content Navigation
                        </span>
                      </div>
                      <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
                        11 Tectonic Shifts
                      </h1>
                      <p className="text-neutral-400 mt-2 text-lg">
                        machines ↔ humans across 4 layers
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className="p-2 rounded-lg hover:bg-neutral-800 transition-colors text-neutral-400 hover:text-white"
                      aria-label="Close"
                    >
                      <X size={24} />
                    </button>
                  </div>
                </div>

                {/* Intro Pages Section */}
                <div className="p-6 md:p-8 border-b border-neutral-800">
                  <div className="mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-white">Intro</h2>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {(() => {
                      const introPages = [
                        { title: 'the context gap', search: 'the context gap' },
                        { title: '11 tectonic shifts', search: '11 tectonic shifts' }
                      ];
                      return introPages.map((page, i) => {
                        const slideIdx = slides.findIndex(s => s.title?.toLowerCase().includes(page.search.toLowerCase()));
                        if (slideIdx === -1) return null;
                        return (
                          <motion.button
                            key={i}
                            onClick={() => {
                              onNavigate(slideIdx);
                              onClose();
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`
                              p-4 rounded-lg border border-neutral-700 bg-neutral-800/50
                              hover:border-red-500/50 hover:bg-neutral-800 transition-all text-left
                              ${currentSlide === slideIdx ? 'ring-2 ring-red-500 bg-neutral-800' : ''}
                            `}
                          >
                            <div className="text-sm font-semibold text-white">{page.title}</div>
                          </motion.button>
                        );
                      });
                    })()}
                  </div>
                </div>

                {/* Content by Layer */}
                <div className="p-6 md:p-8 space-y-12">
                  {Object.entries(groupedByLayer).map(([layer, layerShifts]) => (
                    <div key={layer}>
                      {/* Layer Header */}
                      <div className="mb-6">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`text-xs font-mono uppercase tracking-wider ${layerTextColors[layer as keyof typeof layerTextColors]}`}>
                            Layer {layerShifts[0].layerNumber}
                          </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white capitalize">
                          {layer}
                        </h2>
                      </div>

                      {/* Shift Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {layerShifts.map((shift) => {
                          const slideIndex = findSlideIndex(shift.slideTitle);
                          return (
                            <motion.button
                              key={shift.number}
                              onClick={() => {
                                onNavigate(slideIndex);
                                onClose();
                              }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`
                                relative overflow-hidden rounded-xl border p-6
                                bg-gradient-to-br ${layerColors[layer as keyof typeof layerColors]}
                                hover:border-opacity-60 transition-all text-left
                                ${currentSlide === slideIndex ? 'ring-2 ring-red-500' : ''}
                              `}
                            >
                            {/* Visual Metaphor */}
                            <div className="absolute top-4 right-4 w-12 h-12 opacity-20">
                              <VisualMetaphor type={shift.visual as any} slideId={shift.number} />
                            </div>

                            {/* Shift Number */}
                            <div className="text-6xl font-black text-white/10 absolute bottom-2 right-4">
                              {String(shift.number).padStart(2, '0')}
                            </div>

                            {/* Content */}
                            <div className="relative z-10">
                              <div className="flex items-center gap-2 mb-3">
                                <span className={`text-xs font-mono uppercase tracking-wider ${layerTextColors[layer as keyof typeof layerTextColors]}`}>
                                  Shift {shift.number}
                                </span>
                              </div>
                              <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                                {shift.title}
                              </h3>
                              <p className="text-sm text-neutral-400 leading-relaxed">
                                {shift.description}
                              </p>
                            </div>
                          </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Ending Pages Section */}
                <div className="p-6 md:p-8 border-t border-neutral-800">
                  <div className="mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-white">Closing</h2>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {(() => {
                      const endingPages = [
                        { title: 'machines ↔ humans: the summary', search: 'machines ↔ humans: the summary' },
                        { title: 'field signals', search: 'field signals' },
                        { title: 'about ai mindset', search: 'about ai mindset' },
                        { title: 'thank you', search: 'thank you' }
                      ];
                      return endingPages.map((page, i) => {
                        const slideIdx = slides.findIndex(s => s.title?.toLowerCase().includes(page.search.toLowerCase()));
                        if (slideIdx === -1) return null;
                        return (
                          <motion.button
                            key={i}
                            onClick={() => {
                              onNavigate(slideIdx);
                              onClose();
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`
                              p-4 rounded-lg border border-neutral-700 bg-neutral-800/50
                              hover:border-red-500/50 hover:bg-neutral-800 transition-all text-left
                              ${currentSlide === slideIdx ? 'ring-2 ring-red-500 bg-neutral-800' : ''}
                            `}
                          >
                            <div className="text-sm font-semibold text-white">{page.title}</div>
                          </motion.button>
                        );
                      });
                    })()}
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-neutral-800 p-6 md:p-8 bg-neutral-900/50">
                  <p className="text-sm text-neutral-500 text-center">
                    Press <kbd className="px-2 py-1 bg-neutral-800 rounded text-neutral-300 font-mono text-xs">ESC</kbd> to close
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
