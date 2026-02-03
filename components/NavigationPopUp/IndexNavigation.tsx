import React, { useState } from 'react';
import { IndexTrigger } from './IndexTrigger';
import { IndexOverlay } from './IndexOverlay';

interface IndexNavigationProps {
    onNavigate: (type: 'landing' | 'layer' | 'shift' | 'summary' | 'manifesto' | 'thankyou', id?: string) => void;
    theme: 'dark' | 'light';
    toggleTheme: () => void;
    showThemeToggle?: boolean;
    forceDarkTheme?: boolean;
}

export const IndexNavigation: React.FC<IndexNavigationProps> = ({ onNavigate, theme, toggleTheme, showThemeToggle = true, forceDarkTheme = false }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <IndexTrigger
                onOpen={() => setIsOpen(true)}
                theme={theme}
                toggleTheme={toggleTheme}
                showThemeToggle={showThemeToggle}
                forceDarkTheme={forceDarkTheme}
            />
            <IndexOverlay
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onNavigate={onNavigate}
                theme={forceDarkTheme ? 'dark' : theme}
            />
        </>
    );
};