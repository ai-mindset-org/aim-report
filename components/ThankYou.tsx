import React, { useLayoutEffect, useRef, useCallback } from 'react';
import { gsap } from '../lib/gsap-config';

// Core team
const coreTeam = [
  { name: 'anca stavenski', role: 'Design & Logic' },
  { name: 'alexander povaliaev', role: 'Ideation' },
  { name: 'ray svitla', role: 'Research' },
];

// Thought leaders cited in the report
const thoughtLeaders = [
  { name: 'dario amodei', role: 'CEO, Anthropic' },
  { name: 'marc andreessen', role: 'a16z, Techno-Optimist Manifesto' },
  { name: 'leopold aschenbrenner', role: 'Situational Awareness' },
  { name: 'sam altman', role: 'CEO, OpenAI' },
  { name: 'satya nadella', role: 'CEO, Microsoft' },
  { name: 'yann lecun', role: 'Chief AI Scientist, Meta' },
  { name: 'kyle vogt', role: 'Robotics Pioneer' },
  { name: 'alexey ivanov', role: 'IFS + AI Framework' },
  { name: 'mike yan', role: 'Intention OS' },
  { name: 'stepan | e/acc gershuni', role: 'Effective Accelerationism' },
];

// Community contributors who shared their voices
const communityVoices = [
  { name: 'yakov vasiliev', role: 'AI Strategy × Product Architecture' },
  { name: 'natalya savenkova', role: 'Project Lead → Product Automation' },
  { name: 'alexander stashenko', role: 'Business Coach → AI Chatbot Developer' },
  { name: 'nikolay senin', role: 'Developer & Consultant' },
  { name: 'r_om', role: 'IT Education Executive' },
  { name: 'evgeniy', role: 'IT Integrator Marketing' },
  { name: 'ml engineer', role: 'Aviasales' },
  { name: 'senior developer', role: '15+ Years Experience' },
  { name: 'sergey khabarov', role: 'AI Mindset Community' },
];

interface ThankYouProps {
  theme?: 'dark' | 'light';
  onPrev?: () => void;
}

export const ThankYou: React.FC<ThankYouProps> = ({ theme = 'dark', onPrev }) => {
  const isDark = theme === 'dark';
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTweenRef = useRef<gsap.core.Tween | null>(null);
  const scrollVelocityRef = useRef(0);
  const baseSpeedRef = useRef(1);
  const rafRef = useRef<number | null>(null);

  const bgMain = isDark ? 'bg-[#050505]' : 'bg-[#F4F4F5]';
  const textMain = isDark ? 'text-white' : 'text-neutral-900';
  const textSecondary = isDark ? 'text-neutral-600' : 'text-neutral-500';

  // Handle wheel events for scroll acceleration
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();

    // Add velocity based on scroll direction and intensity
    // Positive deltaY = scroll down = accelerate credits (scroll up faster)
    const scrollMultiplier = 0.015; // Sensitivity factor
    const maxVelocity = 8; // Maximum speed multiplier

    scrollVelocityRef.current += e.deltaY * scrollMultiplier;
    scrollVelocityRef.current = Math.max(-2, Math.min(maxVelocity, scrollVelocityRef.current));
  }, []);

  // Smooth velocity decay and tween speed update
  const updateScrollSpeed = useCallback(() => {
    // Apply velocity to base speed with smooth interpolation
    const targetSpeed = baseSpeedRef.current + scrollVelocityRef.current;

    // Decay velocity smoothly back to 0
    scrollVelocityRef.current *= 0.95;

    // Stop decay when very small
    if (Math.abs(scrollVelocityRef.current) < 0.01) {
      scrollVelocityRef.current = 0;
    }

    // Update tween timeScale for smooth speed changes
    if (scrollTweenRef.current) {
      const currentScale = scrollTweenRef.current.timeScale();
      const newScale = Math.max(0.1, targetSpeed); // Minimum speed to prevent stopping
      // Smooth interpolation for fluid feel
      scrollTweenRef.current.timeScale(currentScale + (newScale - currentScale) * 0.15);
    }

    rafRef.current = requestAnimationFrame(updateScrollSpeed);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Title fade in - quick
      gsap.from(".thank-title", {
        opacity: 0,
        y: 10,
        duration: 0.4,
        ease: "power2.out"
      });

      // Credits scroll - starts immediately from below, scrolls up
      const scrollContent = document.querySelector('.credits-scroll-content');
      const scrollContainer = document.querySelector('.credits-container');

      if (scrollContent && scrollContainer) {
        const contentHeight = (scrollContent as HTMLElement).scrollHeight;
        const containerHeight = (scrollContainer as HTMLElement).offsetHeight;

        // Start with "Created By" visible in the middle of the screen
        gsap.set(scrollContent, { y: containerHeight * 0.5 });

        // Scroll up through the container - starts immediately
        scrollTweenRef.current = gsap.to(scrollContent, {
          y: -contentHeight,
          duration: 28, // Slightly faster base duration
          ease: "none",
          repeat: -1
        });
      }
    }, containerRef);

    // Add wheel listener for scroll acceleration
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    // Start the velocity update loop
    rafRef.current = requestAnimationFrame(updateScrollSpeed);

    return () => {
      ctx.revert();
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleWheel, updateScrollSpeed]);

  return (
    <section ref={containerRef} className={`relative w-full h-screen ${bgMain} ${textMain} flex flex-col overflow-hidden font-sans`}>

        {/* TITLE - top */}
        <div className="thank-title text-center pt-20 md:pt-12 pb-6 relative z-20">
            <h1 className={`text-[12vw] md:text-[7rem] font-black leading-[0.85] tracking-tighter uppercase select-none ${textMain}`}>
                Thank You
            </h1>
            <p className={`font-mono ${textSecondary} text-[10px] uppercase tracking-[0.3em] mt-3`}>
                The Context Gap · Annual Report 2025
            </p>
        </div>

        {/* SCROLLING CREDITS - middle, fills space */}
        <div className="credits-container flex-1 w-full max-w-2xl mx-auto relative overflow-hidden">

          {/* Top fade - content disappears into */}
          <div className={`absolute top-0 left-0 right-0 h-[30%] z-10 pointer-events-none`}
               style={{background: isDark
                 ? 'linear-gradient(to bottom, #050505 0%, #050505 30%, rgba(5,5,5,0) 100%)'
                 : 'linear-gradient(to bottom, #F4F4F5 0%, #F4F4F5 30%, rgba(244,244,245,0) 100%)'}}></div>

          {/* Bottom fade - content emerges from */}
          <div className={`absolute bottom-0 left-0 right-0 h-[40%] z-10 pointer-events-none`}
               style={{background: isDark
                 ? 'linear-gradient(to top, #050505 0%, #050505 50%, rgba(5,5,5,0) 100%)'
                 : 'linear-gradient(to top, #F4F4F5 0%, #F4F4F5 50%, rgba(244,244,245,0) 100%)'}}></div>

          {/* Scrolling content */}
          <div className="credits-scroll-content flex flex-col items-center gap-3 px-6">

            {/* Core Team */}
            <div className={`font-mono text-[9px] text-[#DC2626] uppercase tracking-[0.4em] mt-8 mb-2`}>
              — Created By —
            </div>
            {coreTeam.map((person, i) => (
              <div key={`core-${i}`} className="text-center mb-1">
                <p className="text-lg md:text-xl font-bold text-[#DC2626] tracking-tight">{person.name}</p>
                <p className={`font-mono text-[9px] ${textSecondary} uppercase tracking-widest`}>{person.role}</p>
              </div>
            ))}

            {/* Divider */}
            <div className={`w-10 h-px ${isDark ? 'bg-white/20' : 'bg-black/20'} my-4`}></div>

            {/* Thought Leaders */}
            <div className={`font-mono text-[9px] ${textSecondary} uppercase tracking-[0.4em] mb-2`}>
              — Thought Leaders —
            </div>
            {thoughtLeaders.map((person, i) => (
              <div key={`tl-${i}`} className="text-center mb-1">
                <p className={`text-sm md:text-base font-medium ${textMain} tracking-tight`}>{person.name}</p>
                <p className={`font-mono text-[8px] ${textSecondary} uppercase tracking-widest`}>{person.role}</p>
              </div>
            ))}

            {/* Divider */}
            <div className={`w-10 h-px ${isDark ? 'bg-white/20' : 'bg-black/20'} my-4`}></div>

            {/* Community Voices */}
            <div className={`font-mono text-[9px] ${textSecondary} uppercase tracking-[0.4em] mb-2`}>
              — Community Voices —
            </div>
            {communityVoices.map((person, i) => (
              <div key={`cv-${i}`} className="text-center mb-1">
                <p className={`text-sm md:text-base font-medium ${textMain} tracking-tight`}>{person.name}</p>
                <p className={`font-mono text-[8px] ${textSecondary} uppercase tracking-widest`}>{person.role}</p>
              </div>
            ))}

            {/* Divider */}
            <div className={`w-10 h-px ${isDark ? 'bg-white/20' : 'bg-black/20'} my-4`}></div>

            {/* Final - AI Mindset */}
            <div className="text-center my-6">
              <p className={`font-mono text-[9px] ${textSecondary} uppercase tracking-[0.3em] mb-3`}>
                2025
              </p>
              <p className={`text-2xl md:text-3xl font-black text-[#DC2626] uppercase tracking-tight`}>
                AI Mindset
              </p>
            </div>

            {/* Spacer for smooth loop */}
            <div className="h-32"></div>
          </div>
        </div>

        {/* END OF TRANSMISSION - fixed bottom */}
        <div className={`absolute bottom-0 left-0 right-0 ${bgMain} py-6 pb-40 md:pb-40 flex justify-center z-30`}>
             <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#DC2626] rounded-full animate-pulse"></div>
                <p className="font-mono text-[#DC2626] text-[10px] uppercase tracking-[0.3em]">
                    End of Transmission
                </p>
                <div className="w-2 h-2 bg-[#DC2626] rounded-full animate-pulse"></div>
             </div>
        </div>
    </section>
  );
};
