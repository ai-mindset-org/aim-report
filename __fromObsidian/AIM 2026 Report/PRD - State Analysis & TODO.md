# PRD — State Analysis & TODO

**Дата:** 2026-01-08  
**Методология:** 5 блоков состояний для полноты описания

---

## МЕТОДОЛОГИЯ СОСТОЯНИЙ

Для грамотного описания продукта нужно прописать:

1. ✅ **Данные на входе** — как пользователь попадает, какие аргументы/состояния БД
2. ⚠️ **Внутренние переменные и состояния** — логика работы в зависимости от состояний
3. ⚠️ **Состояния готового результата** — все возможные outcomes
4. ❌ **Аналитика** — как оцениваем, что трекаем
5. ✅ **Финальный дизайн и тексты** — визуал и копирайт

---

## 1. ДАННЫЕ НА ВХОДЕ ✅ (ЕСТЬ, НО ДОПОЛНИМ)

### Текущее состояние в PRD:
- Формат: Interactive Web Presentation
- Навигация: keyboard, click, swipe
- PDF export

### ЧТО ДОБАВИТЬ:

#### 1.1 User Entry Points (как попадают)

**Primary:**
- 🔗 Telegram message (прямое сообщение)
- 🔗 Telegram channel post (ссылка в посте)
- 🤖 Telegram bot (ссылка в боте)
- 📱 Instagram/Telegram Stories (ссылка в stories)

**Secondary:**
- 🔗 Direct link share (friend → friend)
- 🌐 Website embed (на основном сайте AI Mindset)

**URL:**
- Production: `https://[netlify-url].netlify.app/` (TBD)
- Current: `http://localhost:5173/`

---

#### 1.2 URL Parameters & Query Strings

**Зачем нужны:**
Чтобы трекать откуда пришёл пользователь и персонализировать опыт.

**Примеры:**

```
?source=telegram_channel    // пришёл из канала
?source=telegram_dm         // direct message
?source=instagram_story     // Instagram stories
?source=bot                 // из бота
?utm_campaign=annual_report // для Google Analytics
?utm_source=telegram
?utm_medium=social
?slide=5                    // открыть сразу на слайде 5
?lang=en                    // язык (если будет i18n)
```

**Что это даёт:**
- Трекинг источников (какой канал работает лучше)
- Персонализация (если из бота — показать special CTA)
- Deep linking (поделиться конкретным слайдом)

**TODO:** 
- [ ] Добавить парсинг URL params в App.tsx
- [ ] Сохранять source в analytics event
- [ ] Deep linking: открывать нужный слайд по ?slide=N

---

#### 1.3 User State (Зачем нужно)

**Что это:**
Понимать кто пользователь и на каком этапе journey.

**Возможные состояния:**

| State | Description | Behaviour |
|-------|-------------|-----------|
| **new_visitor** | Первый раз видит репорт | Показать onboarding tooltip? |
| **returning_visitor** | Возвращается (localStorage) | Предложить продолжить с того места |
| **aim_community** | Уже подписан на канал/email | Не показывать "Join" CTA |
| **completed** | Дошёл до конца | Показать "Share with friends" CTA |

**Как определить:**
- localStorage: `visited_before: true/false`
- localStorage: `last_slide: 12`
- URL param: `?member=true` (если из бота, знаем что подписан)

**TODO:**
- [ ] Добавить localStorage tracking
- [ ] Определять returning visitors
- [ ] Персонализировать CTAs based on state

---

#### 1.4 Целевая Аудитория (Context)

**Primary:**
Люди знакомые с AI Mindset (из канала, читают команду, участники лаб)

**Secondary:**
Новые люди (пришли через репост, рекомендации)

**Желаемое поведение:**
Primary → расширяют на свою аудиторию → приводят Secondary

**TODO:**
- [ ] Разные CTAs для primary vs secondary?
- [ ] A/B тест: "Join Lab" для new vs "Share with friends" для existing

---

## 2. ВНУТРЕННИЕ ПЕРЕМЕННЫЕ И СОСТОЯНИЯ ⚠️ (ДОПОЛНИТЬ)

### Текущее состояние в PRD:
- Slide navigation logic
- PDF export logic
- Animation system

### ЧТО ДОБАВИТЬ:

#### 2.1 Состояние Навигации

**Что не описано:**
- Current slide index
- Total slides
- Navigation history (back button logic?)
- Progress tracking

**Переменные:**

```typescript
interface NavigationState {
  currentSlide: number;        // 0 to totalSlides-1
  totalSlides: number;          // ~50 slides
  visitedSlides: number[];      // [0, 1, 2, 5, 12] — какие видел
  progressPercent: number;      // 24% — для analytics
  isFirstSlide: boolean;        // disable prev button
  isLastSlide: boolean;         // show special CTA
}
```

**Логика переходов:**
- `currentSlide === 0` → hide back button
- `currentSlide === totalSlides - 1` → show "Share" / "Join" CTAs
- `visitedSlides.length / totalSlides` → completion rate для analytics

**TODO:**
- [ ] Описать все состояния навигации
- [ ] Логика disable/enable кнопок
- [ ] Completion tracking

---

#### 2.2 Состояние Анимации

**Что не описано:**
- Animation playing/paused states
- Loading states для тяжёлых анимаций
- Reduced motion preference (accessibility)

**Переменные:**

```typescript
interface AnimationState {
  isPlaying: boolean;           // анимации идут
  isPaused: boolean;            // пользователь pause
  reducedMotion: boolean;       // prefers-reduced-motion
  animationQuality: 'high' | 'low'; // на слабых устройствах
}
```

**Логика:**
- Если `reducedMotion === true` → отключить Framer Motion
- Если медленное устройство → `animationQuality: 'low'`
- Пользователь может pause анимации (кнопка?)

**TODO:**
- [ ] Добавить поддержку prefers-reduced-motion
- [ ] Тестировать на медленных устройствах
- [ ] Опция pause/play анимаций?

---

#### 2.3 Error States

**Вопрос из голосовухи:**
> "Не может быть у нас такого, что источник не загрузился, а весь другой текст загрузился потому что источник это тоже текст."

**Ответ:** Правильно, всё из markdown, не должно быть частичной загрузки.

**НО есть другие error states:**

```typescript
interface ErrorState {
  // Network errors (если будет API для analytics)
  analyticsOffline: boolean;
  
  // PDF export errors
  pdfExportFailed: boolean;
  pdfExportError: string;
  
  // Asset loading errors
  imageLoadFailed: string[];  // какие картинки не загрузились
  
  // General
  hasError: boolean;
  errorMessage: string;
}
```

**Сценарии:**
1. **PDF Export fails** — показать "Try again" или "Download as images instead"
2. **Image не загрузилась** — показать placeholder
3. **Analytics недоступна** — не блокировать UX, silent fail

**TODO:**
- [ ] Прорисовать error states для PDF export
- [ ] Fallback для failed images
- [ ] Silent fail для analytics (не показывать user)

---

#### 2.4 Form State (ЕСТЬ ФОРМА!)

**Что за форма:**
Email gate для downloads (Action Guide, Executive Summary)

**States:**

```typescript
interface FormState {
  // Input
  email: string;
  isValid: boolean;
  
  // Validation
  validationError: string | null;  // "Invalid email format"
  
  // Submission
  isSubmitting: boolean;           // показать spinner
  isSubmitted: boolean;            // успешно отправлено
  submissionError: string | null;  // "Server error"
  
  // Download
  downloadReady: boolean;          // можно скачать
  downloadUrl: string;             // ссылка на PDF
}
```

**User Flow:**

```
1. User enters email
   → validate format
   
2. User clicks "Download"
   → isSubmitting = true
   → show spinner
   
3a. Success:
   → isSubmitted = true
   → downloadReady = true
   → show "Download ready!" + link
   
3b. Error:
   → submissionError = "Please try again"
   → allow retry
```

**Визуальные состояния:**

| State | Visual |
|-------|--------|
| Empty | Placeholder "Enter email" |
| Typing | Active border |
| Invalid | Red border + error text |
| Submitting | Spinner + disabled button |
| Success | Green checkmark + download link |
| Error | Red error message + retry button |

**TODO:**
- [ ] Прорисовать все состояния формы (empty, typing, invalid, submitting, success, error)
- [ ] Добавить validation logic
- [ ] Добавить error handling
- [ ] Дизайн success state

---

## 3. СОСТОЯНИЯ ГОТОВОГО РЕЗУЛЬТАТА ⚠️ (ДОПОЛНИТЬ)

### Текущее состояние в PRD:
- Interactive presentation works
- PDF export works

### ЧТО ДОБАВИТЬ:

#### 3.1 User Journey End States

**Конечные точки:**

| End State | Description | Success Metric |
|-----------|-------------|----------------|
| **Completed & Subscribed** | Дошёл до конца + подписался на канал/email | ✅ Best outcome |
| **Completed & Shared** | Дошёл до конца + поделился с друзьями | ✅ Viral growth |
| **Bounced Early** | Ушёл после 2-3 слайдов | ❌ Need improvement |
| **Downloaded PDF** | Скачал PDF вместо web просмотра | 🟡 Engaged, but offline |
| **Downloaded Resources** | Скачал Action Guide / Executive Summary | ✅ High intent |
| **Visited Labs Page** | Перешёл на aimindset.org/labs | ✅ Conversion |

**Exit Points:**

```
User Journey Exits:
1. Subscribe to Telegram channel
2. Subscribe to email newsletter
3. Visit aimindset.org (labs page)
4. Download Action Guide
5. Download Executive Summary
6. Take Interactive Assessment
7. Request Custom Report
8. Share with friends (social share)
```

**TODO:**
- [ ] Добавить все exit points в PRD
- [ ] Трекать каждый exit point
- [ ] Определить primary conversion goal

---

#### 3.2 Success States после PDF Export

**Вопрос из голосовухи:**
> "Зачем нужны success/error states после PDF export?"

**Ответ:** Юзабилити. Пользователь должен понимать что произошло.

**States:**

```typescript
interface PDFExportState {
  idle: boolean;              // кнопка "Export to PDF"
  exporting: boolean;         // идёт генерация, показать прогресс
  exportProgress: number;     // 0-100% (для длинных презентаций)
  success: boolean;           // "PDF ready! Click to download"
  error: boolean;             // "Export failed. Try again?"
  errorMessage: string;       // конкретная ошибка
}
```

**Визуал:**

| State | UI |
|-------|-----|
| idle | Button: "Export to PDF" |
| exporting | Spinner + "Generating PDF... 45%" |
| success | Green checkmark + "PDF Ready! Click to download" |
| error | Red X + "Export failed. Try again?" |

**TODO:**
- [ ] Добавить progress bar для PDF export
- [ ] Success state с кнопкой download
- [ ] Error state с retry button

---

## 4. АНАЛИТИКА ❌ (ПОЛНОСТЬЮ ОТСУТСТВУЕТ В PRD)

### Что нужно добавить:

#### 4.1 Analytics Setup

**TODO:**
- [ ] Подключить **Яндекс.Метрику**
- [ ] Подключить **Google Analytics 4**
- [ ] Настроить event tracking

**Код:**

```typescript
// В App.tsx или отдельный analytics.ts
interface AnalyticsEvent {
  event: string;
  properties: Record<string, any>;
}

// Примеры событий
trackEvent('page_view', { 
  slide: currentSlide,
  source: urlParams.source 
});

trackEvent('slide_viewed', { 
  slide_number: 5,
  slide_title: 'Wave 3: Coding Agents' 
});
```

---

#### 4.2 Метрики Успеха

**Вопрос из голосовухи:**
> "Не знаю какие можно ставить метрики успеха. Что может принести такой проект?"

**Варианты целей:**

**GOAL 1: Awareness (больше людей знает про AIM Mindset)**
- Метрика: Unique visitors
- Target: 1000+ visitors за первый месяц?

**GOAL 2: Engagement (люди реально читают)**
- Метрика: Average completion rate
- Target: 30%+ дошли до конца?

**GOAL 3: Leads (люди заинтересованы)**
- Метрика: Email signups + Channel subscribers
- Target: 10% conversion rate?

**GOAL 4: Revenue (люди покупают лабу)**
- Метрика: Lab registrations from report
- Target: Хотя бы 5-10 регистраций?

**GOAL 5: Virality (люди делятся)**
- Метрика: Social shares + referral traffic
- Target: 20% visitors share?

**TODO:**
- [ ] Определить primary goal (что важнее всего?)
- [ ] Определить target numbers
- [ ] Настроить dashboards (Метрика + GA)

---

#### 4.3 Tracking Events

**TODO: Что хочется трекать (из голосовухи):**

**Basic Events:**
```typescript
// Navigation
track('slide_viewed', { slide, title })
track('completed_presentation')  // дошёл до конца
track('bounced', { last_slide })  // ушёл рано

// Time spent
track('time_on_slide', { slide, seconds })
track('total_time', { seconds })

// Engagement
track('pdf_exported')
track('shared', { method })  // twitter, telegram, copy link
```

**Conversion Events:**
```typescript
// CTAs
track('clicked_join_lab')
track('clicked_join_channel')
track('clicked_subscribe_email')
track('clicked_visit_website')

// Downloads
track('downloaded_action_guide')
track('downloaded_executive_summary')

// Assessment
track('started_assessment')
track('completed_assessment', { score })
```

**Attribution:**
```typescript
// Source tracking
track('page_view', { 
  source: 'telegram_channel',  // откуда пришёл
  utm_campaign: 'annual_report',
  utm_medium: 'social'
})
```

**TODO:**
- [ ] Имплементировать все tracking events
- [ ] Добавить UTM params ко всем external links
- [ ] Настроить Goals в Яндекс.Метрике

---

#### 4.4 Conversion Метрики

**Вопрос из голосовухи:**
> "Лидами можно считать тех кто подписался на email или канал. Те кто downloaded я бы не стала называть лидами, потому что контактов не останется."

**Правильно!**

**Lead Definition:**
```
Lead = есть контакт для follow-up
- Email subscription ✅
- Telegram channel subscription ✅
- Downloaded resource БЕЗ email ❌ (не лид)
```

**Conversion Funnel:**

```
1000 visitors
  ↓ 30% complete
300 completed
  ↓ 10% convert
30 leads (email/channel)
  ↓ 20% buy
6 lab registrations
```

**TODO:**
- [ ] Настроить Goals: email_signup, channel_subscription
- [ ] Считать conversion rate = leads / visitors
- [ ] Трекать funnel: visit → complete → lead → purchase

---

#### 4.5 A/B Testing Setup

**Вопрос из голосовухи:**
> "Для какой страницы имел бы смысл A/B тест? Может информация про компанию раньше (слайд 2) vs позже (слайд 12)?"

**Отличная идея!**

**Test Hypothesis:**
- **Variant A:** About AI Mindset на слайде 2 (рано)
- **Variant B:** About AI Mindset на слайде 12-15 (в середине)
- **Variant C:** About AI Mindset в самом конце (перед CTAs)

**Metric:** Completion rate (% дошедших до конца)

**Hypothesis:**
- Если рано (слайд 2) → может отпугнуть новых (еще не понимают зачем)
- Если поздно → люди уже вовлечены, больше интереса

**Другие тесты:**

| Test | Variant A | Variant B | Metric |
|------|-----------|-----------|--------|
| CTA placement | "Join Lab" в начале | "Join Lab" в конце | Click rate |
| Hero messaging | "Annual Report" | "Interactive Experience" | Bounce rate |
| Email gate | Gate для всех downloads | Gate только для Guide | Lead conversion |

**TODO:**
- [ ] Выбрать 1-2 теста для старта
- [ ] Настроить A/B через Google Optimize или Яндекс.Метрику
- [ ] Определить sample size (сколько visitors нужно)

---

## 5. ФИНАЛЬНЫЙ ДИЗАЙН И ТЕКСТЫ ✅ (В PRD ЕСТЬ)

### Что уже описано:
- ✅ Visual Identity: Swiss Brutalist
- ✅ Color Palette
- ✅ Typography
- ✅ Layout System
- ✅ Visual Metaphors
- ✅ Content Architecture (10 waves)

### Дополнительные детали (из голосовухи):

#### 5.1 "THE CONTEXT GAP" — красный блок внизу

**Вопрос:**
> "Это диагностика: где ломается координация – не понимаю про что это"

**Что это:**
В каждом loop есть секция "Context Gap" — это НЕ диагностика, а **объяснение разрыва**.

**Структура loop:**
```
1. Machine Signal  — что умеют машины
2. Human Signal    — как реагируют люди  
3. THE CONTEXT GAP — что ломается между ними
4. The Move        — что делать (AIM практика)
```

**Пример (Wave 1: Reasoning):**
- **Machine:** Agents can do multi-step reasoning
- **Human:** People want to see the work (auditable)
- **GAP:** Agents work fast, humans verify slow — bottleneck!
- **Move:** Build verification rituals

**Визуал:** Красный блок чтобы показать "проблемная зона".

**TODO:**
- [ ] Убедиться что Gap объяснён понятно в каждом loop
- [ ] Визуал Gap должен быть consistent (красный?)

---

## 📝 ИТОГОВЫЙ TODO LIST

### HIGH PRIORITY (до launch):

**Аналитика:**
- [ ] Подключить Яндекс.Метрику
- [ ] Подключить Google Analytics 4
- [ ] Настроить базовые события: page_view, slide_viewed, completed
- [ ] Настроить Goals: email_signup, channel_subscription, lab_click

**States:**
- [ ] Прорисовать все состояния формы (email gate)
- [ ] Добавить success/error states для PDF export
- [ ] Добавить localStorage для returning visitors
- [ ] Парсить URL params (?source=telegram_channel)

**Tracking:**
- [ ] Track completion rate (% дошли до конца)
- [ ] Track time spent (total + per slide)
- [ ] Track CTA clicks (join lab, channel, email)
- [ ] Track downloads (Action Guide, Executive Summary)

---

### MEDIUM PRIORITY (после launch):

**A/B Testing:**
- [ ] Тест: "About AI Mindset" слайд 2 vs 12 vs конец
- [ ] Тест: CTA placement (начало vs конец)
- [ ] Определить winning variant

**Персонализация:**
- [ ] Detecting returning visitors
- [ ] Персонализировать CTAs (existing members vs new)
- [ ] Deep linking (?slide=5)

**UX Improvements:**
- [ ] Поддержка prefers-reduced-motion
- [ ] Progress indicator (более явный)
- [ ] Navigation history (back button?)

---

### LOW PRIORITY (nice to have):

- [ ] Onboarding tooltip для first-time visitors
- [ ] Pause/play для анимаций
- [ ] Animation quality setting (high/low)
- [ ] Error fallbacks для failed images
- [ ] Multi-language support (?lang=en)

---

## ОТВЕТЫ НА ВОПРОСЫ ИЗ ГОЛОСОВУХИ

### Q: "Что такое URL параметры и query strings?"
**A:** `?source=telegram&slide=5` — чтобы знать откуда пришёл и deep link на слайд.

### Q: "Зачем нужно состояние пользователя?"
**A:** Чтобы персонализировать: returning visitor → "Continue where you left", existing member → не показывать "Join" CTA.

### Q: "Что такое состояние навигации?"
**A:** Current slide, progress %, visited slides — чтобы disable кнопки и считать completion rate.

### Q: "Зачем success/error states для PDF?"
**A:** Юзабилити. Пользователь должен видеть "PDF готов!" или "Ошибка, попробуй еще раз".

### Q: "Какие метрики успеха ставить?"
**A:** Зависит от цели:
- Awareness → visitors
- Engagement → completion rate  
- Leads → email/channel signups
- Revenue → lab registrations

### Q: "Что такое лиды?"
**A:** Те у кого есть контакт: email или channel subscription. Downloaded resources БЕЗ email = не лид.

### Q: "Какой A/B тест делать?"
**A:** Отличная идея: "About AI Mindset" раньше (слайд 2) vs позже (слайд 12). Metric: completion rate.

---

**Создано:** 2026-01-08  
**Next Steps:** Implement high priority TODO items before launch
