import { RAW_SLIDES, SECTIONS } from '../reportDeck';
import type { SlideData } from '../types';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outputDir = path.join(__dirname, '../public/locales/en');
const slidesPath = path.join(outputDir, 'slides.json');
const sectionsPath = path.join(outputDir, 'sections.json');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Export slides
const slidesData = {
  metadata: {
    version: 'v4',
    title: 'THE CONTEXT GAP',
    year: '2025',
    structure: '11 Tectonic Shifts in 4 Layers',
  },
  slides: RAW_SLIDES.map((slide: SlideData) => {
    // Remove id field as it will be auto-generated
    const { id, ...slideWithoutId } = slide;
    return slideWithoutId;
  }),
};

fs.writeFileSync(slidesPath, JSON.stringify(slidesData, null, 2));
console.log(`✓ Exported ${RAW_SLIDES.length} slides to ${slidesPath}`);

// Export sections
const sectionsData = {
  sections: SECTIONS,
};

fs.writeFileSync(sectionsPath, JSON.stringify(sectionsData, null, 2));
console.log(`✓ Exported ${SECTIONS.length} sections to ${sectionsPath}`);

console.log('\nDone! All slides and sections exported to JSON.');
