import React from 'react';

interface IndexTriggerProps {
    onOpen: () => void;
    theme: 'dark' | 'light';
    toggleTheme: () => void;
    showThemeToggle?: boolean;
    forceDarkTheme?: boolean;
    isReady?: boolean;
}

export const IndexTrigger: React.FC<IndexTriggerProps> = ({ onOpen, theme, toggleTheme, showThemeToggle = true, forceDarkTheme = false, isReady = true }) => {
    const isDark = forceDarkTheme ? true : theme === 'dark';

    // --- TECHNICAL THEME CONFIG ---
    const borderCol = isDark ? 'border-neutral-800' : 'border-neutral-300';
    const bgCol = isDark ? 'bg-black/80' : 'bg-white/80';
    const textCol = isDark ? 'text-neutral-400' : 'text-neutral-600';
    const hoverText = isDark ? 'hover:text-white' : 'hover:text-black';

    return (
        <div className={`fixed top-6 right-6 z-[100] pointer-events-auto flex items-start gap-2 font-mono text-[10px] uppercase tracking-widest transition-opacity duration-1000 ease-out ${isReady ? 'opacity-100' : 'opacity-0'}`}>
            
            {/* 1. THEME TOGGLE (Hidden on Landing) */}
            {showThemeToggle && (
                <button 
                    onClick={toggleTheme} 
                    className={`
                        w-10 h-10 flex items-center justify-center 
                        border ${borderCol} ${bgCol} backdrop-blur-md 
                        ${textCol} ${hoverText} transition-all duration-300
                        hover:border-neutral-500
                    `}
                    aria-label="Toggle Theme"
                >
                    {isDark ? (
                        <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]"></div>
                    ) : (
                        <div className="w-3 h-3 border border-black rounded-full"></div>
                    )}
                </button>
            )}

            {/* 2. INDEX TRIGGER */}
            <button 
                onClick={onOpen}
                className={`
                    h-12 md:h-10 px-8 md:px-6 flex items-center gap-3
                    border ${borderCol} ${bgCol} backdrop-blur-md
                    ${textCol} hover:text-[#DC2626] hover:border-[#DC2626] 
                    transition-all duration-300 group
                `}
            >
                <span className="font-bold">Index</span>
                <div className="flex flex-col gap-1 w-3 items-end">
                    <span className="w-full h-[1px] bg-current group-hover:w-full transition-all duration-300"></span>
                    <span className="w-2/3 h-[1px] bg-current group-hover:w-full transition-all duration-300 delay-75"></span>
                    <span className="w-full h-[1px] bg-current group-hover:w-full transition-all duration-300 delay-150"></span>
                </div>
            </button>

        </div>
    );
};