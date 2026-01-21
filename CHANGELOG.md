# Changelog

## 2026-01-17 PM - Structure Cleanup & Content Expansion

**Structure Changes:**
- Removed 3 intro slides: 00-prologue, 01-battle for agency, 02-eleven shifts architecture
- Removed all source shelf pages (archived to `__archive/sources-and-credits-archive-2026-01-17.md`)
- Total slides: 26 (down from 36)

**Major Content Additions:**

**New: "why this matters" slide**
- Explains the crisis: loss of agency, reliability tax, responsibility void
- Clarifies how report helps: maps terrain, field-tested frameworks, action plan
- Sets expectation: sovereignty reset as concrete next steps

**Expanded: "survival kit" → "the sovereignty reset"**
- Added 5-step action plan from Sovereignty Reset framework
- Build sovereign stack (personal RAG, on-device AI, context dieting)
- Audit don't generate (consigliere mindset, reasoning traces)
- Deploy guardian agents (cognitive firewalls, zero trust)
- Value the tacit (embodied skills, prevent model collapse)
- Test divergently (query multiple models, prediction markets, opt-out)

**Expanded: "stay in the loop"**
- Added storytelling: "we are not a research institute, we are a lab"
- Community context: 1,500+ participants, 10+ countries, 3 years
- Narrative: lived through context gap, named it, built defenses

**Field Signals Restoration:**
- Added participant quotes to both field signals pages
- Quotes from: Alexander Stashenko, Nikolay Senin, Yakov Vasiliev, Natalya Savenkova
- Themes: tool to participant, consumer to builder, speed as new normal, context engineering, vibe-coding

**Content Navigation System:**
- Created content navigation cards component (ContentCards.tsx)
- Added content-cards.json with all 11 shifts data
- Each card shows: shift number, title, subtitle, description, layer badge, key sources
- "Content" button in header opens card navigation overlay
- Cards are grouped by layers with color coding (Foundation/Cognition/Interface/Humanity)
- Click card to jump to specific shift slide

**Technical Changes:**
- Logo now links to https://aimindset.org (opens in new tab)
- Lab Evidence slide: Set actual artifact URLs (ivanov, intention, spiridonov)
- Added Content button next to Menu button for shift navigation
- Integrated content cards loading from JSON in App.tsx

---

## 2026-01-17 AM - Content Updates & Structure Refinements

**Major Content Changes:**

**Shift 08 (Reality/Body):**
- Changed subtitle from "the matter (spatial ai)" to "reality (body)"
- Expanded gap: added "opening a door: trivial in simulation, nightmare in reality"

**Shift 09 (Defense/Dark Forest):**
- Machine: Added Guardian Agents (Gartner) - AI defending against AI, automation arms race
- Machine: Added Disinformation Security - protecting truth as IT product category
- Human: Strengthened Zero Trust Default with statistics (85% attacked, 73% can't detect)
- Gap: Added asymmetry details and verification cost analysis (near-zero cost vs $25.6M losses)

**Layer IV (Humanity):**
- Changed subtitle from "narrative, intimacy, truth" to "when machines shape meaning"
- Removed one sentence from caption about post-training

**Shift 10 (Narrative/Alignment):**
- Machine: Added System Cards, Constitutional Rules, Post-Training definition
- Machine: Added AI cultural bias and Regional Censorship (EU vs US vs China)
- Human: Complete rewrite with Prediction Markets (Polymarket $3.5B), Divergent Testing, Uncensored Model Demand
- Gap: Rewritten to focus on "what AI knows vs what AI will say" and reality fragmentation

**Shift 11 (Intimacy/Friends for Sale):**
- Machine: Moved Ubisoft NEO NPC to beginning, added engagement metrics details
- Machine: Expanded Programmable Identity (persona as code, AI writes your voice)
- Human: Added character.ai/replika/talkie stats at beginning
- Human: Added Empathy Paradox, epidemic of isolation, outsourcing emotional regulation
- Human: Expanded "performing the self" - exhaustion from synthetic personas
- Gap: Consolidated to remove duplication, kept core message about attention vs care

**Summary Pages:**
- Machines Summarized: Complete restructure by 4 layers with all 11 shifts
- Humans Summarized: Complete restructure by 4 layers with all 11 shifts

**Structure Changes:**
- Removed "call to agency" slide completely
- Lab Evidence slide: Added link styling to artifacts (ivanov, intention, spiridonov) with TODO for URLs
- Final slide: Removed Sergei Khabarov, added full name "Anca Stavenski"

**Total slides:** 36 (down from 37)

---

## 2026-01-13 23:18 - FINAL BACKUP перед перестановкой слайдов

**Backup location:** `../_backups/aim-report-FINAL-before-reorder_2026-01-13_23-18/`

**Состояние:**
- Research и Industry Signals добавлены для всех 10 evidence слайдов
- Fallback парсинг в Slide.tsx работает корректно
- Industry Signals regex исправлен: `/\*\*Industry Signals:\*\*\s*(.+?)(?:\s+source:|$)/s`
- Локальная версия идентична GitHub Pages по объему контента
- Все evidence слайды отображают: Key Data, Research, Industry Signals, Sources

**Следующий шаг:** Полная перестановка слайдов
