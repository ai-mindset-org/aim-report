# Sleep Well Creatives — Детальный разбор анимаций

**Сайт:** https://sleep-well-creatives.com/  
**Для проекта:** AIM Annual Report 2025  
**Дата:** 2026-01-07

---

## Обзор

Sleep Well Creatives — пример премиум scroll-based презентации с:
- Большими сложными SVG/Canvas анимациями
- Плавными scroll-triggered transitions
- Интерактивными иллюстрациями
- Pinned sections с прогрессивным reveal
- Типографскими эффектами

---

## Разбор конкретных анимаций

### 1. Entrance Animation (заставка)

**Что видим:**
- Большой загрузочный экран "Enter Site"
- Прогресс-бар загрузки (0/100)
- Плавное fade-in после загрузки

**Как сделано:**

```typescript
// Компонент загрузки
function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Симулируем загрузку ассетов
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <h1>Enter Site</h1>
      <div className="progress">{Math.floor(progress)}/100</div>
    </motion.div>
  );
}
```

**Применение в AIM:**
- Можно добавить loading screen перед презентацией
- Прогресс показывает "готовность" к погружению в контент

---

### 2. Hero Title Animation (большие заголовки)

**Что видим:**
- Огромные слова "SLEEP WELL CREATIVE"
- Слова появляются с задержкой
- Плавный scroll вниз

**Как сделано:**

```typescript
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

function HeroTitle() {
  useEffect(() => {
    const split = new SplitText('.hero-title', { 
      type: 'words,chars' 
    });
    
    gsap.from(split.words, {
      opacity: 0,
      y: 100,
      rotationX: -90,
      stagger: 0.1,
      duration: 1.2,
      ease: 'power4.out'
    });
  }, []);
  
  return (
    <h1 className="hero-title text-[15vw] font-black leading-none">
      SLEEP WELL CREATIVE
    </h1>
  );
}
```

**Применение в AIM:**
- Hero slide: "THE CONTEXT GAP"
- Каждый Loop intro: большое название loop
- Финальный слайд: эпичное завершение

---

### 3. Pinned Section с прогрессивной анимацией

**Что видим:**
- Секция "01 SLEEP ISN'T A LUXURY"
- Секция "закреплена" на экране
- Пока скроллишь, внутри анимируется:
  - Текст появляется/исчезает
  - Иллюстрации трансформируются
  - Цифры меняются

**Как сделано:**

```typescript
useEffect(() => {
  // Закрепляем секцию
  ScrollTrigger.create({
    trigger: '.section-01',
    start: 'top top',
    end: '+=2000',  // длина pinned section в пикселях
    pin: true,
    anticipatePin: 1
  });
  
  // Анимация 1: Fade-in текста
  gsap.from('.section-01 .text-1', {
    scrollTrigger: {
      trigger: '.section-01',
      start: 'top top',
      end: '+=500',
      scrub: true
    },
    opacity: 0,
    y: 50
  });
  
  // Анимация 2: Появление иллюстрации
  gsap.from('.section-01 .illustration', {
    scrollTrigger: {
      trigger: '.section-01',
      start: 'top top+=500',
      end: '+=1000',
      scrub: true
    },
    scale: 0.5,
    rotation: -180,
    opacity: 0
  });
  
  // Анимация 3: Fade-out всей секции
  gsap.to('.section-01', {
    scrollTrigger: {
      trigger: '.section-01',
      start: 'top+=1500 top',
      end: '+=500',
      scrub: true
    },
    opacity: 0
  });
}, []);
```

**Применение в AIM:**
- Каждый Loop = pinned section
- Machine Signal → Human Signal → Gap = 3 фазы анимации
- Пока пользователь скроллит, история раскрывается

---

### 4. Animated Illustrations (большие SVG анимации)

**Что видим:**
- Большая иллюстрация "Rebooting the system"
- Круги, волны, элементы двигаются
- Плавная непрерывная анимация

**Подход 1: SVG + GSAP**

```typescript
function AnimatedIllustration() {
  useEffect(() => {
    // Бесконечная анимация элементов
    gsap.to('.circle-1', {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: 'none'
    });
    
    gsap.to('.wave-path', {
      attr: { d: 'M0,50 Q25,25 50,50 T100,50' },
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
    
    // Pulsing эффект
    gsap.to('.glow', {
      opacity: 0.3,
      scale: 1.2,
      duration: 1.5,
      repeat: -1,
      yoyo: true
    });
  }, []);
  
  return (
    <svg viewBox="0 0 1000 1000">
      <circle className="circle-1" cx="500" cy="500" r="200" />
      <path className="wave-path" d="..." />
      <g className="glow">...</g>
    </svg>
  );
}
```

**Подход 2: Canvas Animation**

```typescript
function CanvasAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let frame = 0;
    
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Рисуем анимированные элементы
      drawCircles(ctx, frame);
      drawWaves(ctx, frame);
      drawParticles(ctx, frame);
      
      frame++;
      requestAnimationFrame(animate);
    }
    
    animate();
  }, []);
  
  function drawCircles(ctx, frame) {
    const angle = (frame * 0.02) % (Math.PI * 2);
    ctx.beginPath();
    ctx.arc(500 + Math.cos(angle) * 100, 500, 50, 0, Math.PI * 2);
    ctx.fill();
  }
  
  return <canvas ref={canvasRef} width={1000} height={1000} />;
}
```

**Применение в AIM:**
- Visual metaphors для каждого loop
- Существующие SVG сделать анимированными
- Добавить "живость" статичным иллюстрациям

---

### 5. Number Counter Animation

**Что видим:**
- "8:00h Minimum duration"
- Цифры анимированно считают от 0 до 8

**Как сделано:**

```typescript
function CounterAnimation({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef();
  
  useEffect(() => {
    gsap.to({ value: 0 }, {
      value: target,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      onUpdate: function() {
        setCount(Math.floor(this.targets()[0].value));
      }
    });
  }, [target]);
  
  return (
    <div ref={ref} className="text-6xl font-black">
      {count}{suffix}
    </div>
  );
}

// Использование
<CounterAnimation target={8} suffix=":00h" />
```

**Применение в AIM:**
- Stats слайды (84%, 6%, 126% и т.д.)
- Loop numbers (01 → 10)
- Любые метрики в Evidence слайдах

---

### 6. Circular Progress (круговой прогресс)

**Что видим:**
- Круглые часы показывают время (00.00 → 06.57)
- Круговой прогресс заполняется

**Как сделано:**

```typescript
function CircularProgress({ progress }) {
  const circumference = 2 * Math.PI * 120; // radius = 120
  const offset = circumference - (progress / 100) * circumference;
  
  useEffect(() => {
    gsap.to('.progress-circle', {
      strokeDashoffset: offset,
      scrollTrigger: {
        trigger: '.progress-wrapper',
        start: 'top 80%',
        end: 'top 20%',
        scrub: true
      }
    });
  }, [offset]);
  
  return (
    <svg width="300" height="300">
      <circle
        cx="150"
        cy="150"
        r="120"
        fill="none"
        stroke="#ddd"
        strokeWidth="8"
      />
      <circle
        className="progress-circle"
        cx="150"
        cy="150"
        r="120"
        fill="none"
        stroke="#ff0000"
        strokeWidth="8"
        strokeDasharray={circumference}
        strokeDashoffset={circumference}
        transform="rotate(-90 150 150)"
      />
    </svg>
  );
}
```

**Применение в AIM:**
- Loop progress indicator
- Визуализация "заполнения" контекста
- Gap визуализация через circular chart

---

### 7. Scroll Progress Bar

**Что видим:**
- Индикаторы "1 2 3 4 5 6" наверху
- Текущая секция подсвечена

**Как сделано:**

```typescript
function ScrollProgress() {
  const [activeSection, setActiveSection] = useState(1);
  const totalSections = 6;
  
  useEffect(() => {
    const sections = gsap.utils.toArray('.section');
    
    sections.forEach((section, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveSection(i + 1),
        onEnterBack: () => setActiveSection(i + 1)
      });
    });
  }, []);
  
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 flex gap-4">
      {Array.from({ length: totalSections }).map((_, i) => (
        <div
          key={i}
          className={`w-8 h-8 rounded-full flex items-center justify-center
            ${activeSection === i + 1 ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
}
```

**Применение в AIM:**
- Уже есть loop indicators (цветные точки)
- Можно добавить цифры 1-10
- Улучшить визуальную обратную связь

---

### 8. Morphing Shapes (морфинг фигур)

**Что видим:**
- Фигуры плавно трансформируются одна в другую
- Сложные органичные формы

**Как сделано:**

```typescript
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';

gsap.registerPlugin(MorphSVGPlugin);

function MorphingShape() {
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.morph-container',
        start: 'top center',
        end: 'bottom center',
        scrub: true
      }
    });
    
    tl.to('#shape', {
      morphSVG: '#shape-2',
      duration: 1
    })
    .to('#shape', {
      morphSVG: '#shape-3',
      duration: 1
    });
  }, []);
  
  return (
    <svg viewBox="0 0 1000 1000">
      {/* Видимая фигура */}
      <path id="shape" d="M100,100 L200,200..." />
      
      {/* Скрытые целевые фигуры */}
      <path id="shape-2" d="M150,150 C..." style={{ display: 'none' }} />
      <path id="shape-3" d="M200,200 Q..." style={{ display: 'none' }} />
    </svg>
  );
}
```

**Применение в AIM:**
- Visual metaphors: circle → chaos
- Machine → Human трансформация
- Gap visualization (форма "разрывается")

---

### 9. Parallax Layers

**Что видим:**
- Фон двигается медленнее переднего плана
- Создается эффект глубины

**Как сделано:**

```typescript
function ParallaxSection() {
  useEffect(() => {
    // Слой 1: фон (медленно)
    gsap.to('.bg-layer', {
      y: '-30%',
      scrollTrigger: {
        trigger: '.parallax-container',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
    
    // Слой 2: средний план
    gsap.to('.mid-layer', {
      y: '-50%',
      scrollTrigger: {
        trigger: '.parallax-container',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
    
    // Слой 3: передний план (быстро)
    gsap.to('.fg-layer', {
      y: '-80%',
      scrollTrigger: {
        trigger: '.parallax-container',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  }, []);
  
  return (
    <div className="parallax-container relative h-screen overflow-hidden">
      <div className="bg-layer absolute">Background</div>
      <div className="mid-layer absolute">Middle</div>
      <div className="fg-layer absolute">Foreground</div>
    </div>
  );
}
```

**Применение в AIM:**
- Создать глубину между текстом и визуалами
- Machine / Human / Gap на разных z-layers
- Добавить "объем" плоскому дизайну

---

### 10. Interactive Hover Effects

**Что видим:**
- При наведении на элементы они реагируют
- Плавные микро-анимации

**Как сделано:**

```typescript
function InteractiveCard() {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="card p-8 bg-white rounded-lg cursor-pointer"
    >
      <h3>Interactive Element</h3>
    </motion.div>
  );
}
```

**Применение в AIM:**
- Evidence cards при hover
- Loop indicators (увеличиваются)
- Stats blocks (подсветка)

---

## Технический стек Sleep Well Creatives

**Вероятные технологии:**

1. **GSAP ScrollTrigger** — для всех scroll-based анимаций
2. **Lenis или Locomotive Scroll** — smooth scrolling
3. **SVG + GSAP** — для иллюстраций
4. **Canvas** — для некоторых particle effects
5. **Framer Motion** или **GSAP** — для микро-интеракций
6. **SplitText plugin** — для типографских эффектов

---

## План интеграции в AIM проект

### Phase 1: Foundation
- [ ] Установить GSAP + ScrollTrigger + SplitText
- [ ] Настроить Lenis smooth scroll
- [ ] Создать базовую структуру pinned sections

### Phase 2: Hero & Typography
- [ ] Большой hero title с SplitText animation
- [ ] Loop titles с эффектами появления
- [ ] Thesis statement с драматичным reveal

### Phase 3: Visual Enhancements
- [ ] Анимировать существующие SVG metaphors
- [ ] Добавить number counters для stats
- [ ] Circular progress для loop indicators

### Phase 4: Advanced Interactions
- [ ] Pinned sections для каждого loop
- [ ] Прогрессивное появление Machine/Human/Gap
- [ ] Морфинг фигур для transitions

### Phase 5: Polish
- [ ] Hover effects на cards
- [ ] Параллакс для глубины
- [ ] Loading screen
- [ ] Final optimizations

---

## Performance Considerations

**Важные правила:**

1. **Используй `will-change` для анимируемых элементов**
```css
.animated {
  will-change: transform, opacity;
}
```

2. **Debounce scroll events**
```typescript
ScrollTrigger.config({
  syncInterval: 16,  // ~60fps
  autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load'
});
```

3. **Lazy load тяжелые анимации**
```typescript
const shouldAnimate = useIntersectionObserver(ref);
```

4. **Анимируй только transform и opacity**
```typescript
// ✅ Good (GPU accelerated)
gsap.to(el, { x: 100, scale: 1.5, opacity: 0.5 });

// ❌ Bad (causes reflow)
gsap.to(el, { width: '500px', left: '100px' });
```

---

## Итоговые рекомендации

**Для AIM проекта стоит взять:**

1. ✅ **Pinned sections** — идеально для loops
2. ✅ **Number counters** — для stats
3. ✅ **SplitText effects** — для заголовков
4. ✅ **Smooth scroll** — премиум feel
5. ✅ **SVG animations** — оживить metaphors

**Можно пропустить:**

1. ❌ Loading screen — не критично
2. ❌ Сложный морфинг — может быть избыточно
3. ❌ Слишком много parallax — может отвлекать

**Главное:**
- Анимации должны **усиливать message**, а не отвлекать
- Performance > визуальная сложность
- Тестировать на разных устройствах

---

## Референсы и ресурсы

**GSAP:**
- [ScrollTrigger Docs](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [SplitText Plugin](https://greensock.com/docs/v3/Plugins/SplitText)
- [MorphSVG Plugin](https://greensock.com/docs/v3/Plugins/MorphSVGPlugin)

**Примеры:**
- [GSAP Showcase](https://greensock.com/showcase)
- [Awwwards GSAP sites](https://www.awwwards.com/websites/gsap/)

**Видео туториалы:**
- GSAP Official YouTube
- Ihatetomatoes GSAP course

---

**Создано:** 2026-01-07  
**Для проекта:** AIM Annual Report 2025  
**Связанные файлы:** [[Complex Animations - Technical Guide]]
