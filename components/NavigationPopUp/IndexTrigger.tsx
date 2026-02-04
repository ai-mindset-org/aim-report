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
    alwaysShowLabel?: boolean;
}

// Rotating labels for the toolkit button
const TOOLKIT_LABELS = [
    "feel creative?",
    "want this style?",
    "explore style?",
    "get inspired?",
    "grab assets?",
    "try this look?",
    "design system?",
    "need visuals?"
];

export const IndexTrigger: React.FC<IndexTriggerProps> = ({ onOpen, theme, toggleTheme, showThemeToggle = true, forceDarkTheme = false, isReady = true, alwaysShowLabel = false }) => {
    const [isToolkitOpen, setIsToolkitOpen] = useState(false);
    const [showToolkitLabel, setShowToolkitLabel] = useState(alwaysShowLabel);
    const [currentLabelIndex, setCurrentLabelIndex] = useState(0);
    const labelRef = useRef<HTMLSpanElement>(null);

    const isDark = forceDarkTheme ? true : theme === 'dark';

    // Listen for open-toolkit-modal event (from Index footer button)
    useEffect(() => {
        const handleOpenToolkit = () => setIsToolkitOpen(true);
        window.addEventListener('open-toolkit-modal', handleOpenToolkit);
        return () => window.removeEventListener('open-toolkit-modal', handleOpenToolkit);
    }, []);

    // Always show label on certain pages (like ThankYou)
    useEffect(() => {
        if (alwaysShowLabel) {
            setShowToolkitLabel(true);
        }
    }, [alwaysShowLabel]);

    // Periodically show label with rotating text (only if not always showing)
    useEffect(() => {
        if (!isReady || alwaysShowLabel) return;

        const showLabel = () => {
            setCurrentLabelIndex(prev => (prev + 1) % TOOLKIT_LABELS.length);
            setShowToolkitLabel(true);
            setTimeout(() => setShowToolkitLabel(false), 4000); // Show for 4 seconds
        };

        const initialTimer = setTimeout(showLabel, 6000);
        const interval = setInterval(showLabel, 20000);

        return () => {
            clearTimeout(initialTimer);
            clearInterval(interval);
        };
    }, [isReady, alwaysShowLabel]);

    // Animate label
    useEffect(() => {
        if (!labelRef.current) return;

        if (showToolkitLabel) {
            gsap.fromTo(labelRef.current,
                { width: 0, opacity: 0 },
                { width: 'auto', opacity: 1, duration: 0.4, ease: "power2.out" }
            );
        } else {
            gsap.to(labelRef.current, {
                width: 0, opacity: 0,
                duration: 0.3, ease: "power2.in"
            });
        }
    }, [showToolkitLabel]);

    return (
        <>
            <div data-header-element className={`fixed top-6 right-6 z-[100] pointer-events-auto flex items-center gap-5`}>

                {/* 1. TOOLKIT - small red dot, same size as theme toggle */}
                <button
                    onClick={() => setIsToolkitOpen(true)}
                    className="relative flex items-center group"
                    aria-label="Get Style Toolkit"
                >
                    {/* Animated label - rotating questions */}
                    <span
                        ref={labelRef}
                        className="overflow-hidden whitespace-nowrap font-mono text-[11px] tracking-wider text-[#DC2626] mr-2"
                        style={{ width: alwaysShowLabel ? 'auto' : 0, opacity: alwaysShowLabel ? 1 : 0 }}
                    >
                        {TOOLKIT_LABELS[currentLabelIndex]}
                    </span>

                    {/* Red dot - with pulse animation */}
                    <div className="w-4 h-4 rounded-full bg-[#DC2626] opacity-90 group-hover:opacity-100 transition-opacity"
                         style={{ boxShadow: '0 0 10px rgba(220, 38, 38, 0.6)', animation: 'pulse 2s ease-in-out infinite' }} />
                </button>

                {/* 2. THEME TOGGLE - small white/black dot */}
                {showThemeToggle && (
                    <button
                        onClick={toggleTheme}
                        className="group"
                        aria-label="Toggle Theme"
                    >
                        {isDark ? (
                            <div className="w-5 h-5 rounded-full bg-white opacity-70 group-hover:opacity-100 transition-opacity"
                                 style={{ boxShadow: '0 0 10px rgba(255, 255, 255, 0.4)' }} />
                        ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-black/40 group-hover:border-black group-hover:bg-black/10 transition-all" />
                        )}
                    </button>
                )}

                {/* 3. INDEX - styled button matching CLOSE button */}
                <button
                    onClick={onOpen}
                    className={`group flex items-center gap-2 px-3 py-1.5 border ${isDark ? 'border-neutral-700' : 'border-neutral-300'} rounded hover:bg-[#DC2626] hover:border-[#DC2626] transition-all bg-transparent`}
                >
                    <span className={`font-mono text-[10px] font-bold uppercase ${isDark ? 'text-white' : 'text-neutral-900'} group-hover:text-white`}>Index</span>
                    <div className={`flex flex-col gap-[2px] w-2.5 items-end ${isDark ? 'text-white' : 'text-neutral-900'} group-hover:text-white`}>
                        <span className="w-full h-[1.5px] bg-current"></span>
                        <span className="w-2/3 h-[1.5px] bg-current group-hover:w-full transition-all"></span>
                        <span className="w-full h-[1.5px] bg-current"></span>
                    </div>
                </button>

            </div>

            <ToolkitModal
                isOpen={isToolkitOpen}
                onClose={() => setIsToolkitOpen(false)}
                theme={isDark ? 'dark' : 'light'}
            />
        </>
    );
};
