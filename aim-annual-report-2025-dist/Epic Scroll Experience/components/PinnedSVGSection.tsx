import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const PinnedSVGSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const gridGroupRef = useRef<SVGGElement>(null);
  
  // Core Refs for splitting
  const centerShapeRef = useRef<SVGGElement>(null);
  const coreLeftRef = useRef<SVGGElement>(null);
  const coreRightRef = useRef<SVGGElement>(null);
  const mazeSignalRef = useRef<SVGPathElement>(null);
  
  // New Visual Metaphor Refs
  const gapGraphRef = useRef<SVGGElement>(null);
  const machineChaosRef = useRef<HTMLDivElement>(null);
  const humanBreathRef = useRef<HTMLDivElement>(null);

  // Text Refs - Existing
  const textIntersectRef = useRef<HTMLDivElement>(null);
  const textMomentRef = useRef<HTMLDivElement>(null);
  const textDivergeRef = useRef<HTMLDivElement>(null);
  const textCreatingRef = useRef<HTMLDivElement>(null); 
  
  // Split Gap Refs
  const textGapTitleRef = useRef<HTMLDivElement>(null);
  const textGapDescRef = useRef<HTMLDivElement>(null);
  
  // Text Refs - Narrative
  const textBridgeRef = useRef<HTMLDivElement>(null);
  const textLayersRef = useRef<HTMLDivElement>(null);
  const textManifestoRef = useRef<HTMLDivElement>(null);

  // Text Refs - Conclusion
  const textShiftsRef = useRef<HTMLDivElement>(null);
  const textReportRef = useRef<HTMLDivElement>(null);
  
  // Report Elements
  const reportTitleRef = useRef<HTMLHeadingElement>(null);
  const subText1Ref = useRef<HTMLParagraphElement>(null);
  const subText2Ref = useRef<HTMLParagraphElement>(null);
  
  // UI Elements
  const btnReportRef = useRef<HTMLButtonElement>(null);
  const navInstructionsRef = useRef<HTMLDivElement>(null);
  const finalTopBarRef = useRef<HTMLDivElement>(null);

  const progressBarRef = useRef<HTMLDivElement>(null);

  // Interaction State
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);

  const layersData = [
    {
      id: 1,
      title: "FOUNDATION",
      subtitle: "Energy & Infrastructure",
      shifts: "3 SHIFTS",
      desc: "Physics, economics, and power. The physical and economic base.",
      details: "Energy infrastructure, agentic labor, data sovereignty.",
      constraint: "Can we power it? Can we afford it? Who controls it?"
    },
    {
      id: 2,
      title: "COGNITION",
      subtitle: "Reasoning & Models",
      shifts: "3 SHIFTS",
      desc: "The architecture of meaning and reason. How we think and learn.",
      details: "Reasoning models, knowledge systems, scientific discovery.",
      constraint: "Can we trust how it thinks? Can we verify its logic?"
    },
    {
      id: 3,
      title: "INTERFACE",
      subtitle: "Agents & Context",
      shifts: "3 SHIFTS",
      desc: "Craft, matter, and defense. How we build and protect.",
      details: "Coding tools, physical intelligence, security systems.",
      constraint: "Can we maintain what we build? Can we defend against what we create?"
    },
    {
      id: 4,
      title: "HUMANITY",
      subtitle: "Integration & Outcome",
      shifts: "2 SHIFTS",
      desc: "Narrative and intimacy. What keeps us human.",
      details: "Storytelling, relationships, meaning-making.",
      constraint: "Can we preserve agency? Can we stay connected?"
    }
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // --- INITIAL STATES ---
      const vPaths = gsap.utils.toArray<SVGPathElement>('.v-grid-line');
      const hPaths = gsap.utils.toArray<SVGPathElement>('.h-grid-line');
      const hudElements = gsap.utils.toArray<SVGElement>('.hud-element');
      
      // 1. Grid Lines start PARTIALLY VISIBLE
      gsap.set([...vPaths, ...hPaths], { 
        strokeDasharray: 1500, 
        strokeDashoffset: 1350, 
        opacity: 0.1,
        strokeWidth: 0.5,
        stroke: "rgba(245, 245, 245, 0.2)"
      });
      
      // 2. Container starts flat
      gsap.set(svgContainerRef.current, { 
        rotationX: 0, 
        rotationZ: 0,
        scale: 0.8,
        y: 0 
      });

      // 3. Center shape hidden initially
      gsap.set(centerShapeRef.current, { scale: 1, opacity: 1 }); 
      gsap.set([coreLeftRef.current, coreRightRef.current], { 
        scale: 0, 
        opacity: 0, 
        x: 0, // Start MERGED
        y: 0
      });
      
      // 4. HUD hidden
      gsap.set(hudElements, { opacity: 0, scale: 0.5 });

      // 5. Maze Signal hidden
      if (mazeSignalRef.current) {
          const len = mazeSignalRef.current.getTotalLength();
          gsap.set(mazeSignalRef.current, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 });
      }

      // 6. New Metaphors Hidden
      gsap.set(gapGraphRef.current, { opacity: 0, scale: 0.8 });
      const graphPaths = gapGraphRef.current?.querySelectorAll('path, line');
      if (graphPaths) gsap.set(graphPaths, { opacity: 0, strokeDasharray: 500, strokeDashoffset: 500 });
      
      // 7. Progress bar reset
      gsap.set(progressBarRef.current, { scaleX: 0 });

      // 8. Text Setup
      const allTexts = [
        textIntersectRef.current, 
        textMomentRef.current,
        textDivergeRef.current, 
        textCreatingRef.current,
        textGapTitleRef.current,
        textGapDescRef.current,
        textBridgeRef.current,
        textLayersRef.current,
        textManifestoRef.current,
        textShiftsRef.current, 
        textReportRef.current
      ];
      gsap.set(allTexts, { autoAlpha: 0 });
      
      // Specific adjustments
      gsap.set(textMomentRef.current, { y: 100 });
      gsap.set(textCreatingRef.current, { scale: 0.8 });
      // Remove specific x offset for layers ref here, we handle it in main timeline for the whole container
      gsap.set(textLayersRef.current, { x: -50 }); 
      
      // Gap Description Adjustment
      gsap.set(textGapDescRef.current, { y: 20 }); 

      // Button & Nav hidden initially (and pushed down)
      gsap.set(btnReportRef.current, { autoAlpha: 0, y: 50 }); 
      gsap.set(navInstructionsRef.current, { autoAlpha: 0, y: 50 });

      // Final Interface Elements
      gsap.set(finalTopBarRef.current, { y: -50, opacity: 0 });
      gsap.set([subText1Ref.current, subText2Ref.current], { y: 20, opacity: 0 });
      gsap.set(reportTitleRef.current, { scale: 0.9, opacity: 0 });
      
      // 10. Background Loops for Signals (Chaos & Breath)
      // These run continuously but are hidden until container is revealed
      
      // Machine Chaos Loop
      if (machineChaosRef.current) {
        const rings = machineChaosRef.current.querySelectorAll('.chaos-ring');
        gsap.to(rings, {
           rotation: 360,
           duration: 8,
           repeat: -1,
           ease: "linear",
           stagger: { amount: 2, from: "random" }
        });
      }
      
      // Human Breath Loop
      if (humanBreathRef.current) {
         const circles = humanBreathRef.current.querySelectorAll('.breath-circle');
         gsap.to(circles, {
            scale: 1.4,
            opacity: 0.3,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 0.5
         });
      }


      // --- MAIN TIMELINE ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=20000', // Long scroll for storytelling
          pin: true,
          scrub: 0.5, 
          anticipatePin: 1,
          onUpdate: (self) => {
             if (progressBarRef.current) {
                 progressBarRef.current.style.transform = `scaleX(${self.progress})`;
             }
          }
        }
      });

      // =========================================
      // PHASE 1: "They intersect. ... for a moment"
      // =========================================
      
      // Draw Grid - SLOWER
      tl.to([...vPaths, ...hPaths], {
        strokeDashoffset: 0,
        opacity: 0.3,
        duration: 4,
        stagger: { amount: 1, from: "center" },
        ease: "power2.out"
      }, 0);

      // Text: "They intersect" In
      tl.to(textIntersectRef.current, {
        autoAlpha: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out"
      }, 0.5);

      // --- TEXT SEPARATION SEQUENCE ---
      tl.to(textIntersectRef.current, {
        y: -100, // Move Up
        opacity: 0.5, // Dim
        scale: 0.8,
        duration: 2,
        ease: "power2.inOut"
      }, 1.5);

      tl.to(textMomentRef.current, {
        autoAlpha: 1,
        scale: 1,
        y: 20, 
        duration: 1.5,
        ease: "power2.out"
      }, 1.8);

      // Text: Both Out
      tl.to([textIntersectRef.current, textMomentRef.current], {
        autoAlpha: 0,
        y: -150, 
        filter: "blur(10px)",
        duration: 0.5
      }, 4.0);


      // =========================================
      // PHASE 2: "And diverge."
      // Visual: Grid expands, Cores appear MERGED immediately.
      // Starts earlier at 4.5
      // =========================================

      const divergeTime = 4.5;

      // Text: Diverge In
      tl.to(textDivergeRef.current, {
        autoAlpha: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out"
      }, divergeTime);

      // CORES APPEAR (Merged at center) - Happens WITH text
      tl.to([coreLeftRef.current, coreRightRef.current], {
        scale: 1,
        opacity: 1, // Fully visible
        duration: 1,
        ease: "back.out(1.2)"
      }, divergeTime);

      // Animation: Subtle grid expansion
      tl.to(svgContainerRef.current, {
        scale: 0.9,
        duration: 2,
        ease: "sine.inOut"
      }, divergeTime);

      // Text: Diverge Out
      tl.to(textDivergeRef.current, {
        autoAlpha: 0,
        filter: "blur(5px)",
        scale: 1.1,
        duration: 0.5
      }, divergeTime + 1.5);


      // =========================================
      // PHASE 2.5: "Creating..."
      // New Step before the Gap
      // =========================================
      
      const creatingTime = divergeTime + 1.6;

      // Text: Creating In
      tl.to(textCreatingRef.current, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out"
      }, creatingTime);

      // Text: Creating Out
      tl.to(textCreatingRef.current, {
        autoAlpha: 0,
        y: -30,
        duration: 0.5
      }, creatingTime + 1.2);


      // =========================================
      // PHASE 3: "THE CONTEXT GAP"
      // Visual: Cores SPLIT apart.
      // NEW: GAP GRAPH METAPHOR
      // =========================================
      
      const gapTime = creatingTime + 1.5;

      // Tilt Container
      tl.to(svgContainerRef.current, {
        rotationX: 60,
        y: 100,
        duration: 2,
        ease: "power2.inOut"
      }, gapTime);

      // ACTION: Split Cores (NOW they separate)
      tl.to(coreLeftRef.current, { x: -250, duration: 2, ease: "power3.inOut" }, gapTime);
      tl.to(coreRightRef.current, { x: 250, duration: 2, ease: "power3.inOut" }, gapTime);

      // Text: Gap Title In (Top)
      tl.to(textGapTitleRef.current, {
        autoAlpha: 1,
        scale: 1,
        duration: 1.5,
        ease: "power2.out"
      }, gapTime + 0.2);
      
      // NEW: Animate GAP GRAPH
      if (gapGraphRef.current) {
         const paths = gapGraphRef.current.querySelectorAll('path');
         const lines = gapGraphRef.current.querySelectorAll('line');
         
         tl.to(gapGraphRef.current, { opacity: 1, scale: 1, duration: 1 }, gapTime + 0.5);
         
         // Animate Curves
         tl.to(paths, { 
             strokeDashoffset: 0, 
             opacity: 1, 
             duration: 2, 
             stagger: 0.3, 
             ease: "power2.out" 
         }, gapTime + 0.5);
         
         // Animate Connectors
         tl.to(lines, {
             opacity: 0.5,
             strokeDashoffset: 0,
             duration: 1.5,
             stagger: 0.1,
             ease: "power1.in"
         }, gapTime + 1.5);
      }

      // Font Stretch on Title
      const gapWord = textGapTitleRef.current?.querySelector('.word-gap');
      if (gapWord) {
        tl.to(gapWord, { "--wdth": 151, duration: 2, ease: "power1.inOut" }, gapTime);
      }

      // Text: Gap Description In (Bottom) - DELAYED
      tl.to(textGapDescRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out"
      }, gapTime + 1.0);

      // Text: Both Out (And Graph Out)
      tl.to([textGapTitleRef.current, textGapDescRef.current], {
        autoAlpha: 0,
        y: -30,
        duration: 0.5
      }, gapTime + 3.0);
      
      tl.to(gapGraphRef.current, { opacity: 0, duration: 0.5 }, gapTime + 3.0);


      // =========================================
      // PHASE 3.5: "The Bridge" (11 Tectonic Shifts)
      // =========================================
      
      const bridgeTime = gapTime + 3.5;

      // VISUAL UPDATE FOR BRIDGE PHASE
      // Rotate and Scale the container to show movement between "Gap" and "Layers"
      tl.to(svgContainerRef.current, {
        rotationZ: -10, // Slight tilt to disorient
        scale: 0.85,    // Pull back to see more context
        duration: 2,
        ease: "power2.inOut"
      }, bridgeTime);

      tl.to(textBridgeRef.current, {
        autoAlpha: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out"
      }, bridgeTime);

      tl.to(textBridgeRef.current, {
        autoAlpha: 0,
        scale: 1.1,
        filter: "blur(5px)",
        duration: 0.8
      }, bridgeTime + 2.5);


      // =========================================
      // PHASE 3.6: "The Layers (Cascade)" - SIDE PANEL LEFT
      // Strategy: Move SVG scene SLIGHTLY to the RIGHT (Overlap).
      // =========================================
      
      const layersTime = bridgeTime + 3.5;

      // 1. Move Background SVG to the RIGHT (Less extreme than before)
      // Also reset the Z rotation from previous step
      tl.to(svgContainerRef.current, {
        x: 180, 
        scale: 0.8, 
        rotationZ: 0, // Reset rotation
        rotationY: -10, 
        duration: 1.5,
        ease: "power2.inOut"
      }, layersTime);

      // 2. Reveal Layers Content (On the Left)
      tl.to(textLayersRef.current, {
        autoAlpha: 1,
        x: 0,
        duration: 1,
        ease: "power2.out"
      }, layersTime);

      // 3. Animate Layer Rows
      const layerRows = textLayersRef.current?.querySelectorAll('.layer-row');
      if (layerRows) {
          gsap.set(layerRows, { opacity: 0, x: -20 });
          tl.to(layerRows, { 
            opacity: 1, 
            x: 0, 
            stagger: 0.15, 
            duration: 0.6,
            ease: "back.out(1.2)"
          }, layersTime + 0.3);
      }

      // 4. Hide Layers
      tl.to(textLayersRef.current, {
        autoAlpha: 0,
        x: -50,
        filter: "blur(10px)",
        duration: 1
      }, layersTime + 4.5);


      // =========================================
      // PHASE 3.7: "The Manifesto (Signals)" - MACHINE LEFT, HUMAN RIGHT
      // =========================================

      const manifestoTime = layersTime + 5.5;

      // 1. Reset Camera (Center)
      tl.to(svgContainerRef.current, {
        x: 0, 
        rotationY: 0,
        duration: 1.5,
        ease: "power2.inOut"
      }, manifestoTime - 0.5);

      // 2. ANIMATE CORES HORIZONTALLY (Left vs Right)
      // TIGHTER SPACING: +/- 150
      
      tl.to(coreLeftRef.current, {
        y: 0,
        x: -150, 
        rotation: 90,
        scale: 1,
        duration: 1.5,
        ease: "power3.inOut"
      }, manifestoTime);

      tl.to(coreRightRef.current, {
        y: 0,
        x: 150,
        rotation: -90,
        scale: 1,
        duration: 1.5,
        ease: "power3.inOut"
      }, manifestoTime);

      // 3. REVEAL CONTAINER
      tl.to(textManifestoRef.current, {
        autoAlpha: 1,
        duration: 0.5,
        ease: "power2.out"
      }, manifestoTime + 0.5);

      // 4. ANIMATE ELEMENTS: Machine <-> Arrows <-> Human
      const machineGroup = textManifestoRef.current?.querySelector('.machine-group');
      const humanGroup = textManifestoRef.current?.querySelector('.human-group');
      const arrowGroup = textManifestoRef.current?.querySelector('.arrow-group');
      const gapGroup = textManifestoRef.current?.querySelector('.gap-group');
      const quoteGroup = textManifestoRef.current?.querySelector('.quote-group');
      
      if (machineGroup && humanGroup && gapGroup && quoteGroup && arrowGroup && mazeSignalRef.current) {
        
        // A. Machine Signal Fades In
        tl.fromTo(machineGroup, 
          { x: -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          manifestoTime + 0.8
        );

        // B. Human Signal Fades In
        tl.fromTo(humanGroup, 
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          manifestoTime + 1.0
        );

        // C. ARROWS APPEAR (Bi-Directional)
        tl.fromTo(arrowGroup,
           { scaleX: 0, opacity: 0 },
           { scaleX: 1, opacity: 1, duration: 0.8, ease: "expo.out" },
           manifestoTime + 1.5
        );
        
        // C.1. MAZE SIGNAL ANIMATION (Inside SVG)
        // Travels from Left Core (-150) to Right Core (150)
        tl.to(mazeSignalRef.current, {
            opacity: 1,
            strokeDashoffset: 0,
            duration: 1.5,
            ease: "power1.inOut"
        }, manifestoTime + 1.5);

        // D. HUMAN JITTER (Reaction)
        // Increased intensity to be more visible
        tl.to(coreRightRef.current, {
            x: "+=10",
            duration: 0.1,
            repeat: 7,
            yoyo: true,
            ease: "rough"
        }, manifestoTime + 2.5);

        // E. CONTEXT GAP SLAMS IN (Center)
        tl.fromTo(gapGroup,
           { scale: 2, opacity: 0, filter: "blur(20px)" },
           { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.5, ease: "expo.in" },
           manifestoTime + 3.2
        );

        // E.1 GAP IMPACT (Both Cores Shake OUTWARDS slightly)
        tl.to(coreLeftRef.current, { x: -180, duration: 0.4, ease: "back.out(2)" }, manifestoTime + 3.2);
        tl.to(coreRightRef.current, { x: 180, duration: 0.4, ease: "back.out(2)" }, manifestoTime + 3.2);

        // F. Quote Fade In (DELAYED)
        tl.fromTo(quoteGroup,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1 },
            manifestoTime + 4.2
        );
      }

      // 5. Hide Manifesto & Reset Cores
      tl.to(textManifestoRef.current, {
        autoAlpha: 0,
        filter: "blur(10px)",
        duration: 0.8
      }, manifestoTime + 6.0);
      
      // Hide Maze Signal
      if (mazeSignalRef.current) {
          const len = mazeSignalRef.current.getTotalLength();
          tl.to(mazeSignalRef.current, { strokeDashoffset: -len, opacity: 0, duration: 0.5 }, manifestoTime + 6.0);
      }

      // Reset Cores to center X for next phase (Tectonic Shifts)
      tl.to([coreLeftRef.current, coreRightRef.current], {
        x: 0,
        y: 0, // Ensure Y is reset
        rotation: 0,
        scale: 1, // Reset scale
        duration: 1,
        ease: "power2.inOut"
      }, manifestoTime + 6.0);


      // =========================================
      // PHASE 4: "11 TECTONIC SHIFTS" (Title)
      // =========================================

      const shiftStartTime = manifestoTime + 7.0; 

      // Reset Camera / Background Restore to Center
      tl.to(svgContainerRef.current, {
        x: 0,
        y: 0,
        rotationY: 0,
        scale: 0.8,
        duration: 1.5,
        ease: "power2.inOut"
      }, shiftStartTime - 1.0);

      // 1. Violent Return to Center
      tl.to([coreLeftRef.current, coreRightRef.current], { 
        x: 0,
        duration: 0.8, 
        ease: "expo.in" 
      }, shiftStartTime);

      // Activate HUD
      tl.to(hudElements, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.1
      }, shiftStartTime + 0.5);

      // Text: Shifts In
      tl.to(textShiftsRef.current, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.3,
        ease: "power4.out"
      }, shiftStartTime + 0.8);

      // Text: MAPPING ANIMATION
      const mappingText = textShiftsRef.current?.querySelector('.mapping-text');
      const mappingLine = textShiftsRef.current?.querySelector('.mapping-line');
      
      if (mappingText && mappingLine) {
        tl.fromTo(mappingLine,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.6, ease: "expo.out" },
          shiftStartTime + 1.0
        );
        tl.fromTo(mappingText, 
           { autoAlpha: 0, y: 10, letterSpacing: '0em' },
           { autoAlpha: 1, y: 0, letterSpacing: '0.2em', duration: 0.8, ease: "power2.out" },
           shiftStartTime + 1.2
        );
      }

      // 2. THE SHIFT
      tl.to(coreLeftRef.current, { y: -80, duration: 2, ease: "power2.inOut" }, shiftStartTime + 1.2);
      tl.to(coreRightRef.current, { y: 80, duration: 2, ease: "power2.inOut" }, shiftStartTime + 1.2);
      tl.to([coreLeftRef.current, coreRightRef.current], { rotation: 10, duration: 2, ease: "power1.inOut"}, shiftStartTime + 1.2);

      // 3. THE WAVE
      tl.fromTo([...vPaths, ...hPaths], 
        { strokeWidth: 0.5, stroke: "rgba(245,245,245,0.2)" },
        {
          strokeWidth: 3,
          stroke: "#DC2626", // Red Wave
          duration: 0.8,
          stagger: { amount: 1, from: "center" },
          yoyo: true,
          repeat: 1,
          ease: "sine.inOut"
        },
        shiftStartTime + 1.2
      );

      tl.to(svgContainerRef.current, {
        rotationZ: 15,
        scale: 1.5,
        duration: 2,
        ease: "power2.inOut"
      }, shiftStartTime + 1.2);

      tl.to(textShiftsRef.current, {
        autoAlpha: 0,
        scale: 2,
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.8
      }, shiftStartTime + 3.5);


      // =========================================
      // PHASE 5: "This is the report." (CONSOLIDATED FINAL STATE)
      // =========================================

      const reportTime = shiftStartTime + 4.5;

      // Reset Scene and FADE OUT BACKGROUND significantly for readability
      tl.to(svgContainerRef.current, {
        rotationX: 0,
        rotationZ: 0,
        scale: 1,
        y: 0,
        x: 0,
        opacity: 0.1, // Reduced opacity for white picture background
        duration: 2,
        ease: "power3.inOut"
      }, reportTime);

      tl.to([coreLeftRef.current, coreRightRef.current], {
        y: 0,
        rotation: 0,
        duration: 2,
        ease: "power3.inOut"
      }, reportTime);

      tl.to([...vPaths, ...hPaths], {
        opacity: 0.02, // Almost invisible
        stroke: "rgba(245,245,245,0.1)",
        strokeWidth: 0.5,
        duration: 1
      }, reportTime);
      
      tl.to(centerShapeRef.current, { opacity: 0.1, duration: 1 }, reportTime);

      // 1. Reveal Container
      tl.to(textReportRef.current, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.5,
        ease: "power2.out"
      }, reportTime);
      
      // 2. Animate Main Title
      tl.to(reportTitleRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out"
      }, reportTime + 0.2);

      // 3. Animate Subtitles (Previously Phase 6 content)
      tl.to([subText1Ref.current, subText2Ref.current], {
        opacity: 1,
        y: 0,
        stagger: 0.3,
        duration: 1,
        ease: "power3.out"
      }, reportTime + 0.8);

      // 4. Animate Top Interface (Sources, PDF, etc.)
      tl.to(finalTopBarRef.current, {
        y: 0,
        opacity: 0.8,
        duration: 1,
        ease: "power2.out"
      }, reportTime + 1.2);
      
      // 5. Animate Bottom Controls (Explore + Nav) - Moved to be very low
      tl.to(btnReportRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.2)"
      }, reportTime + 1.5);

      tl.to(navInstructionsRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, reportTime + 1.7);
      
      // --- LOOPS ---
      const mouseWheel = navInstructionsRef.current?.querySelector('.mouse-anim');
      if (mouseWheel) {
        gsap.to(mouseWheel, { y: 4, duration: 0.6, repeat: -1, yoyo: true, ease: "power1.inOut" });
      }
      
      const keyElements = navInstructionsRef.current?.querySelectorAll('.key-anim');
      if (keyElements) {
         gsap.to(keyElements, {
           backgroundColor: "#ffffff",
           color: "#000000",
           duration: 0.2,
           stagger: 0.3,
           repeat: -1,
           repeatDelay: 2,
           yoyo: true
         });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Grid Generators (Unchanged)
  const gridLines = [];
  const size = 1000;
  const step = 50;
  const center = size / 2;
  
  for (let x = 0; x <= size; x += step) {
    gridLines.push(
      <path key={`v-${x}`} className="v-grid-line" d={`M ${x} 0 L ${x} ${size}`} fill="none" stroke={x === center ? "#DC2626" : "rgba(245, 245, 245, 0.2)"} strokeWidth={x === center ? 2 : 0.5} />
    );
  }
  for (let y = 0; y <= size; y += step) {
    gridLines.push(
      <path key={`h-${y}`} className="h-grid-line" d={`M 0 ${y} L ${size} ${y}`} fill="none" stroke={y === center ? "#DC2626" : "rgba(245, 245, 245, 0.2)"} strokeWidth={y === center ? 2 : 0.5} />
    );
  }

  const CoreGeometry = ({ color }: { color: string }) => (
    <>
      <circle className="core-ring" r="100" fill="none" stroke={color} strokeWidth="2" strokeDasharray="40 10" />
      <circle r="140" fill="none" stroke="#fff" strokeWidth="1" strokeOpacity="0.5" />
      <path d="M-160 0 L-120 0 M120 0 L160 0 M0 -160 L0 -120 M0 120 L0 160" stroke={color} strokeWidth="2" />
      <rect x="-60" y="-60" width="120" height="120" fill="rgba(0,0,0,0.5)" stroke="#fff" strokeWidth="1" />
      <rect x="-40" y="-40" width="80" height="80" fill="none" stroke={color} strokeWidth="2" transform="rotate(45)" />
      <circle r="180" fill="none" stroke={color === '#DC2626' ? 'url(#aiGradient)' : 'url(#scanGradient)'} strokeWidth="1" opacity="0.3" />
    </>
  );

  return (
    <section 
      id="pinned-svg-section"
      ref={containerRef} 
      className="relative w-full h-screen bg-[#0A0A0A] overflow-hidden flex items-center justify-center perspective-[1000px]"
      style={{ perspective: '1000px' }} 
    >
      <div className="absolute bottom-10 left-10 w-40 h-1 bg-neutral-900 rounded-full overflow-hidden z-50">
        <div ref={progressBarRef} className="h-full bg-[#DC2626] w-full origin-left transform scale-x-0" />
      </div>

      {/* --- 3D SCENE --- */}
      <div 
        ref={svgContainerRef}
        className="w-[1000px] h-[1000px] absolute transform-style-3d will-change-transform origin-center"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 1000">
          <defs>
            <filter id="neon-glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            {/* HUMAN / WHITE GRADIENT */}
            <linearGradient id="scanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
               <stop offset="0%" stopColor="transparent"/>
               <stop offset="50%" stopColor="#F5F5F5"/>
               <stop offset="100%" stopColor="transparent"/>
            </linearGradient>
            {/* AI / RED GRADIENT */}
            <linearGradient id="aiGradient" x1="0%" y1="0%" x2="0%" y2="100%">
               <stop offset="0%" stopColor="transparent"/>
               <stop offset="50%" stopColor="#DC2626"/>
               <stop offset="100%" stopColor="transparent"/>
            </linearGradient>
          </defs>

          <g ref={gridGroupRef} filter="url(#neon-glow)">{gridLines}</g>
          <g transform="translate(100, 100)" className="hud-element">
             <path d="M0 0 L20 0 L20 50 L0 50 Z" fill="none" stroke="#737373" strokeWidth="1"/>
             <text x="30" y="20" fill="#737373" fontSize="12" className="font-mono">GRID_LOCK</text>
          </g>
          <g transform="translate(900, 800)" className="hud-element">
             <circle r="30" fill="none" stroke="#737373" strokeWidth="1" strokeDasharray="5 5"/>
             <text x="-40" y="5" fill="#737373" fontSize="12" className="font-mono">SYNC</text>
          </g>
          <g transform="translate(100, 900)" className="hud-element">
             <rect x="0" y="0" width="10" height="40" fill="#222" />
             <rect x="15" y="10" width="10" height="30" fill="#333" />
             <rect x="30" y="20" width="10" height="20" fill="#444" />
          </g>
          
          <g ref={centerShapeRef} transform="translate(500, 500)">
             
             {/* MAZE SIGNAL (Visual Connection through the grid) */}
             <path 
                ref={mazeSignalRef}
                d="M -150 0 L -100 0 L -100 -40 L 0 -40 L 0 20 L 100 20 L 100 -30 L 150 -30" 
                fill="none" 
                stroke="#F5F5F5" 
                strokeWidth="4" 
                strokeLinecap="square"
                filter="url(#neon-glow)"
             />

             {/* NEW: GAP GRAPH METAPHOR (Behind cores) */}
             <g ref={gapGraphRef} transform="translate(0, 50)" className="pointer-events-none">
                 {/* Machine Curve (Exponential) */}
                 <path d="M-300 100 C -200 100, -100 80, 0 0 C 100 -80, 200 -180, 300 -250" fill="none" stroke="#DC2626" strokeWidth="3" opacity="0.8" />
                 {/* Human Curve (Linear) - Now White/Gray */}
                 <path d="M-300 100 C -200 100, -100 90, 0 80 C 100 70, 200 40, 300 0" fill="none" stroke="#F5F5F5" strokeWidth="3" opacity="0.8" />
                 
                 {/* Gap Lines */}
                 <line x1="0" y1="0" x2="0" y2="80" stroke="#737373" strokeWidth="1" strokeDasharray="5 5" opacity="0.3" />
                 <line x1="150" y1="-120" x2="150" y2="50" stroke="#737373" strokeWidth="1" strokeDasharray="5 5" opacity="0.3" />
                 <line x1="300" y1="-250" x2="300" y2="0" stroke="#737373" strokeWidth="1" strokeDasharray="5 5" opacity="0.3" />
             </g>

             {/* LEFT CORE: AI (RED) */}
             <g ref={coreLeftRef}><CoreGeometry color="#DC2626" /></g>
             {/* RIGHT CORE: HUMAN (WHITE/NEUTRAL) */}
             <g ref={coreRightRef}><CoreGeometry color="#F5F5F5" /></g>
          </g>
        </svg>
      </div>

      {/* --- TEXT OVERLAYS --- */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        
        {/* PHASE 1 */}
        <div ref={textIntersectRef} className="absolute text-center mix-blend-exclusion z-20">
          <h2 className="vf-anim text-[5vw] leading-none text-white tracking-wide" style={{"--wght": 300} as React.CSSProperties}>They intersect.</h2>
        </div>
        <div ref={textMomentRef} className="absolute text-center mix-blend-exclusion z-20">
          <p className="vf-anim text-[2vw] text-neutral-400 font-normal tracking-[0.2em] uppercase font-mono" style={{ opacity: 0.8 }}>— for a moment —</p>
        </div>

        {/* PHASE 2 */}
        <div ref={textDivergeRef} className="absolute text-center mix-blend-exclusion">
           <h2 className="vf-anim text-[5vw] leading-none text-neutral-400 tracking-widest" style={{"--wght": 100} as React.CSSProperties}>And diverge.</h2>
        </div>

        {/* NEW STEP: CREATING... */}
        <div ref={textCreatingRef} className="absolute text-center mix-blend-exclusion">
           <p className="vf-anim text-[3vw] text-[#DC2626] font-light italic tracking-widest" style={{"--wght": 200} as React.CSSProperties}>Creating...</p>
        </div>

        {/* PHASE 3: THE CONTEXT GAP (SPLIT) */}
        
        {/* Title: Higher Up */}
        <div ref={textGapTitleRef} className="absolute text-center w-full px-4 top-[30%]">
          <h2 className="vf-anim text-[8vw] leading-none text-white tracking-tighter" style={{"--wght": 700} as React.CSSProperties}>
            THE CONTEXT <span className="word-gap inline-block vf-anim text-[#DC2626]" style={{"--wdth": 25} as React.CSSProperties}>GAP</span>
          </h2>
        </div>

        {/* Description: Bottom (Below the cores) */}
        <div ref={textGapDescRef} className="absolute text-center w-full px-4 bottom-[15%] max-w-3xl">
           <div className="border-t border-neutral-800 pt-6">
             <p className="font-mono text-xl md:text-2xl text-neutral-300 tracking-tight leading-relaxed font-bold">
               the distance between the volume of data a machine can generate and the amount of meaning a human can integrate.
             </p>
           </div>
        </div>


        {/* NEW PHASE 3.5: THE BRIDGE */}
        <div ref={textBridgeRef} className="absolute text-center w-full px-4 max-w-5xl">
           <h2 className="text-[4vw] font-light text-white leading-tight tracking-tight">
             The gap that we see in the<br/>
             <span className="font-bold text-[#DC2626]">11 Tectonic Shifts of the AI World.</span>
           </h2>
           <p className="mt-6 text-neutral-400 text-lg tracking-widest uppercase font-mono">A Report on what has changed in 2025.</p>
        </div>

        {/* NEW PHASE 3.6: THE LAYERS (Left Side Panel + Right Info Panel) */}
        <div ref={textLayersRef} className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center pl-[5vw]">
            <div className="w-full max-w-7xl px-6 flex items-start gap-12 pointer-events-auto">
                
                {/* LEFT: LIST OF LAYERS */}
                <div className="flex flex-col gap-3 w-full max-w-[450px]">
                   <h3 className="text-[4vw] md:text-5xl font-bold text-white mb-8 leading-none tracking-tighter mix-blend-overlay">
                     In 4 Layers.
                   </h3>
                   {layersData.map((layer) => (
                      <div 
                         key={layer.id}
                         onMouseEnter={() => setHoveredLayer(layer.id)}
                         onMouseLeave={() => setHoveredLayer(null)}
                         className={`layer-row group flex items-center gap-6 p-6 border transition-all duration-300 cursor-pointer rounded-r-xl
                            ${hoveredLayer === layer.id ? 'border-red-600/50 bg-red-950/30' : 'border-white/10 bg-black/20 hover:bg-white/5'}
                         `}
                      >
                         <span className={`font-mono text-sm tracking-widest w-8 transition-colors ${hoveredLayer === layer.id ? 'text-[#DC2626]' : 'text-neutral-500'}`}>0{layer.id}</span>
                         <div className="flex flex-col gap-1">
                            <span className={`text-xl md:text-2xl font-bold tracking-wide transition-colors ${hoveredLayer === layer.id ? 'text-white' : 'text-neutral-300'}`}>
                                {layer.title}
                            </span>
                            <div className="flex justify-between items-center w-full pr-4">
                                <span className="text-neutral-500 text-xs uppercase tracking-widest group-hover:text-neutral-400 transition-colors font-mono">
                                    {layer.subtitle}
                                </span>
                                {hoveredLayer === layer.id && (
                                    <span className="text-[#DC2626] text-[10px] font-mono tracking-widest animate-pulse">
                                        {layer.shifts}
                                    </span>
                                )}
                            </div>
                         </div>
                      </div>
                   ))}
                </div>

                {/* RIGHT: DETAIL PANEL (Dynamic) */}
                <div className="relative flex-1 max-w-lg h-[400px] mt-24">
                   {hoveredLayer && (
                        <div className="absolute top-0 left-0 w-full p-8 border border-white/20 bg-black/80 backdrop-blur-xl rounded-xl animate-fade-in-up transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                           <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                              <div className="w-2 h-2 bg-[#DC2626] rounded-full animate-pulse"></div>
                              <span className="text-xs font-mono text-[#EF4444] uppercase tracking-widest">
                                 Layer 0{hoveredLayer}: Analysis
                              </span>
                           </div>
                           
                           <p className="text-lg text-white font-light leading-relaxed mb-6">
                             {layersData[hoveredLayer-1].desc} <span className="text-neutral-400">{layersData[hoveredLayer-1].details}</span>
                           </p>
                           
                           <div className="pt-4">
                              <span className="block text-xs font-mono text-[#DC2626] uppercase tracking-widest mb-2 flex items-center gap-2">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22L12 2zm1 15h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
                                The Constraint
                              </span>
                              <p className="text-md font-bold text-white leading-tight tracking-wide border-l-2 border-[#DC2626] pl-4 py-1">
                                {layersData[hoveredLayer-1].constraint}
                              </p>
                           </div>
                        </div>
                   )}
                </div>

            </div>
        </div>

        {/* NEW PHASE 3.7: THE MANIFESTO (RESTRUCTURED LAYOUT) */}
        <div ref={textManifestoRef} className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none">
           
           {/* TOP ROW: Machine (Left) vs Human (Right) + Signal Arrows */}
           {/* Tighter container: max-w-4xl for closer proximity */}
           <div className="relative flex w-full max-w-4xl justify-center gap-12 items-center mb-12 px-4">
              
              {/* LEFT: MACHINE */}
              <div className="machine-group flex flex-col items-start z-10 flex-1 max-w-[320px]">
                <div className="w-full relative p-6 border border-red-500/30 bg-black/60 backdrop-blur-md rounded-lg shadow-[0_0_25px_rgba(239,68,68,0.2)] overflow-hidden">
                  
                  {/* NEW: CHAOS METAPHOR BACKGROUND */}
                  <div ref={machineChaosRef} className="absolute inset-0 opacity-20 pointer-events-none">
                      {/* Using CSS/HTML for chaos to avoid heavy SVG calculation here, animated by GSAP */}
                      <div className="chaos-ring absolute top-1/2 left-1/2 w-40 h-40 border border-red-500 rounded-full -translate-x-1/2 -translate-y-1/2 border-dashed"></div>
                      <div className="chaos-ring absolute top-1/2 left-1/2 w-32 h-32 border border-red-400 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                      <div className="chaos-ring absolute top-1/2 left-1/2 w-20 h-20 border border-red-600 rounded-full -translate-x-1/2 -translate-y-1/2 border-dotted"></div>
                  </div>

                  <span className="relative block text-[12px] font-mono text-red-400 mb-2 tracking-[0.2em] uppercase z-10">Input</span>
                  <span className="relative block font-bold text-white text-2xl md:text-3xl leading-none z-10">MACHINE<br/>SIGNAL</span>
                </div>
              </div>

              {/* CENTER: ARROWS (Bi-Directional Loop) */}
              <div className="arrow-group w-[100px] flex flex-col gap-4 items-center justify-center opacity-0">
                  {/* Top Arrow: Machine -> Human (Glowing Red) */}
                  <div className="w-full relative h-2 drop-shadow-[0_0_5px_rgba(220,38,38,0.8)]">
                     <svg className="absolute inset-0 w-full h-full overflow-visible">
                         <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#DC2626" strokeWidth="3" strokeDasharray="4 2">
                            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1s" repeatCount="indefinite" />
                         </line>
                         <polygon points="90,0 100,5 90,10" fill="#DC2626" transform="translate(0, -1)" />
                     </svg>
                  </div>
                  {/* Bottom Arrow: Human -> Machine (Glowing White) */}
                  <div className="w-full relative h-2 drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]">
                     <svg className="absolute inset-0 w-full h-full overflow-visible">
                         <line x1="100%" y1="50%" x2="0" y2="50%" stroke="#F5F5F5" strokeWidth="3" strokeDasharray="4 2">
                            <animate attributeName="stroke-dashoffset" from="0" to="100" dur="1s" repeatCount="indefinite" />
                         </line>
                         <polygon points="10,0 0,5 10,10" fill="#F5F5F5" transform="translate(0, -1)" />
                     </svg>
                  </div>
              </div>

              {/* RIGHT: HUMAN */}
              <div className="human-group flex flex-col items-end text-right z-10 flex-1 max-w-[320px]">
                <div className="w-full relative p-6 border border-neutral-500/30 bg-black/60 backdrop-blur-md rounded-lg shadow-[0_0_25px_rgba(255,255,255,0.1)] overflow-hidden">
                  
                  {/* NEW: BREATH METAPHOR BACKGROUND (White/Gray) */}
                  <div ref={humanBreathRef} className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
                       <div className="breath-circle absolute w-24 h-24 bg-neutral-200 rounded-full blur-xl"></div>
                       <div className="breath-circle absolute w-16 h-16 border border-neutral-400 rounded-full"></div>
                  </div>

                  <span className="relative block text-[12px] font-mono text-neutral-400 mb-2 tracking-[0.2em] uppercase z-10">Response</span>
                  <span className="relative block font-bold text-white text-2xl md:text-3xl leading-none z-10">HUMAN<br/>SIGNAL</span>
                </div>
              </div>

           </div>
           
           {/* CENTER BOTTOM: CONTEXT GAP */}
           <div className="gap-group absolute bottom-[20vh] flex flex-col items-center">
              <div className="p-6 px-10 border-2 border-[#DC2626] bg-red-950/80 backdrop-blur-md rounded-xl">
                <span className="block font-black text-[#DC2626] text-3xl md:text-5xl tracking-tighter uppercase">CONTEXT GAP</span>
                <span className="block text-sm font-mono text-red-300/80 mt-2 tracking-widest text-center">where coordination breaks</span>
              </div>
           </div>

           {/* FOOTER QUOTE */}
           <div className="quote-group absolute bottom-[10vh] w-full text-center">
              <p className="font-mono text-xs md:text-sm text-neutral-400 leading-relaxed uppercase tracking-wide opacity-80">
                this is a map of fractures in our reality
              </p>
           </div>

        </div>

        {/* PHASE 4: TECTONIC SHIFTS (Redesigned Mapping) */}
        <div ref={textShiftsRef} className="absolute text-center flex flex-col items-center justify-center w-full">
          <h2 className="vf-anim text-[8vw] font-black text-transparent leading-[0.85] tracking-tighter uppercase" style={{ WebkitTextStroke: "2px white", "--wght": 1000 } as React.CSSProperties}>11 TECTONIC</h2>
          <h2 className="vf-anim text-[8vw] font-black text-white leading-[0.85] tracking-tighter uppercase mix-blend-overlay" style={{"--wght": 1000 } as React.CSSProperties}>SHIFTS OF 2025</h2>
          <div className="flex flex-col items-center mt-6">
             <div className="mapping-line h-8 w-[1px] bg-white/50 origin-top mb-4"></div>
             <div className="mapping-text border border-white/20 bg-black/50 px-4 py-1 backdrop-blur-sm">
                <p className="text-xs md:text-sm font-bold text-neutral-300 uppercase tracking-widest font-mono">[ System: Mapping The Fracture ]</p>
             </div>
          </div>
        </div>

        {/* PHASE 5: THE REPORT (CONSOLIDATED) */}
        <div ref={textReportRef} className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-auto">
          
          {/* Top Bar - Gradually Appears */}
          <div ref={finalTopBarRef} className="absolute top-0 w-full p-8 flex justify-end items-center gap-4">
              <div className="flex bg-neutral-800 rounded overflow-hidden text-xs font-mono font-bold">
                 <button className="px-3 py-2 bg-[#DC2626] text-white">EN</button>
                 <button className="px-3 py-2 text-neutral-400 hover:text-white transition-colors">RU</button>
                 <button className="px-3 py-2 text-neutral-400 hover:text-white transition-colors">BY</button>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-neutral-200 text-black text-xs font-mono font-bold rounded hover:bg-white transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg> Sources
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-neutral-200 text-black text-xs font-mono font-bold rounded hover:bg-white transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg> Deck PDF
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-neutral-200 text-black text-xs font-mono font-bold rounded hover:bg-white transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg> Slide PDF
              </button>
              <button className="w-10 h-10 bg-neutral-200 rounded flex items-center justify-center hover:bg-white transition-colors text-black">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              </button>
          </div>

          <div className="flex flex-col items-center justify-center flex-1">
              <h2 ref={reportTitleRef} className="vf-anim text-[6vw] font-bold text-white leading-none tracking-tight relative z-10 text-center">This is the report.</h2>
              <div className="mt-8 flex flex-col items-center gap-4 relative z-10 text-center">
                 <p ref={subText1Ref} className="font-mono text-xl md:text-2xl text-white tracking-wider">
                    machines ↔ humans across 4 layers
                 </p>
                 <p ref={subText2Ref} className="font-mono text-sm md:text-base text-neutral-500 tracking-widest uppercase">
                    foundation → cognition → interface → humanity
                 </p>
                 <div className="mt-4 flex items-center justify-center gap-4">
                     <div className="h-[1px] w-20 bg-neutral-500"></div>
                     <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest">Annual Report 2025/26</p>
                     <div className="h-[1px] w-20 bg-neutral-500"></div>
                 </div>
              </div>
          </div>
          
          {/* Bottom Controls - Moved VERY low */}
          <div className="absolute bottom-12 flex flex-col items-center w-full relative z-10 pb-10">
            <button ref={btnReportRef} className="group relative px-8 py-3 bg-transparent border border-white/30 hover:border-white transition-all duration-500 overflow-hidden" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
               <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
               <span className="relative font-mono text-sm tracking-[0.2em] text-white group-hover:text-black transition-colors duration-500 font-bold uppercase">Explore Report</span>
            </button>
            <div ref={navInstructionsRef} className="mt-6 flex items-center gap-12 text-neutral-500">
               <div className="flex flex-col items-center gap-3">
                 <div className="w-5 h-8 border border-neutral-600 rounded-full flex justify-center pt-1.5"><div className="mouse-anim w-1 h-2 bg-neutral-400 rounded-full"></div></div>
                 <span className="text-[10px] uppercase tracking-widest font-mono">Scroll</span>
               </div>
               <div className="h-8 w-[1px] bg-neutral-800"></div>
               <div className="flex flex-col items-center gap-3">
                 <div className="flex gap-1.5">
                   <div className="key-anim w-12 h-6 border border-neutral-600 rounded flex items-center justify-center text-[9px] font-mono">SPACE</div>
                   <div className="key-anim w-8 h-6 border border-neutral-600 rounded flex items-center justify-center text-[9px] font-mono"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
                 </div>
                 <span className="text-[10px] uppercase tracking-widest font-mono">Navigate</span>
               </div>
            </div>
          </div>

        </div>

      </div>

      {/* REMOVED PHASE 6 (FINAL SCREEN) AS REQUESTED */}

    </section>
  );
};