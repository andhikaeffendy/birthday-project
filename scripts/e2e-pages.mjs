import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve(process.cwd(), 'out');
const pages = [
  { route: '/', file: 'index.html', tokens: ['main-menu', 'MENU'] },
  { route: '/main-menu', file: 'main-menu.html', tokens: ['MENU'] },
  { route: '/game-intro', file: 'game-intro.html', tokens: ['NEXT'] },
  { route: '/level-1', file: 'level-1.html', tokens: ['HINT'] },
  { route: '/level-2', file: 'level-2.html', tokens: ['HINT'] },
  { route: '/level-3', file: 'level-3.html', tokens: ['LEVEL 3'] },
  { route: '/level-4', file: 'level-4.html', tokens: ['LEVEL 4', 'RESET', 'HINT'] },
  { route: '/congratulation', file: 'congratulation.html', tokens: ['tv-black'] },
  { route: '/final-game', file: 'final-game.html', tokens: ['story-enter'] },
];

let failures = [];

function checkFile(file, tokens) {
  const full = path.join(outDir, file);
  if (!fs.existsSync(full)) {
    failures.push(`${file}: missing`);
    return;
  }
  const html = fs.readFileSync(full, 'utf8');
  for (const t of tokens) {
    if (!html.includes(t)) failures.push(`${file}: missing token '${t}'`);
  }
}

for (const p of pages) checkFile(p.file, p.tokens);

if (failures.length) {
  console.error('Static E2E checks failed:');
  for (const f of failures) console.error('-', f);
  process.exit(1);
} else {
  console.log('Static E2E checks passed for', pages.map(p => p.route).join(', '));
}
