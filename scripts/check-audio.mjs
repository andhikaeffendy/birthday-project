import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd(), 'app');
let errors = [];

const walk = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.isFile() && /\.(tsx|ts|jsx|js)$/.test(e.name)) checkFile(p);
  }
};

const checkFile = (file) => {
  const src = fs.readFileSync(file, 'utf8');
  // Disallow YouTube usage in music player
  if (file.endsWith('MusicPlayer.tsx')) {
    if (src.includes('youtube.com/embed') || src.includes('<iframe')) {
      errors.push(`${file}: contains YouTube iframe`);
    }
    if (src.includes('setMode("youtube"') || src.includes('mode === "youtube"')) {
      errors.push(`${file}: references YouTube mode`);
    }
  }
  // Disallow setting YouTube IDs anywhere
  const badIdA = src.includes('__musicSet("s6oZ6LJeDws"');
  const badIdB = src.includes('__musicSet("FjHGZj2IjBk"');
  if (badIdA || badIdB) {
    errors.push(`${file}: __musicSet uses YouTube video ID`);
  }
};

walk(root);

if (errors.length) {
  console.error('Audio policy violations found:');
  for (const e of errors) console.error('-', e);
  process.exit(1);
} else {
  console.log('Audio policy OK: no YouTube usage found.');
}

