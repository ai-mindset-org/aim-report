import React, { useState, useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap-config';
import { ToolkitModal } from '../ToolkitModal';

interface IndexTriggerProps {
    onOpen: () => void;
    theme: 'dark' | 'light';
    toggleTheme: () => void;
    showThemeToggle?: boolean;
    forceDarkTheme?: boolean;
    isReady?: boolean;
}

export const IndexTrigger: React.FC<IndexTriggerProps> = ({ onOpen, theme, toggleTheme, showThemeToggle = true, forceDarkTheme = false, isReady = true }) => {
    const [isToolkitOpen, setIsToolkitOpen] = useState(false);
    const [isToolkitHovered, setIsToolkitHovered] = useState(false);
    const [showToolkitLabel, setShowToolkitLabel] = useState(false);
    const toolkitRef = useRef<HTMLButtonElement>(null);
    const labelRef = useRef<HTMLSpanElement>(null);

    const isDark = forceDarkTheme ? true : theme === 'dark';

    // Periodically show "Get Style" label
    useEffect(() => {
        if (!isReady) return;

        const showLabel = () => {
            setShowToolkitLabel(true);
            setTimeout(() => setShowToolkitLabel(false), 3000);
        };

        // Show after 10 seconds, then every 30 seconds
        const initialTimer = setTimeout(showLabel, 10000);
        const interval = setInterval(showLabel, 30000);

        return () => {
            clearTimeout(initialTimer);
            clearInterval(interval);
        };
    }, [isReady]);

    // Animate label appearance
    useEffect(() => {
        if (!labelRef.current) return;

        if (showToolkitLabel || isToolkitHovered) {
            gsap.fromTo(labelRef.current,
                { width: 0, opacity: 0, paddingLeft: 0, paddingRight: 0 },
                { width: 'auto', opacity: 1, paddingLeft: 8, paddingRight: 8, duration: 0.3, ease: "power2.out" }
            );
        } else {
            gsap.to(labelRef.current, {
                width: 0, opacity: 0, paddingLeft: 0, paddingRight: 0,
                duration: 0.2, ease: "power2.in"
            });
        }
    }, [showToolkitLabel, isToolkitHovered]);

    // --- TECHNICAL THEME CONFIG ---
    const borderCol = isDark ? 'border-neutral-800' : 'border-neutral-300';
    const bgCol = isDark ? 'bg-black/80' : 'bg-white/80';
    const textCol = isDark ? 'text-neutral-400' : 'text-neutral-600';

    return (
        <>
            <div className={`fixed top-6 right-6 z-[100] pointer-events-auto flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest transition-opacity duration-1000 ease-out ${isReady ? 'opacity-100' : 'opacity-0'}`}>

                {/* 1. TOOLKIT BUTTON - Floating red ball without border */}
                <button
                    ref={toolkitRef}
                    onClick={() => setIsToolkitOpen(true)}
                    onMouseEnter={() => setIsToolkitHovered(true)}
                    onMouseLeave={() => setIsToolkitHovered(false)}
                    className="relative flex items-center group"
                    aria-label="Get Style Toolkit"
                    title="Get Style Toolkit"
                >
                    {/* Expandable label */}
                    <span
                        ref={labelRef}
                        className={`overflow-hidden whitespace-nowrap text-[10px] font-mono font-bold uppercase tracking-wider
                            ${isDark ? 'text-[#DC2626]' : 'text-[#DC2626]'}`}
                        style={{ width: 0, opacity: 0 }}
                    >
                        Get Style
                    </span>

                    {/* Red ball */}
                    <div className="relative w-10 h-10 flex items-center justify-center">
                        <svg viewBox="0 0 40 40" className="w-full h-full">
                            {/* Glow filter */}
                            <defs>
                                <filter id="toolkit-glow" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation="2" result="blur"/>
                                    <feMerge>
                                        <feMergeNode in="blur"/>
                                        <feMergeNode in="SourceGraphic"/>
                                    </feMerge>
                                </filter>
                            </defs>

                            {/* Orbit ring */}
                            <circle
                                cx="20"
                                cy="20"
                                r="16"
                                fill="none"
                                stroke="#DC2626"
                                strokeWidth="0.5"
                                strokeDasharray="3 5"
                                opacity="0.4"
                                className="animate-[spin_20s_linear_infinite]"
                            />

                            {/* Core ball */}
                            <circle
                                cx="20"
                                cy="20"
                                r="8"
                                fill="#DC2626"
                                filter="url(#toolkit-glow)"
                                className="group-hover:scale-110 transition-transform duration-300"
                                style={{ transformOrigin: '20px 20px' }}
                            />

                            {/* Inner highlight */}
                            <circle
                                cx="17"
                                cy="17"
                                r="2.5"
                                fill="rgba(255,255,255,0.25)"
                            />
                        </svg>
                    </div>
                </button>

                {/* 2. THEME TOGGLE - Floating circle without border */}
                {showThemeToggle && (
                    <button
                        onClick={toggleTheme}
                        className="relative w-10 h-10 flex items-center justify-center group"
                        aria-label="Toggle Theme"
                    >
                        <svg viewBox="0 0 40 40" className="w-full h-full">
                            {/* Orbit ring */}
                            <circle
                                cx="20"
                                cy="20"
                                r="16"
                                fill="none"
                                stroke={isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'}
                                strokeWidth="0.5"
                                strokeDasharray="3 5"
                                opacity="0.5"
                                className="group-hover:opacity-100 transition-opacity"
                            />

                            {isDark ? (
                                <>
                                    {/* White glowing ball for dark mode */}
                                    <circle
                                        cx="20"
                                        cy="20"
                                        r="6"
                                        fill="white"
                                        style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.8))' }}
                                    />
                                </>
                            ) : (
                                <>
                                    {/* Outlined circle for light mode */}
                                    <circle
                                        cx="20"
                                        cy="20"
                                        r="6"
                                        fill="none"
                                        stroke="black"
                                        strokeWidth="1.5"
                                    />
                                </>
                            )}
                        </svg>
                    </button>
                )}

                {/* 3. INDEX TRIGGER - simple text */}
                <button
                    onClick={onOpen}
                    className={`
                        flex items-center gap-2
                        ${textCol} hover:text-[#DC2626]
                        transition-all duration-300 group
                    `}
                >
                    <span className="font-mono text-[11px] tracking-wide">index</span>
                    <div className="flex flex-col gap-[2px] w-2.5 items-end">
                        <span className="w-full h-[1px] bg-current transition-all duration-300"></span>
                        <span className="w-1/2 h-[1px] bg-current group-hover:w-full transition-all duration-300 delay-75"></span>
                        <span className="w-full h-[1px] bg-current transition-all duration-300 delay-150"></span>
                    </div>
                </button>

            </div>

            {/* Toolkit Modal */}
            <ToolkitModal
                isOpen={isToolkitOpen}
                onClose={() => setIsToolkitOpen(false)}
                theme={isDark ? 'dark' : 'light'}
            />
        </>
    );
};
