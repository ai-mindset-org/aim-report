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
    const [showToolkitLabel, setShowToolkitLabel] = useState(false);
    const labelRef = useRef<HTMLSpanElement>(null);

    const isDark = forceDarkTheme ? true : theme === 'dark';
    const textCol = isDark ? 'text-neutral-500' : 'text-neutral-500';

    // Periodically show label
    useEffect(() => {
        if (!isReady) return;

        const showLabel = () => {
            setShowToolkitLabel(true);
            setTimeout(() => setShowToolkitLabel(false), 2500);
        };

        const initialTimer = setTimeout(showLabel, 8000);
        const interval = setInterval(showLabel, 25000);

        return () => {
            clearTimeout(initialTimer);
            clearInterval(interval);
        };
    }, [isReady]);

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
            <div className={`fixed top-6 right-6 z-[100] pointer-events-auto flex items-center gap-4 transition-opacity duration-1000 ease-out ${isReady ? 'opacity-100' : 'opacity-0'}`}>

                {/* 1. TOOLKIT - small red dot, same size as theme toggle */}
                <button
                    onClick={() => setIsToolkitOpen(true)}
                    className="relative flex items-center group"
                    aria-label="Get Style Toolkit"
                >
                    {/* Animated label */}
                    <span
                        ref={labelRef}
                        className="overflow-hidden whitespace-nowrap font-mono text-[10px] tracking-wider text-[#DC2626]/70 mr-1"
                        style={{ width: 0, opacity: 0 }}
                    >
                        getstyle
                    </span>

                    {/* Small red dot - same size as theme toggle */}
                    <div className="w-3 h-3 rounded-full bg-[#DC2626] opacity-60 group-hover:opacity-100 transition-opacity"
                         style={{ boxShadow: '0 0 8px rgba(220, 38, 38, 0.4)' }} />
                </button>

                {/* 2. THEME TOGGLE - small white/black dot */}
                {showThemeToggle && (
                    <button
                        onClick={toggleTheme}
                        className="group"
                        aria-label="Toggle Theme"
                    >
                        {isDark ? (
                            <div className="w-3 h-3 rounded-full bg-white opacity-60 group-hover:opacity-100 transition-opacity"
                                 style={{ boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)' }} />
                        ) : (
                            <div className="w-3 h-3 rounded-full border border-black/40 group-hover:border-black transition-colors" />
                        )}
                    </button>
                )}

                {/* 3. INDEX - simple text */}
                <button
                    onClick={onOpen}
                    className={`flex items-center gap-2 ${textCol} hover:text-[#DC2626] transition-colors group`}
                >
                    <span className="font-mono text-[10px] tracking-wide">index</span>
                    <div className="flex flex-col gap-[2px] w-2 items-end">
                        <span className="w-full h-[1px] bg-current"></span>
                        <span className="w-1/2 h-[1px] bg-current group-hover:w-full transition-all"></span>
                        <span className="w-full h-[1px] bg-current"></span>
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
