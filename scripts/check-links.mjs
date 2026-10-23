// Checks every internal link, image and asset reference in the built site (dist/).
// Usage: npm run build && npm run test:links
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const html = walk(DIST).filter((f) => f.endsWith('.html'));
const resolves = (url) => {
  const path = decodeURIComponent(url.split('#')[0].split('?')[0]);
  if (!path) return true;
  const p = join(DIST, path);
  return existsSync(p) && (statSync(p).isFile() || existsSync(join(p, 'index.html')));
};

let checked = 0;
const broken = [];
for (const file of html) {
  const src = readFileSync(file, 'utf8');
  const refs = [
    ...src.matchAll(/\s(?:href|src)="([^"]+)"/g),
    ...[...src.matchAll(/\ssrcset="([^"]+)"/g)].flatMap((m) => m[1].split(',').map((s) => [null, s.trim().split(/\s+/)[0]])),
  ].map((m) => m[1]);
  for (const ref of refs) {
    if (!ref.startsWith('/') || ref.startsWith('//')) continue;
    checked++;
    if (!resolves(ref)) broken.push(`${relative(DIST, file)} → ${ref}`);
  }
}

console.log(`Checked ${checked} internal references in ${html.length} pages.`);
if (broken.length) {
  console.error(`Broken (${broken.length}):\n  ${[...new Set(broken)].join('\n  ')}`);
  process.exit(1);
}
console.log('No broken internal links.');
