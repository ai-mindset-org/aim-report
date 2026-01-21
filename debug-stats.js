const fs = require('fs');
const path = require('path');

const slidesContent = fs.readFileSync('/Users/viola/All/Yandex.Disk.localized/3 Process/5 Work/AI Mindset/_aim-annual-report-2025-deck/aim-annual-report-2025-deck/content/slides.md', 'utf8');

// Mocking the extraction logic from Slide.tsx
function parseKeyStats(fullText) {
  const statsMatch = fullText.match(/\*\*Key Stats:\*\*\s*(.+?)(?:\*\*Research:\*\*|\*\*Industry Signals:\*\*|$)/s);
  if (!statsMatch) return [];

  const statItems = statsMatch[1].split(/\s+-\s+/).map(s => s.trim()).filter(Boolean);
  
  return statItems.map(item => {
    // Clean the item first: remove leading dash, asterisks, and whitespace
    let cleanItem = item.trim().replace(/^-\s*/, '').trim();
    
    // Match format: **Value:** Label OR Value: Label
    const match = cleanItem.match(/^(\*\*)?(.+?)(:\*\*|:)\s*(.+)$/s);
    
    if (match) {
      const value = match[2].trim();
      const label = match[4].trim();
      return { original: item, cleanItem, value, label };
    }
    return { original: item, cleanItem, error: 'No match' };
  });
}

// Find Shift 01 content
const shift1Start = slidesContent.indexOf('title: shift 01');
const shift1End = slidesContent.indexOf('---', shift1Start + 10); // +10 to skip the first ---
const shift1Content = slidesContent.substring(shift1Start, shift1End !== -1 ? shift1End : undefined);

console.log('--- Parsing Result ---');
const results = parseKeyStats(shift1Content);
console.log(JSON.stringify(results, null, 2));
