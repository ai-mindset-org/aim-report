import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { VisualMetaphor } from './VisualMetaphors';
import { VisualType } from '../types';
import { LoopTransition } from './LoopTransition';

interface ShiftScrollPageProps {
  shiftNumber: number;
  title: string;
  subtitle: string;
  alternativeSubtitle?: string;
  introSummary?: string;
  caption?: string;
  visual: VisualType;
  machine: string;
  machineSummary?: string;
  postTraining?: string;
  human: string;
  humanSummary?: string;
  gap: string;
  evidenceData: {
    keyStats?: Array<{ value: string; label: string; source?: string }>;
    researchHighlights?: string[];
    aimindsetEvidence?: string[];
    industryData?: string[];
  };
  sources?: Array<{ label: string; url: string }>;
  isDark?: boolean;
}

export const ShiftScrollPage: React.FC<ShiftScrollPageProps> = ({
  shiftNumber,
  title,
  subtitle,
  alternativeSubtitle,
  introSummary,
  caption,
  visual,
  machine,
  machineSummary,
  postTraining,
  human,
  humanSummary,
  gap,
  evidenceData,
  sources = [],
  isDark = false,
}) => {
  const bgClass = isDark ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900';
  const textClass = isDark ? 'text-white' : 'text-neutral-900';
  const subtitleClass = isDark ? 'text-neutral-300' : 'text-neutral-600';
  const gridLineClass = isDark ? 'bg-neutral-800' : 'bg-neutral-100';
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollAttempts, setScrollAttempts] = useState(0);

  const parseMarkdown = (text: string) => {
    // First convert markdown links [text](url) to HTML links
    let result = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-red-600 hover:text-red-700 underline">$1</a>');
    // Then convert bold **text** to strong tags
    result = result.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-red-600">$1</strong>');
    return result;
  };

  const formatWithBoldNumbers = (text: string, baseClass: string, boldClass: string = 'font-bold text-red-600') => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const inner = part.slice(2, -2);
        return (
          <strong key={i} className={boldClass}>
            {inner}
          </strong>
        );
      }
      return <span key={i} className={baseClass}>{part}</span>;
    });
  };

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

  return (
    <div 
      ref={scrollRef}
      className={`w-full h-full ${bgClass} overflow-y-auto`}
      onWheel={handleWheel}
    >
      {/* Section 1: Loop Intro - Full Screen */}
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-8 md:p-16 relative overflow-hidden">
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
            shift {String(shiftNumber).padStart(2, '0')}
          </div>
        </motion.div>

        {/* Large Visual Metaphor */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="w-48 h-48 md:w-64 md:h-64 mb-8"
        >
          <VisualMetaphor type={visual} slideId={shiftNumber} />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`text-3xl md:text-5xl font-black tracking-tight ${textClass} text-center leading-[1.1] mb-4 uppercase relative z-10 select-text cursor-text`}
        >
          {title}
        </motion.h1>

        {/* Alternative Subtitle - shown in top section only if exists */}
        {alternativeSubtitle && (
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`text-lg md:text-xl ${subtitleClass} text-center max-w-2xl font-medium relative z-10 select-text cursor-text`}
          >
            {alternativeSubtitle}
          </motion.p>
        )}

        {/* Intro Summary - The Machine Signal */}
        {introSummary && (
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35 }}
            className={`mt-6 text-sm md:text-base ${textClass} text-center max-w-3xl leading-relaxed relative z-10 select-text cursor-text`}
            dangerouslySetInnerHTML={{ __html: parseMarkdown(introSummary) }}
          />
        )}
      </div>

      {/* Section 2: Loop - Full Screen */}
      <div className="min-h-screen w-full flex flex-col p-6 md:p-12 relative overflow-hidden mt-32">
        {/* Header */}
        <div className="flex justify-between items-start mb-6 z-10">
          <div className="border-l-4 border-red-600 pl-4">
            <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
              THE SHIFT
            </div>
            {/* Show subtitle (short name) in uppercase */}
            <h1 className={`text-2xl md:text-3xl font-black tracking-tighter ${textClass} uppercase leading-[0.9]`}>
              {subtitle}
            </h1>
          </div>

          {/* Minimal visual indicator */}
          <div className="opacity-30">
            <LoopTransition loopNumber={shiftNumber} variant="orbit" size="sm" />
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
              {machine.split('\n').map((line, i) => (
                <div key={i} className="mb-1">
                  {formatWithBoldNumbers(line, isDark ? 'text-neutral-300' : 'text-neutral-600')}
                </div>
              ))}
            </div>
            {machineSummary && (
              <div className={`mt-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                <div className="flex items-start gap-2.5">
                  <span className="text-red-600 font-black text-lg leading-none mt-[-2px]">→</span>
                  <span className="text-xs md:text-sm font-normal leading-relaxed opacity-90">
                    {machineSummary}
                  </span>
                </div>
              </div>
            )}
          </motion.div>

          {/* Post-training note - OUTSIDE Machine card */}
          {postTraining && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`mt-3 text-xs ${isDark ? 'text-neutral-400' : 'text-neutral-500'} italic`}
            >
              {postTraining}
            </motion.div>
          )}

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
              {human.split('\n').map((line, i) => (
                <div key={i} className="mb-1">
                  {formatWithBoldNumbers(line, isDark ? 'text-neutral-300' : 'text-neutral-600')}
                </div>
              ))}
            </div>
            {humanSummary && (
              <div className={`mt-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                <div className="flex items-start gap-2.5">
                  <span className="text-red-600 font-black text-lg leading-none mt-[-2px]">→</span>
                  <span className="text-xs md:text-sm font-normal leading-relaxed opacity-90">
                    {humanSummary}
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Gap Block - Full Width RED with icon */}
        <motion.div
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 bg-red-600 text-white p-5 md:p-6 flex items-start gap-4 relative overflow-hidden"
        >
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
              {gap.split('\n').map((line, i) => (
                <div key={i}>{formatWithBoldNumbers(line, 'text-white', 'font-bold text-white')}</div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Section 3: Evidence - Full Screen */}
      <div className="min-h-screen w-full flex flex-col p-6 md:p-10 relative mt-32">
        <div className="border-l-4 border-red-600 pl-4 mb-4">
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 mb-1">
            evidence base
          </div>
          <h2 className={`text-2xl md:text-3xl font-black tracking-tight ${textClass} uppercase leading-[1.1]`}>
            the evidence
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start auto-rows-auto">
          {/* Left Column: Key Stats + Community Voices */}
          <div className="space-y-4">
            {/* Key Stats */}
            {evidenceData.keyStats && evidenceData.keyStats.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`${isDark ? 'bg-white/10' : 'bg-neutral-100'} p-5 rounded-lg`}>
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
                      <span className={`text-sm ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`} dangerouslySetInnerHTML={{ __html: parseMarkdown(stat.label) }} />
                      {stat.source && (
                        <span className={`text-[10px] font-mono ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>{stat.source}</span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Community Voices */}
            {evidenceData.communityVoices && evidenceData.communityVoices.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className={`${isDark ? 'bg-white/10' : 'bg-neutral-100'} p-5 rounded-lg`}>
                <div className={`flex items-center gap-2 mb-4 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <span className="text-[11px] font-mono uppercase tracking-widest">
                    <span className="font-bold">AI Mindset</span>. Community Voices
                  </span>
                </div>
                <div className="space-y-4">
                  {evidenceData.communityVoices.map((voice: string, i: number) => {
                    const parts = voice.split(/\(([^)]+)\)$/);
                    const quoteText = parts[0].replace(/\*\*|"|"/g, '').replace(/^["']|["']$/g, '').trim();
                    const author = parts[1] ? parts[1].trim() : '';
                    
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.05 }}
                        className="flex flex-col gap-2"
                      >
                        <p className={`text-sm italic ${isDark ? 'text-neutral-300' : 'text-neutral-700'} leading-relaxed`}>
                          "{quoteText}"
                        </p>
                        {author && (
                          <span className={`text-xs ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>
                            — {author}
                          </span>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>

          {/* Research & Sources Unified Column */}
          {(evidenceData.researchHighlights && evidenceData.researchHighlights.length > 0) || (evidenceData.aimindsetEvidence && evidenceData.aimindsetEvidence.length > 0) || sources.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`${isDark ? 'bg-red-900/20 border-red-800/30' : 'bg-red-50 border-red-100'} p-5 rounded-lg border md:col-span-2`}>
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-4 h-4 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="text-[11px] font-mono uppercase tracking-widest font-bold text-red-600">Research & Sources</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* AI Mindset Evidence items */}
                {evidenceData.aimindsetEvidence && evidenceData.aimindsetEvidence.map((item, i) => {
                  const parts = item.split('|');
                  const textWithPrefix = parts[0];
                  const url = parts[1];
                  const text = textWithPrefix.replace(/^ARROW:/, '');
                  
                  return (
                    <motion.div
                      key={`aim-${i}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 + i * 0.05 }}
                      className={`${isDark ? 'bg-white/5' : 'bg-white'} p-3 rounded border ${isDark ? 'border-red-600/30' : 'border-red-600/20'}`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <img src="/assets/logo.png" alt="AI Mindset" className="w-4 h-4 shrink-0" />
                        <span className="text-[9px] font-mono text-neutral-400">[aim evidence]</span>
                      </div>
                      <div className={`text-base ${isDark ? 'text-neutral-300' : 'text-neutral-700'} leading-relaxed mb-2`}>
                        <span dangerouslySetInnerHTML={{ __html: parseMarkdown(text) }} />
                      </div>
                      {url && (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-1.5 text-[11px] font-mono ml-6 ${isDark ? 'text-neutral-400 hover:text-red-400' : 'text-neutral-500 hover:text-red-600'} transition-colors`}
                        >
                          <span className="text-red-500">→</span>
                          <span>source</span>
                        </a>
                      )}
                    </motion.div>
                  );
                })}
                
                {/* Research items - TOP items large with bullets, regular items small clickable links */}
                {evidenceData.researchHighlights && evidenceData.researchHighlights.map((highlight, i) => {
                  // Check if this is a TOP research item
                  const isTop = /^\s*-?\s*\[TOP\]/i.test(highlight);
                  
                  // TOP items: keep original markdown for parseMarkdown to handle clickable links
                  if (isTop) {
                    // Remove [TOP] prefix but keep all markdown syntax
                    const textWithMarkdown = highlight.replace(/^\s*-?\s*\[TOP\]\s*/i, '');
                    
                    return (
                      <motion.div
                        key={`research-${i}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 + (evidenceData.aimindsetEvidence?.length || 0) * 0.05 + i * 0.05 }}
                        className={`${isDark ? 'bg-white/5' : 'bg-white'} p-3 rounded`}
                      >
                        <div className={`flex items-start gap-2 text-base ${isDark ? 'text-neutral-300' : 'text-neutral-700'} leading-relaxed`}>
                          <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 shrink-0" />
                          <span dangerouslySetInnerHTML={{ __html: parseMarkdown(textWithMarkdown) }} />
                        </div>
                      </motion.div>
                    );
                  }
                  
                  // Regular items: extract URL and clean text for display
                  const linkMatch = highlight.match(/\[([^\]]+)\]\(([^)]+)\)/);
                  const url = linkMatch ? linkMatch[2] : '';
                  
                  // Clean text for regular items
                  let displayText = highlight;
                  displayText = displayText.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
                  displayText = displayText.replace(/\*\*/g, '');
                  
                  return (
                    <motion.div
                      key={`research-${i}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 + (evidenceData.aimindsetEvidence?.length || 0) * 0.05 + i * 0.05 }}
                      className={`${isDark ? 'bg-white/5' : 'bg-white'} p-3 rounded`}
                    >
                      {url ? (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-1.5 text-[11px] font-mono ${isDark ? 'text-neutral-400 hover:text-red-400' : 'text-neutral-500 hover:text-red-600'} transition-colors`}
                        >
                          <span className="text-red-500">→</span>
                          <span>{displayText}</span>
                        </a>
                      ) : (
                        <div className={`flex items-center gap-1.5 text-[11px] font-mono ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                          <span className="text-red-500">→</span>
                          <span>{displayText}</span>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
                
                {/* Standalone sources (not matched to research items or key stats) */}
                {sources.filter(source => {
                  // Check if source is already matched to research items
                  const isMatchedResearch = evidenceData.researchHighlights?.some(highlight => highlight.includes(source.url));
                  
                  // Check if source is already present in key stats
                  // We check if any stat label contains the source label or url
                  const isMatchedKeyStat = evidenceData.keyStats?.some(stat => {
                    if (stat.label.includes(source.url)) return true;
                    // Also check if the markdown link [Label](Url) matches
                    return stat.label.includes(`](${source.url})`);
                  });

                  return !isMatchedResearch && !isMatchedKeyStat;
                }).map((source, i) => (
                  <motion.div
                    key={`source-${i}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + (evidenceData.researchHighlights?.length || 0) * 0.05 + i * 0.05 }}
                    className={`${isDark ? 'bg-white/5' : 'bg-white'} p-3 rounded`}
                  >
                    {source.url ? (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-1.5 text-[11px] font-mono ${isDark ? 'text-neutral-400 hover:text-red-400' : 'text-neutral-500 hover:text-red-600'} transition-colors`}
                      >
                        <span className="text-red-500">→</span>
                        <span>{source.label}</span>
                      </a>
                    ) : (
                      <span className={`text-[11px] font-mono ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                        <span className="opacity-50 mr-1.5">•</span>
                        {source.label}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : null}
        </div>

        {/* Industry Signals Tags */}
        {evidenceData.industryData && evidenceData.industryData.length > 0 && (
          <div className={`mt-4 pt-4 border-t ${isDark ? 'border-neutral-700' : 'border-neutral-200'}`}>
            <div className="flex flex-wrap gap-2">
              {evidenceData.industryData.map((item, i) => (
                <span
                  key={i}
                  className={`text-[10px] font-mono px-2 py-1 rounded ${isDark ? 'bg-white/10 text-neutral-300' : 'bg-neutral-100 text-neutral-600'}`}
                  dangerouslySetInnerHTML={{ __html: parseMarkdown(item) }}
                />
              ))}
            </div>
          </div>
        )}
      </div>


      {/* Buffer at the end */}
      <div className="h-[50vh] w-full"></div>
    </div>
  );
};
