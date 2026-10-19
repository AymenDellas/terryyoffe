# Terry Yoffe: design contract

The visitor has substantial professional experience but recognizes a recurring mental block. The design needs composure, intellectual clarity and a human presence. It should make the decision to examine that pattern feel direct, without adding promises about a coaching result.

Three directions were considered before implementation:

- An offset editorial composition, ink blue and periwinkle, Manrope/DM Sans, with a dimensional ribbon changing orientation. The wide headline and the ribbon set up the tension between repetition and a changed perspective.
- A portrait-led composition, deep aubergine and pale rose, narrow sans typography, with photographic shadow as the environment. More immediately personal, but less room for this unusually long, fixed hero copy.
- A tightly asymmetric, graphic composition, deep petroleum and ice blue, broad grotesk typography, with refracted planes crossing a wide headline. Sharper business character, but a colder fit for a personal coaching relationship.

The first direction was selected. The tradeoff is that Terry's face arrives in the biography rather than the hero; the opening instead emphasizes the reader's decision and the exact approved headline. The treatment is specific to the recurring-pattern message: a loop is seen in a different orientation, paired with conversational editorial pacing and an authentic photograph of Terry in conversation. No generic product illustration, dashboard, fabricated results, or process diagram is used.

## System

- Continuous canvas: #090a0e. Display: #f7f7fa. Body: #e2e4ed. Secondary metadata: #b5bbce. Display emphasis: #c9ccff. Actions remain #c5c8ff with #161d37 text. Rules: #2d3040. The existing blue and periwinkle atmosphere is dimmed around reading areas; the phone artwork also fades before the support paragraphs.
- Local variable fonts: Manrope, medium 500 for display; DM Sans, regular 400 for body and 650 for actions. Arial/sans-serif fallbacks. Desktop hero 92px maximum; main headings 54px; middle statement 68px; quotation 38px; body 19px. Mobile hero 37px at 375px, headings 33–36px, body 16–18px. Its final two words stay together, preserving deliberate wraps on narrow phones.
- Shared 1320px maximum frame, 56px desktop margins, reduced to 24px on phones. Paragraphs normally 540–700px; whole compositions use the wider frame.
- Hero left aligned and wide. The dimensional loop sits on the right with its illuminated edge toward the type and its shadow toward the outer frame. It falls away before essential supporting copy. Fine grain and broad blue ambient shading integrate it with the continuous canvas. A quieter echo closes the page. The artwork is an abstract surface, without factual or instructional meaning.
- The strip is generated as an original 3D ruled surface with computed lighting and static SVG output. No runtime animation or external image-generation service is needed.
- One action identity: a periwinkle rounded control with dark text, a directional arrow, 59–62px touch height, visible focus, restrained hover/active feedback. Exactly three controls, only in approved sections.
- The existing headline phrase “pattern underneath?” has a thin solid underline. “shifting a long-standing pattern” and the original experience phrase in the biography receive quieter underlining. No wording was changed or duplicated for emphasis.
- Visible-content gaps are 136px on desktop and 80px on phones. Each section has one gap before it; neighboring top and bottom paddings are not added together. Existing fine section rules sit midway inside those gaps. Headings remain attached to their introductions.

## Composition map

| Section | Focal element and composition | Density / mobile |
| --- | --- | --- |
| Hero | Dominant left headline across roughly 10 columns; full support at 6 columns; dimensional artwork on right; action attached below | High impact; fluid type and recomposed art crop on phone |
| Problem | Substantial heading above two balanced paragraph columns; the actual consequence sentence emphasized in its flow | Compact; paragraphs stack |
| Approach | Introductory heading followed by the exact first sentence at display scale; full remaining first paragraph and second paragraph grouped toward the right | Major middle focal point; one natural flow on phone |
| Consultation | Heading and two actual passages on left; three supplied topic rows on right, with rules and existing verbs emphasized; action follows on the same left anchor | Open and practical; intro, topic rows and action stack in their original reading order on phone |
| Fit | Heading and introduction followed by three broad, compact criteria rows with checks | Tighter density; same reading order on phone |
| About | Authentic portrait at 5/12 of grid, biography at 6/12; small offset outline frames the photo | Human focal point; photo then complete biography on phone |
| Evidence | Original heading and framing; Steve's complete account across a broad span; Jillian and Randi in related open columns; five additional accounts inside one native disclosure; original final paragraph | Three full accounts always visible; five already in the HTML; coherent single flow on phone |
| Concerns | Substantial question above two related reading columns, preserving paragraph order | Quieter and compact; paragraphs stack on phone |
| Closing | Large action-led headline, full support and attached CTA, quieter loop at far right | Clear final focal point; grouped content on phone |

All sections are transparent on one continuous environment. Decorative layers are hidden from accessibility APIs, ignore pointer input and clip their own bounds. No body overflow suppression, entrance effects, navigation, cards, invented labels or new marketing copy.

## Integration and editorial handoff

- Set `window.TERRY_SITE.consultationUrl` in `dist/config.js` to the supplied approved HTTPS destination. No booking destination was supplied. While empty, controls disclose that booking is not connected when activated, without collecting or sending data. An operational disclosure is not an additional offer.
- The original source website was inspected for assets only. Terry's own photograph was identified beside her biography on the source and visually inspected before use. The 1280×853 photograph is served locally; its exact origin is `https://trycoaching.com/wp-content/uploads/2025/12/TerryYoffe-1054-1280x853.jpg`. The photographed coach is Terry, not a testimonial author. Its conversational crop is preserved with CSS object-fit. A standing portrait was also discovered but not used.
- No source-page navigation, booking access links, offers, additional claims or testimonial text were imported.
- The abbreviated proof and its old attribution have been replaced by the eight full user-supplied accounts. Exact punctuation, grammar and corresponding author strings are preserved in `data/testimonials.json`; each account appears once. Steve, Jillian and Randi are featured. Michael, Rebecca, Janice, Robert and Jaime are in a native `details`/`summary` disclosure. Factual topic headings introduce the three featured accounts. No additional outcome or generalized promise was invented. The original surrounding copy, including the broader final proof paragraph, remains as requested.
- Program duration, price, terms, guarantees and consultation mechanics were not supplied and have not been invented. Internal editorial review was incomplete according to the supplied handoff. Review these points before a public launch.

## Verification

- Built and checked with `npm run build` and `npm run check`: nine sections, exact original copy outside the replaced testimonials, eight exact quotations with their corresponding attributions, three featured/five expandable accounts, exactly three original action placements, all local assets present, valid JavaScript.
- Inspected settled 1440px desktop and 375px phone first-view and full-page renders, including expanded evidence. Existing fonts, portrait, original artwork and section order are preserved. Measured 136px desktop and 80px phone gaps between section content.
- Checked phone scroll width against client width: 360px/360px (375px viewport with a 15px scrollbar). Desktop also has no horizontal overflow.
- Exercised all three primary controls with keyboard/pointer: a visible 3px keyboard focus outline and the same explicit unconnected-booking status. `dist/config.js` and `dist/main.js` are unchanged from the prior version. No data was sent; no configured URL was removed.
- Tested the native disclosure using Enter to expand, Space to collapse, and pointer activation to expand, on desktop and phone. All eight accounts exist before interaction, with no fetching or runtime-generated evidence. No console errors were observed.
- Text contrast against the conservative #33384e lit-area bound: display 10.81:1, body 9.11:1, metadata 6.04:1, accent 7.47:1; action text 10.34:1. This exceeds 7:1 for essential reading text and 4.5:1 for ordinary metadata.
- Also sampled composited screenshot backdrops along clear line-leading rows, accounting for capture scaling. The lowest sampled hero contrast was 8.42:1 on phone and 12.15:1 on desktop. Sampled support-paragraph contrast was at least 14.65:1 on phone and 15.27:1 on desktop. These are sampled reading-area checks, not a claim of exhaustive pixel certification.
- Authentic portrait loaded and inspected in the rendered biography. Local fonts loaded. No entrance effects, autoplay, or scrolling animation; interaction transitions are removed for reduced motion.
- Refined viewport and full-page JPEG captures are saved under the ignored `artifacts` directory. The booking destination remains unconfigured, as in the existing page, so an external booking flow cannot be verified until a destination is supplied.
