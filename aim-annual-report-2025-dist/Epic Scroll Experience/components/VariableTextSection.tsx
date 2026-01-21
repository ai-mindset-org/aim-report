import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const VariableTextSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Captions Refs
  const aiTopRef = useRef<HTMLDivElement>(null);
  const aiBotRef = useRef<HTMLDivElement>(null);
  const huTopRef = useRef<HTMLDivElement>(null);
  const huBotRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Elements
      const aiCells = gsap.utils.toArray('.cell-ai');
      const humanCells = gsap.utils.toArray('.cell-human');
      const aiChars = gsap.utils.toArray('.char-ai');
      const humanChars = gsap.utils.toArray('.char-human');

      // --- INITIAL STATE ---
      // AI: Tiny. Human: Dominant.
      gsap.set(aiCells, { flexBasis: "0.5%" });
      gsap.set(humanCells, { flexBasis: "19.8%" });

      // Character Styles - Start
      gsap.set(aiChars, {
        "--wght": 100,      
        "--wdth": 25,       
        "--opsz": 144,      
        scaleX: 0.5,        
        opacity: 1,         
      });

      // Human Styles - Start
      gsap.set(humanChars, {
        "--wght": 1000,
        "--wdth": 151,
        "--opsz": 8,
        scaleX: 1.3,
        opacity: 1,         
      });

      // --- CAPTIONS INITIAL STATE (NEW) ---
      // Instead of just fading in (autoAlpha), we position them off-axis
      // AI comes from Left (-x), Human comes from Right (+x)
      // Added Blur for a "Motion" feel
      
      // AI Side (Left)
      gsap.set([aiTopRef.current, aiBotRef.current], { 
        x: -150, 
        autoAlpha: 0,
        filter: "blur(10px)"
      });

      // Human Side (Right)
      gsap.set([huTopRef.current, huBotRef.current], { 
        x: 150, 
        autoAlpha: 0,
        filter: "blur(10px)"
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2500",
          pin: true,
          scrub: 0.5,
          onLeave: () => {
             // AUTO-SCROLL TO NEXT SECTION
             // When this pinned animation finishes (user scrolls past it),
             // automatically scroll smoothly to the start of the PinnedSVGSection.
             const nextSection = document.getElementById('pinned-svg-section');
             if (nextSection) {
               // Calculate the absolute position to ensure we land exactly at the start
               const y = nextSection.getBoundingClientRect().top + window.scrollY;
               window.scrollTo({ top: y, behavior: 'smooth' });
             }
          }
        }
      });

      // --- 1. CORE ANIMATION (Unchanged) ---
      // This runs from 0 to 1 over the whole scroll duration
      
      // Grid Shift
      tl.to(aiCells, {
        flexBasis: "49.75%",
        duration: 1,
        ease: "power2.inOut"
      }, 0);

      tl.to(humanCells, {
        flexBasis: "0.1%", 
        duration: 1,
        ease: "power2.inOut"
      }, 0);

      // Character Transform
      tl.to(aiChars, {
        "--wght": 1000,     
        "--wdth": 151,      
        "--opsz": 50,       
        scaleX: 3.2,        
        opacity: 1,
        duration: 1,
        ease: "power2.inOut"
      }, 0);

      tl.to(humanChars, {
        "--wght": 100,
        "--wdth": 25,
        "--opsz": 144,
        scaleX: 0.5,
        opacity: 1,       
        duration: 1,
        ease: "power2.inOut"
      }, 0);


      // --- 2. CAPTION SEQUENCE (UPDATED) ---
      // Cinematic Slide In + De-blur
      
      const animConfig = {
        x: 0,
        autoAlpha: 1,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "power3.out" // Strong ease out for a "heavy" feel
      };
      
      // 1. "AI Is Evolving" (From Left)
      tl.to(aiTopRef.current, animConfig, 0.2);
      
      // 2. "Faster. Deeper. Smarter." (From Left, DELAYED)
      // Increased delay significantly (0.35 -> 0.8) so it appears after the main title is readable
      tl.to(aiBotRef.current, animConfig, 0.8);
      
      // 3. "Humans Are Reacting" (From Right)
      tl.to(huTopRef.current, animConfig, 0.55);
      
      // 4. "Slower. Overwhelmed. Adapting." (From Right, DELAYED)
      // Increased delay significantly (0.7 -> 1.15)
      tl.to(huBotRef.current, animConfig, 1.15);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const chars = [
    { id: 'A1', char: 'A', type: 'ai' },
    { id: 'I1', char: 'I', type: 'ai' },
    { id: 'H1', char: 'H', type: 'human' },
    { id: 'U1', char: 'U', type: 'human' },
    { id: 'M1', char: 'M', type: 'human' },
    { id: 'A2', char: 'A', type: 'human' },
    { id: 'N1', char: 'N', type: 'human' },
  ];

  return (
    <section 
      ref={containerRef} 
      className="h-screen w-full bg-[#0A0A0A] flex flex-col justify-center px-[2vw] overflow-hidden relative" 
    >
      <div className="flex w-full items-center justify-between h-full">
        {chars.map((item, index) => {
          let justifyClass = "justify-center";
          let originClass = "origin-center";
          let textAlign = "text-center";
          // Red for AI, White for Human
          let colorClass = item.type === 'ai' ? "text-[#DC2626]" : "text-[#F5F5F5]";

          if (index === 0) {
            justifyClass = "justify-start";
            originClass = "origin-left";
            textAlign = "text-left";
          }
          if (index === 1 || index === chars.length - 1) {
             justifyClass = "justify-end";
             originClass = "origin-right";
             textAlign = "text-right";
          }

          return (
            <div 
              key={item.id} 
              className={`cell-${item.type} flex items-center ${justifyClass} h-full relative`}
            >
              <span 
                className={`char-${item.type} vf-anim ${colorClass} leading-none block will-change-transform ${originClass} ${textAlign} whitespace-nowrap`}
                style={{ 
                  fontSize: "18vw",
                  width: "100%", 
                  // CSS Vars
                  "--wght": item.type === 'ai' ? 100 : 1000,
                  "--wdth": item.type === 'ai' ? 25 : 151,
                } as React.CSSProperties}
              >
                {item.char}
              </span>
            </div>
          );
        })}
      </div>

      {/* --- CAPTIONS (UPDATED SIZES & POSITION & FONT) --- */}
      
      {/* AI TOP */}
      <div 
        ref={aiTopRef}
        className="absolute left-[2vw] pointer-events-none origin-left"
        style={{ top: 'calc(50% - 11vw)' }}
      >
        <p className="font-sans text-[#DC2626] text-2xl md:text-4xl uppercase tracking-tighter font-black leading-none drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">
          AI Is Evolving
        </p>
      </div>

      {/* AI BOTTOM */}
      <div 
        ref={aiBotRef}
        className="absolute left-[2vw] pointer-events-none origin-left"
        style={{ top: 'calc(50% + 11vw)' }}
      >
        <p className="font-mono text-[#737373] text-base md:text-lg uppercase tracking-widest font-bold">
          Faster. Deeper. Smarter.
        </p>
      </div>

      {/* HUMAN TOP */}
      <div 
        ref={huTopRef}
        className="absolute right-[2vw] text-right pointer-events-none origin-right flex flex-col items-end"
        style={{ top: 'calc(50% - 11vw)' }}
      >
        <p className="font-sans text-white text-2xl md:text-4xl uppercase tracking-tighter font-black leading-none">
          Humans Are Reacting
        </p>
      </div>

      {/* HUMAN BOTTOM */}
      <div 
        ref={huBotRef}
        className="absolute right-[2vw] text-right pointer-events-none origin-right flex flex-col items-end"
        style={{ top: 'calc(50% + 11vw)' }}
      >
        <p className="font-mono text-[#737373] text-base md:text-lg uppercase tracking-widest font-bold">
          Slower. Overwhelmed. Adapting.
        </p>
      </div>

    </section>
  );
};