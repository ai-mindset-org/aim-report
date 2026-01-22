import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.join(__dirname, '../../../content/slides.ru.md');
const outputPath = path.join(__dirname, '../public/content/shifts-ru.json');

const content = fs.readFileSync(inputPath, 'utf-8');
const sections = content.split('---').slice(1);

const layers = [];
const shifts = [];

sections.forEach((section, index) => {
  const lines = section.trim().split('\n');
  const slide = { metadata: {}, content: '' };
  let inMetadata = true;
  let contentLines = [];

  lines.forEach(line => {
    if (line.startsWith('title:')) {
      slide.metadata.title = line.replace('title:', '').trim();
    } else if (line.startsWith('subtitle:')) {
      slide.metadata.subtitle = line.replace('subtitle:', '').trim();
    } else if (line.startsWith('alternativeSubtitle:')) {
      slide.metadata.alternativeSubtitle = line.replace('alternativeSubtitle:', '').trim();
    } else if (line.startsWith('layout:')) {
      slide.metadata.layout = line.replace('layout:', '').trim();
    } else if (line.startsWith('loopNumber:')) {
      slide.metadata.loopNumber = line.replace('loopNumber:', '').trim();
    } else if (line.trim() === '') {
      inMetadata = false;
    } else if (!inMetadata) {
      contentLines.push(line);
    }
  });

  slide.content = contentLines.join('\n').trim();

  // Определяем тип слайда
  if (slide.metadata.layout === 'center' && slide.metadata.title?.includes('слой')) {
    // Это layer
    const layerId = slide.metadata.title.match(/слой ([iv]+):/i)?.[1]?.toUpperCase() || `L${layers.length + 1}`;
    layers.push({
      id: layerId,
      title: slide.metadata.title.replace(/слой [iv]+:\s*/i, '').toUpperCase(),
      subtitle: slide.metadata.subtitle || '',
      desc: slide.content.split('\n')[0] || '',
      constraint: '',
      metaphor: 'globe'
    });
  } else if (slide.metadata.layout === 'shift-scroll') {
    // Это shift
    const shiftNum = slide.metadata.loopNumber || shifts.length + 1;
    const layerId = shiftNum <= 3 ? 'I' : shiftNum <= 6 ? 'II' : shiftNum <= 9 ? 'III' : 'IV';
    
    // Парсим контент
    const techSection = slide.content.match(/\*\*технологии:\*\*(.*?)(?=\*\*вывод для технологий:|$)/s)?.[1]?.trim() || '';
    const humanSection = slide.content.match(/\*\*люди:\*\*(.*?)(?=\*\*вывод для людей:|$)/s)?.[1]?.trim() || '';
    const gapSection = slide.content.match(/\*\*разрыв:\*\*(.*?)$/s)?.[1]?.trim() || '';

    shifts.push({
      id: shiftNum.toString().padStart(2, '0'),
      layerId: layerId,
      title: slide.metadata.subtitle || slide.metadata.title,
      subtitle: slide.metadata.alternativeSubtitle || '',
      metaphor: 'battery',
      machineCol: {
        label: 'ТЕХНОЛОГИЯ',
        title: 'Что строится',
        desc: techSection.substring(0, 500)
      },
      humanCol: {
        label: 'ЧЕЛОВЕК',
        title: 'Как люди адаптируются',
        desc: humanSection.substring(0, 500)
      },
      gapStatement: {
        title: 'РАЗРЫВ',
        desc: gapSection.substring(0, 500)
      },
      stats: [],
      evidence: [],
      sources: [],
      voices: []
    });
  }
});

const output = {
  shifts,
  layers,
  generated: new Date().toISOString()
};

// Создаём директорию если не существует
const outputDir = path.dirname(outputPath);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');
console.log(`✓ Generated ${outputPath}`);
console.log(`  - ${layers.length} layers`);
console.log(`  - ${shifts.length} shifts`);
