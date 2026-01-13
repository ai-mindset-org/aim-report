import { watch } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const contentPath = join(__dirname, '../content/slides.md');

console.log('👀 Watching content/slides.md for changes...');
console.log('   Editing slides.md will auto-update JSON and commit changes.');
console.log('   Press Ctrl+C to stop.\n');

let timeout: NodeJS.Timeout | null = null;

watch(contentPath, (eventType) => {
  if (eventType === 'change') {
    // Debounce: wait 500ms after last change
    if (timeout) clearTimeout(timeout);
    
    timeout = setTimeout(() => {
      console.log('\n📝 Change detected in slides.md');
      
      try {
        // 1. Convert MD to JSON
        console.log('🔄 Converting to JSON...');
        execSync('npx tsx scripts/md-to-json.ts', { 
          cwd: join(__dirname, '..'),
          stdio: 'inherit'
        });
        
        // 2. Auto-commit changes
        console.log('💾 Auto-committing changes...');
        execSync('git add public/locales/en/*.json content/slides.md', { 
          cwd: join(__dirname, '..'),
          stdio: 'pipe'
        });
        
        const timestamp = new Date().toISOString();
        execSync(`git commit -m "content: auto-update from slides.md (${timestamp})" || true`, {
          cwd: join(__dirname, '..'),
          stdio: 'pipe'
        });
        
        console.log('✅ Changes saved and committed!');
        console.log('   Run "npm run deploy" to push → GitHub Pages will auto-deploy.\n');
        console.log('👀 Watching for next change...');
        
      } catch (error) {
        console.error('❌ Error:', error);
      }
    }, 500);
  }
});

// Keep process alive
process.on('SIGINT', () => {
  console.log('\n\n👋 Stopped watching. Goodbye!');
  process.exit(0);
});
