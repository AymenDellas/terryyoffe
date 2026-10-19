import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';

const html = await readFile('dist/index.html', 'utf8');
const copy = JSON.parse((await readFile('data/approved-copy.json', 'utf8')).replace(/^\uFEFF/, ''));
const testimonials = JSON.parse((await readFile('data/testimonials.json', 'utf8')).replace(/^\uFEFF/, ''));
const decode = s => s.replaceAll('&amp;', '&').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&quot;', '"');
const plain = s => decode(s.replace(/<\/?(?:span|strong)\b[^>]*>/g, '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const markup = [...html.matchAll(/<section\b[\s\S]*?<\/section>/g)].map(m => m[0]);
assert.equal(markup.length, copy.length, 'Every approved section is present');
assert.equal((html.match(/<h1\b/g) || []).length, 1, 'Exactly one h1');
assert.equal((html.match(/data-consultation/g) || []).length, copy.filter(s => s.cta).length, 'Only supplied CTA placements');
for (const [i, section] of copy.entries()) {
  const actual = plain(markup[i]);
  const proof = section.body.split('\n\n');
  const topics = [proof[1], 'Communication and public speaking', 'Professional development'];
  const expected = section.id === 'proof'
    ? plain([section.headline, proof[0], ...testimonials.slice(0,3).flatMap((t, j) => [topics[j], t.quote, t.attribution]), 'Show all testimonials (5 more).', ...testimonials.slice(3).flatMap(t => [t.quote, t.attribution]), proof[3]].join(' '))
    : plain([section.headline, section.body, ...section.bullets, section.cta].join(' '));
  assert.equal(actual, expected, `Exact copy and order: ${section.id}`);
}
const accounts = [...html.matchAll(/<figure\b[^>]*data-testimonial="([^"]+)"[\s\S]*?<\/figure>/g)];
assert.equal(accounts.length, 8, 'Eight complete accounts present before interaction');
assert.deepEqual(accounts.map(a => a[1]), ['steve','jillian','randi','michael','rebecca','janice','robert','jaime']);
assert.equal((html.match(/<blockquote>/g) || []).length, 8, 'No duplicate excerpts');
for (const account of accounts) {
  const supplied = testimonials.find(t => t.id === account[1]);
  const quote = account[0].match(/<blockquote><p>([\s\S]*?)<\/p><\/blockquote>/)[1];
  const attribution = account[0].match(/<figcaption>([\s\S]*?)<\/figcaption>/)[1];
  assert.equal(decode(quote), supplied.quote, `Exact quotation punctuation: ${supplied.id}`);
  assert.equal(decode(attribution), supplied.attribution, `Exact attribution: ${supplied.id}`);
}
const expandable = html.match(/<details class="more-testimonials">([\s\S]*?)<\/details>/)[1];
assert.equal((expandable.match(/data-testimonial/g) || []).length, 5, 'Five native expandable accounts');
assert.equal((html.match(/testimonial-featured/g) || []).length, 3, 'Three fully featured accounts');
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
// Conservative lit-reading-area bound; rendered backdrop samples are also inspected.
const contrastResults = Object.fromEntries(['f7f7fa','e2e4ed','b5bbce','c9ccff'].map(color => [color, +contrast(color, '33384e').toFixed(2)]));
contrastResults.action = +contrast('161d37','c5c8ff').toFixed(2);
for (const value of Object.values(contrastResults)) assert.ok(value >= 4.5, 'Normal text contrast meets WCAG AA');
for (const color of ['f7f7fa','e2e4ed','c9ccff']) assert.ok(contrastResults[color] >= 7, 'Essential reading text meets the 7:1 target');
console.log(JSON.stringify({sections:copy.length,approvedCopy:'exact outside replaced testimonials',testimonials:{complete:8,featured:3,expandable:5},primaryControls:copy.filter(s=>s.cta).length,assets:'present',contrast:contrastResults}, null, 2));

