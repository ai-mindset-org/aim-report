import React from 'react';
import { EcoVisualProps } from './types';

export const EcoVisual: React.FC<EcoVisualProps> = ({ type, theme }) => {
    const isDark = theme === 'dark';
    const commonClass = `w-full h-full ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`;
    const accentColor = "#DC2626";

    // LAB - Triangle with circles (like the example)
    if (type === 'lab') return (
        <svg className={commonClass} viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
            {/* Scattered dots */}
            <circle cx="80" cy="60" r="4" fill="currentColor" opacity="0.3" />
            <circle cx="320" cy="80" r="3" fill="currentColor" opacity="0.2" />
            <circle cx="160" cy="120" r="5" fill="currentColor" opacity="0.25" />
            <circle cx="280" cy="180" r="3" fill="currentColor" opacity="0.2" />
            <circle cx="100" cy="200" r="4" fill="currentColor" opacity="0.3" />

            {/* Central triangle */}
            <path
                d="M 200 100 L 300 280 L 100 280 Z"
                fill="none"
                stroke={accentColor}
                strokeWidth="2"
                opacity="0.6"
            />

            {/* Inner elements */}
            <circle cx="200" cy="220" r="30" fill={accentColor} opacity="0.4" />
            <circle cx="200" cy="220" r="15" fill={accentColor} opacity="0.6" />

            {/* Decorative circles */}
            <circle cx="150" cy="200" r="8" fill="currentColor" opacity="0.2" />
            <circle cx="180" cy="160" r="6" fill="currentColor" opacity="0.25" />
            <circle cx="250" cy="200" r="8" fill="currentColor" opacity="0.2" />

            {/* Connection lines */}
            <line x1="150" y1="200" x2="180" y2="160" stroke="currentColor" strokeWidth="1" opacity="0.15" />
            <line x1="180" y1="160" x2="250" y2="200" stroke="currentColor" strokeWidth="1" opacity="0.15" />

            {/* Bottom dots */}
            <circle cx="160" cy="320" r="4" fill="currentColor" opacity="0.3" />
            <circle cx="240" cy="340" r="3" fill="currentColor" opacity="0.2" />
        </svg>
    );

    // SPRINT - Double chevron arrows (like the example)
    if (type === 'sprint') return (
        <svg className={commonClass} viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
            {/* First chevron */}
            <path
                d="M 40 60 L 100 100 L 40 140"
                fill="none"
                stroke={accentColor}
                strokeWidth="3"
                opacity="0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {/* Second chevron */}
            <path
                d="M 80 60 L 140 100 L 80 140"
                fill="none"
                stroke={accentColor}
                strokeWidth="3"
                opacity="0.7"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {/* Decorative elements */}
            <rect x="150" y="40" width="30" height="2" fill="currentColor" opacity="0.2" />
            <rect x="150" y="60" width="20" height="2" fill="currentColor" opacity="0.15" />
            <rect x="150" y="140" width="25" height="2" fill="currentColor" opacity="0.2" />
            <rect x="150" y="160" width="15" height="2" fill="currentColor" opacity="0.15" />
        </svg>
    );

    // MASTERCLASS - Frame with play symbol (like the example)
    if (type === 'masterclass') return (
        <svg className={commonClass} viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
            {/* Outer frame - corner brackets */}
            {/* Top-left corner */}
            <path d="M 30 30 L 30 60 M 30 30 L 60 30" stroke={accentColor} strokeWidth="2" fill="none" opacity="0.5" />
            {/* Top-right corner */}
            <path d="M 170 30 L 170 60 M 170 30 L 140 30" stroke={accentColor} strokeWidth="2" fill="none" opacity="0.5" />
            {/* Bottom-left corner */}
            <path d="M 30 170 L 30 140 M 30 170 L 60 170" stroke={accentColor} strokeWidth="2" fill="none" opacity="0.5" />
            {/* Bottom-right corner */}
            <path d="M 170 170 L 170 140 M 170 170 L 140 170" stroke={accentColor} strokeWidth="2" fill="none" opacity="0.5" />

            {/* Inner rectangle */}
            <rect x="50" y="50" width="100" height="100" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2" />

            {/* Play button triangle */}
            <path
                d="M 90 75 L 90 125 L 130 100 Z"
                fill="currentColor"
                opacity="0.15"
            />
            <path
                d="M 90 75 L 90 125 L 130 100 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                opacity="0.3"
            />
        </svg>
    );

    // COMMUNITY - Network with nodes (like the example)
    if (type === 'community') return (
        <svg className={commonClass} viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
            {/* Grid pattern background */}
            <defs>
                <pattern id={`grid-comm-${theme}`} width="40" height="40" patternUnits="userSpaceOnUse">
                    <rect width="40" height="40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1"/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#grid-comm-${theme})`} />

            {/* Network nodes */}
            <rect x="280" y="60" width="40" height="40" fill="currentColor" opacity="0.15" />
            <rect x="285" y="65" width="30" height="30" fill="currentColor" opacity="0.1" />

            {/* Connection lines */}
            <line x1="100" y1="100" x2="200" y2="80" stroke="currentColor" strokeWidth="1" opacity="0.2" />
            <line x1="200" y1="80" x2="280" y2="80" stroke="currentColor" strokeWidth="1" opacity="0.2" />
            <line x1="200" y1="80" x2="250" y2="140" stroke="currentColor" strokeWidth="1" opacity="0.2" />

            {/* Decorative dots */}
            <circle cx="100" cy="100" r="5" fill="currentColor" opacity="0.25" />
            <circle cx="200" cy="80" r="4" fill="currentColor" opacity="0.2" />
            <circle cx="250" cy="140" r="4" fill="currentColor" opacity="0.2" />

            {/* Accent circle */}
            <circle cx="350" cy="150" r="20" fill="none" stroke={accentColor} strokeWidth="1" opacity="0.3" />
            <circle cx="350" cy="150" r="5" fill={accentColor} opacity="0.4" />
        </svg>
    );

    // ARK - Knowledge architecture (pyramid/mountain shape)
    if (type === 'ark') return (
        <svg className={commonClass} viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
            <defs>
                <pattern id={`grid-ark-${theme}`} width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#grid-ark-${theme})`} />
            {/* Mountain/Ark shape */}
            <path d="M 100 150 L 200 50 L 300 150" fill="none" stroke={accentColor} strokeWidth="2" opacity="0.6" />
            <rect x="180" y="40" width="40" height="30" fill={accentColor} opacity="0.2" />
            {/* Horizontal lines */}
            <line x1="120" y1="120" x2="280" y2="120" stroke="currentColor" strokeWidth="1" opacity="0.2" />
            <line x1="140" y1="90" x2="260" y2="90" stroke="currentColor" strokeWidth="1" opacity="0.15" />
        </svg>
    );

    // MEDIA - Video/YouTube (wave patterns)
    if (type === 'media') return (
        <svg className={commonClass} viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
            <defs>
                <pattern id={`pat-media-${theme}`} width="10" height="10" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="0.5" fill="currentColor" opacity="0.3"/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#pat-media-${theme})`} />
            {/* Wave patterns */}
            <path d="M -50 100 Q 100 0 250 100" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" />
            <path d="M -50 120 Q 100 20 250 120" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" />
            <path d="M -50 140 Q 100 40 250 140" stroke={accentColor} strokeWidth="1" fill="none" opacity="0.6" />
            {/* Play button */}
            <circle cx="180" cy="180" r="25" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.2" />
            <path d="M 172 168 L 172 192 L 195 180 Z" fill={accentColor} opacity="0.4" />
        </svg>
    );

    // SIGNAL - Telegram/daily signals (broadcast waves)
    if (type === 'signal') return (
        <svg className={commonClass} viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
            {/* Broadcast waves */}
            <circle cx="50" cy="100" r="30" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.15" />
            <circle cx="50" cy="100" r="60" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.1" />
            <circle cx="50" cy="100" r="90" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.05" />
            {/* Signal source */}
            <circle cx="50" cy="100" r="10" fill={accentColor} opacity="0.5" />
            {/* Signal lines going right */}
            <line x1="80" y1="80" x2="180" y2="60" stroke={accentColor} strokeWidth="1" opacity="0.3" />
            <line x1="80" y1="100" x2="180" y2="100" stroke={accentColor} strokeWidth="2" opacity="0.5" />
            <line x1="80" y1="120" x2="180" y2="140" stroke={accentColor} strokeWidth="1" opacity="0.3" />
            {/* Dots */}
            <circle cx="180" cy="60" r="3" fill="currentColor" opacity="0.3" />
            <circle cx="180" cy="100" r="4" fill={accentColor} opacity="0.5" />
            <circle cx="180" cy="140" r="3" fill="currentColor" opacity="0.3" />
        </svg>
    );

    if (type === 'space') return (
        <svg className={commonClass} viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
            <circle cx="100" cy="100" r="50" stroke={accentColor} strokeWidth="1" fill="none" opacity="0.4" />
            <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.3" />
            <circle cx="100" cy="50" r="6" fill="currentColor" opacity="0.4" />
            <circle cx="50" cy="100" r="6" fill="currentColor" opacity="0.4" />
            <circle cx="150" cy="100" r="6" fill="currentColor" opacity="0.4" />
            <circle cx="100" cy="150" r="6" fill={accentColor} opacity="0.5" />
        </svg>
    );

    return null;
};
