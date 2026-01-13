import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { SLIDES } from '../reportDeck.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function slideToMarkdown(slide: any): string {
  const parts: string[] = [];
  
  parts.push('---');
  parts.push(`title: ${slide.title}`);
  
  if (slide.subtitle) {
    parts.push(`subtitle: ${slide.subtitle}`);
  }
  
  if (slide.visual) {
    parts.push(`visual: ${slide.visual}`);
  }
  
  if (slide.layout) {
    parts.push(`layout: ${slide.layout}`);
  }
  
  if (slide.caption) {
    parts.push(`caption: |`);
    const captionLines = slide.caption.split('\n');
    captionLines.forEach((line: string) => {
      parts.push(`  ${line}`);
    });
  }
  
  if (slide.loopNumber !== undefined) {
    parts.push(`loopNumber: ${slide.loopNumber}`);
  }
  
  if (slide.dark) {
    parts.push(`dark: true`);
  }
  
  parts.push('');
  
  // Content
  if (slide.content && Array.isArray(slide.content)) {
    parts.push(slide.content.join('\n\n'));
  } else if (slide.loopData) {
    // Extract content from loopData
    const contentParts: string[] = [];
    if (slide.loopData.machine) {
      contentParts.push(`**Machine:** ${slide.loopData.machine}`);
    }
    if (slide.loopData.human) {
      contentParts.push(`**Human:** ${slide.loopData.human}`);
    }
    if (slide.loopData.gap) {
      contentParts.push(`**Gap:** ${slide.loopData.gap}`);
    }
    parts.push(contentParts.join('\n\n'));
  } else if (slide.evidenceData) {
    // Extract evidence data
    const evidenceParts: string[] = [];
    
    if (slide.evidenceData.keyStats) {
      evidenceParts.push('**Key Stats:**');
      slide.evidenceData.keyStats.forEach((stat: any) => {
        evidenceParts.push(`- **${stat.value}:** ${stat.label} (${stat.source})`);
      });
    }
    
    if (slide.evidenceData.cases) {
      evidenceParts.push('\n**Cases:**');
      slide.evidenceData.cases.forEach((c: any) => {
        evidenceParts.push(`- **${c.title}:** ${c.details}`);
      });
    }
    
    if (slide.evidenceData.quotes) {
      evidenceParts.push('\n**Quotes:**');
      slide.evidenceData.quotes.forEach((q: any) => {
        evidenceParts.push(`> "${q.text}" — ${q.author}, ${q.source}`);
      });
    }
    
    parts.push(evidenceParts.join('\n'));
  }
  
  parts.push('');
  return parts.join('\n');
}

function main() {
  console.log(`📦 Migrating ${SLIDES.length} slides from reportDeck.ts to markdown...`);
  
  const header = `# AIM Annual Report 2025 - Slides Content

> **ИНСТРУКЦИЯ:** Редактируй этот файл, сохрани (Cmd+S), и контент автоматически обновится на сайте.
> Формат: каждый слайд начинается с \`---\`, затем YAML метаданные, затем содержимое.

`;
  
  const slidesMarkdown = SLIDES.map(slideToMarkdown).join('\n');
  const fullMarkdown = header + slidesMarkdown;
  
  const outputPath = join(__dirname, '../content/slides-full.md');
  writeFileSync(outputPath, fullMarkdown, 'utf-8');
  
  console.log(`✓ Migrated ${SLIDES.length} slides to ${outputPath}`);
  console.log('\nNext steps:');
  console.log('1. Review slides-full.md');
  console.log('2. Replace content/slides.md with slides-full.md');
  console.log('3. Run: npm run content:update');
}

main();
