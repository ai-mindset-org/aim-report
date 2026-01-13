const fs = require('fs');
const path = require('path');

// Read the current reportDeck.ts and extract RAW_SLIDES
const reportDeckPath = path.join(__dirname, '../reportDeck.ts');
const content = fs.readFileSync(reportDeckPath, 'utf-8');

// Extract RAW_SLIDES array content
const slidesMatch = content.match(/const RAW_SLIDES: SlideData\[\] = \[([\s\S]*?)\];[\s]*\/\/ =/m);

if (!slidesMatch) {
  console.error('Could not find RAW_SLIDES in reportDeck.ts');
  process.exit(1);
}

// Convert TypeScript to JSON
// This is a simple approach - we'll use the backup file and manually extract
const backupPath = path.join(__dirname, '../reportDeck_BACKUP_before_shifts.ts');
if (fs.existsSync(backupPath)) {
  console.log('Found backup file - using it as base for JSON export');
  const backupContent = fs.readFileSync(backupPath, 'utf-8');
  
  // For now, create a placeholder structure
  const slidesJson = {
    slides: [],
    metadata: {
      version: 'v4',
      title: 'THE CONTEXT GAP',
      exportedAt: new Date().toISOString()
    }
  };
  
  const outputPath = path.join(__dirname, '../public/locales/en/slides.json');
  fs.writeFileSync(outputPath, JSON.stringify(slidesJson, null, 2));
  console.log('Created placeholder slides.json at:', outputPath);
  console.log('Manual extraction needed - TypeScript AST parsing required for full automation');
} else {
  console.log('No backup file found - will need to manually convert slides');
}
