import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const checks = [
  { file: 'app/main-menu/page.tsx', tokens: ['START', '__musicSet("/assets/music/mainmenu-clip.mp3"'] },
  { file: 'app/game-intro/page.tsx', tokens: ['START', '__musicSet("/assets/music/mainmenu-clip.mp3"'] },
  { file: 'app/level-1/page.tsx', tokens: ['LEVEL 1', '__musicSet("/assets/music/level1-clip.mp3"'] },
  { file: 'app/level-2/page.tsx', tokens: ['HINT', 'RESET', '__musicSet("/assets/music/level2-clip.mp3"'] },
  { file: 'app/level-3/page.tsx', tokens: ['LEVEL 3', '__musicSet("/assets/music/level3-clip.mp3"'] },
  { file: 'app/level-4/page.tsx', tokens: ['LEVEL 4', 'RESET', 'HINT'] },
  { file: 'app/congratulation/page.tsx', tokens: ['tv-black'] },
  { file: 'app/final-game/page.tsx', tokens: ['story-enter', '__musicSet("/assets/music/final-theme.mp3"'] },
];

let failures = [];

for (const c of checks) {
  const file = path.join(root, c.file);
  if (!fs.existsSync(file)) {
    failures.push(`${c.file}: missing`);
    continue;
  }
  const src = fs.readFileSync(file, 'utf8');
  for (const t of c.tokens) {
    if (!src.includes(t)) failures.push(`${c.file}: missing token '${t}'`);
  }
}

// Background movement policy: level-4 must not use parallax/pan classes
{
  const f = path.join(root, 'app/level-4/page.tsx');
  const src = fs.readFileSync(f, 'utf8');
  const bad = ['bg-parallax', 'dungeon-pan', 'kb-up', 'kb-down', 'kb-left', 'kb-right', 'kb-zoom'];
  for (const b of bad) {
    if (src.includes(b)) failures.push(`app/level-4/page.tsx: contains disallowed background class '${b}'`);
  }
}

// Audio asset existence check
{
  const assets = [
    'public/assets/music/mainmenu-clip.mp3',
    'public/assets/music/level1-clip.mp3',
    'public/assets/music/level2-clip.mp3',
    'public/assets/music/level3-clip.mp3',
    'public/assets/music/congrats-clip.mp3',
  ];
  for (const a of assets) if (!fs.existsSync(path.join(root, a))) failures.push(`${a}: missing`);
}

if (failures.length) {
  console.error('Source E2E checks failed:');
  for (const f of failures) console.error('-', f);
  process.exit(1);
} else {
  console.log('Source E2E checks passed');
}
