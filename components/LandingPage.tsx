import React, { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hero } from './landing/Hero';
import { PinnedSVGSection } from './landing/PinnedSVGSection';
import { VariableTextSection } from './landing/VariableTextSection';

// Register globally
gsap.registerPlugin(ScrollTrigger);

export const LandingPage: React.FC = () => {
  
  useLayoutEffect(() => {
    // Force a refresh once on mount to ensure all start/end positions are calculated correctly
    ScrollTrigger.refresh();
  }, []);

  return (
    <main className="w-full h-full overflow-x-hidden bg-black">
      <Hero />
      <VariableTextSection />
      <PinnedSVGSection />
    </main>
  );
};
