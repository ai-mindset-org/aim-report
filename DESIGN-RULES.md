# Design Rules: AIM Annual Report 2025

## Color Palette

### Primary Colors
```
Red (Accent):    #DC2626  (rgb(220, 38, 38))
Red Light:       #EF4444  (rgb(239, 68, 68))
Black/Dark:      #333333  (rgb(51, 51, 51))
```

### Neutral Scale
```
Background:      #0A0A0A  (rgb(10, 10, 10))
Foreground:      #F5F5F5  (rgb(245, 245, 245))
Card:            #141414  (rgb(20, 20, 20))
Border:          #262626  (rgb(38, 38, 38))
Muted:           #737373  (rgb(115, 115, 115))
```

### Semantic Usage
- **Red (#DC2626)**: Accent, CTAs, highlights, active states
- **Black (#333333)**: Primary text, SVG strokes
- **Neutral-900 (#171717)**: Dark backgrounds
- **White (#FFFFFF)**: Light backgrounds, contrast text

---

## Typography

### Font Families
```css
IBM Plex Mono:       400, 500, 600, 700
Playfair Display:    400, 700
```

### Font Weights
- **400 (Regular)**: Body text, default
- **500 (Medium)**: Emphasized text
- **600 (Semibold)**: Headings, subheadings
- **700 (Bold)**: Strong emphasis, titles

### Usage
- **Mono (IBM Plex)**: UI elements, metadata, captions, code
- **Serif (Playfair)**: Not currently used, reserved for future

### Font Features
```css
font-feature-settings: "liga" 1, "calt" 1;
```

---

## Spacing & Layout

### Fixed Dimensions
- **Slide Ratio**: 16:9 (1600px × 900px)
- **Print**: 13.333in × 7.5in
- **PDF Export**: 1600px × 900px

### Grid System
- Uses Tailwind default spacing scale (0.25rem increments)
- Common gaps: 3, 4, 5, 6, 8, 12 (0.75rem - 3rem)

---

## Animations

### Duration Standards
```css
Ultra Fast:   0.15s  /* Slide transitions */
Fast:         0.2s   /* Hover states */
Normal:       0.3s   /* Modal open/close */
Slow:         0.5s   /* Progress bar */
Very Slow:    2-3s   /* SVG path animations */
```

### Easing Functions
```
easeOut:      Default for entrances
easeInOut:    Smooth bidirectional
circOut:      Dramatic entrances
linear:       Continuous loops
```

### Keyframe Animations

**Pulse Slow:**
```css
@keyframes pulse-slow {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
}
/* Duration: 3s infinite */
```

**Float:**
```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
/* Duration: 4s infinite */
```

### Framer Motion Patterns

**Slide Transition:**
```tsx
initial={{ opacity: 0, y: 10 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -10 }}
transition={{ duration: 0.15, ease: "easeOut" }}
```

**Modal/Dropdown:**
```tsx
initial={{ opacity: 0, y: -8 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -8 }}
transition={{ duration: 0.15 }}
```

**SVG Path Drawing:**
```tsx
initial={{ pathLength: 0 }}
animate={{ pathLength: 1 }}
transition={{ duration: 2.5, ease: "easeOut" }}
```

**Pulsing Indicator:**
```tsx
animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
transition={{ duration: 1.5, repeat: Infinity }}
```

---

## Effects

### Shadows
```css
/* Glow Red */
box-shadow: 0 0 30px rgba(220, 38, 38, 0.3);

/* Border Glow */
box-shadow: inset 0 0 20px rgba(220, 38, 38, 0.1);

/* Card Shadow */
box-shadow: 0 10px 40px rgba(0, 0, 0, 0.25);
```

### Gradients
```css
/* Text Gradient */
background: linear-gradient(to right, #DC2626, #EF4444);
background-clip: text;
-webkit-background-clip: text;
color: transparent;
```

---

## SVG Visual System

### Core Principles
- Flat design, no shadows
- Bold strokes (3-4px)
- Swiss style minimalism
- Red + Black palette

### Common SVG Patterns

**Context Gap Cover:**
```svg
<!-- Machine curve (exponential) -->
<path 
  d="M40 120 C 80 120, 120 115, 160 100 C 200 85, 260 50, 360 15"
  stroke="#DC2626"
  stroke-width="4"
  fill="none"
  stroke-linecap="round"
/>

<!-- Human curve (slower) -->
<path 
  d="M40 120 C 80 120, 120 125, 160 135 C 200 145, 260 160, 360 180"
  stroke="#333333"
  stroke-width="4"
  fill="none"
  stroke-linecap="round"
/>

<!-- Gap indicators -->
<line 
  x1="160" y1="100" 
  x2="160" y2="135"
  stroke="#DC2626"
  stroke-width="1"
  stroke-dasharray="4 4"
  opacity="0.5"
/>
```

**Animated Spiral:**
```svg
<path
  d="M100,100 C100,90 110,85 115,90 C125,100 130,85 125,75..."
  stroke="#DC2626"
  stroke-width="3"
  fill="none"
  stroke-linecap="round"
/>
```

**Orbiting Elements:**
```tsx
<motion.circle
  r="8"
  fill="#DC2626"
  animate={{
    cx: [100, 120, 100, 80, 100],
    cy: [80, 100, 120, 100, 80]
  }}
  transition={{
    duration: 3,
    repeat: Infinity,
    ease: "linear"
  }}
/>
```

### Visual Metaphor Library

**Chaos/Scattered:**
```tsx
{Array.from({ length: 16 }).map((_, i) => (
  <motion.div
    className="absolute w-6 h-6 bg-red-200"
    animate={{
      x: Math.cos(i * 22.5 * (Math.PI / 180)) * 80,
      y: Math.sin(i * 22.5 * (Math.PI / 180)) * 80,
      opacity: [0.3, 0.9, 0.3]
    }}
    transition={{ duration: 4, repeat: Infinity, delay: i * 0.08 }}
  />
))}
```

**Pulsing Ring:**
```tsx
<motion.div
  className="absolute w-20 h-20 border-2 border-red-600 rounded-full"
  animate={{ 
    scale: [1, 1.5, 1], 
    opacity: [0.5, 0, 0.5] 
  }}
  transition={{ duration: 2, repeat: Infinity }}
/>
```

**Wave Pattern:**
```svg
<path
  d="M0,50 Q30,20 60,50 T120,50 T180,50 T240,50"
  stroke="#DC2626"
  stroke-width="3"
  fill="none"
/>
```

---

## Scrollbar

```css
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: #0a0a0a;
}

::-webkit-scrollbar-thumb {
  background: #262626;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: #dc2626;
}
```

---

## Responsive Breakpoints

Uses Tailwind defaults:
```
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

PDF export forces `md:` breakpoint styles at 1600px width.

---

## Print/Export Rules

### PDF Export Optimizations
- Disable all animations (`animation: none !important`)
- Force exact colors (no transparency loss)
- Fixed dimensions: 1600×900px
- Font sizes scaled up for readability
- `-webkit-print-color-adjust: exact`
- `print-color-adjust: exact`

### Page Setup
```css
@page {
  size: 13.333in 7.5in;
  margin: 0;
}
```

---

## Component Patterns

### Button States
```tsx
className="px-3 py-2 border border-neutral-200 
  hover:border-red-200 hover:text-red-600 
  transition-all duration-200"
```

### Card/Panel
```tsx
className="bg-white/90 backdrop-blur 
  rounded-lg border border-neutral-200 
  shadow-sm"
```

### Active Indicator
```tsx
className="w-2 h-2 rounded-full 
  ${active ? 'bg-red-600' : 'bg-neutral-300'}"
```

---

## Accessibility

- Font minimum: 10px (captions)
- Body text: 14-16px
- High contrast: White text on dark backgrounds
- Focus states: Red accent border
- Reduced motion support via Framer Motion

---

## File Organization

```
/fonts/              IBM Plex Mono, Playfair Display (.woff2)
/assets/             Images, logos
/components/         React components
  VisualMetaphors.tsx   SVG visual library
  Slide.tsx            Slide rendering
index.css            Global styles, animations
tailwind.config.js   Theme configuration
```
