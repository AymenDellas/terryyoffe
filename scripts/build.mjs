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
const testimonial = (account, featured = false) => `<figure class="testimonial testimonial-${account.id}${featured ? ' testimonial-featured' : ''}" data-testimonial="${account.id}">
  ${featured ? `<h3>${esc(featuredTopics[account.id])}</h3>` : ''}
  <blockquote><p>${esc(account.quote)}</p></blockquote>
  <figcaption>${esc(account.attribution)}</figcaption>
</figure>`;

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#090a0e">
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
      <div class="hero-art" aria-hidden="true"><img src="./assets/unfold.svg" alt="" width="1000" height="1000" fetchpriority="high"></div>
      <div class="frame">
        <h1 id="hero-heading"><span class="hero-first">Keep pushing through,</span> <span class="hero-question">or look at the <span class="last-pair headline-emphasis">pattern underneath?</span></span></h1>
        <div class="hero-support">${paragraphs('hero').map(p).join('')}</div>
        ${action('hero')}
      </div>
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
    <section class="section about frame" aria-labelledby="about-heading">
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
        <summary><span>Show all testimonials (5 more).</span><svg class="disclosure-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M12 5v14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></summary>
        <div class="additional-testimonials">${testimonials.slice(3).map(account => testimonial(account)).join('')}</div>
      </details>
      <p class="evidence-support">${esc(proof[3])}</p>
    </section>
    <section class="section objections frame" aria-labelledby="objections-heading">
      ${heading('objections')}
      <div class="objection-copy"><div class="response">${paragraphs('objections').slice(0,2).map(p).join('')}</div><div class="response">${p(paragraphs('objections')[2])}</div></div>
    </section>
    <section class="section closing frame" aria-labelledby="cta-heading">
      <div class="closing-art" aria-hidden="true"><img src="./assets/unfold.svg" alt="" width="1000" height="1000" loading="lazy"></div>
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

// A single authored surface: a loop that changes its orientation as it unfolds.
// The strip is constructed in 3D and painter-sorted. It is artwork, not a process diagram.
const vec = {
  sub:(a,b)=>a.map((v,i)=>v-b[i]),
  cross:(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],
  norm:a=>{const n=Math.hypot(...a);return a.map(v=>v/n);},
};
function point(u,v){
  const radius=265+v*Math.cos(u/2);
  let x=radius*Math.cos(u), y=radius*Math.sin(u), z=v*Math.sin(u/2);
  // Rotate the loop away from the viewer, then tilt across the page.
  const cx=Math.cos(.68),sx=Math.sin(.68),cz=Math.cos(-.42),sz=Math.sin(-.42);
  [y,z]=[y*cx-z*sx,y*sx+z*cx];
  [x,y]=[x*cz-y*sz,x*sz+y*cz];
  return [x,y,z];
}
function project([x,y,z]){const s=1+z/1400;return [500+x*s,500+y*s,z];}
const light=vec.norm([-.5,-.8,1]);
const faces=[];
const segments=300, widthSteps=8;
for(let i=0;i<segments;i++)for(let j=0;j<widthSteps;j++){
  const a=i/segments*Math.PI*2,b=(i+1.04)/segments*Math.PI*2;
  const w1=-106+j/widthSteps*212,w2=-106+(j+1.02)/widthSteps*212;
  const raw=[point(a,w1),point(b,w1),point(b,w2),point(a,w2)];
  const n=vec.norm(vec.cross(vec.sub(raw[1],raw[0]),vec.sub(raw[3],raw[0])));
  const d=Math.abs(n.reduce((s,v,k)=>s+v*light[k],0));
  const edge=(j/widthSteps-.5)**2;
  const intensity=.14+.74*d+.12*Math.pow(d,15)-edge*.18;
  const dark=[30,43,83],bright=[181,184,238];
  const rgb=dark.map((v,k)=>Math.round(v+(bright[k]-v)*intensity));
  const projected=raw.map(project);
  faces.push({depth:raw.reduce((s,p)=>s+p[2],0)/4,svg:`<path d="M${projected.map(p=>`${p[0].toFixed(2)},${p[1].toFixed(2)}`).join('L')}Z" fill="rgb(${rgb})" stroke="rgb(${rgb})" stroke-width=".45"/>`});
}
faces.sort((a,b)=>a.depth-b.depth);
const ribbon=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><radialGradient id="ambient"><stop stop-color="#687bc1" stop-opacity=".13"/><stop offset="1" stop-color="#0b111d" stop-opacity="0"/></radialGradient><filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".82" numOctaves="3" stitchTiles="stitch" result="noise"/><feColorMatrix in="noise" type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".10"/></feComponentTransfer><feComposite in2="SourceGraphic" operator="in" result="texture"/><feBlend in="SourceGraphic" in2="texture" mode="soft-light"/></filter></defs><ellipse cx="520" cy="510" rx="480" ry="440" fill="url(#ambient)"/><g filter="url(#grain)">${faces.map(f=>f.svg).join('')}</g></svg>`;
await writeFile('dist/assets/unfold.svg',ribbon);
await writeFile('dist/assets/grain.svg','<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".84" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><path fill="#fff" filter="url(#n)" d="M0 0h180v180H0z"/></svg>');
console.log(`Built all ${copy.length} approved sections and original artwork into dist/.`);
