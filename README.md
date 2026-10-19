# Terry Yoffe — Coaching & Mentoring

A Next.js App Router landing page with the approved charcoal/orange design, overhead hero lights, authentic local photography, eight complete testimonials and an interactive credential trail.

## Local development

Use Node.js 22 and npm:

```sh
npm ci
npm run dev
```

Preview: http://127.0.0.1:4173/. Keep the local preview running for the user.

To compile and check the actual production output:

```sh
npm run build
npm run check
npm start
```

`npm run check` runs after the build. It verifies the prerendered Next.js home page against the approved copy, all eight exact testimonial quotations and attributions, the disclosure, trust credentials, local assets, contrast and Vercel build settings.

## Vercel deployment

Import `AymenDellas/terryyoffe`, using the repository root. `vercel.json` explicitly selects Next.js, runs `npm run build`, and uses `.next` as the build output. This overrides a previous `public` output setting that caused the reported deployment failure. `public/` contains source assets; it is not the compiled application.

The lockfile pins the installed dependencies. Vercel uses the Node.js 22 engine declared in `package.json`. No environment variables are required to build this site.

If editing the Vercel dashboard manually, use Framework Preset **Next.js**, Build Command **npm run build**, and Output Directory **.next** (or disable its override to use the Next.js default). Redeploy the latest commit.

Configuration references: [Next.js installation](https://nextjs.org/docs/app/getting-started/installation), [Vercel framework and output settings](https://vercel.com/docs/project-configuration/vercel-json).

## Source structure

- `app/page.jsx`: server-rendered sections built from approved JSON content.
- `app/layout.jsx`: metadata, document layout and local font preloads.
- `app/globals.css`: the existing responsive design and orange/charcoal palette.
- `components/`: consultation controls, the trust trail, native testimonial disclosure and icons.
- `public/assets/`: local fonts, optimized photographs, grain and overhead light artwork.
- `data/approved-copy.json` and `data/testimonials.json`: complete approved source wording.
- `config/site.js`: the consultation destination.

The page is prerendered by Next.js. All eight testimonials exist in its initial HTML. Steve, Jillian and Randi appear in full; Michael, Rebecca, Janice, Robert and Jaime are inside one native `details` disclosure. No accounts are fetched, truncated or replaced by excerpts.

The credential trail supports hover pause, mouse dragging, native touch/trackpad scrolling and keyboard arrows, with no visible scrollbar or pause button. It stops when offscreen, respects reduced motion, and cleans up its observers, listeners and animation frame when unmounted.

## Consultation destination

The approved booking URL remains blank. Set `siteConfig.consultationUrl` in `config/site.js` when one is supplied. A valid absolute HTTPS URL renders the three consultation actions as links. While unconfigured, clicking an action explicitly states that booking is not connected. No data is collected and no booking is simulated.
