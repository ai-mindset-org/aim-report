import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { VisualMetaphor } from './VisualMetaphors';

export const StoryScrollPage: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollAttempts, setScrollAttempts] = useState(0);

  const handleWheel = (e: React.WheelEvent) => {
    const element = e.currentTarget;
    const isScrollable = element.scrollHeight > element.clientHeight;
    const isAtTop = element.scrollTop === 0;
    const isAtBottom = element.scrollTop + element.clientHeight >= element.scrollHeight - 5;
    
    if (isAtBottom && e.deltaY > 0) {
      if (scrollAttempts < 3) {
        e.stopPropagation();
        setScrollAttempts(prev => prev + 1);
        return;
      }
      setScrollAttempts(0);
    } else {
      setScrollAttempts(0);
    }
    
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
      className="w-full h-full bg-white overflow-y-auto"
      onWheel={handleWheel}
    >
      {/* Section 1: Hero Cover */}
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-8 md:p-16 relative overflow-hidden bg-white">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.12 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-[600px] h-[600px]">
            <VisualMetaphor type="hero_cover" slideId={1} />
          </div>
        </motion.div>

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
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-neutral-900 uppercase leading-[0.85] text-center select-text cursor-text"
          >
            the context gap
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-xl md:text-2xl text-neutral-600 font-medium mt-4 max-w-2xl text-center select-text cursor-text"
          >
            ai is accelerating. humans are changing.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-sm text-neutral-500 mt-6 max-w-xl text-center select-text cursor-text"
          >
            a yearly reset artifact by ai mindset + community.<br />
            a sovereignty reset for people running their own life.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 flex flex-col items-center gap-3"
          >
            <span className="text-xs font-mono uppercase text-neutral-500 tracking-[0.3em] select-none">
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

      {/* Section 2: Prologue */}
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-8 md:p-16 bg-white">
        <div className="max-w-4xl relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-neutral-900 mb-8 uppercase select-text cursor-text"
          >
            prologue
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl leading-relaxed text-neutral-700 space-y-6 select-text cursor-text"
          >
            <p>2025 wasn't just a year in the ai calendar. it was the moment {parseMarkdown('**context became the most expensive resource on earth**')}.</p>
            <p>we called this report the context gap because it identifies the primary fracture in modern civilization: the distance between the volume of data a machine can generate and the amount of meaning a human can integrate without losing their agency, their sanity, or their will.</p>
            <p className="text-2xl md:text-3xl font-bold text-red-600">machines have conquered the complexity barrier.</p>
            <p className="text-2xl md:text-3xl font-bold text-red-600">humans have hit the context wall.</p>
            <p>ai is accelerating. humans are buffering.</p>
          </motion.div>
        </div>
      </div>

      {/* Section 3: The Battle for Agency */}
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-8 md:p-16 bg-neutral-50">
        <div className="max-w-4xl relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-neutral-900 mb-8 uppercase select-text cursor-text"
          >
            the battle for agency
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl leading-relaxed text-neutral-700 space-y-6 select-text cursor-text"
          >
            <p>we are solving a fundamental crisis: {parseMarkdown('**the loss of agency**')}.</p>
            <p>in a world where generating content, code, and ideas is effectively free, the act of verifying them has become a luxury. we are currently paying a {parseMarkdown('**reliability tax**')} with our time and attention.</p>
            <p>if you cannot audit what the algorithm proposes, you are no longer a leader—you are a passenger.</p>
            <p className="font-bold text-neutral-900">this report is your perimeter defense against:</p>
            <ul className="space-y-4 ml-6">
              <li>{parseMarkdown('**context obesity:**')} cognitive paralysis where you are stuffed with low-value data but starved for meaning. burnout is working memory overflow.</li>
              <li>{parseMarkdown('**the reliability tax:**')} $67 billion in annual losses. creating is free; verifying is expensive.</li>
              <li>{parseMarkdown('**the responsibility void:**')} decisions being made by agents for whose mistakes no human is held accountable.</li>
              <li>{parseMarkdown('**data inbreeding:**')} if ai trains on ai-generated data recursively, models degrade. humans become the only source of clean signal.</li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Section 4: The 11 Shifts Architecture */}
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-8 md:p-16 bg-white">
        <div className="max-w-4xl relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-neutral-900 mb-8 uppercase select-text cursor-text"
          >
            the 11 shifts architecture
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl leading-relaxed text-neutral-700 space-y-6 select-text cursor-text"
          >
            <p className="font-bold text-neutral-900">why layers?</p>
            <p>we organize the 11 shifts into 4 layers because {parseMarkdown('**ai transformation doesn\'t happen all at once**')} - it cascades through civilization in a specific order.</p>
            <p>each layer builds on the previous one. you cannot have reasoning models (layer ii) without energy infrastructure (layer i). you cannot have agentic coding (layer iii) without context architecture (layer ii).</p>
            
            <div className="space-y-4 mt-8">
              <p className="font-bold text-neutral-900">the 4 layers:</p>
              <p>{parseMarkdown('**layer i: foundation (3 shifts)**')} - physics, economics, and power. energy infrastructure, agentic labor, data sovereignty. {parseMarkdown('**the constraint:**')} can we power it? can we afford it? {parseMarkdown('**who control it?**')}</p>
              <p>{parseMarkdown('**layer ii: cognition (3 shifts)**')} - the architecture of meaning and reason. how we think and learn. reasoning models, knowledge systems, scientific discovery. {parseMarkdown('**the constraint:**')} can we trust how it thinks? can we verify its logic?</p>
              <p>{parseMarkdown('**layer iii: interface (3 shifts)**')} - craft, matter, and defense. how we build and protect. coding tools, physical intelligence, security systems. {parseMarkdown('**the constraint:**')} can we maintain what we build? can we defend against what we create?</p>
              <p>{parseMarkdown('**layer iv: humanity (2 shifts)**')} - narrative and intimacy. what keeps us human. storytelling, relationships, meaning-making. {parseMarkdown('**the constraint:**')} can we preserve agency? can we stay connected?</p>
            </div>

            <p className="font-bold text-neutral-900 mt-8">the pattern:</p>
            <p>each shift creates a {parseMarkdown('**machine signal**')} (what ai can do) ↔ {parseMarkdown('**human signal**')} (how people respond) ↔ {parseMarkdown('**context gap**')} (where coordination breaks).</p>
            <p>this isn't a hype deck, a moral panic, or a consulting pdf that says nothing new. this is a map of fractures in our reality.</p>
          </motion.div>
        </div>
      </div>

      {/* Section 5: 11 Tectonic Shifts Divider */}
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-8 md:p-16 bg-neutral-900 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
          <div className="w-full max-w-md">
            <VisualMetaphor type="SECTION_DIVIDER" sectionTitle="11 TECTONIC SHIFTS" />
          </div>
        </div>

        <div className="flex flex-col gap-6 text-center items-center z-10">
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white uppercase leading-[0.85] select-text cursor-text"
          >
            11 tectonic shifts
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-xl md:text-2xl text-neutral-300 font-medium mt-4 max-w-2xl select-text cursor-text"
          >
            machines ↔ humans across 4 layers
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-sm text-neutral-400 mt-6 max-w-xl select-text cursor-text"
          >
            foundation → cognition → interface → humanity<br />
            each shift creates fractures in our reality.
          </motion.p>
        </div>
      </div>

      {/* Buffer section */}
      <div className="h-[50vh] w-full bg-white"></div>
    </div>
  );
};
