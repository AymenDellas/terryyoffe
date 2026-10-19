import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';

const generatedDocument = await readFile('.next/server/app/index.html', 'utf8');
// Audit rendered HTML, excluding the serialized React payload in script blocks.
const html = generatedDocument.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
const css = await readFile('app/globals.css', 'utf8');
const copy = JSON.parse((await readFile('data/approved-copy.json', 'utf8')).replace(/^\uFEFF/, ''));
const testimonials = JSON.parse((await readFile('data/testimonials.json', 'utf8')).replace(/^\uFEFF/, ''));
const decode = s => s.replaceAll('&amp;', '&').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&quot;', '"').replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16))).replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)));
const plain = s => decode(s.replace(/<!--[\s\S]*?-->/g, '').replace(/<\/?(?:span|strong)\b[^>]*>/g, '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const markup = [...html.matchAll(/<section\b[\s\S]*?<\/section>/g)].map(m => m[0]);
assert.equal(markup.length, copy.length, 'Every approved section is present');
assert.equal((html.match(/<h1\b/g) || []).length, 1, 'Exactly one h1');
assert.equal((html.match(/data-consultation/g) || []).length, copy.filter(s => s.cta).length, 'Only supplied CTA placements');
for (const [i, section] of copy.entries()) {
  const actual = plain(markup[i].replace(/<aside class="trust-trail"[\s\S]*?<\/aside>/, ''));
  const proof = section.body.split('\n\n');
  const topics = [proof[1], 'Communication and public speaking', 'Professional development'];
  const expected = section.id === 'proof'
    ? plain([section.headline, proof[0], ...testimonials.slice(0,3).flatMap((t, j) => [topics[j], t.quote, t.attribution]), 'Show all testimonials', ...testimonials.slice(3).flatMap(t => [t.quote, t.attribution]), proof[3]].join(' '))
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
  assert.equal(decode(quote.replace(/<[^>]*>/g, '')), supplied.quote, `Exact quotation punctuation: ${supplied.id}`);
  assert.equal(plain(attribution), supplied.attribution, `Exact attribution: ${supplied.id}`);
}
const expandable = html.match(/<details class="more-testimonials">([\s\S]*?)<\/details>/)[1];
assert.equal((expandable.match(/data-testimonial/g) || []).length, 5, 'Five native expandable accounts');
assert.equal((html.match(/testimonial-featured/g) || []).length, 3, 'Three fully featured accounts');
for (const asset of ['assets/grain.svg', 'assets/hero-downlights.svg', 'assets/terry-yoffe.jpg', 'assets/terry-yoffe-hero-1200.jpg', 'assets/terry-yoffe-hero-1800.jpg', 'assets/terry-yoffe-hero-2400.jpg', 'assets/manrope-latin.woff2', 'assets/dm-sans-latin.woff2']) {
  assert.ok((await stat('public/' + asset)).size > 0, `Asset exists: ${asset}`);
}
assert.ok(!html.includes('unfold.svg'), 'Retired ribbon artwork is not displayed');
const trustGroups = [...html.matchAll(/<ul class="trust-group"([^>]*)>([\s\S]*?)<\/ul>/g)];
assert.equal(trustGroups.length, 3, 'Three identical groups allow seamless dragging in either direction');
for (const duplicate of trustGroups.slice(1)) {
  assert.equal(trustGroups[0][2], duplicate[2], 'The trail loops without a content seam');
  assert.ok(duplicate[1].includes('aria-hidden="true"'), 'Screen readers do not repeat the duplicated trail');
}
assert.equal((trustGroups[0][2].match(/<li>/g) || []).length, 4, 'Four factual credentials');
assert.ok(html.includes('class="trust-window" tabindex="0"'), 'The trail is keyboard accessible');
assert.ok(!html.includes('trust-toggle'), 'The requested pause button is removed');
assert.ok(!/<nav\b|<form\b|<iframe\b/.test(html), 'No unrelated navigation or unconfigured data collection');
const vercel = JSON.parse(await readFile('vercel.json', 'utf8'));
const manifest = JSON.parse(await readFile('package.json', 'utf8'));
assert.equal(vercel.framework, 'nextjs', 'Vercel uses the Next.js framework adapter');
assert.equal(vercel.outputDirectory, '.next', 'Vercel does not mistake public assets for build output');
assert.equal(manifest.scripts.build, 'next build', 'Production uses the actual Next.js compiler');
assert.ok(html.includes('/_next/'), 'The generated document includes Next.js application assets');

const luminance = color => {
  const rgb = color.match(/\w\w/g).map(v => parseInt(v, 16) / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
  return .2126 * rgb[0] + .7152 * rgb[1] + .0722 * rgb[2];
};
const contrast = (a, b) => (Math.max(luminance(a), luminance(b)) + .05) / (Math.min(luminance(a), luminance(b)) + .05);
const token = name => css.match(new RegExp('--' + name + ':#([0-9a-f]{6})'))[1];
// A conservative warm, lit charcoal bound. Actual photo and reading areas are separate.
const contrastResults = Object.fromEntries(['display','body','quiet','accent'].map(role => [role, +contrast(token(role), '3c3630').toFixed(2)]));
contrastResults.action = +contrast(token('action-ink'),token('action')).toFixed(2);
for (const value of Object.values(contrastResults)) assert.ok(value >= 4.5, 'Normal text contrast meets WCAG AA');
for (const role of ['display','body','accent']) assert.ok(contrastResults[role] >= 7, `${role} contrast ${contrastResults[role]} must meet 7:1`);
console.log(JSON.stringify({sections:copy.length,approvedCopy:'exact, plus requested factual trust trail',testimonials:{complete:8,featured:3,expandable:5},primaryControls:copy.filter(s=>s.cta).length,trustCredentials:4,assets:'present',contrast:contrastResults}, null, 2));

