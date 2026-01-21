# AIM Annual Report 2025 – Task List

## В РАБОТЕ

### 1. SVG-метафоры из референса
- [x] Перенести 50+ SVG-метафор из gac-c-reference/components/Visuals.tsx
- [x] Заменить текущие VISUAL_MAP на новые анимированные
- [x] Добавить visual: gap на второй слайд с красивым GAP-эффектом

### 2. Новые типы слайдов
- [x] Добавить layout: 'loop' (4-частный: Machine / Human / Gap / Move)
- [x] Добавить layout: 'cards' (для философов/сравнений)
- [x] Добавить layout: 'gallery' (Visual Metaphor Index)
- [x] Добавить layout: 'manifesto' (для Builder OS)

### 3. Двухцветные слайды с анимациями
- [x] Добавить dark: true для контрастных слайдов
- [x] Улучшить анимации transitions

### 4. Цитаты комьюнити крупным шрифтом
- [x] Обновить QuoteLayout с крупным текстом (3xl → 5xl)
- [x] Добавить вращающийся Quote icon в фоне (20rem watermark)

### 5. Интерактивные Sources
- [ ] Сделать sources кликабельными (открываются по hover/click)
- [ ] Добавить боковую панель с context

### 6. Слайды с большим текстом
- [x] Добавить слайды типа 'text-heavy' с описаниями (Labs evidence + internal docs blocks)
- [ ] Добавить фреймворки и детальные блоки

### 7. Lead Gate (заглушка)
- [x] Вернуть modal для скачивания PDF
- [x] Убрать проверку валидности email (но оставить форму)
- [x] Добавить "Skip for now" кнопку
- [x] Оставить форму как заглушку для будущего

### 8. Navigation hints
- [x] Добавить "Press SPACE to Navigate" на cover слайдах
- [x] Добавить анимированную стрелку вниз

### 9. Данные и графики
- [ ] Добавить графики из McKinsey/Stanford HAI
- [ ] Улучшить stats слайды с визуализациями

### 10. PDF Export
- [x] Исправить размеры при экспорте
- [x] Добавить локальные шрифты
- [x] Экспорт работает на весь экран (авто-scale-to-fit + фикс 16:9)
- [x] Добавить password gate на экспорт (через `VITE_PDF_PASSWORD`)
- [x] Добавить .env.example с документацией

### 11. Fit-to-screen (презентация в браузере)
- [x] Авто-scale-to-fit в main stage (если слайд не влезает — слегка уменьшаем)
- [x] Loop layout: уменьшить типографику/паддинги, чтобы не было клиппинга

### 12. Loop визуальные метафоры
- [x] Создать LoopTransition.tsx с 5 вариантами анимаций (spiral, infinity, orbit, wave, default)
- [x] Интегрировать в loop layout (orbit animation для каждого лупа)
- [x] Добавить infinity animation для LOOPS section divider

---

## ВЫПОЛНЕНО (2025-12-24)
- [x] Убрал email валидацию для PDF экспорта
- [x] Добавил локальные шрифты (IBM Plex Mono, Playfair Display)
- [x] Исправил CORS проблему с Google Fonts
- [x] Увеличил размеры шрифтов во всех layouts
- [x] Улучшил первый слайд (cover) - теперь крупнее и читаемее
- [x] Добавил "Press SPACE to Navigate" на первый слайд
- [x] Вернул Lead Gate модал (без строгой валидации)
- [x] Улучшил paired layout с цветными блоками
- [x] Добавил dark mode support (dark: true на слайдах)
- [x] Создал LoopTransition компонент с анимированными SVG лупами
- [x] Улучшил quote layout с крупным текстом и rotating watermark
- [x] Добавил .env.example

---

## PDF PASSWORD PROTECTION

Для защиты PDF экспорта паролем:
1. Скопируйте `.env.example` в `.env.local`
2. Установите `VITE_PDF_PASSWORD=your_password`
3. Пользователи должны будут ввести пароль для скачивания PDF

---

## BACKLOG (2026-01-06)

### 13. Интернационализация (i18n)
- [ ] Вернуть русский язык
- [ ] Вернуть белорусский язык
- [ ] Создать language switcher в UI

### 14. Evidence слайды — улучшения
- [ ] Удалить дублицирующиеся ссылки на разных evidence slides
- [ ] Усилить evidence за счёт Founder OS Videos (см. Loops Mapping)
- [ ] Добавить ссылки на артефакты AIM:
  - [ ] [ivanov.aimindset.org](https://ivanov.aimindset.org/) — IFS + AI (Loop 10)
  - [ ] [intention.aimindset.org](https://intention.aimindset.org/) — Intention OS (Loop 2)
  - [ ] [spiridonov.aimindset.org](https://spiridonov.aimindset.org/) — Прагматичный романтизм

### 15. Верстка слайдов
- [ ] Поправить верстку проблемных слайдов
- [ ] Проверить отображение на разных разрешениях
- [ ] Убедиться, что все loop-evidence слайды выглядят консистентно

### 16. Founder OS Video интеграция
- [ ] Loop 2 (Orchestration): FOS #12 Intention OS — Mike Yan
- [ ] Loop 7 (Coding Agents): FOS #4 Команда в Cursor
- [ ] Loop 10 (Machine Intimacy): FOS #14 IFS + AI — Алексей Иванов
- [ ] Loop 10 (Machine Intimacy): FOS #6 AI в терапии — Ольга, Виктория

---

## ВЫПОЛНЕНО (2026-01-06)
- [x] Сделать навигацию монохромной (красный вместо радуги)
- [x] Добавить 10 Evidence слайдов (loop-evidence layout)
- [x] Создать новый layout type: loop-evidence
- [x] Интегрировать данные из Extended Industry Research
- [x] Добавить QR-код на финальный слайд (Telegram @ai_mind_set)
- [x] Улучшить sources layout (3-колоночный компактный дизайн)
- [x] Обновить Agents.md с актуальным состоянием кодовой базы

---

## РЕФЕРЕНСЫ
- `/Users/alex/Library/CloudStorage/Dropbox/notes/__context/the-context-gap---2025-report – 2/`
- `/Users/alex/Library/CloudStorage/Dropbox/notes/code tools/gac-c-reference/`
- GitHub: https://github.com/aPoWall/gac-c
