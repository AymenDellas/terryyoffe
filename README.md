# Terry Yoffe — Coaching & Mentoring

Local-only responsive implementation. No packages or build dependencies are required. Fonts, authentic photography and grain texture are served locally. Do not deploy or synchronize it to a hosted service unless the user explicitly requests deployment.

```sh
npm run build
npm run check
npm run dev
```

The local preview is available at `http://127.0.0.1:4173`. Leave the existing preview server running for the user. `dist/index.html` is fully rendered HTML and does not depend on JavaScript to display its content.

## Consultation destination

The brief did not supply an approved booking URL. Put it in `dist/config.js` as `window.TERRY_SITE.consultationUrl`. A valid absolute HTTPS URL converts all three consultation controls to real links. While unconfigured, clicking a control explicitly discloses that booking is not connected. No data is collected and no booking is simulated.

## Editing

`data/approved-copy.json` retains the original approved copy. `data/testimonials.json` stores the eight complete replacement accounts and their exact attributions. `scripts/build.mjs` generates the HTML and grain asset. Styles are in `dist/styles.css`; consultation and trust-trail controls are in `dist/main.js`. Rebuilding preserves the CSS, configuration, fonts, photographs and behavior.

Steve, Jillian and Randi appear in full. Michael, Rebecca, Janice, Robert and Jaime are already in the HTML inside one native `details` disclosure. It works with pointer, Enter and Space without JavaScript or fetching. Every supplied quote and attribution appears once, with no truncation.

The canvas is charcoal (#1b1b1a), with spicy orange (#f77d43) actions and a solid orange marker behind the hero phrase. Two recessed overhead lights cast soft, tapered beams down the hero, using the local hero-downlights.svg asset. The supplied TerryYoffe-0702 photograph leads the hero, using local 1200px, 1800px and 2400px responsive derivatives. The biography uses its existing photograph, in normal flow, and stacks at 960px.

The featured testimonials use an asymmetric editorial layout, warm charcoal cards, gold quotation marks and decorative stars. Exact phrases are emphasized in the spicy orange accent within the complete accounts. The disclosure reads “Show all testimonials” and “Show fewer testimonials”, without a count.

The trust trail moves continuously left to right with four existing coaching credentials. Its two duplicate groups are hidden from screen readers. Hover, keyboard focus and interaction pause automatic travel. Visitors can drag with a mouse, swipe with native touch scrolling, scroll with a trackpad, or use arrow keys when focused. There is no pause button or visible scrollbar. Reduced motion shows a static wrapping list. Visible section gaps are 132px on desktop and 80px on phones. See [DESIGN.md](DESIGN.md) for the current design contract and verification record.
