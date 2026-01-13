# Changelog - AIM Annual Report 2025 Deck

## 2025-01-10: JSON Refactoring & Shifts Renumbering

### Задача
Перевести презентацию на динамическую загрузку контента из JSON и переименовать все shifts последовательно с 01 по 11.

### Выполнено

#### 1. Scroll Navigation
- Добавлена навигация скроллом (вертикальный и горизонтальный)
- Throttling для предотвращения излишних переключений слайдов
- Работает с mouse wheel и trackpad

**Файлы:**
- `App.tsx` - добавлен wheel event listener

#### 2. JSON Export Infrastructure
- Создан скрипт экспорта всех слайдов из `reportDeck.ts` в JSON
- Экспортировано 62 слайда в `/public/locales/en/slides.json`
- Экспортирована структура секций в `/public/locales/en/sections.json`

**Файлы:**
- `scripts/export-slides-to-json.ts` - основной скрипт экспорта
- `package.json` - добавлена команда `npm run export:slides`

**Команда:**
```bash
npx tsx scripts/export-slides-to-json.ts
```

#### 3. Dynamic Content Loading
- `App.tsx` загружает slides и sections из JSON через `fetch()`
- Fallback на hardcoded `reportDeck.ts` если JSON не найден
- Автоматическая генерация ID для слайдов
- Проверка границ массива при загрузке

**Архитектура:**
```
App.tsx
  ↓ fetch('/locales/en/slides.json')
  ↓ fetch('/locales/en/sections.json')
  ↓ fallback → reportDeck.ts (SLIDES, SECTIONS)
```

#### 4. Shifts Renumbering (01-11)

**Foundation Layer (Physical/Economic Base):**
- Shift 01: The Cost → Physical Limits (Energy)
- Shift 02: The Displacement (Agentic Labor)
- Shift 03: The Sovereignty (The Splinternet)

**Cognition Layer (Thinking & Learning):**
- Shift 04: The Reasoning (The Brain)
- Shift 05: The Knowledge (The Memory)
- Shift 06: The Discovery (The Frontier)

**Interface Layer (Building & Protection):**
- Shift 07: The Craft (The End of Syntax / Coding)
- Shift 08: On-Device Models ↔ Privacy as Status

**Humanity Layer (Identity & Culture):**
- Shift 09: Machine Intimacy + Programmable Identity
- Shift 10: Data Wall (Constraint Track)
- Shift 11: Compute & Energy ↔ Return of Physics (Constraint Track)

**Файлы:**
- `reportDeck.ts` - обновлены все названия с "wave X" на "shift XX"
- `public/locales/en/slides.json` - экспортированы обновленные слайды

#### 5. Exports from reportDeck.ts
- Экспортированы `RAW_SLIDES` и `SECTIONS` для использования в скриптах
- Экспортирован тип `Section`

### Архивированные файлы

Перемещены в `archive/2025-01-10-json-refactoring/`:

#### Неиспользуемые эксперименты с i18n:
- `src/hooks/useSlides.ts` - React hook для загрузки через i18next (не используется)
- `src/i18n.ts` - конфигурация i18next (не используется, есть LanguageContext)
- `src/contentLoader.ts` - альтернативный loader (не используется)
- `src/reportDeckLoader.ts` - альтернативный loader с кешированием (не используется)
- `public/locales/en/common.json` - файл переводов (не используется)

**Причина:** App.tsx использует кастомный `LanguageContext` вместо react-i18next

#### Тестовые и backup файлы:
- `scripts/exportSlidesToJson.js` - старая JS версия скрипта (заменена на TS)
- `public/test-json.html` - тестовая страница для проверки JSON
- `intro-test.html` - тесты intro страницы
- `intro-test-backup.html` - backup intro теста
- `intro-test-funny.html` - экспериментальная версия intro

#### Backup versions reportDeck.ts:
- `reportDeck_BACKUP_before_shifts.ts` - до переименования shifts
- `reportDeck_BROKEN.ts` - сломанная версия во время рефакторинга
- `reportDeck_NEW.ts` - промежуточная версия
- `reportDeck_ORIGINAL.ts` - исходная версия до всех изменений
- `LOOPS_REORDER_ANALYSIS.md` - анализ переупорядочивания loops (устарел)

### Текущая структура проекта

**Используемые файлы:**
```
├── App.tsx                          - основное приложение, загрузка slides/sections
├── LanguageContext.tsx              - кастомный контекст языка (не i18next)
├── reportDeck.ts                    - fallback hardcoded slides
├── types.ts                         - TypeScript типы
├── scripts/
│   └── export-slides-to-json.ts     - экспорт slides → JSON
├── public/locales/en/
│   ├── slides.json                  - 62 слайда
│   └── sections.json                - 5 секций
└── components/                      - React компоненты
```

**Неиспользуемые файлы:**
- `i18n.ts` в корне (старая конфигурация, не используется)
- `slideContent.ts` (устарел)
- `src/` папка (опустела после архивации)

### Тестирование

Проверено локально на `http://localhost:5174/`:
- ✓ Все 62 слайда загружаются из JSON
- ✓ Scroll navigation работает (вертикальный и горизонтальный)
- ✓ Shifts последовательно нумерованы 01-11
- ✓ Fallback на reportDeck.ts работает при отсутствии JSON

### Следующие шаги

1. Закоммитить изменения (спросить у пользователя)
2. Запушить на GitHub для деплоя
3. Протестировать на GitHub Pages

---

## Предыдущие изменения

### 2025-01-08: Структура 11 Shifts
- Изменена структура с "10 loops" на "11 shifts"
- Организация по 4 слоям (Foundation, Cognition, Interface, Humanity)
- Скрыт слайд "For the Sovereign Individual" (временно)
