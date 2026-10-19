import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';

const html = await readFile('dist/index.html', 'utf8');
const copy = JSON.parse((await readFile('data/approved-copy.json', 'utf8')).replace(/^\uFEFF/, ''));
const decode = s => s.replaceAll('&amp;', '&').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&quot;', '"');
const plain = s => decode(s.replace(/<\/?(?:span|strong)\b[^>]*>/g, '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const markup = [...html.matchAll(/<section\b[\s\S]*?<\/section>/g)].map(m => m[0]);
assert.equal(markup.length, copy.length, 'Every approved section is present');
assert.equal((html.match(/<h1\b/g) || []).length, 1, 'Exactly one h1');
assert.equal((html.match(/data-consultation/g) || []).length, copy.filter(s => s.cta).length, 'Only supplied CTA placements');
for (const [i, section] of copy.entries()) {
  const actual = plain(markup[i]);
  const expected = plain([section.headline, section.body, ...section.bullets, section.cta].join(' '));
  assert.equal(actual, expected, `Exact copy and order: ${section.id}`);
}
for (const asset of ['styles.css', 'main.js', 'config.js', 'assets/unfold.svg', 'assets/grain.svg', 'assets/terry-yoffe.jpg', 'assets/manrope-latin.woff2', 'assets/dm-sans-latin.woff2']) {
  assert.ok((await stat('dist/' + asset)).size > 0, `Asset exists: ${asset}`);
}
assert.ok(!/<nav\b|<form\b|<iframe\b/.test(html), 'No unrelated navigation or unconfigured data collection');
for (const file of ['dist/main.js', 'dist/config.js']) new Function(await readFile(file, 'utf8'));

const luminance = color => {
  const rgb = color.match(/\w\w/g).map(v => parseInt(v, 16) / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
  return .2126 * rgb[0] + .7152 * rgb[1] + .0722 * rgb[2];
};
const contrast = (a, b) => (Math.max(luminance(a), luminance(b)) + .05) / (Math.min(luminance(a), luminance(b)) + .05);
// #263253 is a conservative upper bound for the lit reading-area background.
const contrastResults = Object.fromEntries(['f5f5f9','d3d7e1','9ea8bd','b7bafa'].map(color => [color, +contrast(color, '263253').toFixed(2)]));
contrastResults.action = +contrast('161d37','c5c8ff').toFixed(2);
for (const value of Object.values(contrastResults)) assert.ok(value >= 4.5, 'Normal text contrast meets WCAG AA');
console.log(JSON.stringify({sections:copy.length,approvedCopy:'exact',primaryControls:copy.filter(s=>s.cta).length,assets:'present',contrast:contrastResults}, null, 2));
