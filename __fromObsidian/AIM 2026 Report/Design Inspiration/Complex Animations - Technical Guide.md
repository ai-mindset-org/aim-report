# Complex Animations — Technical Guide

**Для:** AIM Annual Report 2025  
**Референс:** https://sleep-well-creatives.com/  
**Дата:** 2026-01-07

---

## Обзор референса

**Sleep Well Creatives** использует сложные scroll-based анимации:
- Большие 3D анимированные объекты
- Scroll-triggered transitions
- Параллакс эффекты
- Морфинг фигур
- Интерактивные элементы

---

## Техническая реализация (для junior-разработчика)

### 1. Технологический стек

**Основные библиотеки:**

```bash
npm install gsap
npm install @gsap/react
npm install locomotive-scroll
npm install lenis
```

**Альтернативы:**
- Framer Motion (уже есть в проекте) + scroll hooks
- React Spring + use-gesture
- Three.js + GSAP для 3D

---

### 2. GSAP ScrollTrigger (основной инструмент)

**Что это:**
- GSAP = GreenSock Animation Platform
- ScrollTrigger = плагин для scroll-based анимаций
- Самый мощный инструмент для таких эффектов

**Базовая структура:**

```typescript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Анимация при скролле
gsap.to('.element', {
  scrollTrigger: {
    trigger: '.element',
    start: 'top center',  // когда начинается
    end: 'bottom top',    // когда заканчивается
    scrub: true,          // привязка к скроллу
    pin: true,            // закрепить элемент
    markers: true         // debug маркеры
  },
  x: 500,                 // куда двигается
  rotation: 360,          // поворот
  scale: 2                // масштаб
});
```

---

### 3. Типы анимаций из референса

#### 3.1 Scroll-triggered появление элементов

**Эффект:** Элементы плавно появляются при скролле

**Реализация:**

```typescript
gsap.from('.card', {
  scrollTrigger: {
    trigger: '.card',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  },
  opacity: 0,
  y: 100,
  duration: 1,
  stagger: 0.2  // задержка между элементами
});
```

**Где использовать в AIM:**
- Появление Loop cards
- Evidence слайды
- Stats blocks

---

#### 3.2 Pinned sections с прогрессивной анимацией

**Эффект:** Секция "приклеивается" пока внутри нее что-то анимируется

**Реализация:**

```typescript
ScrollTrigger.create({
  trigger: '.section',
  start: 'top top',
  end: '+=3000',  // длина анимации в пикселях
  pin: true,
  scrub: true
});

// Анимации внутри pinned section
gsap.to('.inner-element', {
  scrollTrigger: {
    trigger: '.section',
    start: 'top top',
    end: '+=3000',
    scrub: true
  },
  scale: 2,
  rotation: 180
});
```

**Где использовать в AIM:**
- Loop intro slides (текст остается, а визуал меняется)
- Thesis presentation (тезис на экране, примеры скроллятся)
- Gap visualization (поверхность "разрывается" при скролле)

---

#### 3.3 Большие SVG/3D анимации

**Эффект:** Сложные объекты морфятся и трансформируются

**Подход 1: SVG морфинг через GSAP**

```typescript
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
gsap.registerPlugin(MorphSVGPlugin);

gsap.to('#shape1', {
  scrollTrigger: {
    trigger: '.container',
    scrub: true
  },
  morphSVG: '#shape2',  // морфинг в другую форму
  duration: 2
});
```

**Подход 2: 3D объекты через Three.js**

```typescript
import { useFrame } from '@react-three/fiber';

function AnimatedMesh() {
  const meshRef = useRef();
  
  useFrame((state) => {
    // Анимация на основе scroll position
    const scrollY = window.scrollY;
    meshRef.current.rotation.x = scrollY * 0.001;
    meshRef.current.scale.set(
      1 + scrollY * 0.0005,
      1 + scrollY * 0.0005,
      1 + scrollY * 0.0005
    );
  });
  
  return <mesh ref={meshRef}>...</mesh>;
}
```

**Где использовать в AIM:**
- Hero slide: большой "CONTEXT GAP" с 3D эффектом
- Loop transitions: геометрия морфится
- Visual metaphors: существующие SVG делаем интерактивными

---

#### 3.4 Параллакс эффекты

**Эффект:** Разные элементы двигаются с разной скоростью

**Реализация:**

```typescript
// Фон двигается медленнее переднего плана
gsap.to('.background', {
  scrollTrigger: {
    trigger: '.section',
    scrub: true
  },
  y: '-50%'  // двигается на 50%
});

gsap.to('.foreground', {
  scrollTrigger: {
    trigger: '.section',
    scrub: true
  },
  y: '-100%'  // двигается на 100% (быстрее)
});
```

**Где использовать в AIM:**
- Создать глубину между текстом и фоном
- Loop layers (Machine / Human / Gap на разных слоях)

---

#### 3.5 Текстовые анимации (SplitText)

**Эффект:** Буквы/слова появляются по одной

**Реализация:**

```typescript
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(SplitText);

const split = new SplitText('.title', { type: 'chars' });

gsap.from(split.chars, {
  scrollTrigger: {
    trigger: '.title',
    start: 'top 80%'
  },
  opacity: 0,
  y: 50,
  rotationX: -90,
  stagger: 0.02,
  duration: 0.8
});
```

**Где использовать в AIM:**
- Заголовки loops ("CONTEXT GAP", "TRUST FATIGUE" и т.д.)
- Thesis statement (буквы по одной)
- Stats numbers (цифры анимируются)

---

### 4. Smooth scrolling (Lenis/Locomotive)

**Зачем нужно:**
- Плавный scroll (как на Mac, но везде)
- Лучше работает с scroll-based анимациями
- Профессиональный feel

**Реализация с Lenis:**

```typescript
import Lenis from '@studio-freight/lenis';

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Интеграция с GSAP
lenis.on('scroll', ScrollTrigger.update);
```

---

### 5. Performance optimization

**Важные правила:**

1. **Используй `will-change` CSS:**
```css
.animated-element {
  will-change: transform, opacity;
}
```

2. **Анимируй только transform и opacity:**
```typescript
// ✅ Хорошо (GPU accelerated)
gsap.to('.el', { x: 100, scale: 2, opacity: 0.5 });

// ❌ Плохо (reflow/repaint)
gsap.to('.el', { width: '500px', height: '300px' });
```

3. **Lazy load heavy animations:**
```typescript
// Загружай Three.js scene только когда видна
const [shouldRender, setShouldRender] = useState(false);

useEffect(() => {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) setShouldRender(true);
  });
  observer.observe(ref.current);
}, []);
```

4. **Throttle scroll events:**
```typescript
ScrollTrigger.config({
  syncInterval: 16  // ~60fps
});
```

---

### 6. Структура файлов для AIM проекта

```
src/
  animations/
    gsap/
      scrollAnimations.ts    # Все ScrollTrigger анимации
      textAnimations.ts      # Split text эффекты
      morphAnimations.ts     # SVG морфинг
    config/
      gsapConfig.ts          # GSAP setup и plugins
      lenisConfig.ts         # Smooth scroll setup
  components/
    AnimatedSection/
      index.tsx              # Wrapper для анимируемых секций
    ScrollProgress/
      index.tsx              # Progress bar
```

---

### 7. Конкретный план для AIM Report

#### Phase 1: Базовая интеграция

**Задачи:**
1. ✅ Установить GSAP + ScrollTrigger
2. ✅ Настроить Lenis для smooth scroll
3. ✅ Создать wrapper компонент `<AnimatedSlide>`
4. ✅ Добавить fade-in анимации для всех слайдов

#### Phase 2: Enhanced transitions

**Задачи:**
1. ✅ Pin loop-intro slides с прогрессивным reveal
2. ✅ Параллакс для Machine/Human/Gap секций
3. ✅ Морфинг для visual metaphors
4. ✅ Stats counter animations

#### Phase 3: Hero & advanced effects

**Задачи:**
1. ✅ Большой hero slide с 3D title
2. ✅ Interactive background (Three.js + scroll)
3. ✅ Loop transitions с геометрией
4. ✅ Финальный эпик слайд

---

### 8. Референсы и туториалы

**GSAP:**
- [GSAP ScrollTrigger Docs](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [GSAP + React](https://greensock.com/react)

**Примеры:**
- [Awwwards GSAP collection](https://www.awwwards.com/websites/gsap/)
- [Codrops scroll effects](https://tympanus.net/codrops/)

**Видео:**
- GSAP официальный YouTube канал
- Creative Coding with Canvas (для Canvas animations)

---

### 9. Чек-лист для junior-разработчика

**Перед началом:**
- [ ] Изучить базовый GSAP API (1-2 часа)
- [ ] Посмотреть примеры ScrollTrigger (1 час)
- [ ] Прочитать документацию Lenis (30 минут)

**Разработка:**
- [ ] Настроить GSAP в проекте ✅
- [ ] Добавить smooth scroll ✅
- [ ] Создать первую scroll-triggered анимацию ✅
- [ ] Тестировать на разных устройствах ✅
- [ ] Оптимизировать performance ✅

**Тестирование:**
- [ ] 60 FPS на desktop
- [ ] 30+ FPS на mobile
- [ ] Работает без JavaScript (graceful degradation)
- [ ] Доступность (keyboard navigation)

---

### 10. Альтернативный подход: Framer Motion

**Если хотим остаться на Framer Motion:**

```typescript
import { motion, useScroll, useTransform } from 'framer-motion';

function ScrollAnimation() {
  const { scrollYProgress } = useScroll();
  
  const scale = useTransform(scrollYProgress, [0, 1], [1, 2]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  
  return (
    <motion.div style={{ scale, opacity }}>
      Animated content
    </motion.div>
  );
}
```

**Плюсы Framer Motion:**
- Уже в проекте
- React-first API
- Проще для базовых анимаций

**Минусы Framer Motion:**
- Менее мощный для сложных scroll эффектов
- Нет pin/scrub из коробки
- Хуже performance для тяжелых анимаций

**Рекомендация:** 
- Framer Motion для простых transitions
- GSAP для сложных scroll-based эффектов
- Можно использовать оба вместе

---

## Бонус: Интерактивный 3D фон (Glenn Catteeuw style)

**Референс:** https://glenncatteeuw.com/

### Как сделать живую "гору" на фоне

**Технологии:**
- React Three Fiber + drei
- Custom shaders (GLSL)
- Perlin/Simplex noise
- Mouse/scroll tracking

**Быстрый старт:**

```bash
npm install three @react-three/fiber @react-three/drei simplex-noise
```

**Базовая структура:**

```typescript
import { Canvas, useFrame } from '@react-three/fiber';
import { createNoise2D } from 'simplex-noise';

function AnimatedPlane() {
  const meshRef = useRef();
  const noise2D = createNoise2D();
  
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const geometry = meshRef.current.geometry;
    const positions = geometry.attributes.position.array;
    
    // Деформируем каждую вершину
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      
      // Применяем noise для органичного движения
      positions[i + 2] = noise2D(
        x * 0.3 + time * 0.1,
        y * 0.3 + time * 0.1
      ) * 2;
    }
    
    geometry.attributes.position.needsUpdate = true;
  });
  
  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[10, 10, 128, 128]} />
      <meshStandardMaterial color="#ff0000" wireframe />
    </mesh>
  );
}

export default function Background() {
  return (
    <Canvas style={{ position: 'fixed', zIndex: -1 }}>
      <ambientLight intensity={0.5} />
      <AnimatedPlane />
    </Canvas>
  );
}
```

**Для AIM проекта:**
- Не "гора", а абстрактная поверхность = "context space"
- Цвета: красный → черный (Swiss brutalist палитра)
- Деформации показывают "saturation" и "gap"
- Реакция на scroll: усиление "разрывов" при прохождении loops

**Подробнее:** См. Marketing Pile — Glenn Catteeuw референс

---

## Итог

**Для реализации анимаций как на sleep-well-creatives.com нужно:**

1. **GSAP ScrollTrigger** — основной инструмент
2. **Lenis/Locomotive** — smooth scrolling
3. **Three.js** (опционально) — 3D эффекты
4. **Терпение и тестирование** — анимации требуют tuning

**Ожидаемый результат:**
- Профессиональные scroll-based анимации
- Плавные переходы между слайдами
- Интерактивные визуальные элементы
- 60 FPS performance

---

**Создано:** 2026-01-07  
**Для проекта:** AIM Annual Report 2025
