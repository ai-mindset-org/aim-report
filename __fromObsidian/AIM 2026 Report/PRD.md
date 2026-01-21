# PRD: AIM Annual Report 2025 – "THE CONTEXT GAP"

**Project:** AI Mindset Annual Report 2025
**Version:** 1.0
**Created:** 2026-01-05
**Author:** AI Mindset Team + Claude Code

---

## 1. Executive Summary

**Product Name:** THE CONTEXT GAP
**Tagline:** A paired map of Machines ↔ Humans

**Core Thesis:**
> Machines are gaining agency. Humans are hitting context saturation.
> AI is accelerating. Humans are buffering.

**Format:**
- Interactive Web Presentation (React 19 + Vite)
- Landscape PDF Export (16:9, print-ready)

**Purpose:**
Годовой артефакт AI Mindset, визуализирующий контрастные сдвиги между возможностями машин и адаптацией людей через 10 парных циклов (loops).

---

## 2. Design System

### 2.1 Visual Identity: Swiss Brutalist

**Philosophy:** Минималистичный Swiss design с brutualist акцентами. Геометрия, типографика, контраст.

**Color Palette:**
```css
/* Core Colors */
--red-primary: #DC2626;     /* Акцентный красный */
--black-primary: #171717;   /* Основной текст */
--white-primary: #FFFFFF;   /* Фон */
--neutral-gray: #737373;    /* Второстепенный текст */

/* Loop Color Spectrum (10 loops) */
--loop-1: #F43F5E;  /* rose-500 */
--loop-2: #F97316;  /* orange-500 */
--loop-3: #F59E0B;  /* amber-500 */
--loop-4: #EAB308;  /* yellow-500 */
--loop-5: #84CC16;  /* lime-500 */
--loop-6: #10B981;  /* emerald-500 */
--loop-7: #06B6D4;  /* cyan-500 */
--loop-8: #3B82F6;  /* blue-500 */
--loop-9: #8B5CF6;  /* violet-500 */
--loop-10: #D946EF; /* fuchsia-500 */
```

**Typography:**
- Headings: `font-black uppercase tracking-tighter`
- Body: `font-mono` for data, `font-sans` for narrative
- Numbers: `tabular-nums` for alignment

**Visual Principles:**
1. **Contrast** – Red on white, black on white, never muddy
2. **Grid-based** – 12-column responsive grid
3. **Animated SVG** – Framer Motion for all visual metaphors
4. **Negative space** – Let content breathe
5. **Data-forward** – Numbers are heroes, not decorations

### 2.2 Layout System

**Slide Layouts (SlideLayout type):**
```typescript
type SlideLayout =
  | 'center'      // Centered content with visual
  | 'split'       // 50/50 left text, right visual
  | 'loop'        // Machine/Human/Gap structure
  | 'loop-intro'  // Loop introduction with number
  | 'stats'       // Statistics grid
  | 'evidence'    // Sources and citations
  | 'timeline'    // Chronological view
  | 'quote'       // Large quote with attribution
  | 'section'     // Section divider
```

**Visual Metaphors (100+ components):**
- Geometric abstractions (circle, triangle, grid, chaos)
- Animated SVG illustrations
- Data visualizations (bars, lines, comparisons)
- Loop-specific visuals (infinity, spiral, orbit)

---

## 3. Content Architecture

### 3.1 10 Paired Loops Structure

Каждый loop следует единому ритму:

| Element | Description |
|---------|-------------|
| **Machine Signal** | Технический сдвиг года |
| **Human Signal** | Психологический/культурный сдвиг |
| **Context Gap** | Что ломается без действий |
| **The Move** | Конкретная AIM-практика |

**Loop Themes:**
1. System-2 Reasoning ↔ Trust Fatigue
2. Context Windows ↔ Attention Collapse
3. AI Agents ↔ Delegation Anxiety
4. Multi-modal ↔ Sensory Overwhelm
5. Enterprise AI ↔ Skill Displacement
6. Open Source ↔ Choice Paralysis
7. AI Infrastructure ↔ Value Gap
8. Reasoning Models ↔ Mental Models
9. Personal AI ↔ Identity Questions
10. Builder OS ↔ Human OS

### 3.2 Content Sources

**Primary Source:**
- `/AI Mindset {strategy}/AIM Annual Report 2025/context gap v3 2025-12-31.md`

**Supporting Documents:**
| File | Purpose |
|------|---------|
| `00_project_brief.md` | Project goals and thesis |
| `02_key_metrics.md` | 50+ validated statistics |
| `03_ray_structure.md` | Original structure analysis |
| `04_loops_mapping.md` | Data-to-loop mapping |
| `05_community_voice.md` | User testimonials |
| `06_link_bank.md` | 30+ source URLs |
| `07_humanities_track.md` | Philosophical context |
| `08_presentation_prompt.md` | Content generation prompt |

---

## 4. Technical Architecture

### 4.1 Tech Stack

```
Frontend:
├── React 19 (createRoot, no StrictMode issues)
├── TypeScript 5.x (strict mode)
├── Vite 6.x (fast HMR, optimized builds)
├── Framer Motion 11.x (animations)
└── Tailwind CSS 3.x (utility-first)

Build:
├── ESLint (code quality)
└── PostCSS (CSS processing)

Export:
└── html2canvas + jsPDF (PDF generation)
```

### 4.2 File Structure

```
aim-annual-report-2025-deck/
├── src/
│   ├── App.tsx              # Main app, navigation, keyboard
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles + Tailwind
├── components/
│   ├── Slide.tsx            # Core slide renderer (2500+ lines)
│   ├── VisualMetaphors.tsx  # 100+ SVG components
│   ├── LoopTransition.tsx   # Loop animation variants
│   └── hooks/
│       └── useKeyboard.ts   # Arrow key navigation
├── data/
│   └── reportDeck.ts        # All slide data (SlideData[])
├── types.ts                 # TypeScript interfaces
├── utils/
│   ├── markdown.ts          # parseMarkdown, parseGapMarkdown
│   └── pdf.ts               # exportToPDF with smart scaling
├── public/
│   └── assets/              # Images, logos
├── index.html               # HTML template
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── PRD.md                   # This document
```

### 4.3 Key Components

**Slide.tsx – Main Renderer**
- Handles all layout variants
- Renders visual metaphors via GAC_VISUAL_MAP
- Parses markdown content
- Manages Evidence sources
- Responsive scaling

**VisualMetaphors.tsx – Visual Library**
- 100+ animated SVG components
- Framer Motion animations
- Consistent styling API
- Loop-specific visuals

**reportDeck.ts – Data Layer**
```typescript
interface SlideData {
  id: string;
  title: string;
  layout: SlideLayout;
  visual?: VisualType;
  content?: string;
  machineSignal?: string;
  humanSignal?: string;
  contextGap?: string;
  theMove?: string;
  sources?: Source[];
  loopNumber?: number;
  sectionTitle?: string;
}
```

---

## 5. Key Features

### 5.1 Navigation

- **Keyboard:** Arrow keys (←/→), Page Up/Down
- **Click zones:** Left/right edges
- **Progress bar:** Top of screen
- **Loop indicator:** Colored dots with spectrum
- **Swipe:** Touch gesture support

### 5.2 PDF Export

- Smart scaling based on content density
- Print-ready 16:9 format
- Embedded fonts via html2canvas
- Multi-page output with slide numbers

### 5.3 Animations

- **Slide transitions:** Fade with subtle scale
- **Visual metaphors:** Continuous SVG animations
- **Loop transitions:** Infinity/spiral/orbit variants
- **Micro-interactions:** Hover states, underlines

---

## 6. Data Sources & Research

### 6.1 Key Statistics

| Metric | Value | Source |
|--------|-------|--------|
| Organizations using AI | 84-88% | McKinsey, StackOverflow |
| Truly transforming | 6% | McKinsey |
| AI pilots with zero ROI | 95% | MIT NANDA |
| Developers using AI daily | 51% | StackOverflow |
| Actively distrust AI | 46% | StackOverflow |
| Productivity gain (study) | 126% | Nielsen Norman |
| Devs in "red zone" | 76% | Qodo |
| Annual AI infra spend | $500B | Goldman Sachs |

### 6.2 Source Categories

1. **Industry Surveys:** GitHub Octoverse, StackOverflow
2. **Enterprise Research:** McKinsey, Gartner, MIT
3. **Productivity Studies:** NN/g, Qodo
4. **Market Analysis:** Goldman Sachs, a16z
5. **Thought Leaders:** Altman, Amodei, Hassabis
6. **Community Voice:** AIM Space testimonials

---

## 7. Development History

### 7.1 Creation Timeline

1. **Structure Phase:** Analysis of Ray's 10-loop framework
2. **Research Phase:** Aggregation of 50+ sources
3. **Content Phase:** Writing paired loop content
4. **Design Phase:** Swiss brutalist visual system
5. **Development Phase:** React implementation
6. **Animation Phase:** Framer Motion visuals
7. **Polish Phase:** Navigation, PDF export, refinements

### 7.2 Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| React 19 + Vite | Modern, fast, good DX |
| Framer Motion | Best React animation library |
| Swiss design | Professional, data-forward |
| 10 loops | Maps to Ray's original structure |
| Color spectrum nav | Visual differentiation of loops |
| Markdown parsing | Easy content updates |

---

## 8. Deployment

### 8.1 Build Commands

```bash
# Development
npm install
npm run dev

# Production build
npm run build

# Preview production
npm run preview
```

### 8.2 Hosting Options

- **Netlify:** Recommended (drag-drop deploy)
- **Vercel:** Alternative (git integration)
- **Static hosting:** Any server serving `dist/`

---

## 9. Future Enhancements

### Potential Additions
- [ ] Interactive data exploration
- [ ] Localization (EN/RU)
- [ ] Accessibility improvements (ARIA)
- [ ] Video backgrounds option
- [ ] Analytics integration
- [ ] Collaborative annotations

---

## 10. Repository Links

**Code Repository:**
`/Users/alex/Library/CloudStorage/Dropbox/notes/code tools/aim-annual-report-2025-deck/`

**Strategy Documents:**
`/Users/alex/Library/CloudStorage/Dropbox/notes/AI Mindset {strategy}/AIM Annual Report 2025/`

**Visual Reference (ivanov-ai-metaphors-deck):**
`/Users/alex/Library/CloudStorage/Dropbox/notes/code tools/ivanov-ai-metaphors-deck/`

---

## Appendix A: Visual Metaphor Index

Key visuals used in the presentation:

| Visual Type | Component | Usage |
|-------------|-----------|-------|
| `CONTEXT_WINDOW` | ContextVisual | Loop 2 |
| `ECOSYSTEM` | EcosystemVisual | Loop 5 |
| `STATS_ANIMATED` | StatsAnimated | Stats slides |
| `INFINITY_LOOP` | InfinityLoop | Section dividers |
| `GRID_DOTS` | GridDots | Background patterns |
| `DELEGATION` | DelegationVisual | Loop 3 |
| `IFS_SYSTEM` | IFSVisual | Psychology loops |

---

## Appendix B: Slide Type Reference

```typescript
// Full SlideData interface
interface SlideData {
  id: string;
  title: string;
  subtitle?: string;
  layout: SlideLayout;
  visual?: VisualType;
  content?: string;
  contentRight?: string;
  machineSignal?: string;
  humanSignal?: string;
  contextGap?: string;
  theMove?: string;
  sources?: Array<{
    label: string;
    url: string;
  }>;
  loopNumber?: number;
  sectionTitle?: string;
  stats?: Array<{
    value: string;
    label: string;
    trend?: 'up' | 'down' | 'neutral';
  }>;
}
```

---

*Document generated by Claude Code for AIM Annual Report 2025 project.*
