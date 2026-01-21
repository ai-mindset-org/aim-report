import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { SlideData, VisualType } from '../types';
import { VisualMetaphor } from './VisualMetaphors';
import { PromptBlock } from './PromptBlock';
import { LoopTransition } from './LoopTransition';
import { SlideSource, SlideSources } from './SlideSource';
import { useLanguage } from '../LanguageContext';
import { getSlideContent } from '../slideContent';
import { ShiftScrollPage } from './ShiftScrollPage';
import { StoryScrollPage } from './StoryScrollPage';
import { LandingPage } from './LandingPage';

// Parse markdown-style formatting: **bold**, _italic_, and [links](url)
const parseMarkdown = (text: string): React.ReactNode[] => {
  const parts: React.ReactNode[] = [];
  // Match **[text](url)** (bold link), [text](url) (plain link), **bold** (but not if followed by [), or _italic_
  const regex = /(\*\*\[([^\]]+)\]\(([^)]+)\)\*\*)|(\[([^\]]+)\]\(([^)]+)\))|(\*\*(?!\[)[^*]+\*\*)|(_[^_]+_)/g;
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    // Add text before match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const matched = match[0];
    if (matched.startsWith('**[')) {
      // Bold link **[text](url)**
      const linkText = match[2];
      const linkUrl = match[3];
      parts.push(
        <a 
          key={key++} 
          href={linkUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-bold text-red-600 hover:text-neutral-400 transition-colors cursor-pointer"
        >
          {linkText}
        </a>
      );
    } else if (matched.startsWith('[')) {
      // Plain link [text](url)
      const linkText = match[5];
      const linkUrl = match[6];
      parts.push(
        <a 
          key={key++} 
          href={linkUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-bold text-red-600 hover:text-neutral-400 transition-colors cursor-pointer"
        >
          {linkText}
        </a>
      );
    } else if (matched.startsWith('**')) {
      // Bold
      parts.push(
        <strong key={key++} className="font-bold text-red-600">
          {matched.slice(2, -2)}
        </strong>
      );
    } else if (matched.startsWith('_')) {
      // Italic
      parts.push(
        <em key={key++} className="italic">
          {matched.slice(1, -1)}
        </em>
      );
    }

    lastIndex = regex.lastIndex;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
};

// Parse markdown for Context Gap block - inverted colors (black on white badge)
const parseGapMarkdown = (text: string): React.ReactNode[] => {
  const parts: React.ReactNode[] = [];
  // Regex to match **bold** or _italic_
  const regex = /(\*\*[^*]+\*\*)|(_[^_]+_)/g;
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    // Add text before match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const matched = match[0];
    if (matched.startsWith('**')) {
      // Bold - highlighted as black text on white/cream background for contrast on red
      parts.push(
        <strong key={key++} className="font-black bg-white/95 text-neutral-900 px-2 py-0.5 rounded-sm mx-0.5">
          {matched.slice(2, -2)}
        </strong>
      );
    } else if (matched.startsWith('_')) {
      // Italic - subtle styling on red background
      parts.push(
        <em key={key++} className="italic text-white/90">
          {matched.slice(1, -1)}
        </em>
      );
    }

    lastIndex = regex.lastIndex;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
};

// Component to render text with markdown parsing
const MarkdownText: React.FC<{ children: string; className?: string }> = ({ children, className }) => (
  <span className={className}>{parseMarkdown(children)}</span>
);

interface Props {
  data: SlideData;
  // Optional slide index (0-based). Used by some wrappers (print/PDF) for bookkeeping.
  // We prefer displaying the real slide order (index + 1) so we can insert slides
  // without renumbering content IDs used by `ReportMetaphors`.
  index?: number;
}

export const Slide: React.FC<Props> = ({ data, index }) => {
  const { lang } = useLanguage();

  // Get translated content if available, fallback to original
  // Use index+1 because slides are re-indexed in SLIDES export
  const slideId = typeof index === 'number' ? index + 1 : data.id;
  const translated = useMemo(() => {
    if (lang === 'en') return null;
    return getSlideContent(slideId, lang);
  }, [slideId, lang]);

  // Merge translated content with original data
  const title = translated?.title ?? data.title;
  const subtitle = translated?.subtitle ?? data.subtitle;
  const caption = translated?.caption ?? data.caption;
  const content = translated?.content ?? data.content;
  const stats = translated?.stats ?? data.stats;
  const cards = translated?.cards ?? data.cards;
  const leftTitle = translated?.leftTitle ?? data.leftTitle;
  const rightTitle = translated?.rightTitle ?? data.rightTitle;
  const leftContent = translated?.leftContent ?? data.leftContent;
  const rightContent = translated?.rightContent ?? data.rightContent;
  const loopData = translated?.loopData ? {
    ...(data.loopData || {}),
    machine: translated.loopData.machine ?? data.loopData?.machine,
    human: translated.loopData.human ?? data.loopData?.human,
    gap: translated.loopData.gap ?? data.loopData?.gap,
  } : data.loopData;
  const displayNo = typeof index === 'number' ? index + 1 : data.id;
  const displayNoStr = displayNo.toString().padStart(2, '0');

  // Dark mode styling
  const isDark = data.dark === true;
  const bgClass = isDark ? 'bg-neutral-900' : 'bg-white';
  const textClass = isDark ? 'text-white' : 'text-[#333333]';
  const subtitleClass = isDark ? 'text-neutral-300' : 'text-neutral-600';
  const gridLineClass = isDark ? 'bg-neutral-800' : 'bg-neutral-100';
  const captionClass = isDark ? 'text-neutral-400' : 'text-neutral-500';

  // Extract loop number from title if it's a loop slide (e.g., "LOOP 01 — ...")
  const loopMatch = title?.match(/LOOP\s*(\d+)/i);
  const loopNumber = loopMatch ? parseInt(loopMatch[1], 10) : undefined;

  // Hero Scroll layout - landing page with Hero, VariableText, and PinnedSVG sections
  if (data.layout === 'hero-scroll') {
    return <LandingPage />;
  }

  // Story Scroll layout - all storytelling sections as full-screen scrollable page
  if (data.layout === 'story-scroll') {
    return <StoryScrollPage />;
  }

  // Product layout - connects loops to AIM ecosystem
  if (data.layout === 'product') {
    const products = data.productData ?? [];
    const typeColors: Record<string, string> = {
      seasonal: 'bg-amber-100 text-amber-700 border-amber-200',
      sprint: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      premium: 'bg-purple-100 text-purple-700 border-purple-200',
      community: 'bg-sky-100 text-sky-700 border-sky-200',
    };

    return (
      <div className={`w-full h-full flex flex-col p-6 md:p-12 relative overflow-hidden ${bgClass}`}>
        {/* Header */}
        <div className="flex justify-between items-start mb-4 z-10">
          <div className="border-l-4 border-red-600 pl-4">
            <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
              CLOSE THE GAP
            </div>
            <h1 className={`text-2xl md:text-4xl font-black tracking-tighter ${textClass} uppercase leading-[0.9]`}>
              {title}
            </h1>
            {subtitle && (
              <p className={`text-sm md:text-base ${subtitleClass} font-medium mt-2`}>
                {subtitle}
              </p>
            )}
          </div>
          <div className="opacity-20 w-16 h-16">
            <VisualMetaphor type={data.visual} slideId={data.id} />
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 content-center">
          {products.map((product, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className={`${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-neutral-200'} border p-5 rounded-lg hover:shadow-lg transition-all group`}
            >
              {/* Type badge */}
              <div className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider mb-3 border ${typeColors[product.type] || 'bg-neutral-100 text-neutral-600'}`}>
                {product.type}
              </div>

              <h3 className={`text-lg font-bold ${textClass} mb-2`}>{product.name}</h3>
              <p className={`text-sm ${subtitleClass} mb-3 leading-relaxed`}>{product.description}</p>

              <div className="flex items-center justify-between mt-auto pt-3 border-t border-neutral-100">
                {product.duration && (
                  <span className="text-xs font-mono text-neutral-400">{product.duration}</span>
                )}
                {product.price && (
                  <span className="text-sm font-bold text-red-600">{product.price}</span>
                )}
              </div>

              {product.url && (
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block text-xs font-mono text-red-600 hover:underline group-hover:translate-x-1 transition-transform"
                >
                  Learn more →
                </a>
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 flex justify-between items-center">
          <span className="text-red-600 font-mono text-sm font-bold">{displayNoStr}</span>
          {caption && (
            <p className={`${captionClass} text-[10px] font-mono uppercase tracking-widest`}>
              {caption}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Metaphor layout - minimalist animated intro for loops (inspired by gac-c)
  if (data.layout === 'metaphor') {
    // Extract loop number from subtitle (e.g., "LOOP 01")
    const loopMatch = subtitle?.match(/LOOP\s*(\d+)/i);
    const loopNum = loopMatch ? parseInt(loopMatch[1], 10) : undefined;

    return (
      <div className={`w-full h-full flex flex-col relative overflow-hidden ${isDark ? 'bg-neutral-900' : 'bg-white'}`}>
        {/* Full-screen animated visual */}
        <div className="absolute inset-0 flex items-center justify-center opacity-40">
          <div className="w-[70vmin] h-[70vmin]">
            <VisualMetaphor type={data.visual} slideId={data.id} />
          </div>
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-8 md:p-16">
          {/* Loop number badge */}
          {subtitle && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-4"
            >
              <span className="text-xs md:text-sm font-mono uppercase tracking-[0.3em] text-red-600 bg-red-50 px-4 py-2 rounded-full border border-red-200">
                {subtitle}
              </span>
            </motion.div>
          )}

          {/* Main title */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter ${textClass} uppercase leading-[0.85] text-center max-w-4xl`}
          >
            {title}
          </motion.h1>

          {/* Caption / Description */}
          {caption && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className={`mt-6 text-lg md:text-xl ${subtitleClass} font-medium text-center max-w-2xl`}
            >
              {caption}
            </motion.p>
          )}

          {/* Loop number indicator */}
          {loopNum && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="mt-8"
            >
              <LoopTransition loopNumber={loopNum} variant="orbit" size="sm" />
            </motion.div>
          )}
        </div>

        {/* Corner branding */}
        <div className="absolute bottom-6 left-8 flex items-center gap-3 z-10">
          <span className="text-red-600 font-mono text-sm font-bold">
            {displayNoStr}
          </span>
          <span className={`${subtitleClass} text-xs font-mono uppercase tracking-widest`}>
            AI MINDSET
          </span>
        </div>
      </div>
    );
  }

  // Paired text layout (Machines ↔ Humans) - with animations
  if (data.layout === 'paired') {
    return (
      <div className={`w-full h-full flex flex-col p-8 md:p-12 relative overflow-hidden ${bgClass}`}>
        {/* Grid Lines */}
        <div className={`absolute top-0 left-16 w-[1px] h-full ${gridLineClass}`} />
        <div className={`absolute top-12 left-0 w-full h-[1px] ${gridLineClass}`} />
        <div className={`absolute top-0 right-16 w-[1px] h-full ${gridLineClass}`} />

        {/* Decorative large arrows showing the pairing concept */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <svg className="w-[600px] h-[300px]" viewBox="0 0 200 100">
            <path d="M30 50 H90 L75 35 M90 50 L75 65" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M170 50 H110 L125 35 M110 50 L125 65" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </motion.div>

        {/* Header */}
        <div className="absolute top-6 left-20 flex items-center gap-8 z-10">
          <span className="text-red-600 font-mono text-base font-bold">
            {displayNoStr}
          </span>
          <span className={`${textClass} font-bold tracking-tight uppercase text-base`}>
            AI MINDSET
          </span>
        </div>

        {/* Slide metaphor (unique per slide for Annual Report) - animated */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="absolute top-20 right-16 w-48 h-32"
        >
          <VisualMetaphor type={data.visual} slideId={data.id} />
        </motion.div>

        <div className="flex-1 w-full h-full flex flex-col justify-center relative z-10 pt-16">
          <div className="pl-12 pr-12">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="text-4xl md:text-6xl font-black tracking-tighter text-[#333333] uppercase leading-[0.85]"
            >
              {title}
            </motion.h1>
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="text-lg md:text-xl text-neutral-600 font-medium mt-3"
              >
                {subtitle}
              </motion.p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 h-full items-start pl-12 pr-12 mt-8">
            {/* Left panel - staggered animation */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-col gap-4 bg-neutral-50 p-6 rounded-lg border-t-4 border-red-600 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 bg-red-600" />
                <span className="text-sm font-mono uppercase tracking-widest text-neutral-600 font-bold">
                  {leftTitle || 'MACHINES'}
                </span>
              </div>
              {leftContent && (
                <ul className="space-y-3">
                  {leftContent.map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      className="flex items-start gap-3 text-base text-neutral-800 leading-relaxed"
                    >
                      <span className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0" />
                      <span>{parseMarkdown(item)}</span>
                    </motion.li>
                  ))}
                </ul>
              )}
            </motion.div>

            {/* Right panel - staggered animation */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col gap-4 bg-neutral-50 p-6 rounded-lg border-t-4 border-black hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 bg-black" />
                <span className="text-sm font-mono uppercase tracking-widest text-neutral-600 font-bold">
                  {rightTitle || 'HUMANS'}
                </span>
              </div>
              {rightContent && (
                <ul className="space-y-3">
                  {rightContent.map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                      className="flex items-start gap-3 text-base text-neutral-800 leading-relaxed"
                    >
                      <span className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0" />
                      <span>{parseMarkdown(item)}</span>
                    </motion.li>
                  ))}
                </ul>
              )}
            </motion.div>
          </div>
        </div>

        {caption && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute bottom-4 left-0 w-full text-center"
          >
            <p className="text-neutral-500 text-sm font-mono uppercase tracking-widest">
              {caption}
            </p>
          </motion.div>
        )}
      </div>
    );
  }

  // Helper to highlight numbers/percentages and parse markdown in text
  const formatWithBoldNumbers = (text: string, baseClass: string) => {
    // First parse markdown
    const parsedMarkdown = parseMarkdown(text);

    // Then process each part for numbers
    return parsedMarkdown.map((part, i) => {
      if (typeof part === 'string') {
        // Split by numbers/percentages, highlight them with softer red
        const numberParts = part.split(/(\d+(?:\.\d+)?%?(?:K|M|B|x)?)/g);
        return numberParts.map((numPart, j) => {
          if (/^\d+(?:\.\d+)?%?(?:K|M|B|x)?$/.test(numPart)) {
            return <span key={`${i}-${j}`} className="font-black text-red-500/70">{numPart}</span>;
          }
          return <span key={`${i}-${j}`} className={baseClass}>{numPart}</span>;
        });
      }
      // Already a React element (bold/italic from markdown)
      return part;
    });
  };

  // Loop intro layout - visual metaphor hero with loop title
  if (data.layout === 'loop-intro') {
    return (
      <div className={`w-full h-full flex flex-col items-center justify-center p-8 md:p-16 relative overflow-hidden ${bgClass}`}>
        {/* Background grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute left-0 top-0 w-full h-full" style={{
            backgroundImage: 'linear-gradient(90deg, currentColor 1px, transparent 1px), linear-gradient(currentColor 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Loop number badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <div className={`text-[10px] font-mono uppercase tracking-[0.3em] ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
            paired loop
          </div>
        </motion.div>

        {/* Large Visual Metaphor */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="w-48 h-48 md:w-64 md:h-64 mb-8"
        >
          <VisualMetaphor type={data.visual} slideId={data.id} />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`text-3xl md:text-5xl font-black tracking-tight ${textClass} text-center leading-[1.1] mb-4`}
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`text-lg md:text-xl ${subtitleClass} text-center max-w-2xl font-medium`}
          >
            {subtitle}
          </motion.p>
        )}

        {/* Arrow indicator to next slide */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`absolute bottom-8 right-8 ${isDark ? 'text-neutral-600' : 'text-neutral-300'}`}
        >
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // Loop layout (Machines / Humans / Gap) - CLEAN MINIMAL DESIGN with bold numbers
  if (data.layout === 'loop') {
    let loop = loopData;
    
    // Fallback: parse content array if loopData is missing
    if (!loop && content && content.length > 0) {
      const fullText = content.join(' ');
      const machineMatch = fullText.match(/\*\*Machine:\*\*(.*?)(?=\*\*Human:\*\*|\*\*Gap:\*\*|$)/s);
      const humanMatch = fullText.match(/\*\*Human:\*\*(.*?)(?=\*\*Gap:\*\*|$)/s);
      const gapMatch = fullText.match(/\*\*Gap:\*\*(.*?)$/s);
      
      loop = {
        machine: machineMatch ? machineMatch[1].trim() : '',
        human: humanMatch ? humanMatch[1].trim() : '',
        gap: gapMatch ? gapMatch[1].trim() : ''
      };
    }
    
    if (!loop || !loop.machine) return null;

    return (
      <div className={`w-full h-full flex flex-col p-6 md:p-12 relative overflow-hidden ${bgClass}`}>
        {/* Header */}
        <div className="flex justify-between items-start mb-6 z-10">
          <div className="border-l-4 border-red-600 pl-4">
            <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
              PAIRED LOOP
            </div>
            <h1 className={`text-3xl md:text-5xl font-black tracking-tighter ${textClass} uppercase leading-[0.9]`}>
              {title}
            </h1>
            {subtitle && (
              <p className={`text-sm md:text-base ${subtitleClass} font-medium mt-2`}>
                {subtitle}
              </p>
            )}
          </div>

          {/* Minimal visual indicator */}
          <div className="opacity-30">
            {loopNumber ? (
              <LoopTransition loopNumber={loopNumber} variant="orbit" size="sm" />
            ) : (
              <div className="w-20 h-20">
                <VisualMetaphor type={data.visual} slideId={data.id} />
              </div>
            )}
          </div>
        </div>

        {/* Main Grid - Compact */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {/* Machine Block */}
          <motion.div
            initial={{ x: -12, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className={`${isDark ? 'bg-white/5' : 'bg-neutral-50'} p-5 border-t-[3px] ${isDark ? 'border-white' : 'border-black'}`}
          >
            <div className={`flex items-center gap-2 mb-3 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <path d="M9 9h6v6H9z" />
              </svg>
              <span className="text-[11px] font-mono uppercase tracking-widest font-bold">Machine (change)</span>
            </div>
            <div className={`text-base md:text-lg leading-relaxed whitespace-pre-line`}>
              {loop.machine?.split('\n').map((line, i) => (
                <div key={i} className="mb-1">
                  {formatWithBoldNumbers(line, isDark ? 'text-neutral-300' : 'text-neutral-600')}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Human Block */}
          <motion.div
            initial={{ x: 12, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`${isDark ? 'bg-white/5' : 'bg-neutral-50'} p-5 border-t-[3px] ${isDark ? 'border-white' : 'border-black'}`}
          >
            <div className={`flex items-center gap-2 mb-3 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
              </svg>
              <span className="text-[11px] font-mono uppercase tracking-widest font-bold">Human (reaction)</span>
            </div>
            <div className={`text-base md:text-lg leading-relaxed whitespace-pre-line`}>
              {loop.human?.split('\n').map((line, i) => (
                <div key={i} className="mb-1">
                  {formatWithBoldNumbers(line, isDark ? 'text-neutral-300' : 'text-neutral-600')}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Gap Block + Evidence - Full Width Row */}
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`md:col-span-2 grid ${data.sources && data.sources.length > 0 ? 'md:grid-cols-3' : 'md:grid-cols-1'} gap-0`}
          >
            {/* Gap Block */}
            <div className={`${data.sources && data.sources.length > 0 ? 'md:col-span-2' : ''} bg-red-600 text-white p-5 md:p-6 flex items-start gap-4 relative overflow-hidden`}>
              {/* Diagonal stripe pattern */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, white 10px, white 11px)'
              }} />

              <div className="shrink-0 bg-white/20 p-2 rounded-full mt-1">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <div className="relative z-10 flex-1">
                <div className="text-[10px] font-mono uppercase tracking-widest opacity-80 mb-1">
                  The Context Gap
                </div>
                <div className="text-lg md:text-xl font-bold leading-tight tracking-tight whitespace-pre-line">
                  {loop.gap?.split('\n').map((line, i) => (
                    <div key={i}>{parseGapMarkdown(line)}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Evidence Column - only show if sources exist */}
            {data.sources && data.sources.length > 0 && (
              <div className={`${isDark ? 'bg-neutral-800 border-neutral-700' : 'bg-neutral-100 border-neutral-200'} p-4 md:p-5 border-l flex flex-col`}>
                <div className={`flex items-center gap-2 mb-3 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-[11px] font-mono uppercase tracking-widest font-bold">Evidence</span>
                  <span className="px-1.5 py-0.5 bg-red-500 text-white text-[9px] font-bold rounded">{data.sources.length}</span>
                </div>
                <div className="space-y-2 flex-1 overflow-y-auto max-h-32">
                  {data.sources.map((source, i) => {
                    // Extract short name (before "—") for display, keep full label for tooltip
                    const shortLabel = source.label.includes('—')
                      ? source.label.split('—')[0].trim()
                      : source.label;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.05 }}
                      >
                        {source.url ? (
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={source.label}
                            className={`block text-[11px] font-mono ${isDark ? 'text-neutral-400 hover:text-red-400' : 'text-neutral-600 hover:text-red-600'} transition-colors leading-tight truncate`}
                          >
                            <span className="opacity-60 mr-1">→</span>
                            {shortLabel}
                          </a>
                        ) : (
                          <span
                            title={source.label}
                            className={`block text-[11px] font-mono ${isDark ? 'text-neutral-500' : 'text-neutral-500'} leading-tight truncate`}
                          >
                            <span className="opacity-60 mr-1">•</span>
                            {shortLabel}
                          </span>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>

        </div>

        {/* Footer - simplified */}
        <div className="mt-3 flex justify-between items-center">
          {/* Lab Reference */}
          {loop.lab && (
            <motion.a
              href={loop.lab.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 }}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest
                ${isDark ? 'bg-white/10 text-white/80 hover:bg-white/20' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}
                transition-colors cursor-pointer`}
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4" />
              </svg>
              {loop.lab.name}
              <svg className="w-2.5 h-2.5 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </motion.a>
          )}
          {caption && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className={loop.lab ? '' : 'w-full text-center'}
            >
              <p className={`${captionClass} text-[10px] font-mono uppercase tracking-widest`}>
                {caption}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  // Shift Scroll layout - combines intro, loop, and evidence into one scrollable page
  if (data.layout === 'shift-scroll') {
    let loop = loopData || { machine: '', human: '', gap: '' };
    let evidenceData = data.evidenceData || {};
    let sourcesArr = data.sources || [];
    let introSummary: string | undefined = undefined;
    
    // Fallback: parse content array if structured data is missing
    if ((!loop.machine || !evidenceData.keyStats) && content && content.length > 0) {
      const fullText = content.join(' ');
      
      // Parse The Machine Signal (intro summary)
      const introSummaryMatch = fullText.match(/\*\*The Machine Signal:\*\*(.*?)(?=\*\*Machine:\*\*|\*\*Human:\*\*|$)/s);
      introSummary = introSummaryMatch ? introSummaryMatch[1].trim() : undefined;
      
      // Parse Machine, Human, Gap, and their summaries
      const machineMatch = fullText.match(/\*\*Machine:\*\*(.*?)(?=\*\*Machine Summary:\*\*|\*\*Human:\*\*|\*\*Gap:\*\*|$)/s);
      const machineSummaryMatch = fullText.match(/\*\*Machine Summary:\*\*(.*?)(?=post-training:|\*\*Human:\*\*|\*\*Gap:\*\*|$)/s);
      const postTrainingMatch = fullText.match(/post-training:\s*([^\n]+)/);
      const humanMatch = fullText.match(/\*\*Human:\*\*(.*?)(?=\*\*Human Summary:\*\*|\*\*Gap:\*\*|\*\*Key Stats:\*\*|$)/s);
      const humanSummaryMatch = fullText.match(/\*\*Human Summary:\*\*(.*?)(?=\*\*Gap:\*\*|\*\*Key Stats:\*\*|$)/s);
      const gapMatch = fullText.match(/\*\*Gap:\*\*(.*?)(?=\*\*Key Stats:\*\*|$)/s);
      
      if (machineMatch || humanMatch || gapMatch) {
        loop = {
          machine: machineMatch ? machineMatch[1].trim() : '',
          machineSummary: machineSummaryMatch ? machineSummaryMatch[1].trim() : undefined,
          postTraining: postTrainingMatch ? postTrainingMatch[1].trim() : undefined,
          human: humanMatch ? humanMatch[1].trim() : '',
          humanSummary: humanSummaryMatch ? humanSummaryMatch[1].trim() : undefined,
          gap: gapMatch ? gapMatch[1].trim() : ''
        };
      }
      
      // Parse Key Stats
      const statsMatch = fullText.match(/\*\*Key Stats:\*\*\s*(.+?)(?:\*\*Research:\*\*|\*\*Industry Signals:\*\*|$)/s);
      if (statsMatch) {
        const statItems = statsMatch[1].split(/\s+-\s+/).map(s => s.trim()).filter(Boolean);
        
        evidenceData.keyStats = statItems.map(item => {
          // Robust single-pass regex for Key Stats
          // Handles optional leading dash, optional leading **, and colon separator variations
          // Group 1: Value (may contain **), Group 2: Label
          const match = item.match(/^\s*(?:[-•]\s+)?(?:\*\*)?(.+?)(?::\*\*|\*\*:\s*|:)\s*(.+)$/s);
          
          if (match) {
            // Explicitly remove any remaining ** from the value
            const value = match[1].replace(/\*\*/g, '').trim();
            const label = match[2].trim();
            
            // Check for inline links to add to sources list if needed
            if (label.includes('[') && label.includes('](')) {
              const linkMatches = label.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g);
              for (const linkMatch of linkMatches) {
                const sourceLabel = linkMatch[1];
                const sourceUrl = linkMatch[2];
                if (!sourcesArr.some(s => s.label === sourceLabel)) {
                  sourcesArr.push({ label: sourceLabel, url: sourceUrl });
                }
              }
            }
            
            return { value, label };
          }
          return null;
        }).filter((item): item is { value: string; label: string } => item !== null);
      }
      
      // Parse AI Mindset Evidence separately
      const aimMatch = fullText.match(/\*\*AI Mindset Evidence:\*\*\s*(.+?)(?:\*\*Tags:\*\*|\*\*Community Voices:\*\*|$)/s);
      if (aimMatch) {
        const aimItems = aimMatch[1]
          .split(/(?=→ \[)/g)
          .map(s => s.trim())
          .filter(s => s.startsWith('→ ['));
        
        evidenceData.aimindsetEvidence = aimItems.map(item => {
          const cleanItem = item.replace(/^→\s*/, '').trim();
          return `ARROW:${cleanItem}`;
        });
      }
      
      // Parse Community Voices separately
      const communityMatch = fullText.match(/\*\*Community Voices:\*\*\s*(.+?)(?:\s+source:|$)/s);
      if (communityMatch) {
        const communityItems = communityMatch[1]
          .split(/(?=→ \*\*)/g)
          .map(s => s.trim())
          .filter(s => s.startsWith('→ **'));
        
        evidenceData.communityVoices = communityItems.map(item => {
          const cleanItem = item.replace(/^→\s*/, '').trim();
          return cleanItem;
        });
      }
      
      // Parse Research Highlights with URLs from sources
      const researchMatch = fullText.match(/\*\*Research:\*\*\s*(.+?)(?:\*\*AI Mindset Evidence:\*\*|\*\*Tags:\*\*|\*\*Industry Signals:\*\*|$)/s);
      if (researchMatch) {
        // Split on markdown list items: - [TOP] [**Title**](url) or - [**Title**](url)
        // This works even when lines are merged in JSON
        const researchText = researchMatch[1];
        const researchItems = researchText
          .split(/(?=- (?:\[TOP\] )?\[\*\*)/g)
          .map(s => s.trim())
          .filter(s => s.startsWith('- ['));
        
        // Keep research items as-is with [TOP] prefix for important ones
        evidenceData.researchHighlights = researchItems.map((item) => {
          // Remove leading dash but keep [TOP] prefix and markdown
          return item.replace(/^-\s*/, '').trim();
        });
      }
      
      // Parse Industry Signals from markdown (fallback)
      const industryMatch = fullText.match(/\*\*Industry Signals:\*\*\s*(.+?)(?:\s+source:|$)/s);
      if (industryMatch) {
        evidenceData.industryData = industryMatch[1].split(',').map(s => s.trim()).filter(Boolean);
      }
    }
    
    // Use tags from JSON if available (preferred over markdown parsing)
    if (data.tags && data.tags.length > 0) {
      evidenceData.industryData = data.tags;
    }
    
    const sources = (sourcesArr || []).map(s => ({ label: s.label, url: s.url || '' }));
    
    return (
      <ShiftScrollPage
        shiftNumber={data.loopNumber || 1}
        title={title || ''}
        subtitle={subtitle || ''}
        alternativeSubtitle={data.alternativeSubtitle}
        introSummary={introSummary}
        caption={data.caption}
        visual={data.visual}
        machine={loop.machine || ''}
        machineSummary={loop.machineSummary}
        postTraining={loop.postTraining}
        human={loop.human || ''}
        humanSummary={loop.humanSummary}
        gap={loop.gap || ''}
        evidenceData={evidenceData}
        sources={sources}
        isDark={isDark}
      />
    );
  }

  // Loop Evidence layout - dedicated slide for research data and sources per loop
  if (data.layout === 'loop-evidence') {
    let evidenceData = data.evidenceData ?? {};
    let sourcesArr = data.sources ?? [];
    
    // Fallback: parse content array into evidenceData if missing
    if (!evidenceData.keyStats && content && content.length > 0) {
      const fullText = content.join(' ');
      
      // Parse Key Stats - works with inline text without newlines
      const statsMatch = fullText.match(/\*\*Key Stats:\*\*\s*(.+?)(?:\*\*Research:\*\*|\*\*Industry Signals:\*\*|$)/s);
      if (statsMatch) {
        const statItems = statsMatch[1].split(/\s+-\s+/).map(s => s.trim()).filter(Boolean);
        
        evidenceData.keyStats = statItems.map(item => {
          // Robust single-pass regex for Key Stats
          const match = item.match(/^\s*(?:[-•]\s+)?(?:\*\*)?(.+?)(?::\*\*|\*\*:\s*|:)\s*(.+)$/s);
          
          if (match) {
            // Explicitly remove any remaining ** from the value
            const value = match[1].replace(/\*\*/g, '').trim();
            const label = match[2].trim();
            
            if (label.includes('[') && label.includes(']') && label.includes('(') && label.includes(')')) {
              const sourceMatch = label.match(/\[(.*?)\]\((.*?)\)/);
              if (sourceMatch) {
                const sourceLabel = sourceMatch[1].trim();
                const sourceUrl = sourceMatch[2].trim();
                if (!sourcesArr.some(s => s.label === sourceLabel)) {
                  sourcesArr.push({ label: sourceLabel, url: sourceUrl });
                }
              }
            }
            
            return { value, label };
          }
          return null;
        }).filter((item): item is { value: string; label: string; source?: string } => item !== null);
      }
      
      // Parse Research Highlights with URLs from sources
      const researchMatch = fullText.match(/\*\*Research:\*\*\s*(.+?)(?:\*\*Industry Signals:\*\*|$)/);
      if (researchMatch) {
        const researchItems = researchMatch[1].split(/\s+-\s+/).map(s => s.trim()).filter(Boolean);
        
        // Match research items with their sources based on text similarity
        evidenceData.researchHighlights = researchItems.map((item, index) => {
          // Remove leading '-' from first item if present
          const cleanItem = index === 0 ? item.replace(/^-\s*/, '') : item;
          // Find matching source by checking if source label contains key parts of research item
          const matchingSource = sourcesArr.find(source => {
            const labelLower = source.label.toLowerCase();
            // Check for quoted text match or significant overlap
            const quotedMatch = cleanItem.match(/"([^"]+)"/);
            if (quotedMatch && labelLower.includes(quotedMatch[1].toLowerCase())) {
              return true;
            }
            // Check for key phrase match (e.g., "Three Mile Island", "Brian Janous")
            const keyPhrases = cleanItem.match(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)+\b/g) || [];
            return keyPhrases.some(phrase => labelLower.includes(phrase.toLowerCase()));
          });
          
          return matchingSource ? `${cleanItem}|${matchingSource.url}` : cleanItem;
        });
      }
      
      // Parse Industry Signals
      const industryMatch = fullText.match(/\*\*Industry Signals:\*\*\s*(.+?)(?:\s+source:|$)/s);
      if (industryMatch) {
        evidenceData.industryData = industryMatch[1].split(',').map(s => s.trim()).filter(Boolean);
      }
    }
    
    const loopNum = data.loopNumber ?? 1;

    return (
      <div className={`w-full h-full flex flex-col p-6 md:p-10 relative overflow-hidden ${bgClass}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4 z-10">
          <div className="border-l-4 border-red-600 pl-4">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 mb-1">
              <span>evidence base</span>
              <span className="px-1.5 py-0.5 bg-red-600 text-white rounded text-[9px] font-bold">loop {loopNum}</span>
            </div>
            <h1 className={`text-2xl md:text-3xl font-black tracking-tight ${textClass} uppercase leading-[1.1]`}>
              {title}
            </h1>
          </div>
          <div className="w-16 h-16 opacity-30">
            <VisualMetaphor type={data.visual} slideId={data.id} />
          </div>
        </div>

        {/* Main content grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 overflow-hidden">
          {/* Key Stats Column */}
          {evidenceData.keyStats && evidenceData.keyStats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`${isDark ? 'bg-white/5' : 'bg-neutral-50'} p-5 rounded-lg`}
            >
              <div className={`flex items-center gap-2 mb-4 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3v18h18" />
                  <path d="M18 9l-5 5-4-4-3 3" />
                </svg>
                <span className="text-[11px] font-mono uppercase tracking-widest font-bold">Key Data</span>
              </div>
              <div className="space-y-3">
                {evidenceData.keyStats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.05 }}
                    className="flex flex-col"
                  >
                    <span className="text-2xl md:text-3xl font-black text-red-600">{stat.value}</span>
                    <span className={`text-sm ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>{stat.label}</span>
                    {stat.source && (
                      <span className={`text-[10px] font-mono ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>{stat.source}</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Research Highlights Column */}
          {evidenceData.researchHighlights && evidenceData.researchHighlights.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`${isDark ? 'bg-white/5' : 'bg-neutral-50'} p-5 rounded-lg`}
            >
              <div className={`flex items-center gap-2 mb-4 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="text-[11px] font-mono uppercase tracking-widest font-bold">Research</span>
              </div>
              <div className="space-y-2.5">
                {evidenceData.researchHighlights.map((highlight, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + i * 0.05 }}
                    className={`text-sm ${isDark ? 'text-neutral-300' : 'text-neutral-700'} leading-relaxed flex items-start gap-2`}
                  >
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-1.5 shrink-0" />
                    <span>{parseMarkdown(highlight)}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Sources Column */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`${isDark ? 'bg-red-900/20 border-red-800/30' : 'bg-red-50 border-red-100'} p-5 rounded-lg border`}
          >
            <div className={`flex items-center gap-2 mb-4`}>
              <svg className="w-4 h-4 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-[11px] font-mono uppercase tracking-widest font-bold text-red-600">Sources</span>
              <span className="px-1.5 py-0.5 bg-red-600 text-white text-[9px] font-bold rounded">{sourcesArr.length}</span>
            </div>
            <div className="space-y-2 max-h-[280px] overflow-y-auto pr-2">
              {sourcesArr.map((source, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.03 }}
                  className={`${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-red-100/50'} p-2.5 rounded transition-colors`}
                >
                  {source.url ? (
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block text-[11px] font-mono ${isDark ? 'text-neutral-300 hover:text-red-400' : 'text-neutral-700 hover:text-red-600'} transition-colors leading-tight`}
                    >
                      <span className="text-red-500 mr-1.5">→</span>
                      {source.label}
                    </a>
                  ) : (
                    <span className={`block text-[11px] font-mono ${isDark ? 'text-neutral-400' : 'text-neutral-600'} leading-tight`}>
                      <span className="opacity-50 mr-1.5">•</span>
                      {source.label}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Industry Data Footer (if available) */}
        {evidenceData.industryData && evidenceData.industryData.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={`mt-4 pt-4 border-t ${isDark ? 'border-neutral-700' : 'border-neutral-200'}`}
          >
            <div className="flex flex-wrap gap-2">
              {evidenceData.industryData.map((item, i) => (
                <span
                  key={i}
                  className={`text-[10px] font-mono px-2 py-1 rounded ${isDark ? 'bg-white/10 text-neutral-300' : 'bg-neutral-100 text-neutral-600'}`}
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <div className="mt-3 flex justify-between items-center">
          <span className="text-red-600 font-mono text-sm font-bold">{displayNoStr}</span>
          {caption && (
            <p className={`${captionClass} text-[10px] font-mono uppercase tracking-widest`}>
              {caption}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Cards layout (comparisons / philosophers / frameworks)
  if (data.layout === 'cards') {
    return (
      <div className={`w-full h-full flex flex-col p-8 md:p-12 relative overflow-hidden ${bgClass}`}>
        {/* Grid Lines */}
        <div className={`absolute top-0 left-16 w-[1px] h-full ${gridLineClass}`} />
        <div className={`absolute top-12 left-0 w-full h-[1px] ${gridLineClass}`} />
        <div className={`absolute top-0 right-16 w-[1px] h-full ${gridLineClass}`} />

        {/* Header */}
        <div className="absolute top-6 left-20 flex items-center gap-8 z-10">
          <span className="text-red-600 font-mono text-base font-bold">
            {displayNoStr}
          </span>
          <span className={`${textClass} font-bold tracking-tight uppercase text-base`}>
            AI MINDSET
          </span>
        </div>

        {/* Slide metaphor */}
        <div className="absolute top-20 right-16 w-48 h-32 opacity-80">
          <VisualMetaphor type={data.visual} slideId={data.id} />
        </div>

        <div className="flex-1 flex flex-col justify-center pt-16">
          <motion.div
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center px-12"
          >
            <h1 className={`text-4xl md:text-6xl font-black tracking-tighter ${textClass} uppercase leading-[0.9]`}>
              {title}
            </h1>
            {subtitle && (
              <p className={`text-lg md:text-xl ${subtitleClass} font-medium mt-4`}>
                {subtitle}
              </p>
            )}
          </motion.div>

          <div className="mt-10 px-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {(cards ?? []).map((card, i) => {
              // Translate "Blindspot" label based on language
              const blindspotLabel = lang === 'ru' ? 'Слепое пятно' : lang === 'by' ? 'Сляпое пляма' : 'Blindspot';
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.08 }}
                  className={`${isDark ? 'bg-neutral-800 border-neutral-700' : 'bg-neutral-50 border-neutral-200'} border p-7 rounded-lg hover:border-red-400 transition-colors relative overflow-hidden`}
                >
                  <div className={`absolute top-4 right-4 ${isDark ? 'text-neutral-700' : 'text-neutral-200'} font-black text-6xl`}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="relative">
                    <h3 className={`text-xl font-black uppercase mb-1 ${textClass}`}>{card.title}</h3>
                    <div className="text-xs font-mono text-red-500 uppercase tracking-widest mb-5">
                      {card.subtitle}
                    </div>
                    <p className={`text-base leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-700'} whitespace-pre-line`}>
                      {card.body}
                    </p>
                    {card.highlight && (
                      <div className={`mt-6 pt-4 border-t ${isDark ? 'border-neutral-700' : 'border-neutral-200'}`}>
                        <div className="text-[11px] font-mono uppercase tracking-widest text-red-500">
                          {blindspotLabel}
                        </div>
                        <div className={`text-sm ${isDark ? 'text-neutral-300' : 'text-neutral-800'} mt-1 whitespace-pre-line`}>
                          {card.highlight}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Manifesto layout (big principles / OS components)
  if (data.layout === 'manifesto') {
    return (
      <div className="w-full h-full flex flex-col p-8 md:p-12 relative overflow-hidden bg-white">
        {/* Grid Lines */}
        <div className="absolute top-0 left-16 w-[1px] h-full bg-neutral-100" />
        <div className="absolute top-12 left-0 w-full h-[1px] bg-neutral-100" />
        <div className="absolute top-0 right-16 w-[1px] h-full bg-neutral-100" />

        {/* Header */}
        <div className="absolute top-6 left-20 flex items-center gap-8 z-10">
          <span className="text-red-600 font-mono text-base font-bold">
            {displayNoStr}
          </span>
          <span className="text-[#333333] font-bold tracking-tight uppercase text-base">
            AI MINDSET
          </span>
        </div>

        <div className="flex-1 w-full h-full flex flex-col justify-center relative z-10 pt-16">
          <div className="pl-12 pr-12">
            <motion.h1
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-5xl md:text-7xl font-black tracking-tighter text-[#333333] uppercase leading-[0.85]"
            >
              {title}
            </motion.h1>
            {subtitle && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="text-xl md:text-2xl text-neutral-600 font-medium mt-4 max-w-4xl"
              >
                {subtitle}
              </motion.p>
            )}
          </div>

          <div className="mt-10 pl-12 pr-12 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
            {(content ?? []).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
                className="flex items-start gap-4"
              >
                <div className="w-2 h-2 bg-red-600 rounded-full mt-3 flex-shrink-0" />
                <div className="text-lg text-neutral-800 leading-relaxed">
                  {line}
                </div>
              </motion.div>
            ))}
          </div>

          {caption && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-4 left-0 w-full text-center"
            >
              <p className="text-neutral-500 text-sm font-mono uppercase tracking-widest">
                {caption}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  // Timeline layout
  if (data.layout === 'timeline') {
    return (
      <div className="w-full h-full flex flex-col p-8 md:p-12 relative overflow-hidden bg-white">
        {/* Grid Lines */}
        <div className="absolute top-0 left-16 w-[1px] h-full bg-neutral-100" />
        <div className="absolute top-12 left-0 w-full h-[1px] bg-neutral-100" />
        <div className="absolute top-0 right-16 w-[1px] h-full bg-neutral-100" />

        {/* Header */}
        <div className="absolute top-6 left-20 flex items-center gap-8 z-10">
          <span className="text-red-600 font-mono text-base font-bold">
            {displayNoStr}
          </span>
          <span className="text-[#333333] font-bold tracking-tight uppercase text-base">
            AI MINDSET
          </span>
        </div>

        <div className="flex-1 flex flex-col justify-center pt-16 px-12">
          <motion.div
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-10"
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-[#333333] uppercase">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xl text-neutral-600 font-medium mt-4">{subtitle}</p>
            )}
          </motion.div>

          <div className="relative">
            {/* Horizontal timeline line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute top-6 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 via-red-400 to-neutral-200 origin-left"
            />

            <div className="grid grid-cols-5 gap-4">
              {(data.timeline ?? []).map((ev, i) => (
                <motion.div
                  key={`${ev.year}-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="relative pt-10 group cursor-pointer"
                >
                  {/* Timeline dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1, type: 'spring' }}
                    className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-red-600 rounded-full group-hover:bg-red-600 transition-colors z-10"
                  />

                  <div className="bg-neutral-50 group-hover:bg-white p-4 rounded-lg border border-neutral-100 group-hover:border-red-200 group-hover:shadow-lg transition-all">
                    <div className="text-lg font-black text-red-600 font-mono">
                      {ev.year}
                    </div>
                    <div className="text-sm font-bold uppercase tracking-tight text-[#333333] mt-1">
                      {ev.title}
                    </div>
                    <div className="text-xs text-neutral-600 leading-relaxed mt-2 line-clamp-3 group-hover:line-clamp-none">
                      {ev.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quotes layout - for community signals / testimonials (enhanced)
  if (data.layout === 'quotes') {
    let quotesArr = data.quotes ?? [];
    
    // Fallback: parse quotes from content if quotes is null
    if (quotesArr.length === 0 && content && content.length > 0) {
      const fullText = content.join(' ');
      
      // Pattern: **"title"** > "quote text" — author name
      const quotePattern = /\*\*"([^"]+)"\*\*\s*>\s*"([^"]+)"\s*—\s*([^*]+?)(?=\s*\*\*"|$)/g;
      const matches = [...fullText.matchAll(quotePattern)];
      
      quotesArr = matches.map(match => ({
        text: match[2].trim(),
        author: match[3].trim()
      })).filter(q => q.text && q.author);
    }
    return (
      <div className={`w-full h-full flex flex-col p-6 md:p-10 relative overflow-hidden ${bgClass}`}>
        {/* Subtle diagonal pattern background */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, currentColor 0px, currentColor 1px, transparent 1px, transparent 10px)'
        }} />

        {/* Header */}
        <div className="flex items-center justify-between mb-6 z-10">
          <div className="border-l-4 border-red-600 pl-4">
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 mb-1">
              community signals
            </div>
            <h1 className={`text-2xl md:text-4xl font-black tracking-tight ${textClass} leading-[1.1]`}>
              {title}
            </h1>
            {subtitle && (
              <p className={`text-sm md:text-base ${subtitleClass} font-medium mt-1`}>
                {subtitle}
              </p>
            )}
          </div>
          {/* Visual accent */}
          <div className="w-16 h-16 md:w-20 md:h-20 opacity-30">
            <VisualMetaphor type={data.visual} slideId={data.id} />
          </div>
        </div>

        {/* Quotes Grid - improved cards */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 content-start overflow-auto">
          {quotesArr.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className={`${isDark ? 'bg-white/5 hover:bg-white/8' : 'bg-neutral-50 hover:bg-neutral-100'} p-5 rounded-xl relative group transition-colors`}
            >
              {/* Quote indicator */}
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-600 to-red-600/30 rounded-l-xl" />

              {/* Quote number */}
              <span className={`absolute top-3 right-3 text-[10px] font-mono ${isDark ? 'text-neutral-600' : 'text-neutral-300'}`}>
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Quote mark */}
              <span className={`text-3xl font-serif ${isDark ? 'text-red-500/20' : 'text-red-600/10'} leading-none`}>"</span>

              {/* Quote text */}
              <p className={`text-sm md:text-base ${textClass} leading-relaxed mt-1 mb-4`}>
                {q.text}
              </p>

              {/* Author */}
              <div className="flex items-center gap-2 mt-auto">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                  <span className="text-white text-[9px] font-bold">
                    {q.author.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className={`text-xs font-mono ${subtitleClass}`}>
                  {q.author}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Source link */}
        {data.source && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 flex justify-end"
          >
            <SlideSource source={data.source} dark={isDark} />
          </motion.div>
        )}
      </div>
    );
  }

  // Sources layout - for source shelf / bibliography slides
  if (data.layout === 'sources') {
    const sourcesArr = data.sources ?? [];
    return (
      <div className={`w-full h-full flex flex-col p-8 md:p-12 relative overflow-hidden ${bgClass}`}>
        {/* Grid Lines */}
        <div className={`absolute top-0 left-16 w-[1px] h-full ${gridLineClass}`} />
        <div className={`absolute top-12 left-0 w-full h-[1px] ${gridLineClass}`} />
        <div className={`absolute top-0 right-16 w-[1px] h-full ${gridLineClass}`} />

        {/* Header */}
        <div className="absolute top-6 left-20 flex items-center gap-8 z-10">
          <span className="text-red-600 font-mono text-base font-bold">
            {displayNoStr}
          </span>
          <span className={`${textClass} font-bold tracking-tight uppercase text-base`}>
            AI MINDSET
          </span>
        </div>

        <div className="flex-1 flex flex-col justify-center pt-16 px-12">
          <motion.div
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-8"
          >
            <h1 className={`text-3xl md:text-5xl font-black tracking-tighter ${textClass} uppercase leading-[0.9]`}>
              {title}
            </h1>
            {subtitle && (
              <p className={`text-base md:text-lg ${subtitleClass} font-medium mt-2`}>
                {subtitle}
              </p>
            )}
          </motion.div>

          {/* Sources List - Linear Compact Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-[420px] overflow-y-auto pr-2">
            {sourcesArr.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.02 }}
              >
                {src.url ? (
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 py-1.5 px-2 rounded ${isDark ? 'hover:bg-white/5' : 'hover:bg-red-50'} transition-colors group`}
                  >
                    <span className="text-red-600 font-mono text-[10px] font-bold shrink-0">{String(i + 1).padStart(2, '0')}</span>
                    <span className={`text-xs ${textClass} group-hover:text-red-600 transition-colors truncate`}>
                      {src.label}
                    </span>
                    <span className="text-red-500 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity shrink-0">↗</span>
                  </a>
                ) : (
                  <div className={`flex items-center gap-2 py-1.5 px-2`}>
                    <span className="text-red-600 font-mono text-[10px] font-bold shrink-0">{String(i + 1).padStart(2, '0')}</span>
                    <span className={`text-xs ${textClass} truncate`}>{src.label}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Caption */}
        {caption && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-4 left-0 w-full text-center"
          >
            <p className={`${captionClass} text-[10px] font-mono uppercase tracking-widest`}>
              {caption}
            </p>
          </motion.div>
        )}
      </div>
    );
  }

  // Text-heavy layout (for dense narrative slides)
  if (data.layout === 'text-heavy') {
    const blocks = content ?? [];
    const isDense = blocks.join('\n').length > 700 || blocks.length > 8;

    return (
      <div className="w-full h-full flex flex-col p-8 md:p-12 relative overflow-hidden bg-white">
        {/* Grid Lines */}
        <div className="absolute top-0 left-16 w-[1px] h-full bg-neutral-100" />
        <div className="absolute top-12 left-0 w-full h-[1px] bg-neutral-100" />
        <div className="absolute top-0 right-16 w-[1px] h-full bg-neutral-100" />

        {/* Header */}
        <div className="absolute top-6 left-20 flex items-center gap-8 z-10">
          <span className="text-red-600 font-mono text-base font-bold">
            {displayNoStr}
          </span>
          <span className="text-[#333333] font-bold tracking-tight uppercase text-base">
            AI MINDSET
          </span>
        </div>

        <div className="flex-1 flex flex-col justify-center pt-16 px-12">
          <motion.h1
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-black tracking-tighter text-[#333333] uppercase leading-[0.9]"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="text-lg md:text-xl text-neutral-600 font-medium mt-4 max-w-5xl"
            >
              {subtitle}
            </motion.p>
          )}

          <div
            className={`mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 max-w-6xl ${
              isDense ? 'lg:grid-cols-3' : ''
            }`}
          >
            {blocks.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className={`leading-relaxed text-neutral-800 whitespace-pre-line ${
                  isDense ? 'text-base md:text-lg' : 'text-lg md:text-xl'
                }`}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Stats layout - LARGER fonts
  if (data.layout === 'stats') {
    return (
      <div className="w-full h-full min-h-[900px] flex flex-col p-8 md:p-12 relative overflow-hidden bg-white">
        {/* Grid Lines */}
        <div className="absolute top-0 left-16 w-[1px] h-full bg-neutral-100" />
        <div className="absolute top-12 left-0 w-full h-[1px] bg-neutral-100" />
        <div className="absolute top-0 right-16 w-[1px] h-full bg-neutral-100" />

        {/* Header */}
        <div className="absolute top-6 left-20 flex items-center gap-8 z-10">
          <span className="text-red-600 font-mono text-base font-bold">
            {displayNoStr}
          </span>
          <span className="text-[#333333] font-bold tracking-tight uppercase text-base">
            AI MINDSET
          </span>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center gap-8 pt-16">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-[#333333] uppercase">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xl text-neutral-600 font-medium mt-4">{subtitle}</p>
            )}
          </motion.div>

          <div className="w-full max-w-5xl min-h-[420px] flex items-center justify-center">
            <VisualMetaphor type={data.visual} slideId={data.id} stats={stats} />
          </div>

          {content && (
            <motion.ul
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2 text-sm text-neutral-600"
            >
              {content.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0" />
                  <span className="leading-relaxed">{parseMarkdown(item)}</span>
                </li>
              ))}
            </motion.ul>
          )}

          {caption && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-neutral-400 text-xs font-mono"
            >
              {caption}
            </motion.p>
          )}
        </div>
      </div>
    );
  }

  // Team layout - LARGER fonts
  if (data.layout === 'team') {
    return (
      <div className="w-full h-full flex flex-col p-8 md:p-12 relative overflow-hidden bg-white">
        {/* Grid Lines */}
        <div className="absolute top-0 left-16 w-[1px] h-full bg-neutral-100" />
        <div className="absolute top-12 left-0 w-full h-[1px] bg-neutral-100" />
        <div className="absolute top-0 right-16 w-[1px] h-full bg-neutral-100" />

        {/* Header */}
        <div className="absolute top-6 left-20 flex items-center gap-8 z-10">
          <span className="text-red-600 font-mono text-base font-bold">
            {displayNoStr}
          </span>
          <span className="text-[#333333] font-bold tracking-tight uppercase text-base">
            AI MINDSET
          </span>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center gap-8 pt-12">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-[#333333] uppercase">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xl text-neutral-600 font-medium mt-4">{subtitle}</p>
            )}
            <div className="w-20 h-2 bg-red-600 mx-auto mt-6" />
          </motion.div>

          <VisualMetaphor type={data.visual} team={data.team} />
        </div>
      </div>
    );
  }

  // Gallery layout - LARGER fonts
  if (data.layout === 'gallery') {
    return (
      <div className="w-full h-full flex flex-col p-8 md:p-12 relative overflow-hidden bg-white">
        {/* Grid Lines */}
        <div className="absolute top-0 left-16 w-[1px] h-full bg-neutral-100" />
        <div className="absolute top-12 left-0 w-full h-[1px] bg-neutral-100" />
        <div className="absolute top-0 right-16 w-[1px] h-full bg-neutral-100" />

        {/* Header */}
        <div className="absolute top-6 left-20 flex items-center gap-8 z-10">
          <span className="text-red-600 font-mono text-base font-bold">
            {displayNoStr}
          </span>
          <span className="text-[#333333] font-bold tracking-tight uppercase text-base">
            AI MINDSET
          </span>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center gap-8 pt-12">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-[#333333] uppercase">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg text-neutral-600 font-medium mt-3">{subtitle}</p>
            )}
          </motion.div>

          <VisualMetaphor type={data.visual} images={data.images} />
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full h-full flex flex-col p-8 md:p-12 relative overflow-hidden ${bgClass}`}>
      {/* Grid Lines for Swiss Style */}
      <div className={`absolute top-0 left-16 w-[1px] h-full ${gridLineClass}`} />
      <div className={`absolute top-12 left-0 w-full h-[1px] ${gridLineClass}`} />
      <div className={`absolute top-0 right-16 w-[1px] h-full ${gridLineClass}`} />

      {/* Header Info - LARGER */}
      <div className="absolute top-6 left-20 flex items-center gap-8 z-10">
        <span className="text-red-600 font-mono text-base font-bold">
          {displayNoStr}
        </span>
        <span className={`${textClass} font-bold tracking-tight uppercase text-base`}>
          AI MINDSET
        </span>
      </div>

      <div className="flex-1 w-full h-full flex flex-col justify-center relative z-10">
        {/* CENTER LAYOUT */}
        {data.layout === 'center' && (
          <div className="flex flex-col gap-6 text-center h-full items-center justify-center relative">
            {/* Background visual - large and animated */}
            {!data.sectionTitle && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.12 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="w-[600px] h-[600px]">
                  <VisualMetaphor type={data.visual} slideId={data.id} />
                </div>
              </motion.div>
            )}

            {/* Animated gradient accent */}
            {data.id === 1 && (
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
            )}

            {/* Section divider visual with loop animation for LOOPS section */}
            {data.sectionTitle && (
              <div className="flex justify-center items-center z-10">
                <div className="w-full max-w-md">
                  {data.sectionTitle.toLowerCase() === 'loops' ? (
                    <LoopTransition loopNumber={10} variant="infinity" size="lg" />
                  ) : (
                    <VisualMetaphor type={data.visual} sectionTitle={data.sectionTitle} />
                  )}
                </div>
              </div>
            )}

            {/* Title block - LARGER fonts with better stagger */}
            <div className="flex flex-col gap-4 items-center z-10">
              {/* Animated line before title */}
              {data.id === 1 && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 80 }}
                  transition={{ delay: 0.1, duration: 0.5, ease: 'easeOut' }}
                  className="h-1 bg-red-600 mb-4"
                />
              )}

              {/* Supertitle - small text above title */}
              {data.supertitle && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className={`text-xs md:text-sm font-mono uppercase ${captionClass} tracking-wider text-center max-w-md whitespace-pre-line`}
                >
                  {data.supertitle}
                </motion.div>
              )}

              <motion.h1
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
                className={`text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter ${textClass} uppercase leading-[0.85]`}
              >
                {title}
              </motion.h1>
              {subtitle && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className={`text-xl md:text-2xl ${subtitleClass} font-medium mt-4 max-w-2xl`}
                >
                  {subtitle}
                </motion.p>
              )}

              {/* Content for center layout (e.g., layer descriptions) */}
              {data.content && data.content.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="mt-8 max-w-3xl text-center"
                >
                  {data.content.map((paragraph, i) => {
                    // Check if paragraph is a divider line
                    const isDivider = paragraph.trim().startsWith('━');
                    return (
                      <p key={i} className={`text-base md:text-lg ${textClass} leading-relaxed ${isDivider ? 'my-8' : 'mb-2'}`}>
                        {parseMarkdown(paragraph)}
                      </p>
                    );
                  })}
                </motion.div>
              )}

              {/* Navigation hint for first slide - more prominent, responsive text */}
              {data.id === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="mt-12 flex flex-col items-center gap-3"
                >
                  <span className={`text-xs font-mono uppercase ${captionClass} tracking-[0.3em] hidden sm:block`}>Press SPACE to Navigate</span>
                  <span className={`text-xs font-mono uppercase ${captionClass} tracking-[0.3em] sm:hidden`}>Swipe Left/Right</span>
                  
                  {/* Desktop: Mouse scroll icon */}
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-6 h-10 border-2 border-red-600/50 rounded-full justify-center pt-2 hidden sm:flex"
                  >
                    <motion.div
                      animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-1.5 h-1.5 bg-red-600 rounded-full"
                    />
                  </motion.div>
                  
                  {/* Mobile: Swipe left/right icon */}
                  <motion.div
                    animate={{ x: [-5, 5, -5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center gap-2 sm:hidden"
                  >
                    <motion.div
                      animate={{ x: [-3, 0, -3], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-red-600 text-2xl"
                    >
                      ←
                    </motion.div>
                    <div className="w-8 h-8 border-2 border-red-600/50 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-red-600 rounded-full" />
                    </div>
                    <motion.div
                      animate={{ x: [3, 0, 3], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-red-600 text-2xl"
                    >
                      →
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* SUMMARY GRID LAYOUT - Machine (top left), Human (right lower), Gap (center bottom) */}
        {data.layout === 'summary-grid' && (
          <div className="w-full min-h-screen overflow-y-auto px-12 py-16">
            <div className="max-w-7xl mx-auto">
              <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className={`text-5xl md:text-6xl font-black tracking-tighter ${textClass} mb-4`}
              >
                {title}
              </motion.h1>
              {subtitle && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className={`text-xl ${textClass} opacity-70 mb-16`}
                >
                  {subtitle}
                </motion.p>
              )}
              
              {/* Grid layout: Machine left, Human right, Gap bottom center */}
              {content && content.length > 0 && (() => {
                const fullText = content.join('\n\n');
                const machineMatch = fullText.match(/\*\*MACHINE:\*\*([\s\S]*?)(?=\*\*HUMAN:\*\*|$)/);
                const humanMatch = fullText.match(/\*\*HUMAN:\*\*([\s\S]*?)(?=\*\*THE GAP:\*\*|$)/);
                const gapMatch = fullText.match(/\*\*THE GAP:\*\*([\s\S]*?)(?=we're not a research|$)/);
                
                return (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                      {/* Machine section - top left */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-4"
                      >
                        <h2 className={`text-3xl font-bold ${textClass} mb-6`}>MACHINE</h2>
                        <div 
                          className={`text-base leading-relaxed ${textClass} opacity-80 space-y-3`} 
                          dangerouslySetInnerHTML={{ __html: parseMarkdown(machineMatch?.[1]?.trim() || '') }} 
                        />
                      </motion.div>
                      
                      {/* Human section - right side, slightly lower */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-4 md:mt-12"
                      >
                        <h2 className={`text-3xl font-bold ${textClass} mb-6`}>HUMAN</h2>
                        <div 
                          className={`text-base leading-relaxed ${textClass} opacity-80 space-y-3`} 
                          dangerouslySetInnerHTML={{ __html: parseMarkdown(humanMatch?.[1]?.trim() || '') }} 
                        />
                      </motion.div>
                    </div>
                    
                    {/* Gap section - center bottom */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="max-w-4xl mx-auto space-y-4 mt-16 pt-12 border-t border-current/10"
                    >
                      <h2 className={`text-3xl font-bold ${textClass} mb-6 text-center`}>THE GAP</h2>
                      <div 
                        className={`text-base leading-relaxed ${textClass} opacity-80 text-center`} 
                        dangerouslySetInnerHTML={{ __html: parseMarkdown(gapMatch?.[1]?.trim() || '') }} 
                      />
                    </motion.div>
                  </>
                );
              })()}
            </div>
          </div>
        )}

        {/* LANDING PAGE LAYOUT - for final CTA page with full storytelling */}
        {data.layout === 'landing-page' && (
          <div className="w-full min-h-screen overflow-y-auto px-8 md:px-16 py-24">
            <div className="max-w-6xl mx-auto">
              <motion.h1
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
                className={`text-6xl md:text-8xl font-black tracking-tighter ${textClass} mb-8 leading-[0.9]`}
              >
                {title}
              </motion.h1>
              {subtitle && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className={`text-3xl md:text-4xl ${textClass} opacity-50 mb-20 font-light leading-tight`}
                >
                  {subtitle}
                </motion.p>
              )}
              
              {/* Content with generous spacing for storytelling */}
              {content && content.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className={`prose prose-xl ${isDark ? 'prose-invert' : ''} max-w-none`}
                  dangerouslySetInnerHTML={{ __html: parseMarkdown(content.join('\n\n')) }}
                />
              )}
            </div>
          </div>
        )}

        {/* FULL PAGE LAYOUT - unrestricted scrolling for long content */}
        {data.layout === 'full-page' && (
          <div className={`w-full min-h-screen overflow-y-auto ${bgClass}`}>
            <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="prose prose-lg dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(content?.join('\n\n') || '') }}
              />
            </div>
          </div>
        )}

        {/* ABOUT PAGE LAYOUT - for AI Mindset about page with labs and links */}
        {data.layout === 'about-page' && (
          <div className={`w-full h-full overflow-y-auto ${bgClass}`}>
            <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-24 min-h-full">
              {/* Hero Section */}
              <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
                className="mb-20"
              >
                <h1 className={`text-5xl md:text-8xl font-black tracking-tighter ${textClass} mb-6 leading-[0.9]`}>
                  {title}
                </h1>
                {subtitle && (
                  <p className={`text-2xl md:text-3xl ${textClass} opacity-50 font-light`}>
                    {subtitle}
                  </p>
                )}
              </motion.div>

              {/* Content Blocks - parse and render each section separately */}
              {content && content.length > 0 && (() => {
                const fullText = content.join('\n\n');
                const sections = fullText.split(/\*\*([^:]+):\*\*/g).filter(Boolean);
                const blocks: { title: string; content: string }[] = [];
                
                for (let i = 0; i < sections.length; i += 2) {
                  if (sections[i] && sections[i + 1]) {
                    blocks.push({
                      title: sections[i].trim(),
                      content: sections[i + 1].trim()
                    });
                  }
                }

                return blocks.map((block, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="mb-16"
                  >
                    {/* Visual separator with metaphor */}
                    {idx > 0 && (() => {
                      const visualTypes: VisualType[] = ['network', 'velocity', 'grid'];
                      return (
                        <div className="flex items-center justify-center my-12">
                          <div className="w-16 h-16 opacity-20">
                            <VisualMetaphor type={visualTypes[idx % 3]} slideId={1000 + idx} />
                          </div>
                        </div>
                      );
                    })()}

                    {/* Block Title */}
                    <h2 className={`text-3xl md:text-4xl font-bold ${textClass} mb-6 lowercase`}>
                      {block.title}
                    </h2>

                    {/* Block Content with proper paragraph rendering */}
                    <div className={`space-y-4 text-lg md:text-xl leading-relaxed ${textClass} opacity-80`}>
                      {block.content.split('\n\n').map((para, pIdx) => {
                        // Check if paragraph contains a link
                        const linkMatch = para.match(/\[([^\]]+)\]\(([^)]+)\)/g);
                        
                        if (linkMatch) {
                          // Render paragraph with clickable links
                          let rendered = para;
                          linkMatch.forEach(link => {
                            const parts = link.match(/\[([^\]]+)\]\(([^)]+)\)/);
                            if (parts) {
                              const linkText = parts[1];
                              const linkUrl = parts[2];
                              rendered = rendered.replace(
                                link,
                                `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer" class="text-red-600 hover:text-red-700 underline decoration-2 underline-offset-4 transition-colors">${linkText}</a>`
                              );
                            }
                          });
                          return (
                            <p
                              key={pIdx}
                              dangerouslySetInnerHTML={{ __html: rendered }}
                            />
                          );
                        }
                        
                        return <p key={pIdx}>{para}</p>;
                      })}
                    </div>
                  </motion.div>
                ));
              })()}

              {/* Closing Visual */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex items-center justify-center mt-20 mb-10"
              >
                <div className="w-32 h-32 opacity-10">
                  <VisualMetaphor type="SPARKLE_FINALE" slideId={9999} />
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* SCROLLABLE LAYOUT - for long content that needs to overflow */}
        {data.layout === 'scrollable' && (
          <div className="w-full min-h-screen overflow-y-auto px-12 py-16">
            <div className="max-w-5xl mx-auto">
              <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className={`text-5xl md:text-6xl font-black tracking-tighter ${textClass} mb-4`}
              >
                {title}
              </motion.h1>
              {subtitle && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className={`text-xl ${textClass} opacity-70 mb-12`}
                >
                  {subtitle}
                </motion.p>
              )}
              
              {/* Content with markdown support */}
              {content && (
                <div className="space-y-6">
                  {content.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      className={`text-lg leading-relaxed ${textClass}`}
                      dangerouslySetInnerHTML={{ __html: parseMarkdown(item) }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* SPLIT LAYOUT */}
        {data.layout === 'split' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 h-full items-center pl-12 pr-12 relative">
            {/* Subtle background accent */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.03 }}
              transition={{ duration: 1 }}
              className="absolute right-0 top-0 w-1/2 h-full pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, transparent 0%, currentColor 100%)',
              }}
            />

            <div className="flex flex-col gap-6 items-start text-left order-2 md:order-1 relative z-10">
              {/* Slide number accent */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 0.1 }}
                transition={{ delay: 0.1 }}
                className={`absolute -left-4 top-0 text-[180px] font-black leading-none ${isDark ? 'text-white' : 'text-neutral-900'} pointer-events-none select-none`}
              >
                {displayNoStr}
              </motion.div>

              <motion.h1
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
                className={`text-5xl md:text-7xl font-black tracking-tighter ${textClass} uppercase leading-[0.85] relative z-10`}
              >
                {title}
              </motion.h1>
              {subtitle && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="flex flex-col gap-4"
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: 80 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    className="h-1 bg-red-600"
                  />
                  <p className={`text-2xl ${textClass} font-medium`}>
                    {subtitle}
                  </p>
                </motion.div>
              )}

              {/* Content list - with staggered animation */}
              {content && (
                <div className="space-y-3 mt-4">
                  {content.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + idx * 0.08, duration: 0.4 }}
                      className={`flex items-start gap-3 text-lg ${isDark ? 'text-neutral-300' : 'text-neutral-700'} leading-relaxed`}
                    >
                      <span className="w-2 h-2 bg-red-600 rounded-full mt-2.5 flex-shrink-0" />
                      <span>{parseMarkdown(item)}</span>
                    </motion.div>
                  ))}
                </div>
              )}

              {data.prompt && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55 }}
                >
                  <PromptBlock title={data.prompt.title} text={data.prompt.text} />
                </motion.div>
              )}

              {/* Multiple quotes */}
              {data.quotes && (
                <VisualMetaphor type="MULTI_QUOTES" quotes={data.quotes} />
              )}

              {/* Session info */}
              {data.sessionInfo && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-4 p-4 border border-neutral-200 rounded-lg"
                >
                  <div className="text-xs font-mono text-neutral-400 mb-2">
                    {data.sessionInfo.date} • {data.sessionInfo.speaker}
                  </div>
                  {data.sessionInfo.presentationUrl && (
                    <a
                      href={data.sessionInfo.presentationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 text-xs font-mono hover:underline"
                    >
                      View Presentation →
                    </a>
                  )}
                </motion.div>
              )}

              {/* Links */}
              {data.links && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col gap-2 mt-4"
                >
                  {data.links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 text-sm font-mono hover:underline"
                    >
                      {link.label} →
                    </a>
                  ))}
                </motion.div>
              )}

              {caption && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-neutral-400 text-xs font-mono max-w-xs leading-relaxed mt-8"
                >
                  {caption}
                </motion.p>
              )}
            </div>
            <div className="order-1 md:order-2 h-full max-h-[500px] flex items-center justify-center relative">
              {/* Decorative ring behind visual */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="absolute w-[400px] h-[400px] border-2 border-red-600 rounded-full"
              />
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.05 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="absolute w-[500px] h-[500px] border border-neutral-300 rounded-full"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
                className="w-full h-full max-w-md relative z-10"
              >
                {data.image ? (
                  <img
                    src={data.image}
                    alt={title}
                    className="w-full h-full object-contain rounded-lg"
                  />
                ) : (
                  <VisualMetaphor type={data.visual} slideId={data.id} stats={data.stats} images={data.images} />
                )}
              </motion.div>
            </div>
          </div>
        )}

        {/* TEXT LAYOUT (for quotes) - LARGER text with rotating quote watermark */}
        {data.layout === 'text' && (
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 h-full items-center pl-12 pr-12">
            {/* Rotating quote watermark in background */}
            <motion.div
              className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none"
              animate={{ rotate: [0, 10, -5, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className={`text-[20rem] font-serif ${isDark ? 'text-neutral-800' : 'text-neutral-100'} leading-none`}>
                "
              </span>
            </motion.div>

            <div className="flex flex-col gap-6 items-start text-left order-2 md:order-1 relative z-10">
              <motion.h1
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={`text-4xl md:text-6xl font-black tracking-tighter ${textClass} uppercase leading-[0.85]`}
              >
                {title}
              </motion.h1>
              <div className="w-20 h-2 bg-red-600" />

              {data.quote && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-4 max-w-2xl"
                >
                  <p className={`text-3xl md:text-4xl lg:text-5xl ${textClass} font-bold leading-tight`}>
                    "{data.quote.text}"
                  </p>
                  <div className="mt-10 flex items-center gap-4">
                    <motion.div
                      className="w-16 h-1 bg-red-600"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                    />
                    <span className={`text-lg font-mono ${subtitleClass}`}>
                      {data.quote.author}
                      {data.quote.date && ` • ${data.quote.date}`}
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
            <div className="order-1 md:order-2 h-full max-h-[400px] flex items-center justify-center relative z-10">
              <div className="w-full h-full max-w-sm">
                <VisualMetaphor type={data.visual} slideId={data.id} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Source attribution for all default layouts */}
      {data.source && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-4 left-20"
        >
          <SlideSource source={data.source} dark={isDark} />
        </motion.div>
      )}

      {/* Footer / Caption for Center layout */}
      {data.layout === 'center' && caption && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className={`absolute bottom-4 ${data.source ? 'right-20' : 'left-0 w-full text-center'}`}
        >
          <p className="text-neutral-400 text-xs font-mono uppercase tracking-widest">
            {caption}
          </p>
        </motion.div>
      )}

      {/* Center layout links with QR code for finale */}
      {data.layout === 'center' && data.links && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          {/* QR Code for finale slide */}
          {data.visual === 'SPARKLE_FINALE' && (
            <div className="flex items-center gap-6 mb-2">
              <div className="bg-white p-2 rounded-lg">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=https://t.me/ai_mind_set&bgcolor=ffffff&color=dc2626"
                  alt="Telegram QR"
                  className="w-16 h-16"
                />
              </div>
              <div className="text-left">
                <p className={`text-xs font-mono uppercase tracking-widest ${isDark ? 'text-neutral-400' : 'text-neutral-500'} mb-1`}>
                  Stay connected
                </p>
                <p className={`text-sm font-mono ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
                  @ai_mind_set
                </p>
              </div>
            </div>
          )}
          <div className="flex flex-wrap gap-4 justify-center">
            {data.links.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 text-sm font-mono hover:underline"
              >
                {link.label} →
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};
