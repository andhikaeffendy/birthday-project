import fs from 'node:fs';
import path from 'node:path';

const pages = [
  'app/main-menu/page.tsx',
  'app/game-intro/page.tsx',
  'app/level-1/page.tsx',
  'app/level-2/page.tsx',
  'app/level-3/page.tsx',
  'app/level-4/page.tsx',
  'app/congratulation/page.tsx',
];

const root = process.cwd();
let errors = [];
let ok = [];

for (const rel of pages) {
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) {
    errors.push(`${rel}: missing`);
    continue;
  }
  const src = fs.readFileSync(file, 'utf8');
  const hasSet = /__musicSet\(\s*"\/.+?\.mp3"/.test(src);
  const hasPlay = src.includes('__musicPlay');
  if (!hasSet) errors.push(`${rel}: missing __musicSet with asset path`);
  if (!hasPlay) errors.push(`${rel}: missing __musicPlay call`);
  if (hasSet && hasPlay) ok.push(rel);
}

if (errors.length) {
  console.error('Music coverage issues:');
  for (const e of errors) console.error('-', e);
  process.exit(1);
} else {
  console.log('Music coverage OK on pages:', ok.join(', '));
}

