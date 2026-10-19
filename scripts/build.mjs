import { readFile, writeFile, mkdir } from 'node:fs/promises';

const copy = JSON.parse((await readFile('data/approved-copy.json', 'utf8')).replace(/^\uFEFF/, ''));
const testimonials = JSON.parse((await readFile('data/testimonials.json', 'utf8')).replace(/^\uFEFF/, ''));
const sections = Object.fromEntries(copy.map(section => [section.id, section]));
const esc = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const paragraphs = id => sections[id].body.split('\n\n');
const emphasis = (text, phrase, className = '') => esc(text).replace(esc(phrase), `<strong${className ? ` class="${className}"` : ''}>${esc(phrase)}</strong>`);
const p = text => `<p>${esc(text)}</p>`;
const heading = id => `<h2 id="${id}-heading">${esc(sections[id].headline)}</h2>`;
const arrow = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const check = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 12 4.5 4.5L19 7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const action = id => `<div class="action-group"><button class="action" type="button" data-consultation><span>${esc(sections[id].cta)}</span>${arrow}</button><p class="booking-status" id="booking-status-${id}" role="status" hidden></p></div>`;
const [approachFirst, approachSecond] = paragraphs('approach');
const statement = "Terry's coaching blends strategy with mindset mastery.";
const proof = paragraphs('proof');
const featuredTopics = { steve: proof[1], jillian: 'Communication and public speaking', randi: 'Professional development' };
const featuredPhrases = {
  steve: 'Terry has helped me become a better professional.',
  jillian: 'The results from this experience are tangible.',
  randi: 'Small improvements that amounted to big changes',
};
const quoteMark = '<svg class="quote-mark" viewBox="0 0 72 56" fill="currentColor" aria-hidden="true"><path d="M30 4C12 11 5 23 5 42v10h25V28H17c1-8 5-14 15-19Zm35 0C47 11 40 23 40 42v10h25V28H52c1-8 5-14 15-19Z"/></svg>';
const star = '<svg class="testimonial-star" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 1.8 3.05 6.18 6.82 1-4.94 4.81 1.17 6.8L12 17.38l-6.1 3.21 1.16-6.8-4.94-4.81 6.83-1Z"/></svg>';
const testimonial = (account, featured = false) => `<figure class="testimonial testimonial-${account.id}${featured ? ' testimonial-featured' : ''}" data-testimonial="${account.id}">
  ${featured ? `${quoteMark}<h3>${esc(featuredTopics[account.id])}</h3>` : ''}
  <blockquote><p>${featured ? emphasis(account.quote, featuredPhrases[account.id]) : esc(account.quote)}</p></blockquote>
  <figcaption>${star}${esc(account.attribution)}</figcaption>
</figure>`;
// Use only credentials already present in the approved biography, without
// implying employer endorsements or inventing a client-logo wall.
const trustCredentials = [
  'PCC accreditation with the ICF',
  'CPCC certification with CTI',
  'Over 20 years of professional coaching experience',
  'Master and Post-Master NLP certifications',
];
const trustGroup = (duplicate = false) => `<ul class="trust-group"${duplicate ? ' aria-hidden="true"' : ''}>${trustCredentials.map(text => `<li>${esc(text)}</li>`).join('')}</ul>`;

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#1b1b1a">
  <meta name="description" content="One-to-one coaching with Terry Yoffe pairs practical strategy with mindset work to get at the pattern behind it.">
  <title>Terry Yoffe — Coaching &amp; Mentoring</title>
  <link rel="preload" href="./assets/manrope-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="./assets/dm-sans-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="./styles.css">
  <script src="./config.js" defer></script>
  <script src="./main.js" defer></script>
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<div class="page">
  <div class="environment" aria-hidden="true"></div>
  <header class="brand frame"><span>Terry Yoffe</span></header>
  <main id="main">
    <section class="hero" aria-labelledby="hero-heading">
      <div class="hero-lights" aria-hidden="true"></div>
      <div class="hero-layout frame">
        <div class="hero-copy">
        <h1 id="hero-heading"><span class="hero-first">Keep pushing through,</span> <span class="hero-question">or <span class="question-lead">look at the</span> <span class="last-pair headline-emphasis">pattern underneath?</span></span></h1>
        <div class="hero-support">${paragraphs('hero').map(p).join('')}</div>
        ${action('hero')}
        </div>
        <figure class="hero-portrait">
          <img src="./assets/terry-yoffe-hero-1800.jpg" srcset="./assets/terry-yoffe-hero-1200.jpg 1200w, ./assets/terry-yoffe-hero-1800.jpg 1800w, ./assets/terry-yoffe-hero-2400.jpg 2400w" sizes="(max-width: 960px) calc(100vw - 48px), 44vw" alt="Terry Yoffe seated in a sunlit room" width="6000" height="4000" fetchpriority="high">
        </figure>
      </div>
      <aside class="trust-trail" aria-label="Terry's coaching credentials" data-trust-trail>
        <div class="trust-window" tabindex="0" role="group" aria-label="Coaching credentials. Drag, swipe, or use the left and right arrow keys to explore."><div class="trust-track">${trustGroup()}${trustGroup(true)}${trustGroup(true)}</div></div>
      </aside>
    </section>
    <section class="section problem frame" aria-labelledby="problem-heading">
      ${heading('problem')}
      <div class="passages">${paragraphs('problem').map((text, i) => `<p>${i === 1 ? emphasis(text, 'So the pattern keeps its place.', 'consequence') : esc(text)}</p>`).join('')}</div>
    </section>
    <section class="section approach frame" aria-labelledby="approach-heading">
      ${heading('approach')}
      <p class="approach-lead"><strong class="statement">${esc(statement)}</strong> <span class="explanation">${esc(approachFirst.slice(statement.length).trim())}</span></p>
      <p class="approach-detail">${emphasis(approachSecond, 'shifting a long-standing pattern', 'copy-emphasis')}</p>
    </section>
    <section class="section call frame" aria-labelledby="call-heading">
      ${heading('call')}
      <div class="call-layout">
        <div class="call-intro">${paragraphs('call').map(p).join('')}</div>
        <ul class="call-topics">${sections.call.bullets.map((text, i) => `<li>${emphasis(text, ['You share', 'Terry personally responds.', 'The consultation is free.'][i])}</li>`).join('')}</ul>
      </div>
      ${action('call')}
    </section>
    <section class="section fit frame" aria-labelledby="fit-heading">
      ${heading('fit')}
      <p class="fit-intro">${esc(sections.fit.body)}</p>
      <ul class="criteria">${sections.fit.bullets.map((text, i) => `<li>${check}${emphasis(text, ['corporate professional, executive or leader', 'own or run a business', 'career pivot, a reinvention, or ageism'][i])}</li>`).join('')}</ul>
    </section>
    <section class="section about frame" id="about" aria-labelledby="about-heading">
      <figure class="portrait"><img src="./assets/terry-yoffe.jpg" alt="Terry Yoffe in conversation at a table" width="1280" height="853" decoding="async"></figure>
      <div class="bio">
        ${heading('about')}
        ${paragraphs('about').map((text, i) => `<p>${emphasis(text, ['over 20 years of professional coaching experience', 'PCC accreditation with the ICF and CPCC certification with CTI', 'Condé Nast, The New Yorker, Bon Appétit and Women\'s Wear Daily'][i])}</p>`).join('')}
      </div>
    </section>
    <section class="section proof frame" aria-labelledby="proof-heading">
      ${heading('proof')}
      <p class="proof-intro">${esc(proof[0])}</p>
      <div class="featured-testimonials">${testimonials.slice(0,3).map(account => testimonial(account, true)).join('')}</div>
      <details class="more-testimonials">
        <summary><span>Show all testimonials</span><svg class="disclosure-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M12 5v14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></summary>
        <div class="additional-testimonials">${testimonials.slice(3).map(account => testimonial(account)).join('')}</div>
      </details>
      <p class="evidence-support">${esc(proof[3])}</p>
    </section>
    <section class="section objections frame" aria-labelledby="objections-heading">
      ${heading('objections')}
      <div class="objection-copy"><div class="response">${paragraphs('objections').slice(0,2).map(p).join('')}</div><div class="response">${p(paragraphs('objections')[2])}</div></div>
    </section>
    <section class="section closing frame" aria-labelledby="cta-heading">
      ${heading('cta')}
      <div class="closing-support">${paragraphs('cta').map(p).join('')}</div>
      ${action('cta')}
    </section>
  </main>
</div>
</body>
</html>`;

await mkdir('dist/assets', { recursive: true });
await writeFile('dist/index.html', html);

await writeFile('dist/assets/grain.svg','<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".84" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><path fill="#fff" filter="url(#n)" d="M0 0h180v180H0z"/></svg>');
console.log(`Built ${copy.length} sections, eight complete testimonials, and the local photo hero.`);
