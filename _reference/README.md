# Reference materials — Pyro Ag Services recreation

These files are the source of truth for recreating the original pyroagllc.com (currently hosted on Base44) as a static HTML + Tailwind site in this repo.

## Files

- **screenshot-full-page.png** — full-page screenshot of the live site as it currently exists. Primary visual reference for layout, colors, typography, spacing, and section order.
- **page-text.txt** — plain-text dump of all visible copy on the live site, in document order. Use this verbatim for headlines, body copy, button labels, form fields, footer, etc. Do not paraphrase or rewrite unless something is clearly broken.
- **page-summary.json** — structured extract: title, meta description, headline hierarchy, nav links, button labels, contact info (phone, email), form fields, sample colors, image URLs.
- **rendered-page.html** — the post-hydration DOM dump from the live SPA. Useful for inspecting class names, attribute values, and exact markup if questions come up.
- **assets/logo.png** — the Pyro Ag logo: a stylized "Y" rendered as flames, transparent background. Use as-is.

## Notes for the build

- This is a **faithful recreation**, not a redesign. Match the existing site closely.
- The original is a Base44 SPA. This recreation is static HTML + Tailwind (CDN). No build step.
- Forms: render as **pure HTML markup only**. Real inputs with sensible name/id attributes. No submission handling, no JS, no form action. Form wiring is a later phase.
- The original uses generic system fonts because Base44's font loading didn't survive the headless capture. Pick **real** display + body fonts (Google Fonts) that match the aesthetic — see CLAUDE.md brand notes.
- Drone/product imagery is hosted by Terraplex on a shared GCS bucket (`storage.googleapis.com/bgd-sites/terraplex/...`). Reference URLs are in rendered-page.html. You can hotlink these for now.
- The "Authorized Terraplex Dealer" badge/seal is a Terraplex shared asset — if you don't see one in assets/, request it.
- See CLAUDE.md for brand colors, tone, and conventions. See NOTES.md for working memory.
