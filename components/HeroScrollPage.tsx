import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { VisualMetaphor } from './VisualMetaphors';
import { VisualType } from '../types';

interface HeroScrollPageProps {
  title: string;
  subtitle: string;
  visual: VisualType;
  caption?: string;
  content: string[];
  isDark?: boolean;
}

interface Section {
  title: string;
  subtitle?: string;
  content: string;
  dark?: boolean;
}

export const HeroScrollPage: React.FC<HeroScrollPageProps> = ({
  title,
  subtitle,
  visual,
  caption,
  content,
  isDark = false,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollAttempts, setScrollAttempts] = useState(0);
  
  // Dark mode styling
  const bgClass = isDark ? 'bg-neutral-900' : 'bg-white';
  const textClass = isDark ? 'text-white' : 'text-[#333333]';
  const subtitleClass = isDark ? 'text-neutral-300' : 'text-neutral-600';
  const captionClass = isDark ? 'text-neutral-400' : 'text-neutral-500';
  
  // Parse content into sections based on the storytelling structure
  const sections: Section[] = [
    {
      title: 'prologue',
      content: '2025 wasn\'t just a year in the ai calendar. it was the moment **context became the most expensive resource on earth**.\n\nwe called this report the context gap because it identifies the primary fracture in modern civilization: the distance between the volume of data a machine can generate and the amount of meaning a human can integrate without losing their agency, their sanity, or their will.\n\n**machines have conquered the complexity barrier.**\n\n**humans have hit the context wall.**\n\nai is accelerating. humans are buffering.',
    },
    {
      title: 'the battle for agency',
      content: 'we are solving a fundamental crisis: **the loss of agency**.\n\nin a world where generating content, code, and ideas is effectively free, the act of verifying them has become a luxury. we are currently paying a **reliability tax** with our time and attention.\n\nif you cannot audit what the algorithm proposes, you are no longer a leader—you are a passenger.\n\nthis report is your perimeter defense against:\n\n**context obesity:** cognitive paralysis where you are stuffed with low-value data but starved for meaning. burnout is working memory overflow.\n\n**the reliability tax:** $67 billion in annual losses. creating is free; verifying is expensive.\n\n**the responsibility void:** decisions being made by agents for whose mistakes no human is held accountable.\n\n**data inbreeding:** if ai trains on ai-generated data recursively, models degrade. humans become the only source of clean signal.',
    },
    {
      title: 'the 11 shifts architecture',
      content: '**why layers?**\n\nwe organize the 11 shifts into 4 layers because **ai transformation doesn\'t happen all at once** - it cascades through civilization in a specific order.\n\neach layer builds on the previous one. you cannot have reasoning models (layer ii) without energy infrastructure (layer i). you cannot have agentic coding (layer iii) without context architecture (layer ii).\n\n**the 4 layers:**\n\nlayer i: foundation (3 shifts) - physics, economics, and power. the physical and economic base. energy infrastructure, agentic labor, data sovereignty. **the constraint:** can we power it? can we afford it? who controls it?\n\nlayer ii: cognition (3 shifts) - the architecture of meaning and reason. how we think and learn. reasoning models, knowledge systems, scientific discovery. **the constraint:** can we trust how it thinks? can we verify its logic?\n\nlayer iii: interface (3 shifts) - craft, matter, and defense. how we build and protect. coding tools, physical intelligence, security systems. **the constraint:** can we maintain what we build? can we defend against what we create?\n\nlayer iv: humanity (2 shifts) - narrative and intimacy. what keeps us human. storytelling, relationships, meaning-making. **the constraint:** can we preserve agency? can we stay connected?\n\n**the pattern:**\n\neach shift creates a **machine signal** (what ai can do) ↔ **human signal** (how people respond) ↔ **context gap** (where coordination breaks).\n\nthis isn\'t a hype deck, a moral panic, or a consulting pdf that says nothing new. this is a map of fractures in our reality.',
    },
    {
      title: '11 tectonic shifts',
      subtitle: 'machines ↔ humans across 4 layers',
      content: 'foundation → cognition → interface → humanity\n\neach shift creates fractures in our reality.',
      dark: true,
    },
  ];

  const handleWheel = (e: React.WheelEvent) => {
    const element = e.currentTarget;
    const isScrollable = element.scrollHeight > element.clientHeight;
    const isAtTop = element.scrollTop === 0;
    const isAtBottom = element.scrollTop + element.clientHeight >= element.scrollHeight - 5;
    
    // At the bottom, require 3 scroll attempts before allowing parent scroll
    if (isAtBottom && e.deltaY > 0) {
      if (scrollAttempts < 3) {
        e.stopPropagation();
        setScrollAttempts(prev => prev + 1);
        return;
      }
      // Reset after allowing scroll through
      setScrollAttempts(0);
    } else {
      setScrollAttempts(0);
    }
    
    // Prevent parent scroll if we're scrolling within bounds
    if (isScrollable && ((e.deltaY > 0 && !isAtBottom) || (e.deltaY < 0 && !isAtTop))) {
      e.stopPropagation();
    }
  };

  const parseMarkdown = (text: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];
    const regex = /(\*\*[^*]+\*\*)|(_[^_]+_)/g;
    let lastIndex = 0;
    let match;
    let key = 0;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }

      const matched = match[0];
      if (matched.startsWith('**')) {
        parts.push(
          <strong key={key++} className="font-bold text-red-600">
            {matched.slice(2, -2)}
          </strong>
        );
      } else if (matched.startsWith('_')) {
        parts.push(
          <em key={key++} className="italic">
            {matched.slice(1, -1)}
          </em>
        );
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts.length > 0 ? parts : [text];
  };

  return (
    <div 
      ref={scrollRef}
      className={`w-full h-full ${bgClass} overflow-y-auto`}
      onWheel={handleWheel}
    >
      {/* Hero Section - Full Screen */}
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-8 md:p-16 relative overflow-hidden">
        {/* Background visual - large and animated */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.12 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-[600px] h-[600px]">
            <VisualMetaphor type={visual} slideId={1} />
          </div>
        </motion.div>

        {/* Animated gradient accent */}
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <motion.div
            className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(220,38,38,0.08) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Title block */}
        <div className="flex flex-col gap-4 items-center z-10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ delay: 0.1, duration: 0.5, ease: 'easeOut' }}
            className="h-1 bg-red-600 mb-4"
          />

          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
            className={`text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter ${textClass} uppercase leading-[0.85] text-center`}
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className={`text-xl md:text-2xl ${subtitleClass} font-medium mt-4 max-w-2xl text-center`}
          >
            {subtitle}
          </motion.p>

          {caption && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className={`text-sm ${captionClass} mt-6 max-w-xl text-center`}
            >
              {caption}
            </motion.p>
          )}

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 flex flex-col items-center gap-3"
          >
            <span className={`text-xs font-mono uppercase ${captionClass} tracking-[0.3em]`}>
              Scroll to Continue
            </span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-red-600/50 rounded-full flex justify-center pt-2"
            >
              <motion.div
                animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-red-600 rounded-full"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Content Section - Scrollable */}
      <div className="min-h-screen w-full flex flex-col p-8 md:p-16 relative">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content.map((paragraph, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`text-lg md:text-xl leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}
              >
                {parseMarkdown(paragraph)}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Buffer section - extra space to prevent accidental scroll to next slide */}
      <div className="h-[50vh] w-full"></div>
    </div>
  );
};
