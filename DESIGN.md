# Terry Yoffe — current design contract

This iteration follows the user's charcoal, spicy-orange and photo-led direction. Preview stays local at http://127.0.0.1:4173/. Keep the local preview server running. The user has authorized pushing source to https://github.com/AymenDellas/terryyoffe.git. Hosting metadata is historical; site deployment requires a new explicit user request.

## Composition and material

The hero pairs the reader's existing decision-led headline with the supplied seated portrait of Terry. Two recessed LED sources at the top cast tapered, soft-edged light beams down behind the hero. A local SVG uses directional cones, linear attenuation and a narrow luminous source; the previous hero mesh-style radial glow is removed. Fine grain runs across the continuous charcoal canvas. All nine content sections retain their order and approved wording. The complete eight-account testimonial treatment remains intact.

- Ground #1b1b1a; headings #f7f3ed; essential body #e2dfd8; metadata #bdb9b0; readable accent #ffbc92; spicy-orange actions and marker #f77d43; dark action/marker ink #16120f; rules #46413b.
- Locally loaded Manrope is used for headings, DM Sans for reading and controls. Hero type is 48–72px on ordinary desktop sizes, 76px on very wide screens, and 35–54px on phones and small tablets. The final marker phrase scales separately on narrow phones so its exact words remain together.
- The hero phrase “pattern underneath?” has a solid, slightly irregular orange marker behind dark lettering. Its previous underline is removed. Supporting emphasis uses restrained orange rules and light text.
- Desktop hero: a shared 1320px maximum frame, 56px outside margins, 64px inner gap and a 1.16/.84 text/photo split. The photograph uses an upright .78 aspect crop and one softened bottom corner. The text, complete support and original primary action stay together.
- At 960px and below, the hero becomes one flow: headline, photograph, full support, action and trust trail. The photo becomes a landscape crop, keeping Terry's face clear. No text overlays her face.
- Content sections share the wide frame with independent paragraph measures. Gaps are 132px on desktop and 80px on phones. The problem retains two related passages; the approach retains its large exact statement; consultation topics and audience criteria remain open rows; the closing action stays on the same canvas.

## Testimonial presentation

Steve's complete account occupies a broad gold-edged card with an oversized quotation mark and topic in a left column, and the full quotation and attribution on the right. Jillian and Randi follow in two matte charcoal cards with the same quotation language and a softer border. Rounded lower corners echo the hero photograph. Cards stack below 960px; the featured account becomes a single column on phones. Key phrases and Steve's topic use the same spicy orange (#f77d43) as the primary action, without changing their words. Quotation marks and decorative stars retain their gold color.

Gold stars are individual decorative accents beside the exact attributions; no numerical rating or invented review score is stated. All SVG ornaments are hidden from assistive technology. The native disclosure uses “Show all testimonials” and changes to “Show fewer testimonials” when expanded, with no count. Five further full accounts remain in the initial HTML.

## Trust trail

Four existing biography credentials are repeated in a seamless left-to-right track: PCC accreditation with the ICF, CPCC certification with CTI, over 20 years of professional coaching experience, and Master/Post-Master NLP certifications. These do not imply employer or customer endorsements.

Three groups have identical dimensions. Only the first is exposed to screen readers. A frame-timed scroll loop moves at 24px/second to the right, keeping the viewport near the middle copy and shifting by a whole group at the loop boundary. There is no pause button or visible scrollbar. Hover, keyboard focus, dragging, touch interaction and native scrolling suspend automatic travel. The viewport supports mouse dragging with pointer capture, native touch/trackpad scrolling and left/right arrow keys. Automatic travel resumes after interaction settles, provided the pointer and focus have left. Motion is suspended when the trail is offscreen or the document is hidden. Reduced motion removes both duplicate groups and shows one static wrapping list.

## Responsive biography repair

The existing biography photograph uses ordinary document flow with width:100%, height:auto, object-fit:cover and a deliberate aspect ratio. It has no absolute positioning, fixed minimum height or detached outline extending beyond its container. Grid tracks use minmax(0, ...), and the biography text can shrink within its track.

The section has two useful columns above 960px and one column below. The image changes from a 4:5 crop to 4:3. Its tablet maximum is 680px; on phones it fills the available frame. Paragraphs remain readable without horizontal scrolling.

## Assets and integrations

- New hero source: user-supplied C:/Users/mimod/Downloads/TerryYoffe-0702.jpg, visually inspected before use. The original remains unchanged. Local JPEG derivatives at 1200, 1800 and 2400px retain its full content; the hero's CSS crop supplies the framing. The browser selects the proper derivative through srcset/sizes.
- Biography source: the existing authentic photograph of Terry in conversation, originally inspected on her own website and visually verified. Its origin is https://trycoaching.com/wp-content/uploads/2025/12/TerryYoffe-1054-1280x853.jpg. It remains local at dist/assets/terry-yoffe.jpg.
- The previous ribbon SVG and its hero/closing layers were removed. The continuous environment and all control colors use the current charcoal/orange system.
- The original three consultation placements and wording remain. The booking code is unchanged. The destination in dist/config.js remains blank, and controls retain the existing explicit unconnected status without collecting or transmitting data.
- Steve, Jillian and Randi remain complete and featured. Michael, Rebecca, Janice, Robert and Jaime remain complete inside one native details disclosure. Quotations and corresponding attributions come verbatim from data/testimonials.json. No new results or broader promises were added.

## Verification

- npm run build and npm run check verify nine sections, exact original copy plus the requested trust credentials, eight exact accounts, three consultation controls, duplicate-safe trust content and all local assets.
- Inspected desktop and phone full-page renders and focused phone/tablet biography views. Geometry was checked at 320, 375, 768, 960, 1024 and 1440px. No horizontal overflow was present.
- At 375px, the biography image measured 312×234px in a 312px column. At 768px it measured 680×510px inside a 681px column. At 1024px it measured about 385×482px in the two-column layout. All images were in static document flow.
- Verified three equal 1563px desktop groups, rightward automatic scroll progress, a stable scroll position while hovered, exact 280px mouse dragging, dragging through a loop boundary and 100px arrow-key scrolling. No pause control or scrollbar remains. Native touch scrolling and the reduced-motion fallback are implemented; the browser testing surface does not emulate touch events or reduced-motion media preferences.
- Contrast against a conservative warm-lit #3c3630 background: headings 10.78:1, body 8.95:1, metadata 6.09:1, light accent 7.30:1; dark text on the orange action/marker 7.07:1. Reading text remains separate from the bright photograph.
- The overhead LED sources and downward beams were visually inspected at 375, 768 and 1440px viewport widths. No horizontal overflow was present. All three testimonial highlights and Steve's topic resolve to the requested orange rgb(247, 125, 67). The browser reported no warnings or errors.
- Local captures are saved in the ignored artifacts directory. GitHub source publication is authorized for AymenDellas/terryyoffe; no hosted site deployment is part of this iteration.
