# Terry Yoffe — Coaching & Mentoring

Complete static responsive implementation. No packages or build dependencies are required. Fonts, authentic photography and original SVG artwork are served locally.

```sh
npm run build
npm run check
npm run dev
```

The local preview is available at `http://127.0.0.1:4173`. Deploy the `dist` directory on any static host. `dist/index.html` is fully rendered HTML and does not depend on JavaScript to display its content.

## Consultation destination

The brief did not supply an approved booking URL. Put it in `dist/config.js` as `window.TERRY_SITE.consultationUrl`. A valid absolute HTTPS URL converts all three consultation controls to real links. While unconfigured, clicking a control explicitly discloses that booking is not connected. No data is collected and no booking is simulated.

## Editing

`data/approved-copy.json` retains the exact approved copy. `scripts/build.mjs` generates the HTML and original artwork. Styles are in `dist/styles.css`; consultation behavior is in `dist/main.js`. Rebuilding preserves the CSS, configuration, fonts, photograph and behavior.

See [DESIGN.md](DESIGN.md) for the implemented concept, composition map, asset provenance and editorial concerns. The approved testimonial contains no outcome; its original attribution and broad follow-up claim are preserved verbatim for editorial review.
