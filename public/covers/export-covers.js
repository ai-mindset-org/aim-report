/**
 * Cover Export Script
 *
 * Экспортирует HTML генераторы каверов в PNG высокого качества.
 *
 * Использование:
 * 1. Установите puppeteer: npm install puppeteer
 * 2. Запустите: node export-covers.js
 *
 * Или откройте HTML файлы в браузере и используйте расширение
 * для скриншотов (например, GoFullPage) с настройками:
 * - Device Pixel Ratio: 2 или 3
 * - Format: PNG
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const COVERS_DIR = __dirname;

// Конфигурация каверов
const covers = [
    // Главные каверы
    { file: 'og-main-hq-generator.html', output: 'og-main-hq.png', width: 2400, height: 1260 },
    { file: 'square-main-hq-generator.html', output: 'square-main-hq.png', width: 2160, height: 2160 },
    { file: 'story-main-hq-generator.html', output: 'story-main-hq.png', width: 2160, height: 3840 },

    // Каверы по слоям
    { file: 'layer-foundation-generator.html', output: 'layer-foundation.png', width: 2400, height: 1260 },
    { file: 'layer-cognition-generator.html', output: 'layer-cognition.png', width: 2400, height: 1260 },
    { file: 'layer-interface-generator.html', output: 'layer-interface.png', width: 2400, height: 1260 },
    { file: 'layer-humanity-generator.html', output: 'layer-humanity.png', width: 2400, height: 1260 },

    // Статистика
    { file: 'stat-energy-generator.html', output: 'stat-energy.png', width: 2160, height: 2160 },
    { file: 'stat-automation-generator.html', output: 'stat-automation.png', width: 2160, height: 2160 },

    // Тематические каверы
    { file: 'dark-forest-generator.html', output: 'dark-forest.png', width: 2400, height: 1260 },
    { file: 'story-dark-forest-generator.html', output: 'story-dark-forest.png', width: 2160, height: 3840 },
    { file: 'vibe-coding-generator.html', output: 'vibe-coding.png', width: 2400, height: 1260 },
    { file: 'companion-intimacy-generator.html', output: 'companion-intimacy.png', width: 2160, height: 2160 },
    { file: 'splinternet-generator.html', output: 'splinternet.png', width: 2400, height: 1260 },
    { file: 'all-shifts-generator.html', output: 'all-shifts.png', width: 2160, height: 2160 },

    // Цитаты
    { file: 'quote-context-obesity-generator.html', output: 'quote-context-obesity.png', width: 2160, height: 2160 },

    // Обновленные оригинальные каверы (в 2x)
    { file: 'og-generator.html', output: 'og-cover-hq.png', width: 2400, height: 1260 },
    { file: 'square-generator.html', output: 'square-cover-hq.png', width: 2160, height: 2160 },
    { file: 'story-generator.html', output: 'story-cover-hq.png', width: 2160, height: 3840 },
    { file: 'og-shifts-generator.html', output: 'og-shifts-hq.png', width: 2400, height: 1260 },
    { file: 'twitter-banner-generator.html', output: 'twitter-banner-hq.png', width: 3000, height: 1000 },
];

async function exportCovers() {
    console.log('Starting cover export...\n');

    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    for (const cover of covers) {
        const inputPath = path.join(COVERS_DIR, cover.file);
        const outputPath = path.join(COVERS_DIR, cover.output);

        if (!fs.existsSync(inputPath)) {
            console.log(`⚠️  Skip: ${cover.file} (not found)`);
            continue;
        }

        try {
            const page = await browser.newPage();

            // Устанавливаем viewport точно по размеру HTML
            await page.setViewport({
                width: cover.width,
                height: cover.height,
                deviceScaleFactor: 1 // уже в 2x разрешении в HTML
            });

            // Загружаем HTML файл
            await page.goto(`file://${inputPath}`, {
                waitUntil: 'networkidle0',
                timeout: 30000
            });

            // Ждем загрузки шрифтов
            await page.evaluate(() => document.fonts.ready);
            await new Promise(r => setTimeout(r, 1000));

            // Делаем скриншот
            await page.screenshot({
                path: outputPath,
                type: 'png',
                clip: {
                    x: 0,
                    y: 0,
                    width: cover.width,
                    height: cover.height
                }
            });

            console.log(`✓ Exported: ${cover.output} (${cover.width}x${cover.height})`);

            await page.close();
        } catch (error) {
            console.log(`✗ Error: ${cover.file} - ${error.message}`);
        }
    }

    await browser.close();
    console.log('\nExport complete!');
}

// Альтернативный способ - инструкция для ручного экспорта
function printManualInstructions() {
    console.log(`
╔═══════════════════════════════════════════════════════════════════╗
║                    MANUAL EXPORT INSTRUCTIONS                      ║
╚═══════════════════════════════════════════════════════════════════╝

Если у вас не установлен puppeteer, используйте браузер:

1. Откройте HTML файл в Chrome/Firefox
2. Откройте DevTools (Cmd+Option+I)
3. Выполните команду в консоли:

   // Для скриншота всей страницы:
   const element = document.body.firstElementChild;
   const rect = element.getBoundingClientRect();

   // Перейдите в режим устройства (Cmd+Shift+M)
   // Установите размеры точно по карточке
   // Нажмите три точки → Capture full size screenshot

4. Или используйте расширение GoFullPage/Awesome Screenshot

Рекомендуемые размеры (уже в 2x разрешении):
- OG: 2400x1260
- Square: 2160x2160
- Story: 2160x3840
- Twitter Banner: 3000x1000

Все генераторы находятся в: public/covers/
`);
}

// Запуск
if (require.main === module) {
    // Проверяем наличие puppeteer
    try {
        require.resolve('puppeteer');
        exportCovers().catch(console.error);
    } catch (e) {
        console.log('Puppeteer not installed. Showing manual instructions...\n');
        printManualInstructions();
        console.log('\nTo install puppeteer: npm install puppeteer');
    }
}

module.exports = { exportCovers, covers };
