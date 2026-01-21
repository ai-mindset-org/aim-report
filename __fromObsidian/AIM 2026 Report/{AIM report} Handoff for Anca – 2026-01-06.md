---
tags:
  - type/handoff
  - project/aim-report
date: 2026-01-06
status: active
---

# AIM Annual Report 2025 – Handoff для Anca

## 🔴 TODO (для Anca)

**Thank You Page - Clickable Author Names:**
- [ ] Сделать имена авторов на последней странице кликабельными ссылками
  - anca stavenski → [URL to be provided]
  - alex p → [URL to be provided]
  - ray svitla → [URL to be provided]
- Локация в коде: `content/slides.md` → последний слайд "thank you"
- Component: `components/Slide.tsx` → layout === 'center' (thank you slide)

## 📍 Где всё лежит

### Код (React презентация)
```
/code tools/aim-annual-report-2025-deck/
```
- **Технология:** React 19 + TypeScript + Framer Motion + Tailwind
- **Запуск:** `npm install && npm run dev`
- **~45 слайдов** (было ~35)

### Obsidian материалы
```
/AI Mindset {strategy}/AIM Annual Report 2025/
```

---

## Documentation Hub

### Core Documentation (Project Root)

**Technical Documentation:**
- [CHANGELOG.md](file:///Users/viola/All/Yandex.Disk.localized/3%20Process/5%20Work/AI%20Mindset/_aim-annual-report-2025-deck/aim-annual-report-2025-deck/CHANGELOG.md) - Complete version history, Shifts v1 release notes
- [DESIGN-RULES.md](file:///Users/viola/All/Yandex.Disk.localized/3%20Process/5%20Work/AI%20Mindset/_aim-annual-report-2025-deck/aim-annual-report-2025-deck/DESIGN-RULES.md) - Full design system: colors, typography, animations, SVG patterns
- [DEV-HISTORY-AIM-Report-2025-Code-Jan2025.md](file:///Users/viola/All/Yandex.Disk.localized/3%20Process/5%20Work/AI%20Mindset/_aim-annual-report-2025-deck/aim-annual-report-2025-deck/DEV-HISTORY-AIM-Report-2025-Code-Jan2025.md) - Detailed technical changelog with architecture diagrams

**Content System:**
- [content/README.md](file:///Users/viola/All/Yandex.Disk.localized/3%20Process/5%20Work/AI%20Mindset/_aim-annual-report-2025-deck/aim-annual-report-2025-deck/content/README.md) - Content editing guide, workflow instructions
- [content/slides.md](file:///Users/viola/All/Yandex.Disk.localized/3%20Process/5%20Work/AI%20Mindset/_aim-annual-report-2025-deck/aim-annual-report-2025-deck/content/slides.md) - SOURCE OF TRUTH for all slide content (Markdown)
- [content/slides-backup.md](file:///Users/viola/All/Yandex.Disk.localized/3%20Process/5%20Work/AI%20Mindset/_aim-annual-report-2025-deck/aim-annual-report-2025-deck/content/slides-backup.md) - Backup before Shifts v1 migration

**Automation Scripts:**
- [scripts/md-to-json.ts](file:///Users/viola/All/Yandex.Disk.localized/3%20Process/5%20Work/AI%20Mindset/_aim-annual-report-2025-deck/aim-annual-report-2025-deck/scripts/md-to-json.ts) - Markdown parser (slides.md to JSON converter)
- [scripts/deploy.sh](file:///Users/viola/All/Yandex.Disk.localized/3%20Process/5%20Work/AI%20Mindset/_aim-annual-report-2025-deck/aim-annual-report-2025-deck/scripts/deploy.sh) - Autopush pipeline (MD to JSON, commit, push)
- [scripts/watch-content.ts](file:///Users/viola/All/Yandex.Disk.localized/3%20Process/5%20Work/AI%20Mindset/_aim-annual-report-2025-deck/aim-annual-report-2025-deck/scripts/watch-content.ts) - Live editing watcher
- [scripts/migrate-to-markdown.ts](file:///Users/viola/All/Yandex.Disk.localized/3%20Process/5%20Work/AI%20Mindset/_aim-annual-report-2025-deck/aim-annual-report-2025-deck/scripts/migrate-to-markdown.ts) - One-time migration script (reportDeck.ts to slides.md)

**Obsidian Documentation:**
- [[AIM Report 2025 - Content Editing Workflow]] - Quick start guide for content editing

### Architecture Overview

**Current State: Shifts v1 (Deck Format)**
- Terminology migrated: Loops to Shifts
- All 62 slides in Markdown format
- Full source citations for reference slides (72+ sources)
- Accelerated animations (0.15s transitions)
- MD to JSON autopush workflow

**Workflow:**
```
content/slides.md (edit here)
  |
npm run deploy
  |
scripts/md-to-json.ts
  |
public/locales/en/slides.json
  |
git commit + push
  |
GitHub Actions deploys to Pages
```

**Branch Structure:**
- `main` - Production (Deck Format, Shifts v1)
- `feature/article-format` - Experimental branch for non-deck structure

### Product & Vision Documents

**Product Requirements:**
- [[PRD]] - Product requirements document
- [[PRD - State Analysis & TODO]] - Current state analysis and tasks
- [[TASKS]] - Task tracking

**Anca's Vision & Critique:**
- [[Critique & Action Items - Anca]] - Critical feedback and action items
- [[AncaIsAngry]] - Direct critique and frustrations
- [[Marketing Pile - Anca Ideas]] - Marketing concepts and ideas
- [[«стресс-тест» для отчета]] - Stress test for the report

**Structure & Content:**
- [[new structure - UPDATED]] - Current structure: 11 Shifts with full evidence and sources

**Design Inspiration:**
- [[Design Inspiration/Complex Animations - Technical Guide]] - Technical animation guide
- [[Design Inspiration/Sleep Well Creatives - Animation Breakdown]] - Sleep Well Creatives case study

**Content Archive:**
- [[All Texts - Context Gap Report]] - Full text compilation
- [[context gap v3 2025-12-31]] - Version 3 of context gap content

---

## 📂 Структура файлов в Obsidian

| Файл | Назначение |
|------|------------|
| **[[Agents.md]]** | 🧭 Навигация по проекту — читай первым! |
| **[[{AIM report} {content} Context Gap v3 – FINAL – 2025-12-31]]** | ✅ Финальный текст всех слайдов |
| **[[{AIM report} {data} Key Metrics – 2025-12-23]]** | 50+ статистик |
| **[[{AIM report} {data} Loops Mapping – 2025-12-23]]** | Маппинг loops → data points → sources + Founder OS Videos |
| **[[{AIM report} {data} Community Voice – 2025-12-23]]** | 10 testimonials |
| **[[{AIM report} {research} Extended Industry Research – 2025-12-24]]** | 136KB бэкенд: 60 секций, 120+ источников |
| **[[{AIM report} {research} Humanities Thought Leaders – 2025-12-23]]** | Amodei / Andreessen / Aschenbrenner |

---

## Структура кодовой базы

### Source Files

| Файл | Назначение | Статус |
|------|------------|--------|
| `content/slides.md` | SOURCE OF TRUTH - все слайды в Markdown | PRIMARY |
| `public/locales/en/slides.json` | Auto-generated из slides.md | GENERATED |
| `reportDeck.ts` | Fallback (используется только если JSON не загрузился) | FALLBACK |
| `types.ts` | TypeScript типы | ACTIVE |
| `App.tsx` | Навигация, PDF export, localStorage persistence | ACTIVE |
| `components/Slide.tsx` | Рендеринг всех layouts | ACTIVE |
| `components/VisualMetaphors.tsx` | SVG визуальные метафоры | ACTIVE |

### Commands

```bash
npm run dev              # Local development server
npm run build            # Production build
npm run deploy           # Full pipeline: MD to JSON + commit + push
npm run content:update   # Convert MD to JSON only
npm run content:watch    # Live editing mode
```

**Код:** `/Users/viola/All/Yandex.Disk.localized/3 Process/5 Work/AI Mindset/_aim-annual-report-2025-deck/aim-annual-report-2025-deck/`

### File Locations (Quick Links)

**In Project Root:**
- [CHANGELOG.md](file:///Users/viola/All/Yandex.Disk.localized/3%20Process/5%20Work/AI%20Mindset/_aim-annual-report-2025-deck/aim-annual-report-2025-deck/CHANGELOG.md)
- [DESIGN-RULES.md](file:///Users/viola/All/Yandex.Disk.localized/3%20Process/5%20Work/AI%20Mindset/_aim-annual-report-2025-deck/aim-annual-report-2025-deck/DESIGN-RULES.md)
- [DEV-HISTORY-AIM-Report-2025-Code-Jan2025.md](file:///Users/viola/All/Yandex.Disk.localized/3%20Process/5%20Work/AI%20Mindset/_aim-annual-report-2025-deck/aim-annual-report-2025-deck/DEV-HISTORY-AIM-Report-2025-Code-Jan2025.md)

**Content System:**
- [content/README.md](file:///Users/viola/All/Yandex.Disk.localized/3%20Process/5%20Work/AI%20Mindset/_aim-annual-report-2025-deck/aim-annual-report-2025-deck/content/README.md)
- [content/slides.md](file:///Users/viola/All/Yandex.Disk.localized/3%20Process/5%20Work/AI%20Mindset/_aim-annual-report-2025-deck/aim-annual-report-2025-deck/content/slides.md)

**Scripts:**
- [scripts/deploy.sh](file:///Users/viola/All/Yandex.Disk.localized/3%20Process/5%20Work/AI%20Mindset/_aim-annual-report-2025-deck/aim-annual-report-2025-deck/scripts/deploy.sh)
- [scripts/md-to-json.ts](file:///Users/viola/All/Yandex.Disk.localized/3%20Process/5%20Work/AI%20Mindset/_aim-annual-report-2025-deck/aim-annual-report-2025-deck/scripts/md-to-json.ts)

---

## Что сделано

### Shifts v1 (Deck Format) - 2026-01-13

**Content System Overhaul:**
1. **Markdown-First Workflow** - `content/slides.md` is now single source of truth
2. **Autopush Pipeline** - One command deploys everything: `npm run deploy`
3. **Full Migration** - All 62 slides migrated from `reportDeck.ts` to `slides.md`
4. **Terminology Update** - All "loop" references changed to "shift" throughout
5. **Sources System** - 72+ sources added for reference slides (55-62)
6. **Design Documentation** - Complete design system in `DESIGN-RULES.md`
7. **Performance** - Slide transitions accelerated from 0.4s to 0.15s
8. **Branch Created** - `feature/article-format` for future non-deck structure

### Previous (2026-01-06)

1. **Монохромная навигация** — все loops красные (`bg-red-600`) вместо радуги
2. **10 Evidence слайдов** — новый layout `loop-evidence` для каждого loop
   - Структура: loop-intro to loop to loop-evidence
   - 3 колонки: Key Stats, Research Highlights, Sources
3. **Данные из Extended Research** — метрики McKinsey, Gartner, Goldman Sachs
4. **QR-код** на финальном слайде (Telegram @ai_mind_set)
5. **Улучшенный sources layout** — 3-колоночный компактный дизайн

---

## 📋 TODO (что нужно доделать)

### 1. Интернационализация (i18n)
- [ ]  русский язык
- [ ]  белорусский язык
- [ ] Создать language switcher в UI
- [ ] румынский язык

### 2. Нормализация
- [ ] Нормальное повествование Что это И зачем
- [ ] какие нахуй лупы, гапы, сигналы и подобное? язык, который даже я не понимаю
- [ ] мысли команды в конце
- [ ] unfolding structure
- [ ] Что за контекст гэп и почему это важно?
- [ ] Зачем вообще читать?
- [ ] Разные слова ни о чем, не связанные. Связать и сказать нормальными словами
- [ ] Контекст и репорты вместе показать


### 2. Evidence слайды — улучшения
- [ ] Удалить дублицирующиеся ссылки на разных evidence slides
- [ ] Усилить evidence за счёт Founder OS Videos (см. Loops Mapping)
- [ ] Добавить ссылки на артефакты AIM:
  - [ ] ivanov.aimindset.org — IFS + AI (Loop 10)
  - [ ] intention.aimindset.org — Intention OS (Loop 2)
  - [ ] spiridonov.aimindset.org — Прагматичный романтизм

### 3.Дизайн
- [ ] Поправить верстку проблемных слайдов
- [ ] Проверить отображение на разных разрешениях
- [ ] Убедиться, что все loop-evidence слайды консистентны
- [ ] Первый слайд – сторителлинг с анимацией
- [ ] Анимация мощная как в sleeping или music websites 
- [ ] Human - Robot hero

### 4. Founder OS Video интеграция
- [ ] Loop 2: FOS #12 Intention OS — Mike Yan
- [ ] Loop 7: FOS #4 Команда в Cursor
- [ ] Loop 10: FOS #14 IFS + AI — Алексей Иванов
- [ ] Loop 10: FOS #6 AI в терапии

---

## 🔗 Ключевые ресурсы

**Артефакты AIM:**
- https://ivanov.aimindset.org/ — IFS + AI
- https://intention.aimindset.org/ — Intention OS
- https://spiridonov.aimindset.org/ — Прагматичный романтизм

**YouTube:**
- [Founder Operating System playlist](https://www.youtube.com/playlist?list=PLs9wHgNIg4ZP6aqRFgDcX1-rA2yAlmwHd)

**Telegram:**
- @ai_mind_set

---

## 🎯 Thesis

> **Machines are gaining agency. Humans are hitting context saturation.**

10 Loops показывают парные сдвиги: Machine Signal ↔ Human Signal ↔ The Gap




___
Usefull tools / links

**Useful Tools for CSS gradients**

To recreate these effects in CSS there are loads of tools available allowing them to be created through visual editors, simply by copying and pasting the CSS code, as you can see here: [Webgradients](https://webgradients.com/)[,](https://mycolor.space/) [Khroma AI](http://khroma.co/), [Color Space](https://mycolor.space/), [UI Gradients](https://uigradients.com/#LoveCouple), [Grabient](https://www.grabient.com/), [Coolhue](https://webkul.github.io/coolhue/), [Easing Gradients in CSS](https://larsenwork.com/easing-gradients/).
