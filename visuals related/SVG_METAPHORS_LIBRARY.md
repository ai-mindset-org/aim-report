# SVG Metaphors & Animations Library

Коллекция всех SVG визуальных метафор и анимаций из проекта AIM Annual Report 2025.

## Цвета

```javascript
const RED = "#DC2626";
const BLACK = "#333333";
```

---

## 1. CONTEXT_GAP_COVER

Главная визуальная метафора: две расходящиеся кривые представляющие Context Gap - машинная способность ускоряется vs человеческая адаптация отстает.

```jsx
<div className="relative w-full h-full flex items-center justify-center overflow-hidden">
  <svg viewBox="0 0 400 200" className="w-full h-full max-w-2xl" preserveAspectRatio="xMidYMid meet">
    {/* Background grid (subtle) */}
    <defs>
      <pattern id="coverGrid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.1" />
      </pattern>
    </defs>
    <rect width="400" height="200" fill="url(#coverGrid)" />

    {/* Starting point - shared origin */}
    <circle cx="40" cy="120" r="6" fill="#333333" />

    {/* Machine curve - exponential rise (red) */}
    <motion.path
      d="M40 120 C 80 120, 120 115, 160 100 C 200 85, 260 50, 360 15"
      fill="none"
      stroke="#DC2626"
      strokeWidth="4"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2.5, ease: "easeOut" }}
    />

    {/* Human curve - slower adaptation (black/gray) */}
    <motion.path
      d="M40 120 C 80 120, 120 125, 160 135 C 200 145, 260 160, 360 180"
      fill="none"
      stroke="#333333"
      strokeWidth="4"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
    />

    {/* Gap visualization - vertical dashed lines showing distance */}
    {[160, 220, 280, 340].map((x, i) => {
      const machineY = x === 160 ? 100 : x === 220 ? 70 : x === 280 ? 40 : 20;
      const humanY = x === 160 ? 135 : x === 220 ? 150 : x === 280 ? 165 : 178;
      return (
        <motion.line
          key={i}
          x1={x}
          y1={machineY}
          x2={x}
          y2={humanY}
          stroke="#DC2626"
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity="0.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 2 + i * 0.2 }}
        />
      );
    })}

    {/* Labels */}
    <motion.text
      x="365"
      y="20"
      fontSize="10"
      fontFamily="monospace"
      fill="#DC2626"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.5 }}
    >
      MACHINES
    </motion.text>
    <motion.text
      x="365"
      y="185"
      fontSize="10"
      fontFamily="monospace"
      fill="#333333"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.8 }}
    >
      HUMANS
    </motion.text>

    {/* GAP label in the middle */}
    <motion.g
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 3, duration: 0.5 }}
    >
      <rect x="245" y="85" width="50" height="24" fill="white" stroke="#DC2626" strokeWidth="1" />
      <text x="270" y="101" fontSize="10" fontFamily="monospace" fill="#DC2626" textAnchor="middle" fontWeight="bold">
        GAP
      </text>
    </motion.g>

    {/* Animated pulse on the gap */}
    <motion.circle
      cx="270"
      cy="97"
      r="30"
      fill="none"
      stroke="#DC2626"
      strokeWidth="1"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
      transition={{ duration: 3, repeat: Infinity, delay: 3.5 }}
    />
  </svg>
</div>
```

---

## 2. SOLSTICE_SUN

Солнцестояние - солнце поднимается над горизонтом.

```jsx
<div className="relative w-full h-full flex items-center justify-center">
  <motion.div
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    transition={{ duration: 1, ease: "circOut" }}
    className="w-full h-[2px] bg-black absolute"
  />
  <motion.div
    initial={{ y: 150 }}
    animate={{ y: 0 }}
    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
    className="w-48 h-48 rounded-full bg-red-600 z-10 mix-blend-multiply"
    style={{ marginBottom: '-2px' }}
  />
</div>
```

---

## 3. SECTION_DIVIDER

Разделитель секций с красными линиями.

```jsx
<div className="relative w-full h-full flex items-center justify-center">
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="flex flex-col items-center gap-4"
  >
    <div className="w-32 h-1 bg-red-600" />
    {sectionTitle && (
      <span className="text-6xl md:text-8xl font-black text-red-600 tracking-tighter">
        {sectionTitle}
      </span>
    )}
    <div className="w-32 h-1 bg-red-600" />
  </motion.div>
</div>
```

---

## 4. CONTEXT_CHAOS

Визуализация хаоса - частицы вращаются вокруг центра.

```jsx
<div className="relative w-full h-full flex items-center justify-center overflow-hidden">
  {/* Outer ring of chaos */}
  {Array.from({ length: 16 }).map((_, i) => (
    <motion.div
      key={i}
      className={`absolute ${i % 3 === 0 ? 'w-6 h-6 bg-red-200' : 'w-4 h-4 bg-neutral-300'}`}
      initial={{ x: 0, y: 0, opacity: 0.3, rotate: 0 }}
      animate={{
        x: Math.cos(i * 22.5 * (Math.PI / 180)) * (80 + (i % 4) * 20),
        y: Math.sin(i * 22.5 * (Math.PI / 180)) * (80 + (i % 4) * 20),
        opacity: [0.3, 0.9, 0.3],
        rotate: i * 20
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay: i * 0.08,
        ease: "easeInOut"
      }}
    />
  ))}
  {/* Inner chaos ring */}
  {Array.from({ length: 8 }).map((_, i) => (
    <motion.div
      key={`inner-${i}`}
      className="absolute w-5 h-5 border-2 border-red-400"
      animate={{
        x: Math.cos((i * 45 + 22.5) * (Math.PI / 180)) * 40,
        y: Math.sin((i * 45 + 22.5) * (Math.PI / 180)) * 40,
        rotate: [0, 180, 360],
        scale: [0.8, 1.2, 0.8]
      }}
      transition={{ duration: 3, repeat: Infinity, delay: i * 0.15 }}
    />
  ))}
  {/* Center focal point */}
  <motion.div
    className="w-10 h-10 bg-red-600 z-10"
    animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
  />
  {/* Pulsing ring */}
  <motion.div
    className="absolute w-20 h-20 border-2 border-red-600 rounded-full"
    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
    transition={{ duration: 2, repeat: Infinity }}
  />
</div>
```

---

## 5. DILTS_PYRAMID

Пирамида Дилтса - 6 уровней логических уровней.

```jsx
<div className="w-full h-full flex items-center justify-center">
  <svg viewBox="0 0 300 250" className="w-full h-full max-w-xs">
    {[
      { y: 200, width: 260, label: "Environment", delay: 0 },
      { y: 165, width: 220, label: "Behavior", delay: 0.1 },
      { y: 130, width: 180, label: "Skills", delay: 0.2 },
      { y: 95, width: 140, label: "Values", delay: 0.3 },
      { y: 60, width: 100, label: "Identity", delay: 0.4 },
      { y: 25, width: 60, label: "Mission", delay: 0.5, active: true }
    ].map((level, i) => (
      <motion.g key={i}>
        <motion.rect
          x={(300 - level.width) / 2}
          y={level.y}
          width={level.width}
          height={30}
          fill={level.active ? "#DC2626" : "transparent"}
          stroke="#333333"
          strokeWidth="2"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: level.delay, duration: 0.5 }}
        />
        <motion.text
          x="150"
          y={level.y + 20}
          textAnchor="middle"
          fill={level.active ? "white" : "#333333"}
          fontSize="10"
          fontFamily="monospace"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: level.delay + 0.3 }}
        >
          {level.label}
        </motion.text>
      </motion.g>
    ))}
  </svg>
</div>
```

---

## 6. GAME_LOOP

Игровой цикл - 4 этапа по кругу.

```jsx
<div className="w-full h-full flex items-center justify-center">
  <svg viewBox="0 0 200 200" className="w-full h-full max-w-xs">
    <motion.circle
      cx="100"
      cy="100"
      r="80"
      fill="none"
      stroke="#333333"
      strokeWidth="2"
      strokeDasharray="10 5"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2 }}
    />
    {[
      { angle: -90, label: "CAPTURE" },
      { angle: 0, label: "NORMALIZE" },
      { angle: 90, label: "LINK" },
      { angle: 180, label: "OUTPUT" }
    ].map((item, i) => {
      const radian = item.angle * (Math.PI / 180);
      const x = 100 + Math.cos(radian) * 80;
      const y = 100 + Math.sin(radian) * 80;
      return (
        <motion.g key={i}>
          <motion.circle
            cx={x}
            cy={y}
            r="8"
            fill={i === 0 ? "#DC2626" : "white"}
            stroke="#333333"
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.2 }}
          />
          <motion.text
            x={x}
            y={y + (item.angle === -90 ? -15 : item.angle === 90 ? 20 : 0)}
            textAnchor="middle"
            fill="#333333"
            fontSize="8"
            fontFamily="monospace"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.2 + 0.3 }}
          >
            {item.label}
          </motion.text>
        </motion.g>
      );
    })}
    <motion.path
      d="M100 20 L115 35 L85 35 Z"
      fill="#DC2626"
      animate={{ rotate: 360 }}
      style={{ transformOrigin: "100px 100px" }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    />
  </svg>
</div>
```

---

## 7. FOG_CLARITY

Туман рассеивается, появляется ясность.

```jsx
<div className="relative w-full h-full flex items-center justify-center overflow-hidden">
  {/* Background fog particles */}
  {Array.from({ length: 12 }).map((_, i) => (
    <motion.div
      key={i}
      className="absolute w-24 h-24 rounded-full bg-neutral-200"
      style={{
        left: `${10 + (i % 4) * 25}%`,
        top: `${15 + Math.floor(i / 4) * 30}%`,
      }}
      initial={{ opacity: 0.6, filter: "blur(20px)", scale: 1.2 }}
      animate={{ opacity: 0, filter: "blur(40px)", scale: 0.5 }}
      transition={{ duration: 3, delay: i * 0.15 }}
    />
  ))}
  {/* Main clarity text */}
  <motion.div
    initial={{ opacity: 0.1, filter: "blur(12px)", scale: 0.9 }}
    animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
    transition={{ duration: 2.5, ease: "easeOut" }}
    className="text-7xl md:text-8xl font-sans font-black text-black tracking-tighter uppercase z-10"
  >
    CLARITY
  </motion.div>
  {/* Red accent line */}
  <motion.div
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    transition={{ delay: 2, duration: 0.6 }}
    className="absolute bottom-1/3 w-48 h-3 bg-red-600"
  />
  {/* Subtle pulsing ring */}
  <motion.div
    className="absolute w-80 h-80 border border-red-300 rounded-full"
    initial={{ scale: 0.5, opacity: 0 }}
    animate={{ scale: 1, opacity: [0, 0.5, 0] }}
    transition={{ delay: 2.5, duration: 2, repeat: Infinity }}
  />
</div>
```

---

## 8. TECH_GRID

Технологическая сетка с пульсирующим центром.

```jsx
<div className="w-full h-full flex items-center justify-center overflow-hidden">
  <div className="relative">
    <div className="grid grid-cols-6 gap-1 p-4">
      {Array.from({ length: 36 }).map((_, i) => {
        const isCenter = i === 14 || i === 15 || i === 20 || i === 21;
        const isHighlight = [7, 8, 13, 22, 27, 28].includes(i);
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: 1,
              backgroundColor: isCenter ? "#DC2626" : isHighlight ? '#FEE2E2' : 'transparent'
            }}
            transition={{ delay: i * 0.02, duration: 0.3 }}
            className={`w-12 h-12 md:w-14 md:h-14 border border-black/30 ${
              isCenter ? 'border-2 border-red-600' : ''
            }`}
          />
        );
      })}
    </div>
    {/* Pulsing overlay on center */}
    <motion.div
      className="absolute top-1/2 left-1/2 w-28 h-28 md:w-32 md:h-32 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
      transition={{ duration: 2, repeat: Infinity }}
      style={{ border: `2px solid #DC2626`, borderRadius: '4px' }}
    />
  </div>
</div>
```

---

## 9. SPARKS

Искры разлетаются из центра.

```jsx
<div className="w-full h-full relative flex items-center justify-center">
  {Array.from({ length: 8 }).map((_, i) => (
    <motion.div
      key={i}
      className="absolute w-2 h-2 bg-red-600"
      initial={{ x: 0, y: 0, opacity: 1 }}
      animate={{
        x: Math.cos(i * 45 * (Math.PI / 180)) * 80,
        y: Math.sin(i * 45 * (Math.PI / 180)) * 80,
        opacity: 0,
        scale: 0.5
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeOut",
        delay: i * 0.1
      }}
    />
  ))}
  <div className="w-2 h-2 bg-black rounded-full z-10" />
</div>
```

---

## 10. BREATH

Дыхание - пульсирующий круг.

```jsx
<div className="relative w-full h-full flex items-center justify-center">
  <motion.div
    animate={{ scale: [1, 1.4, 1] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    className="absolute w-48 h-48 rounded-full border-2 border-neutral-200"
  />
  <motion.div
    animate={{ scale: [1, 0.6, 1] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    className="w-48 h-48 rounded-full bg-red-600 mix-blend-multiply opacity-80"
  />
</div>
```

---

## 11. ALCHEMY_FILTER

Алхимия - просеивание, фильтрация хаоса в ценность.

```jsx
<div className="relative w-full h-full flex items-center justify-center">
  <svg viewBox="0 0 200 200" className="w-64 h-64">
    {/* Воронка */}
    <motion.path
      d="M40,40 L160,40 L110,120 L110,180 L90,180 L90,120 Z"
      stroke="#DC2626" strokeWidth="3" fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2 }}
    />
    {/* Падающие частицы */}
    {[0, 1, 2, 3, 4].map(i => (
      <motion.circle
        key={i}
        cx={70 + i * 15} cy="30" r="4"
        fill={i % 2 === 0 ? "#DC2626" : "#333333"}
        animate={{ cy: [30, 180], opacity: [1, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
      />
    ))}
    {/* Одна ценная капля выходит */}
    <motion.circle
      cx="100" cy="185" r="6"
      fill="#DC2626"
      animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0] }}
      transition={{ duration: 2, repeat: Infinity, delay: 2 }}
    />
  </svg>
</div>
```

---

## 12. ALCHEMY_MIX

Алхимия - смешивание контекстов.

```jsx
<div className="relative w-full h-full flex items-center justify-center">
  <svg viewBox="0 0 200 200" className="w-64 h-64">
    {/* Два круга-контекста */}
    <motion.circle
      cx="70" cy="100" r="40"
      stroke="#DC2626" strokeWidth="3" fill="none"
      animate={{ x: [0, 15, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.circle
      cx="130" cy="100" r="40"
      stroke="#333333" strokeWidth="3" fill="none"
      animate={{ x: [0, -15, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
    {/* Зона пересечения - алхимия */}
    <motion.ellipse
      cx="100" cy="100" rx="15" ry="35"
      fill="#DC2626"
      animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.9, 1.1, 0.9] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    {/* Плюс в центре */}
    <motion.path
      d="M100,85 L100,115 M85,100 L115,100"
      stroke="white" strokeWidth="3"
      animate={{ rotate: [0, 180] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      style={{ transformOrigin: '100px 100px' }}
    />
  </svg>
</div>
```

---

## 13. COMPASS_ARTIFACT

Компас - артефакт года.

```jsx
<div className="relative w-full h-full flex items-center justify-center">
  <svg viewBox="0 0 200 200" className="w-72 h-72">
    {/* Внешний круг */}
    <motion.circle
      cx="100" cy="100" r="80"
      stroke="#333333" strokeWidth="2" fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2 }}
    />
    {/* Деления */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
      <motion.line
        key={i}
        x1={100 + 70 * Math.cos(deg * Math.PI / 180)}
        y1={100 + 70 * Math.sin(deg * Math.PI / 180)}
        x2={100 + 80 * Math.cos(deg * Math.PI / 180)}
        y2={100 + 80 * Math.sin(deg * Math.PI / 180)}
        stroke="#333333" strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: i * 0.1 }}
      />
    ))}
    {/* Стрелка компаса */}
    <motion.polygon
      points="100,30 110,100 100,120 90,100"
      fill="#DC2626"
      animate={{ rotate: [0, 30, -20, 10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      style={{ transformOrigin: '100px 100px' }}
    />
    {/* Центр */}
    <circle cx="100" cy="100" r="8" fill="#333333" />
  </svg>
</div>
```

---

## 14. FIRE_RITUAL

Огонь - ритуал отпускания.

```jsx
<div className="relative w-full h-full flex items-center justify-center">
  <svg viewBox="0 0 200 200" className="w-64 h-64">
    {/* Языки пламени */}
    {[0, 1, 2, 3, 4].map(i => (
      <motion.path
        key={i}
        d={`M${80 + i * 10},170 Q${75 + i * 10},${130 - i * 5} ${100},${60 + Math.abs(2 - i) * 15} Q${125 - i * 10},${130 - i * 5} ${120 - i * 10},170`}
        fill={i % 2 === 0 ? "#DC2626" : "#FF6B6B"}
        animate={{
          d: [
            `M${80 + i * 10},170 Q${75 + i * 10},${130 - i * 5} ${100},${60 + Math.abs(2 - i) * 15} Q${125 - i * 10},${130 - i * 5} ${120 - i * 10},170`,
            `M${80 + i * 10},170 Q${70 + i * 10},${120 - i * 5} ${100},${50 + Math.abs(2 - i) * 15} Q${130 - i * 10},${120 - i * 5} ${120 - i * 10},170`,
            `M${80 + i * 10},170 Q${75 + i * 10},${130 - i * 5} ${100},${60 + Math.abs(2 - i) * 15} Q${125 - i * 10},${130 - i * 5} ${120 - i * 10},170`
          ],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
      />
    ))}
    {/* Искры */}
    {[0, 1, 2].map(i => (
      <motion.circle
        key={`spark-${i}`}
        cx={90 + i * 10} cy="80" r="2"
        fill="#DC2626"
        animate={{ cy: [80, 30], opacity: [1, 0], x: [(i - 1) * 5, (i - 1) * 15] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5 }}
      />
    ))}
  </svg>
</div>
```

---

## 15. MOON_SOLSTICE

Луна - солнцестояние с красным свечением.

```jsx
<div className="relative w-full h-full flex items-center justify-center bg-neutral-900 rounded-3xl overflow-hidden">
  {/* Звёзды */}
  {Array.from({ length: 20 }).map((_, i) => (
    <motion.div
      key={i}
      className="absolute w-1 h-1 bg-white rounded-full"
      style={{
        left: `${10 + Math.random() * 80}%`,
        top: `${10 + Math.random() * 80}%`
      }}
      animate={{ opacity: [0.2, 1, 0.2] }}
      transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
    />
  ))}
  {/* Луна с красным свечением */}
  <motion.div
    className="relative"
    animate={{ scale: [1, 1.05, 1] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
  >
    <div className="w-40 h-40 rounded-full bg-gradient-to-br from-neutral-100 to-neutral-300 shadow-2xl" />
    <motion.div
      className="absolute inset-0 rounded-full"
      style={{ boxShadow: `0 0 60px 20px #DC2626` }}
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
  </motion.div>
</div>
```

---

## 16. ECLIPSE_TRANSITION

Затмение - переход 2025 → 2026.

```jsx
<div className="relative w-full h-full flex items-center justify-center">
  <svg viewBox="0 0 200 200" className="w-72 h-72">
    {/* Солнце 2025 */}
    <circle cx="100" cy="100" r="60" fill="#DC2626" />
    {/* Луна 2026 проходит */}
    <motion.circle
      cx="100" cy="100" r="58"
      fill="#333333"
      initial={{ x: -80 }}
      animate={{ x: [80, -80] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
    {/* Корона */}
    <motion.circle
      cx="100" cy="100" r="70"
      stroke="#DC2626" strokeWidth="1" fill="none"
      style={{ strokeDasharray: "5 5" }}
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    />
  </svg>
  {/* Годы */}
  <motion.span
    className="absolute left-8 text-6xl font-black text-neutral-300"
    animate={{ opacity: [0.3, 0.8, 0.3] }}
    transition={{ duration: 4, repeat: Infinity }}
  >
    2025
  </motion.span>
  <motion.span
    className="absolute right-8 text-6xl font-black text-red-600"
    animate={{ opacity: [0.3, 1, 0.3] }}
    transition={{ duration: 4, repeat: Infinity, delay: 2 }}
  >
    2026
  </motion.span>
</div>
```

---

## 17. SPARKLE_FINALE

Финальные искры - звезда с разлетающимися частицами.

```jsx
<div className="relative w-full h-full flex items-center justify-center overflow-hidden">
  {/* Центральная звезда */}
  <motion.svg viewBox="0 0 200 200" className="w-64 h-64">
    <motion.path
      d="M100,20 L115,80 L180,100 L115,120 L100,180 L85,120 L20,100 L85,80 Z"
      fill="#DC2626"
      animate={{
        scale: [0.8, 1.2, 0.8],
        rotate: [0, 15, -15, 0]
      }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      style={{ transformOrigin: '100px 100px' }}
    />
  </motion.svg>
  {/* Мелкие искры вокруг */}
  {Array.from({ length: 12 }).map((_, i) => {
    const angle = (i * 30) * Math.PI / 180;
    return (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-red-600 rounded-full"
        style={{
          left: '50%',
          top: '50%'
        }}
        animate={{
          x: [0, Math.cos(angle) * 150],
          y: [0, Math.sin(angle) * 150],
          opacity: [1, 0],
          scale: [1, 0.5]
        }}
        transition={{ duration: 2, repeat: Infinity, delay: i * 0.15, ease: "easeOut" }}
      />
    );
  })}
</div>
```

---

## Использование

Все метафоры используют:
- **Framer Motion** для анимаций
- **Tailwind CSS** для стилей
- **Swiss Design** стиль: плоский, без теней, жирный
- **Цветовая схема**: красный (#DC2626) + черный (#333333)

Для использования скопируй нужный код и вставь в свой React компонент. Не забудь импортировать `motion` из `framer-motion`.
