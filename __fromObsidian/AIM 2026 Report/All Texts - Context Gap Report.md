# THE CONTEXT GAP — All Texts
## AIM Annual Report 2025

**Дата экспорта:** 2026-01-09  
**Версия:** v4 (Waves structure)

---

# INTRO (Slides 1-6)

## Slide 1 — Cover

**Title:** the context gap  
**Subtitle:** ai is accelerating. humans are buffering.  
**Caption:** a yearly reset artifact by ai mindset + community. a sovereignty reset for people running their own life.

---

## Slide 2 — A note from the team

**Title:** a note from the team  
**Subtitle:** we made this because 2025 didn't feel like a year.

**Content:**
- it felt like the year **context became expensive**.
- machines got faster at producing outputs.
- humans got slower at holding meaning, attention, and coherent direction.
- this isn't a "trends" deck.
- it's closer to a navigation tool.
- we're not trying to predict the future with confidence theater.
- we're trying to show **what changed**, **why it matters**, and **what the human layer can do** — so you can make better calls in 2026.

**Caption:** — ai mindset (research + labs team)

**Source:** [AI Mindset + Community](https://aimindset.org)

---

## Slide 3 — What this is (and isn't)

**Title:** what this is (and isn't)  
**Subtitle:** this is: a paired map.

**Left Column — you'll go through 10 waves:**
- **machine signal** (capability / deployment / economics)
- **human signal** (cognition / identity / culture)
- **the context gap** (where coordination breaks)

**Right Column — this isn't:**
- a hype deck
- a moral panic
- a consulting pdf that says nothing new

---

## Slide 4 — What we mean by "context gap"

**Title:** what we mean by "context gap"  
**Subtitle:** the distance between:

**Content:**
1. the context a system needs to act well
2. and
3. the context a human can actually hold without degrading decisions.

and the real losses:
- **time** (the non-renewable one)
- **money** (busy ≠ effective)
- **reputation** (sloppy decisions, missed nuance)

---

## Slide 5 — The thinkers & research lines behind the frame

**Title:** the thinkers & research lines behind the frame  
**Subtitle:** the backbone behind the 150+ papers, benchmarks, policy docs, and infra reports we reviewed.

**Content:**
- **attention & scarcity** (herbert simon): attention becomes the bottleneck.
- **cognition under load** (cognitive load / hci; kahneman as a metaphor): more inputs → worse judgment; "fast guess" vs "slow verify."
- **acceleration & identity** (toffler → rosa): speed reshapes norms and self.
- **tools as minds** (clark & chalmers): tools extend cognition; partnership beats replacement.
- **sovereignty as cultural tech** (hirschman; balaji): "exit" becomes everyday language for autonomy.

---

## Slide 6 — Our signal base (AI Mindset)

**Title:** our signal base (ai mindset)  
**Subtitle:** we trust signals — especially signals with a feedback loop.

**Stats:**
| Value | Label |
|-------|-------|
| 6 | labs |
| 200+ | graduates |
| 23+ | countries |
| 100+ | live hours |
| 67% | completion |

**Content:**
- we built this report as the yearly reset artifact for the ai mindset + community ecosystem — and then pressure-tested the ideas in practice.
- thanks: alex p, ray svitla, sergei khabarov, and anca for finishing this over the christmas holidays.

**Source:** [AI Mindset Labs](https://aimindset.org/ai-mindset-w25)

---

## Slide 7 — Section Divider

**Title:** 10 waves  
**Subtitle:** machines ↔ humans  
**Caption:** each wave builds on the previous — creating the context gap.

---

# CORE CHAIN (Waves 1-6)
## Strong causation: each wave enables the next

---

# WAVE 1: System-2 Reasoning

## Slide 8 — Wave 1 Intro

**Title:** wave 1: system-2 reasoning  
**Subtitle:** "chat" is turning into delegation.

---

## Slide 9 — Wave 1 Full

**Title:** wave 1: system-2 reasoning  
**Subtitle:** "chat" is turning into delegation.

### Machine Signal:
agents don't just answer — they do (plan, act, call tools, ship).
"slow thinking" moves from research concept to product feature: fewer obvious failures, more consistent multi-step output.

### Human Signal:
people don't trust "magic." they trust **auditable work**.
the moment an agent touches money, customers, or reputation, humans demand: _show me your steps_.

### The Context Gap:
agents operate at machine speed, but accountability remains human speed.
verification becomes ethics — "can you just approve this?" becomes the most expensive sentence in a company.

**Sources:**
- [Li et al. — Reasoning LLMs Survey](https://arxiv.org/abs/2502.17419)
- [OpenAI — SWE-Bench Verified](https://openai.com/index/introducing-swe-bench-verified/)
- [x402 — Internet-native payments for AI agents](https://www.x402.org/)

---

## Slide 10 — Wave 1 Evidence

**Title:** reasoning: the evidence

**Key Stats:**
| Value | Label | Source |
|-------|-------|--------|
| 71.7% | OpenAI o3 on SWE-bench Verified | OpenAI 2025 |
| 96.7% | o3 on AIME math benchmark | OpenAI 2025 |
| 90-95% | DeepSeek R1 cheaper than o1 | DeepSeek 2025 |

**Research Highlights:**
- **o3** achieves 2727 Codeforces rating vs R1 (2029) and o1 (1891)
- Claude 3.7 solves **21/28** puzzles vs DeepSeek R1 (18/28) – actual reasoning, not memorization
- "Slow thinking" moves from research concept to **product feature**

**Industry Data:** OpenAI o3, DeepSeek R1, Claude 3.7 Sonnet, Gemini 2.0

**Sources:**
- [Li et al. — Reasoning LLMs Survey](https://arxiv.org/abs/2502.17419)
- [OpenAI — SWE-Bench Verified](https://openai.com/index/introducing-swe-bench-verified/)
- [Vellum — Claude 3.7 vs o1 vs DeepSeek R1](https://www.vellum.ai/blog/claude-3-7-sonnet-vs-openai-o1-vs-deepseek-r1)
- [PromptLayer — o3 vs DeepSeek R1 Analysis](https://blog.promptlayer.com/openai-o3-vs-deepseek-r1-an-analysis-of-reasoning-models/)

---

## Slide 11 — Transition 1→2

**Title:** how this enables the next shift  
**Subtitle:** when agents can think, they can be connected.

**Content:**
system-2 reasoning (planning, tool use, multi-step execution) makes it possible to **chain agents into workflows**.

a single thinking agent is useful.
orchestrated agents become **infrastructure**.

---

# WAVE 2: Orchestration Layers

## Slide 12 — Wave 2 Intro

**Title:** wave 2: orchestration layers  
**Subtitle:** the center of gravity moves from chat to agentic workflows.

---

## Slide 13 — Wave 2 Full

**Title:** wave 2: orchestration layers  
**Subtitle:** the center of gravity moves from chat to agentic workflows.

### Machine Signal:
systems that call tools, execute steps across software, and coordinate across services.
the center of gravity moves from chat to **agentic workflows**.

### Human Signal:
overload becomes baseline: too many threads, tools, notifications, pseudo-tasks.
every new layer adds fear: "who owns the workflow?" "where does my data go?" "can i exit? ◡̈"

### The Context Gap:
when systems connect, context leaks across apps — humans can't see the full graph, but remain responsible for outcomes.
the question becomes: **who is the author of outcomes?**

**Sources:**
- [Anthropic — Model Context Protocol (MCP)](https://www.anthropic.com/news/model-context-protocol)
- [Gartner — Top 10 Strategic Technology Trends 2025](https://www.gartner.com/en/newsroom/press-releases/2024-10-21-gartner-identifies-the-top-10-strategic-technology-trends-for-2025)
- [AI Mindset — Context Obesity](https://hackernoon.com/youre-not-burned-out-youve-got-context-obesity)

---

## Slide 14 — Wave 2 Evidence

**Title:** orchestration: the evidence

**Key Stats:**
| Value | Label | Source |
|-------|-------|--------|
| 97M+ | MCP SDK monthly downloads (Python + TypeScript) | Linux Foundation |
| 75+ | Claude MCP connectors available | Anthropic 2025 |
| 33% | enterprise software with agentic AI by 2028 | Gartner 2025 |

**Research Highlights:**
- MCP donated to **Linux Foundation** (Dec 2025) – becoming industry standard
- Platinum members: Amazon, Anthropic, Google, Microsoft, OpenAI
- Agents now use **hundreds to thousands** of tools per deployment

**Industry Data:** MCP Protocol, OpenAI Agents SDK, LangChain, n8n, Zapier

**Sources:**
- [Anthropic — Model Context Protocol](https://www.anthropic.com/news/model-context-protocol)
- [Linux Foundation — AAIF Announcement](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation)
- [Gartner — Top 10 Tech Trends 2025](https://www.gartner.com/en/newsroom/press-releases/2024-10-21-gartner-identifies-the-top-10-strategic-technology-trends-for-2025)
- [AI Mindset — Context Obesity](https://hackernoon.com/youre-not-burned-out-youve-got-context-obesity)

---

## Slide 15 — Transition 2→3

**Title:** how this enables the next shift  
**Subtitle:** connected workflows prove themselves first in code.

**Content:**
when systems can orchestrate (call tools, coordinate services, verify outputs), **coding becomes the first domain** where agents ship production-ready work.

code is measurable, testable, and valuable.
the perfect **testing ground**.

---

# WAVE 3: Coding Agents ↔ Authorship Anxiety

## Slide 16 — Wave 3 Intro

**Title:** wave 3: coding agents ↔ authorship anxiety  
**Subtitle:** coding becomes the first broadly proven agent category.

---

## Slide 17 — Wave 3 Full

**Title:** wave 3: coding agents ↔ authorship anxiety  
**Subtitle:** coding becomes the first broadly proven agent category.

### Machine Signal:
systems write, refactor, test, ship.
the value is measurable; adoption is fast.
coding becomes the first broadly proven agent category.

### Human Signal:
authorship anxiety rises: "what's mine if the machine did it?"
fear of skill atrophy, status loss, erosion of craft.

### The Context Gap:
when labor gets cheaper, identity gets more expensive.
in a world where output is abundant, authorship becomes less about typing and more about **owning decisions**.

**Sources:**
- [OpenAI — SWE-Bench Verified](https://openai.com/index/introducing-swe-bench-verified/)
- [Anthropic — SWE-Bench Sonnet](https://www.anthropic.com/research/swe-bench-sonnet)
- [AI Mindset — Coding with Claude 3.5](https://t.me/ai_mind_set/282)

---

## Slide 18 — Wave 3 Evidence

**Title:** coding: the evidence

**Key Stats:**
| Value | Label | Source |
|-------|-------|--------|
| 42% | GitHub Copilot market share (paid tools) | CB Insights |
| 82% | Developers using AI assistants weekly | Stack Overflow 2025 |
| 41% | AI-generated code globally | GitHub 2025 |

**Research Highlights:**
- **Vibe Coding** named Word of the Year by Collins Dictionary
- METR Study paradox: experienced devs **19% slower** with AI, believe **20% faster**
- Cursor ARR: **$500M+**, Fortune 500 usage: **50%**

**Industry Data:** GitHub Copilot, Cursor, Claude Code, Windsurf, Replit

**Sources:**
- [CB Insights — Coding AI Market Share](https://www.cbinsights.com/research/report/coding-ai-market-share-december-2025/)
- [Stack Overflow — Developer Survey 2025](https://survey.stackoverflow.co/2025/)
- [Anthropic — SWE-Bench Sonnet](https://www.anthropic.com/research/swe-bench-sonnet)
- [Karpathy — Vibe Coding Tweet](https://x.com/karpathy/status/1886192184808149383)

---

## Slide 19 — Transition 3→4

**Title:** how this enables the next shift  
**Subtitle:** when agents touch money, institutions demand rules.

**Content:**
as coding agents move from experiments to production (41% of global code is AI-generated), organizations face **real risk**:

liability, security, compliance.

regulation stops being theoretical and becomes **urgent**.

---

# WAVE 4: Sovereign AI

## Slide 20 — Wave 4 Intro

**Title:** wave 4: sovereign ai  
**Subtitle:** regulation matures. institutions define "unacceptable risk."

---

## Slide 21 — Wave 4 Full

**Title:** wave 4: sovereign ai  
**Subtitle:** regulation matures. institutions define "unacceptable risk."

### Machine Signal:
sovereign ai becomes strategy: data residency, regulated stacks, local inference, compliant clouds.
"where data lives" becomes as important as "what the model can do."

### Human Signal:
a personal version emerges: **neo-sovereignty**.
people build their own spaces (private notes, smaller circles, local tools) because public feeds feel noisy, extractive, increasingly synthetic.

### The Context Gap:
trust splits: people want innovation and guarantees.
for orgs it's compliance and risk; for individuals it's privacy, boundaries, and control over the context that shapes thinking.

**Sources:**
- [EUR-Lex — AI Act (EU 2024/1689)](https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng)
- [McKinsey — Sovereign AI in Europe](https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/accelerating-europes-ai-adoption-the-role-of-sovereign-ai)

---

## Slide 22 — Wave 4 Evidence

**Title:** sovereignty: the evidence

**Key Stats:**
| Value | Label | Source |
|-------|-------|--------|
| Aug 2024 | EU AI Act entered into force | EUR-Lex |
| Aug 2026 | Full AI Act applicability | EUR-Lex |
| 30% | GenAI projects abandoned after PoC (by end 2025) | Gartner |

**Research Highlights:**
- **GPAI Code of Practice** published July 2025 – voluntary compliance tool
- US Executive Order (Dec 2025): centralizes AI policy, federal preemption
- California: AI safety laws, whistleblower protections, watermarking

**Industry Data:** EU AI Act, US Executive Orders, California RAISE Act, GDPR

**Sources:**
- [EUR-Lex — AI Act (EU 2024/1689)](https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng)
- [National Law Review — 2026 AI Outlook](https://natlawreview.com/article/2026-outlook-artificial-intelligence)
- [McKinsey — Sovereign AI in Europe](https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/accelerating-europes-ai-adoption-the-role-of-sovereign-ai)

---

## Slide 23 — Transition 4→5

**Title:** how this enables the next shift  
**Subtitle:** one technology, many governance realities.

**Content:**
as regulation matures, it doesn't unify — it **fragments**.

US prioritizes frontier innovation.
EU enforces rights-first compliance.
China builds state-aligned utility.

the same capability reads differently **depending on where you are**.

---

# WAVE 5: Regional Frames

## Slide 24 — Wave 5 Intro

**Title:** wave 5: regional frames  
**Subtitle:** ai progress is global, but governance differs by region.

---

## Slide 25 — Wave 5 Full

**Title:** wave 5: regional frames  
**Subtitle:** ai progress is global, but governance differs by region.

### Machine Signal:
policy, procurement, infrastructure, and institutional trust vary.
ai progress is global, but governance and deployment realities differ by region.

### Human Signal:
moral frames diverge:
us: frontier / market
eu: rights / compliance
others: utility / stability / state capacity (varies)

### The Context Gap:
a global story can't be one voice. the same capability reads as liberation, risk, or stability tool depending on the frame.
**pluralism is not optional** — if you ignore frames, you misunderstand people (or get misunderstood).

**Sources:**
- [Pew Research — Trust in EU, US, China AI Regulation](https://www.pewresearch.org/2025/10/15/trust-in-the-eu-u-s-and-china-to-regulate-use-of-ai/)
- [Stanford HAI — AI Index 2025: Public Opinion](https://hai.stanford.edu/ai-index/2025-ai-index-report/public-opinion)
- [European Commission — AI Research Publications](https://op.europa.eu/en/publication-detail/-/publication/4ee8799e-142c-11f0-b1a3-01aa75ed71a1/language-en)
- [Plurality Project (GitHub)](https://github.com/pluralitybook/plurality)

---

## Slide 26 — Wave 5 Evidence

**Title:** regional frames: the evidence

**Key Stats:**
| Value | Label | Source |
|-------|-------|--------|
| 78% | Organizations using AI (up from 55% in 2023) | McKinsey 2025 |
| 71% | Using GenAI in business functions | McKinsey 2025 |
| 24x | Hang Seng Tech P/E vs 31x Nasdaq | UBS 2025 |

**Research Highlights:**
- US: **frontier / market** frame – innovation first
- EU: **rights / compliance** frame – regulation first
- China: **utility / state capacity** – local AI champions emerging

**Industry Data:** EU AI Act, US Executive Orders, DeepSeek, Plurality

**Sources:**
- [Pew Research — Trust in AI Regulation](https://www.pewresearch.org/2025/10/15/trust-in-the-eu-u-s-and-china-to-regulate-use-of-ai/)
- [Stanford HAI — AI Index 2025](https://hai.stanford.edu/ai-index/2025-ai-index-report/public-opinion)
- [McKinsey — State of AI 2025](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai)

---

## Slide 27 — Transition 5→6

**Title:** how this enables the next shift  
**Subtitle:** governance becomes code.

**Content:**
regional values don't stay abstract — they get **embedded into models** through post-training.

refusal patterns, safety postures, and default behaviors reflect the institutional frames that regulate them.

the model you use **carries a worldview**.

---

# WAVE 6: Post-Training Default Values

## Slide 28 — Wave 6 Intro

**Title:** wave 6: post-training default values  
**Subtitle:** post-training defines behavior: refusals, style, safety posture.

---

## Slide 29 — Wave 6 Full

**Title:** wave 6: post-training default values  
**Subtitle:** post-training defines behavior: refusals, style, safety posture.

### Machine Signal:
defaults become the product.
what a model tends to amplify.
post-training defines behavior: refusals, style, safety posture.

### Human Signal:
values fragment.
people cluster into micro-realities and micro-truths.
the cost of disagreement rises; the temptation to outsource judgment rises too.

### The Context Gap:
every model has defaults. every default embeds a worldview.
**the human question becomes:** whose values are embedded in the tool you use daily — and what do they quietly optimize for?

**Sources:**
- [Ouyang et al. — InstructGPT](https://arxiv.org/abs/2203.02155)
- [Bai et al. — Constitutional AI](https://arxiv.org/abs/2212.08073)
- [Investigating Local Censorship (arXiv 2025)](https://arxiv.org/pdf/2505.12625)

---

## Slide 30 — Wave 6 Evidence

**Title:** defaults: the evidence

**Key Stats:**
| Value | Label | Source |
|-------|-------|--------|
| 233 | AI incidents tracked (+56% YoY) | AI Incident Database |
| 39% | AI customer service bots pulled/reworked | Industry surveys |
| 76% | Enterprises with human-in-the-loop | Industry surveys |

**Research Highlights:**
- **InstructGPT/RLHF** set the template for post-training alignment
- **Constitutional AI** (Anthropic) – values as code
- Regional censorship patterns diverge across models

**Industry Data:** RLHF, Constitutional AI, DPO, Safety tuning

**Sources:**
- [Ouyang et al. — InstructGPT](https://arxiv.org/abs/2203.02155)
- [Bai et al. — Constitutional AI](https://arxiv.org/abs/2212.08073)
- [AI Incident Database](https://incidentdatabase.ai/)

---

# ADOPTION WAVES (7-8)
## Parallel adoption track: how humans respond

---

## Slide 31 — Adoption Waves Section

**Title:** adoption waves  
**Subtitle:** how humans respond to the core shifts  
**Caption:** parallel patterns of human adaptation and adoption.

---

# WAVE 7: On-Device Models ↔ Privacy as Status

## Slide 32 — Wave 7 Intro

**Title:** wave 7: on-device models ↔ privacy as status  
**Subtitle:** smaller models get good enough and spread everywhere.

---

## Slide 33 — Wave 7 Full

**Title:** wave 7: on-device models ↔ privacy as status  
**Subtitle:** smaller models get good enough and spread everywhere.

### Machine Signal:
ai becomes ambient — less a destination, more a layer.
on devices, at the edge, inside apps. smaller models get good enough.

### Human Signal:
privacy becomes status. not secrecy — **control**.
more private drafting, smaller circles, local storage, intentional friction against performative posting.

### The Context Gap:
when ai is everywhere, boundaries become the differentiator.
**if everything can be processed, the premium shifts to what you keep.**

**Sources:**
- [Android — Gemini Nano on-device APIs](https://android-developers.googleblog.com/2025/08/the-latest-gemini-nano-with-on-device-ml-kit-genai-apis.html)
- [Wired — Meta Pay for Privacy](https://www.wired.com/story/meta-facebook-pay-for-privacy-europe/)
- [ICO — Data Lives Year 2 Report](https://ico.org.uk/media2/m2maphry/ico-data-lives-year-2-report.pdf)

---

## Slide 34 — Wave 7 Evidence

**Title:** privacy: the evidence

**Key Stats:**
| Value | Label | Source |
|-------|-------|--------|
| 30% | Chinese open-source LLM global share (from 1.2%) | ChinaTalk 2025 |
| 90-95% | DeepSeek cost reduction vs OpenAI o1 | DeepSeek 2025 |
| 10M+ | Qwen app downloads in one week | Alibaba 2025 |

**Research Highlights:**
- **Gemini Nano** on-device: AI becomes ambient, not destination
- Meta "pay for privacy" model in Europe – **control as premium**
- Local-first: private drafting, smaller circles, intentional friction

**Industry Data:** Gemini Nano, Apple Intelligence, DeepSeek R1, Local LLMs

**Sources:**
- [Android — Gemini Nano on-device APIs](https://android-developers.googleblog.com/2025/08/the-latest-gemini-nano-with-on-device-ml-kit-genai-apis.html)
- [Wired — Meta Pay for Privacy](https://www.wired.com/story/meta-facebook-pay-for-privacy-europe/)
- [ChinaTalk — Chinese AI 2025](https://www.chinatalk.media/p/china-ai-in-2025-wrapped)

---

## Slide 35 — Transition 7→8

**Title:** how this enables the next shift  
**Subtitle:** when AI is everywhere, relationships become possible.

**Content:**
as models move on-device (ambient, always available, private), the relationship changes from **tool to companion**.

constant access + privacy + personalization = conditions for **emotional adoption**.

not just "useful," but "trusted."

---

# WAVE 8: Machine Intimacy + Programmable Identity

## Slide 36 — Wave 8 Intro

**Title:** wave 8: machine intimacy + programmable identity  
**Subtitle:** ai moves from tool to relationship surface.

---

## Slide 37 — Wave 8 Full

**Title:** wave 8: machine intimacy + programmable identity  
**Subtitle:** ai moves from tool to relationship surface.

### Machine Signal:
companions, therapists, griefbots, parasocial loops.
in parallel, ai makes it easy to produce a "professional self" at scale — identity becomes programmable.

### Human Signal:
loneliness isn't solved by information.
people accept synthetic intimacy (even while knowing it's synthetic).
meanwhile, people tire of performing the self; they retreat to private spaces and smaller audiences.

### The Context Gap:
humans outsource emotional regulation to systems optimized for engagement.
**we confuse "attention" with "care."**

**Sources:**
- [AI Mindset — Mental Health Boundaries (Founder OS)](https://aimindsetspace.substack.com/p/founder-os-mental-health)
- [Ada Lovelace Institute — AI Companions](https://www.adalovelaceinstitute.org/blog/ai-companions/)
- [Marwick & Boyd — Context Collapse](https://www.microsoft.com/en-us/research/publication/i-tweet-honestly-i-tweet-passionately-twitter-users-context-collapse-and-the-imagined-audience/)

---

## Slide 38 — Wave 8 Evidence

**Title:** intimacy: the evidence

**Key Stats:**
| Value | Label | Source |
|-------|-------|--------|
| 87% | Organizations attacked with AI-assisted threats | Cybersecurity surveys |
| $12.5B | US financial fraud losses (2025) | FTC 2025 |
| 95% | GenAI pilots failing to deliver ROI (MIT) | MIT 2025 |

**Research Highlights:**
- **Parasocial AI**: companions, therapists, griefbots normalized
- "Context collapse" – same identity, different audiences
- People accept synthetic intimacy **while knowing it is synthetic**

**Industry Data:** AI companions, Replika, Character.AI, Deepfakes

**Sources:**
- [Ada Lovelace Institute — AI Companions](https://www.adalovelaceinstitute.org/blog/ai-companions/)
- [AI Mindset — Mental Health Boundaries](https://aimindsetspace.substack.com/p/founder-os-mental-health)
- [Marwick & Boyd — Context Collapse](https://www.microsoft.com/en-us/research/publication/i-tweet-honestly-i-tweet-passionately-twitter-users-context-collapse-and-the-imagined-audience/)

---

# CONSTRAINT TRACKS (9-10)
## Background constraints that govern all waves

---

## Slide 39 — Constraints Section

**Title:** constraint tracks  
**Subtitle:** the limits that govern all waves  
**Caption:** these don't follow from the chain — they constrain everything.

---

# WAVE 9: Data Wall

## Slide 40 — Wave 9 Intro

**Title:** wave 9: data wall  
**Subtitle:** high-quality human data is finite; marginal gains get expensive.

---

## Slide 41 — Wave 9 Full

**Title:** wave 9: data wall  
**Subtitle:** high-quality human data is finite; marginal gains get expensive.

### Machine Signal:
training leans harder on synthetic data and distillation.
as synthetic output floods the environment, "evidence" becomes a formatting problem: it can look right before it is right.

### Human Signal:
trust becomes scarce.
people shift from "is it true?" to "is it traceable?"
the new literacy is **provenance**.

### The Context Gap:
machines can manufacture infinite text and images.
humans can't manufacture infinite meaning.
**the ratio collapses.**

**Sources:**
- [Epoch AI — Limits of LLM Scaling](https://epoch.ai/blog/will-we-run-out-of-data-limits-of-llm-scaling-based-on-human-generated-data)
- [Shumailov et al. — Model Collapse](https://arxiv.org/abs/2305.17493)
- [AI Mindset — Team Knowledge System](https://aimindsetspace.substack.com/p/ai-ark-knowledge-system)

---

## Slide 42 — Wave 9 Evidence

**Title:** data wall: the evidence

**Key Stats:**
| Value | Label | Source |
|-------|-------|--------|
| $67.4B | Global enterprise losses from AI hallucinations | Korra 2025 |
| 47% | Business leaders making decisions on hallucinated output | Industry surveys |
| 0.7% | Best hallucination rate (Gemini 2.0 Flash) | ISACA 2025 |

**Research Highlights:**
- **Model Collapse**: training on synthetic data degrades quality over generations
- Four models now achieve **sub-1% hallucination rates**
- "Is it true?" shifting to "**is it traceable?**" – provenance as new literacy

**Industry Data:** Synthetic data, Model collapse, RAG systems, Data provenance

**Sources:**
- [Epoch AI — Limits of LLM Scaling](https://epoch.ai/blog/will-we-run-out-of-data-limits-of-llm-scaling-based-on-human-generated-data)
- [Shumailov et al. — Model Collapse](https://arxiv.org/abs/2305.17493)
- [Korra — $67B AI Hallucination Warning](https://korra.ai/the-67-billion-warning-how-ai-hallucinations-hurt-enterprises-and-how-to-stop-them/)
- [ISACA — AI Pitfalls 2025](https://www.isaca.org/resources/news-and-trends/isaca-now-blog/2025/avoiding-ai-pitfalls-in-2026-lessons-learned-from-top-2025-incidents)

---

# WAVE 10: Compute & Energy ↔ Return of Physics

## Slide 43 — Wave 10 Intro

**Title:** wave 10: compute & energy ↔ return of physics  
**Subtitle:** ai isn't just software. it's infrastructure.

---

## Slide 44 — Wave 10 Full

**Title:** wave 10: compute & energy ↔ return of physics  
**Subtitle:** ai isn't just software. it's infrastructure.

### Machine Signal:
chips, energy, cooling, geopolitics.
even digital gods need electricity.
energy and compute become the regulator of progress.

### Human Signal:
energy economics turns personal: burnout realism, fatigue, "time hangover," sharper awareness of biological limits.
people begin optimizing for sustainability, not maximum output.

### The Context Gap:
data centres become local political issues; your "cloud" starts to feel like a land dispute.
philosophical note: thermodynamics returns as a hidden governor — you can't out-optimize scarcity forever.

**Sources:**
- [IEA — Energy Supply for AI](https://www.iea.org/reports/energy-and-ai/energy-supply-for-ai)
- [Reuters — AI Data Centers and Peaker Plants](https://www.reuters.com/business/energy/ai-data-centers-are-forcing-obsolete-peaker-power-plants-back-into-service-2025-12-23/)

---

## Slide 45 — Wave 10 Evidence

**Title:** compute: the evidence

**Key Stats:**
| Value | Label | Source |
|-------|-------|--------|
| $315-371B | Hyperscaler CapEx 2025 (+40-44% YoY) | Goldman Sachs |
| 536 TWh | Data center electricity consumption 2025 | IEA |
| $7.9T | Estimated AI infrastructure CapEx to 2030 | McKinsey |

**Research Highlights:**
- **7-year wait** for some power grid connection requests
- Stargate project: **$500B** investment over 4 years
- Data centres become local political issues; "cloud" feels like land dispute

**Industry Data:** Stargate, NVIDIA, AMD, Power grid, Nuclear

**Sources:**
- [Goldman Sachs — AI Power Demand](https://www.goldmansachs.com/insights/articles/ai-to-drive-165-increase-in-data-center-power-demand-by-2030)
- [McKinsey — Cost of Compute](https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/the-cost-of-compute-a-7-trillion-dollar-race-to-scale-data-centers)
- [IEA — Energy Supply for AI](https://www.iea.org/reports/energy-and-ai/energy-supply-for-ai)

---

# SUMMARY SLIDES

## Slide 46 — Machines Summarized

**Title:** machines, summarized (2025 → 2026)  
**Subtitle:** what changed in machines:

**Content:**
- from chat to **delegation** (agents + orchestration)
- from "more scale" to **better reasoning** (system-2 behavior)
- from capability focus to **constraints** (trust, governance, energy)
- from one platform to **protocol layers** (connective tissue)
- from cloud-only to **ambient ai** (on-device + edge)

---

## Slide 47 — Humans Summarized

**Title:** humans, summarized (2025 → 2026)  
**Subtitle:** what changed in humans:

**Content:**
- from consumption to **curation** (feeds → gardens)
- from optimism to **trust management** (provenance, receipts, auditability)
- from public posting to **private coherence** (smaller circles, intentional friction)
- from "more tools" to **more fatigue** (capacity gap)
- from "identity as output" to **identity as constraint**

---

# CALL TO ACTION

## Slide 48 — Call to Agency

**Title:** call to agency  
**Subtitle:** the wrong question is: "what is this doing to us?"

**Content:**
the better question is:

**"what are we letting it do to us?"**

this is not a technological coup.
it's a voluntary abdication — a surrender of the burden of choice.

it can be reclaimed.
but it must be reclaimed.

**Source:** [TU Wien — Perspectives on Digital Humanism](https://dighum.ec.tuwien.ac.at/perspectives-on-digital-humanism/introduction/)

---

## Slide 49 — Survival Kit

**Title:** survival kit  
**Subtitle:** in 2026, most people won't lose to ai. they'll lose to their own defaults.

**Content:**
your life already runs on configuration:

- what you say yes to without thinking
- what interrupts you without permission
- what you outsource because you're tired
- what you believe because it was repeated

**constitution-as-code** = moving from "i'll try" → "i have defaults."
a config file for your life.

**Sources:**
- [Clark & Chalmers — The Extended Mind](https://consc.net/papers/extended.html)
- [TU Wien — Attention Economy and AI](https://dighum.ec.tuwien.ac.at/perspectives-on-digital-humanism/the-attention-economy-and-the-impact-of-ai/)
- [AI Mindset — Team Knowledge System](https://aimindsetspace.substack.com/p/ai-ark-knowledge-system)

---

# COMMUNITY SIGNALS

## Slide 50 — Community Section

**Title:** community signals  
**Subtitle:** field signals: real workflow shifts from ai mindset space  
**Caption:** that ground our 10 waves in lived experience.

---

## Slide 51 — Field Signals

**Title:** field signals  
**Subtitle:** real workflow shifts from the community

**Quotes:**
| Quote | Author |
|-------|--------|
| "i became a builder: i shipped in 30 minutes what stalled for 1.5 months." | alexander stashenko |
| "two weeks of content in 30 minutes; transcripts in zero; apps deploy on prompts." | nikolay senin |
| "ai moved from smart tool to full participant; i design pipelines, humans decide now." | yakov vasiliev |
| "cursor and claude code turned me into a product automator; i vibe-coded real prototypes." | natalya savenkova |
| "after sessions, output is a product: two voice commands plus mcp ship artifacts fast." | dmitry kompanets |

**Source:** [AI Mindset Space Community](https://aimindset.org/ai-mindset-community)

---

## Slide 52 — More Field Signals

**Title:** more field signals  
**Subtitle:** continued reflections from the community

**Quotes:**
| Quote | Author |
|-------|--------|
| "i manage virtual developers: codex generates, claude verifies; legacy rewrites take days, not weeks." | andrei muntanion |
| "llm roleplay is my reality simulator; i learn by 'coffee chats' with experts daily." | artem tereshin |
| "i document corporate context end-to-end; llms use it to improve processes and strategy continually." | r_om |
| "the product shift: hold the user's hand, solve their task — don't sell a universal tool." | evgeniy |
| "it reads like a chatgpt monolith: lots of 'we,' little risk, little responsibility, little concrete." | andrei shakhov |

---

# STAY CONNECTED + SOURCES

## Slide 53 — Stay in the Loop

**Title:** stay in the loop  
**Subtitle:** if this artifact helped you name the friction — don't lose the thread.

**Content:**
stay connected with ai mindset:

- **subscribe on substack** → get next resets, field notes, templates, and lab openings
- **explore the ecosystem** → labs, tools, community, artifacts
- **talk to us** → partnerships / speaking / labs for teams

_signals only. no spam. unsubscribe anytime._

**Links:**
- [Subscribe on Substack](https://aimindsetspace.substack.com/)
- [Explore the Ecosystem](https://aim-ecosystem-map.netlify.app/#)
- [Talk to us](http://t.me/alex_named)

---

## Slide 54 — Sources Section

**Title:** source shelf (curated)  
**Subtitle:** the full reading list behind this report

---

## Slide 55 — AI: Capability, Infra, Adoption

**Title:** ai: capability, infra, adoption  
**Subtitle:** core references

**Sources:**
- [Stanford HAI — AI Index 2025 (PDF)](https://hai-production.s3.amazonaws.com/files/hai_ai_index_report_2025.pdf)
- [Gartner — Top 10 Strategic Technology Trends for 2025](https://www.gartner.com/en/newsroom/press-releases/2024-10-21-gartner-identifies-the-top-10-strategic-technology-trends-for-2025)
- [Anthropic — Model Context Protocol (MCP)](https://www.anthropic.com/news/model-context-protocol)
- [MCP Spec Hub](https://modelcontextprotocol.io/)
- [SWE-bench Ecosystem](https://www.swebench.com/)
- [OpenAI — Introducing SWE-bench Verified](https://openai.com/index/introducing-swe-bench-verified/)
- [X402 — Internet-native payments for AI agents](https://www.x402.org/)

---

## Slide 56 — Data: Limits + Synthetic Loops

**Title:** data: limits + synthetic loops  
**Subtitle:** on the data wall

**Sources:**
- [Epoch AI — Limits of LLM Scaling (Human Data Constraints)](https://epoch.ai/blog/will-we-run-out-of-data-limits-of-llm-scaling-based-on-human-generated-data)
- [Shumailov et al. — The Curse of Recursion / Model Collapse](https://arxiv.org/abs/2305.17493)

---

## Slide 57 — Humans: Overload, Trust, Culture

**Title:** humans: overload, trust, culture  
**Subtitle:** the human layer

**Sources:**
- [Microsoft — Work Trend Index 2024](https://www.microsoft.com/en-us/worklab/work-trend-index/ai-at-work-is-here-now-comes-the-hard-part)
- [Microsoft — Work Trend Index 2025](https://www.microsoft.com/en-us/worklab/work-trend-index/2025-the-year-the-frontier-firm-is-born)
- [Edelman — 2025 Trust Barometer (Global Report, PDF)](https://www.edelman.com/sites/g/files/aatuss191/files/2025-01/2025%20Edelman%20Trust%20Barometer_Final.pdf)
- [Marwick & Boyd — Context Collapse / Imagined Audience](https://www.microsoft.com/en-us/research/publication/i-tweet-honestly-i-tweet-passionately-twitter-users-context-collapse-and-the-imagined-audience/)
- [Wired — Meta is asking people in Europe to pay for privacy](https://www.wired.com/story/meta-facebook-pay-for-privacy-europe/)
- [ICO — Data Lives: Year 2 Report (PDF)](https://ico.org.uk/media2/m2maphry/ico-data-lives-year-2-report.pdf)

---

## Slide 58 — Governance / Philosophy

**Title:** governance / philosophy  
**Subtitle:** policy and thought

**Sources:**
- [EUR-Lex — AI Act (Regulation (EU) 2024/1689)](https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng)
- [European Commission — AI Research Publications in Science](https://op.europa.eu/en/publication-detail/-/publication/4ee8799e-142c-11f0-b1a3-01aa75ed71a1/language-en)
- [TU Wien — Perspectives on Digital Humanism](https://dighum.ec.tuwien.ac.at/perspectives-on-digital-humanism/)
- [Pew Research — Trust in the EU, U.S. and China to Regulate AI (2025)](https://www.pewresearch.org/2025/10/15/trust-in-the-eu-u-s-and-china-to-regulate-use-of-ai/)
- [Ouyang et al. — InstructGPT (2022)](https://arxiv.org/abs/2203.02155)
- [Bai et al. — Constitutional AI (2022)](https://arxiv.org/abs/2212.08073)
- [Investigating Local Censorship (ArXiv, 2025)](https://arxiv.org/pdf/2505.12625)
- [Digital Plurality Project](https://github.com/pluralitybook/plurality)

---

## Slide 59 — Frame: Attention, Cognition, Acceleration, Sovereignty

**Title:** frame: attention, cognition, acceleration, sovereignty  
**Subtitle:** foundational thinkers

**Sources:**
- [Simon — Designing Organizations for an Information-Rich World (1971, PDF)](https://www.nmh-p.de/wp-content/uploads/Simon-H.A._Designing-organizations-for-an-information-rich-world.pdf)
- [Wu — The Attention Merchants](https://www.penguinrandomhouse.com/books/234876/the-attention-merchants-by-tim-wu/)
- [Sweller — Cognitive Load During Problem Solving (1988)](https://www.sciencedirect.com/science/article/pii/0364021388900237)
- [Mark et al. — Focused, Aroused, But So Distractible](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/10/p903-mark.pdf)
- [Kahneman — Thinking, Fast and Slow](https://us.macmillan.com/books/9780374533557/thinkingfastandslow/)
- [Toffler — Future Shock](https://search.library.wisc.edu/catalog/999466643102121/cite)
- [Rosa — Social Acceleration](https://cup.columbia.edu/book/social-acceleration/9780231148344/)
- [Clark & Chalmers — The Extended Mind](https://consc.net/papers/extended.html)
- [Shneiderman — Human-Centered AI](https://global.oup.com/academic/product/human-centered-ai-9780192845290)
- [Hirschman — Exit, Voice, and Loyalty](https://www.hup.harvard.edu/books/9780674276604)
- [Davidson & Rees-Mogg — The Sovereign Individual](https://www.simonandschuster.com/books/The-Sovereign-Individual/James-Dale-Davidson/9781797103389)
- [Srinivasan — The Network State](https://thenetworkstate.com/)

---

## Slide 60 — Machine Intimacy

**Title:** machine intimacy  
**Subtitle:** on ai companions

**Sources:**
- [Ada Lovelace Institute — Friends for Sale: The Rise and Risks of AI Companions (2025)](https://www.adalovelaceinstitute.org/blog/ai-companions/)

---

## Slide 61 — AI Mindset Field Notes

**Title:** ai mindset field notes  
**Subtitle:** our own publications referenced in this deck

**Sources:**
- [You're not burned out, you've got context obesity](https://hackernoon.com/youre-not-burned-out-youve-got-context-obesity)
- [Team Knowledge System (AI Ark)](https://aimindsetspace.substack.com/p/ai-ark-knowledge-system)
- [Coding with Claude 3.5](https://t.me/ai_mind_set/282)
- [AI + Mental Health Boundaries (Founder OS)](https://aimindsetspace.substack.com/p/founder-os-mental-health)

---

# THANK YOU

## Slide 62 — Final Slide

**Title:** thank you  
**Subtitle:** the context gap · annual report 2025

**Content:**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
this is not about keeping up with machines.
it's about building operating systems for humans.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

created with the ai mindset labs community

alex p · ray svitla · sergei khabarov · anca

**Links:**
- [Subscribe](https://aimindsetspace.substack.com/)
- [Connect](https://t.me/ai_mind_set)
- [Website](https://aimindset.org)

---

# APPENDIX: QUICK STATS

## Key Numbers

| Metric | Value | Source |
|--------|-------|--------|
| AI Adoption | 78-88% | McKinsey 2025 |
| Actively distrust AI | 46% | StackOverflow |
| Truly transforming (not just adopting) | 6% | McKinsey |
| AI pilots with zero ROI | 95% | MIT |
| Productivity gain with AI | 126% | Nielsen Norman |
| Developers in "red zone" | 76% | Qodo |
| Annual AI infrastructure spend | $500B | Goldman Sachs |
| AI-generated code globally | 41% | GitHub |
| MCP SDK downloads monthly | 97M+ | Linux Foundation |

---

**Document Path:**  
`/Work/AI Mindset/AIM 2026 Report/All Texts - Context Gap Report.md`

**Last Updated:** 2026-01-09
