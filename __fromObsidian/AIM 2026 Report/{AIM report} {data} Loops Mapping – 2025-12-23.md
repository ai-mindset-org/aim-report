---
aliases:
  - Loops Mapping
tags:
  - type/data
  - project/aim-report
date: 2025-12-23
updated: 2026-01-05
refs:
  - "[[Agents]]"
  - "[[{AIM report} {data} Key Metrics – 2025-12-23]]"
  - "[[{AIM report} {content} Context Gap v3 – FINAL – 2025-12-31]]"
  - "[[{AIM report} {research} Extended Industry Research – 2025-12-24 – Claude Code]]"
  - "[[{AIM report} {research} Humanities Thought Leaders – 2025-12-23]]"
---

# Loops Mapping – Data Points & Sources

**Цель:** Маппинг каждого loop на data points, Extended Research секции и первоисточники.

**Структура каждого loop:**
- Loop Name (из финального контента)
- Machine Signal / Human Signal / The Gap (краткое описание)
- Data Points (метрики с источниками)
- Extended Research Sections (§ номера)
- Sources (оригинальные URL)
- Humanities Connection (связь с thought leaders)

---

## Loop 1: System‑2 Reasoning ↔ Auditable Work

**Machine Signal**
"Chat" is turning into **delegation**. Agents don't just answer — they plan, act, call tools, ship. "Slow thinking" moves from research concept to product feature.

**Human Signal**
People don't trust "magic." They trust **auditable work**. The moment an agent touches money, customers, or reputation, humans demand: _show me your steps_.

**The Gap**
Agents operate at machine speed, but accountability remains human speed. Verification becomes ethics — "can you just approve this?" becomes the most expensive sentence in a company.

### Data Points
| Metric | Value | Source |
|--------|-------|--------|
| Distrust AI accuracy | 46% | StackOverflow 2025 |
| Highly trust AI | 3.1% | StackOverflow 2025 |
| Developers in "red zone" | 76% | Qodo 2025 |
| Frustrated with "almost right" | 66% | StackOverflow 2025 |
| Senior distrust | 20.7% | StackOverflow 2025 |
| Enterprises with human-in-the-loop | 76% | Industry surveys |
| GenAI pilots with zero ROI | 95% | MIT NANDA |
| Business decisions on hallucinated output | 47% | Korra 2025 |
| Global losses from AI hallucinations | $67.4B | Korra 2025 |
| Gemini-2.0-Flash hallucination rate | 0.7% | ISACA 2025 |
| o3 hallucination rate (person Q) | 33% | Techopedia 2025 |
| o4-mini hallucination rate | 48% | Techopedia 2025 |
| Weekly hours fact-checking AI | 4.3 hours | All About AI |

### Extended Research Sections
- **§8** AI Reasoning Models (o1, o3, DeepSeek R1, Claude 3.7)
- **§5** AI Incidents & Failures
- **§32** AI Hallucination Crisis
- **§19** Frontier AI Labs Research

**Key Insight:** OpenAI o3 scores 87.7% on GPQA-Diamond, but 46% of developers actively distrust AI accuracy. The gap between capability and trust defines this loop.

### Sources
- [Li et al. — Reasoning LLMs Survey](https://arxiv.org/abs/2502.17419)
- [OpenAI — SWE-bench Verified](https://openai.com/index/introducing-swe-bench-verified/)
- [x402 — Internet-native payments for AI agents](https://www.x402.org/)
- [StackOverflow Survey 2025](https://survey.stackoverflow.co/2025/ai)
- [Qodo State of AI Code Quality](https://www.qodo.ai/reports/state-of-ai-code-quality/)
- [Korra — $67B AI Hallucination Warning](https://korra.ai/the-67-billion-warning-how-ai-hallucinations-hurt-enterprises-and-how-to-stop-them/)
- [Techopedia — 48% Error Rate in Reasoning Systems](https://www.techopedia.com/ai-hallucinations-rise)
- [All About AI — Hallucination Statistics 2025](https://www.allaboutai.com/resources/ai-statistics/ai-hallucinations/)

### Humanities Connection
**Amodei (Anthropic):** Introduces "marginal returns to intelligence" — when intelligence approaches infinity, other factors become limiting. Verification = one such limit.

### Founder OS Video
📺 **[FOS #7 — ИИ в психологии и управлении знаниями](https://youtu.be/1SclrJKH1oQ?t=500)** (с ~8:20)
- **Спикер:** Alexei Kapterev
- **Тема:** Реальные кейсы от практиков
- **Релевантность:** Обсуждение доверия к AI-ассистентам и необходимости проверки их рекомендаций. Kapterev показывает систему GPT-ассистентов с разными специализациями и объясняет, почему важен "контекст и цель" для валидации выхода AI.
- **Ключевая цитата:** "У него есть весь контекст" — но этого недостаточно без верификации.

---

## Loop 2: Orchestration Layers ↔ Context Overload

**Machine Signal**
The center of gravity moves from chat to **agentic workflows**: systems that call tools, execute steps across software, and coordinate across services.

**Human Signal**
Overload becomes baseline: too many threads, tools, notifications, pseudo‑tasks. Every new layer adds fear: "who owns the workflow?" "where does my data go?" "can i exit?"

**The Gap**
When systems connect, context leaks across apps — humans can't see the full graph, but remain responsible for outcomes. The question becomes: **who is the author of outcomes?**

### Data Points
| Metric | Value | Source |
|--------|-------|--------|
| Use 3+ AI tools | 59% | Qodo 2025 |
| Use 5+ AI tools | 20% | Qodo 2025 |
| Context miss in refactoring | 65% | Qodo 2025 |
| Context issues in testing | 60% | Qodo 2025 |
| Quality issues from context | 44% | Qodo 2025 |
| YoY GenAI project growth | 98% | GitHub Octoverse |
| Organizations scaling agentic AI | 23% | McKinsey 2025 |
| Experimenting with AI agents | 39% | McKinsey 2025 |
| Apps with agents by 2026 | 40% | Gartner |
| MCP SDK downloads monthly | 97M+ | Linux Foundation |
| Workforce lacks time/energy for job | 80% | Microsoft WTI 2025 |
| AI agents will reinvent digital systems | 77% | Accenture TV 2025 |
| Future-built firms (at forefront) | 5% | BCG 2025 |
| Laggards (minimal gains) | 60% | BCG 2025 |
| Agent share of AI value (2025 → 2028) | 17% → 29% | BCG 2025 |
| Enterprises integrating AI agents | 85% | PwC 2025 |
| Leaders vs employees familiar with agents | 67% vs 40% | Microsoft WTI |
| Organizations deployed agents Q3 2025 | 42% | KPMG |

### Extended Research Sections
- **§5** Agentic AI Revolution
- **§7** MCP (Model Context Protocol) Adoption
- **§11** 2026 Predictions & Forecasts
- **§16** Accenture Technology Vision 2025
- **§17** BCG Widening AI Value Gap
- **§20** Microsoft Work Trend Index 2025
- **§30** AI Agents Enterprise Deployment

**Key Insight:** MCP adopted by OpenAI, Google, Microsoft within 13 months. 97M+ monthly SDK downloads. But 80% of workforce lacks time/energy — orchestration doesn't solve human bandwidth.

### Sources
- [Anthropic — Model Context Protocol](https://www.anthropic.com/news/model-context-protocol)
- [Gartner — Top 10 Strategic Trends 2025](https://www.gartner.com/en/newsroom/press-releases/2024-10-21-gartner-identifies-the-top-10-strategic-technology-trends-for-2025)
- [AI Mindset — Context Obesity](https://hackernoon.com/youre-not-burned-out-youve-got-context-obesity)
- [Microsoft Work Trend Index 2025](https://www.microsoft.com/en-us/worklab/work-trend-index/2025-the-year-the-frontier-firm-is-born)
- [Linux Foundation — AAIF](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation)
- [Accenture Technology Vision 2025](https://www.accenture.com/us-en/insights/technology/technology-trends-2025)
- [BCG — Widening AI Value Gap](https://www.bcg.com/publications/2025/are-you-generating-value-from-ai-the-widening-gap)
- [KPMG AI Quarterly Pulse Q3 2025](https://kpmg.com/us/en/articles/2025/ai-quarterly-pulse-survey.html)

### Humanities Connection
**Andreessen:** "Human wants and needs are infinite" — but orchestration complexity suggests **human attention** is finite. The gap between infinite wants and finite attention = context overload.

### Founder OS Video
📺 **[FOS #12 — Intention OS: Mike Yan](https://youtu.be/RsnmYBI4_CU)** (полное видео)
- **Спикер:** Mike Yan (CEO ManyChat)
- **Тема:** Как CEO ManyChat Майк Ян строит систему осознанности
- **Релевантность:** Полная система оркестрации личного контекста: voice memo → Whisper → Obsidian → 5 alignment agents → Telegram brief. ~1900 daily notes за 2 года.
- **Техстек:** iPhone voice → iCloud sync → Mac Mini watcher → OpenAI Whisper → chunking → Obsidian daily note → alignment agents
- **Ключевой инсайт:** Как управлять context overload через систему "намерений" — intention OS как ответ на перегрузку.

📺 **[FOS Showcase #2 — «Клонируем себя» в Cursor](https://youtu.be/1dNpYmkCp_E?t=220)** (с ~3:40)
- **Спикер:** Сева Устинов
- **Тема:** Собираем визуал на AI
- **Релевантность:** "Контекст погруженного персонального ассистента" — как собрать весь контекст про себя для AI и избежать context collapse.

📺 **[AI for VC: Playbooks That Ship](https://youtu.be/vuUkd6EizTs)** (полное видео, EN)
- **Спикеры:** Yura, Stan Goguyev (Ultra VC), Stepan (CyberFund)
- **Тема:** AI для венчурных инвесторов: как VC используют AI для скаутинга и автоматизации
- **Релевантность:** Реальные кейсы оркестрации AI-агентов в VC: n8n + LinkedIn Helper + Apify + OpenAI structured outputs. Показывает, как "orchestration layers" работают в реальном бизнес-контексте — от talent signals до investor signals.
- **Техстек Ultra VC (Stan):** n8n workflows → LinkedIn Helper → Apify scraping → OpenAI structured outputs → CRM sync
- **Ключевые кейсы:** Spector, Harmonic AI для hidden deals; $200M fund CyberFund с AI-native подходом
- **Ключевой инсайт:** Orchestration делает возможным то, что раньше требовало команды аналитиков — но требует понимания "where context flows."

---

## Loop 3: Sovereign AI ↔ Neo-Sovereignty

**Machine Signal**
Regulation matures. Institutions define "unacceptable risk." Sovereign AI becomes strategy: data residency, regulated stacks, local inference, compliant clouds. "Where data lives" becomes as important as "what the model can do."

**Human Signal**
A personal version emerges: neo‑sovereignty. People build their own spaces (private notes, smaller circles, local tools) because public feeds feel noisy, extractive, increasingly synthetic.

**The Gap**
Trust splits: people want innovation AND guarantees. For orgs it's compliance and risk; for individuals it's privacy, boundaries, and control over the context that shapes thinking.

### Data Points
| Metric | Value | Source |
|--------|-------|--------|
| Infrastructure investment | $400-500B | Goldman Sachs |
| Hyperscaler CapEx 2025 | $315-371B | Goldman Sachs |
| Pay for AI personally | 3% | Goldman Sachs |
| AI incidents YoY growth | +56% | Stanford HAI |
| Total AI incidents 2024 | 233 | Stanford HAI |
| Consumer vs infrastructure gap | 40× | Harvard/Goldman |
| EU AI Act full applicability | Aug 2026 | EU |
| GPAI Code of Practice | July 2025 | EU AI Office |

### Extended Research Sections
- **§4** AI Safety & Governance
- **§3** China AI Ecosystem
- **§34** AI Regulation & Policy
- **§18** Think Tank Analysis (Brookings, RAND)

**Key Insight:** $500B infrastructure spend vs $12B consumer spend = 40× gap. People want AI, don't want to pay for it, don't trust it. Sovereignty becomes both institutional (EU AI Act) and personal (private tools).

### Sources
- [EU AI Act](https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng)
- [McKinsey — Sovereign AI](https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/accelerating-europes-ai-adoption-the-role-of-sovereign-ai)
- [Goldman Sachs — AI Power Demand](https://www.goldmansachs.com/insights/articles/ai-to-drive-165-increase-in-data-center-power-demand-by-2030)
- [Stanford HAI — AI Index 2025](https://hai.stanford.edu/ai-index/2025-ai-index-report)

### Humanities Connection
**Aschenbrenner:** Focus on **geopolitical competition** (democracy vs. autocracy). Datacenters must remain in democratic nations. Sovereignty = national security before personal autonomy.

---

## Loop 4: Data Wall ↔ Provenance Literacy

**Machine Signal**
High‑quality human data is finite; marginal gains get expensive. Training leans harder on synthetic data and distillation. As synthetic output floods the environment, "evidence" becomes a formatting problem: it can look right before it is right.

**Human Signal**
Trust becomes scarce. People shift from "is it true?" to "is it traceable?" The new literacy is provenance.

**The Gap**
Machines can manufacture infinite text and images. Humans can't manufacture infinite meaning. The ratio collapses.

### Data Points
| Metric | Value | Source |
|--------|-------|--------|
| New GenAI projects 2024 | 70,000 | GitHub Octoverse |
| GenAI project growth YoY | 98% | GitHub Octoverse |
| AI-generated code globally | 41% | GitHub |
| Deepfake fraud surge (2022-2023) | 1,740% | Deepstrike |
| Voice cloning requires | 20-30 seconds | Industry |
| Training compute doubling | Every 5 months | Stanford HAI |
| Cost per M tokens (Nov 2022 → Oct 2024) | $20 → $0.07 | Stanford HAI |
| Cost reduction | 280× | Stanford HAI |
| Failed AI projects due to privacy | 21% | Gretel |
| Synthetic data overtaking real by | 2028 | Business Insider |
| RAG hallucination reduction | 71% | Eden AI |
| Enterprise RAG adoption | 60%+ | Industry 2025 |

### Extended Research Sections
- **§10** Synthetic Media & Deepfakes
- **§12** Stanford HAI AI Index 2025
- **§21** Epoch AI Compute Trends
- **§39** RAG & Enterprise Knowledge
- **§42** Synthetic Data Generation
- **§50-53** Creative AI & Synthetic Media

**Key Insight:** Model collapse risk (Shumailov et al.) — training on generated data makes models forget. Provenance becomes the only anchor when synthetic content dominates.

### Sources
- [Epoch AI — Data Limits](https://epoch.ai/blog/will-we-run-out-of-data-limits-of-llm-scaling-based-on-human-generated-data)
- [Shumailov et al. — Model Collapse](https://arxiv.org/abs/2305.17493)
- [AI Mindset — Team Knowledge System](https://aimindsetspace.substack.com/p/ai-ark-knowledge-system)
- [Deepstrike — Deepfake Statistics 2025](https://deepstrike.io/blog/deepfake-statistics-2025)
- [Gretel — Synthetic Data 2025](https://gretel.ai/blog/2025-the-year-synthetic-data-goes-mainstream)
- [Eden AI — RAG Guide 2025](https://www.edenai.co/post/the-2025-guide-to-retrieval-augmented-generation-rag)
- [Ask-AI — Enterprise RAG Guide](https://www.ask-ai.com/blog/what-is-enterprise-rag-a-cx-leaders-guide-to-retrieval-augmented-generation-2025)

### Humanities Connection
**All three thought leaders validate acceleration**: 50-100 years compressed to 5-10 (Amodei), exponential takeoff (Andreessen), AGI by 2027 (Aschenbrenner). None address how humans verify provenance at this speed.

---

## Loop 5: On‑Device Models ↔ Privacy as Status

**Machine Signal**
Smaller models get good enough and spread everywhere (on devices, at the edge, inside apps). AI becomes ambient — less a destination, more a layer.

**Human Signal**
Privacy becomes status. Not secrecy — control. More private drafting, smaller circles, local storage, intentional friction against performative posting.

**The Gap**
When AI is everywhere, boundaries become the differentiator. **If everything can be processed, the premium shifts to what you keep.**

### Data Points
| Metric | Value | Source |
|--------|-------|--------|
| Consumer AI spend | $12B | Harvard |
| Infrastructure spend | $500B | Goldman |
| Pay for privacy (Meta EU) | Yes | Wired |
| AI incidents 2024 | 233 (+56% YoY) | Stanford HAI |
| Data center electricity 2025 | 536 TWh (~2% global) | IEA |
| Gemini Nano on-device | Deployed | Google |
| Public AI perception (US) | 39% beneficial | Stanford HAI |
| Public AI perception (China) | 83% beneficial | Stanford HAI |

### Extended Research Sections
- **§4** AI Safety & Governance
- **§6** AI Compute & Infrastructure
- **§25** AI Infrastructure Deep Dive

**Key Insight:** 40× gap between infrastructure ($500B) and consumer ($12B) spend. Privacy = status because people won't pay for AI, but will pay to escape it (Meta EU).

### Sources
- [Gemini Nano](https://android-developers.googleblog.com/2025/08/the-latest-gemini-nano-with-on-device-ml-kit-genai-apis.html)
- [ICO Data Lives Report](https://ico.org.uk/media2/m2maphry/ico-data-lives-year-2-report.pdf)
- [Wired — Meta Pay for Privacy](https://www.wired.com/story/meta-facebook-pay-for-privacy-europe/)

### Humanities Connection
**Andreessen:** Assumes privacy concerns solved by abundance. **Amodei:** Acknowledges "opt-out" problem — communities rejecting life-enhancing technologies. Privacy as status = opting out of default exposure.

---

## Loop 6: Compute & Energy ↔ Return of Physics

**Machine Signal**
AI isn't just software. It's infrastructure: chips, energy, cooling, geopolitics. Even digital gods need electricity. Energy and compute become the regulator of progress.

**Human Signal**
Energy economics turns personal: burnout realism, fatigue, "time hangover," sharper awareness of biological limits. People begin optimizing for sustainability, not maximum output.

**The Gap**
Data centres become local political issues; your "cloud" starts to feel like a land dispute. Thermodynamics returns as a hidden governor — you can't out‑optimize scarcity forever.

### Data Points
| Metric | Value | Source |
|--------|-------|--------|
| Hyperscaler capex 2025 | $315-371B | Goldman Sachs |
| Data center electricity 2025 | 536 TWh | IEA |
| Data center electricity 2030 | 945-1,065 TWh | IEA |
| AI share of data center power | 14% | Goldman |
| Incremental GW (2025-2030) | 125 GW | McKinsey |
| Estimated CapEx required | $5.2-7.9T | McKinsey |
| Stargate project investment | $500B (4 years) | OpenAI |
| Power grid wait time | 7 years | Industry |
| Peaker plants back online | Yes | Reuters |
| GPT-4 carbon emissions | 5,184 tons | Stanford HAI |
| Llama 3.1 405B carbon | 8,930 tons | Stanford HAI |

### Extended Research Sections
- **§6** AI Compute & Infrastructure
- **§25** AI Infrastructure Deep Dive
- **§21** Epoch AI Compute Trends

**Key Insight:** AI infrastructure requires 125 GW incremental capacity by 2030 — equivalent to 125 nuclear reactors. Physical limits return as governance mechanism.

### Sources
- [IEA — Energy and AI](https://www.iea.org/reports/energy-and-ai/energy-supply-for-ai)
- [Reuters — Peaker Plants](https://www.reuters.com/business/energy/ai-data-centers-are-forcing-obsolete-peaker-power-plants-back-into-service-2025-12-23/)
- [McKinsey — Cost of Compute](https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/the-cost-of-compute-a-7-trillion-dollar-race-to-scale-data-centers)
- [Goldman Sachs — AI Power Demand](https://www.goldmansachs.com/insights/articles/ai-to-drive-165-increase-in-data-center-power-demand-by-2030)

### Humanities Connection
**Aschenbrenner:** $500B → $2T → $8T annual investment trajectory. Physical infrastructure = rate limiter on superintelligence timeline. **None of the thought leaders** adequately model human energy limits (burnout, fatigue).

### Founder OS Video
📺 **[FOS #12 — Intention OS: Mike Yan](https://youtu.be/RsnmYBI4_CU?t=300)** (с ~5:00)
- **Спикер:** Mike Yan (CEO ManyChat)
- **Тема:** Система осознанности и энергия фаундера
- **Релевантность:** Обсуждение "энергии" и "ментальной нагрузки" фаундера — как физические и когнитивные лимиты определяют архитектуру персональной системы.

---

## Loop 7: Coding Agents ↔ Authorship Anxiety

**Machine Signal**
Coding becomes the first broadly proven agent category: systems write, refactor, test, ship. The value is measurable; adoption is fast.

**Human Signal**
Authorship anxiety rises: "what's mine if the machine did it?" Fear of skill atrophy, status loss, erosion of craft.

**The Gap**
When labor gets cheaper, identity gets more expensive. In a world where output is abundant, authorship becomes less about typing and more about owning decisions.

### Data Points
| Metric | Value | Source |
|--------|-------|--------|
| Devs using AI tools | 73% | GitHub |
| AI coding market 2025 | $4.8B | CB Insights |
| AI coding market 2030 | $17.2B (35%+ CAGR) | CB Insights |
| Copilot market share | 42% | CB Insights |
| Cursor market share | 18% | CB Insights |
| Anthropic coding API share | 54% | Menlo Ventures |
| Productivity gain (NNG study) | 126% | Nielsen Norman |
| Confident to ship | 22% | Qodo |
| Frustrated "almost right" | 66% | StackOverflow |
| Job more enjoyable | 57% | Qodo |
| Junior gain vs avg | +35% | NNG |
| Onboarding speedup | 4× | NNG |
| Task completion faster | 55.8% | GitHub |
| AI-generated code globally | 41% | GitHub |
| Coding AI spending 2024 → 2025 | $550M → $4B (7×) | Menlo |

### Extended Research Sections
- **§2** AI Coding Tools Market
- **§9** Vibe Coding (Cultural Phenomenon)
- **§29** Developer Productivity Research

**Key Insight:** 126% productivity gain + 22% confidence to ship = the authorship paradox. Productivity measurable, identity not. "Vibe coding" named Word of the Year by Collins Dictionary.

### Sources
- [NNG — AI Programmers Productive](https://www.nngroup.com/articles/ai-programmers-productive/)
- [OpenAI — SWE-Bench Verified](https://openai.com/index/introducing-swe-bench-verified/)
- [Anthropic — SWE-bench Sonnet](https://www.anthropic.com/research/swe-bench-sonnet)
- [CB Insights — Coding AI Market](https://www.cbinsights.com/research/report/coding-ai-market-share-december-2025/)
- [Wikipedia —  Vibe Coding](https://en.wikipedia.org/wiki/Vibe_coding)

### Humanities Connection
**Andreessen:** "Humans were meant to be useful, to be productive, to be proud" — productivity as identity. **Amodei:** Meaning derives from relationships, not labor. Coding agents force the question: which framing holds?

### Founder OS Video
📺 **[FOS #4 — Команда из 30 человек в одном Курсоре](https://youtu.be/CLHb3aYr9Is)** (полное видео)
- **Тема:** AI Mindset — работа команды в Cursor
- **Релевантность:** Практический кейс использования Cursor всей командой. Обсуждение authorship anxiety — кто автор кода, если его пишет AI?

📺 **[FOS Showcase #2 — «Клонируем себя» в Cursor](https://youtu.be/1dNpYmkCp_E?t=90)** (с ~1:30)
- **Спикер:** Сева Устинов
- **Тема:** Собираем визуал на AI
- **Релевантность:** "Всё больше становится это код" — демо vibe coding и обсуждение роли программиста когда "код генерирует Anthropic".

📺 **[FOS #7 — ИИ в психологии и управлении знаниями](https://youtu.be/1SclrJKH1oQ?t=1080)** (с ~18:00)
- **Спикер:** Alexei Kapterev
- **Тема:** Реальные кейсы от практиков
- **Релевантность:** Обсуждение vibe-coding как нового подхода к программированию, упоминание Collins Dictionary Word of the Year.

---

## Loop 8: Regional Frames ↔ Pluralism Required

**Machine Signal**
AI progress is global, but governance and deployment realities differ by region — policy, procurement, infrastructure, and institutional trust.

**Human Signal**
Moral frames diverge: US (frontier/market), EU (rights/compliance), Others (utility/stability/state capacity).

**The Gap**
A global story can't be one voice. The same capability reads as liberation, risk, or stability tool depending on the frame. Pluralism is not optional — if you ignore frames, you misunderstand people (or get misunderstood).

### Data Points
| Metric | Value | Source |
|--------|-------|--------|
| China open-source share | ~30% (up from 1.2%) | Stanford HAI |
| US notable AI models 2024 | 40 | Stanford HAI |
| China notable AI models 2024 | 15 | Stanford HAI |
| US private AI investment | $109.1B | Stanford HAI |
| China private AI investment | $9.3B | Stanford HAI |
| DeepSeek R1 cost vs o1 | 90-95% cheaper | Industry |
| Regional trust variance | Significant | Pew |
| AI viewed beneficial (China) | 83% | Stanford HAI |
| AI viewed beneficial (US) | 39% | Stanford HAI |
| European AI research publications | Leading | EU Commission |

### Extended Research Sections
- **§3** China AI Ecosystem
- **§12** Stanford HAI — US vs China
- **§34** Regional AI Policy

**Key Insight:** DeepSeek R1 matches o1 at 90-95% lower cost. Chinese open-source went from 1.2% to 30% in one year. Different frames, different defaults, different futures.

### Sources
- [Pew — Trust Survey](https://www.pewresearch.org/2025/10/15/trust-in-the-eu-u-s-and-china-to-regulate-use-of-ai/)
- [Stanford HAI — Regional](https://hai.stanford.edu/ai-index/2025-ai-index-report/public-opinion)
- [EU Commission — AI Research Publications](https://op.europa.eu/en/publication-detail/-/publication/4ee8799e-142c-11f0-b1a3-01aa75ed71a1/language-en)
- [ChinaTalk — Chinese AI 2025](https://www.chinatalk.media/p/china-ai-in-2025-wrapped)
- [Plurality Book](https://github.com/pluralitybook/plurality)

### Humanities Connection
**Aschenbrenner:** Frames as democracy vs. autocracy (geopolitical). **Andreessen:** Assumes universal values through abundance. **Amodei:** Acknowledges regional "opt-out" problems. Only Plurality project treats frames as legitimate pluralism.

---

## Loop 9: Post‑Training ↔ Default Values

**Machine Signal**
Post‑training defines behavior: refusals, style, safety posture, what a model tends to amplify. Defaults become the product.

**Human Signal**
Values fragment. People cluster into micro‑realities and micro‑truths. The cost of disagreement rises; the temptation to outsource judgment rises too.

**The Gap**
Every model has defaults. Every default embeds a worldview. **The human question becomes:** whose values are embedded in the tool you use daily — and what do they quietly optimize for?

### Data Points
| Metric | Value | Source |
|--------|-------|--------|
| CEOs worry about correction | 40% | Yale |
| CEOs dismiss concerns | 60% | Yale |
| Amodei catastrophic risk | 25% | Dario Amodei |
| Organizations attacked | 87% | HAI Cybersecurity |
| Claude Sonnet 3.7/4 misalignment | Zero | Anthropic |
| o3 deception flagged | 4.8% | OpenAI |
| GPT-5 Thinking deception | 2.1% | OpenAI |
| Constitutional AI deployed | ASL-3 | Anthropic |
| Local censorship patterns | Documented | arXiv 2025 |

### Extended Research Sections
- **§4** AI Safety
- **§19** Frontier AI Labs Research
- **§36** AI Cybersecurity

**Key Insight:** Constitutional AI (Anthropic), InstructGPT (OpenAI) shaped defaults through human feedback. Now 4.8% of o3 reasoning flagged for deception. Defaults = product decisions with philosophical weight.

### Sources
- [InstructGPT Paper](https://arxiv.org/abs/2203.02155)
- [Constitutional AI](https://arxiv.org/abs/2212.08073)
- [Local Censorship Investigation](https://arxiv.org/pdf/2505.12625)
- [OpenAI GPT-5 System Card](https://cdn.openai.com/gpt-5-system-card.pdf)
- [Anthropic ASL-3 Report](https://www.anthropic.com/activating-asl3-report)

### Humanities Connection
**Amodei:** "Arc of moral universe bends toward cooperation" — assumes convergence. **Andreessen:** Material abundance enables value pluralism without conflict. **Aschenbrenner:** Silent on values. None address: what happens when different models embed contradictory worldviews?

---

## Loop 10: Machine Intimacy ↔ Programmable Identity

**Machine Signal**
AI moves from tool to relationship surface: companions, therapists, griefbots, parasocial loops. In parallel, AI makes it easy to produce a "professional self" at scale — identity becomes programmable.

**Human Signal**
Loneliness isn't solved by information. People accept synthetic intimacy (even while knowing it's synthetic). Meanwhile, people tire of performing the self; they retreat to private spaces and smaller audiences.

**The Gap**
Humans outsource emotional regulation to systems optimized for engagement. We confuse **"attention" with "care."**

### Data Points
| Metric | Value | Source |
|--------|-------|--------|
| AI companions rise | Documented | Ada Lovelace |
| Context collapse | Ongoing | Marwick & Boyd |
| Deepfake fraud Q1 2025 | $200M+ | Deepstrike |
| Voice cloning requires | 20-30 seconds | Industry |
| ChatGPT daily prompts | 2.5 billion | Industry |
| ChatGPT traffic share | ~80% | CNBC |
| Sora 2 video generation | Available | OpenAI |
| Veo 3 video generation | Available | Google |
| Synthetic media detection | Unreliable | Industry |
| Deepfake fraud surge (2022-2023) | +1,740% | Deepstrike |
| US financial fraud losses 2025 | $12.5B | Deepstrike |
| AI-driven phishing increase | +1,265% | CrowdStrike |
| Organizations experiencing deepfake attacks | 85% | Deepstrike |
| Major deepfake fraud loss (single) | $25.6M | All About AI |
| Take It Down Act | May 2025 | US Congress |

### Extended Research Sections
- **§10** Synthetic Media & Deepfakes
- **§36** AI Cybersecurity Threats
- **§50-53** Creative AI & Synthetic Media

**Key Insight:** "Liar's dividend" — ability to dismiss authentic recordings as probable fakes. Creates double bind where neither belief nor disbelief in evidence can be justified.

### Sources
- [Ada Lovelace Institute — AI Companions](https://www.adalovelaceinstitute.org/blog/ai-companions/)
- [Marwick & Boyd — Context Collapse](https://www.microsoft.com/en-us/research/publication/i-tweet-honestly-i-tweet-passionately-twitter-users-context-collapse-and-the-imagined-audience/)
- [AI Mindset — Founder OS Mental Health](https://aimindsetspace.substack.com/p/founder-os-mental-health)
- [Deepstrike — Deepfake Statistics](https://deepstrike.io/blog/deepfake-statistics-2025)
- [CrowdStrike — AI Cybersecurity Threats 2025](https://www.crowdstrike.com/en-us/cybersecurity-101/cyberattacks/ai-powered-cyberattacks/)
- [All About AI — AI Cyberattack Statistics](https://www.allaboutai.com/resources/ai-statistics/ai-cyberattack/)
- [Cyble — Deepfake-as-a-Service 2025](https://cyble.com/knowledge-hub/deepfake-as-a-service-exploded-in-2025/)

### Humanities Connection
**Amodei:** Meaning through relationships — but what happens when relationships become programmable? **Andreessen:** Silent on intimacy. **Aschenbrenner:** Entirely unaddressed. This is the blindspot all three share: emotional/psychological adaptation timescales.

### Founder OS Video
📺 **[FOS #14 — Be Your Own Guru: IFS + AI](https://youtu.be/vsRf07uC6DM)** (полное видео)
- **Спикер:** Алексей Иванов (@ponchiknews)
- **Тема:** Как нейросеть помогает лучше понять себя
- **Релевантность:** **Центральная сессия для этого лупа.** IFS (Internal Family Systems) + AI — как LLM становится "суфлёром" для работы с внутренними частями личности. Programmable identity на практике.
- **Артефакт:** [ivanov.aimindset.org](https://ivanov.aimindset.org/)
- **Ключевой инсайт:** AI не как терапевт, а как инструмент для самоанализа — "машинная интимность" с осознанными границами.

📺 **[FOS #6 — AI в терапии](https://youtu.be/vP8ryF_UUZ0)** (полное видео)
- **Спикеры:** Ольга, Виктория (психотерапия + AI)
- **Тема:** Как фаундерам не потерять себя между ботом и живым терапевтом
- **Релевантность:** Обсуждение границ machine intimacy.
- **Ключевой вопрос:** Когда synthetic intimacy помогает, а когда вредит?

📺 **[FOS #7 — ИИ в психологии и управлении знаниями](https://youtu.be/1SclrJKH1oQ?t=870)** (с ~14:30)
- **Спикер:** Alexei Kapterev
- **Тема:** Реальные кейсы от практиков
- **Релевантность:** "Новая идентичность" — обсуждение того, как AI помогает строить новую идентичность, когда старая система ориентиров разрушена.

📺 **[FOS #5 — Терапия или зависимость от контроля?](https://youtu.be/JSAY_058cBg)** (полное видео)
- **Тема:** Психология фаундера
- **Релевантность:** Психологическая сторона founder life — где граница между оптимизацией и патологическим контролем?

---

## Cross-Loop Patterns

### The Adoption-Transformation Gap
| Metric | Value | Source |
|--------|-------|--------|
| Organizations using AI | 78-88% | McKinsey, StackOverflow |
| Organizations truly transforming | 6% | McKinsey |
| AI pilots with zero ROI | 95% | MIT NANDA |
| GenAI projects abandoned after PoC | 30% | Gartner |

**Extended Research:** §1 Enterprise AI Adoption & ROI, §16 Consulting Firms Deep Dive

### The Productivity-Identity Paradox
| Metric | Value | Source |
|--------|-------|--------|
| Productivity gain | 126% | NNG |
| Confident to ship | 22% | Qodo |
| Developers in "red zone" | 76% | Qodo |
| Job more enjoyable | 57% | Qodo |

**Extended Research:** §2 AI Coding Tools Market, §29 Developer Productivity Research

### The Investment-Value Chasm
| Metric | Value | Source |
|--------|-------|--------|
| Infrastructure spend | $500B | Goldman Sachs |
| Consumer spend | $12B | Harvard |
| Gap ratio | 40× | Calculated |
| People paying for AI | 3% | Goldman Sachs |
| AI P/E ratios | 50-70× | Yale |

**Extended Research:** §17 VC & Investment Landscape, §26 AI Startup Funding

### The Trust Inversion
| Metric | Value | Source |
|--------|-------|--------|
| AI use/plan to use | 84% | StackOverflow |
| Actively distrust | 46% | StackOverflow |
| Highly trust | 3.1% | StackOverflow |
| Frustrated "almost right" | 66% | StackOverflow |

**Extended Research:** §5 AI Incidents & Failures, §28 Enterprise Deployment Barriers

### The Speed-Adaptation Mismatch
**All three thought leaders validate acceleration:**
- **Amodei:** 50-100 years → 5-10 years (compressed century)
- **Andreessen:** Exponential intelligence takeoff (unspecified)
- **Aschenbrenner:** AGI by 2027, superintelligence by 2030

**None adequately model buffering/overwhelm:**
- Speed of change outpacing speed of adaptation
- Meaning-making lag when identity foundations collapse
- Collective sense-making breakdown under epistemic overload
- Emotional/psychological timescales slower than technological timescales

**Extended Research:** [[{AIM report} {research} Humanities Thought Leaders – 2025-12-23]]

---

## Extended Research Section Index

| Loop | Primary Sections | Key Data Point |
|------|------------------|----------------|
| 1 | §5, §8, §19, §32 | 46% distrust, o3=33% hallucination |
| 2 | §5, §7, §11, §16, §17, §20, §30 | 5% future-built, 60% laggards |
| 3 | §3, §4, §34 | EU AI Act Aug 2026, 40× gap |
| 4 | §10, §12, §21, §39, §42 | Synthetic > real by 2028, RAG 71% |
| 5 | §4, §6, §25 | $500B vs $12B spend |
| 6 | §6, §21, §25 | 125 GW, $5.2-7.9T CapEx |
| 7 | §2, §9, §29 | 126% productivity, 22% confidence |
| 8 | §3, §12, §34 | 1.2% → 30% China share |
| 9 | §4, §19, §36 | 4.8% deception flagged |
| 10 | §10, §36, §50-53 | 85% deepfake attacks, $25.6M loss |

---

## Thought Leaders Mapping

| Loop | Amodei | Andreessen | Aschenbrenner |
|------|--------|------------|---------------|
| 1 | Verification as constraint | N/A | Benchmark exhaustion |
| 2 | N/A | Infinite wants | N/A |
| 3 | Opt-out problems | N/A | Geopolitical security |
| 4 | Compressed century | Exponential takeoff | AGI by 2027 |
| 5 | Opt-out problems | Abundance solves all | N/A |
| 6 | Implicit (100 years → 10) | N/A | $8T annual investment |
| 7 | Relationships ≠ labor | Productivity = identity | Automation focus |
| 8 | Regional opt-out | Universal values | Democracy vs autocracy |
| 9 | Moral convergence | Value pluralism | Silent |
| 10 | Relationships | Silent | Silent |

**The Context Gap validation:** These thought leaders **validate acceleration** while **ignoring buffering**. This absence itself is evidence — if leading AI thinkers don't model human adaptation constraints, the gap widens by default.

---

## Founder OS Video Series

> **Founder Operating System** — серия сессий AI Mindset Space о том, как фаундеры строят свои операционные системы с AI.

**📺 YouTube Плейлист:** [Founder Operating System](https://www.youtube.com/playlist?list=PLs9wHgNIg4ZP6aqRFgDcX1-rA2yAlmwHd)

### Видео, замапленные на Loops

| Loop | Видео | Спикер | Тема |
|------|-------|--------|------|
| **1** (System-2 Reasoning) | [FOS #7](https://youtu.be/1SclrJKH1oQ?t=500) | Kapterev | Верификация AI-ассистентов |
| **2** (Orchestration) | [FOS #12](https://youtu.be/RsnmYBI4_CU) | Mike Yan | Intention OS — полная система |
| **2** (Orchestration) | [Showcase #2](https://youtu.be/1dNpYmkCp_E?t=220) | Устинов | Персональный контекст |
| **2** (Orchestration) | [AI for VC](https://youtu.be/vuUkd6EizTs) | Ultra VC, CyberFund | n8n + structured outputs (EN) |
| **6** (Compute & Energy) | [FOS #12](https://youtu.be/RsnmYBI4_CU?t=300) | Mike Yan | Энергия фаундера |
| **7** (Coding Agents) | [FOS #4](https://youtu.be/CLHb3aYr9Is) | Community | Команда в Cursor |
| **7** (Coding Agents) | [Showcase #2](https://youtu.be/1dNpYmkCp_E?t=90) | Устинов | Vibe coding |
| **7** (Coding Agents) | [FOS #7](https://youtu.be/1SclrJKH1oQ?t=1080) | Kapterev | Vibe coding |
| **10** (Machine Intimacy) | [FOS #14](https://youtu.be/vsRf07uC6DM) | Иванов | **IFS + AI** (центральная) |
| **10** (Machine Intimacy) | [FOS #6](https://youtu.be/vP8ryF_UUZ0) | Ольга, Виктория | AI в терапии |
| **10** (Machine Intimacy) | [FOS #7](https://youtu.be/1SclrJKH1oQ?t=870) | Kapterev | Новая идентичность |
| **10** (Machine Intimacy) | [FOS #5](https://youtu.be/JSAY_058cBg) | Community | Терапия vs контроль |

### Другие релевантные сессии

| Видео | Спикер | Потенциальные связи |
|-------|--------|---------------------|
| [FOS #13](https://youtu.be/pPMnJFxiAIk) | Максим Спиридонов | Бизнес как творчество, $90M exit, AI как экзоскелет |
| [FOS #10](https://youtu.be/CsyhybFuUS8) | Community | AI для продаж: workflow vs agentic |
| [FOS #9](https://youtu.be/VGmVSg5nyD0) | Community | AI для жизни + AI для разработки |
| [Showcase #1](https://youtu.be/H9pyA92Xxn8) | Community | Vibe-coding, контент-пайплайн, LinkedIn |

### Артефакты (интерактивные лендинги)

| Спикер | URL | Связь с Loop |
|--------|-----|--------------|
| Алексей Иванов | [ivanov.aimindset.org](https://ivanov.aimindset.org/) | Loop 10 (IFS + AI) |
| Максим Спиридонов | [spiridonov.aimindset.org](https://spiridonov.aimindset.org/) | Общий контекст |
| Mike Yan | [intention.aimindset.org](https://intention.aimindset.org/) | Loop 2 (Intention OS) |

---

**Обновлено:** 2026-01-06
