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

`data/approved-copy.json` retains the original approved copy. `data/testimonials.json` stores the eight complete replacement accounts and their exact attributions. `scripts/build.mjs` generates the HTML and original artwork. Styles are in `dist/styles.css`; consultation behavior is in `dist/main.js`. Rebuilding preserves the CSS, configuration, fonts, photograph and behavior.

Steve, Jillian and Randi appear in full. Michael, Rebecca, Janice, Robert and Jaime are already in the HTML inside one native `details` disclosure. It works with pointer, Enter and Space without JavaScript or fetching. Every supplied quote and attribution appears once, with no truncation.

The refined canvas is brand-tinted near-black (#090a0e), with light reading text, restrained underlining and controlled lighting. Visible content gaps are 136px on desktop and 80px on phones. See [DESIGN.md](DESIGN.md) for the composition map, asset provenance and verification record.
