import copy from '../data/approved-copy.json';
import testimonials from '../data/testimonials.json';
import { siteConfig } from '../config/site';
import ConsultationAction from '../components/consultation-action';
import TrustTrail from '../components/trust-trail';
import TestimonialsDisclosure from '../components/testimonials-disclosure';
import { CheckIcon, QuoteMark, StarIcon } from '../components/icons';

const sections = Object.fromEntries(copy.map(section => [section.id, section]));
const paragraphs = id => sections[id].body.split('\n\n');
const proof = paragraphs('proof');
const statement = "Terry's coaching blends strategy with mindset mastery.";
const featuredTopics = { steve: proof[1], jillian: 'Communication and public speaking', randi: 'Professional development' };
const featuredPhrases = {
  steve: 'Terry has helped me become a better professional.',
  jillian: 'The results from this experience are tangible.',
  randi: 'Small improvements that amounted to big changes',
};
const trustCredentials = [
  'PCC accreditation with the ICF',
  'CPCC certification with CTI',
  'Over 20 years of professional coaching experience',
  'Master and Post-Master NLP certifications',
];

function Emphasis({ text, phrase, className }) {
  const index = text.indexOf(phrase);
  if (index === -1) return text;
  return <>{text.slice(0, index)}<strong className={className}>{phrase}</strong>{text.slice(index + phrase.length)}</>;
}

function Heading({ id }) {
  return <h2 id={`${id}-heading`}>{sections[id].headline}</h2>;
}

function Paragraphs({ id }) {
  return paragraphs(id).map(text => <p key={text}>{text}</p>);
}

function Action({ id }) {
  return <ConsultationAction id={id} label={sections[id].cta} consultationUrl={siteConfig.consultationUrl} />;
}

function Testimonial({ account, featured = false }) {
  return (
    <figure className={`testimonial testimonial-${account.id}${featured ? ' testimonial-featured' : ''}`} data-testimonial={account.id}>
      {featured && <><QuoteMark /><h3>{featuredTopics[account.id]}</h3></>}
      <blockquote><p>{featured ? <Emphasis text={account.quote} phrase={featuredPhrases[account.id]} /> : account.quote}</p></blockquote>
      <figcaption><StarIcon />{account.attribution}</figcaption>
    </figure>
  );
}

export default function HomePage() {
  const [approachFirst, approachSecond] = paragraphs('approach');

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="page">
        <div className="environment" aria-hidden="true" />
        <header className="brand frame"><span>Terry Yoffe</span></header>
        <main id="main">
          <section className="hero" aria-labelledby="hero-heading">
            <div className="hero-lights" aria-hidden="true" />
            <div className="hero-layout frame">
              <div className="hero-copy">
                <h1 id="hero-heading"><span className="hero-first">Keep pushing through,</span>{' '}<span className="hero-question">or <span className="question-lead">look at the</span>{' '}<span className="last-pair headline-emphasis">pattern underneath?</span></span></h1>
                <div className="hero-support"><Paragraphs id="hero" /></div>
                <Action id="hero" />
              </div>
              <figure className="hero-portrait">
                <img src="/assets/terry-yoffe-hero-1800.jpg" srcSet="/assets/terry-yoffe-hero-1200.jpg 1200w, /assets/terry-yoffe-hero-1800.jpg 1800w, /assets/terry-yoffe-hero-2400.jpg 2400w" sizes="(max-width: 960px) calc(100vw - 48px), 44vw" alt="Terry Yoffe seated in a sunlit room" width="6000" height="4000" fetchPriority="high" />
              </figure>
            </div>
            <TrustTrail credentials={trustCredentials} />
          </section>
          <section className="section problem frame" aria-labelledby="problem-heading">
            <Heading id="problem" />
            <div className="passages">{paragraphs('problem').map((text, index) => <p key={text}>{index === 1 ? <Emphasis text={text} phrase="So the pattern keeps its place." className="consequence" /> : text}</p>)}</div>
          </section>
          <section className="section approach frame" aria-labelledby="approach-heading">
            <Heading id="approach" />
            <p className="approach-lead"><strong className="statement">{statement}</strong>{' '}<span className="explanation">{approachFirst.slice(statement.length).trim()}</span></p>
            <p className="approach-detail"><Emphasis text={approachSecond} phrase="shifting a long-standing pattern" className="copy-emphasis" /></p>
          </section>
          <section className="section call frame" aria-labelledby="call-heading">
            <Heading id="call" />
            <div className="call-layout">
              <div className="call-intro"><Paragraphs id="call" /></div>
              <ul className="call-topics">{sections.call.bullets.map((text, index) => <li key={text}><Emphasis text={text} phrase={['You share', 'Terry personally responds.', 'The consultation is free.'][index]} /></li>)}</ul>
            </div>
            <Action id="call" />
          </section>
          <section className="section fit frame" aria-labelledby="fit-heading">
            <Heading id="fit" />
            <p className="fit-intro">{sections.fit.body}</p>
            <ul className="criteria">{sections.fit.bullets.map((text, index) => <li key={text}><CheckIcon /><Emphasis text={text} phrase={['corporate professional, executive or leader', 'own or run a business', 'career pivot, a reinvention, or ageism'][index]} /></li>)}</ul>
          </section>
          <section className="section about frame" id="about" aria-labelledby="about-heading">
            <figure className="portrait"><img src="/assets/terry-yoffe.jpg" alt="Terry Yoffe in conversation at a table" width="1280" height="853" decoding="async" /></figure>
            <div className="bio">
              <Heading id="about" />
              {paragraphs('about').map((text, index) => <p key={text}><Emphasis text={text} phrase={['over 20 years of professional coaching experience', 'PCC accreditation with the ICF and CPCC certification with CTI', "Condé Nast, The New Yorker, Bon Appétit and Women's Wear Daily"][index]} /></p>)}
            </div>
          </section>
          <section className="section proof frame" aria-labelledby="proof-heading">
            <Heading id="proof" />
            <p className="proof-intro">{proof[0]}</p>
            <div className="featured-testimonials">{testimonials.slice(0, 3).map(account => <Testimonial key={account.id} account={account} featured />)}</div>
            <TestimonialsDisclosure>{testimonials.slice(3).map(account => <Testimonial key={account.id} account={account} />)}</TestimonialsDisclosure>
            <p className="evidence-support">{proof[3]}</p>
          </section>
          <section className="section objections frame" aria-labelledby="objections-heading">
            <Heading id="objections" />
            <div className="objection-copy"><div className="response">{paragraphs('objections').slice(0, 2).map(text => <p key={text}>{text}</p>)}</div><div className="response"><p>{paragraphs('objections')[2]}</p></div></div>
          </section>
          <section className="section closing frame" aria-labelledby="cta-heading">
            <Heading id="cta" />
            <div className="closing-support"><Paragraphs id="cta" /></div>
            <Action id="cta" />
          </section>
        </main>
      </div>
    </>
  );
}
