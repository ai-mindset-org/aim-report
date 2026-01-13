import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface SlideMetadata {
  title: string;
  subtitle?: string;
  visual?: string;
  layout?: string;
  caption?: string;
  loopNumber?: number;
  dark?: boolean;
}

interface Slide extends SlideMetadata {
  content?: string[];
  sources?: Array<{
    label: string;
    url: string;
  }>;
}

function parseMarkdownSlides(markdown: string): Slide[] {
  const slides: Slide[] = [];
  
  // Split by slide separator
  const rawSlides = markdown.split(/\n---\n/).filter(s => s.trim());
  
  for (const rawSlide of rawSlides) {
    // Skip instruction block
    if (rawSlide.includes('ИНСТРУКЦИЯ')) continue;
    
    const lines = rawSlide.split('\n');
    const metadata: SlideMetadata = { title: '' };
    const contentLines: string[] = [];
    const sources: Array<{ label: string; url: string }> = [];
    let inMetadata = true;
    
    for (let line of lines) {
      const trimmedLine = line.trim();
      
      // Empty line ends metadata section
      if (inMetadata && !trimmedLine) {
        inMetadata = false;
        continue;
      }
      
      // Parse YAML-style metadata (must not start with -, *, or **)
      if (inMetadata && trimmedLine.includes(':') && !trimmedLine.startsWith('-') && !trimmedLine.startsWith('*')) {
        const colonIndex = trimmedLine.indexOf(':');
        const key = trimmedLine.substring(0, colonIndex).trim();
        const value = trimmedLine.substring(colonIndex + 1).trim();
        
        if (key === 'title') metadata.title = value;
        else if (key === 'subtitle') metadata.subtitle = value;
        else if (key === 'visual') metadata.visual = value;
        else if (key === 'layout') metadata.layout = value;
        else if (key === 'caption') {
          // Handle multiline caption with |
          if (value === '|') {
            let captionLines: string[] = [];
            let i = lines.indexOf(line) + 1;
            while (i < lines.length && lines[i].trim() && !lines[i].trim().match(/^[a-z]+:/)) {
              captionLines.push(lines[i].trim());
              i++;
            }
            metadata.caption = captionLines.join('\n');
          } else {
            metadata.caption = value;
          }
        }
        else if (key === 'loopNumber') metadata.loopNumber = parseInt(value);
        else if (key === 'dark' && value === 'true') metadata.dark = true;
      } else if (!inMetadata && trimmedLine.startsWith('source:')) {
        // Parse source lines: "source: Label | URL"
        const sourceValue = trimmedLine.substring(7).trim();
        const pipeIndex = sourceValue.indexOf('|');
        if (pipeIndex > 0) {
          const label = sourceValue.substring(0, pipeIndex).trim();
          const url = sourceValue.substring(pipeIndex + 1).trim();
          sources.push({ label, url });
        }
      } else if (!inMetadata && trimmedLine) {
        // Content after metadata
        contentLines.push(trimmedLine);
      }
    }
    
    const slide: Slide = { ...metadata };
    
    // Add sources if present
    if (sources.length > 0) {
      slide.sources = sources;
    }
    
    // Parse content into paragraphs
    if (contentLines.length > 0) {
      const content: string[] = [];
      let currentParagraph = '';
      
      for (const line of contentLines) {
        if (line === '') {
          if (currentParagraph) {
            content.push(currentParagraph);
            currentParagraph = '';
          }
        } else {
          currentParagraph += (currentParagraph ? ' ' : '') + line;
        }
      }
      
      if (currentParagraph) {
        content.push(currentParagraph);
      }
      
      slide.content = content;
    }
    
    slides.push(slide);
  }
  
  return slides;
}

function main() {
  console.log('📖 Reading slides.md...');
  
  const mdPath = join(__dirname, '../content/slides.md');
  const jsonPath = join(__dirname, '../public/locales/en/slides.json');
  const sectionsPath = join(__dirname, '../public/locales/en/sections.json');
  
  const markdown = readFileSync(mdPath, 'utf-8');
  const slides = parseMarkdownSlides(markdown);
  
  console.log(`✓ Parsed ${slides.length} slides`);
  
  // Generate slides.json
  const slidesJson = {
    metadata: {
      version: "v4",
      title: "THE CONTEXT GAP",
      year: "2025",
      structure: "11 Tectonic Shifts in 4 Layers",
      lastUpdated: new Date().toISOString()
    },
    slides
  };
  
  writeFileSync(jsonPath, JSON.stringify(slidesJson, null, 2));
  console.log(`✓ Exported to ${jsonPath}`);
  
  // Generate sections.json
  const sections = [
    { title: 'intro', startSlide: 0 },
    { title: 'foundation', startSlide: 6 },
    { title: 'cognition', startSlide: 18 },
    { title: 'interface', startSlide: 30 },
    { title: 'humanity', startSlide: 38 },
    { title: 'summary', startSlide: 50 }
  ];
  
  const sectionsJson = {
    metadata: {
      version: "v4",
      lastUpdated: new Date().toISOString()
    },
    sections
  };
  
  writeFileSync(sectionsPath, JSON.stringify(sectionsJson, null, 2));
  console.log(`✓ Exported sections to ${sectionsPath}`);
  
  console.log('\n✨ Done! Content updated.');
}

main();
