import React, { useState } from 'react';
import { IndexTrigger } from './IndexTrigger';
import { IndexOverlay } from './IndexOverlay';
import { track } from '../../lib/analytics';

interface IndexNavigationProps {
    onNavigate: (type: 'landing' | 'layer' | 'shift' | 'summary' | 'manifesto' | 'thankyou', id?: string) => void;
    theme: 'dark' | 'light';
    toggleTheme: () => void;
    showThemeToggle?: boolean;
    forceDarkTheme?: boolean;
    isReady?: boolean;
    alwaysShowLabel?: boolean;
}

export const IndexNavigation: React.FC<IndexNavigationProps> = ({ onNavigate, theme, toggleTheme, showThemeToggle = true, forceDarkTheme = false, isReady = true, alwaysShowLabel = false }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        track('nav-index-open');
        setIsOpen(true);
    };

    const handleNavigate = (type: 'landing' | 'layer' | 'shift' | 'summary' | 'manifesto' | 'thankyou', id?: string) => {
        track('nav-index-click', { to: id ? `${type}-${id}` : type });
        onNavigate(type, id);
    };

    return (
        <>
            <IndexTrigger
                onOpen={handleOpen}
                theme={theme}
                toggleTheme={toggleTheme}
                showThemeToggle={showThemeToggle}
                forceDarkTheme={forceDarkTheme}
                isReady={isReady}
                alwaysShowLabel={alwaysShowLabel}
            />
            <IndexOverlay
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onNavigate={handleNavigate}
                theme={forceDarkTheme ? 'dark' : theme}
            />
        </>
    );
};