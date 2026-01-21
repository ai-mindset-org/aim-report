import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ABOUT_MD_PATH = path.join(__dirname, '../content/about.md');
const ABOUT_HTML_PATH = path.join(__dirname, '../public/about.html');

function parseMarkdownToHTML(markdown: string): string {
  let html = markdown;
  
  // Extract title and subtitle
  const titleMatch = html.match(/^# (.+)$/m);
  const subtitleMatch = html.match(/\*\*subtitle:\*\* (.+)$/m);
  
  const title = titleMatch ? titleMatch[1] : 'About AI Mindset';
  const subtitle = subtitleMatch ? subtitleMatch[1] : '';
  
  // Remove title and subtitle from content
  html = html.replace(/^# .+$/m, '');
  html = html.replace(/\*\*subtitle:\*\* .+$/m, '');
  html = html.replace(/^---$/m, '');
  
  // Convert headers
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  
  // Convert bold text
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  
  // Convert links with arrow prefix
  html = html.replace(/→ \[([^\]]+)\]\(([^)]+)\)/g, '<p class="link-block">→ <a href="$2" target="_blank"><strong>$1</strong></a>');
  
  // Convert regular markdown links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
  
  // Convert italic text
  html = html.replace(/\*(.+?)\*/g, '<em style="font-style: italic; color: #666;">$1</em>');
  
  // Split into paragraphs
  const lines = html.split('\n');
  const paragraphs: string[] = [];
  let currentParagraph = '';
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    if (!trimmedLine) {
      if (currentParagraph) {
        paragraphs.push(currentParagraph);
        currentParagraph = '';
      }
      continue;
    }
    
    // If line is already HTML (starts with <), add it directly
    if (trimmedLine.startsWith('<')) {
      if (currentParagraph) {
        paragraphs.push(currentParagraph);
        currentParagraph = '';
      }
      paragraphs.push(trimmedLine);
      continue;
    }
    
    // Otherwise accumulate into paragraph
    if (currentParagraph) {
      currentParagraph += ' ' + trimmedLine;
    } else {
      currentParagraph = trimmedLine;
    }
  }
  
  if (currentParagraph) {
    paragraphs.push(currentParagraph);
  }
  
  // Wrap non-HTML paragraphs in <p> tags
  const wrappedParagraphs = paragraphs.map(p => {
    if (p.startsWith('<')) {
      return p;
    }
    return `<p>${p}</p>`;
  });
  
  const bodyContent = wrappedParagraphs.join('\n    \n    ');
  
  // Generate full HTML
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About AI Mindset · Full Context</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #1a1a1a;
      background: #ffffff;
      padding: 2rem 1rem;
    }
    
    .container {
      max-width: 800px;
      margin: 0 auto;
    }
    
    h1 {
      font-size: 3rem;
      font-weight: 900;
      letter-spacing: -0.02em;
      margin-bottom: 0.5rem;
      line-height: 1.1;
    }
    
    .subtitle {
      font-size: 1.25rem;
      color: #666;
      margin-bottom: 3rem;
    }
    
    h2 {
      font-size: 1.5rem;
      font-weight: 700;
      margin-top: 2.5rem;
      margin-bottom: 1rem;
      position: relative;
      padding-left: 1rem;
    }
    
    h2::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.3rem;
      width: 4px;
      height: 1.2rem;
      background: #dc2626;
      border-radius: 2px;
    }
    
    p {
      margin-bottom: 1.25rem;
      font-size: 1.125rem;
    }
    
    strong {
      font-weight: 700;
      color: #dc2626;
    }
    
    a {
      color: #dc2626;
      text-decoration: underline;
    }
    
    a:hover {
      color: #991b1b;
    }
    
    .link-block {
      display: block;
      margin-left: 1.5rem;
      margin-bottom: 0.75rem;
    }
    
    .hero-visual {
      width: 100%;
      height: 200px;
      margin: 2rem 0;
      background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
      border-radius: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }
    
    .hero-visual svg {
      width: 100%;
      height: 100%;
    }
    
    @media (max-width: 768px) {
      h1 {
        font-size: 2rem;
      }
      
      p {
        font-size: 1rem;
      }
      
      .hero-visual {
        height: 150px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>${title}</h1>
    <p class="subtitle">${subtitle}</p>
    
    <div class="hero-visual">
      <svg viewBox="0 0 800 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Network nodes representing community -->
        <circle cx="100" cy="100" r="8" fill="#dc2626" opacity="0.8">
          <animate attributeName="r" values="8;12;8" dur="3s" repeatCount="indefinite"/>
        </circle>
        <circle cx="200" cy="80" r="6" fill="#dc2626" opacity="0.6"/>
        <circle cx="300" cy="120" r="7" fill="#dc2626" opacity="0.7"/>
        <circle cx="400" cy="90" r="8" fill="#dc2626" opacity="0.8">
          <animate attributeName="r" values="8;11;8" dur="2.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="500" cy="110" r="6" fill="#dc2626" opacity="0.6"/>
        <circle cx="600" cy="85" r="7" fill="#dc2626" opacity="0.7"/>
        <circle cx="700" cy="105" r="8" fill="#dc2626" opacity="0.8">
          <animate attributeName="r" values="8;13;8" dur="3.5s" repeatCount="indefinite"/>
        </circle>
        
        <!-- Connecting lines -->
        <line x1="100" y1="100" x2="200" y2="80" stroke="#dc2626" stroke-width="1" opacity="0.3"/>
        <line x1="200" y1="80" x2="300" y2="120" stroke="#dc2626" stroke-width="1" opacity="0.3"/>
        <line x1="300" y1="120" x2="400" y2="90" stroke="#dc2626" stroke-width="1" opacity="0.3"/>
        <line x1="400" y1="90" x2="500" y2="110" stroke="#dc2626" stroke-width="1" opacity="0.3"/>
        <line x1="500" y1="110" x2="600" y2="85" stroke="#dc2626" stroke-width="1" opacity="0.3"/>
        <line x1="600" y1="85" x2="700" y2="105" stroke="#dc2626" stroke-width="1" opacity="0.3"/>
        
        <!-- Central text -->
        <text x="400" y="35" font-family="monospace" font-size="12" fill="#dc2626" text-anchor="middle" opacity="0.6">
          1,500+ participants · 10+ countries · 3 years
        </text>
      </svg>
    </div>
    
    ${bodyContent}
  </div>
</body>
</html>
`;
}

function main() {
  console.log('📖 Reading about.md...');
  const markdown = fs.readFileSync(ABOUT_MD_PATH, 'utf-8');
  
  console.log('🔄 Converting markdown to HTML...');
  const html = parseMarkdownToHTML(markdown);
  
  console.log('💾 Writing to about.html...');
  fs.writeFileSync(ABOUT_HTML_PATH, html, 'utf-8');
  
  console.log('✨ Done! about.html updated.');
}

main();
