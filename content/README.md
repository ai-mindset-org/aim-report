# Content Editing Workflow

## Как редактировать контент презентации

### Быстрый старт:

1. **Редактируй файл:**
   ```
   content/slides.md
   ```

2. **Когда готова к деплою:**
   ```bash
   npm run deploy
   ```

Всё! Эта команда автоматически:
- ✓ Конвертирует MD → JSON
- ✓ Коммитит изменения
- ✓ Пушит на GitHub
- ✓ GitHub Actions деплоит на Pages

---

## Формат slides.md

Каждый слайд разделяется `---` и содержит:

```markdown
---
title: заголовок слайда
subtitle: подзаголовок (опционально)
visual: название визуала
layout: тип layout
caption: текст caption (опционально)

Содержимое слайда в обычном markdown.

Можно использовать **жирный**, *курсив*, списки, параграфы.

Пустые строки создают новый параграф.
```

### Примеры:

**Простой слайд:**
```markdown
---
title: shift 01: the cost
subtitle: energy is the new bottleneck
visual: flame
layout: loop

AI training costs are exploding.

GPT-4 training: **$100M** in compute.

Energy is finite. Scale is not.
```

**Слайд с caption:**
```markdown
---
title: the context gap
subtitle: ai is accelerating. humans are buffering.
visual: hero_cover
layout: center
caption: |
  a yearly reset artifact by ai mindset + community.
  a sovereignty reset for people running their own life.
```

---

## Доступные визуалы:

- `hero_cover` - обложка
- `breath` - дыхание/пульс
- `network` - сеть
- `map` - карта
- `lighthouse` - маяк
- `foundation` - фундамент
- `flame` - пламя (энергия)
- `pulse_workforce` - пульс (труд)
- `fracture` - трещина (суверенитет)
- `brain` - мозг (reasoning)
- `library` - библиотека (память)
- `telescope` - телескоп (открытия)
- `centaur` - кентавр (craft)
- `unlocked` - разблокировано (privacy)
- `echo` - эхо (intimacy)
- `barrier` - барьер (data wall)
- `pulse` - пульс (compute)
- `compass` - компас
- `fade` - затухание

---

## Доступные layouts:

- `center` - центрированный текст
- `split` - текст + визуал
- `loop-intro` - intro слайд для shift
- `loop` - полный слайд shift
- `loop-evidence` - evidence слайд (нужен `loopNumber`)
- `section-intro` - intro секции
- `summary` - итоговый слайд
- `credits` - credits слайд
- `end` - финальный слайд

---

## Команды:

```bash
# Deploy на production (делает всё автоматически)
npm run deploy

# Dev server (тестирование локально)
npm run dev

# Дополнительные (обычно не нужны):
npm run content:update  # Только конвертация MD → JSON
npm run content:watch   # Watcher для live-редактирования
```

---

## Workflow:

```
1. Редактируешь: content/slides.md
   ↓
2. Запускаешь: npm run deploy
   ↓ автоматически
3. MD → JSON + commit + push
   ↓ автоматически
4. GitHub Actions → deploy на Pages
```

---

## Troubleshooting:

**Изменения не применяются?**
- Проверь что watcher запущен (`npm run content:watch`)
- Проверь консоль на ошибки парсинга

**Ошибка парсинга?**
- Убедись что каждый слайд начинается с `---`
- Проверь что все метаданные в формате `key: value`

**JSON не обновляется?**
- Запусти вручную: `npm run content:update`
- Проверь путь к файлу: `content/slides.md`

---

## Файлы:

- `content/slides.md` - **ОСНОВНОЙ ФАЙЛ** для редактирования
- `public/locales/en/slides.json` - генерируется автоматически
- `public/locales/en/sections.json` - генерируется автоматически
- `reportDeck.ts` - fallback (НЕ редактировать)
